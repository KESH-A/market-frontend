import React from 'react';
import { Heart, X, Trash2 } from 'lucide-react';

function WishlistPanel({
  variant, theme, wishlistProducts, formatPrice, getCurrentImage,
  onMoveToCart, onRemove, isOpen, onClose
}) {
  const wrapperClass = variant === "mobile"
    ? `md:hidden fixed inset-x-0 top-24 z-50 flex justify-center px-4 pointer-events-none transition-all duration-500 ease-out ${isOpen ? 'visible' : 'invisible'}`
    : `hidden md:flex fixed inset-y-0 right-0 z-50 justify-end pointer-events-none transition-all duration-500 ease-out ${isOpen ? "visible" : "invisible"}`;

  const containerClass = variant === "mobile"
    ? `pointer-events-auto w-full max-w-[380px] max-h-[70vh] ${theme.surface} shadow-2xl overflow-hidden flex flex-col transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] motion-reduce:transition-none ${isOpen ? 'scale-100 opacity-100 translate-y-0 rounded-[2rem] p-5' : 'scale-[0.05] opacity-0 translate-y-4 rounded-[100px] p-0'}`
    : `pointer-events-auto w-[400px] max-w-[92vw] h-full ${theme.surface} shadow-2xl flex flex-col p-6 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] motion-reduce:transition-none origin-right ${isOpen ? "translate-x-0 opacity-100 rounded-l-[2.5rem]" : "translate-x-full opacity-0 rounded-l-[100px]"}`;

  return (
    <div className={wrapperClass}>
      <div className={containerClass}>
        <div className={`flex items-center justify-between ${variant === "mobile" ? "mb-4 px-1 shrink-0" : `pb-4 border-b ${theme.softBorder}`}`}>
          <div className="flex items-center gap-2">
            <Heart size={20} className="text-red-500 fill-red-500" />
            <h2 className={`font-bold ${variant === "mobile" ? "text-lg" : "text-xl"} ${theme.textPrimary}`}>Wishlist</h2>
            <span className="text-xs font-bold bg-red-100 text-red-600 px-2 py-1 rounded-full">{wishlistProducts.length}</span>
          </div>
          <button onClick={onClose} aria-label="Close wishlist" className={`w-8 h-8 rounded-full flex items-center justify-center active:scale-90 transition-colors duration-200 ${theme.closeBtnCls}`}>
            <X size={16} />
          </button>
        </div>

        <div className={`flex-1 overflow-y-auto ${variant === "mobile" ? "space-y-3 pr-1" : "py-4 space-y-4"}`}>
          {wishlistProducts.length === 0 ? (
            <div className={`h-full flex flex-col items-center justify-center text-center gap-2 ${variant === "mobile" ? "py-10" : ""} ${theme.textMuted}`}>
              <Heart size={variant === "mobile" ? 40 : 48} strokeWidth={1} />
              <p className={`font-medium ${variant === "mobile" ? "text-sm" : ""} ${theme.textSecondary}`}>Your wishlist is empty</p>
            </div>
          ) : (
            wishlistProducts.map((product) => (
              <div key={product.id} className={`flex ${variant === "mobile" ? "gap-3" : "gap-4"} p-3 ${theme.surface} rounded-2xl items-center shadow-sm`}>
                {getCurrentImage(product) ? (
                  <img src={getCurrentImage(product)} alt={product.title} className={`${variant === "mobile" ? "w-16 h-16" : "w-20 h-20"} object-cover rounded-xl bg-slate-200 shrink-0`} />
                ) : (
                  <div className={`${variant === "mobile" ? "w-16 h-16" : "w-20 h-20"} rounded-xl bg-slate-200 shrink-0 flex items-center justify-center font-black text-slate-400`}>
                    {product.title.charAt(0)}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h4 className={`font-bold text-sm truncate ${theme.textPrimary}`}>{product.title}</h4>
                  <p className={`text-xs mb-2 font-medium ${theme.textSecondary}`}>${formatPrice(product.price)}</p>
                  <button
                    onClick={() => onMoveToCart(product)}
                    disabled={!product.inStock}
                    className={`text-xs font-semibold px-3 py-1.5 rounded-xl active:scale-95 transition-transform duration-200 ${product.inStock ? theme.primaryBtn : `${theme.isDark ? 'bg-slate-800 text-slate-500' : 'bg-slate-100 text-slate-400'} cursor-not-allowed`}`}
                  >
                    {product.inStock ? 'Move to Cart' : 'Out of Stock'}
                  </button>
                </div>
                <button onClick={() => onRemove(product.id)} aria-label="Remove from wishlist" className="text-slate-400 hover:text-red-500 p-2 active:scale-90 transition-colors duration-200">
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default React.memo(WishlistPanel);