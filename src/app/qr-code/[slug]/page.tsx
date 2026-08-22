import ProfileImage from '@/assets/images/profile.png';
import { Button } from '@/components/ui/button';
import { getProfileData } from '@/services/profile';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ShareSection } from '../../../components/qr-code/ShareSection';
import React from 'react';

interface QrcodeProps {
  params: Promise<{
    slug: string;
  }>;
}

const Qrcode = async ({ params }: QrcodeProps) => {
  const slug = (await params).slug;
  const data = await getProfileData(slug);

  if (!data) {
    notFound();
  }

  const { name, designation, background_color, text_color } = data.data;

  return (
    <div
      className="max-w-sm mx-auto min-h-screen md:rounded-3xl md:border-2 md:border-gray-600 md:mt-4 md:mb-4"
      style={{ backgroundColor: background_color, color: text_color }}
    >
      <div className="p-4">
        <Link href={`/${slug}`}>
          <Button variant="ghost" className="mb-3 hover:bg-white/10 rounded-full p-2" aria-label="Back to profile">
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
        <div
          className="p-4 text-center rounded-[20px]"
          style={{
            background: 'linear-gradient(0deg, rgba(255, 255, 255, 0.10) 0%, rgba(255, 255, 255, 0.03) 100%)',
            boxShadow: '0px 0px 2px rgba(255, 255, 255, 0.48) inset',
          }}
        >
          <Image
            src={data.data.profile_image || ProfileImage}
            alt={name}
            width={90}
            height={90}
            className="w-[90px] h-[90px] rounded-full border border-white/20 mx-auto -mt-14 object-cover"
          />
          <h1 className="font-bold mt-2">
            {name
              ?.replace(/\\n/g, '\n') // convert literal \n to real newlines
              .split('\n') // then split on actual newlines
              .map((line, index, array) => (
                <React.Fragment key={index}>
                  {line}
                  {index < array.length - 1 && <br />}
                </React.Fragment>
              ))}
          </h1>
          <p className="text-sm font-normal opacity-60">
            {designation
              ?.replace(/\\n/g, '\n') // convert literal \n to real newlines
              .split('\n') // then split on actual newlines
              .map((line, index, array) => (
                <React.Fragment key={index}>
                  {line}
                  {index < array.length - 1 && <br />}
                </React.Fragment>
              ))}
          </p>

          <ShareSection profileData={data.data} />
        </div>
      </div>
    </div>
  );
};

export default Qrcode;
