'use client';
import CoverImage from '@/assets/images/cover.png';
import ProfileImage from '@/assets/images/profile.png';
import Appointment from '@/components/appointment/Appointment';
import Connect from '@/components/connect/Connect';
import GalleryList from '@/components/gallery/GalleryList';
import GoogleReview from '@/components/google-review/GoogleReview';
import { ContactIcon } from '@/components/profile/contact-icon';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { createVCard, getContactUrl, handleShare } from '@/lib/utils';
import { ProfileData } from '@/types/profile';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FiPhone } from 'react-icons/fi';
import { PiQrCodeBold, PiShareNetworkBold } from 'react-icons/pi';
import { TfiEmail } from 'react-icons/tfi';
import VideoList from '../gallery/VideoList';

interface DesignOneProps {
  profileData: ProfileData;
}

export default function DesignOne({ profileData }: DesignOneProps) {
  const [open, setOpen] = useState(false);
  const [appointmentOpen, setAppointmentOpen] = useState(false);
  const [vCardBlob, setVCardBlob] = useState<Blob | null>(null);

  const params = useParams();
  const slug = params.slug as string;
  const textColor = profileData.text_color || '#000000';
  const iconBg = profileData.button_color || '#000000';
  const iconColor = profileData.icon_color || '#FFFFFF';
  const buttonColor = profileData.button_color || '#000000';
  const backgroundColor = profileData.background_color || '#000000';

  useEffect(() => {
    // Create vCard on component mount
    const createVCardBlob = async () => {
      const blob = await createVCard(profileData);
      setVCardBlob(blob);
    };
    createVCardBlob();
  }, [profileData]);

  const handleSaveContact = async () => {
    try {
      if (!vCardBlob) {
        console.error('vCard not created yet');
        return;
      }

      // Create file from blob
      const file = new File([vCardBlob], `${profileData.name}.vcf`, {
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
      setOpen(true);
    } catch (error) {
      console.error('Error saving contact:', error);
    }
  };

  const phone = profileData.mobile;
  const email = profileData.email;
  return (
    <div
      className="container  max-w-md mx-auto min-h-screen md:rounded-3xl 
         rounded-none overflow-hidden  md:border-2 md:border-gray-600 md:mt-4 md:mb-4 relative pb-10"
      style={{ backgroundColor: backgroundColor }}
    >
      <Image
        src={profileData.banner || CoverImage}
        alt="cover"
        className="!w-full rounded-bl-[20px] rounded-br-[20px] max-h-[250px]"
        width={1920}
        height={1080}
      />
      <div className="p-3">
        <div
          className="p-4 text-center rounded-[20px]"
          style={{
            background: 'linear-gradient(0deg, rgba(255,255,255,0.58) 48%, rgba(255,255,255,0.16) 100%)',
          }}
        >
          <div className="relative">
            <Image
              src={profileData.profile_image || ProfileImage}
              alt="profile"
              width={90}
              height={90}
              className="absolute left-1/2 -top-14 -translate-x-1/2
               w-[95px] h-[95px] rounded-full  bg-white "
            />
          </div>
          <h1
            className="text-black text-[22px] font-bold  mt-10"
            style={{
              color: profileData.text_color,
            }}
          >
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
          <p className="text-black text-sm font-normal opacity-70" style={{ color: profileData.text_color }}>
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
          <p>
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
          <div className="flex items-center gap-3 justify-center mt-3">
            {phone && (
              <Link href={`tel:${phone}`}>
                <div
                  style={{
                    color: iconColor,
                    backgroundColor: iconBg,
                  }}
                  className="rounded-full shadow-[0px_1px_7px_0px_rgba(140,114,0,0.20)] border-4 border-black/0 text-center inline-block p-3"
                >
                  <FiPhone className="size-6 m-auto" />
                </div>
              </Link>
            )}

            {email && (
              <Link href={`mailto:${email}`}>
                <div
                  style={{
                    color: iconColor,
                    backgroundColor: iconBg,
                  }}
                  className=" rounded-full shadow-[0px_1px_7px_0px_rgba(140,114,0,0.20)] border-4 border-black/0 text-center inline-block p-3"
                >
                  <TfiEmail className="size-6 m-auto" />
                </div>
              </Link>
            )}

            {slug && (
              <Link href={`/qr-code/${slug}`}>
                <div
                  style={{
                    color: iconColor,
                    backgroundColor: iconBg,
                  }}
                  className=" rounded-full shadow-[0px_1px_7px_0px_rgba(140,114,0,0.20)] border-4 border-black/0 text-center inline-block p-3"
                >
                  <PiQrCodeBold className="size-6 m-auto" />
                </div>
              </Link>
            )}

            <button
              onClick={() => handleShare({ title: profileData.name, url: profileData.vcf })}
              className="cursor-pointer  rounded-full shadow-[0px_1px_7px_0px_rgba(140,114,0,0.20)] border-4 border-black/0 text-center inline-block p-3"
              aria-label="Share contact"
              style={{
                color: iconColor,
                backgroundColor: iconBg,
              }}
            >
              <PiShareNetworkBold className="size-6 m-auto" />
            </button>
          </div>
        </div>
        <div className="flex items-center gap-0 justify-center   fixed w-full bottom-0 left-0 right-0   max-w-md m-auto z-50">
          {profileData.contact_status === '1' && (
            <Button
              onClick={handleSaveContact}
              className="mt-2 uppercase w-full h-12 rounded-none border-r border-white/20"
              style={{
                backgroundColor: buttonColor,
                color: iconColor,
              }}
              variant="default"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-10 "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
                />
              </svg>
              Save
            </Button>
          )}

          <Connect profile={profileData} open={open} onOpenChange={setOpen} />

          {profileData.appointment_status === '1' && (
            <Dialog open={appointmentOpen} onOpenChange={setAppointmentOpen}>
              <DialogTrigger asChild>
                <Button
                  className="mt-2 uppercase w-full h-12 rounded-none"
                  style={{
                    backgroundColor: buttonColor,
                    color: iconColor,
                  }}
                  variant="default"
                >
                  Appointment
                </Button>
              </DialogTrigger>
              <DialogContent className="p-4 max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-center">Appointment</DialogTitle>
                  <DialogDescription asChild>
                    <Appointment profileData={profileData} onClose={() => setAppointmentOpen(false)} />
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          )}
        </div>
        <div
          className="bg-[linear-gradient(0deg,_rgba(255,_255,_255,_0.10)_0%,_rgba(255,_255,_255,_0.03)_100%)] [box-shadow:0px_0px_2px_rgba(255,_255,_255,_0.48)_inset] shadow flex gap-3 justify-center p-3 rounded-2xl mt-3"
          style={{
            background: 'linear-gradient(0deg, rgba(255, 255, 255, 0.10) 0%, rgba(255, 255, 255, 0.03) 100%)',
            boxShadow: '0px 0px 2px rgba(255, 255, 255, 0.48) inset',
          }}
        >
          {profileData.socials.map((social, index) => (
            <Link href={social.value} key={index} className="text-center rounded-lg text-black">
              <Image src={social.social_icon} alt={social.social_type} width={24} height={24} className="w-10 h-10" />
            </Link>
          ))}
        </div>

        {profileData.description && (
          <div
            className="p-3 rounded-2xl mt-3"
            style={{
              background: 'linear-gradient(0deg, rgba(255, 255, 255, 0.10) 0%, rgba(255, 255, 255, 0.03) 100%)',
              boxShadow: '0px 0px 2px rgba(255, 255, 255, 0.48) inset',
            }}
          >
            <p className="text-base font-medium mb-2 opacity-70" style={{ color: textColor }}>
              About
            </p>
            <p className="text-sm font-normal" style={{ color: textColor }}>
              {profileData.description
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
        )}

        {profileData.google_review_status === '1' && (
          <>
            <div className="h-3"></div>
            <GoogleReview link={profileData.google_review_link} textColor={textColor} />
          </>
        )}

        <div
          className="p-3 rounded-2xl mt-3"
          style={{
            background: 'linear-gradient(0deg, rgba(255, 255, 255, 0.10) 0%, rgba(255, 255, 255, 0.03) 100%)',
            boxShadow: '0px 0px 2px rgba(255, 255, 255, 0.48) inset',
          }}
        >
          {profileData.contacts.map((contact, index) => (
            <Link href={getContactUrl(contact)} key={`${contact.contact_type}-${contact.value}`}>
              <div
                className={`grid grid-cols-10 items-center ${
                  index !== profileData.contacts.length - 1 ? 'border-b border-white/20' : ''
                } py-3 `}
              >
                <div className="col-span-2">
                  <ContactIcon
                    type={contact.contact_type}
                    iconUrl={contact.contact_icon}
                    iconColor={iconColor}
                    iconBg={iconBg}
                  />
                </div>
                <div className="text-wrap col-span-8 break-words">
                  <p className="opacity-70 text-sm font-normal " style={{ color: textColor }}>
                    {contact.contact_type}
                  </p>
                  <p className="text-white text-[14px] font-semibold break-words" style={{ color: textColor }}>
                    {contact.value}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {profileData.media_status === '1' && profileData.medias.length > 0 && (
          <>
            <p
              className="text-base font-medium mt-3 mb-3"
              style={{
                color: textColor,
              }}
            >
              Gallery{' '}
              <Link
                style={{ color: textColor }}
                href={`/gallery/${slug}`}
                className="float-end hover:text-gray-300 transition-colors"
              >
                View all
              </Link>
            </p>
            <GalleryList medias={profileData.medias} columns={2} />
          </>
        )}

        {profileData.videos.length > 0 && (
          <div className="mt-3">
            <p className="text-base font-medium mb-3">
              Videos{' '}
              <Link
                href={`/videos/${slug}`}
                className="float-end hover:text-gray-300 transition-colors text-sm underline"
                style={{ color: textColor }}
              >
                View all
              </Link>
            </p>
            <VideoList videos={profileData.videos} />
          </div>
        )}
      </div>
    </div>
  );
}
