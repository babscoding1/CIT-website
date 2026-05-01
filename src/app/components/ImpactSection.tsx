import { Users, Building2, Calendar, Award } from 'lucide-react';

export default function ImpactSection() {
  const stats = [
    {
      icon: Users,
      value: '3000+',
      label: 'Participants',
      color: 'from-[#16A34A] to-emerald-600',
    },
    {
      icon: Building2,
      value: '50+',
      label: 'Startups',
      color: 'from-[#2563EB] to-blue-600',
    },
    {
      icon: Calendar,
      value: '5',
      label: 'Éditions',
      color: 'from-[#16A34A] to-[#2563EB]',
    },
    {
      icon: Award,
      value: '30+',
      label: 'Partenaires',
      color: 'from-purple-600 to-pink-600',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Notre impact en chiffres
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Un écosystème dynamique qui transforme les idées en innovations concrètes
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="relative group"
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-border">
                  <div className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="text-white" size={28} />
                  </div>
                  <div className="text-4xl font-bold text-foreground mb-2">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity -z-10`}></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
