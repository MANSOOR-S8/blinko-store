export default function Loading() {
  return (
    <div className="min-h-[60vh] w-full flex flex-col items-center justify-center gap-4 bg-white/50 backdrop-blur pointer-events-none">
      <div className="w-12 h-12 border-4 border-gray-200 border-t-[var(--primary-color)] rounded-full animate-spin shadow-md"></div>
      <p className="text-[var(--text-color)] font-medium animate-pulse">Loading content...</p>
    </div>
  );
}
