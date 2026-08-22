'use client';

import { Social } from '@/types/profile';
import Image from 'next/image';
import Link from 'next/link';

interface SocialLinksProps {
  socials: Social[];
  className?: string;
  containerClassName?: string;
  containerStyle?: React.CSSProperties;
  title?: string;
  iconClassName?: string;
}

export default function SocialLinks({ 
  socials, 
  className = '', 
  containerClassName = '',
  containerStyle,
  title,
  iconClassName = 'w-10 h-10'
}: SocialLinksProps) {
  if (!socials.length) return null;

  const defaultContainerStyle = {
    background: 'linear-gradient(0deg, rgba(255, 255, 255, 0.10) 0%, rgba(255, 255, 255, 0.03) 100%)',
    boxShadow: '0px 0px 2px rgba(255, 255, 255, 0.48) inset',
    ...containerStyle
  };

  return (
    <>
      {title && <p className="text-white text-base font-medium mb-3">{title}</p>}
      <div
        className={`bg-[linear-gradient(0deg,_rgba(255,_255,_255,_0.10)_0%,_rgba(255,_255,_255,_0.03)_100%)] [box-shadow:0px_0px_2px_rgba(255,_255,_255,_0.48)_inset] shadow flex gap-3 justify-center p-3 rounded-2xl mt-3 ${containerClassName} ${className}`}
        style={defaultContainerStyle}
      >
        {socials.map((social, index) => (
          <Link href={social.value} key={index} className="text-center rounded-lg text-black">
            <Image 
              src={social.social_icon} 
              alt={social.social_type} 
              width={24} 
              height={24} 
              className={iconClassName}
            />
          </Link>
        ))}
      </div>
    </>
  );
}
