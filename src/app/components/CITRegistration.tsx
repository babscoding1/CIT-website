/**
 * CITRegistration.tsx
 * Module d'inscription complet — Casamance Innovation Tech · 5e Édition
 *
 * Fonctionnalités :
 *  • Inscription Participant (tarif standard / étudiant / professionnel)
 *  • Inscription Entreprise / Startup (tarif exposant / sponsor)
 *  • Sélection du moyen de paiement : Wave (lien Business direct) ou Orange Money
 *  • Wave : bouton deep-link pay.wave.com avec montant pré-rempli (Erastus Group SAS)
 *  • Orange Money : instructions manuelles + saisie ID transaction
 *  • Génération d'un badge PDF-like téléchargeable (canvas HTML)
 *  • QR Code embarqué dans le badge pointant vers l'URL de vérification
 *  • Envoi du formulaire via Formspree
 *
 * Dépendances à installer :
 *   npm install qrcode lucide-react
 *   (ou : yarn add qrcode lucide-react)
 *
 * Types :  @types/qrcode  si TypeScript strict
 *   npm install -D @types/qrcode
 */

import { useState, useRef, useEffect, useCallback } from 'react';
import QRCode from 'qrcode';
import {
  Rocket,
  Building2,
  UserRound,
  CreditCard,
  CheckCircle2,
  Loader2,
  Download,
  ArrowLeft,
  ArrowRight,
  Phone,
  BadgeCheck,
  ChevronRight,
  AlertCircle,
} from 'lucide-react';

// ─── CONSTANTES ────────────────────────────────────────────────────────────────

const EVENT = {
  name: 'Casamance Innovation Tech',
  edition: '5e Édition',
  dates: '17 – 19 Décembre 2026',
  lieu: 'Ziguinchor, Sénégal',
  verifyBaseUrl: 'https://casamanceinnovationtech.sn/verify',
  formspreeId: 'mlgzdklz', // ← remplacez par votre ID Formspree
};

const TARIFS = {
  participant: [
    {
      id: 'etudiant',
      label: 'Étudiant(e)',
      summary: 'Pour les étudiants qui souhaitent découvrir les innovations et développer leur réseau.',
      price: 3000,
      badge: 'ÉTUDIANT',
      color: '#2563EB',
      perks: ['Accès aux 2 jours', 'Kit participant', 'Certificat', 'Restauration'],
    },
    {
      id: 'professionnel',
      label: 'Professionnel',
      summary: 'Pour les professionnels, entrepreneurs et acteurs de l’innovation.',
      price: 5000,
      badge: 'PRO',
      color: '#7C3AED',
      perks: ['Accès VIP', 'Lounge professionnel', 'Sessions privées', 'Certificat', 'Restauration'],
    },
  ],
  entreprise: [
    {
      id: 'startup',
      label: 'Package Soutien Local',
      summary: 'Une offre accessible pour valoriser les PME et startups de l’écosystème local.',
      price: 50000,
      badge: 'PME & STARTUPS',
      color: '#16A34A',
      perks: [
        'Logo en petit format sur le site et le programme officiel',
        'Stand partagé Startup Corner de 5 à 8 m²',
        'Présence sur le Mur des Partenaires',
        'Participation aux sessions pitch devant investisseurs et décideurs',
        'Présentation sur une demi-page de la brochure officielle',
        '2 billets gratuits',
        'Mise en avant sur les réseaux sociaux officiels',
        'Accès aux sessions de networking',
        'Visite touristique tout inclus pour 2 membres de l’équipe (2–3 décembre 2026)',
      ],
    },
    {
      id: 'pme',
      label: 'Package Partenaire Premium',
      summary: 'Une visibilité renforcée pour les entreprises de taille intermédiaire.',
      price: 500000,
      badge: 'ENTREPRISES INTERMÉDIAIRES',
      color: '#D97706',
      perks: [
        'Logo en taille moyenne sur les supports principaux',
        'Stand standard de 10 à 15 m²',
        'Logo sur les scènes secondaires',
        'Présentation sur une page entière de la brochure officielle',
        'Animation d’un atelier ou d’une session de groupe',
        '1 place réservée à une table ronde',
        'Accès privilégié à la zone networking',
        '5 billets gratuits',
        'Mention dans le communiqué de presse',
        'Visite touristique tout inclus pour 5 membres de l’équipe (2–3 décembre 2026)',
      ],
    },
    {
      id: 'partenaire',
      label: 'Package Grand Partenaire',
      summary: 'Une offre premium destinée aux grandes entreprises et multinationales.',
      price: 1500000,
      badge: 'GRANDES ENTREPRISES',
      color: '#0F172A',
      perks: [
        'Logo en grand format sur tous les supports',
        'Logo sur le fond des scènes principales',
        'Mention comme partenaire majeur à l’ouverture et à la clôture',
        'Stand premium de 20 à 30 m²',
        'Intervention en session plénière ou discours d’ouverture',
        '2 sièges réservés aux tables rondes d’experts',
        'Accès VIP pour le networking ciblé',
        'Page entière et page de fin dans la brochure officielle',
        '7 billets gratuits',
        'Mention spéciale dans le communiqué de presse post-événement',
        'Article sponsorisé sur le site officiel',
        'Visite touristique tout inclus pour 7 membres de l’équipe (2–3 décembre 2026)',
      ],
    },
  ],
};

