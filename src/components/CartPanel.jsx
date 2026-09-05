import React from 'react';
import { ShoppingBag, X, Minus, Plus, Trash2 } from 'lucide-react';

function CartPanel({
  variant, theme, cartItems, totalCartCount, cartSubtotal,
  formatPrice, getCurrentImage, onUpdateQuantity, onRemove, onCheckout,
  isOpen, onClose
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
            <ShoppingBag size={20} className={theme.textPrimary} />
            <h2 className={`font-bold ${variant === "mobile" ? "text-lg" : "text-xl"} ${theme.textPrimary}`}>Your Cart</h2>
            <span className={`text-xs font-bold px-2 py-1 rounded-full ${theme.isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-600'}`}>{totalCartCount}</span>
          </div>
          <button onClick={onClose} aria-label="Close cart" className={`w-8 h-8 rounded-full flex items-center justify-center active:scale-90 transition-colors duration-200 ${theme.closeBtnCls}`}>
            <X size={16} />
          </button>
        </div>

        <div className={`flex-1 overflow-y-auto ${variant === "mobile" ? "space-y-3 pr-1" : "py-4 space-y-4"}`}>
          {cartItems.length === 0 ? (
            <div className={`h-full flex flex-col items-center justify-center text-center gap-2 ${theme.textMuted}`}>
              <ShoppingBag size={variant === "mobile" ? 40 : 48} strokeWidth={1} />
              <p className={`font-medium ${variant === "mobile" ? "text-sm" : ""} ${theme.textSecondary}`}>Your cart is empty</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className={`flex gap-3 p-3 ${theme.surface} rounded-2xl items-center shadow-sm ${
                  variant === "mobile" ? `transition-all duration-500 ease-out ${isOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-90'}` : ''
                }`}
              >
                {item.images?.[0] ? (
                  <img src={item.images[0]} alt={item.title} className={`${variant === "mobile" ? "w-16 h-16" : "w-20 h-20"} object-cover rounded-xl bg-slate-200 shrink-0`} />
                ) : (
                  <div className={`${variant === "mobile" ? "w-16 h-16" : "w-20 h-20"} rounded-xl bg-slate-200 shrink-0 flex items-center justify-center font-black text-slate-400`}>
                    {item.title.charAt(0)}
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <h4 className={`font-bold text-sm truncate ${theme.textPrimary}`}>{item.title}</h4>
                  <p className={`text-xs mb-2 font-medium ${theme.textSecondary}`}>${formatPrice(item.price)}</p>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onUpdateQuantity(item.id, -1)}
                      aria-label="Decrease quantity"
                      className={`w-6 h-6 border ${theme.dropdownBorder} rounded-lg flex items-center justify-center active:scale-90 shadow-sm transition-transform duration-150 ${theme.isDark ? 'bg-slate-800' : 'bg-white'}`}
                    >
                      <Minus size={12} />
                    </button>
                    <span className={`text-xs font-bold w-4 text-center ${theme.textPrimary}`}>{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, 1)}
                      aria-label="Increase quantity"
                      className={`w-6 h-6 border ${theme.dropdownBorder} rounded-lg flex items-center justify-center active:scale-90 shadow-sm transition-transform duration-150 ${theme.isDark ? 'bg-slate-800' : 'bg-white'}`}
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => onRemove(item.id)}
                  aria-label="Remove item"
                  className="text-slate-400 hover:text-red-500 p-2 active:scale-90 transition-colors duration-200"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className={`pt-4 ${variant === "mobile" ? "mt-2 shrink-0" : ""} border-t space-y-3 ${theme.softBorder}`}>
            <div className={`flex justify-between items-center ${theme.textSecondary}`}>
              <span className="text-sm font-medium">Subtotal</span>
              <span className={`font-bold ${variant === "mobile" ? "text-lg" : "text-xl"} ${theme.textPrimary}`}>${formatPrice(cartSubtotal)}</span>
            </div>
            <button
              onClick={onCheckout}
              className={`w-full ${variant === "mobile" ? "py-3.5" : "py-4"} rounded-2xl font-bold active:scale-95 transition-transform duration-200 shadow-lg flex items-center justify-center gap-2 ${theme.primaryBtn}`}
            >
              Checkout Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default React.memo(CartPanel);