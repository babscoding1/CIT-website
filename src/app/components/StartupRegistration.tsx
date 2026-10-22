import { useState } from 'react';
import {
  Rocket,
  UserRound,
  Send,
  CheckCircle2,
  Loader2,
  ArrowLeft,
} from 'lucide-react';

type RegistrationType = 'startup' | 'participant';

type FormData = {
  registrationType: RegistrationType;
  // Startup fields
  startupName: string;
  sector: string;
  founders: string;
  stage: string;
  website: string;
  description: string;
  // Shared contact fields
  email: string;
  phone: string;
  // Participant fields
  fullName: string;
  organization: string;
  profession: string;
  participationCategory: string;
};

const initialFormData: FormData = {
  registrationType: 'startup',
  startupName: '',
  sector: '',
  founders: '',
  stage: '',
  website: '',
  description: '',
  email: '',
  phone: '',
  fullName: '',
  organization: '',
  profession: '',
  participationCategory: '',
};

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

const professions = [
  'Étudiant(e)',
  'Entrepreneur(e)',
  'Employé(e)',
  'Chercheur / Enseignant',
  'Investisseur',
  'Professionnel(le) du numérique',
  'Autre',
];

const inputClass =
  'w-full rounded-lg border border-border bg-white px-4 py-3 text-foreground outline-none transition focus:ring-2 focus:ring-[#16A34A]';
const labelClass = 'mb-2 block text-sm font-semibold text-foreground';

