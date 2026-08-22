'use client';
import { cn, createVCard, handleContactSave, handleShare } from '@/lib/utils';
import { ProfileData, Social } from '@/types/profile';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import contact from '@/assets/theme6Icons/contact.png';
import gallery from '@/assets/theme6Icons/gallery.png';
import { Copy, CopyCheck, MoveRight, Phone, Plus, QrCode, Share } from 'lucide-react';
import GalleryList from '../gallery/GalleryList';
import { toast } from 'sonner';

interface DesignSixProps {
  profileData: ProfileData;
}

function DesignSix({ profileData }: DesignSixProps) {
  const [vCardBlob, setVCardBlob] = useState<Blob | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedLocation, setCopiedLocation] = useState(false);
  const params = useParams();
  const slug = params.slug as string;

  const phone = profileData.contacts.find((c) => c.contact_type === 'Phone')?.value || '';
  const email = profileData.contacts.find((c) => c.contact_type === 'Email')?.value || '';
  const location = profileData.contacts.find((c) => c.contact_type === 'Address')?.value || '';

  const textColor = profileData.text_color || '#000000';
  // const iconBg= '#000000'
  const iconColor = profileData.icon_color || '#000000';
  const buttonColor = profileData.button_color || '#ffffff';
  const backgroundColor = profileData.background_color || '#000000';
  const headerColor = profileData.header_color || 'ffffff';

  const handleCopy = async (text: string, type: 'email' | 'location') => {
    await navigator.clipboard.writeText(text);

    if (type === 'email') {
      setCopiedEmail(true);
      toast.success('E-mail copied successfully');
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedLocation(true);
      toast.success('Location copied successfully');
      setTimeout(() => setCopiedLocation(false), 2000);
    }
  };

  useEffect(() => {
    // Create vCard on component mount
    const createVCardBlob = async () => {
      const blob = await createVCard(profileData);
      setVCardBlob(blob);
    };
    createVCardBlob();
  }, [profileData]);

  const handleSave = async () => {
    try {
      if (!vCardBlob) {
        console.error('vCard not created yet');
        return;
      }
      await handleContactSave(profileData);
    } catch (error) {
      console.error('Error saving contact:', error);
    }
  };
  return (
    <div className="flex justify-center bg-gray-900 font-montserrat">
      <div
        className={cn('min-h-screen flex flex-col w-full max-w-md')}
        style={{
          background: `linear-gradient(to bottom, rgba(255,255,255,0.9) 10%, ${backgroundColor} 100%)`,
        }}
      >
        <div className="md:p-4 p-2">
          {/* Banner */}
          <div className="relative h-48 w-full overflow-hidden bg-muted rounded-xl">
            <Image
              width={480}
              height={200}
              src={profileData.banner || '/placeholder.svg'}
              alt="Banner"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Profile Section - Profile picture overlaps banner */}
          <div className="md:px-4 px-2 pb-2">
            <div className="flex justify-between items-start gap-4">
              {/* Left: Profile Picture */}
              <div className="relative md:-mt-20 -mt-16">
                <Image
                  width={160}
                  height={160}
                  src={profileData.profile_image || '/placeholder.svg'}
                  alt=""
                  className="md:w-40 md:h-40 h-32 w-32 rounded-full  border-card object-cover shadow-md"
                />
              </div>

              {/* Right: Name and Address (can add more details here) */}
              <div className="flex-1 md:pt-4 pt-2 -space-y-1 ">
                <h1 className="text-lg font-semibold text-foreground">
                  {profileData.name
                    ?.replace(/\\n/g, '\n') // convert literal \n to real newlines
                    .split('\n') // then split on actual newlines
                    .map((line, index, array) => (
                      <React.Fragment key={index}>
                        {line}
                        {index < array.length - 1 && <br />}
                      </React.Fragment>
                    ))}
                </h1>
                <p className="text-base">
                  {profileData.designation
                    ?.replace(/\\n/g, '\n') // convert literal \n to real newlines
                    .split('\n') // then split on actual newlines
                    .map((line, index, array) => (
                      <React.Fragment key={index}>
                        {line}
                        {index < array.length - 1 && <br />}
                      </React.Fragment>
                    ))}
                </p>
                <p className="md:text-base text-sm">
                  {' '}
                  {profileData.company_name
                    ?.replace(/\\n/g, '\n') // convert literal \n to real newlines
                    .split('\n') // then split on actual newlines
                    .map((line, index, array) => (
                      <React.Fragment key={index}>
                        {line}
                        {index < array.length - 1 && <br />}
                      </React.Fragment>
                    ))}
                </p>
              </div>
            </div>
          </div>

          {/* Social Media */}
          {profileData.socials && profileData.socials.length > 0 && (
            <DynamicSocialButtons textColor={textColor} socials={profileData.socials} headerColor={headerColor} />
          )}

          {/* contact section */}
          <div
            className="bg-blue-400/40 rounded-xl p-4 mt-5 shadow-md"
            style={{ color: textColor, backgroundColor: headerColor }}
          >
            <div className="flex items-center gap-2">
              <Image src={contact} alt="" width={46} height={46} className="h-8 w-8 md:h-12 md:w-12" />
              <h1 className="text-lg md:text-xl font-semibold ">Contact Us</h1>
            </div>

            {phone && (
              <div className="flex justify-between mt-5">
                <div className="">
                  <p className="text-sm md:text-base font-medium">Call Us</p>
                  <p className="text-sm md:text-base font-light">{phone}</p>
                </div>
                <Link href={`tel:${phone}`} style={{ color: iconColor }}>
                  <Phone strokeWidth={1} size={32} />
                </Link>
              </div>
            )}
            <div>
              {email && (
                <div className="flex justify-between mt-4">
                  <div>
                    <p className="text-sm md:text-base font-medium">Mail Us</p>
                    <p className=" text-sm md:text-base bg-current/40 font-light">{email}</p>
                  </div>
                  <div className="" style={{ color: iconColor }}>
                    {copiedEmail ? (
                      <CopyCheck strokeWidth={1} size={32} />
                    ) : (
                      <Copy
                        strokeWidth={1}
                        onClick={() => handleCopy(email, 'email')}
                        size={32}
                        className="cursor-pointer"
                      />
                    )}
                  </div>
                </div>
              )}

              {location && (
                <div className="flex justify-between mt-4">
                  <div>
                    <p className="text-sm md:text-base  font-medium">Address</p>
                    <p className="text-sm md:text-base  bg-current/40 font-light">{location}</p>
                  </div>
                  <div className="" style={{ color: iconColor }}>
                    {copiedLocation ? (
                      <CopyCheck size={32} strokeWidth={1} />
                    ) : (
                      <Copy
                        strokeWidth={1}
                        onClick={() => handleCopy(location, 'location')}
                        size={32}
                        className="cursor-pointer"
                      />
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* gallery */}

          {profileData.media_status === '1' && profileData.medias.length > 0 && (
            <div
              className="bg-blue-400/40 rounded-xl p-4 md:mt-5 mt-2 mb-16 sm:mb-20 shadow-xl"
              style={{ color: textColor, backgroundColor: headerColor }}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Image src={gallery} alt="" width={46} height={46} className="h-8 w-8 md:h-12 md:w-12" />
                  <h1 className="text-lg md:text-xl font-semibold ">Gallery</h1>
                </div>
                <Link href={`/gallery/${slug}`} style={{ color: iconColor }}>
                  <MoveRight />
                </Link>
              </div>
              <div className="mt-5">
                <GalleryList medias={profileData.medias} columns={3} />
              </div>
            </div>
          )}

          {/* Fixed Bottom Buttons */}
          <div className="fixed bottom-0 left-0 right-0  shadow-lg z-30 ">
            <div className="relative  pt-4 pb-2 max-w-md md:px-4 px-2 mx-auto ">
              <div
                className="bg-blue-400/40 rounded-[2.5rem] flex items-center justify-between sm:px-2 px-1 py-1"
                style={{ color: '#fff', backgroundColor: headerColor }}
              >
                <div className="flex md:gap-5 gap-2">
                  {slug && (
                    <div
                      className="flex-shrink-0 rounded-full "
                      style={{ backgroundColor: buttonColor, color: iconColor }}
                    >
                      <Link
                        href={`/qr-code/${slug}`}
                        className="sm:w-16 w-14 h-14 sm:h-16 flex items-center justify-center  rounded-full  transition-colors"
                      >
                        <QrCode className="md:w-12 w-10 h-10 md:h-12" />
                      </Link>
                    </div>
                  )}

                  {/* share Button */}

                  <button
                    onClick={() => {
                      handleShare({
                        title: profileData.name,
                        text: `Check out ${profileData.name}'s profile`,
                        url: profileData.vcf,
                      });
                    }}
                    className="sm:w-16 w-14 h-14 sm:h-16 flex items-center justify-center rounded-full   transition-colors"
                    style={{ backgroundColor: buttonColor, color: iconColor }}
                  >
                    <Share className="sm:w-12 w-10 h-10 sm:h-12" />
                  </button>
                </div>

                {/* Add to Contact Button (Bigger) */}
                <div
                  className="flex-shrink-0 rounded-[2.5rem]"
                  style={{ backgroundColor: buttonColor, color: iconColor }}
                >
                  <button
                    onClick={handleSave}
                    className=" sm:h-16 h-14 flex-shrink text-sm sm:text-md font-semibold  px-2 sm:py-3 py-2  flex items-center justify-center transition-colors"
                  >
                    <Plus className="w-8 h-8 mr-2" />
                    Add to Contact
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DesignSix;

interface DynamicSocialButtonsProps {
  socials: Social[];
  headerColor: string;
  textColor: string;
}

function DynamicSocialButtons({ socials, headerColor, textColor }: DynamicSocialButtonsProps) {
  if (!socials.length) return null;

  return (
    <div className="flex space-x-3 justify-center items-center mt-6">
      {socials.map((social, index) => (
        <Link href={social.value} key={index} target="_blank" rel="noopener noreferrer">
          <button
            style={{ color: textColor, backgroundColor: headerColor }}
            className="
              md:w-16 w-12 h-12 md:h-16 
              rounded-full 
              flex items-center justify-center 
              bg-blue-400/40
            "
          >
            <Image
              src={social.social_icon || '/placeholder.svg'}
              alt={social.social_type}
              width={24}
              height={24}
              className="md:w-12 w-10 h-10 md:h-12 object-contain"
            />
          </button>
        </Link>
      ))}
    </div>
  );
}
