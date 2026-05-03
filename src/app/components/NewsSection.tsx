import { Calendar, ArrowRight } from 'lucide-react';
import { images } from '../../assets/images';

export default function NewsSection() {
  const news = [
    {
      title: 'CIT 2025 : Collaboration intelligente homme-machine',
      date: '5 Décembre 2025',
      category: 'Événement',
      excerpt: 'La 4ème édition s\'est ouverte à Ziguinchor sur le thème de l\'IA et du développement territorial.',
      image: images.collab_homme_machine,
      color: 'text-[#16A34A]',
      link: 'https://aps.sn/casamance-innovation-tech-la-4%E1%B5%89-edition-appelle-a-une-collaboration-intelligente-entre-lhomme-et-la-machine/',
    },
    {
      title: 'Première édition : Investir dans le numérique',
      date: '8 Décembre 2022',
      category: 'Historique',
      excerpt: 'Lancement du salon CIT à Ziguinchor, premier événement tech majeur de la Casamance.',
      image: images.osiris,
      color: 'text-purple-600',
      link: 'https://www.osiris.sn/Casamance-Innovation-Tech.html',
    },
  ];

  return (
    <section id="news" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Actualités
            </h2>
            <p className="text-lg text-muted-foreground">
              Les dernières nouvelles de l'écosystème CIT
            </p>
          </div>
          <button className="hidden md:flex items-center space-x-2 text-[#16A34A] hover:text-[#2563EB] transition-colors group">
            <span>Voir toutes les actualités</span>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {news.map((article, index) => (
            <article
              key={index}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all border border-border hover:-translate-y-1"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className={`${article.color} font-semibold text-sm`}>
                    {article.category}
                  </span>
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                    <Calendar size={14} />
                    <span>{article.date}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-[#16A34A] transition-colors">
                  {article.title}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {article.excerpt}
                </p>
                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-[#16A34A] hover:text-[#2563EB] transition-colors group/btn"
                >
                  <span>Lire l'article</span>
                  <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
