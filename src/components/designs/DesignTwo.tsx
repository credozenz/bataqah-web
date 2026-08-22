'use client';

import CoverImage from '@/assets/images/cover.png';
import ProfileImage from '@/assets/images/profile.png';
import Appointment from '@/components/appointment/Appointment';
import Connect from '@/components/connect/Connect';
import GalleryList from '@/components/gallery/GalleryList';
import VideoList from '@/components/gallery/VideoList';
import GoogleReview from '@/components/google-review/GoogleReview';
import { ContactIcon } from '@/components/profile/contact-icon';
import SocialLinks from '@/components/shared/SocialLinks';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { createVCard, getContactUrl, handleContactSave, handleShare } from '@/lib/utils';
import { ProfileData } from '@/types/profile';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FaCalendarAlt, FaQrcode, FaShareAlt } from 'react-icons/fa';
import { IoMdPersonAdd } from 'react-icons/io';

interface DesignTwoProps {
  profileData: ProfileData;
}

export default function DesignTwo({ profileData }: DesignTwoProps) {
  const [connectOpen, setConnectOpen] = useState(false);
  const [appointmentOpen, setAppointmentOpen] = useState(false);
  const [vCardBlob, setVCardBlob] = useState<Blob | null>(null);

  const params = useParams();
  const slug = params.slug as string;
  const textColor = profileData.text_color || '#FFFFFF';
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

  const handleSave = async () => {
    try {
      if (!vCardBlob) {
        console.error('vCard not created yet');
        return;
      }
      await handleContactSave(profileData);
      setConnectOpen(false);
    } catch (error) {
      console.error('Error saving contact:', error);
    }
  };

  return (
    <div
      className="container max-w-md mx-auto min-h-screen md:rounded-3xl
         rounded-none overflow-hidden  md:border-2 md:border-gray-600 md:mt-4 md:mb-4 "
      style={{ backgroundColor: backgroundColor, color: textColor }}
    >
      <div className="relative">
        <Image
          src={profileData.banner || CoverImage}
          alt="cover"
          className="w-full rounded-bl-[20px] rounded-br-[20px] max-h-[320px]"
          width={1920}
          height={1080}
        />
        <button
          onClick={() => {
            handleShare({
              title: profileData.name,
              text: `Check out ${profileData.name}'s profile`,
              url: profileData.vcf,
            });
          }}
          className="absolute top-4 right-4 rounded-full p-3 z-50"
          style={{ backgroundColor: buttonColor, color: iconColor }}
        >
          <FaShareAlt className="size-5" />
        </button>
      </div>
      <div
        className="p-4 text-center rounded-bl-[20px] rounded-br-[20px] -mt-3 z-50 relative"
        style={{
          background: 'linear-gradient(0deg, rgba(255, 255, 255, 0.10) 0%, rgba(255, 255, 255, 0.03) 100%)',
          boxShadow: '0px 0px 2px rgba(255, 255, 255, 0.48) inset',
        }}
      >
        <Image
          src={profileData.profile_image || ProfileImage}
          alt="profile"
          width={90}
          height={90}
          className="w-[90px] h-[90px] rounded-full border border-black mx-auto  -mt-8  "
        />
        <h1
          className="text-[22px] font-bold mt-2"
          style={{
            color: profileData.text_color || '#FFFFFF',
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
        <p
          className="text-sm font-normal"
          style={{
            color: profileData.text_color,
          }}
        >
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
        {profileData.company_name && (
          <p
            className="text-sm font-normal"
            style={{
              color: profileData.text_color,
            }}
          >
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
        )}
        <div className="flex bg-black text-white py-6 rounded-2xl mt-5">
          {profileData.contact_status === '1' && (
            <div className="flex-1 text-center border-r border-yellow-100 px-1">
              <button
                onClick={() => {
                  setConnectOpen(true);
                }}
                className="w-full"
              >
                <span className="text-sm">Connect</span>
                <IoMdPersonAdd className="size-6 m-auto" style={{ color: iconColor }} />
              </button>

              <Connect profile={profileData} open={connectOpen} onOpenChange={setConnectOpen} />
            </div>
          )}

          {profileData.appointment_status === '1' && (
            <div className="flex-1 text-center border-r  border-yellow-100 px-1">
              <Dialog open={appointmentOpen} onOpenChange={setAppointmentOpen}>
                <DialogTrigger asChild>
                  <button className="w-full">
                    <span className="uppercas text-sm">Appointment</span>
                    <FaCalendarAlt className="size-6 m-auto" style={{ color: iconColor }} />
                  </button>
                </DialogTrigger>
                <DialogContent className="p-4 max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-center text-white">Appointment</DialogTitle>
                    <DialogDescription>
                      <Appointment profileData={profileData} onClose={() => setAppointmentOpen(false)} />
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          )}

          <div className="flex-1 text-center px-1">
            <Link href={`/qr-code/${slug}`} className="w-full block">
              <span className="uppercas text-sm text-white">QR Code</span>
              <FaQrcode className="size-6 m-auto" style={{ color: iconColor }} />
            </Link>
          </div>
        </div>
      </div>
      <div className="p-4">
        {profileData.description && (
          <div
            className="mb-4 p-4 rounded-2xl"
            style={{
              background: 'linear-gradient(0deg, rgba(255, 255, 255, 0.10) 0%, rgba(255, 255, 255, 0.03) 100%)',
              boxShadow: '0px 0px 2px rgba(255, 255, 255, 0.48) inset',
            }}
          >
            <p className="text-base font-medium mb-2 opacity-70">About</p>
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

        {profileData.contacts.length > 0 && (
          <>
            <p className="text-base font-medium mb-3">Contact Information</p>
            {profileData.contacts.map((contact) => (
              <Link href={getContactUrl(contact)} key={`${contact.contact_type}-${contact.value}`}>
                <div
                  className="grid grid-cols-10 items-center border-b border-white/20 p-4 rounded-2xl mb-3"
                  style={{
                    background: 'linear-gradient(0deg, rgba(255, 255, 255, 0.10) 0%, rgba(255, 255, 255, 0.03) 100%)',
                    boxShadow: '0px 0px 2px rgba(255, 255, 255, 0.48) inset',
                  }}
                >
                  <div className="col-span-2 ">
                    <Button
                      variant="ghost"
                      className="rounded-full border-0 p-0"
                      size="icon"
                      style={{ backgroundColor: 'transparent' }}
                    >
                      <ContactIcon
                        type={contact.contact_type}
                        iconUrl={contact.contact_icon}
                        iconColor={iconColor}
                        iconBg={iconBg}
                      />
                    </Button>
                  </div>
                  <div className="flex-1 col-span-8 break-words">
                    <p className="text-sm font-normal opacity-70" style={{ color: textColor }}>
                      {contact.contact_type}
                    </p>
                    <p className="text-[16px] font-semibold" style={{ color: textColor }}>
                      {contact.value}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </>
        )}

        {profileData.socials.length > 0 && (
          <SocialLinks
            socials={profileData.socials}
            title="Social Media"
            containerClassName="mb-3"
            containerStyle={{
              background: 'linear-gradient(0deg, rgba(255, 255, 255, 0.10) 0%, rgba(255, 255, 255, 0.03) 100%)',
              boxShadow: '0px 0px 2px rgba(255, 255, 255, 0.48) inset',
            }}
          />
        )}

        {profileData.google_review_status === '1' && (
          <GoogleReview link={profileData.google_review_link} textColor={profileData.text_color || '#FFFFFF'} />
        )}

        {profileData.media_status === '1' && profileData.medias.length > 0 && (
          <div className="mt-3 mb-3">
            <p className=" text-base font-medium mt-3 mb-3">
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
          </div>
        )}

        {profileData.videos.length > 0 && (
          <div className="mt-4 mb-3">
            <p className=" text-base font-medium mb-3">
              Videos{' '}
              <Link
                style={{ color: textColor }}
                href={`/videos/${slug}`}
                className="float-end hover:text-gray-300 transition-colors"
              >
                View all
              </Link>
            </p>
            <VideoList videos={profileData.videos} />
          </div>
        )}
      </div>

      <div className="h-20"></div>
      <div
        className="fixed bottom-2 left-0 rounded-full right-0 max-w-md mx-auto"
        style={{
          background: backgroundColor,
        }}
      >
        <Button
          onClick={handleSave}
          className="w-full py-6 rounded-full text-base"
          style={{ backgroundColor: buttonColor, color: iconColor }}
        >
          <IoMdPersonAdd className="size-6" />
          Save Contact
        </Button>
      </div>
    </div>
  );
}
