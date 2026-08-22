import DesignFive from '@/components/designs/DesignFive';
import DesignFour from '@/components/designs/DesignFour';
import DesignOne from '@/components/designs/DesignOne';
import DesignSix from '@/components/designs/DesignSix';
import DesignThree from '@/components/designs/DesignThree';
import DesignTwo from '@/components/designs/DesignTwo';
import { getProfileData } from '@/services/profile';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import DesignSeven from '@/components/designs/DesignSeven';

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ theme?: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const awaitedParams = await params;
    const { data } = await getProfileData(awaitedParams.slug);

    const title = data.name ? `${data.name} | Jaab NFC` : 'Jaab NFC';
    const description = data.description || 'Digital Business Card by Jaab NFC';

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        images: data.profile_image ? [{ url: data.profile_image }] : [],
        siteName: 'Jaab NFC',
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: data.profile_image ? [data.profile_image] : [],
        site: '@jaabcards',
      },
    };
  } catch {
    return {
      title: 'Jaab NFC',
      description: 'Digital Business Card by Jaab NFC',
    };
  }
}

export default async function UserProfile({ params, searchParams }: PageProps) {
  try {
    const awaitedParams = await params;
    const { data } = await getProfileData(awaitedParams.slug);

    const queryParams = await searchParams;

    const themeFromQuery = queryParams?.theme;

    const theme = themeFromQuery || data.theme;

    if (theme === '1') {
      return <DesignOne profileData={data} />;
    }

    if (theme === '2') {
      return <DesignTwo profileData={data} />;
    }

    if (theme === '3') {
      return <DesignThree profileData={data} />;
    }

    if (theme === '4') {
      return <DesignFour profileData={data} />;
    }

    if (theme == '5') {
      return <DesignFive profileData={data} />;
    }

    if (theme == '6') {
      return <DesignSix profileData={data} />;
    }
    if (theme == '7') {
      return <DesignSeven profileData={data} />;
    }
    return <DesignOne profileData={data} />;
    // return <DesignSeven profileData={data} />;
  } catch (error) {
    console.error('Error fetching profile:', error);
    return notFound();
  }
}
