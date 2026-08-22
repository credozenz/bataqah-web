import VideoList from '@/components/gallery/VideoList';
import { Button } from '@/components/ui/button';
import { getGallery } from '@/services/gallery';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface GalleryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function GalleryPage({ params }: GalleryPageProps) {
  const slug = (await params).slug;

  const data = await getGallery(slug, 'videos');

  if (!data) {
    notFound();
  }

  const { videos } = data.data;

  return (
    <div className="max-w-sm mx-auto bg-[#0f0d0a] min-h-screen">
      <div className="p-4">
        <Link href={`/${slug}`}>
          <Button
            variant="ghost"
            className="text-white mb-3 hover:bg-gray-800 rounded-full p-2"
            aria-label="Back to profile"
          >
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

        <h1 className="text-white text-2xl font-bold mb-6">Videos</h1>

        {videos?.length > 0 && (
          <>
            <VideoList videos={videos} />
          </>
        )}

        {videos?.length === 0 && <p className="text-white text-center mt-8">No media content available</p>}
      </div>
    </div>
  );
}
