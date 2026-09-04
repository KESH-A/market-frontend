import React from 'react';
import { Search, X } from 'lucide-react';
import ProductCard from './ProductCard';

export default function ProductGrid({
  theme, filteredProducts, selectedCategory, searchQuery,
  onClearCategory, onClearSearch, onResetFilters,
  getProductSize, likedProducts, openSizeMenuId, getCurrentImage,
  onToggleLike, onSelectSize, onToggleSizeMenu, onQuickView, onAddToCart,
  onPrevImage, onNextImage, formatPrice, getDiscount
}) {
  return (
    <main className="pt-24 md:pt-48 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      {(selectedCategory !== "All" || searchQuery !== "") && (
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6 w-full">
          <span className={`text-xs font-semibold ${theme.textMuted}`}>Filters:</span>
          {selectedCategory !== "All" && (
            <span className="inline-flex items-center gap-1.5 text-xs bg-lime-200 text-lime-900 px-3 py-1 rounded-full font-medium shadow-sm">
              {selectedCategory}
              <X size={12} className="cursor-pointer hover:opacity-75 active:scale-90 transition-transform duration-150" onClick={onClearCategory} />
            </span>
          )}
          {searchQuery && (
            <span className={`inline-flex items-center gap-1.5 text-xs py-1 px-3 rounded-full font-medium shadow-sm ${theme.isDark ? 'bg-slate-800 text-slate-200' : 'bg-slate-200 text-slate-800'}`}>
              {searchQuery}
              <X size={12} className="cursor-pointer hover:opacity-75 active:scale-90 transition-transform duration-150" onClick={onClearSearch} />
            </span>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 justify-items-center">
        {filteredProducts.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center text-center py-20 gap-3">
            <Search size={44} strokeWidth={1} className={theme.textMuted} />
            <p className={`font-semibold ${theme.textSecondary}`}>No products found</p>
            <p className={`text-sm max-w-xs ${theme.textMuted}`}>Try a different search term or category to find what you are looking for.</p>
            <button onClick={onResetFilters} className={`mt-2 px-5 py-2.5 rounded-xl text-sm font-medium active:scale-95 transition-transform duration-200 ${theme.primaryBtn}`}>
              Reset Filters
            </button>
          </div>
        ) : (
          filteredProducts.map((product) => {
            const size = getProductSize(product);
            const liked = !!likedProducts[product.id];
            return (
              <ProductCard
                key={product.id}
                product={product}
                theme={theme}
                size={size}
                liked={liked}
                isSizeMenuOpen={openSizeMenuId === product.id}
                currentImage={getCurrentImage(product)}
                discount={getDiscount(product)}
                formatPrice={formatPrice}
                onToggleLike={() => onToggleLike(product.id)}
                onSelectSize={(s) => onSelectSize(product.id, s)}
                onToggleSizeMenu={() => onToggleSizeMenu(product.id)}
                onQuickView={() => onQuickView(product)}
                onAddToCart={() => onAddToCart(product, size)}
                onPrevImage={(e) => onPrevImage(product.id, product.images.length, e)}
                onNextImage={(e) => onNextImage(product.id, product.images.length, e)}
              />
            );
          })
        )}
      </div>
    </main>
  );
}