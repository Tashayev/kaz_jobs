export default function Loading() {
  // Or a custom loading skeleton component
  return (
    <div className="max-w-5xl mx-auto px-6 py-10 animate-pulse">
      <div className="h-6 w-32 bg-gray-200 rounded mb-8" />
      <div className="h-10 w-2/3 bg-gray-200 rounded mb-4" />
      <div className="h-4 w-1/3 bg-gray-200 rounded mb-8" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-4 bg-gray-200 rounded" />
          ))}
        </div>
        <div className="h-48 bg-gray-200 rounded-xl" />
      </div>
    </div>
  )
}
