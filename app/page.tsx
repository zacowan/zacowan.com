import Vercel from "@/components/icons/vercel";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center space-y-4">
      <div className="text-4xl md:text-6xl">Engineering in NYC.</div>
      <div className="text-3xl md:text-5xl text-neutral-400">
        Exploring design & experience.
      </div>
      <div className="flex flex-col text-xl md:text-2xl gap-4 mt-12 items-center justify-center">
        <div className="space-x-4">
          <span>Building at</span>
          <a
            href="https://vercel.com/careers"
            className="border-neutral-800 border rounded-full px-5 py-3 inline-flex items-center justify-center hover:bg-neutral-900"
          >
            <Vercel />
          </a>
        </div>
        <div className="space-x-2 space-y-2 text-neutral-400 text-md md:text-lg text-center">
          <span className="block md:inline">Previously at</span>
          <span className="block md:inline">
            <span className="border-neutral-800 border rounded-full px-3 py-1 inline-flex items-center justify-center">
              American Express
            </span>
            <span className="border-neutral-800 border rounded-full px-3 py-1 inline-flex items-center justify-center">
              Lockheed Martin
            </span>
          </span>
        </div>
      </div>
    </main>
  );
}
