export default function Loading() {
  return (
    <div className="max-w-[1400px] mx-auto px-4 py-8 md:py-12 animate-pulse">
      <div className="flex flex-col md:flex-row gap-12">
        <div className="w-full md:w-1/2 aspect-square bg-gray-200 rounded-3xl"></div>
        <div className="w-full md:w-1/2 space-y-6">
          <div className="h-10 bg-gray-200 rounded-xl w-3/4"></div>
          <div className="h-6 bg-gray-200 rounded-md w-1/4"></div>
          <div className="space-y-2 pt-6">
            <div className="h-4 bg-gray-200 rounded-md w-full"></div>
            <div className="h-4 bg-gray-200 rounded-md w-full"></div>
            <div className="h-4 bg-gray-200 rounded-md w-3/4"></div>
          </div>
          <div className="space-y-4 pt-10">
             <div className="h-14 bg-gray-200 rounded-xl w-full"></div>
             <div className="h-14 bg-gray-200 rounded-xl w-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
