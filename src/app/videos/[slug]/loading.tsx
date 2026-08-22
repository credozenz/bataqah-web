import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="max-w-sm mx-auto bg-[#0f0d0a] min-h-screen">
      <div className="p-4">
        <Button variant="ghost" className="text-white mb-3 hover:bg-gray-800 rounded-full p-2">
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

        <Skeleton className="h-8 w-1/2 bg-gray-700 rounded-md mb-6" />

        <div className="grid gap-4">
          {[1, 2, 3, 4, 5].map((index) => (
            <div key={index} className="w-full bg-gray-800 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <Skeleton className="size-5 bg-gray-700" />
                <Skeleton className="h-5 w-24 bg-gray-700" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
