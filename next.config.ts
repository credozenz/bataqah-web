import { appConfigs } from '@/constants/config';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'jaab.tnscards.in',
      },
      {
        protocol: 'https',
        hostname: 'contactme.jaabnfcsmartbusinesscard.com',
      },
      {
        protocol: 'https',
        hostname: 'manage.jaabnfcsmartbusinesscard.com',
      },
      {
        protocol: 'https',
        hostname: 'manage.bataqah.com',
      },
    ],
    unoptimized: appConfigs.image.unoptimized,
  },
};

export default nextConfig;
