export default function PartnersSection() {
  const partners = [
    { name: 'Partner 1', type: 'Premium' },
    { name: 'Partner 2', type: 'Gold' },
    { name: 'Partner 3', type: 'Premium' },
    { name: 'Partner 4', type: 'Silver' },
    { name: 'Partner 5', type: 'Gold' },
    { name: 'Partner 6', type: 'Premium' },
    { name: 'Partner 7', type: 'Silver' },
    { name: 'Partner 8', type: 'Gold' },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Nos partenaires
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ils nous font confiance et contribuent au succès de l'écosystème d'innovation
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-8 flex items-center justify-center hover:shadow-lg transition-shadow border border-border group"
            >
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-[#16A34A]/20 to-[#2563EB]/20 rounded-lg mx-auto mb-3 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="text-2xl font-bold bg-gradient-to-r from-[#16A34A] to-[#2563EB] bg-clip-text text-transparent">
                    {partner.name.slice(-1)}
                  </span>
                </div>
                <div className="font-semibold text-foreground">{partner.name}</div>
                <div className="text-xs text-muted-foreground mt-1">{partner.type}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-[#16A34A] to-[#2563EB] rounded-2xl p-12 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">
            Devenez partenaire de CIT
          </h3>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Associez votre marque à l'innovation et bénéficiez d'une visibilité unique auprès de l'écosystème tech
          </p>
          <div className="text-sm text-white/80 mb-4">
            Partenaire clé : Innov'Zig - Université Assane Seck de Ziguinchor
          </div>
          <a
            href="#contact"
            className="inline-block bg-white text-[#16A34A] px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
          >
            Découvrir les opportunités de partenariat
          </a>
        </div>
      </div>
    </section>
  );
}
