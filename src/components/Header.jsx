import React from 'react';
import { ChevronDown, Heart, ShoppingBag, Sun, Moon, Sparkles } from 'lucide-react';
import CategoryPanel from './CategoryPanel';
import SearchPanel from './SearchPanel';

export default function Header({
  theme, activeMenu, onToggleMenu, onResetFilters,
  categories, selectedCategory, onSelectCategory,
  searchQuery, onSearchChange,
  wishlistCount, cartCount,
  onThemeToggle, onDesignToggle
}) {
  return (
    <header className="hidden md:flex fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-4xl px-4 flex-col items-center">
      <nav className={`${theme.surface} shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] rounded-full px-4 lg:px-8 py-3 flex items-center justify-between w-full transition-all duration-300`}>
        <button onClick={onResetFilters} className="font-bold text-lg lg:text-xl tracking-tight flex items-center gap-2 active:scale-95 transition-transform duration-200 shrink-0">
          <div className="w-8 h-8 bg-black text-white rounded-lg flex items-center justify-center font-black">N</div>
          <span className="hidden lg:inline">Nexus<span className="text-lime-500">Market</span></span>
        </button>

        <div className={`flex items-center gap-4 lg:gap-8 font-medium text-sm ${theme.textSecondary}`}>
          <button onClick={onResetFilters} className="hover:text-lime-500 transition-colors duration-200">Home</button>
          <button
            onClick={() => onToggleMenu('category')}
            className={`flex items-center gap-1 transition-colors duration-200 ${activeMenu === 'category' ? 'text-lime-500' : 'hover:text-lime-500'}`}
          >
            Categories <ChevronDown size={14} className={`transition-transform duration-300 ${activeMenu === 'category' ? 'rotate-180' : ''}`} />
          </button>
          <button
            onClick={() => onToggleMenu('search')}
            className={`transition-colors duration-200 ${activeMenu === 'search' ? 'text-lime-500' : 'hover:text-lime-500'}`}
          >
            Search
          </button>
          <button className="hidden lg:inline hover:text-lime-500 transition-colors duration-200">About Us</button>
        </div>

        <div className="flex items-center gap-2 lg:gap-3">
          <button
            onClick={onThemeToggle}
            aria-label="Toggle theme"
            className={`relative w-10 h-10 flex items-center justify-center rounded-full ${theme.softChrome} border ${theme.dropdownBorder} active:scale-90 transition-all duration-300 shadow-md overflow-hidden`}
          >
            <span className={`absolute transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${theme.isDark ? 'opacity-0 -rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'}`}>
              <Sun size={18} />
            </span>
            <span className={`absolute transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${theme.isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-50'}`}>
              <Moon size={18} />
            </span>
          </button>

          <button
            onClick={onDesignToggle}
            aria-label="Toggle glass design"
            className={`w-10 h-10 flex items-center justify-center rounded-full active:scale-90 transition-all duration-300 shadow-md border ${theme.dropdownBorder} ${theme.isGlass ? 'bg-lime-400 text-black' : theme.softChrome}`}
          >
            <Sparkles size={18} />
          </button>

          <button
            onClick={() => onToggleMenu('wishlist')}
            aria-label="Open wishlist"
            className={`relative w-10 h-10 flex items-center justify-center rounded-full ${theme.softChrome} border ${theme.dropdownBorder} active:scale-90 transition-transform duration-200 shadow-md`}
          >
            <Heart size={18} className={wishlistCount > 0 ? "fill-red-500 text-red-500" : ""} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                {wishlistCount}
              </span>
            )}
          </button>

          <button
            onClick={() => onToggleMenu('cart')}
            aria-label="Open cart"
            className="relative w-10 h-10 flex items-center justify-center rounded-full bg-black text-white hover:bg-slate-800 active:scale-90 transition-transform duration-200 shadow-md"
          >
            <ShoppingBag size={18} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-lime-400 text-black text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </nav>

      <div className="relative w-full flex justify-center mt-4">
        <CategoryPanel
          variant="desktop"
          theme={theme}
          categories={categories}
          selectedCategory={selectedCategory}
          onSelect={onSelectCategory}
          isOpen={activeMenu === 'category'}
          onClose={() => onToggleMenu(null)}
        />
        <SearchPanel
          variant="desktop"
          theme={theme}
          searchQuery={searchQuery}
          onChange={onSearchChange}
          isOpen={activeMenu === 'search'}
          onClose={() => onToggleMenu(null)}
        />
      </div>
    </header>
  );
}