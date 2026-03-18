export default function ShopLoading() {
  return (
    <div className="mx-auto flex w-full max-w-[1400px] flex-col items-center justify-center py-20">
      <div className="relative flex h-24 w-24 items-center justify-center">
        <div className="absolute h-full w-full animate-ping rounded-full bg-orange-200 opacity-75"></div>
        <div className="relative h-12 w-12 rounded-full bg-orange-500 shadow-xl flex items-center justify-center">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
        </div>
      </div>
      <p className="mt-6 text-xl font-semibold text-gray-700 animate-pulse">Blinko<span className="text-orange-500">.</span></p>
      <p className="text-gray-500 text-sm mt-2">Loading products...</p>
    </div>
  );
}