const SECTORS = [
  'AgriTech','FinTech','EdTech','HealthTech','E-commerce',
  'Cleantech','IoT','IA & Data','Transport','Autre',
];

const PROFESSIONS = [
  'Étudiant(e)','Entrepreneur(e)','Employé(e)',
  'Chercheur / Enseignant','Investisseur',
  'Professionnel(le) du numérique','Autre',
];

type RegistrationType = 'participant' | 'entreprise';
type Step = 'type' | 'tarif' | 'infos' | 'paiement' | 'badge';
type PaymentMethod = 'wave' | 'orange';

interface FormData {
  // commun
  email: string;
  phone: string;
  // participant
  fullName: string;
  profession: string;
  organization: string;
  // entreprise
  companyName: string;
  sector: string;
  founders: string;
  stage: string;
  website: string;
  description: string;
  // paiement
  paymentMethod: PaymentMethod;
  transactionId: string;
}

const INIT: FormData = {
  email: '', phone: '',
  fullName: '', profession: '', organization: '',
  companyName: '', sector: '', founders: '', stage: '', website: '', description: '',
  paymentMethod: 'wave', transactionId: '',
};

// ─── PAIEMENT ──────────────────────────────────────────────────────────────────

/**
 * Lien Wave Business — Erastus Group SAS
 * Le paramètre `amount` est ajouté dynamiquement selon la formule choisie.
 * Format : https://pay.wave.com/m/<merchant_id>/c/sn/?amount=<montant_en_XOF>
 */
const WAVE_BASE_URL = 'https://pay.wave.com/m/M_sn_Kl-DGtnWSTUv/c/sn/';

/** Construit l'URL Wave avec montant pré-rempli */
function buildWaveUrl(amount: number): string {
  return `${WAVE_BASE_URL}?amount=${amount}`;
}

// ─── UTILITAIRES ───────────────────────────────────────────────────────────────

function generateRegistrationId(type: RegistrationType, tarif: string): string {
  const prefix = type === 'participant' ? 'CIT-P' : 'CIT-E';
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${ts}-${rand}`;
}

function formatPrice(n: number) {
  return n.toLocaleString('fr-FR') + ' FCFA';
}

// ─── COMPOSANTS UI ─────────────────────────────────────────────────────────────

const inp = 'w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#16A34A] focus:bg-white focus:ring-2 focus:ring-[#16A34A]/20';
const lbl = 'mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500';

function Label({ children, htmlFor }: { children: React.ReactNode; htmlFor?: string }) {
  return <label className={lbl} htmlFor={htmlFor}>{children}</label>;
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={inp} {...props} />;
}

function Select({ children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement> & { children: React.ReactNode }) {
  return (
    <select className={inp} {...props}>
      {children}
    </select>
  );
}

function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={`${inp} resize-y`} rows={4} {...props} />;
}

function StepIndicator({ steps, current }: { steps: string[]; current: number }) {
  return (
    <div className="mb-8 flex items-center justify-center gap-0">
      {steps.map((s, i) => (
        <div key={s} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all ${
                i < current
                  ? 'bg-[#16A34A] text-white'
                  : i === current
                  ? 'bg-gradient-to-br from-[#16A34A] to-[#2563EB] text-white shadow-lg ring-4 ring-[#16A34A]/20'
                  : 'bg-slate-100 text-slate-400'
              }`}
            >
              {i < current ? <CheckCircle2 size={14} /> : i + 1}
            </div>
            <span className={`mt-1 text-[10px] font-medium ${i === current ? 'text-[#16A34A]' : 'text-slate-400'}`}>
              {s}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div className={`mb-4 h-0.5 w-12 transition-all ${i < current ? 'bg-[#16A34A]' : 'bg-slate-200'}`} />
          )}
        </div>
      ))}
    </div>
  );
}

// ─── BADGE CANVAS ──────────────────────────────────────────────────────────────

interface BadgeProps {
  registrationId: string;
  type: RegistrationType;
  tarifId: string;
  formData: FormData;
}

