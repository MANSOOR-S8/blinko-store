export default function DashboardLoading() {
  return (
    <div className="flex h-full min-h-[50vh] flex-col items-center justify-center p-8">
      <div className="h-10 w-10 animate-bounce rounded-full bg-[var(--primary-color)] shadow-lg"></div>
      <p className="mt-4 text-[var(--light-text)] animate-pulse font-medium">Loading Dashboard Data...</p>
    </div>
  );
}
