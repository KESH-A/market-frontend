import React from 'react';
import { Search, X } from 'lucide-react';

function SearchPanel({ variant, theme, searchQuery, onChange, isOpen, onClose }) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.target.blur();
      onClose();
    }
  };

  if (variant === "mobile") {
    return (
      <div className={`md:hidden fixed inset-x-0 top-24 z-50 flex justify-center px-4 pointer-events-none transition-all duration-500 ease-out ${isOpen ? 'visible' : 'invisible'}`}>
        <div className={`pointer-events-auto w-full max-w-[300px] ${theme.surface} shadow-2xl overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] motion-reduce:transition-none ${isOpen ? 'scale-100 opacity-100 translate-x-0 translate-y-0 rounded-[2rem] p-4' : 'scale-[0.05] opacity-0 translate-x-[40vw] translate-y-16 rounded-[100px] p-0'}`}>
          <div className={`relative flex items-center transition-all duration-500 ease-out ${isOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-95'}`}>
            <Search className={`absolute left-4 ${theme.textMuted}`} size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onChange(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search..."
              className={`w-full ${theme.inputCls} rounded-2xl py-3 pl-12 pr-10 focus:outline-none focus:ring-2 transition-all duration-200 shadow-inner`}
            />
            <button onClick={onClose} aria-label="Close search" className={`absolute right-4 active:scale-90 transition-colors duration-200 ${theme.textMuted}`}>
              <X size={18} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`absolute top-0 w-full max-w-2xl ${theme.surface} shadow-2xl p-4 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] motion-reduce:transition-none origin-top ${isOpen ? "opacity-100 scale-100 translate-y-0 rounded-[2rem] visible" : "opacity-0 scale-95 -translate-y-4 rounded-[100px] invisible pointer-events-none"}`}>
      <div className="relative flex items-center">
        <Search className={`absolute left-4 ${theme.textMuted}`} size={20} />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search products, brands and categories..."
          className={`w-full ${theme.inputCls} rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 transition-all duration-200 shadow-inner`}
        />
      </div>
    </div>
  );
}

export default React.memo(SearchPanel);