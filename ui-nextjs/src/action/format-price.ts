export const formatPrice = (price: number) => {
  if (price === undefined || price === null) return "0.00 ARS";

  const fixedPrice = parseFloat(price.toFixed(2));
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "ARS",
  }).format(fixedPrice);
};
