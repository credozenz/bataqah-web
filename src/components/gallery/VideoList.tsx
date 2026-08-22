import { Video } from '@/types/profile';
import VideoLink from './VideoLink';

interface VideoListProps {
  videos: Video[];
}

export default function VideoList({ videos }: VideoListProps) {
  if (videos.length === 0) {
    return null;
  }

  return (
    <>
      <div className="grid gap-4">
        {videos.map((video, index) => (
          <VideoLink key={index} href={video.link} />
        ))}
      </div>
    </>
  );
}
