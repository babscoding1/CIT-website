import { useState } from 'react';
import { Rocket, Send, CheckCircle2, Loader2 } from 'lucide-react';

export default function StartupRegistration() {
  const [formData, setFormData] = useState({
    startupName: '',
    sector: '',
    founders: '',
    email: '',
    phone: '',
    description: '',
    stage: '',
    website: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const sectors = [
    'AgriTech',
    'FinTech',
    'EdTech',
    'HealthTech',
    'E-commerce',
    'Cleantech',
    'IoT',
    'IA & Data',
    'Autre',
  ];

  const stages = [
    'Idée / Concept',
    'Prototype / MVP',
    'Phase de lancement',
    'Croissance',
    'Expansion',
  ];

  const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
) => {
  let value = e.target.value;

  if (e.target.name === 'website' && value && !value.startsWith('http')) {
    value = 'https://' + value;
  }

  setFormData({
    ...formData,
    [e.target.name]: value,
  });
};

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    const response = await fetch("https://formspree.io/f/mlgzdklz", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      setIsSubmitted(true);
      setFormData({
        startupName: '',
        sector: '',
        founders: '',
        email: '',
        phone: '',
        description: '',
        stage: '',
        website: '',
      });
    } else {
      alert("Erreur lors de l'envoi. Réessayez.");
    }
  } catch (error) {
    alert("Erreur réseau. Vérifiez votre connexion.");
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <section id="startup-registration" className="py-20 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#16A34A] to-[#2563EB] rounded-full mb-6">
            <Rocket size={32} className="text-white" />
          </div>
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Pré-inscription Startups
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Vous êtes une startup innovante ? Rejoignez la prochaine édition de CIT et présentez votre projet devant des investisseurs, partenaires et experts de l'écosystème tech africain.
          </p>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-[#16A34A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-bold text-foreground mb-2">Accès aux investisseurs</h3>
            <p className="text-sm text-muted-foreground">Présentez votre projet devant des VCs et business angels</p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-[#2563EB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="font-bold text-foreground mb-2">Networking</h3>
            <p className="text-sm text-muted-foreground">Connectez-vous avec l'écosystème tech de la région</p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <h3 className="font-bold text-foreground mb-2">Accompagnement</h3>
            <p className="text-sm text-muted-foreground">Bénéficiez du mentorat d'experts et formations</p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl border border-border p-8">
          {isSubmitted ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                <CheckCircle2 size={48} className="text-[#16A34A]" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">
                Pré-inscription envoyée !
              </h3>
              <p className="text-muted-foreground mb-6">
                Merci pour votre intérêt. Notre équipe vous contactera dans les prochains jours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Startup Name */}
                <div>
                  <label htmlFor="startupName" className="block text-sm font-semibold text-foreground mb-2">
                    Nom de la startup <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="startupName"
                    name="startupName"
                    required
                    value={formData.startupName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#16A34A] transition-all"
                    placeholder="Ex: AgriConnect"
                  />
                </div>

                {/* Sector */}
                <div>
                  <label htmlFor="sector" className="block text-sm font-semibold text-foreground mb-2">
                    Secteur d'activité <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="sector"
                    name="sector"
                    required
                    value={formData.sector}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#16A34A] transition-all"
                  >
                    <option value="">Sélectionnez un secteur</option>
                    {sectors.map((sector) => (
                      <option key={sector} value={sector}>
                        {sector}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Founders */}
                <div>
                  <label htmlFor="founders" className="block text-sm font-semibold text-foreground mb-2">
                    Fondateur(s) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="founders"
                    name="founders"
                    required
                    value={formData.founders}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#16A34A] transition-all"
                    placeholder="Ex: Fatou Diallo, Amadou Sall"
                  />
                </div>

                {/* Stage */}
                <div>
                  <label htmlFor="stage" className="block text-sm font-semibold text-foreground mb-2">
                    Stade de développement <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="stage"
                    name="stage"
                    required
                    value={formData.stage}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#16A34A] transition-all"
                  >
                    <option value="">Sélectionnez un stade</option>
                    {stages.map((stage) => (
                      <option key={stage} value={stage}>
                        {stage}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#16A34A] transition-all"
                    placeholder="contact@startup.com"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-foreground mb-2">
                    Téléphone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#16A34A] transition-all"
                    placeholder="+221 XX XXX XX XX"
                  />
                </div>

                {/* Website */}
                <div className="md:col-span-2">
                  <label htmlFor="website" className="block text-sm font-semibold text-foreground mb-2">
                    Site web (optionnel)
                  </label>
                  <input
                    type="url"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#16A34A] transition-all"
                    placeholder="https://www.startup.com"
                  />
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <label htmlFor="description" className="block text-sm font-semibold text-foreground mb-2">
                    Description du projet <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    required
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#16A34A] transition-all resize-none"
                    placeholder="Décrivez votre projet, la problématique que vous résolvez et votre proposition de valeur..."
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex items-center justify-between pt-4">
                <p className="text-sm text-muted-foreground">
                  <span className="text-red-500">*</span> Champs obligatoires
                </p>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-[#16A34A] to-[#2563EB] text-white px-8 py-4 rounded-lg hover:opacity-90 transition-all flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      <span>Envoi en cours...</span>
                    </>
                  ) : (
                    <>
                      <span>Envoyer ma pré-inscription</span>
                      <Send size={20} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Vous avez des questions ? Contactez-nous à{' '}
            <a href="mailto:startups@casamanceinnovationtech.com" className="text-[#16A34A] hover:text-[#2563EB] transition-colors">
              startups@casamanceinnovationtech.com
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
