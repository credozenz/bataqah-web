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

        <div className="grid grid-cols-2 gap-2 mt-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => (
            <Skeleton key={index} className="aspect-video rounded-lg bg-gray-800" />
          ))}
        </div>
      </div>
    </div>
  );
}
