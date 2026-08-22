import { envValues } from '@/constants/envValues';
import { ContactType, ProfileData } from '@/types/profile';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getVcardUrl(slug: string) {
  return `${envValues.baseUrl}/offline-qr-code/${slug}`;
}

const convertImageToBase64 = async (imageUrl: string): Promise<string> => {
  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        // Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
        const base64 = base64String.split(',')[1];
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('Error converting image to base64:', error);
    return '';
  }
};

export const createVCard = async (profileData: ProfileData) => {
  let photoBase64 = '';
  if (profileData.profile_image) {
    // Check if the profile_image is already a base64 string
    if (profileData.profile_image.startsWith('data:')) {
      photoBase64 = profileData.profile_image.split(',')[1];
    } else {
      // Convert URL to base64
      photoBase64 = await convertImageToBase64(profileData.profile_image);
    }
  } else {
    photoBase64 = '';
  }

  const nameParts = profileData.name.replace(/\\n/g, ' ').trim().split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${profileData.name}
N:${lastName};${firstName};;;
PHOTO;ENCODING=BASE64;TYPE=JPEG:${photoBase64}

${profileData.contacts
  .map((contact) => {
    switch (contact.contact_type) {
      case ContactType.phone:
        return `TEL;TYPE=Phone:${contact.value}`;
      case ContactType.email:
        return `EMAIL;TYPE=Email:${contact.value}`;
      case ContactType.whatsapp:
        return `TEL;TYPE=WHATSAPP:${contact.value}`;
      case ContactType.website:
        return `URL:${contact.value}`;
      case ContactType.location:
        return `ADR:;;${contact.value}`;
      case ContactType.mobileNumber:
        return `TEL;TYPE=CELL:${contact.value}`;
      case ContactType.officeEmail:
        return `EMAIL;TYPE=WORK:${contact.value}`;
      case ContactType.address:
        return `ADR:;;${contact.value}`;
      case ContactType.otherLinkUrl:
        if (!contact.value.startsWith('https://') && !contact.value.startsWith('http://')) {
          return `URL:https://${contact.value}`;
        }
        return `URL:${contact.value}`;
      case ContactType.fax:
        return `TEL;TYPE=FAX:${contact.value}`;
      default:
        return `NOTE:${contact.contact_type}: ${contact.value}`;
    }
  })
  .join('\n')}
${profileData.designation ? `TITLE:${profileData.designation}` : ''}
${profileData.description ? `NOTE:${profileData.description}` : ''}
${profileData.socials.map((social) => `X-SOCIALPROFILE;X-USER=${social.social_type}:${social.value}`).join('\n')}
END:VCARD`;

  return new Blob([vcard], { type: 'text/vcard' });
};

export const saveContactToPhone = async (profileData: ProfileData) => {
  try {
    if (typeof window === 'undefined') {
      return;
    }

    // Create vCard file
    const file = new File([await createVCard(profileData)], 'contact.vcf', {
      type: 'text/vcard;charset=utf-8',
    });

    // Create object URL
    const url = URL.createObjectURL(file);

    // Create and setup download link
    const link = document.createElement('a');
    link.href = url;
    link.download = `${profileData.name}.vcf`;

    // Trigger download
    document.body.appendChild(link);
    link.click();

    // Cleanup
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error sharing/downloading contact:', error);
    throw error;
  }
};

export const downloadContact = (slug: string) => {
  try {
    window.open(getVcardUrl(slug), '_blank');
  } catch (error) {
    console.error('Error downloading contact:', error);
    throw error;
  }
};

export const handleContactSave = async (profileData: ProfileData) => {
  await saveContactToPhone(profileData);
};

export const handleShare = async (data: ShareData) => {
  if (typeof window === 'undefined') return;
  try {
    if (navigator.share) {
      await navigator.share(data);
    } else {
      await navigator.clipboard.writeText(data.url || '');
      // You might want to add a toast notification here
      alert('Link copied to clipboard!');
    }
  } catch (error) {
    console.error('Error sharing:', error);
  }
};

export function getContactUrl(contact: { contact_type: ContactType; value: string }) {
  switch (contact.contact_type) {
    case ContactType.phone:
    case ContactType.mobileNumber:
      return `tel:${contact.value}`;
    case ContactType.whatsapp:
      return `https://wa.me/${contact.value}`;
    case ContactType.email:
    case ContactType.officeEmail:
      return `mailto:${contact.value}`;
    case ContactType.website:
    case ContactType.otherLinkUrl:
      if (!contact.value.startsWith('https://') && !contact.value.startsWith('http://')) {
        return `https://${contact.value}`;
      }
      return contact.value;
    case ContactType.location:
    case ContactType.address:
      return `https://maps.google.com/?q=${encodeURIComponent(contact.value)}`;
    case ContactType.fax:
      return `fax:${contact.value}`;
    default:
      return contact.value;
  }
}
