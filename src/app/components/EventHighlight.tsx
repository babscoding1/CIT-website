import { Calendar, MapPin, Users, Clock } from 'lucide-react';
import { images } from '../../assets/images';

export default function EventHighlight() {
  return (
    <section id="events" className="py-20 bg-gradient-to-br from-slate-900 to-slate-800 text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-block bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
            <span className="text-[#16A34A]">Prochaine édition</span>
          </div>
          <h2 className="text-4xl font-bold mb-4">
            CIT 2026 - 5 ans déjà, d'innovations, de réseautages, d'inspirations...
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            RV en décembre 2026 à Ziguinchor pour la 5 ème édition avec pleins de surprises et de nouveautés en Casamance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Event details card */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h3 className="text-2xl font-bold mb-6">Édition 2026</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-[#16A34A] rounded-lg flex items-center justify-center flex-shrink-0">
                  <Calendar size={24} />
                </div>
                <div>
                  <div className="font-semibold">Dates</div>
                  <div className="text-gray-300">4-5 Décembre 2026</div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-[#2563EB] rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <div className="font-semibold">Lieu</div>
                  <div className="text-gray-300">Centre Culturel, Ziguinchor, Sénégal</div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users size={24} />
                </div>
                <div>
                  <div className="font-semibold">Thématique</div>
                  <div className="text-gray-300">Intelligence Artificielle & Collaboration</div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock size={24} />
                </div>
                <div>
                  <div className="font-semibold">Casamance Innovation Tech</div>
                  <div className="text-gray-300">Osons l'innovation en Casamance</div>
                </div>
              </div>
            </div>

            <a
              href="https://www.linkedin.com/showcase/casamance-innovation-tech/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full mt-8 bg-gradient-to-r from-[#16A34A] to-[#2563EB] text-white px-8 py-4 rounded-lg hover:opacity-90 transition-opacity block text-center"
            >
              Restez informé sur LinkedIn
            </a>
          </div>

          {/* Historical editions */}
          <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
            <img
              src= {images.mascotte}
              alt="Mascotte CIT"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
