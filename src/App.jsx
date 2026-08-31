import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, Heart, ChevronDown, Maximize, ChevronLeft, ChevronRight, Upload, X, Home, Grid, Plus, Minus, Trash2 } from 'lucide-react';
import Ip1 from "./assets/ProductImg1.avif"

export default function App() {
  const [activeMenu, setActiveMenu] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const sampleProduct = {
    id: "prod-1",
    name: "Light Hooded Tracksuit",
    brand: "WinterElegance",
    price: 1231.00,
    originalPrice: 1600.00,
    image: Ip1,
    inStock: true
  };

  const [cartItems, setCartItems] = useState([
    { ...sampleProduct, quantity: 1, selectedSize: "M" }
  ]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const categories = ['Phones', 'Tablets', 'Laptops', 'Headphones', 'TV & Monitors', 'Smartwatches', 'Gaming Consoles', 'Cameras', 'Drones', 'Smart Home', 'Speakers', 'Accessories'];

  const toggleMenu = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  const handleBackdropClick = () => {
    if (activeMenu) {
      setActiveMenu(null);
    } else {
      setIsMobileMenuOpen(false);
    }
  };

  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1, selectedSize: "M" }];
    });
    setActiveMenu("cart");
  };

  const updateQuantity = (id, delta) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }));
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const cartSubtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const toggleMobileMain = () => {
    if (activeMenu) {
      setActiveMenu(null);
    }
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-[#f5f7f9] relative overflow-hidden font-sans text-slate-800">

      <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-lime-200/40 rounded-full mix-blend-multiply filter blur-[100px] opacity-70"></div>

      {(isMobileMenuOpen || activeMenu) && (
        <div
          className="fixed inset-0 z-40 bg-black/10 backdrop-blur-[2px] transition-opacity duration-500"
          onClick={handleBackdropClick}
        ></div>
      )}

      <header className="hidden md:flex fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-4xl px-4 flex-col items-center">
        <nav className="bg-white/50 backdrop-blur-md border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-full px-6 lg:px-8 py-3 flex items-center justify-between w-full transition-all duration-300 hover:bg-white/90">
          <div className="font-bold text-lg lg:text-xl tracking-tight flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 bg-black text-white rounded-lg flex items-center justify-center font-black">N</div>
            Nexus<span className="text-lime-500">Market</span>
          </div>

          <div className="flex items-center gap-5 lg:gap-8 font-medium text-sm text-slate-600">
            <button className="hover:text-black transition-colors">Home</button>
            <button
              onClick={() => toggleMenu('category')}
              className={`flex items-center gap-1 transition-colors ${activeMenu === 'category' ? 'text-black' : 'hover:text-black'}`}
            >
              Categories <ChevronDown size={14} className={`transition-transform duration-300 ${activeMenu === 'category' ? 'rotate-180' : ''}`} />
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
              onClick={() => toggleMenu('cart')}
              className="relative w-10 h-10 flex items-center justify-center rounded-full bg-black text-white hover:bg-slate-800 active:scale-90 transition-all duration-300 shadow-md"
            >
              <ShoppingBag size={18} />
              {totalCartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-lime-400 text-black text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                  {totalCartCount}
                </span>
              )}
            </button>
          </div>
        </nav>

        <div className="relative w-full flex justify-center mt-4">
          <div
            className={`absolute top-0 w-full max-w-3xl bg-white/95 backdrop-blur-xl border border-white/80 shadow-2xl p-6 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.23,1,0.31,1)] origin-top
            ${activeMenu === "category" ? "opacity-100 scale-100 translate-y-0 rounded-[2rem] visible" : "opacity-0 scale-50 -translate-y-8 rounded-[100px] invisible pointer-events-none"}`}
          >
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((cat) => (
                <button key={cat} className="px-5 py-2.5 bg-white/50 border border-slate-100 rounded-xl text-sm font-medium text-slate-700 hover:bg-lime-100 hover:text-lime-800 hover:border-lime-200 active:scale-95 transition-all shadow-sm">
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div
            className={`absolute top-0 w-full max-w-2xl bg-white/95 backdrop-blur-xl border border-white/80 shadow-2xl p-4 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.23,1,0.31,1)] origin-top
            ${activeMenu === "search" ? "opacity-100 scale-100 translate-y-0 rounded-[2rem] visible" : "opacity-0 scale-50 -translate-y-8 rounded-[100px] invisible pointer-events-none"}`}
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

      <div
        className={`hidden md:flex fixed inset-y-0 right-0 z-50 justify-end pointer-events-none transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
        ${activeMenu === "cart" ? "visible" : "invisible"}`}
      >
        <div
          className={`pointer-events-auto w-[400px] h-full bg-white/95 backdrop-blur-2xl border-l border-white shadow-2xl flex flex-col p-6 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] origin-right
          ${activeMenu === "cart" ? "translate-x-0 opacity-100 rounded-l-[2.5rem]" : "translate-x-full opacity-0 rounded-l-[100px]"}`}
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <ShoppingBag size={20} className="text-black"/>
              <h2 className="text-xl font-bold text-slate-800">Your Cart</h2>
              <span className="text-xs font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded-full">{totalCartCount}</span>
            </div>
            <button
              onClick={() => setActiveMenu(null)}
              className="w-8 h-8 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center text-slate-600 active:scale-90 transition-all"
            >
              <X size={16}/>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-4 space-y-4">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-slate-400 gap-2">
                <ShoppingBag size={48} strokeWidth={1} />
                <p className="font-medium text-slate-500">Your cart is empty</p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="flex gap-4 p-3 bg-slate-50/80 border border-slate-100 rounded-2xl items-center shadow-md">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl bg-slate-200 shrink-0" />

                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm text-slate-800 truncate">{item.name}</h4>
                    <p className="text-xs text-slate-400 mb-2">${item.price.toFixed(2)}</p>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-6 h-6 bg-white border border-slate-200 rounded-lg flex items-center justify-center active:scale-90 shadow-sm"
                      >
                        <Minus size={12}/>
                      </button>
                      <span className="text-xs font-bold text-slate-700 w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-6 h-6 bg-white border border-slate-200 rounded-lg flex items-center justify-center active:scale-90 shadow-sm"
                      >
                        <Plus size={12}/>
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-slate-400 hover:text-red-500 p-2 active:scale-90 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="pt-4 border-t border-slate-100 space-y-4">
              <div className="flex justify-between items-center text-slate-600">
                <span className="text-sm font-medium">Subtotal</span>
                <span className="text-xl font-bold text-black">${cartSubtotal.toFixed(2)}</span>
              </div>
              <button className="w-full bg-black text-white py-4 rounded-2xl font-bold hover:bg-slate-800 active:scale-95 transition-all shadow-lg flex items-center justify-center gap-2">
                Checkout Now
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="md:hidden fixed top-6 right-5 z-50 flex flex-col items-end gap-3 pointer-events-none">
        <div className={`pointer-events-auto transition-all duration-[1500ms] ease-[cubic-bezier(0.23,1,0.32,1)] ${isLoaded ? 'translate-x-0 rotate-0 opacity-100' : 'translate-x-32 rotate-[360deg] opacity-0'}`}>
          <button
            onClick={toggleMobileMain}
            className="w-12 h-12 bg-black/90 backdrop-blur-md text-white rounded-full flex items-center justify-center shadow-[0_8px_30px_rgb(0,0,0,0.12)] active:scale-90 transition-transform duration-300 relative"
          >
            {isMobileMenuOpen ? <X size={20} /> : <div className="font-black text-xl">N</div>}
          </button>
        </div>

        <div className={`pointer-events-auto flex flex-col items-end gap-3 transition-all duration-500 origin-top ${isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10 pointer-events-none'}`}>
          <button onClick={() => setActiveMenu(null)} className="w-10 h-10 bg-white/90 backdrop-blur-md border border-white/60 rounded-full flex items-center justify-center shadow-lg text-slate-600 active:scale-90 transition-all duration-200 hover:text-black hover:bg-lime-50">
            <Home size={18} />
          </button>

          <button
            onClick={() => setActiveMenu(activeMenu === 'category' ? null : 'category')}
            className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-300
              ${activeMenu === 'category' ? 'opacity-0 scale-50 pointer-events-none' : 'opacity-100 scale-100 bg-white/90 backdrop-blur-md border border-white/60 text-slate-600 hover:text-black hover:bg-lime-50 active:scale-90'}`}
          >
            <Grid size={18} />
          </button>

          <button
            onClick={() => setActiveMenu(activeMenu === 'search' ? null : 'search')}
            className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-300
              ${activeMenu === 'search' ? 'opacity-0 scale-50 pointer-events-none' : 'opacity-100 scale-100 bg-white/90 backdrop-blur-md border border-white/60 text-slate-600 hover:text-black hover:bg-lime-50 active:scale-90'}`}
          >
            <Search size={18} />
          </button>

          <button
            onClick={() => setActiveMenu(activeMenu === 'cart' ? null : 'cart')}
            className={`relative w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-300
              ${activeMenu === 'cart' ? 'opacity-0 scale-50 pointer-events-none' : 'opacity-100 scale-100 bg-white/90 backdrop-blur-md border border-white/60 text-slate-600 hover:text-black hover:bg-lime-50 active:scale-90'}`}
          >
            <ShoppingBag size={18} />
            {totalCartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-lime-400 text-black text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
                {totalCartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      <div className={`md:hidden fixed inset-x-0 top-24 z-50 flex justify-center pointer-events-none transition-all duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] ${activeMenu === 'category' ? 'visible' : 'invisible'}`}>
        <div className={`pointer-events-auto w-[92vw] max-w-[340px] bg-white/95 backdrop-blur-xl border border-white/80 shadow-2xl overflow-hidden
          transition-all duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)]
          ${activeMenu === 'category' ? 'scale-100 opacity-100 translate-x-0 translate-y-0 rounded-[2rem] p-5' : 'scale-[0.05] opacity-0 translate-x-[40vw] translate-y-4 rounded-[100px] p-0'}`}>

          <div
            style={{ transitionDelay: activeMenu === 'category' ? '200ms' : '0ms' }}
            className={`flex justify-between items-center mb-4 px-1 transition-all duration-500 ease-out ${activeMenu === 'category' ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
          >
            <h3 className="font-bold text-slate-800 text-lg">Categories</h3>
            <button onClick={() => setActiveMenu(null)} className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 active:scale-90 hover:bg-slate-200 transition-colors">
              <X size={16} />
            </button>
          </div>

          <div className="flex flex-wrap gap-2 max-h-[55vh] overflow-y-auto pr-1 pb-2">
            {categories.map((cat, index) => (
              <button
                key={cat}
                style={{ transitionDelay: activeMenu === 'category' ? `${(index * 35) + 250}ms` : '0ms' }}
                className={`px-4 py-2 bg-slate-50/80 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-lime-100 hover:border-lime-200 active:scale-95 shadow-sm
                  transition-all duration-[400ms] ease-out
                  ${activeMenu === 'category' ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-90'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className={`md:hidden fixed inset-x-0 top-24 z-50 flex justify-center pointer-events-none transition-all duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] ${activeMenu === 'search' ? 'visible' : 'invisible'}`}>
        <div className={`pointer-events-auto w-[85vw] max-w-[300px] bg-white/95 backdrop-blur-xl border border-white/80 shadow-2xl overflow-hidden
          transition-all duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)]
          ${activeMenu === 'search' ? 'scale-100 opacity-100 translate-x-0 translate-y-0 rounded-[2rem] p-4' : 'scale-[0.05] opacity-0 translate-x-[40vw] translate-y-16 rounded-[100px] p-0'}`}>

          <div
            style={{ transitionDelay: activeMenu === 'search' ? '300ms' : '0ms' }}
            className={`relative flex items-center transition-all duration-500 ease-out ${activeMenu === 'search' ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-95'}`}
          >
            <Search className="absolute left-4 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-slate-50/80 border border-slate-200 rounded-2xl py-3 pl-12 pr-10 text-slate-700 focus:outline-none focus:ring-2 focus:ring-lime-300 transition-all shadow-inner"
            />
            <button onClick={() => setActiveMenu(null)} className="absolute right-4 text-slate-400 active:scale-90 hover:text-slate-600">
              <X size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className={`md:hidden fixed inset-x-0 top-24 z-50 flex justify-center pointer-events-none transition-all duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] ${activeMenu === 'cart' ? 'visible' : 'invisible'}`}>
        <div className={`pointer-events-auto w-[92vw] max-w-[380px] max-h-[70vh] bg-white/95 backdrop-blur-xl border border-white/80 shadow-2xl overflow-hidden flex flex-col
          transition-all duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)]
          ${activeMenu === 'cart' ? 'scale-100 opacity-100 translate-y-0 rounded-[2rem] p-5' : 'scale-[0.05] opacity-0 translate-y-4 rounded-[100px] p-0'}`}>

          <div
            style={{ transitionDelay: activeMenu === 'cart' ? '200ms' : '0ms' }}
            className={`flex items-center justify-between mb-4 px-1 shrink-0 transition-all duration-500 ease-out ${activeMenu === 'cart' ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
          >
            <div className="flex items-center gap-2">
              <ShoppingBag size={20} className="text-black" />
              <h3 className="font-bold text-slate-800 text-lg">Your Cart</h3>
              <span className="text-xs font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded-full">{totalCartCount}</span>
            </div>
            <button onClick={() => setActiveMenu(null)} className="w-8 h-8 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center text-slate-600 active:scale-90 transition-colors">
              <X size={16} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-3 pr-1">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-slate-400 gap-2 py-10">
                <ShoppingBag size={40} strokeWidth={1} />
                <p className="font-medium text-slate-500 text-sm">Your cart is empty</p>
              </div>
            ) : (
              cartItems.map((item, index) => (
                <div
                  key={item.id}
                  style={{ transitionDelay: activeMenu === 'cart' ? `${(index * 40) + 250}ms` : '0ms' }}
                  className={`flex gap-3 p-3 bg-slate-50/80 border border-slate-100 rounded-2xl items-center shadow-sm transition-all duration-[400ms] ease-out ${activeMenu === 'cart' ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-90'}`}
                >
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-xl bg-slate-200 shrink-0" />

                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm text-slate-800 truncate">{item.name}</h4>
                    <p className="text-xs text-slate-400 mb-2">${item.price.toFixed(2)}</p>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-6 h-6 bg-white border border-slate-200 rounded-lg flex items-center justify-center active:scale-90 shadow-sm"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="text-xs font-bold text-slate-700 w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-6 h-6 bg-white border border-slate-200 rounded-lg flex items-center justify-center active:scale-90 shadow-sm"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-slate-400 hover:text-red-500 p-2 active:scale-90 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))
            )}
          </div>

          {cartItems.length > 0 && (
            <div
              style={{ transitionDelay: activeMenu === 'cart' ? '250ms' : '0ms' }}
              className={`pt-4 mt-2 border-t border-slate-100 space-y-3 shrink-0 transition-all duration-500 ease-out ${activeMenu === 'cart' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              <div className="flex justify-between items-center text-slate-600">
                <span className="text-sm font-medium">Subtotal</span>
                <span className="text-lg font-bold text-black">${cartSubtotal.toFixed(2)}</span>
              </div>
              <button className="w-full bg-black text-white py-3.5 rounded-2xl font-bold hover:bg-slate-800 active:scale-95 transition-all shadow-lg flex items-center justify-center gap-2">
                Checkout Now
              </button>
            </div>
          )}
        </div>
      </div>

      <main className="pt-24 md:pt-48 pb-20 px-4 sm:px-8 max-w-6xl mx-auto flex justify-center relative z-10">
        <div className="group w-full max-w-[380px] bg-white/40 backdrop-blur-md border border-white/60 rounded-[2.5rem] p-3 sm:p-4 shadow-[0_20px_40px_rgb(0,0,0,0.03)] hover:bg-white/80 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-500">

          <div className="relative w-full h-64 sm:h-80 md:h-[320px] bg-slate-100/50 rounded-[2rem] overflow-hidden mb-5 flex items-center justify-center">
            <div className="absolute top-4 w-full px-4 flex justify-end gap-2 z-10">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 shadow-sm active:scale-90
                ${isLiked ? 'text-red-500 bg-white scale-110' : 'text-slate-600 hover:bg-white hover:text-red-500'}`}
              >
                <Heart size={18} className={`transition-all duration-300 ${isLiked ? 'fill-red-500 scale-110 animate-bounce' : ''}`} />
              </button>
              <button className="w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-slate-600 hover:bg-white hover:text-black active:scale-90 transition-all duration-200 shadow-sm">
                <Upload size={18} />
              </button>
            </div>

            <button className="absolute left-8 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-md border border-slate-100 text-slate-600 hover:text-black active:scale-90 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <ChevronLeft size={16} />
            </button>
            <button className="absolute right-8 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-md border border-slate-100 text-slate-600 hover:text-black active:scale-90 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <ChevronRight size={16} />
            </button>

            <img
              src={sampleProduct.image}
              alt={sampleProduct.name}
              className="w-full h-full object-cover rounded-[2rem] group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          <div className="px-1 sm:px-2">
            <div className="inline-block px-3 py-1 bg-black text-white text-xs font-bold rounded-full mb-3 shadow-sm">
              -20%
            </div>

            <div className="flex justify-between items-start gap-3 mb-1">
              <h3 className="text-lg sm:text-xl font-bold text-slate-800">Light Hooded Tracksuit</h3>
              <div className="text-right shrink-0">
                <p className="text-xs sm:text-sm text-slate-400 line-through">$1,600.00</p>
                <p className="text-lg sm:text-xl font-bold text-black">$1,231.00</p>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-6">
              <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-[10px] text-white font-bold">W</div>
              <span className="text-sm font-medium text-slate-500">WinterElegance</span>
            </div>

            <div className="flex gap-2 sm:gap-3">
              <button className="flex-1 min-w-0 bg-white/80 border border-slate-200 backdrop-blur-sm rounded-2xl py-3 sm:py-3.5 px-3 sm:px-4 flex justify-between items-center gap-1 text-xs sm:text-sm font-medium hover:bg-white active:scale-[0.98] transition-all duration-200 shadow-sm">
                <span className="truncate">
                  <span className="sm:hidden">Size</span>
                  <span className="hidden sm:inline">Choose size</span>
                </span>
                <ChevronDown size={16} className="shrink-0" />
              </button>
              <button
                onClick={() => setIsQuickViewOpen(true)}
                className="w-12 sm:w-14 shrink-0 bg-white/80 border border-slate-200 backdrop-blur-sm rounded-2xl flex items-center justify-center hover:bg-white active:scale-90 transition-all duration-200 shadow-sm"
              >
                <Maximize size={18} className="text-slate-600" />
              </button>
              <button
                onClick={() => addToCart(sampleProduct)}
                className="flex-[1.2] min-w-0 bg-black text-white rounded-2xl flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm font-medium hover:bg-slate-800 active:scale-95 transition-all duration-200 shadow-lg px-2"
              >
                + Add to Cart
              </button>
            </div>
          </div>
        </div>
      </main>

      <div
        role="dialog"
        aria-modal="true"
        onClick={() => setIsQuickViewOpen(false)}
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-sm transition-opacity duration-500 ${
          isQuickViewOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`bg-white/90 backdrop-blur-xl border border-white/80 w-full max-w-md sm:max-w-lg md:max-w-2xl max-h-[85vh] sm:max-h-[90vh] overflow-y-auto p-5 sm:p-6 shadow-2xl relative flex flex-col md:flex-row gap-5 sm:gap-6 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
            isQuickViewOpen ? 'opacity-100 scale-100 translate-y-0 rounded-[2rem] sm:rounded-[2.5rem]' : 'opacity-0 scale-90 translate-y-4 rounded-[3rem]'
          }`}
        >
          <button
            onClick={() => setIsQuickViewOpen(false)}
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
              onClick={() => { addToCart(sampleProduct); setIsQuickViewOpen(false); }}
              className="w-full bg-black text-white rounded-2xl flex items-center justify-center gap-2 font-medium py-3.5 hover:bg-slate-800 active:scale-95 transition-all duration-200 shadow-lg"
            >
              + Add to Cart
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}