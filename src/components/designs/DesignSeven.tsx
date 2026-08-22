'use client';
import { cn, createVCard, handleContactSave, handleShare } from '@/lib/utils';
import { ProfileData } from '@/types/profile';
import { Copy, CopyCheck, MapPin, MoveRight, Phone, QrCode, Share } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import pf from '@/assets/theme5/pf.png';
import SocialLinks from '../shared/SocialLinks';
import GalleryList from '../gallery/GalleryList';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import Appointment from '../appointment/Appointment';
import { toast } from 'sonner';

interface DesignSevenProps {
  profileData: ProfileData;
}

function DesignSeven({ profileData }: DesignSevenProps) {
  const [appointmentOpen, setAppointmentOpen] = useState(false);
  const [vCardBlob, setVCardBlob] = useState<Blob | null>(null);
  const [mailCopied, setMailCopied] = useState(false);
  const [siteCopied, setSiteCopied] = useState(false);
  const params = useParams();
  const slug = params.slug as string;

  const phone = profileData.contacts.find((c) => c.contact_type === 'Phone')?.value || '';
  const email = profileData.contacts.find((c) => c.contact_type === 'Email')?.value || '';
  const location = profileData.contacts.find((c) => c.contact_type === 'Address')?.value || '';
  const website = profileData.contacts.find((c) => c.contact_type === 'Website')?.value || '';

  const textColor = profileData.text_color || '#000000';
  const iconColor = '#000000';
  const buttonColor = profileData.button_color || '#ffffff';
  const backgroundColor = profileData.background_color || '#000000';
  const headerColor = profileData.header_color || 'ffffff';

  const handleMailCopy = () => {
    navigator.clipboard.writeText(email);
    setMailCopied(true);
    toast.success('E-mail copied successfully');
    setTimeout(() => setMailCopied(false), 1500); //reset after 5 sec
  };
  const handleSiteCopy = () => {
    navigator.clipboard.writeText(email);
    setSiteCopied(true);
    toast.success('website link copied successfully');
    setTimeout(() => setSiteCopied(false), 1500); //reset after 5 sec
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
    <div className="container font-poppins">
      <div className="flex justify-center bg-gray-900">
        <div
          className={cn('min-h-screen flex flex-col w-full md:max-w-md md:p-4 p-2')}
          style={{ backgroundColor: backgroundColor, color: textColor }}
        >
          <div className="relative w-full">
            <Image
              src={profileData.banner}
              alt=""
              className="w-full h-auto sm:h-[215px] object-cover rounded-xl"
              width={1180}
              height={680}
            />
            <Link href={`/${slug}`}>
              <Button
                style={{ color: iconColor }}
                variant="ghost"
                className="absolute top-4 left-5 mb-3 hover:scale-105 rounded-full p-2"
                aria-label="Back to profile"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </Button>
            </Link>
          </div>

          <div
            className="mt-3 mb-2 grid grid-cols-2 gap-2 px-6 py-4 rounded-md shadow-md"
            style={{
              background: `linear-gradient(to bottom, ${headerColor} 0%, rgba(0,0,0,0.4) 100%)`,
            }}
          >
            <Image
              height={250}
              width={160}
              src={profileData.profile_image || pf}
              alt=""
              className="md:w-[95%] w-auto h-full rounded-md object-cover"
            />
            <div className="font-bebas flex justify-between flex-col gap-5">
              <div className="">
                <p className="text-xl">
                  {profileData.name
                    ?.replace(/\\n/g, '\n') // convert literal \n to real newlines
                    .split('\n') // then split on actual newlines
                    .map((line, index, array) => (
                      <React.Fragment key={index}>
                        {line}
                        {index < array.length - 1 && <br />}
                      </React.Fragment>
                    ))}
                </p>
                <p className="">
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
              </div>
              <div className=" flex gap-2" style={{ color: iconColor }}>
                <Link href={`/qr-code/${slug}`} style={{ backgroundColor: buttonColor }} className="p-2 rounded-full">
                  <QrCode size={32} className="hover:scale-90 transition-all duration-300 ease-in-out" />
                </Link>

                <button
                  onClick={() => {
                    handleShare({
                      title: profileData.name,
                      text: `Check out ${profileData.name}'s profile`,
                      url: profileData.vcf,
                    });
                  }}
                  style={{ backgroundColor: buttonColor }}
                  className="p-2 rounded-full"
                >
                  <Share size={32} className="hover:scale-90 transition-all duration-300 ease-in-out" />
                </button>
              </div>
            </div>
          </div>

          {/* buttons */}

          <div className="flex justify-between">
            <button
              onClick={handleSave}
              style={{
                background: `linear-gradient(to bottom, ${headerColor} 0%, rgba(0,0,0,0.4) 100%)`,
              }}
              className="px-3 py-2   font-semibold bg-gradient-to-b from-green-400 to-black/35 rounded-2xl"
            >
              Add Contact
            </button>

            {profileData.appointment_status === '1' && (
              <Dialog open={appointmentOpen} onOpenChange={setAppointmentOpen}>
                <DialogTrigger asChild>
                  <button
                    style={{
                      background: `linear-gradient(to bottom, ${headerColor} 0%, rgba(0,0,0,0.4) 100%)`,
                    }}
                    className="px-3 py-2 font-semibold bg-gradient-to-b from-green-400 to-black/35 rounded-2xl"
                  >
                    Appoinment
                  </button>
                </DialogTrigger>
                <DialogContent className="p-4 max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-center">Appointment</DialogTitle>
                    <DialogDescription asChild>
                      <div className="">
                        <Appointment profileData={profileData} onClose={() => setAppointmentOpen(false)} />
                      </div>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            )}
          </div>

          {/* about */}

          {profileData.description && (
            <div
              style={{
                background: `linear-gradient(to bottom, ${headerColor} 0%, rgba(0,0,0,0.4) 100%)`,
              }}
              className="rounded-xl bg-gradient-to-b from-green-300 to-black/40 px-4 py-2 mt-2"
            >
              <h2 className="font-semibold">About</h2>
              <div className="w-full h-[1px]" style={{ backgroundColor: '#000' }}></div>
              <div className="text-sm  my-2">
                {profileData.description.split('\\n').map((line, index, array) => (
                  <React.Fragment key={index}>
                    {line}
                    {index < array.length - 1 && <br />}
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}

          {/* social media */}
          {profileData.socials && profileData.socials.length > 0 && (
            <div
              style={{
                background: `linear-gradient(to bottom, ${headerColor} 0%, rgba(0,0,0,0.4) 100%)`,
              }}
              className="rounded-xl bg-gradient-to-b from-green-300 to-black/40 px-4 py-2 my-2"
            >
              <h2 className="font-semibold">Social Media</h2>
              <div className="w-full h-[1px]" style={{ backgroundColor: '#000' }}></div>

              <SocialLinks
                socials={profileData.socials}
                containerStyle={{ background: 'none', boxShadow: 'none' }}
                iconClassName="w-12 h-12"
              />
            </div>
          )}

          {/* contacta */}

          <div className="space-y-2">
            {/* Phone */}
            {phone && (
              <div
                className=" rounded-xl p-4 shadow-md flex justify-between items-center bg-gradient-to-b from-green-300 to-black/40"
                style={{
                  background: `linear-gradient(to bottom, ${headerColor} 0%, rgba(0,0,0,0.4) 100%)`,
                }}
              >
                <div className="flex-1">
                  <p className="text-md mb-1 font-semibold">Phone</p>
                  <p className="">{phone}</p>
                </div>
                <Link
                  href={`tel:${phone}`}
                  className="hover:scale-110 overflow-hidden transition-transform duration-300 ease-in-out"
                >
                  <Phone className="w-5 h-5  mr-2 " style={{ color: iconColor }} />
                </Link>
              </div>
            )}

            {/* Email */}
            {email && (
              <div
                className=" rounded-xl p-4 shadow-md flex items-center bg-gradient-to-b from-green-300 to-black/40"
                style={{
                  background: `linear-gradient(to bottom, ${headerColor} 0%, rgba(0,0,0,0.4) 100%)`,
                }}
              >
                <div className="flex-1">
                  <p className="text-md  mb-1 font-semibold">Mail</p>
                  <p className="">{email}</p>
                </div>
                <button
                  style={{ color: iconColor }}
                  onClick={handleMailCopy}
                  className="ml-2 p-2  rounded-lg relative"
                  title="Copy email"
                >
                  {mailCopied ? <CopyCheck /> : <Copy />}
                </button>
              </div>
            )}

            {/* Website */}
            {website && (
              <div
                className=" rounded-xl p-4 shadow-md flex items-center bg-gradient-to-b from-green-300 to-black/40"
                style={{
                  background: `linear-gradient(to bottom, ${headerColor} 0%, rgba(0,0,0,0.4) 100%)`,
                }}
              >
                <div className="flex-1">
                  <p className="text-md font-semibold mb-1">Website</p>
                  <p className="">{website}</p>
                </div>
                <button
                  onClick={handleSiteCopy}
                  className="ml-2 p-2 hover:opacity-80 rounded-lg relative"
                  title="Copy website"
                  style={{ color: iconColor }}
                >
                  {siteCopied ? <CopyCheck /> : <Copy />}
                </button>
              </div>
            )}

            {/* Location */}
            {location && (
              <div
                className=" rounded-xl p-4 shadow-md flex justify-between items-center bg-gradient-to-b from-green-300 to-black/40"
                style={{
                  background: `linear-gradient(to bottom, ${headerColor} 0%, rgba(0,0,0,0.4) 100%)`,
                }}
              >
                <div className="flex-1">
                  <p className="text-md font-semibold mb-1">Location</p>
                  <p className="">{location}</p>
                </div>
                <MapPin className="w-5 h-5  mr-2" style={{ color: iconColor }} />
              </div>
            )}
          </div>

          {/* gallery */}

          {profileData.media_status === '1' && profileData.medias.length > 0 && (
            <div
              className=" rounded-xl p-4 mt-5 shadow-xl bg-gradient-to-b from-green-300 to-black/40"
              style={{
                background: `linear-gradient(to bottom, ${headerColor} 0%, rgba(0,0,0,0.4) 100%)`,
              }}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-semibold ">Gallery</h1>
                </div>
                <Link
                  className="hover:scale-110 transition-transform duration-300 ease-in-out overflow-hidden"
                  style={{ color: iconColor }}
                  href={`/gallery/${slug}`}
                >
                  <MoveRight />
                </Link>
              </div>
              <div className="mt-5">
                <GalleryList medias={profileData.medias} columns={2} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DesignSeven;
