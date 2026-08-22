export enum ContactType {
  phone = 'Phone',
  whatsapp = 'Whatsapp',
  email = 'Email',
  website = 'Website',
  location = 'Location',
  mobileNumber = 'Mobile-Number',
  officeEmail = 'Office Email',
  address = 'Address',
  otherLinkUrl = 'Other Link Url',
  fax = 'Fax',
}

export interface Contact {
  contact_type: ContactType;
  contact_icon: string;
  value: string;
}

export interface Appointment {
  starting_hour: string;
  ending_hour: string;
}

export interface Social {
  social_type: string;
  social_icon: string;
  value: string;
}

export interface Media {
  link: string;
  description: string;
}

export interface Video {
  link: string;
}

export interface ProfileData {
  card_id: string;
  name: string;
  designation: string;
  company_name?: string;
  profile_image: string;
  banner: string;
  description: string;
  theme: string;
  background_color: string;
  text_color: string;
  button_color: string;
  icon_color: string;
  heading_color: string;
  header_color: string;
  contact_status: string;
  appointment_status: string;
  social_status: string;
  google_review_status: string;
  google_review_link: string;
  media_status: string;
  video_status: string;
  mobile: string;
  email: string;
  contacts: Contact[];
  appointments: Appointment[];
  socials: Social[];
  medias: Media[];
  videos: Video[];
  vcf: string;
}

export interface GalleryData {
  medias: Media[];
  videos: Video[];
}

export interface GalleryResponse {
  message: string;
  data: GalleryData;
}

export interface ApiResponse {
  message: string;
  data: ProfileData;
}
