import { TEL_DISPLAY, telHref } from "@/lib/contact";

export default function UrgenceBand() {
  return (
    <div
      id="urgence"
      className="bg-gradient-to-r from-red-600 via-red-500 to-orange-500 text-white py-4 px-4"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 text-center sm:text-left">
        <div className="flex items-center gap-2 font-semibold">
          <span className="text-xl animate-pulse">🚨</span>
          <span>
            Fuite d&apos;eau ? Canalisation bouchée ? Urgence assainissement ?
          </span>
        </div>
        <span className="hidden sm:block text-red-200">—</span>
        <a
          href={telHref}
          className="text-2xl font-black tracking-wide border-b-2 border-white/60 hover:border-white transition-colors"
        >
          {TEL_DISPLAY}
        </a>
        <span className="text-sm text-red-100 font-medium">
          Disponible 24h/24 — 7j/7
        </span>
      </div>
    </div>
  );
}
