import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Media } from '@/types/profile';
import Image from 'next/image';

interface ImageViewerProps {
  media: Media | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ImageViewer({ media, isOpen, onClose }: ImageViewerProps) {
  if (!media) return null;

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => !open && onClose()}
      // className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <DialogContent className="max-w-[90vw] max-h-[90vh] p-0 overflow-hidden bg-white rounded-lg shadow-lg">
        <div className="relative w-full h-full min-h-[60vh]">
          <Image
            src={media.link}
            alt={media.description || 'Gallery image'}
            fill
            className="object-contain transition duration-500 ease-in-out"
            priority
          />
          {media.description && (
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/50 text-white transition duration-500 ease-in-out">
              <p className="text-lg font-medium">{media.description}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
