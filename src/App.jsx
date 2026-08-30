import React, { useState } from 'react';
import {Search, ShoppingBag, Heart, ChevronDown, Maximize, ChevronLeft, ChevronRight, Upload} from 'lucide-react';



export default function App() {
  const [activeMenu, setActiveMenu] = useState(null);

  const toggleMenu = (menu) =>{
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  return (
    <div className="min-h-screen bg-[#f5f7f9] relative overflow-hidden font-sans text-slate-800">
      <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-lime-200/40 rounded-full mix-blend-multiply filter blur-[100px] opacity-70"></div>
      <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-lime-200/40 rounded-full mix-blend-multiply filter blur-[100px] opacity-70"></div>

      <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-4xl px-4 flex flex-col items-center">
        <nav className="bg-white/50 backdrop-blur-md border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-full px-8 py-3 flex items-center justify-between w-full transition-all duration-300 hover:bg-white/90">
          <div className="font-bold text-xl tracking-tight flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 bg-black text-white rounded-lg flex items-center justify-center font-black">K</div>
              Kesha<span className="text-lime-500">.</span>
          </div>


          <div className="flex items-center gap-8 font-medium text-sm text-slate-600">
            <button className="hover:text-black transition-colors">Home</button>
            <button 
              onClick={() => toggleMenu('category')}
              className={`flex items-center gap-1 transition-colors ${activeMenu === 'category' ? 'text-black' : 'hover:text-black'}`}            
              >
                Categories <ChevronDown size={14} className={`transition-transform duration-300 ${activeMenu === 'category' ? 'rotate-180' : ''}`}/>
            </button>
            <button 
              onClick={() =>toggleMenu('search')}
              className={`transition-colors ${activeMenu === 'search' ? 'text-black' : 'hover:text-black'}`}
            >
              Search
            </button>
            <button className="hover:text-black transition-colors">About Us</button>
          </div>

          <div className="flex items-center gap-4">
            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-black text-white hover:bg-slate-800 transition-colors shadow-md">
              <ShoppingBag size={18}/>
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
                <button key={cat} className="px-5 py-2.5 bg-white/50 border border-slate-100 rounded-xl text-sm font-medium text-slate-700 hover:bg-lime-100 hover:text-lime-800 hover:border-lime-200 transition-all shadow-sm">
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div
            className={`absolute top-0 w-full max-w-2xl bg-white/60 backdrop-blur-xl border border-white/60 shadow-xl rounded-3xl p-4 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] origin-top hover:bg-white/95
            ${activeMenu === 'search' ? "opacity-100 scale-100 translate-y-0 visible" : "opacity-0 scale-95 -translate-y-4 invisible pointer-events-none"}`}
          > 
            <div className="relative flex items-center">
              <Search className="absolute left-4 text-slate-400" size={20}/>
              <input
                type='text'
                placeholder='Search products, brands and categories...'
                className="w-full bg-white/50 border border-slate-950 rounded-2xl py-3 pl-12 pr-4 text-slate-700 focus:outline-none focus:ring-2 focus:ring-lime-300 focus:bg-white transition-all shadow-inner"
                autoFocus={activeMenu === 'search'}
              />
            </div>
          </div>

        </div>
      </header>



    </div>
  )
  
}

