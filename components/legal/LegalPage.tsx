import { site } from "@/config/site";

// Contenedor común de las páginas legales.
export default function LegalPage({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <article className="max-w-3xl mx-auto px-6 py-14 space-y-4 leading-relaxed [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mt-8 [&_ul]:list-disc [&_ul]:pl-6">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="text-sm text-muted">
        {site.legal.razonSocial || site.name}
        {site.legal.cuit && ` · CUIT ${site.legal.cuit}`}
        {site.legal.address && ` · ${site.legal.address}`}
        {site.email && ` · ${site.email}`}
      </p>
      {children}
    </article>
  );
}
