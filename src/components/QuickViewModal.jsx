import React from 'react';
import { X } from 'lucide-react';

function QuickViewModal({
  theme, isOpen, product, formatPrice, discount,
  onClose, onAddToCart, currentImage
}) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 ${theme.modalOverlay} transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] motion-reduce:transition-none ${
        isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`${theme.surface} w-full max-w-md sm:max-w-lg md:max-w-2xl max-h-[85vh] sm:max-h-[90vh] overflow-y-auto p-5 sm:p-6 shadow-2xl relative flex flex-col md:flex-row gap-5 sm:gap-6 transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none ${
          isOpen ? 'opacity-100 scale-100 translate-y-0 rounded-[2rem] sm:rounded-[2.5rem]' : 'opacity-0 scale-90 translate-y-4 rounded-[3rem]'
        }`}
      >
        <button onClick={onClose} aria-label="Close quick view" className={`absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center font-bold active:scale-90 transition-transform duration-200 z-10 ${theme.closeBtnCls}`}>
          <X size={14} />
        </button>

        <div className={`w-full md:w-1/2 h-48 sm:h-56 md:h-auto ${theme.isDark ? 'bg-slate-800' : 'bg-slate-100'} rounded-2xl sm:rounded-3xl overflow-hidden shadow-inner shrink-0 flex items-center justify-center`}>
          {currentImage ? (
            <img src={currentImage} alt={product.title} className="w-full h-full object-cover" />
          ) : (
            <span className={`text-6xl font-black ${theme.isDark ? 'text-white/10' : 'text-black/10'}`}>{product.title.charAt(0)}</span>
          )}
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-3">
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${product.inStock ? 'text-lime-600 bg-lime-100' : 'text-red-500 bg-red-100'}`}>
                {product.inStock ? 'In stock' : 'Out of stock'}
              </span>
              {discount !== null && (
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${theme.primaryBtn}`}>
                  -{discount}%
                </span>
              )}
            </div>
            <h2 className={`text-xl sm:text-2xl font-bold mb-1 ${theme.textPrimary}`}>{product.title}</h2>
            <p className={`text-sm mb-1 ${theme.textMuted}`}>Sold by {product.sellerUsername || "an unknown seller"}</p>
            <p className={`text-sm mb-4 leading-relaxed ${theme.textSecondary}`}>{product.description}</p>

            <div className="flex items-baseline gap-3 mb-6">
              <span className={`text-xl sm:text-2xl font-black ${theme.textPrimary}`}>${formatPrice(product.price)}</span>
            </div>
          </div>

          <button
            onClick={onAddToCart}
            disabled={!product.inStock}
            className={`w-full rounded-2xl flex items-center justify-center gap-2 font-medium py-3.5 active:scale-95 transition-transform duration-200 shadow-lg ${
              product.inStock ? theme.primaryBtn : `${theme.isDark ? 'bg-slate-800 text-slate-500' : 'bg-slate-100 text-slate-400'} cursor-not-allowed`
            }`}
          >
            {product.inStock ? '+ Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default React.memo(QuickViewModal);