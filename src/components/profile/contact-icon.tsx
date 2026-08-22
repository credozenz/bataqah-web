import { getContactIcon } from '@/lib/icon-utils';
import { cn } from '@/lib/utils';
import { ContactType } from '@/types/profile';
import Image from 'next/image';

interface ContactIconProps {
  type: ContactType;
  iconUrl: string;
  iconColor?: string;
  iconBg?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'size-4',
  md: 'size-5',
  lg: 'size-6',
};

const containerSizeClasses = {
  sm: 'w-[32px] h-[32px]',
  md: 'w-[42px] h-[42px]',
  lg: 'w-[48px] h-[48px]',
};

export function ContactIcon({
  type,
  iconUrl,
  iconColor = '#FFFFFF',
  iconBg = '#000000',
  size = 'md',
  className,
}: ContactIconProps) {
  const Icon = getContactIcon(type);
  const iconSize = sizeClasses[size];
  const containerSize = containerSizeClasses[size];

  return (
    <div
      className={cn(
        'rounded-full shadow-[0px_1px_7px_0px_rgba(140,114,0,0.20)] border-4 border-black/0 text-center flex justify-center items-center',
        containerSize,
        className,
      )}
      style={{ backgroundColor: iconBg }}
    >
      {Icon ? (
        <Icon className={iconSize} style={{ color: iconColor }} />
      ) : (
        <Image src={iconUrl} alt={type} width={20} height={20} className={iconSize} />
      )}
    </div>
  );
}
