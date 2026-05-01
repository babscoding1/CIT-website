import { useState } from 'react';
import { Play, Image as ImageIcon, Calendar, X } from 'lucide-react';
import { images } from '../../assets/images';

export default function MediaSection() {
  const [selectedTab, setSelectedTab] = useState<'photos' | 'videos'>('photos');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const photos = [
    {
      id: 1,
      url: images.image1,
      title: 'Ouverture CIT 2025',
      year: '2025',
      category: 'Conférence'
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1751139846142-99bd979534ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFydHVwJTIwcGl0Y2glMjBwcmVzZW50YXRpb24lMjBhZnJpY2F8ZW58MXx8fHwxNzc3NDc3NDU0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Pitch Startups',
      year: '2025',
      category: 'Startups'
    },
    {
      id: 3,
      url: images.image3,
      title: 'Ateliers de formation',
      year: '2024',
      category: 'Ateliers'
    },
    {
      id: 4,
      url: images.image6,
      title: 'Stands d\'exposition',
      year: '2024',
      category: 'Exhibition'
    },
    {
      id: 5,
      url: images.image4,
      title: 'Panel de discussions',
      year: '2023',
      category: 'Conférence'
    },
    {
      id: 6,
      url: images.image3,
      title: 'Networking entrepreneurs',
      year: '2023',
      category: 'Networking'
    },
    {
      id: 7,
      url: images.image5,
      title: 'Hackathon CIT',
      year: '2024',
      category: 'Hackathon'
    },
    {
      id: 8,
      url: 'https://images.unsplash.com/photo-1762968269894-1d7e1ce8894e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25mZXJlbmNlJTIwa2V5bm90ZSUyMHNwZWFrZXIlMjBzdGFnZXxlbnwxfHx8fDE3Nzc0Nzc0NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Keynote speakers',
      year: '2022',
      category: 'Conférence'
    },
  ];

  const videos = [
    {
      id: 1,
      title: 'CIT 2025 - Collaboration homme-machine',
      thumbnail: 'https://images.unsplash.com/photo-1776039325163-f45315a484f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwdGVjaG5vbG9neSUyMGNvbmZlcmVuY2UlMjBhdWRpZW5jZXxlbnwxfHx8fDE3Nzc0Nzc0NTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      duration: '12:45',
      year: '2025',
      views: '2.4K'
    },
    {
      id: 2,
      title: 'Retour sur CIT 2024 - Enjeux climatiques',
      thumbnail: 'https://images.unsplash.com/photo-1762028892701-692dc360db08?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbm5vdmF0aW9uJTIwZXhoaWJpdGlvbiUyMGJvb3RofGVufDF8fHx8MTc3NzQ3NzQ1NXww&ixlib=rb-4.1.0&q=80&w=1080',
      duration: '15:20',
      year: '2024',
      views: '3.1K'
    },
    {
      id: 3,
      title: 'Pitch des startups gagnantes 2023',
      thumbnail: 'https://images.unsplash.com/photo-1751139846142-99bd979534ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFydHVwJTIwcGl0Y2glMjBwcmVzZW50YXRpb24lMjBhZnJpY2F8ZW58MXx8fHwxNzc3NDc3NDU0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      duration: '18:30',
      year: '2023',
      views: '5.2K'
    },
    {
      id: 4,
      title: 'CIT 2022 - Première édition highlights',
      thumbnail: 'https://images.unsplash.com/photo-1762968269894-1d7e1ce8894e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25mZXJlbmNlJTIwa2V5bm90ZSUyMHNwZWFrZXIlMjBzdGFnZXxlbnwxfHx8fDE3Nzc0Nzc0NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      duration: '10:15',
      year: '2022',
      views: '4.8K'
    },
  ];

  const years = ['all', '2025', '2024', '2023', '2022'];

  const filteredPhotos = selectedYear === 'all' 
    ? photos 
    : photos.filter(photo => photo.year === selectedYear);

  const filteredVideos = selectedYear === 'all'
    ? videos
    : videos.filter(video => video.year === selectedYear);

  return (
    <section id="media" className="py-20 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Médiathèque
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Revivez les moments forts des éditions précédentes de Casamance Innovation Tech
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          <div className="flex bg-white rounded-lg shadow-sm border border-border p-1">
            <button
              onClick={() => setSelectedTab('photos')}
              className={`flex items-center space-x-2 px-6 py-3 rounded-md transition-all ${
                selectedTab === 'photos'
                  ? 'bg-gradient-to-r from-[#16A34A] to-[#2563EB] text-white'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <ImageIcon size={18} />
              <span>Photos</span>
            </button>
            <button
              onClick={() => setSelectedTab('videos')}
              className={`flex items-center space-x-2 px-6 py-3 rounded-md transition-all ${
                selectedTab === 'videos'
                  ? 'bg-gradient-to-r from-[#16A34A] to-[#2563EB] text-white'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Play size={18} />
              <span>Vidéos</span>
            </button>
          </div>

          {/* Year filter */}
          <div className="flex items-center space-x-2">
            <Calendar size={18} className="text-muted-foreground" />
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="bg-white border border-border rounded-lg px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-[#16A34A]"
            >
              <option value="all">Toutes les éditions</option>
              {years.slice(1).map(year => (
                <option key={year} value={year}>CIT {year}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Content */}
        {selectedTab === 'photos' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredPhotos.map((photo) => (
              <div
                key={photo.id}
                onClick={() => setLightboxImage(photo.url)}
                className="group relative aspect-square overflow-hidden rounded-xl cursor-pointer shadow-lg hover:shadow-2xl transition-all"
              >
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="text-xs text-[#16A34A] font-semibold mb-1">
                      {photo.category}
                    </div>
                    <h4 className="text-white font-semibold">{photo.title}</h4>
                    <p className="text-white/70 text-sm">CIT {photo.year}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredVideos.map((video) => (
              <div
                key={video.id}
                className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-border"
              >
                <div className="relative aspect-video overflow-hidden bg-slate-100">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play size={28} className="text-[#16A34A] ml-1" fill="currentColor" />
                    </div>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/80 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-foreground mb-2 group-hover:text-[#16A34A] transition-colors">
                    {video.title}
                  </h4>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{video.views} vues</span>
                    <span>CIT {video.year}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {selectedTab === 'photos' && filteredPhotos.length === 0 && (
          <div className="text-center py-12">
            <ImageIcon size={48} className="mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Aucune photo disponible pour cette édition</p>
          </div>
        )}

        {selectedTab === 'videos' && filteredVideos.length === 0 && (
          <div className="text-center py-12">
            <Play size={48} className="mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Aucune vidéo disponible pour cette édition</p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-[#16A34A] transition-colors"
            onClick={() => setLightboxImage(null)}
          >
            <X size={32} />
          </button>
          <img
            src={lightboxImage}
            alt="Image agrandie"
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
