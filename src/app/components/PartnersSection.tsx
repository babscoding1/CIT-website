import partner1 from '../../assets/partners/partner1.png';
import partner2 from '../../assets/partners/partner2.png';
import {images} from '../../assets/images';
// ...
// 👉 continue jusqu’à partner19

export default function PartnersSection() {
  const partners = [
    { name: 'Partner 1', logo: images.partenaire1 },
    { name: 'Partner 2', logo: images.partenaire2 },
    { name: 'Partner 3', logo: images.partenaire3 },
    { name: 'Partner 4', logo: images.partenaire4 },
    { name: 'Partner 5', logo: images.partenaire5 },
    { name: 'Partner 6', logo: images.partenaire6 },
    { name: 'Partner 7', logo: images.partenaire7 },
    { name: 'Partner 8', logo: images.partenaire8 },
    { name: 'Partner 9', logo: images.partenaire9 },
    { name: 'Partner 10', logo: images.partenaire10 },
    { name: 'Partner 11', logo: images.partenaire11 },
    { name: 'Partner 12', logo: images.partenaire12 },
    { name: 'Partner 13', logo: images.partenaire13 },
    { name: 'Partner 14', logo: images.partenaire14 },
    { name: 'Partner 15', logo: images.partenaire15 },
    { name: 'Partner 16', logo: images.partenaire16 },
    { name: 'Partner 17', logo: images.partenaire17 },
    { name: 'Partner 18', logo: images.partenaire18 },
    { name: 'Partner 19', logo: images.partenaire19 },
    { name: 'Partner 20', logo: images.partenaire20 },
    { name: 'Partner 21', logo: images.partenaire21 },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Nos partenaires
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ils accompagnent et soutiennent l’innovation en Casamance
          </p>
        </div>

        {/* LOGOS GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="flex items-center justify-center transition duration-300"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="max-h-16 object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}