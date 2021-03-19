export const parseToReal = (price) =>
  Number(price).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