function BadgeCanvas({ registrationId, type, tarifId, formData }: BadgeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  const tarifList = type === 'participant' ? TARIFS.participant : TARIFS.entreprise;
  const tarif = tarifList.find((t) => t.id === tarifId)!;
  const displayName =
    type === 'participant' ? formData.fullName : formData.companyName;
  const subLabel =
    type === 'participant'
      ? formData.profession || tarif.label
      : formData.sector || tarif.label;

  const verifyUrl = `${EVENT.verifyBaseUrl}/${registrationId}`;

  const draw = useCallback(async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = 600, H = 340;
    canvas.width = W;
    canvas.height = H;

    // ── Fond ──
    ctx.fillStyle = '#0F172A';
    roundRect(ctx, 0, 0, W, H, 20);
    ctx.fill();

    // ── Bande latérale couleur ──
    ctx.fillStyle = tarif.color;
    roundRect(ctx, 0, 0, 10, H, { tl: 20, tr: 0, br: 0, bl: 20 });
    ctx.fill();

    // ── Pattern grille subtil ──
    ctx.strokeStyle = 'rgba(255,255,255,0.03)';
    ctx.lineWidth = 1;
    for (let x = 10; x < W; x += 30) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
    }
    for (let y = 0; y < H; y += 30) {
      ctx.beginPath(); ctx.moveTo(10, y); ctx.lineTo(W, y); ctx.stroke();
    }

    // ── Header gradient ──
    const grad = ctx.createLinearGradient(10, 0, W, 0);
    grad.addColorStop(0, tarif.color + '33');
    grad.addColorStop(1, 'transparent');
    ctx.fillStyle = grad;
    roundRect(ctx, 10, 0, W - 10, 90, { tl: 10, tr: 20, br: 0, bl: 0 });
    ctx.fill();

    // ── Logo / Nom événement ──
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 13px "Helvetica Neue", sans-serif';
    ctx.fillText('CASAMANCE INNOVATION TECH', 30, 36);
    ctx.fillStyle = tarif.color;
    ctx.font = '11px "Helvetica Neue", sans-serif';
    ctx.fillText(`5e ÉDITION  ·  ${EVENT.dates}  ·  ${EVENT.lieu}`, 30, 56);

    // ── Badge type pill ──
    ctx.fillStyle = tarif.color;
    roundRect(ctx, 30, 68, ctx.measureText(tarif.badge).width + 24, 22, 11);
    ctx.fill();
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 11px "Helvetica Neue", sans-serif';
    ctx.fillText(tarif.badge, 42, 83);

    // ── Nom principal ──
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 28px "Helvetica Neue", sans-serif';
    const nameText = displayName.length > 24 ? displayName.substring(0, 22) + '…' : displayName;
    ctx.fillText(nameText, 30, 140);

    // ── Sous-label ──
    ctx.fillStyle = 'rgba(255,255,255,0.55)';
    ctx.font = '13px "Helvetica Neue", sans-serif';
    ctx.fillText(subLabel, 30, 162);

    // ── Ligne séparateur ──
    ctx.strokeStyle = 'rgba(255,255,255,0.08)';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(30, 180); ctx.lineTo(W - 30, 180); ctx.stroke();

    // ── Infos contact ──
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.font = '12px "Helvetica Neue", sans-serif';
    ctx.fillText('✉  ' + formData.email, 30, 204);
    ctx.fillText('📞  ' + formData.phone, 30, 224);

    // ── ID inscription ──
    ctx.fillStyle = tarif.color + 'CC';
    ctx.font = 'bold 11px monospace';
    ctx.fillText(registrationId, 30, 248);

    // ── Paiement confirmé badge ──
    ctx.fillStyle = '#16A34A22';
    roundRect(ctx, 30, 264, 160, 28, 8);
    ctx.fill();
    ctx.fillStyle = '#4ADE80';
    ctx.font = 'bold 11px "Helvetica Neue", sans-serif';
    ctx.fillText('✓  PAIEMENT CONFIRMÉ', 42, 282);

    // ── QR Code ──
    try {
      const qrDataUrl = await QRCode.toDataURL(verifyUrl, {
        width: 120,
        margin: 1,
        color: { dark: '#000000', light: '#FFFFFF' },
        errorCorrectionLevel: 'H',
      });
      const img = new Image();
      await new Promise<void>((res) => {
        img.onload = () => res();
        img.src = qrDataUrl;
      });
      // QR fond blanc arrondi
      ctx.fillStyle = '#FFFFFF';
      roundRect(ctx, W - 158, H - 158, 130, 130, 12);
      ctx.fill();
      ctx.drawImage(img, W - 153, H - 153, 120, 120);

      // Label sous QR
      ctx.fillStyle = 'rgba(255,255,255,0.35)';
      ctx.font = '9px "Helvetica Neue", sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText('Scanner pour vérifier', W - 28, H - 14);
      ctx.textAlign = 'left';
    } catch {
      // QR non disponible
    }

    // ── Bas de page ──
    ctx.fillStyle = 'rgba(255,255,255,0.2)';
    ctx.font = '10px "Helvetica Neue", sans-serif';
    ctx.fillText(`© ${EVENT.name} 2026 — Badge officiel`, 30, H - 14);

    setReady(true);
  }, [registrationId, type, tarifId, formData, tarif, displayName, subLabel, verifyUrl]);

  useEffect(() => { draw(); }, [draw]);

  const download = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const a = document.createElement('a');
    a.download = `badge-CIT-${registrationId}.png`;
    a.href = canvas.toDataURL('image/png');
    a.click();
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <canvas
        ref={canvasRef}
        className="w-full max-w-xl rounded-2xl shadow-2xl"
        style={{ imageRendering: 'crisp-edges' }}
      />
      {ready && (
        <button
          onClick={download}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#16A34A] to-[#2563EB] px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:opacity-90 active:scale-95"
        >
          <Download size={16} />
          Télécharger mon badge (PNG)
        </button>
      )}
      <p className="text-center text-xs text-slate-400">
        Le QR code permet la vérification de votre inscription à l'entrée de l'événement.
      </p>
    </div>
  );
}

