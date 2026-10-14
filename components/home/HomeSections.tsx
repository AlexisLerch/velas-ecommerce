import Link from "next/link";
import { getFeaturedProducts } from "@/lib/products";
import ProductCard from "@/components/product/ProductCard";
import { site, whatsappLink } from "@/config/site";

const benefits = [
  {
    title: "Hechas a mano",
    text: "Cada vela se vierte y se termina una por una, en pequeñas tandas.",
  },
  {
    title: "Cera de soja",
    text: "Combustión limpia y pareja, con mechas de algodón o madera.",
  },
  {
    title: "Personalizadas",
    text: "Elegí aroma, color y etiqueta para regalos, eventos y souvenirs.",
  },
  {
    title: "Envíos a todo el país",
    text: `Gratis en compras desde $${site.freeShippingFrom.toLocaleString("es-AR")}.`,
  },
];

export default async function HomeSections() {
  const featured = await getFeaturedProducts();

  return (
    <div className="max-w-6xl mx-auto px-6 pb-10">
      {/* DESTACADAS */}
      <section className="pt-24 md:pt-32">
        <h2 className="text-center text-3xl md:text-5xl font-light tracking-wide text-heading mb-4">
          Las más elegidas
        </h2>
        <p className="text-center text-muted mb-12 md:mb-16">
          Una muestra de lo que hacemos en La Comarca de Cera.
        </p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((p) => (
            <ProductCard
              key={p.id}
              id={p.id}
              name={p.name}
              price={p.price}
              description={p.description ?? ""}
              image={p.image}
              badge={p.badge}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/products"
            className="inline-block bg-navbar text-white px-10 py-4 rounded-lg tracking-wide shadow-lg hover:shadow-xl transition"
          >
            Ver todas las velas
          </Link>
        </div>
      </section>

      {/* BENEFICIOS */}
      <section className="pt-24 md:pt-32">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b) => (
            <div
              key={b.title}
              className="bg-card border border-cardBorder rounded-xl p-6 text-center shadow-sm"
            >
              <h3 className="text-sm font-semibold tracking-widest uppercase text-heading mb-3">
                {b.title}
              </h3>
              <p className="text-sm text-muted leading-relaxed">{b.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PERSONALIZADAS */}
      <section className="pt-24 md:pt-32">
        <div className="bg-card border border-cardBorder rounded-2xl p-8 md:p-14 text-center shadow-md">
          <h2 className="text-2xl md:text-4xl font-semibold text-accent2 mb-4">
            ¿Buscás algo especial?
          </h2>
          <p className="text-muted italic max-w-xl mx-auto mb-8 leading-relaxed">
            Hacemos velas personalizadas para cumpleaños, casamientos y
            souvenirs. Contanos tu idea y la hacemos realidad.
          </p>
          <a
            href={whatsappLink("Hola! Quiero consultar por velas personalizadas")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-navbar text-white px-10 py-4 rounded-lg tracking-wide shadow-lg hover:shadow-xl transition"
          >
            Escribinos por WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
}
