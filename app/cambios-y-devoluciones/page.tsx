import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";
import { site } from "@/config/site";

export const metadata: Metadata = { title: "Cambios y devoluciones" };

export default function Cambios() {
  return (
    <LegalPage title="Cambios y devoluciones">
      <h2>Producto con defecto o dañado</h2>
      <p>
        Si tu vela llegó rota o con un defecto de fabricación, escribinos
        dentro de las 48 horas de recibirla, con fotos del producto y del
        embalaje, indicando tu número de pedido. La reemplazamos o te
        devolvemos el dinero, sin costo para vos.
      </p>

      <h2>Cambios</h2>
      <p>
        Aceptamos cambios por otro producto dentro de los 10 días de recibido
        el pedido, siempre que la vela esté sin uso y en su embalaje original.
        El costo de envío del cambio corre por cuenta del cliente, salvo error
        nuestro.
      </p>

      <h2>Derecho de arrepentimiento</h2>
      <p>
        Podés revocar la compra dentro de los 10 días corridos desde que
        recibiste el producto, sin necesidad de justificarlo, usando el{" "}
        <a className="underline" href="/arrepentimiento">botón de arrepentimiento</a>.
        Te devolvemos el importe abonado por el mismo medio de pago.
      </p>

      <h2>Cómo contactarnos</h2>
      <p>
        {site.email && <>Email: {site.email}. </>}
        Horario de atención: {site.hours}.
      </p>
    </LegalPage>
  );
}
