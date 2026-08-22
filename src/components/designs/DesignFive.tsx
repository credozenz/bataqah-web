'use client';
import { ProfileData, Social } from '@/types/profile';
import { ArrowLeft, Copy, CopyCheck, Globe, Mail, MapPin, Phone, Plus, QrCode } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import bg from '@/assets/theme5/bg.png';
import pf from '@/assets/theme5/pf.png';
import Image from 'next/image';
import { cn, createVCard, handleContactSave } from '@/lib/utils';
import GalleryList from '../gallery/GalleryList';
import { toast } from 'sonner';

interface DesignFiveProps {
  profileData: ProfileData;
}

function DesignFive({ profileData }: DesignFiveProps) {
  // const [connectOpen, setConnectOpen] = useState(false);
  const [mailCopied, setMailCopied] = useState(false);
  const [siteCopied, setSiteCopied] = useState(false);
  const [vCardBlob, setVCardBlob] = useState<Blob | null>(null);
  const params = useParams();
  const slug = params.slug as string;
  const textColor = profileData.text_color || '#000000';
  // const iconBg= '#000000'
  const iconColor = profileData.icon_color || '#000000';
  const buttonColor = profileData.button_color || '#ffffff';
  console.log(profileData);
  const backgroundColor = profileData.background_color || '#000000';
  const headerColor = profileData.header_color || '#ffffff';

  const phone = profileData.contacts.find((c) => c.contact_type === 'Phone')?.value || '';
  const email = profileData.contacts.find((c) => c.contact_type === 'Email')?.value || '';
  const location = profileData.contacts.find((c) => c.contact_type === 'Address')?.value || '';
  const website = profileData.contacts.find((c) => c.contact_type === 'Website')?.value || '';

  useEffect(() => {
    // Create vCard on component mount
    const createVCardBlob = async () => {
      const blob = await createVCard(profileData);
      setVCardBlob(blob);
    };
    createVCardBlob();
  }, [profileData]);

  const handleMailCopy = () => {
    navigator.clipboard.writeText(email);
    setMailCopied(true);
    toast.success('E-mail copied successfully');
    setTimeout(() => setMailCopied(false), 1500); //reset after 5 sec
  };
  const handleSiteCopy = () => {
    navigator.clipboard.writeText(website);
    setSiteCopied(true);
    toast.success('Website copied successfully');
    setTimeout(() => setSiteCopied(false), 1500); //reset after 1.5 sec
  };
  const handleSave = async () => {
    try {
      if (!vCardBlob) {
        console.error('vCard not created yet');
        return;
      }
      await handleContactSave(profileData);
      // setConnectOpen(false);
    } catch (error) {
      console.error('Error saving contact:', error);
    }
  };

  return (
    <div>
      <div className="flex justify-center bg-gray-900">
        <div
          className={cn(
            'min-h-screen flex flex-col w-full md:max-w-lg',
            //  'bg-gradient-to-b from-black to-blue-950'
          )}
          style={{ backgroundColor: backgroundColor, color: textColor }}
        >
          <div className="overflow-y-auto pb-5 z-10">
            <div className="relative w-full" style={{ backgroundColor: backgroundColor }}>
              <Image
                src={profileData.banner || bg}
                alt=""
                className="w-full h-auto sm:h-[40vh] object-cover rounded-b-xl"
                width={1180}
                height={480}
              />
              <Link href={`/${slug}`}>
                <button
                  className=" absolute top-4 left-5 p-2 rounded-full border border-gray-900 "
                  style={{ backgroundColor: backgroundColor, color: iconColor }}
                >
                  <ArrowLeft />
                </button>
              </Link>
            </div>

            <div className="relative md:px-4 px-2 -mt-14 sm:-mt-20">
              <div
                className=" rounded-xl shadow-xl p-5 mb-4 relative z-30 max-h-[40vh]"
                style={{ backgroundColor: headerColor }}
              >
                <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 ">
                  <div className="w-32 h-32 rounded-full  overflow-hidden">
                    <Image
                      src={profileData.profile_image || pf}
                      alt="profile"
                      className="w-full h-full object-cover"
                      width={90}
                      height={80}
                    />
                  </div>
                </div>

                <div className="text-center mb-2 mt-10" style={{ color: textColor }}>
                  <h1 className="text-xl font-bold">
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
                  {profileData.designation && (
                    <p className=" text-md mt-1">
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
                  )}
                  <p className="text-md">
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

              <div className="space-y-3">
                {/* Phone */}
                {phone && (
                  <div
                    className=" rounded-xl p-4 shadow-md flex items-center"
                    style={{ backgroundColor: headerColor, color: textColor }}
                  >
                    <Phone className="w-6 h-6  mr-4" />
                    <div className="flex-1">
                      <p className="text-md mb-1">Phone</p>
                      <p className=" font-[600]">{phone}</p>
                    </div>
                  </div>
                )}

                {/* Email */}
                {email && (
                  <div
                    className=" rounded-xl p-4 shadow-md flex items-center"
                    style={{ backgroundColor: headerColor, color: textColor }}
                  >
                    <Mail className="w-6 h-6  mr-4" />
                    <div className="flex-1">
                      <p className="text-md  mb-1">Mail</p>
                      <p className="font-[600]">{email}</p>
                    </div>
                    <button onClick={handleMailCopy} className="ml-2 p-2 rounded-lg relative" title="Copy email">
                      {mailCopied ? (
                        <CopyCheck className="md:h-6 md:w-6 h-5 w-5" />
                      ) : (
                        <Copy className="md:h-6 md:w-6 h-5 w-5" />
                      )}
                    </button>
                  </div>
                )}

                {/* Website */}
                {website && (
                  <div
                    className=" rounded-xl p-4 shadow-md flex items-center"
                    style={{ backgroundColor: headerColor, color: textColor }}
                  >
                    <Globe className="w-6 h-6  mr-4" />
                    <div className="flex-1">
                      <p className="text-md  mb-1">Website</p>
                      <p className=" font-[600]">{website}</p>
                    </div>
                    <button
                      onClick={handleSiteCopy}
                      className="ml-2 p-2 hover:opacity-80 rounded-lg relative"
                      title="Copy email"
                    >
                      {siteCopied ? (
                        <CopyCheck className="md:h-6 md:w-6 h-5 w-5" />
                      ) : (
                        <Copy className="md:h-6 md:w-6 h-5 w-5" />
                      )}
                    </button>
                  </div>
                )}

                {/* Location */}
                {location && (
                  <div
                    className=" rounded-xl p-4 shadow-md flex items-center"
                    style={{ backgroundColor: headerColor, color: textColor }}
                  >
                    <MapPin className="w-6 h-6  mr-4" />
                    <div className="flex-1">
                      <p className="text-md  mb-1">Location</p>
                      <p className=" font-[600]">{location}</p>
                    </div>
                  </div>
                )}

                {/* Social Media */}
                {profileData.socials && profileData.socials.length > 0 && (
                  <div className=" rounded-xl p-4 shadow-md" style={{ backgroundColor: headerColor, color: textColor }}>
                    <h3 className="font-bold text-xl mb-3">Social Media</h3>

                    <DynamicSocialButtons socials={profileData.socials} />
                  </div>
                )}
                {profileData.media_status === '1' && profileData.medias.length > 0 && (
                  <div
                    className=" rounded-xl p-4 shadow-md mb-4"
                    style={{ backgroundColor: headerColor, color: textColor }}
                  >
                    <div className="flex justify-between">
                      <h3 className=" text-xl font-bold mb-3" style={{ color: textColor }}>
                        Gallery
                      </h3>
                      <Link
                        style={{ color: textColor }}
                        href={`/gallery/${slug}`}
                        className="float-end hover:text-gray-300  text-sm hover:underline transition-all"
                      >
                        View all
                      </Link>
                    </div>

                    <div className="">
                      {/* {images.map((image, k) => (
                      <Image key={k} alt="gallary" src={image} className="overflow-hidden mb-2 w-full" />
                    ))} */}

                      <div>
                        <GalleryList medias={profileData.medias} columns={2} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Fixed Bottom Buttons */}
          <div className="fixed bottom-0 left-0 right-0  shadow-lg z-30 mb-1">
            <div className="flex items-center justify-between  max-w-lg md:px-4 px-2 mx-auto">
              <div className="flex gap-2">
                {slug && (
                  <div className="flex-shrink-0">
                    <Link
                      href={`/qr-code/${slug}`}
                      style={{ backgroundColor: buttonColor }}
                      className="md:w-16 w-14 h-14 md:h-16 flex items-center justify-center  rounded-full  transition-colors"
                    >
                      <QrCode
                        className="md:w-12 h-10 w-10 md:h-12 hover:scale-90 transition-all duration-300"
                        style={{ color: iconColor }}
                      />
                    </Link>
                  </div>
                )}

                {/* Call Button */}

                {phone && (
                  <Link href={`tel:${phone}`} className="">
                    <button
                      style={{ backgroundColor: buttonColor }}
                      className="md:w-16 w-14 h-14 md:h-16 flex items-center justify-center rounded-full  transition-colors"
                    >
                      <Phone
                        className="md:w-10 w-10 h-10 md:h-10 hover:scale-90 transition-all duration-300"
                        style={{ color: iconColor }}
                      />
                    </button>
                  </Link>
                )}
              </div>

              {/* Add to Contact Button (Bigger) */}
              <div onClick={handleSave} className="flex-shrink-0">
                <button
                  style={{ backgroundColor: buttonColor, color: iconColor }}
                  className=" h-14 md:h-16  flex-shrink text-sm md:text-base font-semibold px-2 py-1  md:px-4 md:py-3 rounded-full flex items-center md:gap-2 justify-center hover:bg-gray-800 transition-colors"
                >
                  Add to Contact
                  <Plus className="md:w-6 md:h-6 " />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DesignFive;

interface DynamicSocialButtonsProps {
  socials: Social[];
}

// Map social types to their brand colors

function DynamicSocialButtons({ socials }: DynamicSocialButtonsProps) {
  if (!socials.length) return null;

  return (
    <div className="flex space-x-3">
      {socials.map((social, index) => {
        return (
          <Link href={social.value} key={index} target="_blank" rel="noopener noreferrer">
            <button
              className={`w-10 h-10  rounded-xl flex items-center justify-center hover:opacity-80 transition-opacity`}
            >
              <Image
                src={social.social_icon || '/placeholder.svg'}
                alt={social.social_type}
                width={24}
                height={24}
                className="w-full h-auto"
              />
            </button>
          </Link>
        );
      })}
    </div>
  );
}
