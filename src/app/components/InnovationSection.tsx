// Composant: InnovationSection
// Description: Liste les domaines d'innovation (IA, AgriTech, FinTech...).
// Remarque: cartes thématiques pour expliquer les axes du salon.
import { Brain, Sprout, Coins, Smartphone, Zap, Globe } from 'lucide-react';

export default function InnovationSection() {
  const domains = [
    {
      icon: Brain,
      title: 'Intelligence Artificielle',
      description: 'ML, Deep Learning, Computer Vision',
      color: 'from-[#16A34A] to-emerald-600',
      bgColor: 'bg-[#16A34A]/10',
    },
    {
      icon: Sprout,
      title: 'AgriTech',
      description: 'Agriculture intelligente et durable',
      color: 'from-green-600 to-lime-600',
      bgColor: 'bg-green-600/10',
    },
    {
      icon: Coins,
      title: 'FinTech',
      description: 'Solutions financières innovantes',
      color: 'from-[#2563EB] to-blue-600',
      bgColor: 'bg-[#2563EB]/10',
    },
    {
      icon: Smartphone,
      title: 'Mobile & Web',
      description: 'Applications et plateformes digitales',
      color: 'from-purple-600 to-pink-600',
      bgColor: 'bg-purple-600/10',
    },
    {
      icon: Zap,
      title: 'CleanTech',
      description: 'Énergies renouvelables et environnement',
      color: 'from-yellow-600 to-orange-600',
      bgColor: 'bg-yellow-600/10',
    },
    {
      icon: Globe,
      title: 'EdTech',
      description: 'Technologies éducatives',
      color: 'from-cyan-600 to-teal-600',
      bgColor: 'bg-cyan-600/10',
    },
  ];

  return (
    <section id="startups" className="py-20 bg-gradient-to-br from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Domaines d'innovation
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Les technologies qui transforment la Casamance et l'Afrique
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {domains.map((domain, index) => {
            const Icon = domain.icon;
            return (
              <div
                key={index}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-border hover:border-transparent hover:-translate-y-1"
              >
                <div className={`w-16 h-16 ${domain.bgColor} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <div className={`bg-gradient-to-br ${domain.color} bg-clip-text`}>
                    <Icon size={32} className="text-current" style={{ WebkitTextFillColor: 'transparent' }} />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {domain.title}
                </h3>
                <p className="text-muted-foreground">
                  {domain.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Featured startups */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center mb-8">Startups en vedette</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'AgriSmart',
                category: 'AgriTech',
                description: 'Plateforme d\'optimisation agricole par IA',
                image: 'https://images.unsplash.com/photo-1528901166007-3784c7dd3653?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw5fHxhZnJpY2FuJTIwaW5ub3ZhdGlvbiUyMHRlY2hub2xvZ3klMjBzdGFydHVwfGVufDF8fHx8MTc3NzQxMjE1NXww&ixlib=rb-4.1.0&q=80&w=1080',
              },
              {
                name: 'CasaPay',
                category: 'FinTech',
                description: 'Solution de paiement mobile pour le commerce local',
                image: 'https://images.unsplash.com/photo-1586980702112-04d8d47734b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw2fHxhZnJpY2FuJTIwaW5ub3ZhdGlvbiUyMHRlY2hub2xvZ3klMjBzdGFydHVwfGVufDF8fHx8MTc3NzQxMjE1NXww&ixlib=rb-4.1.0&q=80&w=1080',
              },
              {
                name: 'EduConnect',
                category: 'EdTech',
                description: 'Plateforme d\'apprentissage en ligne adaptée',
                image: 'https://images.unsplash.com/photo-1716399233137-5f18a8e3520d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxhZnJpY2FuJTIwaW5ub3ZhdGlvbiUyMHRlY2hub2xvZ3klMjBzdGFydHVwfGVufDF8fHx8MTc3NzQxMjE1NXww&ixlib=rb-4.1.0&q=80&w=1080',
              },
            ].map((startup, idx) => (
              <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={startup.image}
                    alt={startup.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <span className="inline-block bg-[#16A34A]/10 text-[#16A34A] px-3 py-1 rounded-full text-sm mb-3">
                    {startup.category}
                  </span>
                  <h4 className="text-xl font-bold text-foreground mb-2">{startup.name}</h4>
                  <p className="text-muted-foreground">{startup.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
