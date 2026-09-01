import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, Heart, ChevronDown, Maximize, ChevronLeft, ChevronRight, Upload, X, Home, Grid, Plus, Minus, Trash2 } from 'lucide-react';
import Ip1 from "./assets/ProductImg1.avif";
import Ip2 from "./assets/ProductImg2.avif";
import Ip3 from "./assets/ProductImg3.avif";

export default function App() {
  const [activeMenu, setActiveMenu] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [likedProducts, setLikedProducts] = useState({});
  const [productSizes, setProductSizes] = useState({});
  const [openSizeMenuId, setOpenSizeMenuId] = useState(null);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const sampleProduct = {
    id: "prod-1",
    name: "Light Hooded Tracksuit",
    brand: "WinterElegance",
    price: 1231.00,
    originalPrice: 1600.00,
    image: Ip1,
    inStock: true,
    description: "Premium cotton blend hoodie designed for maximum comfort and modern urban style.",
    sizes: ["S", "M", "L", "XL"]
  };

  const productsData = [
    {
      id: "prod-1",
      name: "Light Hooded Tracksuit",
      category: "Clothing",
      brand: "WinterElegance",
      price: 1231.00,
      originalPrice: 1600.00,
      image: Ip1,
      inStock: true,
      description: "Premium cotton blend hoodie designed for maximum comfort and modern urban style.",
      sizes: ["S", "M", "L", "XL"]
    },
    {
      id: "prod-2",
      name: "Wireless ANC Headphones",
      category: "Headphones",
      brand: "SoundPeak",
      price: 299.00,
      originalPrice: 350.00,
      image: Ip2,
      inStock: true,
      description: "Active noise cancelling headphones with immersive sound and all-day battery life.",
      sizes: ["One Size"]
    },
    {
      id: "prod-3",
      name: "Smart Watch Series 9",
      category: "Smartwatches",
      brand: "TechTime",
      price: 450.00,
      originalPrice: 500.00,
      image: Ip3,
      inStock: true,
      description: "Track your health and stay connected with an always-on display and multi-day battery.",
      sizes: ["41mm", "45mm"]
    },
  ];

  const categories = ['Clothing', 'Phones', 'Tablets', 'Laptops', 'Headphones', 'TV & Monitors', 'Smartwatches', 'Gaming Consoles', 'Cameras', 'Drones', 'Smart Home', 'Speakers', 'Accessories'];

  const filteredProducts = productsData.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const [cartItems, setCartItems] = useState([
    { ...sampleProduct, quantity: 1, selectedSize: "M" }
  ]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const formatPrice = (value) => value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const getDiscount = (product) => Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  const getProductSize = (product) => productSizes[product.id] || product.sizes[0];

  const selectProductSize = (productId, size) => {
    setProductSizes(prev => ({ ...prev, [productId]: size }));
  };

  const toggleLike = (productId) => {
    setLikedProducts(prev => ({ ...prev, [productId]: !prev[productId] }));
  };

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

  const closeSizeMenus = () => {
    setOpenSizeMenuId(null);
  };

  const addToCart = (product, size) => {
    const sizeToAdd = size || product.sizes[0];
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id && item.selectedSize === sizeToAdd);
      if (existing) {
        return prev.map(item => (item.id === product.id && item.selectedSize === sizeToAdd) ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1, selectedSize: sizeToAdd }];
    });
    setActiveMenu("cart");
  };

  const updateQuantity = (id, size, delta) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id && item.selectedSize === size) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }));
  };

  const removeFromCart = (id, size) => {
    setCartItems(prev => prev.filter(item => !(item.id === id && item.selectedSize === size)));
  };

  const cartSubtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const toggleMobileMain = () => {
    if (activeMenu) {
      setActiveMenu(null);
    }
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const resetFilters = () => {
    setSelectedCategory("All");
    setSearchQuery("");
    setActiveMenu(null);
    setIsMobileMenuOpen(false);
  };

  const quickViewData = quickViewProduct || sampleProduct;
  const isQuickViewOpen = quickViewProduct !== null;

  return (
    <div className="min-h-screen bg-[#f5f7f9] relative overflow-hidden font-sans text-slate-800" onClick={closeSizeMenus}>

      <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-lime-200/40 rounded-full mix-blend-multiply filter blur-[80px] opacity-70 pointer-events-none"></div>

      {(isMobileMenuOpen || activeMenu) && (
        <div
          className="fixed inset-0 z-40 bg-black/10 backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] motion-reduce:transition-none"
          onClick={handleBackdropClick}
        ></div>
      )}

      <header className="hidden md:flex fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-4xl px-4 flex-col items-center">
        <nav className="bg-white/40 backdrop-blur-xl border border-white/60 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] rounded-full px-6 lg:px-8 py-3 flex items-center justify-between w-full transition-all duration-300 hover:bg-white/60 hover:shadow-[0_8px_32px_0_rgba(31,38,135,0.12)]">
          <button onClick={resetFilters} className="font-bold text-lg lg:text-xl tracking-tight flex items-center gap-2 active:scale-95 transition-transform duration-200">
            <div className="w-8 h-8 bg-black text-white rounded-lg flex items-center justify-center font-black">N</div>
            Nexus<span className="text-lime-500">Market</span>
          </button>

          <div className="flex items-center gap-5 lg:gap-8 font-medium text-sm text-slate-600">
            <button onClick={resetFilters} className="hover:text-black transition-colors duration-200">Home</button>
            <button
              onClick={() => toggleMenu('category')}
              className={`flex items-center gap-1 transition-colors duration-200 ${activeMenu === 'category' ? 'text-black' : 'hover:text-black'}`}
            >
              Categories <ChevronDown size={14} className={`transition-transform duration-300 ${activeMenu === 'category' ? 'rotate-180' : ''}`} />
            </button>
            <button
              onClick={() => toggleMenu('search')}
              className={`transition-colors duration-200 ${activeMenu === 'search' ? 'text-black' : 'hover:text-black'}`}
            >
              Search
            </button>
            <button className="hover:text-black transition-colors duration-200">About Us</button>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => toggleMenu('cart')}
              aria-label="Open cart"
              className="relative w-10 h-10 flex items-center justify-center rounded-full bg-black text-white hover:bg-slate-800 active:scale-90 transition-transform duration-200 shadow-md"
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
            className={`absolute top-0 w-full max-w-3xl bg-white/40 backdrop-blur-2xl border border-white/60 shadow-2xl p-6 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] motion-reduce:transition-none origin-top
            ${activeMenu === "category" ? "opacity-100 scale-100 translate-y-0 rounded-[2rem] visible" : "opacity-0 scale-95 -translate-y-4 rounded-[100px] invisible pointer-events-none"}`}
          >
            <div className="flex flex-wrap gap-3 justify-center">
              {["All", ...categories].map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setActiveMenu(null);
                  }}
                  className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 shadow-sm
                  ${selectedCategory === cat
                      ? "bg-black text-white"
                      : "bg-white/50 border border-slate-100 text-slate-700 hover:bg-lime-100"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div
            className={`absolute top-0 w-full max-w-2xl bg-white/40 backdrop-blur-2xl border border-white/60 shadow-2xl p-4 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] motion-reduce:transition-none origin-top
            ${activeMenu === "search" ? "opacity-100 scale-100 translate-y-0 rounded-[2rem] visible" : "opacity-0 scale-95 -translate-y-4 rounded-[100px] invisible pointer-events-none"}`}
          >
            <div className="relative flex items-center">
              <Search className="absolute left-4 text-slate-400" size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, brands and categories..."
                className="w-full bg-white/50 border border-slate-200 rounded-2xl py-3 pl-12 pr-4 text-slate-700 focus:outline-none focus:ring-2 focus:ring-lime-300 transition-all duration-200 shadow-inner"
              />
            </div>
          </div>
        </div>
      </header>

      <div
        className={`hidden md:flex fixed inset-y-0 right-0 z-50 justify-end pointer-events-none transition-all duration-500 ease-out
        ${activeMenu === "cart" ? "visible" : "invisible"}`}
      >
        <div
          className={`pointer-events-auto w-[400px] max-w-[92vw] h-full bg-white/60 backdrop-blur-2xl border-l border-white/60 shadow-2xl flex flex-col p-6 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] motion-reduce:transition-none origin-right
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
              aria-label="Close cart"
              className="w-8 h-8 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center text-slate-600 active:scale-90 transition-transform duration-200"
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
                <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4 p-3 bg-white/50 border border-white/80 rounded-2xl items-center shadow-md backdrop-blur-sm">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl bg-slate-200 shrink-0" />

                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm text-slate-800 truncate">{item.name}</h4>
                    <span className="inline-block text-[10px] font-semibold bg-slate-200 text-slate-700 px-2 py-0.5 rounded-md mb-1">
                      Size: {item.selectedSize}
                    </span>
                    <p className="text-xs text-slate-400 mb-2">${formatPrice(item.price)}</p>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.selectedSize, -1)}
                        aria-label="Decrease quantity"
                        className="w-6 h-6 bg-white border border-slate-200 rounded-lg flex items-center justify-center active:scale-90 shadow-sm transition-transform duration-150"
                      >
                        <Minus size={12}/>
                      </button>
                      <span className="text-xs font-bold text-slate-700 w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.selectedSize, 1)}
                        aria-label="Increase quantity"
                        className="w-6 h-6 bg-white border border-slate-200 rounded-lg flex items-center justify-center active:scale-90 shadow-sm transition-transform duration-150"
                      >
                        <Plus size={12}/>
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id, item.selectedSize)}
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
            <div className="pt-4 border-t border-slate-100 space-y-4">
              <div className="flex justify-between items-center text-slate-600">
                <span className="text-sm font-medium">Subtotal</span>
                <span className="text-xl font-bold text-black">${formatPrice(cartSubtotal)}</span>
              </div>
              <button className="w-full bg-black text-white py-4 rounded-2xl font-bold hover:bg-slate-800 active:scale-95 transition-transform duration-200 shadow-lg flex items-center justify-center gap-2">
                Checkout Now
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="md:hidden fixed top-6 right-5 z-50 flex flex-col items-end gap-3 pointer-events-none">
        <div className={`pointer-events-auto transition-transform duration-500 ease-out motion-reduce:transition-none ${isLoaded ? 'translate-x-0 rotate-0 opacity-100' : 'translate-x-32 rotate-[360deg] opacity-0'}`}>
          <button
            onClick={toggleMobileMain}
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
          <button onClick={() => { resetFilters(); setIsMobileMenuOpen(false); }} aria-label="Home" className="w-10 h-10 bg-white/40 backdrop-blur-xl border border-white/60 rounded-full flex items-center justify-center shadow-lg text-slate-600 active:scale-90 transition-all duration-200 hover:text-black hover:bg-lime-50">
            <Home size={18} />
          </button>

          <button
            onClick={() => setActiveMenu(activeMenu === 'category' ? null : 'category')}
            aria-label="Categories"
            className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-200
              ${activeMenu === 'category' ? 'opacity-0 scale-50 pointer-events-none' : 'opacity-100 scale-100 bg-white/40 backdrop-blur-xl border border-white/60 text-slate-600 hover:text-black hover:bg-lime-50 active:scale-90'}`}
          >
            <Grid size={18} />
          </button>

          <button
            onClick={() => setActiveMenu(activeMenu === 'search' ? null : 'search')}
            aria-label="Search"
            className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-200
              ${activeMenu === 'search' ? 'opacity-0 scale-50 pointer-events-none' : 'opacity-100 scale-100 bg-white/40 backdrop-blur-xl border border-white/60 text-slate-600 hover:text-black hover:bg-lime-50 active:scale-90'}`}
          >
            <Search size={18} />
          </button>

          <button
            onClick={() => setActiveMenu(activeMenu === 'cart' ? null : 'cart')}
            aria-label="Cart"
            className={`relative w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-200
              ${activeMenu === 'cart' ? 'opacity-0 scale-50 pointer-events-none' : 'opacity-100 scale-100 bg-white/40 backdrop-blur-xl border border-white/60 text-slate-600 hover:text-black hover:bg-lime-50 active:scale-90'}`}
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

      <div className={`md:hidden fixed inset-x-0 top-24 z-50 flex justify-center px-4 pointer-events-none transition-all duration-500 ease-out ${activeMenu === 'category' ? 'visible' : 'invisible'}`}>
        <div className={`pointer-events-auto w-full max-w-[340px] bg-white/40 backdrop-blur-2xl border border-white/60 shadow-2xl overflow-hidden
          transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] motion-reduce:transition-none
          ${activeMenu === 'category' ? 'scale-100 opacity-100 translate-x-0 translate-y-0 rounded-[2rem] p-5' : 'scale-[0.05] opacity-0 translate-x-[40vw] translate-y-4 rounded-[100px] p-0'}`}>

          <div
            className={`flex justify-between items-center mb-4 px-1 transition-all duration-500 ease-out ${activeMenu === 'category' ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
          >
            <h3 className="font-bold text-slate-800 text-lg">Categories</h3>
            <button onClick={() => setActiveMenu(null)} aria-label="Close categories" className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 active:scale-90 hover:bg-slate-200 transition-colors duration-200">
              <X size={16} />
            </button>
          </div>

          <div className="flex flex-wrap gap-2 max-h-[55vh] overflow-y-auto pr-1 pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setActiveMenu(null);
                }}
                className={`px-4 py-2 rounded-xl text-sm font-medium active:scale-95 shadow-sm
                  transition-all duration-300 ease-out
                  ${selectedCategory === cat ? 'bg-black text-white border border-black' : 'bg-white/50 border border-slate-200/60 text-slate-700 hover:bg-lime-100 hover:border-lime-200'}
                  ${activeMenu === 'category' ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-90'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className={`md:hidden fixed inset-x-0 top-24 z-50 flex justify-center px-4 pointer-events-none transition-all duration-500 ease-out ${activeMenu === 'search' ? 'visible' : 'invisible'}`}>
        <div className={`pointer-events-auto w-full max-w-[300px] bg-white/40 backdrop-blur-2xl border border-white/60 shadow-2xl overflow-hidden
          transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] motion-reduce:transition-none
          ${activeMenu === 'search' ? 'scale-100 opacity-100 translate-x-0 translate-y-0 rounded-[2rem] p-4' : 'scale-[0.05] opacity-0 translate-x-[40vw] translate-y-16 rounded-[100px] p-0'}`}>

          <div
            className={`relative flex items-center transition-all duration-500 ease-out ${activeMenu === 'search' ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-95'}`}
          >
            <Search className="absolute left-4 text-slate-400" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="w-full bg-white/50 border border-slate-200/60 rounded-2xl py-3 pl-12 pr-10 text-slate-700 focus:outline-none focus:ring-2 focus:ring-lime-300 transition-all duration-200 shadow-inner"
            />
            <button onClick={() => setActiveMenu(null)} aria-label="Close search" className="absolute right-4 text-slate-400 active:scale-90 hover:text-slate-600 transition-colors duration-200">
              <X size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className={`md:hidden fixed inset-x-0 top-24 z-50 flex justify-center px-4 pointer-events-none transition-all duration-500 ease-out ${activeMenu === 'cart' ? 'visible' : 'invisible'}`}>
        <div className={`pointer-events-auto w-full max-w-[380px] max-h-[70vh] bg-white/40 backdrop-blur-2xl border border-white/60 shadow-2xl overflow-hidden flex flex-col
          transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] motion-reduce:transition-none
          ${activeMenu === 'cart' ? 'scale-100 opacity-100 translate-y-0 rounded-[2rem] p-5' : 'scale-[0.05] opacity-0 translate-y-4 rounded-[100px] p-0'}`}>

          <div
            className={`flex items-center justify-between mb-4 px-1 shrink-0 transition-all duration-500 ease-out ${activeMenu === 'cart' ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
          >
            <div className="flex items-center gap-2">
              <ShoppingBag size={20} className="text-black" />
              <h3 className="font-bold text-slate-800 text-lg">Your Cart</h3>
              <span className="text-xs font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded-full">{totalCartCount}</span>
            </div>
            <button onClick={() => setActiveMenu(null)} aria-label="Close cart" className="w-8 h-8 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center text-slate-600 active:scale-90 transition-colors duration-200">
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
              cartItems.map((item) => (
                <div
                  key={`${item.id}-${item.selectedSize}`}
                  className={`flex gap-3 p-3 bg-white/50 border border-white/80 rounded-2xl items-center shadow-sm backdrop-blur-sm transition-all duration-500 ease-out ${activeMenu === 'cart' ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-90'}`}
                >
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-xl bg-slate-200 shrink-0" />

                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm text-slate-800 truncate">{item.name}</h4>
                    <span className="inline-block text-[10px] font-semibold bg-slate-200 text-slate-700 px-2 py-0.5 rounded-md mb-1">
                      Size: {item.selectedSize}
                    </span>
                    <p className="text-xs text-slate-400 mb-2">${formatPrice(item.price)}</p>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.selectedSize, -1)}
                        aria-label="Decrease quantity"
                        className="w-6 h-6 bg-white border border-slate-200 rounded-lg flex items-center justify-center active:scale-90 shadow-sm transition-transform duration-150"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="text-xs font-bold text-slate-700 w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.selectedSize, 1)}
                        aria-label="Increase quantity"
                        className="w-6 h-6 bg-white border border-slate-200 rounded-lg flex items-center justify-center active:scale-90 shadow-sm transition-transform duration-150"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id, item.selectedSize)}
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
            <div
              className={`pt-4 mt-2 border-t border-slate-100 space-y-3 shrink-0 transition-all duration-500 ease-out ${activeMenu === 'cart' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              <div className="flex justify-between items-center text-slate-600">
                <span className="text-sm font-medium">Subtotal</span>
                <span className="text-lg font-bold text-black">${formatPrice(cartSubtotal)}</span>
              </div>
              <button className="w-full bg-black text-white py-3.5 rounded-2xl font-bold hover:bg-slate-800 active:scale-95 transition-transform duration-200 shadow-lg flex items-center justify-center gap-2">
                Checkout Now
              </button>
            </div>
          )}
        </div>
      </div>

      <main className="pt-24 md:pt-48 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">

        {(selectedCategory !== "All" || searchQuery !== "") && (
          <div className="flex flex-wrap items-center justify-center gap-2 mb-6 w-full">
            <span className="text-xs font-semibold text-slate-500">Filters:</span>
            {selectedCategory !== "All" && (
              <span className="inline-flex items-center gap-1.5 text-xs bg-lime-200 text-lime-900 px-3 py-1 rounded-full font-medium shadow-sm">
                {selectedCategory}
                <X size={12} className="cursor-pointer hover:opacity-75 active:scale-90 transition-transform duration-150" onClick={() => setSelectedCategory("All")}/>
              </span>
            )}
            {searchQuery && (
              <span className="inline-flex items-center gap-1.5 text-xs bg-slate-200 text-slate-800 py-1 px-3 rounded-full font-medium shadow-sm">
                {searchQuery}
                <X size={12} className="cursor-pointer hover:opacity-75 active:scale-90 transition-transform duration-150" onClick={() => setSearchQuery("")} />
              </span>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 justify-items-center">
          {filteredProducts.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center text-center py-20 gap-3">
              <Search size={44} strokeWidth={1} className="text-slate-300" />
              <p className="font-semibold text-slate-600">No products found</p>
              <p className="text-sm text-slate-400 max-w-xs">Try a different search term or category to find what you are looking for.</p>
              <button onClick={resetFilters} className="mt-2 px-5 py-2.5 bg-black text-white rounded-xl text-sm font-medium hover:bg-slate-800 active:scale-95 transition-transform duration-200">
                Reset Filters
              </button>
            </div>
          ) : (
            filteredProducts.map((product) => {
              const size = getProductSize(product);
              const liked = !!likedProducts[product.id];
              return (
                <div
                  key={product.id}
                  className="group w-full max-w-[380px] bg-white/40 backdrop-blur-xl border border-white/60 rounded-[2.5rem] p-3 sm:p-4 shadow-[0_20px_40px_rgb(0,0,0,0.03)] hover:bg-white/60 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-500"
                >
                  <div className="relative w-full h-60 sm:h-72 md:h-64 lg:h-72 bg-slate-100/50 rounded-[2rem] overflow-hidden mb-5 flex items-center justify-center">
                    <div className="absolute top-4 w-full px-4 flex justify-end gap-2 z-10">
                      <button
                        onClick={() => toggleLike(product.id)}
                        aria-label="Like product"
                        className={`w-10 h-10 bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] shadow-sm active:scale-90
                        ${liked ? 'text-red-500 bg-white scale-110' : 'text-slate-600 hover:bg-white hover:text-red-500'}`}
                      >
                        <Heart size={18} className={`transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${liked ? 'fill-red-500 scale-110' : ''}`} />
                      </button>
                      <button aria-label="Share product" className="w-10 h-10 bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center text-slate-600 hover:bg-white hover:text-black active:scale-90 transition-all duration-300 shadow-sm">
                        <Upload size={18} />
                      </button>
                    </div>

                    <button aria-label="Previous image" className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center shadow-md border border-white/60 text-slate-600 hover:text-black active:scale-90 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <ChevronLeft size={16} />
                    </button>
                    <button aria-label="Next image" className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center shadow-md border border-white/60 text-slate-600 hover:text-black active:scale-90 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <ChevronRight size={16} />
                    </button>

                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover rounded-[2rem] group-hover:scale-105 transition-all duration-700 ease-out"
                    />
                  </div>

                  <div className="px-1 sm:px-2">
                    <div className="inline-block px-3 py-1 bg-black text-white text-xs font-bold rounded-full mb-3 shadow-sm">
                      -{getDiscount(product)}%
                    </div>

                    <div className="flex justify-between items-start gap-3 mb-1">
                      <h3 className="text-base sm:text-lg font-bold text-slate-800 truncate">{product.name}</h3>
                      <div className="text-right shrink-0">
                        <p className="text-xs text-slate-400 line-through">${formatPrice(product.originalPrice)}</p>
                        <p className="text-base sm:text-lg font-bold text-black">${formatPrice(product.price)}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-6">
                      <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-[10px] text-white font-bold shrink-0">
                        {product.brand.charAt(0)}
                      </div>
                      <span className="text-sm font-medium text-slate-500 truncate">{product.brand}</span>
                    </div>

                    <div className="flex gap-1.5 sm:gap-2 relative">
                      <div className="flex-1 min-w-0 relative">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenSizeMenuId(openSizeMenuId === product.id ? null : product.id);
                          }}
                          aria-label="Select size"
                          className="w-full bg-white/50 backdrop-blur-md border border-slate-200/60 rounded-2xl py-3 px-3 flex justify-between items-center gap-1 text-xs font-medium hover:bg-white active:scale-[0.98] transition-all duration-300 shadow-sm"
                        >
                          <span className="truncate">
                            Size: <strong className="text-black">{size}</strong>
                          </span>
                          <ChevronDown size={16} className={`shrink-0 transition-transform duration-300 ${openSizeMenuId === product.id ? 'rotate-180' : ''}`} />
                        </button>

                        <div
                          onClick={(e) => e.stopPropagation()}
                          className={`absolute bottom-full mb-2 left-1/2 -translate-x-1/2 min-w-full w-max max-w-[240px] bg-white/90 backdrop-blur-xl border border-white/80 rounded-2xl p-1.5 shadow-2xl z-30 flex flex-wrap justify-center gap-1.5 origin-bottom transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                            openSizeMenuId === product.id
                              ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
                              : 'opacity-0 scale-75 translate-y-4 pointer-events-none'
                          }`}
                        >
                          {product.sizes.map((s) => (
                            <button
                              key={s}
                              onClick={() => {
                                selectProductSize(product.id, s);
                                setOpenSizeMenuId(null);
                              }}
                              className={`px-3 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-all duration-200 ${
                                size === s
                                  ? 'bg-black text-white'
                                  : 'text-slate-600 hover:bg-lime-100 hover:text-slate-900'
                              }`}
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>

                      <button
                        onClick={() => setQuickViewProduct(product)}
                        aria-label="Quick view"
                        className="w-11 shrink-0 bg-white/50 backdrop-blur-md border border-slate-200/60 rounded-2xl flex items-center justify-center hover:bg-white active:scale-90 transition-all duration-300 shadow-sm"
                      >
                        <Maximize size={18} className="text-slate-600" />
                      </button>

                      <button
                        onClick={() => addToCart(product, size)}
                        className="flex-[1.2] min-w-0 bg-black text-white rounded-2xl flex items-center justify-center gap-1 text-xs font-medium hover:bg-slate-800 active:scale-95 transition-all duration-300 shadow-lg px-2"
                      >
                        + Add
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </main>

      <div
        role="dialog"
        aria-modal="true"
        onClick={() => setQuickViewProduct(null)}
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] motion-reduce:transition-none ${
          isQuickViewOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`bg-white/60 backdrop-blur-2xl border border-white/60 w-full max-w-md sm:max-w-lg md:max-w-2xl max-h-[85vh] sm:max-h-[90vh] overflow-y-auto p-5 sm:p-6 shadow-2xl relative flex flex-col md:flex-row gap-5 sm:gap-6 transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none ${
            isQuickViewOpen ? 'opacity-100 scale-100 translate-y-0 rounded-[2rem] sm:rounded-[2.5rem]' : 'opacity-0 scale-90 translate-y-4 rounded-[3rem]'
          }`}
        >
          <button
            onClick={() => setQuickViewProduct(null)}
            aria-label="Close quick view"
            className="absolute top-4 right-4 w-9 h-9 bg-slate-100 hover:bg-slate-200 active:scale-90 rounded-full flex items-center justify-center font-bold text-slate-600 transition-transform duration-200 z-10"
          >
            <X size={14} />
          </button>

          <div className="w-full md:w-1/2 h-48 sm:h-56 md:h-auto bg-slate-100 rounded-2xl sm:rounded-3xl overflow-hidden shadow-inner shrink-0">
            <img src={quickViewData.image} alt={quickViewData.name} className="w-full h-full object-cover" />
          </div>

          <div className="w-full md:w-1/2 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-3">
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${quickViewData.inStock ? 'text-lime-600 bg-lime-100' : 'text-red-500 bg-red-100'}`}>
                  {quickViewData.inStock ? 'In stock' : 'Out of stock'}
                </span>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-black text-white">
                  -{getDiscount(quickViewData)}%
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-1">{quickViewData.name}</h2>
              <p className="text-sm text-slate-500 mb-4 leading-relaxed">{quickViewData.description}</p>

              <div className="mb-4">
                <span className="text-xs font-semibold text-slate-500 block mb-2">Select Size:</span>
                <div className="flex flex-wrap gap-2">
                  {quickViewData.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => selectProductSize(quickViewData.id, s)}
                      className={`px-3 py-1.5 text-xs font-bold rounded-xl border whitespace-nowrap transition-all duration-200 ${
                        getProductSize(quickViewData) === s
                          ? 'bg-black text-white border-black'
                          : 'bg-white/50 border-slate-200 text-slate-700 hover:bg-lime-100'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-xl sm:text-2xl font-black text-black">${formatPrice(quickViewData.price)}</span>
                <span className="text-sm text-slate-400 line-through">${formatPrice(quickViewData.originalPrice)}</span>
              </div>
            </div>

            <button
              onClick={() => { addToCart(quickViewData, getProductSize(quickViewData)); setQuickViewProduct(null); }}
              className="w-full bg-black text-white rounded-2xl flex items-center justify-center gap-2 font-medium py-3.5 hover:bg-slate-800 active:scale-95 transition-transform duration-200 shadow-lg"
            >
              + Add to Cart
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}