import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";
import { site } from "@/config/site";

export const metadata: Metadata = { title: "Términos y condiciones" };

export default function Terminos() {
  return (
    <LegalPage title="Términos y condiciones">
      <p>
        Al comprar en {site.name} aceptás estas condiciones. Te pedimos que las
        leas antes de realizar tu pedido.
      </p>

      <h2>1. Productos y precios</h2>
      <p>
        Todos los precios están expresados en pesos argentinos (ARS) e incluyen
        impuestos. Las velas son artesanales, por lo que pueden existir leves
        diferencias de color, forma o aroma respecto de las fotos. Los precios
        y el stock pueden cambiar sin previo aviso; el precio vigente es el que
        figura al confirmar el pedido.
      </p>

      <h2>2. Pedidos</h2>
      <p>
        Al confirmar la compra recibís un email con el detalle. El pedido queda
        pendiente hasta que se acredite el pago. Si pasado un tiempo razonable
        no se recibe el pago, el pedido puede cancelarse y el stock liberarse.
      </p>

      <h2>3. Medios de pago</h2>
      <ul>
        <li>Mercado Pago (tarjetas, dinero en cuenta y otros medios habilitados).</li>
        <li>Transferencia bancaria: el pedido se confirma al recibir el comprobante.</li>
        <li>Efectivo: al retirar o al recibir el pedido, según se acuerde.</li>
      </ul>

      <h2>4. Envíos y retiro</h2>
      <p>
        Realizamos envíos a domicilio y también podés retirar por nuestro local
        ({site.hours}). Los envíos son gratis a partir de $
        {site.freeShippingFrom.toLocaleString("es-AR")}; por debajo de ese
        monto se cobra un costo de envío que se informa antes de pagar. Los
        plazos de entrega dependen del correo y de tu zona.
      </p>

      <h2>5. Cambios, devoluciones y arrepentimiento</h2>
      <p>
        Consultá la política de{" "}
        <a className="underline" href="/cambios-y-devoluciones">cambios y devoluciones</a>{" "}
        y el{" "}
        <a className="underline" href="/arrepentimiento">botón de arrepentimiento</a>.
        Podés revocar tu compra dentro de los 10 días corridos de recibido el
        producto, conforme a la Ley 24.240 de Defensa del Consumidor.
      </p>

      <h2>6. Uso seguro de las velas</h2>
      <p>
        Nunca dejes una vela encendida sin supervisión, mantenela lejos de
        niños, mascotas y materiales inflamables, y apoyala sobre una
        superficie resistente al calor.
      </p>

      <h2>7. Defensa del consumidor</h2>
      <p>
        Ante cualquier reclamo podés contactarnos por los medios indicados en
        esta página. También podés acudir a la Dirección de Defensa del
        Consumidor de tu jurisdicción.
      </p>
    </LegalPage>
  );
}
