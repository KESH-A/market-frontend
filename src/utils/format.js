export const formatPrice = (value) => {
  const num = typeof value === "string" ? parseFloat(value) : value;
  if (Number.isNaN(num) || num === null || num === undefined) return "0.00";
  return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

export const getDiscount = (product) => {
  if (!product.originalPrice || product.originalPrice <= product.price) return null;
  return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
};