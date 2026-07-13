import { serviceImages } from "@/lib/images";

type Props = {
  title?: string;
  subtitle?: string;
  compact?: boolean;
  className?: string;
};

export default function ChemisageBeforeAfter({
  title = "Avant / Après chemisage",
  subtitle = "Contrôle par inspection caméra avant et après intervention",
  compact = false,
  className = "",
}: Props) {
  const imageHeight = compact ? "h-40" : "h-56 md:h-72";

  return (
    <div className={className}>
      {compact ? (
        <h3 className="text-lg font-black text-slate-900 mb-4 text-center md:text-left">
          Avant / Après intervention
        </h3>
      ) : (
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-slate-900 mb-3">{title}</h2>
          <p className="text-slate-500 max-w-2xl mx-auto">{subtitle}</p>
        </div>
      )}

      <div className={`grid md:grid-cols-2 gap-6 ${compact ? "" : "max-w-5xl mx-auto"}`}>
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          <div className={`relative ${imageHeight} bg-slate-900 overflow-hidden`}>
            <img
              src={serviceImages.chemisageBefore.src}
              alt={serviceImages.chemisageBefore.alt}
              className="w-full h-full object-cover object-center scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full">
              Avant intervention
            </span>
            <div className="absolute inset-8 border-2 border-white/20 rounded-full pointer-events-none" />
          </div>
          <div className="px-5 py-4">
            <p className="text-sm font-bold uppercase tracking-wide text-red-700 mb-1">
              État initial
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              Fissures, corrosion, dépôts graisseux et parois dégradées visibles à la caméra
              endoscopique.
            </p>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          <div className={`relative ${imageHeight} bg-slate-900 overflow-hidden`}>
            <img
              src={serviceImages.chemisageAfter.src}
              alt={serviceImages.chemisageAfter.alt}
              className="w-full h-full object-cover object-center scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <span className="absolute top-3 left-3 bg-green-600 text-white text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full">
              Après intervention
            </span>
            <div className="absolute inset-8 border-2 border-white/30 rounded-full pointer-events-none" />
          </div>
          <div className="px-5 py-4">
            <p className="text-sm font-bold uppercase tracking-wide text-green-700 mb-1">
              Après chemisage CIPP
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              Conduite lisse, étanche et restaurée — nouveau revêtement en résine garanti 10 ans.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
