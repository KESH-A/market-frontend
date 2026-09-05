import React from 'react';
import { X, CheckCircle } from 'lucide-react';

function CheckoutModal({
  theme, isOpen, step, onClose,
  cartSubtotal, shippingFee, taxAmount, orderTotal, formatPrice,
  couponCode, onCouponChange, couponError, onApplyCoupon,
  onCompleteOrder
}) {
  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${theme.modalOverlay} transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] motion-reduce:transition-none ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`${theme.surface} w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none ${
          isOpen ? 'opacity-100 scale-100 translate-y-0 rounded-[2rem] sm:rounded-[2.5rem]' : 'opacity-0 scale-90 translate-y-4 rounded-[3rem]'
        }`}
      >
        <button onClick={onClose} aria-label="Close checkout" className={`absolute top-6 right-6 w-9 h-9 rounded-full flex items-center justify-center active:scale-90 transition-transform duration-200 ${theme.closeBtnCls}`}>
          <X size={16} />
        </button>

        {step === "form" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <form onSubmit={onCompleteOrder} className="space-y-3">
              <h3 className={`font-bold ${theme.textPrimary}`}>Checkout Details</h3>
              <input type="email" required placeholder="Email" className={`w-full ${theme.inputCls} rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2`} />
              <input type="text" required placeholder="Address" className={`w-full ${theme.inputCls} rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2`} />
              <input type="text" required placeholder="Card Number" className={`w-full ${theme.inputCls} rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2`} />
              <button type="submit" className={`w-full py-3 rounded-xl font-bold mt-2 active:scale-95 transition-all duration-200 ${theme.primaryBtn}`}>Pay ${formatPrice(orderTotal)}</button>
            </form>

            <div className={`${theme.surface} p-4 rounded-2xl flex flex-col justify-between`}>
              <div>
                <h4 className={`font-bold text-sm mb-3 ${theme.textPrimary}`}>Order Summary</h4>
                <form onSubmit={onApplyCoupon} className="flex gap-2 mb-3">
                  <input type="text" value={couponCode} onChange={(e) => onCouponChange(e.target.value)} placeholder="Coupon (NEXUS10)" className={`w-full ${theme.inputCls} rounded-xl px-3 py-1.5 text-xs focus:outline-none`} />
                  <button type="submit" className={`text-xs px-3 py-1.5 rounded-xl font-bold active:scale-95 transition-all ${theme.primaryBtn}`}>Apply</button>
                </form>
                {couponError && <p className="text-[10px] text-red-500 mb-2 font-medium">{couponError}</p>}
                <div className={`space-y-1 text-xs border-t pt-2 font-medium ${theme.textSecondary} ${theme.softBorder}`}>
                  <div className="flex justify-between"><span>Subtotal</span><span>${formatPrice(cartSubtotal)}</span></div>
                  <div className="flex justify-between"><span>Shipping</span><span>${formatPrice(shippingFee)}</span></div>
                  <div className="flex justify-between"><span>Tax</span><span>${formatPrice(taxAmount)}</span></div>
                </div>
              </div>
              <div className={`flex justify-between items-center border-t pt-2 font-bold text-base ${theme.textPrimary} ${theme.softBorder}`}>
                <span>Total</span><span>${formatPrice(orderTotal)}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 space-y-3">
            <CheckCircle className="text-lime-500 w-12 h-12 mx-auto" />
            <h2 className={`text-xl font-bold ${theme.textPrimary}`}>Order Confirmed!</h2>
            <button onClick={onClose} className={`px-6 py-2 rounded-xl text-sm font-bold active:scale-95 transition-all ${theme.primaryBtn}`}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default React.memo(CheckoutModal);