import { Skeleton } from '@/components/ui/skeleton';

export function ProfileSkeleton() {
  return (
    <div className="max-w-sm mx-auto">
      <div className="p-4">
        {/* Cover Image */}
        <Skeleton className="h-40 w-full rounded-t-2xl" />

        {/* Profile Image */}
        <div className="-mt-8 flex justify-center">
          <Skeleton className="h-24 w-24 rounded-full border-4 border-[#0f0d0a]" />
        </div>

        {/* Name and Designation */}
        <div className="mt-4 text-center">
          <Skeleton className="mx-auto h-6 w-1/2 bg-gray-700" />
          <Skeleton className="mx-auto mt-2 h-4 w-1/3 bg-gray-600" />
        </div>

        {/* Social Icons */}
        <div className="mt-6 flex justify-center space-x-4">
          <Skeleton className="h-10 w-10 rounded-full bg-gray-700" />
          <Skeleton className="h-10 w-10 rounded-full bg-gray-700" />
          <Skeleton className="h-10 w-10 rounded-full bg-gray-700" />
        </div>

        {/* Contact Details Section */}
        <div className="mt-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center space-x-4 py-3">
              <Skeleton className="h-10 w-10 rounded-full bg-gray-700" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-1/3 bg-gray-600" />
                <Skeleton className="h-5 w-2/3 bg-gray-700" />
              </div>
            </div>
          ))}
        </div>

        {/* Gallery Section */}
        <div className="mt-8">
          <Skeleton className="h-6 w-1/3 bg-gray-700" />
          <div className="mt-4 grid grid-cols-3 gap-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="aspect-square rounded-lg bg-gray-800" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
