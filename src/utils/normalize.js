export const normalizeProduct = (p) => {
  const price = parseFloat(p.price) || 0;
  const images = Array.isArray(p.images) ? p.images.map((img) => img.image).filter(Boolean) : [];

  return {
    id: p.id,
    title: p.title || "Untitled product",
    description: p.description || "",
    price,
    stock: p.stock ?? 0,
    inStock: (p.stock ?? 0) > 0 && p.is_active !== false,
    categoryId: p.category ?? null,
    categoryName: p.category_name || "Uncategorized",
    sellerUsername: p.seller_username || "",
    images,
    createdAt: p.created_at || null
  };
};

export const normalizeCategory = (c) => ({
  id: c.id,
  name: c.name,
  slug: c.slug,
  icon: c.icon || null
});

export const normalizeLocalProduct = (p) => ({
  id: `local-${p.id}`,
  title: p.name,
  description: p.description || "",
  price: p.price,
  stock: p.inStock ? 99 : 0,
  inStock: Boolean(p.inStock),
  categoryId: p.category,
  categoryName: p.category,
  sellerUsername: p.brand || "",
  images: p.images || [],
  createdAt: null
});

export const buildLocalCategories = (localProducts) => {
  const names = [...new Set(localProducts.map((p) => p.category))];
  return names.map((name) => ({ id: name, name, slug: name.toLowerCase(), icon: null }));
};