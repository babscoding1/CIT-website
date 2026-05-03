import { useState } from 'react';
import { Play, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { images } from '../../assets/images';
import { video } from '../../assets/video';

type MediaItem = {
  type: 'image' | 'video';
  url: string;
  title: string;
  description: string;
};

export default function MediaSection() {
  const [selectedTab, setSelectedTab] = useState<'photos' | 'videos'>('photos');
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeMedia, setActiveMedia] = useState<MediaItem | null>(null);

  // 📁 EVENTS AVEC DESCRIPTION
  const events = [
    {
      id: 1,
      title: 'Semaine nationale de la jeunesse édition 2026 à Thies',
      description: `Dans le cadre de la semaine nationale de la jeunesse édition 2026 à Thies, deux jeunes membres des équipes lauréates  de l'hackathon du CIT 2025 à savoir Youssouf DIEDHIOU  et Dado TAMEGA se sont classés à la deuxième place de la compétition innovation numérique lors de la semaine nationale de la jeunesse à thies.
                    Sous le thème : La semaine nationale de la jeunesse au rythme de l'Olympisme, nos deux représentants ont su démontré d'une expertise remarquable permettant à la région de prendre la médaille d'argent.
                    Avec la solution Ayo Dakar 2026 qui permet d'avoir des informations précises sur les JOJ avec l'intégration d'une assistante en wolof ,français et anglais,cette solution pourra être un guide pratique pour une inclusion de tous pour la réussite de cet événement.
                    Avec ce résultat qui montre le potentiel des jeunes de la région mise en exergue par le CIT en permettant aux étudiants de s'exprimer et de sortir leurs potentiels.
                    Un grand merci au gouverneur de la région et mention spéciale à l'inspecteur régional de la Jeunesse M.DIBA pour l'accompagnement.
                    Casamance Innovation Tech osons l'innovation en Casamance.`,
      year: '2026',
      cover: images.semaine_jeunesse2,
      images: [
        {
          url: images.semaine_jeunesse2,
        },
        {
          url: images.semaine_jeunesse1,
        },
        {
          url: images.semaine_jeunesse3,
        },
        {
          url: images.semaine_jeunesse4,
        }
      ]
    },
    {
      id: 2,
      title: 'Hackathon 2024',
      description: 'Compétition technologique intense',
      year: '2024',
      cover: images.image5,
      images: [
        {
          url: images.image5,
          title: 'Équipes en action',
          description: 'Travail collaboratif des développeurs'
        },
        {
          url: images.image6,
          title: 'Présentation finale',
          description: 'Pitch devant le jury'
        }
      ]
    }
  ];

  // 🎬 VIDEOS AVEC DESCRIPTION
  const videos = [
    {
      id: 1,
      title: '1ʳᵉ Édition du Salon Casamance Innovation Tech',
      description: `Retour sur la 1ʳᵉ Édition du Salon Casamance Innovation Tech
                    Une initiative ambitieuse qui, dès sa première édition, a posé les bases d’un rendez-vous incontournable de l’innovation en Casamance.
                    📌 Hackathon, expositions, panels, formations… Chaque année, le salon s’enrichit de contenus pertinents et d’expériences uniques, réunissant jeunes talents, experts, entreprises et acteurs du développement.
                    Cap sur la #4 Édition !
                    Elle s’annonce encore plus audacieuse, plus structurée, et résolument tournée vers l’avenir. Au cœur de cette édition : « Construire un futur intelligent : Collaboration entre humain et machine »
                    📅 Soyez prêts à vivre une expérience unique où idées, talents et technologies se rencontrent pour construire un futur intelligent.
                    Osons ensemble l’innovation en Casamance`,
      videoUrl: video.Premier,
      thumbnail: images.couv_vid_robtique
    },
    {
      id: 2,
      title: '2ème Édition du Salon Casamance Innovation Tech',
      description: `Retour sur la 2ème Édition du Salon Casamance Innovation Tech
                    Chaque année, Casamance Innovation Tech confirme son positionnement comme l’un des événements majeurs dédiés à la technologie, à la créativité et à la transformation digitale en Casamance.
                    La 2ème édition a été marquée par une programmation dynamique et impactante :  
                    Hackathon stimulant l’innovation locale  
                    Formations pointues autour des nouvelles technologies  
                    Panels enrichissants avec des experts nationaux et internationaux  
                    Expositions de solutions innovantes portées par des jeunes talents et startups
                    Cette édition a permis de connecter les idées, les compétences et les énergies autour d’un seul objectif : Oser l’innovation au cœur de notre territoire.
                    La 4ème Édition s’annonce encore plus ambitieuse, avec une vision élargie et des thématiques actuelles comme l’intelligence artificielle, la transition numérique, et la collaboration homme-machine.
                    Cap sur l’innovation, cap sur l’avenir.`,
      videoUrl: video.sTV,
      thumbnail: images.couv_vid_sTV
    },
    {
      id: 3,
      title: 'Compétition Robotique Inter-Établissements.',
      description: `Salon Casamance Innovation Tech 2025 Du 4 au 6 décembre 2025, l’Alliance Française de Ziguinchor, Erastus Group et Centre Culturel Régional de Ziguinchor a vibré au rythme de l’ingéniosité et de la créativité des jeunes talents casamançais lors de la compétition robotique inter-établissements. Un moment fort du Salon où les élèves ont démontré leur maîtrise des technologies, leur esprit d’équipe et leur capacité à résoudre des défis techniques concrets à travers la programmation et la robotique. Au-delà de la compétition, c’est toute une jeunesse qui s’est levée pour imaginer l’avenir avec audace, porter l’innovation au cœur de l’éducation, et prouver que la relève technologique est bien là. Bravo à toutes les équipes pour leur engagement, leur passion et leurs solutions créatives ! Découvrez les temps forts en vidéo !
                    Osons l’innovation en Casamance `,
      videoUrl: video.robotique,
      thumbnail: images.couv_vid_robtique
    },
    {
      id: 4,
      title: '4ème Édition du Salon Casamance Innovation Tech',
      description: `Dans le cadre de la 4eme édition du Salon Casamance Innovation Tech, nous avons l'honneur d’accueillir Hélène Agnès Diène, socio-anthropologue de la santé, parmi nos invités de marque.
      Son expertise, à l'intersection entre sciences sociales et enjeux de santé publique, apportera un éclairage essentiel sur les dynamiques culturelles, communautaires et humaines au cœur des innovations. Sa présence illustre notre volonté d'intégrer une approche holistique de l’innovation, où la technologie dialogue avec les réalités sociales et les besoins des populations.
      À travers son intervention, le Salon ambitionne d'ouvrir un espace de réflexion stratégique sur l'impact social de l'innovation en santé, dans un contexte local et africain en pleine mutation.
      Casamance Innovation Tech 2025, c'est aussi cela : croiser les disciplines, valoriser l'humain et bâtir des ponts entre savoirs scientifiques et transformations technologiques.`,
      videoUrl: video.agnes_coly,
      thumbnail: images.couv_vid_agnes,
    }
  ];

  // NAVIGATION IMAGES
  const nextImage = () => {
    setCurrentIndex((prev) =>
      prev === selectedEvent.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? selectedEvent.images.length - 1 : prev - 1
    );
  };

  return (
    <section id="media" className="py-20 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4">

        {/* HEADER */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">Médiathèque</h2>
        </div>

        {/* TABS */}
        <div className="flex justify-center mb-10">
          <div className="flex bg-white shadow rounded-lg p-1">
            <button
              onClick={() => setSelectedTab('photos')}
              className={`px-6 py-2 rounded ${selectedTab === 'photos' ? 'bg-green-500 text-white' : ''}`}
            >
              Photos
            </button>
            <button
              onClick={() => setSelectedTab('videos')}
              className={`px-6 py-2 rounded ${selectedTab === 'videos' ? 'bg-green-500 text-white' : ''}`}
            >
              Vidéos
            </button>
          </div>
        </div>

        {/* EVENTS */}
        {selectedTab === 'photos' ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {events.map((event) => (
              <div
                key={event.id}
                onClick={() => {
                  setSelectedEvent(event);
                  setCurrentIndex(0);
                }}
                className="cursor-pointer group relative rounded-xl overflow-hidden"
              >
                <img
                  src={event.cover}
                  className="w-full h-48 object-cover group-hover:scale-105 transition"
                />

                <div className="absolute inset-0 bg-black/40 flex items-end p-4">
                  <div>
                    <h4 className="text-white font-bold">{event.title}</h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* VIDEOS */
          <div className="flex gap-6 overflow-x-auto pb-4">
            {videos.map((vid) => (
              <div
                key={vid.id}
                className="group relative min-w-[300px] h-[180px] rounded-xl overflow-hidden cursor-pointer bg-black"
                onClick={() =>
                  setActiveMedia({
                    type: 'video',
                    url: vid.videoUrl,
                    title: vid.title,
                    description: vid.description
                  })
                }
              >
                <img
                  src={vid.thumbnail}
                  className="w-full h-full object-cover group-hover:opacity-0 transition"
                />

                <video
                  src={vid.videoUrl}
                  muted
                  loop
                  className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100"
                  onMouseEnter={(e) => e.currentTarget.play()}
                  onMouseLeave={(e) => {
                    e.currentTarget.pause();
                    e.currentTarget.currentTime = 0;
                  }}
                />

                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <Play className="text-white" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* EVENT MODAL */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/95 z-50 flex flex-col items-center justify-center p-6">

          <button onClick={() => setSelectedEvent(null)} className="absolute top-5 right-5 text-white">
            <X size={30} />
          </button>

          <img
            src={selectedEvent.images[currentIndex].url}
            className="max-h-[60vh] rounded-xl"
          />

          <button onClick={prevImage} className="absolute left-5 text-white">
            <ChevronLeft size={40} />
          </button>

          <button onClick={nextImage} className="absolute right-5 text-white">
            <ChevronRight size={40} />
          </button>

          {/* DESCRIPTION IMAGE */}
          <div className="text-white mt-6 text-center max-w-7xl">
            <h3 className="text-xl font-bold">
              {selectedEvent.title}
            </h3>
            <p className="text-gray-300">
              {selectedEvent.description}
            </p>
          </div>
        </div>
      )}

      {/* VIDEO MODAL */}
      {activeMedia && activeMedia.type === 'video' && (
        <div className="fixed inset-0 bg-black/95 z-50 flex flex-col items-center justify-center p-6">

          <button onClick={() => setActiveMedia(null)} className="absolute top-5 right-5 text-white">
            <X size={30} />
          </button>

          <video
            src={activeMedia.url}
            controls
            autoPlay
            className="max-h-[60vh] rounded-xl"
          />

          {/* DESCRIPTION VIDEO */}
          <div className="text-white mt-6 text-center max-w-5xl">
            <h3 className="text-2xl font-bold">{activeMedia.title}</h3>
            <p className="text-gray-300">{activeMedia.description}</p>
          </div>
        </div>
      )}
    </section>
  );
}