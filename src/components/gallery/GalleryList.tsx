'use client';
import { cn } from '@/lib/utils';
import { Media } from '@/types/profile';
import Image from 'next/image';
import { useState } from 'react';
import ImageViewer from './ImageViewer';

interface GalleryListProps {
  medias: Media[];
  columns?: 2 | 3;
}

export default function GalleryList({ medias, columns = 3 }: GalleryListProps) {
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);

  if (!medias || medias.length === 0) {
    return null;
  }

  return (
    <>
      <div className={cn('grid gap-2', columns === 2 && 'grid-cols-2', columns === 3 && 'grid-cols-3')}>
        {medias?.map((media, index) => (
          <div
            key={index}
            className="relative aspect-video cursor-pointer transition-transform hover:scale-[1.02]"
            onClick={() => setSelectedMedia(media)}
          >
            <Image
              src={media.link}
              alt={media.description || `Gallery image ${index + 1}`}
              fill
              className="object-cover rounded-lg bg-gray-800 w-full h-auto"
            />
          </div>
        ))}
      </div>
      <ImageViewer media={selectedMedia} isOpen={!!selectedMedia} onClose={() => setSelectedMedia(null)} />
    </>
  );
}