export default function StartupRegistration() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name } = e.target;
    let value = e.target.value;

    if (name === 'website' && value && !/^https?:\/\//i.test(value)) {
      value = `https://${value}`;
    }

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const chooseRegistrationType = (type: RegistrationType) => {
    setFormData((current) => ({
      ...initialFormData,
      registrationType: type,
      // Keep the shared contact information if the user switches form type.
      email: current.email,
      phone: current.phone,
    }));
    setSubmitError('');
    setIsSubmitted(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const payload = {
        ...formData,
        registrationTypeLabel:
          formData.registrationType === 'startup'
            ? 'Pré-inscription startup'
            : 'Inscription participant',
        event: 'Casamance Innovation Tech — 5e édition',
      };

      const response = await fetch('https://formspree.io/f/mlgzdklz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("L'envoi du formulaire a échoué.");
      }

      setIsSubmitted(true);
      setFormData(initialFormData);
    } catch {
      setSubmitError(
        "L'envoi a échoué. Vérifiez votre connexion puis réessayez.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="startup-registration"
      className="bg-gradient-to-b from-white to-slate-50 py-20"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-[#16A34A] to-[#2563EB]">
            <Rocket size={32} className="text-white" />
          </div>

          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#16A34A]">
            Casamance Innovation Tech · 5e édition
          </p>
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
            Inscription à CIT
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Vous souhaitez présenter une startup innovante ou participer à
            l’événement ? Choisissez le type d’inscription qui vous correspond.
          </p>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          <button
            type="button"
            onClick={() => chooseRegistrationType('startup')}
            aria-pressed={formData.registrationType === 'startup'}
            className={`rounded-2xl border p-6 text-left transition ${
              formData.registrationType === 'startup'
                ? 'border-[#16A34A] bg-green-50 shadow-md ring-2 ring-[#16A34A]/20'
                : 'border-border bg-white hover:border-[#16A34A]/60'
            }`}
          >
            <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-[#16A34A]">
              <Rocket size={25} />
            </span>
            <span className="mb-2 block text-lg font-bold text-foreground">
              Inscrire une startup
            </span>
            <span className="block text-sm leading-6 text-muted-foreground">
              Présentez votre projet, votre équipe et votre solution innovante.
            </span>
          </button>

          <button
            type="button"
            onClick={() => chooseRegistrationType('participant')}
            aria-pressed={formData.registrationType === 'participant'}
            className={`rounded-2xl border p-6 text-left transition ${
              formData.registrationType === 'participant'
                ? 'border-[#2563EB] bg-blue-50 shadow-md ring-2 ring-[#2563EB]/20'
                : 'border-border bg-white hover:border-[#2563EB]/60'
            }`}
          >
            <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-[#2563EB]">
              <UserRound size={25} />
            </span>
            <span className="mb-2 block text-lg font-bold text-foreground">
              Inscrire un participant
            </span>
            <span className="block text-sm leading-6 text-muted-foreground">
              Inscrivez-vous pour participer aux activités et rencontrer
              l’écosystème de l’innovation.
            </span>
          </button>
        </div>

        <div className="rounded-2xl border border-border bg-white p-6 shadow-xl sm:p-8">
          {isSubmitted ? (
            <div className="py-10 text-center">
              <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                <CheckCircle2 size={48} className="text-[#16A34A]" />
              </div>
              <h3 className="mb-3 text-2xl font-bold text-foreground">
                Demande envoyée !
              </h3>
              <p className="mx-auto mb-6 max-w-xl text-muted-foreground">
                Merci pour votre intérêt pour Casamance Innovation Tech. Votre
                demande a été transmise à l’équipe organisatrice. Cette
                confirmation concerne l’envoi du formulaire, pas la validation
                d’un paiement ni l’émission d’un badge.
              </p>
              <button
                type="button"
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData(initialFormData);
                }}
                className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#16A34A] to-[#2563EB] px-6 py-3 font-semibold text-white transition hover:opacity-90"
              >
                <ArrowLeft size={18} />
                Faire une autre inscription
              </button>
            </div>
          ) : (
            <>
              <div className="mb-7 border-b border-border pb-5">
                <h3 className="text-xl font-bold text-foreground">
                  {formData.registrationType === 'startup'
                    ? 'Pré-inscription startup'
                    : 'Inscription participant'}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Les champs marqués d’un astérisque (*) sont obligatoires.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {formData.registrationType === 'startup' ? (
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <label className={labelClass} htmlFor="startupName">
                        Nom de la startup *
                      </label>
                      <input
                        className={inputClass}
                        id="startupName"
                        name="startupName"
                        value={formData.startupName}
                        onChange={handleChange}
                        placeholder="Ex. : AgriConnect"
                        required
                      />
                    </div>

                    <div>
                      <label className={labelClass} htmlFor="sector">
                        Secteur d’activité *
                      </label>
                      <select
                        className={inputClass}
                        id="sector"
                        name="sector"
                        value={formData.sector}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Sélectionnez un secteur</option>
                        {sectors.map((sector) => (
                          <option key={sector} value={sector}>
                            {sector}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className={labelClass} htmlFor="founders">
                        Fondateur(s) *
                      </label>
                      <input
                        className={inputClass}
                        id="founders"
                        name="founders"
                        value={formData.founders}
                        onChange={handleChange}
                        placeholder="Nom(s) du ou des fondateurs"
                        required
                      />
                    </div>

                    <div>
                      <label className={labelClass} htmlFor="stage">
                        Stade de développement *
                      </label>
                      <select
                        className={inputClass}
                        id="stage"
                        name="stage"
                        value={formData.stage}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Sélectionnez un stade</option>
                        {stages.map((stage) => (
                          <option key={stage} value={stage}>
                            {stage}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className={labelClass} htmlFor="email">
                        E-mail de contact *
                      </label>
                      <input
                        className={inputClass}
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="contact@startup.com"
                        autoComplete="email"
                        required
                      />
                    </div>

                    <div>
                      <label className={labelClass} htmlFor="phone">
                        Téléphone *
                      </label>
                      <input
                        className={inputClass}
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+221 XX XXX XX XX"
                        autoComplete="tel"
                        required
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className={labelClass} htmlFor="website">
                        Site web (facultatif)
                      </label>
                      <input
                        className={inputClass}
                        id="website"
                        name="website"
                        type="text"
                        value={formData.website}
                        onChange={handleChange}
                        placeholder="www.mastartup.com"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className={labelClass} htmlFor="description">
                        Description du projet *
                      </label>
                      <textarea
                        className={`${inputClass} resize-y`}
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Décrivez le problème traité, votre solution et sa valeur ajoutée..."
                        required
                      />
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <label className={labelClass} htmlFor="fullName">
                        Prénom et nom *
                      </label>
                      <input
                        className={inputClass}
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Ex. : Awa Diop"
                        autoComplete="name"
                        required
                      />
                    </div>

                    <div>
                      <label className={labelClass} htmlFor="profession">
                        Profil *
                      </label>
                      <select
                        className={inputClass}
                        id="profession"
                        name="profession"
                        value={formData.profession}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Sélectionnez votre profil</option>
                        {professions.map((profession) => (
                          <option key={profession} value={profession}>
                            {profession}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className={labelClass} htmlFor="email">
                        Adresse e-mail *
                      </label>
                      <input
                        className={inputClass}
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="vous@exemple.com"
                        autoComplete="email"
                        required
                      />
                    </div>

                    <div>
                      <label className={labelClass} htmlFor="phone">
                        Téléphone *
                      </label>
                      <input
                        className={inputClass}
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+221 XX XXX XX XX"
                        autoComplete="tel"
                        required
                      />
                    </div>

                    <div>
                      <label className={labelClass} htmlFor="organization">
                        Organisation (facultatif)
                      </label>
                      <input
                        className={inputClass}
                        id="organization"
                        name="organization"
                        value={formData.organization}
                        onChange={handleChange}
                        placeholder="Entreprise, école, association..."
                      />
                    </div>

                    <div>
                      <label
                        className={labelClass}
                        htmlFor="participationCategory"
                      >
                        Catégorie de participation *
                      </label>
                      <select
                        className={inputClass}
                        id="participationCategory"
                        name="participationCategory"
                        value={formData.participationCategory}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Sélectionnez une catégorie</option>
                        <option value="standard">Participant</option>
                        <option value="student">Étudiant</option>
                        <option value="professional">Professionnel</option>
                      </select>
                    </div>
                  </div>
                )}

                {submitError && (
                  <div
                    role="alert"
                    className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700"
                  >
                    {submitError}
                  </div>
                )}

                <div className="flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm text-muted-foreground">
                    <span className="text-red-500">*</span> Champs obligatoires
                  </p>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#16A34A] to-[#2563EB] px-7 py-4 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={20} className="animate-spin" />
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        Envoyer mon inscription
                        <Send size={20} />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>

        <p className="mx-auto mt-5 max-w-3xl text-center text-xs leading-5 text-muted-foreground">
          Pour le moment, ce formulaire transmet les demandes via Formspree.
          Le paiement réel Wave/Orange Money, la confirmation serveur, la
          génération des badges et la vérification des QR codes nécessitent
          une intégration backend dédiée.
        </p>
      </div>
    </section>
  );
}
