import { ContactType } from '@/types/profile';
import { IconType } from 'react-icons';
import { FaWhatsapp } from 'react-icons/fa';
import { FiGlobe, FiMail, FiMapPin, FiPhone, FiPrinter } from 'react-icons/fi';

export function getContactIcon(type: ContactType): IconType | null {
  switch (type) {
    case ContactType.phone:
    case ContactType.mobileNumber:
      return FiPhone;
    case ContactType.whatsapp:
      return FaWhatsapp;
    case ContactType.email:
    case ContactType.officeEmail:
      return FiMail;
    case ContactType.website:
    case ContactType.otherLinkUrl:
      return FiGlobe;
    case ContactType.location:
    case ContactType.address:
      return FiMapPin;
    case ContactType.fax:
      return FiPrinter;
    default:
      return null;
  }
}