// ─── Petite util canvas ────────────────────────────────────────────────────────
function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, w: number, h: number,
  r: number | { tl?: number; tr?: number; br?: number; bl?: number },
) {
  const radius = typeof r === 'number'
    ? { tl: r, tr: r, br: r, bl: r }
    : { tl: r.tl ?? 0, tr: r.tr ?? 0, br: r.br ?? 0, bl: r.bl ?? 0 };
  ctx.beginPath();
  ctx.moveTo(x + radius.tl, y);
  ctx.lineTo(x + w - radius.tr, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + radius.tr);
  ctx.lineTo(x + w, y + h - radius.br);
  ctx.quadraticCurveTo(x + w, y + h, x + w - radius.br, y + h);
  ctx.lineTo(x + radius.bl, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - radius.bl);
  ctx.lineTo(x, y + radius.tl);
  ctx.quadraticCurveTo(x, y, x + radius.tl, y);
  ctx.closePath();
}

// ─── COMPOSANT PRINCIPAL ───────────────────────────────────────────────────────

export default function CITRegistration() {
  const [step, setStep] = useState<Step>('type');
  const [regType, setRegType] = useState<RegistrationType>('participant');
  const [selectedTarifId, setSelectedTarifId] = useState('');
  const [formData, setFormData] = useState<FormData>(INIT);
  const [registrationId, setRegistrationId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [payStep, setPayStep] = useState<'method' | 'instructions' | 'verify'>('method');

  const tarifList = regType === 'participant' ? TARIFS.participant : TARIFS.entreprise;
  const selectedTarif = tarifList.find((t) => t.id === selectedTarifId);

  const steps = ['Type', 'Tarif', 'Infos', 'Paiement', 'Badge'];
  const stepIndex = { type: 0, tarif: 1, infos: 2, paiement: 3, badge: 4 }[step];

  const set = (k: keyof FormData, v: string) =>
    setFormData((f) => ({ ...f, [k]: v }));

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    let { name, value } = e.target;
    if (name === 'website' && value && !/^https?:\/\//i.test(value)) value = `https://${value}`;
    set(name as keyof FormData, value);
  };

  const handleSubmitAndPay = async () => {
    setIsSubmitting(true);
    setSubmitError('');
    try {
      const id = generateRegistrationId(regType, selectedTarifId);
      const payload = {
        event: `${EVENT.name} — ${EVENT.edition}`,
        registrationType: regType,
        tarif: selectedTarif?.label,
        price: selectedTarif?.price,
        paymentMethod: formData.paymentMethod,
        transactionId: formData.transactionId,
        registrationId: id,
        ...formData,
      };
      const res = await fetch(`https://formspree.io/f/${EVENT.formspreeId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error();
      setRegistrationId(id);
      setStep('badge');
    } catch {
      setSubmitError("L'envoi a échoué. Vérifiez votre connexion puis réessayez.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Paiement config ──
  const payNumbers = {
    wave: {
      logo: '🔵',
      name: 'Erastus Group SAS',
      /** URL Wave Business avec montant dynamique */
      url: selectedTarif ? buildWaveUrl(selectedTarif.price) : WAVE_BASE_URL,
    },
    orange: {
      logo: '🟠',
      name: 'CIT Orange Money',
      number: '+221 77 XXX XX XX', // ← remplacez par votre numéro Orange Money
    },
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">

        {/* ── En-tête ── */}
        <div className="mb-10 text-center">
          <div className="mb-5 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#16A34A] to-[#2563EB] shadow-xl">
            <Rocket size={30} className="text-white" />
          </div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#16A34A]">
            {EVENT.name} · {EVENT.edition}
          </p>
          <h1 className="mb-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Inscription officielle
          </h1>
          <p className="text-base text-slate-500">
            {EVENT.dates} · {EVENT.lieu}
          </p>
        </div>

        {/* ── Step indicator ── */}
        <StepIndicator steps={steps} current={stepIndex} />

        {/* ═══════════════ STEP 1 — TYPE ═══════════════ */}
        {step === 'type' && (
          <div className="space-y-4">
            <h2 className="mb-6 text-center text-xl font-bold text-slate-800">
              Qui souhaitez-vous inscrire ?
            </h2>
            <button
              onClick={() => { setRegType('participant'); setSelectedTarifId(''); setStep('tarif'); }}
              className="group w-full rounded-2xl border-2 border-slate-200 bg-white p-6 text-left transition hover:border-[#2563EB] hover:shadow-lg"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 text-[#2563EB] transition group-hover:bg-blue-600 group-hover:text-white">
                  <UserRound size={28} />
                </span>
                <div className="flex-1">
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-lg font-bold text-slate-800">Participant</span>
                    <span className="text-sm font-semibold text-[#2563EB]">Dès 3 000 FCFA →</span>
                  </div>
                  <p className="text-sm text-slate-500">
                    Étudiant, professionnel, entrepreneur — assistez aux conférences, ateliers et networking.
                  </p>
                </div>
                <ChevronRight size={18} className="text-slate-400 group-hover:text-[#2563EB]" />
              </div>
            </button>

            <button
              onClick={() => { setRegType('entreprise'); setSelectedTarifId(''); setStep('tarif'); }}
              className="group w-full rounded-2xl border-2 border-slate-200 bg-white p-6 text-left transition hover:border-[#16A34A] hover:shadow-lg"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-green-100 text-[#16A34A] transition group-hover:bg-[#16A34A] group-hover:text-white">
                  <Building2 size={28} />
                </span>
                <div className="flex-1">
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-lg font-bold text-slate-800">Entreprise / Startup</span>
                    <span className="text-sm font-semibold text-[#16A34A]">Dès 50 000 FCFA →</span>
                  </div>
                  <p className="text-sm text-slate-500">
                    Exposez votre solution, recrutez des talents et rencontrez investisseurs et partenaires.
                  </p>
                </div>
                <ChevronRight size={18} className="text-slate-400 group-hover:text-[#16A34A]" />
              </div>
            </button>
          </div>
        )}

        {/* ═══════════════ STEP 2 — TARIF ═══════════════ */}
        {step === 'tarif' && (
          <div>
            <button onClick={() => setStep('type')} className="mb-6 flex items-center gap-1 text-sm text-slate-500 hover:text-slate-800">
              <ArrowLeft size={14} /> Retour
            </button>
            <h2 className="mb-6 text-center text-xl font-bold text-slate-800">
              Choisissez votre formule
            </h2>
            <div className={`grid gap-5 ${regType === 'entreprise' ? 'lg:grid-cols-3' : 'sm:grid-cols-2'}`}>
              {tarifList.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  aria-pressed={selectedTarifId === t.id}
                  onClick={() => setSelectedTarifId(t.id)}
                  className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-white text-left transition duration-200 hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-offset-2 ${
                    selectedTarifId === t.id
                      ? 'shadow-lg ring-2 ring-offset-2'
                      : 'border-slate-200 shadow-sm hover:border-slate-300'
                  }`}
                  style={{
                    borderColor: selectedTarifId === t.id ? t.color : undefined,
                    ringColor: t.color,
                  }}
                >
                  <div className="h-2 w-full" style={{ background: t.color }} />
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <div className="mb-4 flex items-start justify-between gap-3">
                      <span
                        className="inline-flex rounded-full px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider"
                        style={{ background: `${t.color}14`, color: t.color }}
                      >
                        {t.badge}
                      </span>
                      {selectedTarifId === t.id && (
                        <span
                          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white"
                          style={{ background: t.color }}
                          aria-label="Formule sélectionnée"
                        >
                          <CheckCircle2 size={16} />
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-extrabold leading-snug text-slate-900">{t.label}</h3>
                    <p className="mt-2 min-h-[3.5rem] text-sm leading-relaxed text-slate-500">{t.summary}</p>

                    <div className="mt-5 border-b border-slate-100 pb-5">
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Contribution</p>
                      <p className="mt-1 text-2xl font-black tracking-tight sm:text-[1.7rem]" style={{ color: t.color }}>
                        {formatPrice(t.price)}
                      </p>
                      {regType === 'entreprise' && (
                        <p className="mt-1 text-xs text-slate-400">Forfait partenaire selon le package sélectionné</p>
                      )}
                    </div>

                    <div className="mt-4 flex-1">
                      <p className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-700">
                        Ce que comprend l’offre
                      </p>
                      <ul className="space-y-2.5">
                        {t.perks.map((p) => (
                          <li key={p} className="flex items-start gap-2 text-sm leading-snug text-slate-600">
                            <CheckCircle2 size={15} className="mt-0.5 shrink-0" style={{ color: t.color }} />
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div
                      className="mt-6 flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition"
                      style={
                        selectedTarifId === t.id
                          ? { background: t.color, color: '#fff' }
                          : { background: `${t.color}10`, color: t.color }
                      }
                    >
                      {selectedTarifId === t.id ? 'Formule sélectionnée' : 'Choisir cette formule'}
                      <ChevronRight size={16} />
                    </div>
                  </div>
                </button>
              ))}
            </div>
            <div className="mt-6 flex justify-end">
              <button
                disabled={!selectedTarifId}
                onClick={() => setStep('infos')}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#16A34A] to-[#2563EB] px-6 py-3 font-semibold text-white shadow transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Continuer <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* ═══════════════ STEP 3 — INFOS ═══════════════ */}
        {step === 'infos' && (
          <div>
            <button onClick={() => setStep('tarif')} className="mb-6 flex items-center gap-1 text-sm text-slate-500 hover:text-slate-800">
              <ArrowLeft size={14} /> Retour
            </button>
            <h2 className="mb-6 text-center text-xl font-bold text-slate-800">
              {regType === 'participant' ? 'Vos informations' : 'Informations entreprise'}
            </h2>

            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <div className="grid gap-5 sm:grid-cols-2">
                {/* ── PARTICIPANT ── */}
                {regType === 'participant' && (
                  <>
                    <div className="sm:col-span-2">
                      <Label htmlFor="fullName">Prénom et Nom *</Label>
                      <Input id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Ex. : Awa Diallo" required />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="vous@exemple.com" required />
                    </div>
                    <div>
                      <Label htmlFor="phone">Téléphone *</Label>
                      <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="+221 7X XXX XX XX" required />
                    </div>
                    <div>
                      <Label htmlFor="profession">Profil *</Label>
                      <Select id="profession" name="profession" value={formData.profession} onChange={handleChange} required>
                        <option value="">Sélectionnez</option>
                        {PROFESSIONS.map((p) => <option key={p} value={p}>{p}</option>)}
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="organization">Organisation (facultatif)</Label>
                      <Input id="organization" name="organization" value={formData.organization} onChange={handleChange} placeholder="École, entreprise, ONG..." />
                    </div>
                  </>
                )}

                {/* ── ENTREPRISE ── */}
                {regType === 'entreprise' && (
                  <>
                    <div className="sm:col-span-2">
                      <Label htmlFor="companyName">Nom de la startup / entreprise *</Label>
                      <Input id="companyName" name="companyName" value={formData.companyName} onChange={handleChange} placeholder="Ex. : AgriSmart SAS" required />
                    </div>
                    <div>
                      <Label htmlFor="founders">Nom du/des fondateur(s) *</Label>
                      <Input id="founders" name="founders" value={formData.founders} onChange={handleChange} placeholder="Prénom Nom" required />
                    </div>
                    <div>
                      <Label htmlFor="sector">Secteur *</Label>
                      <Select id="sector" name="sector" value={formData.sector} onChange={handleChange} required>
                        <option value="">Sélectionnez</option>
                        {SECTORS.map((s) => <option key={s} value={s}>{s}</option>)}
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="stage">Stade de développement *</Label>
                      <Select id="stage" name="stage" value={formData.stage} onChange={handleChange} required>
                        <option value="">Sélectionnez</option>
                        <option>Idée / Concept</option>
                        <option>Prototype / MVP</option>
                        <option>Phase de lancement</option>
                        <option>Croissance</option>
                        <option>Expansion</option>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="email">Email de contact *</Label>
                      <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="contact@startup.com" required />
                    </div>
                    <div>
                      <Label htmlFor="phone">Téléphone *</Label>
                      <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="+221 7X XXX XX XX" required />
                    </div>
                    <div>
                      <Label htmlFor="website">Site web (facultatif)</Label>
                      <Input id="website" name="website" value={formData.website} onChange={handleChange} placeholder="www.monstartup.com" />
                    </div>
                    <div className="sm:col-span-2">
                      <Label htmlFor="description">Description du projet / produit *</Label>
                      <Textarea id="description" name="description" value={formData.description} onChange={handleChange} placeholder="Décrivez le problème traité, votre solution et sa valeur ajoutée..." required />
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="mt-6 flex justify-between">
              <button onClick={() => setStep('tarif')} className="flex items-center gap-1 rounded-xl border border-slate-200 px-5 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50">
                <ArrowLeft size={14} /> Retour
              </button>
              <button
                onClick={() => {
                  const required = regType === 'participant'
                    ? [formData.fullName, formData.email, formData.phone, formData.profession]
                    : [formData.companyName, formData.founders, formData.sector, formData.email, formData.phone, formData.description];
                  if (required.some((v) => !v.trim())) {
                    setSubmitError('Veuillez remplir tous les champs obligatoires.');
                    return;
                  }
                  setSubmitError('');
                  setPayStep('method');
                  setStep('paiement');
                }}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#16A34A] to-[#2563EB] px-6 py-3 font-semibold text-white shadow transition hover:opacity-90"
              >
                Continuer au paiement <ArrowRight size={16} />
              </button>
            </div>
            {submitError && (
              <p className="mt-3 flex items-center gap-2 text-sm text-red-500">
                <AlertCircle size={14} /> {submitError}
              </p>
            )}
          </div>
        )}

        {/* ═══════════════ STEP 4 — PAIEMENT ═══════════════ */}
        {step === 'paiement' && selectedTarif && (
          <div>
            <button onClick={() => setStep('infos')} className="mb-6 flex items-center gap-1 text-sm text-slate-500 hover:text-slate-800">
              <ArrowLeft size={14} /> Retour
            </button>

            {/* Récapitulatif */}
            <div className="mb-6 rounded-2xl border border-slate-100 bg-slate-50 p-5">
              <p className="mb-1 text-xs font-bold uppercase tracking-wide text-slate-400">Récapitulatif</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-800">
                    {regType === 'participant' ? formData.fullName : formData.companyName}
                  </p>
                  <p className="text-sm text-slate-500">{selectedTarif.label}</p>
                </div>
                <p className="text-xl font-extrabold" style={{ color: selectedTarif.color }}>
                  {formatPrice(selectedTarif.price)}
                </p>
              </div>
            </div>

            {/* ── Étape A — Choix méthode ── */}
            {payStep === 'method' && (
              <div className="space-y-4">
                <h2 className="text-center text-xl font-bold text-slate-800">
                  Choisissez votre moyen de paiement
                </h2>

                <div className="grid gap-4 sm:grid-cols-2">
                  {/* ── WAVE — lien direct Business ── */}
                  <div className="flex flex-col gap-3 rounded-2xl border-2 border-blue-200 bg-white p-6 transition hover:border-blue-500 hover:shadow-lg">
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-5xl">🔵</span>
                      <span className="text-xl font-extrabold text-blue-600">Wave</span>
                      <span className="text-xs text-slate-400">Paiement instantané · Erastus Group SAS</span>
                    </div>

                    {/* Montant mis en avant */}
                    <div className="rounded-xl border border-dashed border-blue-200 bg-blue-50 py-3 text-center">
                      <p className="text-xs font-medium text-blue-400">Montant à payer</p>
                      <p className="text-2xl font-extrabold text-blue-700">
                        {selectedTarif ? formatPrice(selectedTarif.price) : '—'}
                      </p>
                    </div>

                    {/* Bouton deep-link Wave — ouvre l'app avec montant pré-rempli */}
                    <a
                      href={payNumbers.wave.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => {
                        set('paymentMethod', 'wave');
                        // Laisser 1 s pour que Wave s'ouvre, puis afficher la saisie de l'ID
                        setTimeout(() => setPayStep('instructions'), 1000);
                      }}
                      className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700 active:scale-95"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                      Payer {selectedTarif ? formatPrice(selectedTarif.price) : ''} avec Wave
                    </a>
                    <p className="text-center text-[11px] text-slate-400">
                      Le lien ouvre l'app Wave avec le montant pré-rempli. Après paiement, revenez ici saisir l'ID de transaction.
                    </p>
                  </div>

                  {/* ── ORANGE MONEY — instructions manuelles ── */}
                  <button
                    onClick={() => { set('paymentMethod', 'orange'); setPayStep('instructions'); }}
                    className="group flex flex-col items-center gap-3 rounded-2xl border-2 border-orange-200 bg-white p-6 transition hover:border-orange-500 hover:shadow-lg"
                  >
                    <span className="text-5xl">🟠</span>
                    <span className="text-xl font-extrabold text-orange-500">Orange Money</span>
                    <span className="text-xs text-slate-400">Paiement mobile · Instructions fournies</span>
                    <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-600">
                      Suivre les instructions →
                    </span>
                  </button>
                </div>
              </div>
            )}

            {/* ── Étape B — Instructions selon méthode ── */}
            {payStep === 'instructions' && (
              <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">

                {/* ════ WAVE — confirmation retour ════ */}
                {formData.paymentMethod === 'wave' && (
                  <>
                    <div className="mb-6 flex items-center gap-3">
                      <span className="text-3xl">🔵</span>
                      <div>
                        <h2 className="text-lg font-bold text-slate-800">Paiement Wave</h2>
                        <p className="text-sm text-slate-500">Erastus Group SAS · {formatPrice(selectedTarif.price)}</p>
                      </div>
                    </div>

                    {/* Rappel bouton Wave si pas encore payé */}
                    <div className="mb-6 rounded-2xl bg-blue-50 p-4">
                      <p className="mb-3 text-sm font-semibold text-blue-700">
                        Vous n'avez pas encore ouvert Wave ?
                      </p>
                      <a
                        href={payNumbers.wave.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700"
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                        Ouvrir Wave — {formatPrice(selectedTarif.price)}
                      </a>
                    </div>

                    <ol className="space-y-4">
                      <li className="flex gap-4">
                        <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600">1</span>
                        <div>
                          <p className="font-semibold text-slate-800">Confirmez le paiement dans Wave</p>
                          <p className="text-sm text-slate-500">Le montant de <strong>{formatPrice(selectedTarif.price)}</strong> est pré-rempli. Vérifiez et validez dans l'app.</p>
                        </div>
                      </li>
                      <li className="flex gap-4">
                        <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600">2</span>
                        <div>
                          <p className="font-semibold text-slate-800">Revenez ici et notez l'ID Wave</p>
                          <p className="mb-2 text-sm text-slate-500">
                            Après paiement, Wave vous envoie un SMS ou affiche un reçu avec un identifiant de transaction. Copiez-le ci-dessous :
                          </p>
                          <Input
                            name="transactionId"
                            value={formData.transactionId}
                            onChange={handleChange}
                            placeholder="Ex. : W-XXXXXXXXXXXXXXXX"
                          />
                        </div>
                      </li>
                    </ol>
                  </>
                )}

                {/* ════ ORANGE MONEY — instructions manuelles ════ */}
                {formData.paymentMethod === 'orange' && (
                  <>
                    <div className="mb-6 flex items-center gap-3">
                      <span className="text-3xl">🟠</span>
                      <div>
                        <h2 className="text-lg font-bold text-slate-800">Paiement Orange Money</h2>
                        <p className="text-sm text-slate-500">Suivez les étapes ci-dessous</p>
                      </div>
                    </div>

                    <ol className="space-y-5">
                      <li className="flex gap-4">
                        <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-orange-100 text-sm font-bold text-orange-600">1</span>
                        <div>
                          <p className="font-semibold text-slate-800">Composez le #144# ou ouvrez Orange Money</p>
                          <p className="text-sm text-slate-500">Choisissez "Envoyer de l'argent"</p>
                        </div>
                      </li>
                      <li className="flex gap-4">
                        <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-orange-100 text-sm font-bold text-orange-600">2</span>
                        <div>
                          <p className="font-semibold text-slate-800">Envoyez le montant exact</p>
                          <div className="mt-1 rounded-xl border border-dashed border-orange-200 bg-orange-50 p-3 text-center">
                            <p className="text-xs text-orange-400">Montant exact</p>
                            <p className="text-2xl font-extrabold text-orange-600">{formatPrice(selectedTarif.price)}</p>
                          </div>
                        </div>
                      </li>
                      <li className="flex gap-4">
                        <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-orange-100 text-sm font-bold text-orange-600">3</span>
                        <div>
                          <p className="font-semibold text-slate-800">Au numéro Orange Money CIT</p>
                          <div className="mt-1 flex items-center gap-3 rounded-xl bg-slate-900 px-4 py-3">
                            <Phone size={16} className="text-slate-400" />
                            <span className="font-mono text-lg font-bold tracking-widest text-white">
                              {payNumbers.orange.number}
                            </span>
                          </div>
                          <p className="mt-1 text-xs text-slate-400">
                            Bénéficiaire : {payNumbers.orange.name}
                          </p>
                        </div>
                      </li>
                      <li className="flex gap-4">
                        <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-orange-100 text-sm font-bold text-orange-600">4</span>
                        <div className="flex-1">
                          <p className="font-semibold text-slate-800">Saisissez l'ID de transaction reçu par SMS</p>
                          <p className="mb-2 text-sm text-slate-500">Orange Money vous envoie un SMS de confirmation avec un code unique :</p>
                          <Input
                            name="transactionId"
                            value={formData.transactionId}
                            onChange={handleChange}
                            placeholder="Ex. : OM-2026-XXXXXXXXX"
                          />
                        </div>
                      </li>
                    </ol>
                  </>
                )}

                {/* ── Actions ── */}
                <div className="mt-7 flex gap-3">
                  <button
                    onClick={() => setPayStep('method')}
                    className="flex items-center gap-1 rounded-xl border border-slate-200 px-5 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50"
                  >
                    <ArrowLeft size={14} /> Changer
                  </button>
                  <button
                    disabled={!formData.transactionId.trim() || isSubmitting}
                    onClick={handleSubmitAndPay}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#16A34A] to-[#2563EB] px-6 py-3 font-semibold text-white shadow transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {isSubmitting ? (
                      <><Loader2 size={18} className="animate-spin" /> Validation en cours…</>
                    ) : (
                      <><BadgeCheck size={18} /> Valider et obtenir mon badge</>
                    )}
                  </button>
                </div>

                {submitError && (
                  <p className="mt-3 flex items-center gap-2 text-sm text-red-500">
                    <AlertCircle size={14} /> {submitError}
                  </p>
                )}
                <p className="mt-4 text-center text-xs text-slate-400">
                  Votre badge sera activé après vérification du paiement par l'équipe CIT (24–48h).
                </p>
              </div>
            )}
          </div>
        )}

        {/* ═══════════════ STEP 5 — BADGE ═══════════════ */}
        {step === 'badge' && (
          <div className="space-y-6">
            <div className="rounded-2xl border border-green-100 bg-green-50 p-4 text-center">
              <CheckCircle2 size={36} className="mx-auto mb-2 text-[#16A34A]" />
              <h2 className="text-xl font-bold text-slate-800">Inscription confirmée !</h2>
              <p className="mt-1 text-sm text-slate-500">
                Un email de confirmation vous sera envoyé à <strong>{formData.email}</strong> après vérification du paiement.
              </p>
              <p className="mt-1 font-mono text-xs text-[#16A34A]">{registrationId}</p>
            </div>

            <BadgeCanvas
              registrationId={registrationId}
              type={regType}
              tarifId={selectedTarifId}
              formData={formData}
            />

            <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
              <p className="flex items-start gap-2 text-xs text-blue-700">
                <CreditCard size={14} className="mt-0.5 flex-shrink-0" />
                Votre badge sera activé une fois le paiement vérifié par l'équipe CIT (délai : 24–48h). Conservez l'ID <strong>{registrationId}</strong> pour tout suivi.
              </p>
            </div>

            <button
              onClick={() => { setStep('type'); setFormData(INIT); setSelectedTarifId(''); setRegistrationId(''); }}
              className="w-full rounded-xl border border-slate-200 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50"
            >
              Inscrire une autre personne / entreprise
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
