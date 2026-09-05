import React from 'react';
import { Heart, Upload, ChevronLeft, ChevronRight, Maximize } from 'lucide-react';

function ProductCard({
  product, theme, liked, currentImage, discount, formatPrice,
  onToggleLike, onQuickView, onAddToCart,
  onPrevImage, onNextImage
}) {
  return (
    <div className={`group w-full max-w-[380px] ${theme.surface} ${theme.surfaceHover} rounded-[2.5rem] p-3 sm:p-4 shadow-[0_20px_40px_rgb(0,0,0,0.03)] transition-all duration-500`}>
      <div className={`relative w-full h-60 sm:h-72 md:h-64 lg:h-72 ${theme.isDark ? 'bg-slate-800/50' : 'bg-slate-100/50'} rounded-[2rem] overflow-hidden mb-5 flex items-center justify-center`}>
        <div className="absolute top-4 w-full px-4 flex justify-end gap-2 z-10">
          <button
            onClick={onToggleLike}
            aria-label="Like product"
            className={`w-10 h-10 bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] shadow-sm active:scale-90 ${
              liked ? 'text-red-500 bg-white scale-110' : 'text-slate-600 hover:bg-white hover:text-red-500'
            }`}
          >
            <Heart size={18} className={`transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${liked ? 'fill-red-500 scale-110' : ''}`} />
          </button>
          <button aria-label="Share product" className="w-10 h-10 bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center text-slate-600 hover:bg-white hover:text-black active:scale-90 transition-all duration-300 shadow-sm">
            <Upload size={18} />
          </button>
        </div>

        {product.images.length > 1 && (
          <>
            <button onClick={onPrevImage} aria-label="Previous image" className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white/60 backdrop-blur-md rounded-full flex items-center justify-center shadow-md text-slate-600 hover:text-black hover:bg-white active:scale-90 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <ChevronLeft size={16} />
            </button>
            <button onClick={onNextImage} aria-label="Next image" className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white/60 backdrop-blur-md rounded-full flex items-center justify-center shadow-md text-slate-600 hover:text-black hover:bg-white active:scale-90 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <ChevronRight size={16} />
            </button>
          </>
        )}

        {currentImage ? (
          <img src={currentImage} alt={product.title} className="w-full h-full object-cover rounded-[2rem] group-hover:scale-105 transition-all duration-700 ease-out" />
        ) : (
          <div className={`w-full h-full flex items-center justify-center text-5xl font-black ${theme.isDark ? 'text-white/10' : 'text-black/10'}`}>
            {product.title.charAt(0)}
          </div>
        )}
      </div>

      <div className="px-1 sm:px-2">
        {discount !== null && (
          <div className={`inline-block px-3 py-1 text-xs font-bold rounded-full mb-3 shadow-sm ${theme.primaryBtn}`}>
            -{discount}%
          </div>
        )}

        <div className="flex justify-between items-start gap-3 mb-1">
          <h3 className={`text-base sm:text-lg font-bold truncate ${theme.textPrimary}`}>{product.title}</h3>
          <div className="text-right shrink-0">
            <p className={`text-base sm:text-lg font-bold ${theme.textPrimary}`}>${formatPrice(product.price)}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-6">
          <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-[10px] text-white font-bold shrink-0">
            {product.sellerUsername ? product.sellerUsername.charAt(0).toUpperCase() : "?"}
          </div>
          <span className={`text-sm font-medium truncate ${theme.textSecondary}`}>{product.sellerUsername || "Unknown seller"}</span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={onQuickView}
            aria-label="Quick view"
            className={`w-12 shrink-0 border ${theme.dropdownBorder} rounded-2xl flex items-center justify-center active:scale-90 transition-all duration-300 shadow-sm ${theme.isDark ? 'bg-slate-800/60 hover:bg-slate-800 text-slate-300' : 'bg-white/50 hover:bg-white text-slate-600'}`}
          >
            <Maximize size={18} />
          </button>

          {product.inStock ? (
            <button
              onClick={onAddToCart}
              className={`flex-1 min-w-0 rounded-2xl flex items-center justify-center gap-1 text-sm font-medium active:scale-95 transition-all duration-300 shadow-lg px-2 ${theme.primaryBtn}`}
            >
              + Add to Cart
            </button>
          ) : (
            <div className={`flex-1 min-w-0 rounded-2xl flex items-center justify-center text-sm font-semibold px-2 ${theme.isDark ? 'bg-slate-800/60 text-slate-500' : 'bg-slate-100 text-slate-400'}`}>
              Out of Stock
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default React.memo(ProductCard);