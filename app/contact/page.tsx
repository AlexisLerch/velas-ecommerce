import ContactForm from "@/components/contact/ContactForm";
import { FaInstagram, FaWhatsapp, FaRegClock, FaEnvelope } from "react-icons/fa";
import { instagramLink, site, whatsappLink } from "@/config/site";

export const metadata = {
  title: "Contacto",
  description: "Escribinos por pedidos, consultas y velas personalizadas.",
};

export default function ContactPage() {
  const channels = [
    {
      icon: FaWhatsapp,
      label: "WhatsApp",
      value: "Escribinos",
      href: whatsappLink("Hola! Quiero hacer una consulta"),
    },
    {
      icon: FaInstagram,
      label: "Instagram",
      value: site.instagram ? `@${site.instagram.replace("@", "")}` : "Seguinos",
      href: instagramLink,
    },
    ...(site.email
      ? [{ icon: FaEnvelope, label: "Email", value: site.email, href: `mailto:${site.email}` }]
      : []),
  ];

  return (
    <main className="min-h-screen py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-center text-4xl md:text-6xl font-light tracking-wide text-heading mb-6">
          Contacto
        </h1>
        <p className="text-center text-muted mb-16 md:mb-24">
          Pedidos, consultas y velas personalizadas: contanos qué necesitás.
        </p>

        <div className="grid md:grid-cols-2 gap-10 md:gap-16">
          <div className="space-y-4">
            {channels.map(({ icon: Icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-card border border-cardBorder rounded-xl p-5 shadow-sm hover:shadow-md transition"
              >
                <Icon className="text-2xl text-brand shrink-0" />
                <div>
                  <p className="text-xs font-semibold tracking-widest uppercase text-heading">
                    {label}
                  </p>
                  <p className="text-sm text-muted">{value}</p>
                </div>
              </a>
            ))}

            <div className="flex items-center gap-4 bg-card border border-cardBorder rounded-xl p-5 shadow-sm">
              <FaRegClock className="text-2xl text-brand shrink-0" />
              <div>
                <p className="text-xs font-semibold tracking-widest uppercase text-heading">
                  Horario de atención
                </p>
                <p className="text-sm text-muted">{site.hours}</p>
              </div>
            </div>

            <div className="bg-card border border-cardBorder rounded-xl p-5 shadow-sm text-sm text-muted leading-relaxed">
              Envíos a todo el país. Gratis en compras desde $
              {site.freeShippingFrom.toLocaleString("es-AR")}.
            </div>
          </div>

          <ContactForm />
        </div>
      </div>
    </main>
  );
}
