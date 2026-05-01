import { Target, Eye, Heart } from 'lucide-react';
import { images } from '../../assets/images';

export default function AboutPreview() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Image */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src= {images.logo}
                alt="Équipe CIT"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-gradient-to-br from-[#16A34A]/20 to-[#2563EB]/20 rounded-2xl -z-10"></div>
          </div>

          {/* Right: Content */}
          <div>
            <div className="inline-block bg-gradient-to-r from-[#16A34A]/10 to-[#2563EB]/10 px-4 py-2 rounded-full mb-4">
              <span className="text-[#16A34A] font-semibold">À propos de CIT</span>
            </div>

            <h2 className="text-4xl font-bold text-foreground mb-6">
              Plus qu'un événement,<br />
              un écosystème d'innovation
            </h2>

            <p className="text-lg text-muted-foreground mb-8">
              Casamance Innovation Tech (CIT) est le hub technologique de référence en Casamance,
              connectant talents, startups, investisseurs et partenaires institutionnels autour
              de l'innovation et de l'entrepreneuriat.
            </p>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#16A34A] to-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Target className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Notre Mission</h3>
                  <p className="text-muted-foreground">
                    Catalyser l'innovation technologique et entrepreneuriale en Casamance
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#2563EB] to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Eye className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Notre Vision</h3>
                  <p className="text-muted-foreground">
                    Faire de la Casamance un pôle d'excellence technologique en Afrique de l'Ouest
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Heart className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Nos Valeurs</h3>
                  <p className="text-muted-foreground">
                    Innovation, collaboration, excellence et impact social positif
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
