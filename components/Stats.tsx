const items = [
  { icon: "🏆", value: "500+", label: "Interventions réalisées", sub: "particuliers & professionnels" },
  { icon: "⭐", value: "4.9/5", label: "Note Google", sub: "avis vérifiés" },
  { icon: "⚡", value: "24h/24", label: "Disponibilité", sub: "7j/7, week-ends & fériés" },
  { icon: "🎯", value: "Gratuit", label: "Devis & déplacement", sub: "sans engagement" },
];

export default function Stats() {
  return (
    <section className="bg-blue-700 text-white py-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <div key={item.label} className="text-center">
            <div className="text-3xl mb-2">{item.icon}</div>
            <div className="text-3xl sm:text-4xl font-black mb-1">{item.value}</div>
            <div className="font-semibold text-blue-100">{item.label}</div>
            <div className="text-xs text-blue-200 mt-0.5">{item.sub}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
