import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";
import WithdrawalForm from "./WithdrawalForm";

export const metadata: Metadata = { title: "Botón de arrepentimiento" };

export default function Arrepentimiento() {
  return (
    <LegalPage title="Botón de arrepentimiento">
      <p>
        Si te arrepentiste de tu compra, podés revocarla dentro de los 10 días
        corridos de recibido el producto (Ley 24.240, art. 34). Completá el
        formulario y te contactamos para coordinar la devolución y el
        reembolso.
      </p>
      <WithdrawalForm />
    </LegalPage>
  );
}
