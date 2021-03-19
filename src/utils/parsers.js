export const parseToReal = (price) =>
  price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
