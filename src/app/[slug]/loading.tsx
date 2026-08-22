import { ProfileSkeleton } from '@/components/ui/profile-skeleton';

export default function Loading() {
  return (
    <div className="bg-[#0f0d0a] min-h-screen">
      <ProfileSkeleton />
    </div>
  );
}
