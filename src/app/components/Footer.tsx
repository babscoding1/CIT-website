import { Facebook, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { images } from '../../assets/images';
export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* À propos */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img 
                src={images.logo} 
                alt="Casamance Innovation Tech" 
                className="h-16 w-auto "
              />
            </div>
            <p className="text-sm text-gray-300">
              Le rendez-vous des talents, des startups et des technologies de demain en Casamance.
            </p>
          </div>

          {/* Liens rapides */}
          <div>
            <h3 className="font-semibold mb-4">Liens rapides</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#about" className="hover:text-[#16A34A] transition-colors">À propos</a></li>
              <li><a href="#events" className="hover:text-[#16A34A] transition-colors">Événements</a></li>
              <li><a href="#startups" className="hover:text-[#16A34A] transition-colors">Startups</a></li>
              <li><a href="#news" className="hover:text-[#16A34A] transition-colors">Actualités</a></li>
            </ul>
          </div>

          {/* Innovation */}
          <div>
            <h3 className="font-semibold mb-4">Domaines</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-[#16A34A] rounded-full"></span>
                <span>Intelligence Artificielle</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-[#2563EB] rounded-full"></span>
                <span>AgriTech</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-[#16A34A] rounded-full"></span>
                <span>FinTech</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-[#2563EB] rounded-full"></span>
                <span>Digital</span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-center space-x-2">
                <MapPin size={16} className="text-[#16A34A]" />
                <span>Ziguinchor, Sénégal</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail size={16} className="text-[#16A34A]" />
                <span>contactcasatech@gmail.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone size={16} className="text-[#16A34A]" />
                <span>+221 XX XXX XX XX</span>
              </li>
            </ul>
            <div className="flex space-x-3 mt-4">
              <a
                href="https://www.facebook.com/p/Casamance-Innovation-Tech-61552957667741/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#16A34A] transition-colors"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://www.linkedin.com/showcase/casamance-innovation-tech/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#2563EB] transition-colors"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2026 Casamance Innovation Tech. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}