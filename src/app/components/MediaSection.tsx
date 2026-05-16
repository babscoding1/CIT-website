import { useEffect, useState } from 'react';
import {
  Play,
  X,
  ChevronLeft,
  ChevronRight,
  Download
} from 'lucide-react';

import { images } from '../../assets/images';
import { video } from '../../assets/video';
import { pdf } from '../../assets/pdf';

type MediaItem = {
  type: 'image' | 'video';
  url: string;
  title: string;
  description: string;
  date: string;
  edition?: string;
};

type NewsletterItem = {
  id: number;
  title: string;
  pdf: string;
  cover: string;
};

export default function MediaSection() {
  const [selectedTab, setSelectedTab] = useState<
    'photos' | 'videos' | 'newsletters'
  >('photos');

  const [selectedEvent, setSelectedEvent] =
    useState<any>(null);

  const [currentIndex, setCurrentIndex] =
    useState(0);

  const [activeMedia, setActiveMedia] =
    useState<MediaItem | null>(null);

  // =========================
  // EVENTS
  // =========================

  const events = [
    {
      id: 1,

      title: 'Présentation de la Mascotte',

      edition: '5ème édition',

      date: '-',

      description: `DjignaBo’T est bien plus qu’un simple personnage visuel : c’est la mascotte officielle de Casamance Innovation Tech, pensée pour incarner l’innovation, la créativité et l’avenir technologique de la Casamance. 🔷 Signification du nom: Le nom DjignaBo’T combine des références culturelles et technologiques : “Djigna” évoque l’intelligence, la connaissance ou la sagesse dans un contexte local. “Bo’T” fait penser à “bot” (robot), symbole de l’intelligence artificielle et de l’automatisation. 👉 Ensemble, DjignaBo’T représente une intelligence locale augmentée par la technologie. 🤖 Rôle de DjignaBo’T: En tant que mascotte, DjignaBo’T joue plusieurs rôles clés : Ambassadeur de l’innovation : il incarne les projets technologiques portés par Casamance Innovation Tech. Symbole éducatif : il rend la technologie accessible, notamment aux jeunes et aux entrepreneurs.Guide digital : il peut être utilisé dans des supports (affiches, applications, formations) pour accompagner les utilisateurs.`,

      year: '2026',

      cover: images.mascotte,

      images: [
        {
          url: images.mascotte1
        }
      ]
    },

    {
      id: 2,

      title:
        'Semaine nationale de la jeunesse édition 2026 à Thies',
      
      edition: '5ème édition',

      date: '29 Mars - 03 Avril 2026',

      description: `Dans le cadre de la semaine nationale de la jeunesse édition 2026 à Thies, deux jeunes membres des équipes lauréates du hackathon du CIT 2025 à savoir Youssouf DIEDHIOU et Dado TAMEGA se sont classés à la deuxième place de la compétition innovation numérique lors de la semaine nationale de la jeunesse à Thies. Sous le thème : La semaine nationale de la jeunesse au rythme de l'Olympisme, nos deux représentants ont su démontrer une expertise remarquable permettant à la région de prendre la médaille d'argent.Avec la solution Ayo Dakar 2026 qui permet d'avoir des informations précises sur les JOJ avec l'intégration d'une assistante en wolof, français et anglais. Casamance Innovation Tech — Osons l'innovation en Casamance.`,

      year: '2026',

      cover: images.semaine_jeunesse2,

      images: [
        {
          url: images.semaine_jeunesse2
        },
        {
          url: images.semaine_jeunesse1
        },
        {
          url: images.semaine_jeunesse3
        },
        {
          url: images.semaine_jeunesse4
        }
      ]
    },

    {
      id: 3,

      title: 'Panel 2:  L’Éducation intelligente',

      edition: '4ème édition',

      date: '06 Décembre 2025',

      description: `Ce samedi 06 décembre, dans le cadre de la 4# édition du Salon Casamance Innovation Tech, s’est tenu un panel riche en réflexions autour du thème « L'Éducation intelligente : l’IA au service de la pédagogie ». Les échanges ont permis de mieux comprendre comment l’intelligence artificielle peut transformer l’expérience d’apprentissage, tout en mettant en lumière les enjeux humains et éthiques de son intégration.  - Abraham, expert en IA, a présenté des outils innovants pour une éducation plus personnalisée.  - Hélène Agnès Diène, socio-anthropologue, a souligné l’importance du facteur humain dans cette transformation.  - La session a été brillamment modérée par Thiara, qui a su canaliser les échanges de manière dynamique. Un moment fort du salon, qui confirme que l’éducation de demain se construit dès aujourd’hui, entre innovation, inclusion et humanisme.Osons l’innovation en Casamance.`,

      year: '2025',

      cover: images.panel2_3,

      images: [
        {
          url: images.panel2_1
        },
        {
          url: images.panel2_3
        },
        {
          url: images.panel2_4
        },
        {
          url: images.panel2_5
        },
        {
          url: images.panel2_6
        },
        {
          url: images.panel2_7
        },
        {
          url: images.panel2_8
        },
        {
          url: images.panel2_9
        },
        {
          url: images.panel2_10
        },
        {
          url: images.panel2_11
        }
      ]
    },

    {
      id: 4,

      title:
        'Hackathon en action : l’innovation au service du patrimoine !',

      edition: '4ème édition',

      date: '05 Décembre 2025',

      description: `Dans le cadre du Salon Casamance Innovation Tech 2025, place à l’énergie créative des jeunes talents avec un #Hackathon sur le thème :  « Le numérique au service du Tourisme et du Patrimoine de la Casamance ». Les équipes en compétition planchent actuellement sur des #solutions concrètes, technologiques et innovantes pour promouvoir durablement la richesse culturelle, historique et naturelle de la Casamance. Objectif : repenser l’attractivité touristique de notre territoire en alliant digitalisation, valorisation du patrimoine et expérience utilisateur.  Une belle opportunité pour démontrer que la technologie peut être un levier puissant de développement local, d’identité et de rayonnement régional.`,

      year: '2025',

      cover: images.hackaton1,

      images: [
        {
          url: images.hackaton1
        },
        {
          url: images.hackaton2
        },
        {
          url: images.hackaton3
        },
        {
          url: images.hackaton4
        },
        {
          url: images.hackaton5
        }
      ]
    },
    {
      id: 5,

      title:'Compétition Robotique Inter-Établissements',

      edition: '4ème édition',

      date: '05 Décembre 2025',

      description: `Dans le cadre du Salon Casamance Innovation Tech – 4#édition, la compétition robotique inter-établissements bat son plein dans les locaux d’Erastus Group. Des jeunes passionnés venus de différents établissements de la région rivalisent d’ingéniosité, de précision et de créativité pour démontrer leur maîtrise des technologies robotiques. #Objectif : stimuler l’esprit scientifique, encourager la collaboration et révéler les talents de demain dans un domaine en pleine expansion.Cette compétition incarne parfaitement la mission du salon : rendre la technologie accessible, éducative et inspirante pour la jeunesse casamançaise.`,

      year: '2025',

      cover: images.compet_robotique1,

      images: [
        {
          url: images.compet_robotique1
        },
        {
          url: images.compet_robotique2
        },
        {
          url: images.compet_robotique3
        },
        {
          url: images.compet_robotique4
        },
        {
          url: images.compet_robotique5
        },
        {
          url: images.compet_robotique6
        },
        {
          url: images.compet_robotique7
        },
        {
          url: images.compet_robotique8
        }
      ]
    },
    {
      id: 6,

      title:'Panel 1: Construire un futur intelligent',

      edition: '4ème édition',

      date: '05 Décembre 2025',

      description: `Dans le cadre de la 4# édition du Salon Casamance Innovation Tech, Le #Panel 1 ouvre le débat sur un thème d’une importance capitale :  "Construire un futur intelligent : la collaboration entre l’humain et la machine.". Un panel d’exception animé par des experts de haut niveau :-Gérard Dacosta, ingénieur en cybersécurité et auteur engagé sur les enjeux numériques contemporains  -Gora Kébé, Fondateur de Sénégal Artificial Intelligence, acteur majeur de l’IA en Afrique francophone  -Dr Ousseynou Mbaye, enseignant-chercheur à l’Université Assane Seck de Ziguinchor, spécialiste en Intelligence Artificielle. Le tout modéré par Mohamed Abdallah Sall, professionnel du numérique et acteur de l'écosystème tech au Sénégal. `,

      year: '2025',

      cover: images.panel1_1,

      images: [
        {
          url: images.panel1_1
        },
        {
          url: images.panel1_2
        },
        {
          url: images.panel1_3
        },
        {
          url: images.panel1_4
        },
        {
          url: images.panel1_5
        },
        {
          url: images.panel1_6
        },
        {
          url: images.panel1_7
        }
      ]
    },
    {
      id: 7,

      title:'Ceremonie d\'ouverture',

      edition: '4ème édition',

      date: '05 Décembre 2025',

      description: `Ce vendredi 5 décembre 2025 marque un tournant majeur pour l’écosystème de l’innovation en Casamance avec le lancement officiel du Salon Casamance Innovation Tech, un rendez-vous devenu incontournable pour les acteurs du numérique, de la créativité et de l’entrepreneuriat. La cérémonie d’ouverture s’est tenue dans une ambiance dynamique et inspirante, en présence d’invités de marque, de partenaires, d’innovateurs, de jeunes talents et de porteurs de projets venus de toute la région.Cette journée a été également rythmée par la visite des stands des exposants, une vitrine riche d’initiatives locales et de solutions technologiques au service du développement durable, de l’éducation, de la santé, de l’environnement et bien plus.`,

      year: '2025',

      cover: images.ceremonie_ouverture1,

      images: [
        {
          url: images.ceremonie_ouverture1
        },
        {
          url: images.ceremonie_ouverture2
        },
        {
          url: images.ceremonie_ouverture3
        },
        {
          url: images.ceremonie_ouverture4
        },
        {
          url: images.ceremonie_ouverture5
        },
        {
          url: images.ceremonie_ouverture6
        },
        {
          url: images.ceremonie_ouverture7
        },
        {
          url: images.ceremonie_ouverture8
        },
        {
          url: images.ceremonie_ouverture9
        },
        {
          url: images.ceremonie_ouverture10
        },
        {
          url: images.ceremonie_ouverture11
        }
      ]
    },
    {
      id: 8,

      title:'Formation Robotique',

      edition: '4ème édition',

      date: '04 Décembre 2025',

      description: `Le Salon Casamance Innovation Tech poursuit son programme à l’Alliance Française de Ziguinchor avec un temps fort : le Concours de Robotique Inter-Établissements. Des élèves venus de différents établissements de la région ont rivalisé de créativité, d’ingéniosité et de maîtrise technologique à travers des projets robotiques innovants, portés par une passion commune : construire le futur. Ce concours, au-delà de la compétition, incarne notre volonté de stimuler les vocations STEM, renforcer l’esprit d’équipe et démontrer que la Casamance regorge de talents prêts à relever les défis du numérique. Un grand bravo à ces jeunes innovateurs et à leurs encadreurs pour leur engagement inspirant. La relève est là. Et elle est brillante. Osons l’innovation en Casamance`,

      year: '2025',

      cover: images.form_robotique_1,

      images: [
        {
          url: images.form_robotique_1
        },
        {
          url: images.form_robotique_2
        },
        {
          url: images.form_robotique_3
        },
        {
          url: images.form_robotique_4
        },
        {
          url: images.form_robotique_5
        },
        {
          url: images.form_robotique_6
        },
        {
          url: images.form_robotique_7
        },
        {
          url: images.form_robotique_8
        },
        {
          url: images.form_robotique_9
        }
      ]
    },
    {
      id: 9,

      title:'Série de dessins animés éducatifs',

      edition: '4ème édition',

      date: '03 Décembre 2025',

      description: `Des enfants ont pu découvrir une série de dessins animés éducatifs, riches en valeurs, en apprentissages et en messages positifs. Une manière symbolique et forte de débuter cette édition : en plaçant l’éducation et la sensibilisation des générations futures au cœur de l’innovation. L’innovation commence dès l’enfance. Et hier, nous avons semé les graines de la curiosité, de la créativité et de la conscience citoyenne.`,

      year: '2025',

      cover: images.form_robotique_1,

      images: [
        {
          url: images.form_robotique_1
        },
        {
          url: images.form_robotique_2
        },
        {
          url: images.form_robotique_3
        },
        {
          url: images.form_robotique_4
        },
        {
          url: images.form_robotique_5
        },
        {
          url: images.form_robotique_6
        },
        {
          url: images.form_robotique_7
        },
        {
          url: images.form_robotique_8
        },
        {
          url: images.form_robotique_9
        }
      ]
    },
    {
      id: 10,

      title:'Formation en Leadership et en Gestion d\'accueil',

      edition: '4ème édition',

      date: '15 Novembre 2025',

      description: `En prélude de la 4eme édition du salon de l'innovation tech en Casamance en décembre, nos volontaires à l'organisation ont été formés sur le leadership et la gestion d'accueil de nos invités durant l'événement le 15 novembre 2025. Cette formation animée par Christian Mendy et Salif Mane a permis aux volontés d'être préparées en vue d'une bonne organisation réussite de cette activité qui évolue d'année en année. Casamance Innovation Tech Osons l'innovation en Casamance.`,

      year: '2025',

      cover: images.form_leadership_1,

      images: [
        {
          url: images.form_leadership_1
        },
        {
          url: images.form_leadership_2
        },
        {
          url: images.form_leadership_3
        },
        {
          url: images.form_leadership_4
        },
        {
          url: images.form_leadership_5
        },
        {
          url: images.form_leadership_6
        }
      ]
    },
    {
      id: 11,

      title:'Rencontre avec M.Upa kajor MENDY secrétaire général du conseil départemental de Ziguinchor',

      edition: '4ème édition',

      date: '15 Novembre 2025',

      description: `l'équipe d'organisation a rencontré M.Upa kajor MENDY secrétaire général du conseil départemental de Ziguinchor le jeudi 13 novembre 2025 afin de discuter sur l'organisation de cette édition et voir les pistes de collaboration institutionnelle du conseil qui depuis la 1ere édition accompagne le salon. En route pour une édition d'innovation avec beaucoup de surprises. Casamance Innovation Tech osons l'innovation en Casamance.`,

      year: '2025',

      cover: images.rencontre_sg_conseil_dept_zig1,

      images: [
        {
          url: images.rencontre_sg_conseil_dept_zig1
        },
        {
          url: images.rencontre_sg_conseil_dept_zig2
        },
        {
          url: images.rencontre_sg_conseil_dept_zig3
        },
        {
          url: images.rencontre_sg_conseil_dept_zig4
        },
      ]
    },
  ];

  // =========================
  // VIDEOS
  // =========================

  const videos = [
    {
      id: 1,

      title:
        '1ʳᵉ Édition du Salon Casamance Innovation Tech',

      date: '10 Mars 2025',

      edition: '1ère édition',

      description:
        'Retour sur la 1ʳᵉ édition du Salon Casamance Innovation Tech.',

      videoUrl: video.Premier,

      thumbnail: images.couv_vid_robtique
    },

    {
      id: 2,

      title:
        '2ème Édition du Salon Casamance Innovation Tech',

      edition: '2ème édition',

      date: '22 Juin 2025',

      description:
        'Chaque année, Casamance Innovation Tech confirme son positionnement comme l’un des événements majeurs dédiés à la technologie.',

      videoUrl: video.sTV,

      thumbnail: images.couv_vid_sTV
    },

    {
      id: 3,

      title:
        '#casamanceinnovationtech#4 => Compétition Robotique Inter-Établissements',

      edition: '4ème édition',

      date: '06 Décembre 2025',

      description:`Salon Casamance Innovation Tech 2025. Du 4 au 6 décembre 2025, l’Alliance Française de Ziguinchor, Erastus Group et Centre Culturel Régional de Ziguinchor a vibré au rythme de l’ingéniosité et de la créativité des jeunes talents casamançais lors de la compétition robotique inter-établissements. Un moment fort du Salon où les élèves ont démontré leur maîtrise des technologies, leur esprit d’équipe et leur capacité à résoudre des défis techniques concrets à travers la programmation et la robotique. Au-delà de la compétition, c’est toute une jeunesse qui s’est levée pour imaginer l’avenir avec audace, porter l’innovation au cœur de l’éducation, et prouver que la relève technologique est bien là.`,

      videoUrl: video.robotique,

      thumbnail: images.couv_vid_robtique
    },

    {
      id: 4,

      title:
        '4ème Édition du Salon Casamance Innovation Tech',

      edition: '4ème édition',

      date: '07 Décembre 2025',

      description:
        'Construire un futur intelligent : collaboration entre humain et machine.',

      videoUrl: video.agnes_coly,

      thumbnail: images.couv_vid_agnes
    }
  ];

  // =========================
  // NEWSLETTERS
  // =========================

  const newsletters: NewsletterItem[] = [
    {
      id: 1,

      title: 'Newsletter Janvier 2025',

      pdf: pdf.newsletter_janvier_2025,

      cover: images.img_newsletter_janvier_2025
    },

    {
      id: 2,

      title: 'Newsletter Février - Mars 2025',

      pdf: pdf.newsletter_fevrier_mars_2025,

      cover: images.img_newsletter_fevrier_mars_2025
    },

    {
      id: 3,

      title: 'Newsletter Avril - Mai - Juin 2025',

      pdf: pdf.newsletter_avril_mai_juin_2025,

      cover: images.img_newsletter_avril_mai_juin_2025
    },

    {
      id: 4,

      title: 'Newsletter Juillet 2025',

      pdf: pdf.newsletter_juillet_2025,

      cover: images.img_newsletter_juillet_2025
    }
  ];

  // =========================
  // NAVIGATION IMAGES
  // =========================

  const nextImage = () => {
    setCurrentIndex((prev) =>
      prev === selectedEvent.images.length - 1
        ? 0
        : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentIndex((prev) =>
      prev === 0
        ? selectedEvent.images.length - 1
        : prev - 1
    );
  };

  // =========================
  // KEYBOARD NAVIGATION
  // =========================

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedEvent) {
        if (e.key === 'ArrowRight') {
          nextImage();
        }

        if (e.key === 'ArrowLeft') {
          prevImage();
        }

        if (e.key === 'Escape') {
          setSelectedEvent(null);
        }
      }

      if (activeMedia) {
        if (e.key === 'Escape') {
          setActiveMedia(null);
        }
      }
    };

    window.addEventListener(
      'keydown',
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        'keydown',
        handleKeyDown
      );
    };
  }, [selectedEvent, activeMedia]);

  return (
    <section
      id="media"
      className="py-20 bg-gradient-to-b from-white to-slate-50"
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* HEADER */}

        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900">
            Médiathèque
          </h2>

          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Découvrez les photos, vidéos et newsletters
            retraçant les moments forts du Salon Casamance
            Innovation Tech.
          </p>
        </div>

        {/* TABS */}

        <div className="flex justify-center mb-12">
          <div className="flex bg-white shadow-lg rounded-xl p-1 border">
            <button
              onClick={() => setSelectedTab('photos')}
              className={`px-6 py-3 rounded-lg font-medium transition ${
                selectedTab === 'photos'
                  ? 'bg-green-500 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Photos
            </button>

            <button
              onClick={() => setSelectedTab('videos')}
              className={`px-6 py-3 rounded-lg font-medium transition ${
                selectedTab === 'videos'
                  ? 'bg-green-500 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Vidéos
            </button>

            <button
              onClick={() =>
                setSelectedTab('newsletters')
              }
              className={`px-6 py-3 rounded-lg font-medium transition ${
                selectedTab === 'newsletters'
                  ? 'bg-green-500 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Newsletters
            </button>
          </div>
        </div>

        {/* PHOTOS */}

        {selectedTab === 'photos' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {events.map((event) => (
              <div
                key={event.id}
                onClick={() => {
                  setSelectedEvent(event);
                  setCurrentIndex(0);
                }}
                className="cursor-pointer group relative rounded-2xl overflow-hidden shadow-lg"
              >
                <img
                  src={event.cover}
                  className="w-full h-64 object-cover group-hover:scale-110 transition duration-500"
                />

                {/* BADGE EDITION */}

                {event.edition && (
                  <div className="absolute bottom-4 right-4 z-20">
                    <span className="bg-green-500/90 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg border border-white/20">
                      {event.edition}
                    </span>
                  </div>
                )}

                {/* OVERLAY */}

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-2">
                  <div className="pr-20">
                    <h4 className="text-white font-bold text-lg leading-tight">
                      {event.title}
                    </h4>

                    <p className="text-gray-300 text-sm mt-2">
                      {event.date}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIDEOS */}

        {selectedTab === 'videos' && (
          <div className="flex gap-6 overflow-x-auto pb-4">
            {videos.map((vid) => (
              <div
                key={vid.id}
                className="group relative min-w-[320px] h-[220px] rounded-2xl overflow-hidden cursor-pointer bg-black shadow-xl"
                onClick={() =>
                  setActiveMedia({
                    type: 'video',
                    url: vid.videoUrl,
                    title: vid.title,
                    description: vid.description,
                    date: vid.date,
                    edition: vid.edition
                  })
                }
              >
                <img
                  src={vid.thumbnail}
                  className="w-full h-full object-cover group-hover:opacity-0 transition duration-500"
                />

                <video
                  src={vid.videoUrl}
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100"
                  onMouseEnter={(e) =>
                    e.currentTarget.play()
                  }
                  onMouseLeave={(e) => {
                    e.currentTarget.pause();
                    e.currentTarget.currentTime = 0;
                  }}
                />

                {/* BADGE EDITION */}

                {vid.edition && (
                  <div className="absolute top-4 right-4 z-20">
                    <span className="bg-green-500/90 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg border border-white/20">
                      {vid.edition}
                    </span>
                  </div>
                )}

                {/* PLAY BUTTON */}

                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur flex items-center justify-center group-hover:scale-110 transition">
                    <Play className="text-white fill-white ml-1" />
                  </div>
                </div>

                {/* CONTENT */}

                <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
                  <div className="pr-24">
                    <h3 className="text-white font-semibold leading-snug">
                      {vid.title}
                    </h3>

                    <p className="text-gray-300 text-sm mt-2">
                      {vid.date}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* NEWSLETTERS */}

        {selectedTab === 'newsletters' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {newsletters.map((newsletter) => (
              <div
                key={newsletter.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg border hover:shadow-2xl transition"
              >
                <img
                  src={newsletter.cover}
                  className="w-full h-64 object-cover"
                />

                <div className="p-5">
                  <h3 className="font-bold text-lg text-gray-900">
                    {newsletter.title}
                  </h3>

                  <a
                    href={newsletter.pdf}
                    download
                    className="mt-4 inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl transition"
                  >
                    <Download size={18} />
                    Télécharger
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* EVENT MODAL */}

      {selectedEvent && (
        <div
          onClick={() => setSelectedEvent(null)}
          className="fixed inset-0 bg-black/95 z-50 overflow-y-auto"
        >
          <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
            {/* CLOSE */}

            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedEvent(null);
              }}
              className="fixed top-5 right-5 text-white hover:text-red-400 transition z-50"
            >
              <X size={32} />
            </button>

            {/* IMAGE CONTAINER */}

            <div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-6xl"
            >
              <img
                src={
                  selectedEvent.images[currentIndex]
                    .url
                }
                className="w-full max-h-[55vh] object-contain rounded-2xl shadow-2xl"
              />

              {/* EDITION BADGE */}

              {selectedEvent.edition && (
                <div className="absolute top-4 left-4 z-30">
                  <span className="bg-green-500/90 backdrop-blur-md text-white text-sm font-semibold px-4 py-2 rounded-full shadow-xl border border-white/20">
                    {selectedEvent.edition}
                  </span>
                </div>
              )}

              {/* COUNTER */}

              <div className="absolute top-4 right-4 text-white bg-black/50 backdrop-blur px-4 py-2 rounded-full text-sm">
                {currentIndex + 1} /{' '}
                {selectedEvent.images.length}
              </div>

              {/* NAVIGATION */}

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-black/40 backdrop-blur flex items-center justify-center text-white hover:scale-110 transition"
              >
                <ChevronLeft size={34} />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-black/40 backdrop-blur flex items-center justify-center text-white hover:scale-110 transition"
              >
                <ChevronRight size={34} />
              </button>
            </div>

            {/* CONTENT */}

            <div
              onClick={(e) => e.stopPropagation()}
              className="text-white mt-8 text-center max-w-10xl"
            >
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                {selectedEvent.title}
              </h3>

              <p className="text-green-400 font-medium mb-6">
                {selectedEvent.date}
              </p>

              <p className="text-gray-300 leading-relaxed whitespace-pre-line text-base md:text-lg">
                {selectedEvent.description}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* VIDEO MODAL */}

      {activeMedia &&
        activeMedia.type === 'video' && (
          <div
            onClick={() => setActiveMedia(null)}
            className="fixed inset-0 bg-black/95 z-50 overflow-y-auto"
          >
            <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
              {/* CLOSE */}

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveMedia(null);
                }}
                className="fixed top-5 right-5 text-white hover:text-red-400 transition z-50"
              >
                <X size={32} />
              </button>

              {/* VIDEO */}

              <div
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-6xl"
              >
                <video
                  src={activeMedia.url}
                  controls
                  autoPlay
                  playsInline
                  className="w-full max-h-[55vh] rounded-2xl shadow-2xl bg-black"
                />

                {/* EDITION */}

                {activeMedia.edition && (
                  <div className="absolute top-4 left-4 z-30">
                    <span className="bg-green-500/90 backdrop-blur-md text-white text-sm font-semibold px-4 py-2 rounded-full shadow-xl border border-white/20">
                      {activeMedia.edition}
                    </span>
                  </div>
                )}
              </div>

              {/* CONTENT */}

              <div
                onClick={(e) => e.stopPropagation()}
                className="text-white mt-8 text-center max-w-10xl"
              >
                <h3 className="text-3xl md:text-4xl font-bold mb-4">
                  {activeMedia.title}
                </h3>

                <p className="text-green-400 font-medium mb-6">
                  {activeMedia.date}
                </p>

                <p className="text-gray-300 leading-relaxed whitespace-pre-line text-base md:text-lg">
                  {activeMedia.description}
                </p>
              </div>
            </div>
          </div>
        )}
    </section>
  );
}