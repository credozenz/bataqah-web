'use client';

import { Button } from '@/components/ui/button';
import { handleShare } from '@/lib/utils';
import { ProfileData } from '@/types/profile';
import QRCode from 'react-qr-code';

interface ShareSectionProps {
  profileData: ProfileData;
}

export const ShareSection = ({ profileData }: ShareSectionProps) => {
  const shareUrl = profileData.vcf;

  return (
    <div className="p-5">
      <div className="bg-white p-4 rounded-lg">
        <QRCode value={shareUrl} style={{ width: '100%', height: 'auto' }} />
      </div>
      <Button
        onClick={() => {
          handleShare({
            title: profileData.name,
            text: `Check out ${profileData.name}'s digital business card`,
            url: shareUrl,
          });
        }}
        className="text-white mt-3 uppercase h-12 w-full"
        style={{
          backgroundColor: profileData.button_color || '#000000',
          color: profileData.text_color || '#ffffff',
        }}
      >
        Share
      </Button>
    </div>
  );
};
