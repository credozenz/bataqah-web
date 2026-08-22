import { configs } from '@/constants/constants';
import { envValues } from '@/constants/envValues';
import { GalleryResponse } from '@/types/profile';

export async function getGallery(slug: string, type: 'gallery' | 'videos'): Promise<GalleryResponse | null> {
  const response = await fetch(`${envValues.apiUrl}/gallery?slug=${slug}&type=${type}`, {
    method: 'GET',
    next: {
      revalidate: configs.apiCache,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch gallery data');
  }

  const data = await response.json();
  return data;
}
