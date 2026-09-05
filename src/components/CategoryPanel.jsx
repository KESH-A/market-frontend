import React from 'react';
import { X } from 'lucide-react';

const ALL_CATEGORY = { id: "all", name: "All" };

function CategoryPanel({ variant, theme, categories, selectedCategoryId, onSelect, isOpen, onClose }) {
  const allCategories = [ALL_CATEGORY, ...categories];

  if (variant === "mobile") {
    return (
      <div className={`md:hidden fixed inset-x-0 top-24 z-50 flex justify-center px-4 pointer-events-none transition-all duration-500 ease-out ${isOpen ? 'visible' : 'invisible'}`}>
        <div className={`pointer-events-auto w-full max-w-[340px] ${theme.surface} shadow-2xl overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] motion-reduce:transition-none ${isOpen ? 'scale-100 opacity-100 translate-x-0 translate-y-0 rounded-[2rem] p-5' : 'scale-[0.05] opacity-0 translate-x-[40vw] translate-y-4 rounded-[100px] p-0'}`}>
          <div className={`flex justify-between items-center mb-4 px-1 transition-all duration-500 ease-out ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
            <h3 className={`font-bold text-lg ${theme.textPrimary}`}>Categories</h3>
            <button onClick={onClose} aria-label="Close categories" className={`w-8 h-8 rounded-full flex items-center justify-center active:scale-90 transition-colors duration-200 ${theme.closeBtnCls}`}>
              <X size={16} />
            </button>
          </div>

          <div className="flex flex-wrap gap-2 max-h-[55vh] overflow-y-auto pr-1 pb-2">
            {allCategories.map((cat, index) => (
              <button
                key={cat.id}
                onClick={() => onSelect(cat.id)}
                style={{ transitionDelay: isOpen ? `${index * 30}ms` : '0ms' }}
                className={`px-4 py-2 rounded-xl text-sm font-medium active:scale-95 shadow-sm transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                  selectedCategoryId === cat.id ? theme.chipActive : theme.chipInactive
                } ${isOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-90'}`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`absolute top-0 w-full max-w-3xl ${theme.surface} shadow-2xl p-6 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] motion-reduce:transition-none origin-top ${isOpen ? "opacity-100 scale-100 translate-y-0 rounded-[2rem] visible" : "opacity-0 scale-95 -translate-y-4 rounded-[100px] invisible pointer-events-none"}`}>
      <div className="flex flex-wrap gap-3 justify-center">
        {allCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onSelect(cat.id)}
            className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 shadow-sm ${selectedCategoryId === cat.id ? theme.chipActive : theme.chipInactive}`}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default React.memo(CategoryPanel);