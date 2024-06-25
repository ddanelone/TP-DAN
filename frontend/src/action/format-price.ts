export const formatPrice = (price: number) => {
  const fixedPrice = parseFloat(price.toFixed(2));
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "ARS",
  }).format(fixedPrice);
};
