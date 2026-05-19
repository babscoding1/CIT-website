import { Building, Rocket, Briefcase, GraduationCap } from 'lucide-react';
import { images } from '../../assets/images';
export default function CommunitySection() {
  const community = [
    {
      icon: Rocket,
      title: 'Startups',
      count: '50+',
      description: 'Startups accompagnées',
      image: images.startup,
      color: 'from-[#16A34A] to-emerald-600',
    },
    {
      icon: GraduationCap,
      title: 'Jeunes formés',
      count: '3000+',
      description: 'Jeunes formés',
      image: images.form_robotique_6,
      color: 'from-[#2563EB] to-blue-600',
    },
    {
      icon: Briefcase,
      title: 'Investisseurs',
      count: '15+',
      description: 'Fonds & Angels',
      image: images.visite_kanarimagik2,
      color: 'from-purple-600 to-pink-600',
    },
    {
      icon: Building,
      title: 'Partenaires',
      count: '30+',
      description: 'Entreprises & institutions',
      image: images.partenaire,
      color: 'from-orange-600 to-red-600',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Notre communauté
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Un écosystème diversifié et dynamique qui rassemble tous les acteurs de l'innovation
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {community.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
              >
                {/* Background image */}
                <div className="aspect-[4/5] relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${item.color} opacity-80 group-hover:opacity-90 transition-opacity`}></div>
                </div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                  <div className={`w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon size={24} />
                  </div>
                  <h3 className="text-2xl font-bold mb-1">{item.title}</h3>
                  <div className="text-3xl font-bold mb-2">{item.count}</div>
                  <p className="text-white/90">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
