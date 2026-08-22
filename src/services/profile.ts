import { configs } from '@/constants/constants';
import { envValues } from '@/constants/envValues';
import { ApiResponse } from '@/types/profile';

export async function getProfileData(slug: string): Promise<ApiResponse> {
  console.log('API URL: ' + `${envValues.apiUrl}/card_profile?slug=${slug}`);

  const response = await fetch(`${envValues.apiUrl}/card_profile?slug=${slug}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    next: {
      revalidate: configs.apiCache,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch profile data');
  }

  return response.json();
}
