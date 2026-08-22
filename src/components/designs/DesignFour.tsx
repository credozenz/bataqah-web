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
import { FaQrcode, FaShareAlt } from 'react-icons/fa';
import { IoMdPersonAdd } from 'react-icons/io';

interface DesignPRops {
  profileData: ProfileData;
}

export default function DesignFoure({ profileData }: DesignPRops) {
  const [connectOpen, setConnectOpen] = useState(false);
  const [appointmentOpen, setAppointmentOpen] = useState(false);
  const [vCardBlob, setVCardBlob] = useState<Blob | null>(null);

  console.log(profileData.icon_color);

  const params = useParams();
  const slug = params.slug as string;
  const textColor = profileData.text_color || '#FFFFFF';
  const iconBg = profileData.button_color || '#000000';
  const buttonBg = profileData.button_color || '#000000';
  const backgroundColor = profileData.background_color || '#FFFFFF';
  const iconColor = profileData.icon_color || '#000000';

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
      className="container  max-w-md mx-auto min-h-screen md:rounded-3xl
         rounded-none overflow-hidden  md:border-2 md:border-gray-600 md:mt-4 md:mb-4 "
      style={{ backgroundColor: backgroundColor, color: textColor }}
    >
      <div className="relative " style={{ backgroundColor: backgroundColor }}>
        <Image
          src={profileData.banner || CoverImage}
          alt="cover"
          className="w-full max-h-[200px]"
          width={1920}
          height={1080}
        />
        <div className="wave-container -mt-14">
          <svg viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0,160L48,149.3C96,139,192,117,288,128C384,139,480,181,576,181.3C672,181,768,139,864,128C960,117,1056,139,1152,149.3C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              style={{ fill: backgroundColor }}
            ></path>
          </svg>
        </div>
        {/* <Image
          src={shapeTwo}
          alt="shape"
          className="w-full absolute left-0 right-0 bottom-0 -mb-7 z-10  "
          style={{
            filter: 'brightness(0 )', // This will make the image black
          }}
        /> */}
        {/* <Image
          src={shapeTwo}
          alt="shape"
          className="w-full absolute left-0 right-0 bottom-0 z-10 -mt-9"
          style={{
            backgroundColor: backgroundColor,
            mixBlendMode: 'overlay',
          }}
        /> */}
      </div>
      <div className=" text-center relative z-20 px-4 -mt-8 ">
        <div className="image-mask m-auto" style={{ width: 100, height: 100 }}>
          <Image
            src={profileData.profile_image || ProfileImage}
            alt="profile"
            width={100}
            height={100}
            className="mx-auto -mt-4 w-[100px] h-[100px]"
          />
        </div>
        <div className=" pt-2">
          <h1
            className="text-[22px] font-bold mb-0 leading-7"
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
        </div>
      </div>
      <div className="  text-center  relative">
        <div className="px-3">
          {profileData.socials.length > 0 && <SocialLinks socials={profileData.socials} containerClassName="mb-2" />}
        </div>
        {profileData.contact_status === '1' && (
          <div>
            <button
              onClick={() => {
                setConnectOpen(true);
              }}
              className="rounded-lg py-2 px-4 uppercase text-base mt-1"
              style={{ backgroundColor: profileData.button_color || '#000000', color: iconColor }}
            >
              Connect
            </button>

            <Connect profile={profileData} open={connectOpen} onOpenChange={setConnectOpen} />
          </div>
        )}
      </div>
      <div className="p-4">
        {profileData.description && (
          <div className="mb-4 border border-black/20 py-4 rounded-2xl px-3">
            <p className="text-base font-medium mb-2" style={{ color: textColor }}>
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

        {profileData.contacts.length > 0 && (
          <>
            {profileData.contacts.map((contact) => (
              <Link href={getContactUrl(contact)} key={`${contact.contact_type}-${contact.value}`}>
                <div className="grid grid-cols-10 gap-0 items-center border border-black/20 py-4 rounded-2xl mb-3 px-3">
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
                    <p className="text-sm font-normal opacity-70 " style={{ color: textColor }}>
                      {contact.contact_type}
                    </p>
                    <p className="text-[16px] font-semibold break-after-column " style={{ color: textColor }}>
                      {contact.value}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </>
        )}

        {profileData.google_review_status === '1' && (
          <GoogleReview link={profileData.google_review_link} textColor={profileData.text_color || '#FFFFFF'} />
        )}

        {profileData.media_status === '1' && profileData.medias.length > 0 && (
          <div className="mt-3 mb-3">
            <p className="text-base font-medium mt-3 mb-3">
              Gallery{' '}
              <Link href={`/gallery/${slug}`} className="float-end hover:text-gray-300 transition-colors">
                View all
              </Link>
            </p>
            <GalleryList medias={profileData.medias} columns={2} />
          </div>
        )}

        {profileData.videos.length > 0 && (
          <div className="mt-4 mb-3">
            <p className="text-base font-medium mb-3">
              Videos{' '}
              <Link href={`/videos/${slug}`} className="float-end hover:text-gray-300 transition-colors">
                View all
              </Link>
            </p>
            <VideoList videos={profileData.videos} />
          </div>
        )}

        {profileData.appointment_status === '1' && (
          <div>
            <Dialog open={appointmentOpen} onOpenChange={setAppointmentOpen}>
              <DialogTrigger asChild>
                <Button className="w-full py-6  text-base" style={{ backgroundColor: buttonBg, color: iconColor }}>
                  Appointment
                  {/* <FaCalendarAlt className="size-6 m-auto" style={{ color: profileData.button_color || '#FFC300' }} /> */}
                </Button>
              </DialogTrigger>
              <DialogContent className="p-4 max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-center">Appointment</DialogTitle>
                  <DialogDescription>
                    <Appointment profileData={profileData} onClose={() => setAppointmentOpen(false)} />
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </div>

      <div className="h-20"></div>
      <div className="fixed bottom-2 left-0  right-0  max-w-md mx-auto px-2 ">
        <div className="grid grid-cols-2 gap-1">
          <div className="col-span-1 ">
            <button
              onClick={() => {
                handleShare({
                  title: profileData.name,
                  text: `Check out ${profileData.name}'s profile`,
                  url: profileData.vcf,
                });
              }}
              className=" absolute left-2 bottom-2 inline-block rounded-full p-3 z-50"
              style={{ backgroundColor: buttonBg, color: iconColor }}
            >
              <FaShareAlt className="size-5 " />
            </button>
            <Link
              href={`/qr-code/${slug}`}
              className=" inline-block absolute left-12 bottom-2 rounded-full p-3 z-50 ml-2"
              style={{ backgroundColor: buttonBg }}
            >
              <FaQrcode className="size-5 " style={{ color: iconColor }} />
            </Link>
          </div>
          <div className="col-span-1">
            <Button
              onClick={handleSave}
              className="w-full rounded-full py-6  text-base"
              style={{ backgroundColor: buttonBg }}
            >
              <IoMdPersonAdd
                className="size-6"
                style={{
                  color: iconColor,
                }}
              />
              <span
                style={{
                  color: iconColor,
                }}
              >
                Save Contact
              </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
