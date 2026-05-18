import { ArrowRight, Sparkles } from 'lucide-react';
import { images } from '../../assets/images';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={images.image8}
          alt="Innovation en Afrique"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/80 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-3xl">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white mb-6">
            <Sparkles size={18} className="text-[#16A34A]" />
            <span>Prochaine édition - 4 et 5 Décembre 2026 au Centre Culturel Régional de Ziguinchor</span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Osons l'innovation<br />
            <span className="bg-gradient-to-r from-[#16A34A] to-[#2563EB] bg-clip-text text-transparent">
              en Casamance
            </span>
          </h1>

          <p className="text-xl text-gray-200 mb-8 max-w-2xl">
            Le rendez-vous des talents, des startups et des technologies de demain.
            Connectez-vous à l'écosystème d'innovation le plus dynamique de la région.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="https://www.linkedin.com/showcase/casamance-innovation-tech/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-[#16A34A] to-[#2563EB] text-white px-8 py-4 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center space-x-2 group"
            >
              <span>Suivre CIT sur LinkedIn</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="https://www.facebook.com/p/Casamance-Innovation-Tech-61552957667741/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-lg hover:bg-white/20 transition-colors border border-white/20"
            >
              Nous suivre sur Facebook
            </a>
          </div>
        </div>
      </div>

      {/* Decorative gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent z-10"></div>
    </section>
  );
}
