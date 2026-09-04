import React from 'react';
import { Heart, Upload, ChevronLeft, ChevronRight, ChevronDown, Maximize } from 'lucide-react';

export default function ProductCard({
  product, theme, size, liked, isSizeMenuOpen, currentImage, discount, formatPrice,
  onToggleLike, onSelectSize, onToggleSizeMenu, onQuickView, onAddToCart,
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

        <img src={currentImage} alt={product.name} className="w-full h-full object-cover rounded-[2rem] group-hover:scale-105 transition-all duration-700 ease-out" />
      </div>

      <div className="px-1 sm:px-2">
        <div className={`inline-block px-3 py-1 text-xs font-bold rounded-full mb-3 shadow-sm ${theme.primaryBtn}`}>
          -{discount}%
        </div>

        <div className="flex justify-between items-start gap-3 mb-1">
          <h3 className={`text-base sm:text-lg font-bold truncate ${theme.textPrimary}`}>{product.name}</h3>
          <div className="text-right shrink-0">
            <p className={`text-xs line-through ${theme.textMuted}`}>${formatPrice(product.originalPrice)}</p>
            <p className={`text-base sm:text-lg font-bold ${theme.textPrimary}`}>${formatPrice(product.price)}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-6">
          <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-[10px] text-white font-bold shrink-0">
            {product.brand.charAt(0)}
          </div>
          <span className={`text-sm font-medium truncate ${theme.textSecondary}`}>{product.brand}</span>
        </div>

        <div className="flex gap-1.5 sm:gap-2 relative">
          <div className="flex-1 min-w-0 relative">
            <button
              onClick={(e) => { e.stopPropagation(); onToggleSizeMenu(); }}
              aria-label="Select size"
              className={`w-full border ${theme.dropdownBorder} rounded-2xl py-3 px-3 flex justify-between items-center gap-1 text-xs font-medium active:scale-[0.98] transition-all duration-300 shadow-sm ${theme.isDark ? 'bg-slate-800/60 hover:bg-slate-800' : 'bg-white/50 hover:bg-white'}`}
            >
              <span className={`truncate ${theme.textSecondary}`}>
                Size: <strong className={theme.textPrimary}>{size}</strong>
              </span>
              <ChevronDown size={16} className={`shrink-0 transition-transform duration-300 ${isSizeMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            <div
              onClick={(e) => e.stopPropagation()}
              className={`absolute bottom-full mb-2 left-1/2 -translate-x-1/2 min-w-full w-max max-w-[240px] ${theme.isDark ? 'bg-slate-800/95 border-white/10' : 'bg-white/90 border-white/80'} backdrop-blur-xl border rounded-2xl p-1.5 shadow-2xl z-30 flex flex-wrap justify-center gap-1.5 origin-bottom transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                isSizeMenuOpen ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto' : 'opacity-0 scale-75 translate-y-4 pointer-events-none'
              }`}
            >
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => onSelectSize(s)}
                  className={`px-3 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-all duration-200 ${
                    size === s ? theme.chipActive : `${theme.textSecondary} hover:bg-lime-100 hover:text-slate-900`
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={onQuickView}
            aria-label="Quick view"
            className={`w-11 shrink-0 border ${theme.dropdownBorder} rounded-2xl flex items-center justify-center active:scale-90 transition-all duration-300 shadow-sm ${theme.isDark ? 'bg-slate-800/60 hover:bg-slate-800 text-slate-300' : 'bg-white/50 hover:bg-white text-slate-600'}`}
          >
            <Maximize size={18} />
          </button>

          <button
            onClick={onAddToCart}
            className={`flex-[1.2] min-w-0 rounded-2xl flex items-center justify-center gap-1 text-xs font-medium active:scale-95 transition-all duration-300 shadow-lg px-2 ${theme.primaryBtn}`}
          >
            + Add
          </button>
        </div>
      </div>
    </div>
  );
}