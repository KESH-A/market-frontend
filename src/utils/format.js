export const formatPrice = (value) => value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export const getDiscount = (product) => Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);