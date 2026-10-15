import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";
import { site } from "@/config/site";

export const metadata: Metadata = { title: "Política de privacidad" };

export default function Privacidad() {
  return (
    <LegalPage title="Política de privacidad">
      <p>
        En {site.name} cuidamos tus datos personales conforme a la Ley 25.326
        de Protección de Datos Personales.
      </p>

      <h2>Qué datos recolectamos</h2>
      <p>
        Nombre, email, teléfono y, si elegís envío, dirección. Los usamos
        únicamente para procesar y entregar tu pedido, avisarte sobre su estado
        y atender tus consultas.
      </p>

      <h2>Con quién los compartimos</h2>
      <ul>
        <li>Mercado Pago, para procesar el pago (no almacenamos datos de tu tarjeta).</li>
        <li>El servicio de email que envía las confirmaciones.</li>
        <li>El correo o transportista, solo los datos necesarios para la entrega.</li>
      </ul>
      <p>No vendemos ni cedemos tus datos a terceros con fines comerciales.</p>

      <h2>Tus derechos</h2>
      <p>
        Podés acceder, rectificar o suprimir tus datos escribiéndonos
        {site.email ? ` a ${site.email}` : ""}. La Agencia de Acceso a la
        Información Pública, en su carácter de órgano de control de la Ley
        25.326, tiene la atribución de atender denuncias y reclamos por
        incumplimiento de las normas de protección de datos personales.
      </p>

      <h2>Cookies y almacenamiento local</h2>
      <p>
        Usamos el almacenamiento de tu navegador para recordar tu carrito, tus
        favoritos y el tema claro/oscuro.
      </p>
    </LegalPage>
  );
}
