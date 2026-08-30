// Composant: ContactSection
// Description: Formulaire de contact et informations (adresse, email, téléphone).
// Remarque: gère l'état du formulaire et l'envoi via fetch.
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { useState } from 'react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const response = await fetch("https://formspree.io/f/xdabkvrd", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert("Message envoyé avec succès !");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } else {
      alert("Erreur lors de l'envoi.");
    }
  } catch (error) {
    alert("Erreur réseau.");
  }
};

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Contactez-nous
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Une question ? Un projet ? Notre équipe est à votre écoute
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact info */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-6 border border-border">
              <div className="w-12 h-12 bg-[#16A34A] rounded-lg flex items-center justify-center mb-4">
                <MapPin className="text-white" size={24} />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Adresse</h3>
              <p className="text-muted-foreground">
                <a href="https://maps.google.com/?q=Centre+Culturel+Régional,+Ziguinchor,+Sénégal" target="_blank" rel="noopener noreferrer">
                  Centre Culturel Régional, Ziguinchor, Sénégal
                </a>
              </p>
            </div>

            <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-6 border border-border">
              <div className="w-12 h-12 bg-[#2563EB] rounded-lg flex items-center justify-center mb-4">
                <Mail className="text-white" size={24} />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Email</h3>
              <p className="text-muted-foreground">
                <a href="mailto:contactcasatech@gmail.com">contactcasatech@gmail.com</a>
              </p>
            </div>

            <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-6 border border-border">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                <Phone className="text-white" size={24} />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Téléphone</h3>
              <p className="text-muted-foreground">
                <a href="tel:+221709663939">+221 70 966 39 39</a>
              </p>
            </div>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-8 border border-border">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-foreground mb-2">Nom complet</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-[#16A34A]"
                    placeholder="Votre nom"
                    required
                  />
                </div>
                <div>
                  <label className="block text-foreground mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-[#16A34A]"
                    placeholder="votre@email.com"
                    required
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-foreground mb-2">Sujet</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-[#16A34A]"
                  placeholder="Sujet de votre message"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-foreground mb-2">Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-[#16A34A] resize-none"
                  placeholder="Votre message..."
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#16A34A] to-[#2563EB] text-white px-8 py-4 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center space-x-2"
              >
                <span>Envoyer le message</span>
                <Send size={20} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
