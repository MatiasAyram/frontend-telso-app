export const currencyFormatter = (value: number) => {
  return value.toLocaleString("es-ES", {
    style: "currency",
    currency: "Eur",
    minimumFractionDigits: 2,
  });
};
