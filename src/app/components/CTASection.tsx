import { ArrowRight, Rocket } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800 text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Gradient blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#16A34A] rounded-full filter blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#2563EB] rounded-full filter blur-3xl opacity-20"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#16A34A] to-[#2563EB] rounded-full mb-8">
          <Rocket size={40} className="text-white" />
        </div>

        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Prêt à rejoindre la révolution technologique ?
        </h2>

        <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
          Que vous soyez entrepreneur, étudiant, investisseur ou partenaire,
          CIT est votre porte d'entrée vers l'écosystème d'innovation de la Casamance
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
            href="#contact"
            className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-lg hover:bg-white/20 transition-colors border border-white/20"
          >
            Nous contacter
          </a>
        </div>

        <div className="mt-12 pt-12 border-t border-white/10">
          <p className="text-gray-400 mb-4">Rejoignez plus de 1,500 innovateurs</p>
          <div className="flex flex-wrap justify-center gap-8 items-center">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">80+</div>
              <div className="text-sm text-gray-400">Startups</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">30+</div>
              <div className="text-sm text-gray-400">Partenaires</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">15+</div>
              <div className="text-sm text-gray-400">Investisseurs</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">4</div>
              <div className="text-sm text-gray-400">Éditions</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
