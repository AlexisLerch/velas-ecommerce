export const STATUS_LABEL: Record<string, string> = {
  PENDING_PAYMENT: "Pago pendiente",
  PAID: "Pagado",
  SHIPPED: "Enviado / listo",
  DELIVERED: "Entregado",
  CANCELLED: "Cancelado",
};

export const PAYMENT_LABEL: Record<string, string> = {
  MERCADOPAGO: "Mercado Pago",
  TRANSFER: "Transferencia",
  CASH: "Efectivo",
};

export const money = (n: number) => `$${n.toLocaleString("es-AR")}`;
