import React from 'react';
import { X } from 'lucide-react';

export default function MobileNavToggle({ theme, isMobileMenuOpen, isLoaded, onToggleMain, buttons }) {
  return (
    <div className="md:hidden fixed top-6 right-5 z-50 flex flex-col items-end gap-3 pointer-events-none">
      <div className={`pointer-events-auto transition-transform duration-500 ease-out motion-reduce:transition-none ${isLoaded ? 'translate-x-0 rotate-0 opacity-100' : 'translate-x-32 rotate-[360deg] opacity-0'}`}>
        <button
          onClick={onToggleMain}
          aria-label="Toggle menu"
          className="w-12 h-12 bg-black/90 text-white rounded-full flex items-center justify-center shadow-[0_8px_30px_rgb(0,0,0,0.12)] active:scale-90 transition-transform duration-200 relative overflow-hidden"
        >
          <span className={`absolute inset-0 flex items-center justify-center font-black text-xl transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${isMobileMenuOpen ? 'opacity-0 -rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'}`}>
            N
          </span>
          <span className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${isMobileMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-50'}`}>
            <X size={20} />
          </span>
        </button>
      </div>

      <div className={`pointer-events-auto flex flex-col items-end gap-3 transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] motion-reduce:transition-none origin-top ${isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10 pointer-events-none'}`}>
        {buttons.map((btn, index) => (
          <button
            key={btn.key}
            onClick={btn.onClick}
            aria-label={btn.label}
            style={{ transitionDelay: isMobileMenuOpen ? `${index * 55}ms` : '0ms' }}
            className={`relative w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
              btn.hide
                ? 'opacity-0 scale-50 pointer-events-none'
                : `opacity-100 scale-100 active:scale-90 ${btn.highlight ? 'bg-lime-400 text-black' : `${theme.softChrome} border ${theme.dropdownBorder}`}`
            }`}
          >
            {btn.icon}
            {btn.badge > 0 && (
              <span className="absolute -top-1 -right-1 bg-lime-400 text-black text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
                {btn.badge}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}