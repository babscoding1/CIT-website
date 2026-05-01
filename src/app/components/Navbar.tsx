import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { images } from '../../assets/images';
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Accueil', href: '#home' },
    { name: 'À propos', href: '#about' },
    { name: 'Événements', href: '#events' },
    { name: 'Startups', href: '#startup-registration' },
    { name: 'Médiathèque', href: '#media' },
    { name: 'Actualités', href: '#news' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img 
              src={images.logo} 
              alt="Casamance Innovation Tech" 
              className="h-12 w-auto"
            />
            <div className="hidden sm:block">
              <div className="font-bold text-foreground text-sm">Casamance Innovation Tech</div>
              <div className="text-xs text-muted-foreground">Ziguinchor, Sénégal</div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-foreground hover:text-primary transition-colors"
              >
                {link.name}
              </a>
            ))}
            <button className="bg-gradient-to-r from-[#16A34A] to-[#2563EB] text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity">
              Participer
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-accent"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <button className="w-full bg-gradient-to-r from-[#16A34A] to-[#2563EB] text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity">
              Participer
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}