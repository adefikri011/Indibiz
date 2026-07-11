export default function AdminPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Dashboard
        </h1>
        <p className="text-gray-500 mt-2">
          Statistik dan performa website indibizdatsum.com secara realtime.
        </p>
      </div>

      {/* Info Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Website</p>
          <p className="text-xl font-semibold mt-2">
            indibizdatsum.com
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Analytics</p>
          <p className="text-xl font-semibold mt-2 text-green-600">
            Umami Connected
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Status</p>
          <p className="text-xl font-semibold mt-2 text-blue-600">
            Live & Tracking
          </p>
        </div>
      </div>

      {/* Embedded Umami Dashboard */}
      <div className="rounded-2xl border bg-white shadow-sm overflow-hidden">
        <iframe
          src="https://cloud.umami.is/share/QVtQnYndMlAe4yvi"
          className="w-full h-[900px]"
          loading="lazy"
        />
      </div>
    </div>
  );
}