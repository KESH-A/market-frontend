import React, { useState } from 'react';
import { Search, ShoppingBag, Heart, ChevronDown, Maximize, ChevronLeft, ChevronRight, Upload, X } from 'lucide-react';

export default function App() {
  const [activeMenu, setActiveMenu] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const toggleMenu = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  return (
    <div className="min-h-screen bg-[#f5f7f9] relative overflow-hidden font-sans text-slate-800">

      <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-lime-200/40 rounded-full mix-blend-multiply filter blur-[100px] opacity-70"></div>

      <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-4xl px-4 flex flex-col items-center">
        <nav className="bg-white/50 backdrop-blur-md border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-full px-8 py-3 flex items-center justify-between w-full transition-all duration-500 hover:bg-white/90">
          <div className="font-bold text-xl tracking-tight flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 bg-black text-white rounded-lg flex items-center justify-center font-black">N</div>
            Nexus<span className="text-lime-500">Market</span>
          </div>

          <div className="flex items-center gap-8 font-medium text-sm text-slate-600">
            <button className="hover:text-black transition-colors">Home</button>
            <button
              onClick={() => toggleMenu('category')}
              className={`flex items-center gap-1 transition-colors ${activeMenu === 'category' ? 'text-black' : 'hover:text-black'}`}
            >
              Categories <ChevronDown size={14} className={`transition-transform duration-500 ${activeMenu === 'category' ? 'rotate-180' : ''}`} />
            </button>
            <button
              onClick={() => toggleMenu('search')}
              className={`transition-colors ${activeMenu === 'search' ? 'text-black' : 'hover:text-black'}`}
            >
              Search
            </button>
            <button className="hover:text-black transition-colors">About Us</button>
          </div>

          <div className="flex items-center gap-4">
            <button
              aria-label="Open cart"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-black text-white hover:bg-slate-800 active:scale-90 transition-all duration-200 shadow-md"
            >
              <ShoppingBag size={18} />
            </button>
          </div>
        </nav>

        <div className="relative w-full flex justify-center mt-4">
          <div
            className={`absolute top-0 w-full max-w-3xl bg-white/60 backdrop-blur-xl border border-white/60 shadow-xl rounded-3xl p-6 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] origin-top hover:bg-white/95
            ${activeMenu === 'category' ? 'opacity-100 scale-100 translate-y-0 visible' : 'opacity-0 scale-95 -translate-y-4 invisible pointer-events-none'}`}
          >
            <div className="flex flex-wrap gap-3 justify-center">
              {['Phones', 'Tablets', 'Laptops', 'Headphones', 'TV & Monitors', 'Smartwatches', 'Gaming Consoles', 'Cameras', 'Drones', 'Smart Home', 'Speakers', 'Accessories'].map((cat) => (
                <button key={cat} className="px-5 py-2.5 bg-white/50 border border-slate-100 rounded-xl text-sm font-medium text-slate-700 hover:bg-lime-100 hover:text-lime-800 hover:border-lime-200 active:scale-95 transition-all shadow-sm">
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div
            className={`absolute top-0 w-full max-w-2xl bg-white/60 backdrop-blur-xl border border-white/60 shadow-xl rounded-3xl p-4 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] origin-top hover:bg-white/95
            ${activeMenu === 'search' ? 'opacity-100 scale-100 translate-y-0 visible' : 'opacity-0 scale-95 -translate-y-4 invisible pointer-events-none'}`}
          >
            <div className="relative flex items-center">
              <Search className="absolute left-4 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Search products, brands and categories..."
                className="w-full bg-white/50 border border-slate-200 rounded-2xl py-3 pl-12 pr-4 text-slate-700 focus:outline-none focus:ring-2 focus:ring-lime-300 focus:bg-white transition-all shadow-inner"
              />
            </div>
          </div>
        </div>
      </header>

      <main className="pt-48 pb-20 px-8 max-w-6xl mx-auto flex justify-center">
        <div className="group w-full max-w-[380px] bg-white/40 backdrop-blur-md border border-white/60 rounded-[2.5rem] p-4 shadow-[0_20px_40px_rgb(0,0,0,0.03)] hover:bg-white/80 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-500">

          <div className="relative w-full h-[320px] bg-slate-100/50 rounded-[2rem] overflow-hidden mb-5 flex items-center justify-center">
            <div className="absolute top-4 w-full px-4 flex justify-end gap-2 z-10">
              <button
                onClick={() => setIsLiked(!isLiked)}
                aria-label={isLiked ? 'Remove from wishlist' : 'Add to wishlist'}
                className={`w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-500 shadow-sm active:scale-90
                ${isLiked ? 'text-red-500 bg-white scale-110' : 'text-slate-600 hover:bg-white hover:text-red-500'
                }`}
              >
                <Heart size={18}
                  className={`transition-all duration-500 ${isLiked ? 'fill-red-500 scale-110 animate-bounce' : ''}`}
                />
              </button>
              <button
                aria-label="Share product"
                className="w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-slate-600 hover:bg-white hover:text-black active:scale-90 transition-all duration-200 shadow-sm"
              >
                <Upload size={18} />
              </button>
            </div>

            <button aria-label="Previous image" className="absolute left-8 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-md border border-slate-100 text-slate-600 hover:text-black active:scale-90 opacity-0 group-hover:opacity-100 transition-all duration-500">
              <ChevronLeft size={16} />
            </button>
            <button aria-label="Next image" className="absolute right-8 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-md border border-slate-100 text-slate-600 hover:text-black active:scale-90 opacity-0 group-hover:opacity-100 transition-all duration-500">
              <ChevronRight size={16} />
            </button>

            <div className="w-4/5 h-4/5 bg-orange-500 rounded-3xl shadow-xl transform group-hover:scale-105 transition-transform duration-500"></div>
          </div>

          <div className="px-2">
            <div className="inline-block px-3 py-1 bg-black text-white text-xs font-bold rounded-full mb-3 shadow-sm">
              -20%
            </div>

            <div className="flex justify-between items-start gap-3 mb-1">
              <h3 className="text-xl font-bold text-slate-800">Light Hooded Tracksuit</h3>
              <div className="text-right shrink-0">
                <p className="text-sm text-slate-400 line-through">$1,600.00</p>
                <p className="text-xl font-bold text-black">$1,231.00</p>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-6">
              <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-[10px] text-white font-bold">W</div>
              <span className="text-sm font-medium text-slate-500">WinterElegance</span>
            </div>

            <div className="flex gap-3">
              <button className="flex-1 bg-white/80 border border-slate-200 backdrop-blur-sm rounded-2xl py-3.5 px-4 flex justify-between items-center text-sm font-medium hover:bg-white active:scale-[0.98] transition-all duration-200 shadow-sm">
                Choose size <ChevronDown size={16} />
              </button>
              <button
                onClick={() => setIsQuickViewOpen(true)}
                aria-label="Quick view"
                className="w-14 bg-white/80 border border-slate-200 backdrop-blur-sm rounded-2xl flex items-center justify-center hover:bg-white active:scale-90 transition-all duration-200 shadow-sm"
              >
                <Maximize size={18} className="text-slate-600" />
              </button>
              <button className="flex-[1.2] bg-black text-white rounded-2xl flex items-center justify-center gap-2 font-medium hover:bg-slate-800 active:scale-95 transition-all duration-200 shadow-lg">
                + Add to Cart
              </button>
            </div>
          </div>

        </div>
      </main>

      <div
        role="dialog"
        aria-modal="true"
        aria-hidden={!isQuickViewOpen}
        onClick={() => setIsQuickViewOpen(false)}
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-sm transition-opacity duration-500 ${
          isQuickViewOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`bg-white/90 backdrop-blur-xl border border-white/80 rounded-[2rem] sm:rounded-[2.5rem] w-full max-w-md sm:max-w-lg md:max-w-2xl max-h-[85vh] sm:max-h-[90vh] overflow-y-auto p-5 sm:p-6 shadow-2xl relative flex flex-col md:flex-row gap-5 sm:gap-6 transition-all duration-500 ${
            isQuickViewOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'
          }`}
        >
          <button
            onClick={() => setIsQuickViewOpen(false)}
            aria-label="Close quick view"
            className="absolute top-4 right-4 w-9 h-9 bg-slate-100 hover:bg-slate-200 active:scale-90 rounded-full flex items-center justify-center font-bold text-slate-600 transition-all duration-200 z-10"
          >
            <X size={14} />
          </button>

          <div className="w-full md:w-1/2 h-48 sm:h-56 md:h-auto bg-orange-500 rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-inner shrink-0">
            <span className="text-white font-bold text-[10px] tracking-widest uppercase opacity-70">Preview</span>
          </div>

          <div className="w-full md:w-1/2 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-lime-600 bg-lime-100 px-3 py-1 rounded-full">In stock</span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mt-3 mb-1">Light Hooded Tracksuit</h2>
              <p className="text-sm text-slate-500 mb-4 leading-relaxed">Premium cotton blend hoodie designed for maximum comfort and modern urban style.</p>

              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-xl sm:text-2xl font-black text-black">$1,231.00</span>
                <span className="text-sm text-slate-400 line-through">$1,600.00</span>
              </div>
            </div>

            <button
              onClick={() => setIsQuickViewOpen(false)}
              className="w-full bg-black text-white py-3 sm:py-3.5 rounded-2xl font-medium hover:bg-slate-800 active:scale-95 transition-all duration-200 shadow-lg"
            >
              + Add to Cart
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}