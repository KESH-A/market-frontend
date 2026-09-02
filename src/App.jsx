import React, { useState, useEffect } from 'react';
import { flushSync } from 'react-dom';
import { Search, ShoppingBag, Heart, ChevronDown, Maximize, ChevronLeft, ChevronRight, Upload, X, Home, Grid, Plus, Minus, Trash2, CheckCircle, Sun, Moon, Sparkles } from 'lucide-react';
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
  const [productImageIndexes, setProductImageIndexes] = useState({});
  const [openSizeMenuId, setOpenSizeMenuId] = useState(null);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState("form");
  const [couponCode, setCouponCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [couponError, setCouponError] = useState("");

  const [themeMode, setThemeMode] = useState("light");
  const [designMode, setDesignMode] = useState("normal");
  const [designStage, setDesignStage] = useState("idle");
  const [designOrigin, setDesignOrigin] = useState({ x: 0, y: 0 });

  const sampleProduct = {
    id: "prod-1",
    name: "Light Hooded Tracksuit",
    brand: "WinterElegance",
    price: 1231.00,
    originalPrice: 1600.00,
    images: [Ip1, Ip2, Ip3],
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
      images: [Ip1, Ip2, Ip3],
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
      images: [Ip2, Ip1, Ip3],
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
      images: [Ip3, Ip1, Ip2],
      inStock: true,
      description: "Track your health and stay connected with an always-on display and multi-day battery.",
      sizes: ["41mm", "45mm"]
    },
    {
      id: "prod-4",
      name: "Nova Air Smartphone",
      category: "Phones",
      brand: "Nova",
      price: 899.00,
      originalPrice: 999.00,
      images: [Ip2, Ip3, Ip1],
      inStock: true,
      description: "A slim flagship phone with an all-day battery and a pro-grade camera system.",
      sizes: ["128GB", "256GB", "512GB"]
    },
    {
      id: "prod-5",
      name: "Cortex UltraBook 14",
      category: "Laptops",
      brand: "Cortex",
      price: 1299.00,
      originalPrice: 1499.00,
      images: [Ip3, Ip2, Ip1],
      inStock: true,
      description: "A featherlight 14 inch laptop built for long work sessions and fast multitasking.",
      sizes: ["8GB / 256GB", "16GB / 512GB"]
    },
    {
      id: "prod-6",
      name: "PixelEdge Action Cam X2",
      category: "Cameras",
      brand: "PixelEdge",
      price: 249.00,
      originalPrice: 299.00,
      images: [Ip1, Ip3, Ip2],
      inStock: true,
      description: "Waterproof 4K action camera with image stabilization for every angle of your day.",
      sizes: ["One Size"]
    },
    {
      id: "prod-7",
      name: "SkyLite Mini Drone",
      category: "Drones",
      brand: "SkyLite",
      price: 179.00,
      originalPrice: 220.00,
      images: [Ip2, Ip1, Ip3],
      inStock: true,
      description: "A pocket sized drone with stabilized footage and a 20 minute flight time.",
      sizes: ["One Size"]
    },
    {
      id: "prod-8",
      name: "HomeCore Smart Hub",
      category: "Smart Home",
      brand: "HomeCore",
      price: 89.00,
      originalPrice: 120.00,
      images: [Ip3, Ip1, Ip2],
      inStock: true,
      description: "Control lights, locks and sensors from one hub with fast, reliable local automation.",
      sizes: ["One Size"]
    },
    {
      id: "prod-9",
      name: "EchoWave Portable Speaker",
      category: "Speakers",
      brand: "EchoWave",
      price: 129.00,
      originalPrice: 159.00,
      images: [Ip1, Ip2, Ip3],
      inStock: true,
      description: "Rich, room filling sound in a rugged, splash proof body that travels anywhere.",
      sizes: ["One Size"]
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

  const getCurrentImage = (product) => {
    const currentIndex = productImageIndexes[product.id] || 0;
    return product.images[currentIndex] || product.images[0];
  };

  const prevImage = (productId, totalImages, e) => {
    e.stopPropagation();
    setProductImageIndexes(prev => {
      const current = prev[productId] || 0;
      return { ...prev, [productId]: current === 0 ? totalImages - 1 : current - 1 };
    });
  };

  const nextImage = (productId, totalImages, e) => {
    e.stopPropagation();
    setProductImageIndexes(prev => {
      const current = prev[productId] || 0;
      return { ...prev, [productId]: (current + 1) % totalImages };
    });
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
  const shippingFee = cartSubtotal > 150 || cartItems.length === 0 ? 0 : 15.00;
  const discountAmount = (cartSubtotal * appliedDiscount) / 100;
  const taxAmount = (cartSubtotal - discountAmount) * 0.08;
  const orderTotal = cartSubtotal - discountAmount + shippingFee + taxAmount;
  const wishlistProducts = productsData.filter(p => likedProducts[p.id]);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.toUpperCase() === "NEXUS10") {
      setAppliedDiscount(10);
      setCouponError("");
    } else if (couponCode.toUpperCase() === "COORD090926") {
      setAppliedDiscount(100);
      setCouponError("");
    } else {
      setCouponError("Invalid coupon code");
    }
  };

  const handleCompleteOrder = (e) => {
    e.preventDefault();
    setCheckoutStep("success");
    setCartItems([]);
  };

  const closeCheckout = () => {
    setIsCheckoutOpen(false);
    setCheckoutStep("form");
    setCouponCode("");
    setAppliedDiscount(0);
    setCouponError("");
  };

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

  const handleThemeToggle = (e) => {
    const x = e.clientX;
    const y = e.clientY;
    document.documentElement.style.setProperty('--theme-x', `${x}px`);
    document.documentElement.style.setProperty('--theme-y', `${y}px`);
    const flipTheme = () => setThemeMode(prev => prev === 'light' ? 'dark' : 'light');
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        flushSync(() => flipTheme());
      });
    } else {
      flipTheme();
    }
  };

  const handleDesignToggle = (e) => {
    const x = e.clientX;
    const y = e.clientY;
    setDesignOrigin({ x, y });
    setDesignStage("cover");
    setTimeout(() => {
      setDesignMode(prev => prev === 'normal' ? 'glass' : 'normal');
      setDesignStage("reveal");
      setTimeout(() => {
        setDesignStage("idle");
      }, 600);
    }, 600);
  };

  const quickViewData = quickViewProduct || sampleProduct;
  const isQuickViewOpen = quickViewProduct !== null;

  const isDark = themeMode === "dark";
  const isGlass = designMode === "glass";
  const designRadius = designStage === "cover" ? 150 : 0;

  const pageBg = isDark ? "bg-[#0a0c10]" : "bg-[#f5f7f9]";
  const textPrimary = isDark ? "text-slate-100" : "text-slate-800";
  const textSecondary = isDark ? "text-slate-300" : "text-slate-600";
  const textMuted = isDark ? "text-slate-500" : "text-slate-400";
  const surface = isGlass
    ? (isDark ? "glass-surface bg-black/20 border border-white/10" : "glass-surface bg-white/15 border border-white/60")
    : (isDark ? "bg-slate-900/60 backdrop-blur-xl border border-white/10" : "bg-white/40 backdrop-blur-xl border border-white/60");
  const surfaceHover = isGlass
    ? (isDark ? "hover:bg-black/30" : "hover:bg-white/25")
    : (isDark ? "hover:bg-slate-900/70" : "hover:bg-white/60");
  const primaryBtn = isDark ? "bg-lime-400 text-black hover:bg-lime-300" : "bg-black text-white hover:bg-slate-800";
  const chipActive = isDark ? "bg-lime-400 text-black" : "bg-black text-white";
  const chipInactive = isDark
    ? "bg-slate-800/60 border border-white/10 text-slate-300 hover:bg-lime-500/20 hover:border-lime-500/30"
    : "bg-white/50 border border-slate-100 text-slate-700 hover:bg-lime-100";
  const inputCls = isDark
    ? "bg-slate-800/60 border border-white/10 text-slate-100 placeholder-slate-500 focus:ring-lime-400/40"
    : "bg-white/50 border border-slate-200 text-slate-700 placeholder-slate-400 focus:ring-lime-300";
  const softChrome = isDark
    ? "bg-slate-800/70 text-slate-300 hover:bg-slate-700 hover:text-white"
    : "bg-white/40 text-slate-600 hover:bg-white hover:text-black";
  const closeBtnCls = isDark ? "bg-slate-800 hover:bg-slate-700 text-slate-300" : "bg-slate-100 hover:bg-slate-200 text-slate-600";
  const dropdownBorder = isDark ? "border-white/10" : "border-white/60";

  const mobileNavButtons = [
    { key: "home", icon: <Home size={18} />, label: "Home", onClick: () => { resetFilters(); setIsMobileMenuOpen(false); }, hide: false, highlight: false },
    { key: "category", icon: <Grid size={18} />, label: "Categories", onClick: () => setActiveMenu(activeMenu === "category" ? null : "category"), hide: activeMenu === "category", highlight: false },
    { key: "search", icon: <Search size={18} />, label: "Search", onClick: () => setActiveMenu(activeMenu === "search" ? null : "search"), hide: activeMenu === "search", highlight: false },
    { key: "wishlist", icon: <Heart size={18} className={wishlistProducts.length > 0 ? "fill-red-500 text-red-500" : ""} />, label: "Wishlist", onClick: () => setActiveMenu(activeMenu === "wishlist" ? null : "wishlist"), hide: activeMenu === "wishlist", highlight: false, badge: wishlistProducts.length },
    { key: "cart", icon: <ShoppingBag size={18} />, label: "Cart", onClick: () => setActiveMenu(activeMenu === "cart" ? null : "cart"), hide: activeMenu === "cart", highlight: false, badge: totalCartCount },
    { key: "theme", icon: isDark ? <Moon size={18} /> : <Sun size={18} />, label: "Toggle theme", onClick: handleThemeToggle, hide: false, highlight: isDark },
    { key: "glass", icon: <Sparkles size={18} />, label: "Toggle glass mode", onClick: handleDesignToggle, hide: false, highlight: isGlass },
  ];

  return (
    <div className={`min-h-screen ${pageBg} ${textPrimary} relative overflow-hidden font-sans transition-colors duration-500`} onClick={closeSizeMenus}>

      <svg className="absolute w-0 h-0 overflow-hidden" aria-hidden="true">
        <defs>
          <filter id="lg" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.008 0.008" numOctaves="2" seed="5" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="70" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      <style>{`
        .glass-surface {
          backdrop-filter: url(#lg) blur(3px) saturate(180%);
          -webkit-backdrop-filter: blur(14px) saturate(180%);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.35);
        }
        ::view-transition-old(root),
        ::view-transition-new(root) {
          animation: none;
          mix-blend-mode: normal;
        }
        ::view-transition-new(root) {
          clip-path: circle(0% at var(--theme-x) var(--theme-y));
          animation: theme-reveal 650ms cubic-bezier(0.76,0,0.24,1) forwards;
        }
        ::view-transition-old(root) {
          clip-path: circle(150% at var(--theme-x) var(--theme-y));
          animation: theme-conceal 650ms cubic-bezier(0.76,0,0.24,1) forwards;
        }
        @keyframes theme-reveal {
          to { clip-path: circle(150% at var(--theme-x) var(--theme-y)); }
        }
        @keyframes theme-conceal {
          to { clip-path: circle(0% at var(--theme-x) var(--theme-y)); }
        }
      `}</style>

      <div
        className="fixed inset-0 z-[200] bg-black pointer-events-none transition-[clip-path] duration-[600ms] ease-[cubic-bezier(0.76,0,0.24,1)]"
        style={{ clipPath: `circle(${designRadius}% at ${designOrigin.x}px ${designOrigin.y}px)` }}
      ></div>

      <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-lime-200/40 rounded-full mix-blend-multiply filter blur-[80px] opacity-70 pointer-events-none"></div>

      {(isMobileMenuOpen || activeMenu) && (
        <div
          className="fixed inset-0 z-40 bg-black/10 backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] motion-reduce:transition-none"
          onClick={handleBackdropClick}
        ></div>
      )}

      <header className="hidden md:flex fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-4xl px-4 flex-col items-center">
        <nav className={`${surface} shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] rounded-full px-4 lg:px-8 py-3 flex items-center justify-between w-full transition-all duration-300`}>
          <button onClick={resetFilters} className="font-bold text-lg lg:text-xl tracking-tight flex items-center gap-2 active:scale-95 transition-transform duration-200 shrink-0">
            <div className="w-8 h-8 bg-black text-white rounded-lg flex items-center justify-center font-black">N</div>
            <span className="hidden lg:inline">Nexus<span className="text-lime-500">Market</span></span>
          </button>

          <div className={`flex items-center gap-4 lg:gap-8 font-medium text-sm ${textSecondary}`}>
            <button onClick={resetFilters} className="hover:text-lime-500 transition-colors duration-200">Home</button>
            <button
              onClick={() => toggleMenu('category')}
              className={`flex items-center gap-1 transition-colors duration-200 ${activeMenu === 'category' ? 'text-lime-500' : 'hover:text-lime-500'}`}
            >
              Categories <ChevronDown size={14} className={`transition-transform duration-300 ${activeMenu === 'category' ? 'rotate-180' : ''}`} />
            </button>
            <button
              onClick={() => toggleMenu('search')}
              className={`transition-colors duration-200 ${activeMenu === 'search' ? 'text-lime-500' : 'hover:text-lime-500'}`}
            >
              Search
            </button>
            <button className="hidden lg:inline hover:text-lime-500 transition-colors duration-200">About Us</button>
          </div>

          <div className="flex items-center gap-2 lg:gap-3">
            <button
              onClick={handleThemeToggle}
              aria-label="Toggle theme"
              className={`relative w-10 h-10 flex items-center justify-center rounded-full ${softChrome} border ${dropdownBorder} active:scale-90 transition-all duration-300 shadow-md overflow-hidden`}
            >
              <span className={`absolute transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${isDark ? 'opacity-0 -rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'}`}>
                <Sun size={18} />
              </span>
              <span className={`absolute transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-50'}`}>
                <Moon size={18} />
              </span>
            </button>

            <button
              onClick={handleDesignToggle}
              aria-label="Toggle glass design"
              className={`w-10 h-10 flex items-center justify-center rounded-full active:scale-90 transition-all duration-300 shadow-md border ${dropdownBorder} ${isGlass ? 'bg-lime-400 text-black' : softChrome}`}
            >
              <Sparkles size={18} />
            </button>

            <button
              onClick={() => toggleMenu('wishlist')}
              aria-label="Open wishlist"
              className={`relative w-10 h-10 flex items-center justify-center rounded-full ${softChrome} border ${dropdownBorder} active:scale-90 transition-transform duration-200 shadow-md`}
            >
              <Heart size={18} className={wishlistProducts.length > 0 ? "fill-red-500 text-red-500" : ""} />
              {wishlistProducts.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                  {wishlistProducts.length}
                </span>
              )}
            </button>

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
            className={`absolute top-0 w-full max-w-3xl ${surface} shadow-2xl p-6 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] motion-reduce:transition-none origin-top
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
                  ${selectedCategory === cat ? chipActive : chipInactive}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div
            className={`absolute top-0 w-full max-w-2xl ${surface} shadow-2xl p-4 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] motion-reduce:transition-none origin-top
            ${activeMenu === "search" ? "opacity-100 scale-100 translate-y-0 rounded-[2rem] visible" : "opacity-0 scale-95 -translate-y-4 rounded-[100px] invisible pointer-events-none"}`}
          >
            <div className="relative flex items-center">
              <Search className={`absolute left-4 ${textMuted}`} size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, brands and categories..."
                className={`w-full ${inputCls} rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 transition-all duration-200 shadow-inner`}
              />
            </div>
          </div>
        </div>
      </header>

      <div className={`hidden md:flex fixed inset-y-0 right-0 z-50 justify-end pointer-events-none transition-all duration-500 ease-out ${activeMenu === "wishlist" ? "visible" : "invisible"}`}>
        <div
          className={`pointer-events-auto w-[400px] max-w-[92vw] h-full ${surface} shadow-2xl flex flex-col p-6 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] motion-reduce:transition-none origin-right
          ${activeMenu === "wishlist" ? "translate-x-0 opacity-100 rounded-l-[2.5rem]" : "translate-x-full opacity-0 rounded-l-[100px]"}`}
        >
          <div className={`flex items-center justify-between pb-4 border-b ${isDark ? 'border-white/10' : 'border-slate-100'}`}>
            <div className="flex items-center gap-2">
              <Heart size={20} className="text-red-500 fill-red-500" />
              <h2 className={`text-xl font-bold ${textPrimary}`}>Wishlist</h2>
              <span className="text-xs font-bold bg-red-100 text-red-600 px-2 py-1 rounded-full">{wishlistProducts.length}</span>
            </div>
            <button
              onClick={() => setActiveMenu(null)}
              aria-label="Close wishlist"
              className={`w-8 h-8 rounded-full flex items-center justify-center active:scale-90 transition-transform duration-200 ${closeBtnCls}`}
            >
              <X size={16} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-4 space-y-4">
            {wishlistProducts.length === 0 ? (
              <div className={`h-full flex flex-col items-center justify-center text-center gap-2 ${textMuted}`}>
                <Heart size={48} strokeWidth={1} />
                <p className={`font-medium ${textSecondary}`}>Your wishlist is empty</p>
              </div>
            ) : (
              wishlistProducts.map((product) => (
                <div key={product.id} className={`flex gap-4 p-3 ${surface} rounded-2xl items-center shadow-md`}>
                  <img src={getCurrentImage(product)} alt={product.name} className="w-20 h-20 object-cover rounded-xl bg-slate-200 shrink-0" />

                  <div className="flex-1 min-w-0">
                    <h4 className={`font-bold text-sm truncate ${textPrimary}`}>{product.name}</h4>
                    <p className={`text-xs mb-2 ${textMuted}`}>${formatPrice(product.price)}</p>

                    <button
                      onClick={() => { addToCart(product, getProductSize(product)); toggleLike(product.id); }}
                      className={`text-xs font-semibold px-3 py-1.5 rounded-xl active:scale-95 transition-transform duration-200 ${primaryBtn}`}
                    >
                      Move to Cart
                    </button>
                  </div>

                  <button
                    onClick={() => toggleLike(product.id)}
                    aria-label="Remove from wishlist"
                    className="text-slate-400 hover:text-red-500 p-2 active:scale-90 transition-colors duration-200"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className={`hidden md:flex fixed inset-y-0 right-0 z-50 justify-end pointer-events-none transition-all duration-500 ease-out ${activeMenu === "cart" ? "visible" : "invisible"}`}>
        <div
          className={`pointer-events-auto w-[400px] max-w-[92vw] h-full ${surface} shadow-2xl flex flex-col p-6 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] motion-reduce:transition-none origin-right
          ${activeMenu === "cart" ? "translate-x-0 opacity-100 rounded-l-[2.5rem]" : "translate-x-full opacity-0 rounded-l-[100px]"}`}
        >
          <div className={`flex items-center justify-between pb-4 border-b ${isDark ? 'border-white/10' : 'border-slate-100'}`}>
            <div className="flex items-center gap-2">
              <ShoppingBag size={20} className={textPrimary} />
              <h2 className={`text-xl font-bold ${textPrimary}`}>Your Cart</h2>
              <span className={`text-xs font-bold ${isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-600'} px-2 py-1 rounded-full`}>{totalCartCount}</span>
            </div>
            <button
              onClick={() => setActiveMenu(null)}
              aria-label="Close cart"
              className={`w-8 h-8 rounded-full flex items-center justify-center active:scale-90 transition-transform duration-200 ${closeBtnCls}`}
            >
              <X size={16} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-4 space-y-4">
            {cartItems.length === 0 ? (
              <div className={`h-full flex flex-col items-center justify-center text-center gap-2 ${textMuted}`}>
                <ShoppingBag size={48} strokeWidth={1} />
                <p className={`font-medium ${textSecondary}`}>Your cart is empty</p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={`${item.id}-${item.selectedSize}`} className={`flex gap-4 p-3 ${surface} rounded-2xl items-center shadow-md`}>
                  <img src={getCurrentImage(item)} alt={item.name} className="w-20 h-20 object-cover rounded-xl bg-slate-200 shrink-0" />

                  <div className="flex-1 min-w-0">
                    <h4 className={`font-bold text-sm truncate ${textPrimary}`}>{item.name}</h4>
                    <span className={`inline-block text-[10px] font-semibold ${isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-200 text-slate-700'} px-2 py-0.5 rounded-md mb-1`}>
                      Size: {item.selectedSize}
                    </span>
                    <p className={`text-xs mb-2 ${textMuted}`}>${formatPrice(item.price)}</p>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.selectedSize, -1)}
                        aria-label="Decrease quantity"
                        className={`w-6 h-6 border ${dropdownBorder} rounded-lg flex items-center justify-center active:scale-90 shadow-sm transition-transform duration-150 ${isDark ? 'bg-slate-800' : 'bg-white'}`}
                      >
                        <Minus size={12} />
                      </button>
                      <span className={`text-xs font-bold w-4 text-center ${textPrimary}`}>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.selectedSize, 1)}
                        aria-label="Increase quantity"
                        className={`w-6 h-6 border ${dropdownBorder} rounded-lg flex items-center justify-center active:scale-90 shadow-sm transition-transform duration-150 ${isDark ? 'bg-slate-800' : 'bg-white'}`}
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
            <div className={`pt-4 border-t space-y-4 ${isDark ? 'border-white/10' : 'border-slate-100'}`}>
              <div className={`flex justify-between items-center ${textSecondary}`}>
                <span className="text-sm font-medium">Subtotal</span>
                <span className={`text-xl font-bold ${textPrimary}`}>${formatPrice(cartSubtotal)}</span>
              </div>
              <button
                onClick={() => { setActiveMenu(null); setIsCheckoutOpen(true); }}
                className={`w-full py-4 rounded-2xl font-bold active:scale-95 transition-transform duration-200 shadow-lg flex items-center justify-center gap-2 ${primaryBtn}`}
              >
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
          {mobileNavButtons.map((btn, index) => (
            <button
              key={btn.key}
              onClick={btn.onClick}
              aria-label={btn.label}
              style={{ transitionDelay: isMobileMenuOpen ? `${index * 55}ms` : '0ms' }}
              className={`relative w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                btn.hide
                  ? 'opacity-0 scale-50 pointer-events-none'
                  : `opacity-100 scale-100 active:scale-90 ${btn.highlight ? 'bg-lime-400 text-black' : `${softChrome} border ${dropdownBorder}`}`
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

      <div className={`md:hidden fixed inset-x-0 top-24 z-50 flex justify-center px-4 pointer-events-none transition-all duration-500 ease-out ${activeMenu === 'category' ? 'visible' : 'invisible'}`}>
        <div className={`pointer-events-auto w-full max-w-[340px] ${surface} shadow-2xl overflow-hidden
          transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] motion-reduce:transition-none
          ${activeMenu === 'category' ? 'scale-100 opacity-100 translate-x-0 translate-y-0 rounded-[2rem] p-5' : 'scale-[0.05] opacity-0 translate-x-[40vw] translate-y-4 rounded-[100px] p-0'}`}
        >
          <div className={`flex justify-between items-center mb-4 px-1 transition-all duration-500 ease-out ${activeMenu === 'category' ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
            <h3 className={`font-bold text-lg ${textPrimary}`}>Categories</h3>
            <button onClick={() => setActiveMenu(null)} aria-label="Close categories" className={`w-8 h-8 rounded-full flex items-center justify-center active:scale-90 transition-colors duration-200 ${closeBtnCls}`}>
              <X size={16} />
            </button>
          </div>

          <div className="flex flex-wrap gap-2 max-h-[55vh] overflow-y-auto pr-1 pb-2">
            {categories.map((cat, index) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setActiveMenu(null);
                }}
                style={{ transitionDelay: activeMenu === 'category' ? `${index * 30}ms` : '0ms' }}
                className={`px-4 py-2 rounded-xl text-sm font-medium active:scale-95 shadow-sm
                  transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]
                  ${selectedCategory === cat ? chipActive : chipInactive}
                  ${activeMenu === 'category' ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-90'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className={`md:hidden fixed inset-x-0 top-24 z-50 flex justify-center px-4 pointer-events-none transition-all duration-500 ease-out ${activeMenu === 'search' ? 'visible' : 'invisible'}`}>
        <div className={`pointer-events-auto w-full max-w-[300px] ${surface} shadow-2xl overflow-hidden
          transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] motion-reduce:transition-none
          ${activeMenu === 'search' ? 'scale-100 opacity-100 translate-x-0 translate-y-0 rounded-[2rem] p-4' : 'scale-[0.05] opacity-0 translate-x-[40vw] translate-y-16 rounded-[100px] p-0'}`}>

          <div className={`relative flex items-center transition-all duration-500 ease-out ${activeMenu === 'search' ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-95'}`}>
            <Search className={`absolute left-4 ${textMuted}`} size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className={`w-full ${inputCls} rounded-2xl py-3 pl-12 pr-10 focus:outline-none focus:ring-2 transition-all duration-200 shadow-inner`}
            />
            <button onClick={() => setActiveMenu(null)} aria-label="Close search" className={`absolute right-4 active:scale-90 transition-colors duration-200 ${textMuted}`}>
              <X size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className={`md:hidden fixed inset-x-0 top-24 z-50 flex justify-center px-4 pointer-events-none transition-all duration-500 ease-out ${activeMenu === 'wishlist' ? 'visible' : 'invisible'}`}>
        <div className={`pointer-events-auto w-full max-w-[380px] max-h-[70vh] ${surface} shadow-2xl overflow-hidden flex flex-col
          transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] motion-reduce:transition-none
          ${activeMenu === 'wishlist' ? 'scale-100 opacity-100 translate-y-0 rounded-[2rem] p-5' : 'scale-[0.05] opacity-0 translate-y-4 rounded-[100px] p-0'}`}>

          <div className={`flex items-center justify-between mb-4 px-1 shrink-0 transition-all duration-500 ease-out ${activeMenu === 'wishlist' ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
            <div className="flex items-center gap-2">
              <Heart size={20} className="text-red-500 fill-red-500" />
              <h3 className={`font-bold text-lg ${textPrimary}`}>Wishlist</h3>
              <span className="text-xs font-bold bg-red-100 text-red-600 px-2 py-1 rounded-full">{wishlistProducts.length}</span>
            </div>
            <button onClick={() => setActiveMenu(null)} aria-label="Close wishlist" className={`w-8 h-8 rounded-full flex items-center justify-center active:scale-90 transition-colors duration-200 ${closeBtnCls}`}>
              <X size={16} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-3 pr-1">
            {wishlistProducts.length === 0 ? (
              <div className={`h-full flex flex-col items-center justify-center text-center gap-2 py-10 ${textMuted}`}>
                <Heart size={40} strokeWidth={1} />
                <p className={`font-medium text-sm ${textSecondary}`}>Your wishlist is empty</p>
              </div>
            ) : (
              wishlistProducts.map((product) => (
                <div key={product.id} className={`flex gap-3 p-3 ${surface} rounded-2xl items-center shadow-sm`}>
                  <img src={getCurrentImage(product)} alt={product.name} className="w-16 h-16 object-cover rounded-xl bg-slate-200 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h4 className={`font-bold text-sm truncate ${textPrimary}`}>{product.name}</h4>
                    <p className={`text-xs mb-2 ${textMuted}`}>${formatPrice(product.price)}</p>
                    <button
                      onClick={() => { addToCart(product, getProductSize(product)); toggleLike(product.id); }}
                      className={`text-xs font-semibold px-3 py-1.5 rounded-xl active:scale-95 transition-transform duration-200 ${primaryBtn}`}
                    >
                      Move to Cart
                    </button>
                  </div>
                  <button onClick={() => toggleLike(product.id)} aria-label="Remove from wishlist" className="text-slate-400 hover:text-red-500 p-2 active:scale-90 transition-colors duration-200">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className={`md:hidden fixed inset-x-0 top-24 z-50 flex justify-center px-4 pointer-events-none transition-all duration-500 ease-out ${activeMenu === 'cart' ? 'visible' : 'invisible'}`}>
        <div className={`pointer-events-auto w-full max-w-[380px] max-h-[70vh] ${surface} shadow-2xl overflow-hidden flex flex-col
          transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] motion-reduce:transition-none
          ${activeMenu === 'cart' ? 'scale-100 opacity-100 translate-y-0 rounded-[2rem] p-5' : 'scale-[0.05] opacity-0 translate-y-4 rounded-[100px] p-0'}`}>

          <div className={`flex items-center justify-between mb-4 px-1 shrink-0 transition-all duration-500 ease-out ${activeMenu === 'cart' ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
            <div className="flex items-center gap-2">
              <ShoppingBag size={20} className={textPrimary} />
              <h3 className={`font-bold text-lg ${textPrimary}`}>Your Cart</h3>
              <span className={`text-xs font-bold ${isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-600'} px-2 py-1 rounded-full`}>{totalCartCount}</span>
            </div>
            <button onClick={() => setActiveMenu(null)} aria-label="Close cart" className={`w-8 h-8 rounded-full flex items-center justify-center active:scale-90 transition-colors duration-200 ${closeBtnCls}`}>
              <X size={16} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-3 pr-1">
            {cartItems.length === 0 ? (
              <div className={`h-full flex flex-col items-center justify-center text-center gap-2 py-10 ${textMuted}`}>
                <ShoppingBag size={40} strokeWidth={1} />
                <p className={`font-medium text-sm ${textSecondary}`}>Your cart is empty</p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={`${item.id}-${item.selectedSize}`}
                  className={`flex gap-3 p-3 ${surface} rounded-2xl items-center shadow-sm transition-all duration-500 ease-out ${activeMenu === 'cart' ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-90'}`}
                >
                  <img src={getCurrentImage(item)} alt={item.name} className="w-16 h-16 object-cover rounded-xl bg-slate-200 shrink-0" />

                  <div className="flex-1 min-w-0">
                    <h4 className={`font-bold text-sm truncate ${textPrimary}`}>{item.name}</h4>
                    <span className={`inline-block text-[10px] font-semibold ${isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-200 text-slate-700'} px-2 py-0.5 rounded-md mb-1`}>
                      Size: {item.selectedSize}
                    </span>
                    <p className={`text-xs mb-2 ${textMuted}`}>${formatPrice(item.price)}</p>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.selectedSize, -1)}
                        aria-label="Decrease quantity"
                        className={`w-6 h-6 border ${dropdownBorder} rounded-lg flex items-center justify-center active:scale-90 shadow-sm transition-transform duration-150 ${isDark ? 'bg-slate-800' : 'bg-white'}`}
                      >
                        <Minus size={12} />
                      </button>
                      <span className={`text-xs font-bold w-4 text-center ${textPrimary}`}>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.selectedSize, 1)}
                        aria-label="Increase quantity"
                        className={`w-6 h-6 border ${dropdownBorder} rounded-lg flex items-center justify-center active:scale-90 shadow-sm transition-transform duration-150 ${isDark ? 'bg-slate-800' : 'bg-white'}`}
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
            <div className={`pt-4 mt-2 border-t space-y-3 shrink-0 transition-all duration-500 ease-out ${isDark ? 'border-white/10' : 'border-slate-100'} ${activeMenu === 'cart' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <div className={`flex justify-between items-center ${textSecondary}`}>
                <span className="text-sm font-medium">Subtotal</span>
                <span className={`text-lg font-bold ${textPrimary}`}>${formatPrice(cartSubtotal)}</span>
              </div>
              <button
                onClick={() => { setActiveMenu(null); setIsCheckoutOpen(true); }}
                className={`w-full py-3.5 rounded-2xl font-bold active:scale-95 transition-transform duration-200 shadow-lg flex items-center justify-center gap-2 ${primaryBtn}`}
              >
                Checkout Now
              </button>
            </div>
          )}
        </div>
      </div>

      <main className="pt-24 md:pt-48 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">

        {(selectedCategory !== "All" || searchQuery !== "") && (
          <div className="flex flex-wrap items-center justify-center gap-2 mb-6 w-full">
            <span className={`text-xs font-semibold ${textMuted}`}>Filters:</span>
            {selectedCategory !== "All" && (
              <span className="inline-flex items-center gap-1.5 text-xs bg-lime-200 text-lime-900 px-3 py-1 rounded-full font-medium shadow-sm">
                {selectedCategory}
                <X size={12} className="cursor-pointer hover:opacity-75 active:scale-90 transition-transform duration-150" onClick={() => setSelectedCategory("All")} />
              </span>
            )}
            {searchQuery && (
              <span className={`inline-flex items-center gap-1.5 text-xs py-1 px-3 rounded-full font-medium shadow-sm ${isDark ? 'bg-slate-800 text-slate-200' : 'bg-slate-200 text-slate-800'}`}>
                {searchQuery}
                <X size={12} className="cursor-pointer hover:opacity-75 active:scale-90 transition-transform duration-150" onClick={() => setSearchQuery("")} />
              </span>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 justify-items-center">
          {filteredProducts.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center text-center py-20 gap-3">
              <Search size={44} strokeWidth={1} className={textMuted} />
              <p className={`font-semibold ${textSecondary}`}>No products found</p>
              <p className={`text-sm max-w-xs ${textMuted}`}>Try a different search term or category to find what you are looking for.</p>
              <button onClick={resetFilters} className={`mt-2 px-5 py-2.5 rounded-xl text-sm font-medium active:scale-95 transition-transform duration-200 ${primaryBtn}`}>
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
                  className={`group w-full max-w-[380px] ${surface} ${surfaceHover} rounded-[2.5rem] p-3 sm:p-4 shadow-[0_20px_40px_rgb(0,0,0,0.03)] transition-all duration-500`}
                >
                  <div className={`relative w-full h-60 sm:h-72 md:h-64 lg:h-72 ${isDark ? 'bg-slate-800/50' : 'bg-slate-100/50'} rounded-[2rem] overflow-hidden mb-5 flex items-center justify-center`}>
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

                    {product.images.length > 1 && (
                      <>
                        <button
                          onClick={(e) => prevImage(product.id, product.images.length, e)}
                          aria-label="Previous image"
                          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white/60 backdrop-blur-md rounded-full flex items-center justify-center shadow-md text-slate-600 hover:text-black hover:bg-white active:scale-90 opacity-0 group-hover:opacity-100 transition-all duration-300"
                        >
                          <ChevronLeft size={16} />
                        </button>
                        <button
                          onClick={(e) => nextImage(product.id, product.images.length, e)}
                          aria-label="Next image"
                          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white/60 backdrop-blur-md rounded-full flex items-center justify-center shadow-md text-slate-600 hover:text-black hover:bg-white active:scale-90 opacity-0 group-hover:opacity-100 transition-all duration-300"
                        >
                          <ChevronRight size={16} />
                        </button>
                      </>
                    )}

                    <img
                      src={getCurrentImage(product)}
                      alt={product.name}
                      className="w-full h-full object-cover rounded-[2rem] group-hover:scale-105 transition-all duration-700 ease-out"
                    />
                  </div>

                  <div className="px-1 sm:px-2">
                    <div className={`inline-block px-3 py-1 text-xs font-bold rounded-full mb-3 shadow-sm ${primaryBtn}`}>
                      -{getDiscount(product)}%
                    </div>

                    <div className="flex justify-between items-start gap-3 mb-1">
                      <h3 className={`text-base sm:text-lg font-bold truncate ${textPrimary}`}>{product.name}</h3>
                      <div className="text-right shrink-0">
                        <p className={`text-xs line-through ${textMuted}`}>${formatPrice(product.originalPrice)}</p>
                        <p className={`text-base sm:text-lg font-bold ${textPrimary}`}>${formatPrice(product.price)}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-6">
                      <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-[10px] text-white font-bold shrink-0">
                        {product.brand.charAt(0)}
                      </div>
                      <span className={`text-sm font-medium truncate ${textSecondary}`}>{product.brand}</span>
                    </div>

                    <div className="flex gap-1.5 sm:gap-2 relative">
                      <div className="flex-1 min-w-0 relative">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenSizeMenuId(openSizeMenuId === product.id ? null : product.id);
                          }}
                          aria-label="Select size"
                          className={`w-full border ${dropdownBorder} rounded-2xl py-3 px-3 flex justify-between items-center gap-1 text-xs font-medium active:scale-[0.98] transition-all duration-300 shadow-sm ${isDark ? 'bg-slate-800/60 hover:bg-slate-800' : 'bg-white/50 hover:bg-white'}`}
                        >
                          <span className={`truncate ${textSecondary}`}>
                            Size: <strong className={textPrimary}>{size}</strong>
                          </span>
                          <ChevronDown size={16} className={`shrink-0 transition-transform duration-300 ${openSizeMenuId === product.id ? 'rotate-180' : ''}`} />
                        </button>

                        <div
                          onClick={(e) => e.stopPropagation()}
                          className={`absolute bottom-full mb-2 left-1/2 -translate-x-1/2 min-w-full w-max max-w-[240px] ${isDark ? 'bg-slate-800/95 border-white/10' : 'bg-white/90 border-white/80'} backdrop-blur-xl border rounded-2xl p-1.5 shadow-2xl z-30 flex flex-wrap justify-center gap-1.5 origin-bottom transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
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
                                size === s ? chipActive : `${textSecondary} hover:bg-lime-100 hover:text-slate-900`
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
                        className={`w-11 shrink-0 border ${dropdownBorder} rounded-2xl flex items-center justify-center active:scale-90 transition-all duration-300 shadow-sm ${isDark ? 'bg-slate-800/60 hover:bg-slate-800 text-slate-300' : 'bg-white/50 hover:bg-white text-slate-600'}`}
                      >
                        <Maximize size={18} />
                      </button>

                      <button
                        onClick={() => addToCart(product, size)}
                        className={`flex-[1.2] min-w-0 rounded-2xl flex items-center justify-center gap-1 text-xs font-medium active:scale-95 transition-all duration-300 shadow-lg px-2 ${primaryBtn}`}
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
        onClick={closeCheckout}
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] motion-reduce:transition-none
        ${isCheckoutOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`${surface} w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none
          ${isCheckoutOpen ? 'opacity-100 scale-100 translate-y-0 rounded-[2rem] sm:rounded-[2.5rem]' : 'opacity-0 scale-90 translate-y-4 rounded-[3rem]'}`}
        >
          <button onClick={closeCheckout} aria-label="Close checkout" className={`absolute top-6 right-6 w-9 h-9 rounded-full flex items-center justify-center active:scale-90 transition-transform duration-200 ${closeBtnCls}`}>
            <X size={16} />
          </button>

          {checkoutStep === "form" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <form onSubmit={handleCompleteOrder} className="space-y-3">
                <h3 className={`font-bold ${textPrimary}`}>Checkout Details</h3>
                <input type="email" required placeholder="Email" className={`w-full ${inputCls} rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2`} />
                <input type="text" required placeholder="Address" className={`w-full ${inputCls} rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2`} />
                <input type="text" required placeholder="Card Number" className={`w-full ${inputCls} rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2`} />
                <button type="submit" className={`w-full py-3 rounded-xl font-bold mt-2 active:scale-95 transition-all duration-200 ${primaryBtn}`}>Pay ${formatPrice(orderTotal)}</button>
              </form>

              <div className={`${surface} p-4 rounded-2xl flex flex-col justify-between`}>
                <div>
                  <h4 className={`font-bold text-sm mb-3 ${textPrimary}`}>Order Summary</h4>
                  <form onSubmit={handleApplyCoupon} className="flex gap-2 mb-3">
                    <input type="text" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} placeholder="Coupon (NEXUS10)" className={`w-full ${inputCls} rounded-xl px-3 py-1.5 text-xs focus:outline-none`} />
                    <button type="submit" className={`text-xs px-3 py-1.5 rounded-xl font-bold active:scale-95 transition-all ${primaryBtn}`}>Apply</button>
                  </form>
                  {couponError && <p className="text-[10px] text-red-500 mb-2">{couponError}</p>}
                  <div className={`space-y-1 text-xs border-t pt-2 ${textSecondary} ${isDark ? 'border-white/10' : 'border-slate-200/60'}`}>
                    <div className="flex justify-between"><span>Subtotal</span><span>${formatPrice(cartSubtotal)}</span></div>
                    <div className="flex justify-between"><span>Shipping</span><span>${formatPrice(shippingFee)}</span></div>
                    <div className="flex justify-between"><span>Tax</span><span>${formatPrice(taxAmount)}</span></div>
                  </div>
                </div>
                <div className={`flex justify-between items-center border-t pt-2 font-bold text-base ${textPrimary} ${isDark ? 'border-white/10' : 'border-slate-200/60'}`}>
                  <span>Total</span><span>${formatPrice(orderTotal)}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 space-y-3">
              <CheckCircle className="text-lime-500 w-12 h-12 mx-auto" />
              <h2 className={`text-xl font-bold ${textPrimary}`}>Order Confirmed!</h2>
              <button onClick={closeCheckout} className={`px-6 py-2 rounded-xl text-sm font-bold active:scale-95 transition-all ${primaryBtn}`}>Close</button>
            </div>
          )}
        </div>
      </div>

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
          className={`${surface} w-full max-w-md sm:max-w-lg md:max-w-2xl max-h-[85vh] sm:max-h-[90vh] overflow-y-auto p-5 sm:p-6 shadow-2xl relative flex flex-col md:flex-row gap-5 sm:gap-6 transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none ${
            isQuickViewOpen ? 'opacity-100 scale-100 translate-y-0 rounded-[2rem] sm:rounded-[2.5rem]' : 'opacity-0 scale-90 translate-y-4 rounded-[3rem]'
          }`}
        >
          <button
            onClick={() => setQuickViewProduct(null)}
            aria-label="Close quick view"
            className={`absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center font-bold active:scale-90 transition-transform duration-200 z-10 ${closeBtnCls}`}
          >
            <X size={14} />
          </button>

          <div className={`w-full md:w-1/2 h-48 sm:h-56 md:h-auto ${isDark ? 'bg-slate-800' : 'bg-slate-100'} rounded-2xl sm:rounded-3xl overflow-hidden shadow-inner shrink-0`}>
            <img src={getCurrentImage(quickViewData)} alt={quickViewData.name} className="w-full h-full object-cover" />
          </div>

          <div className="w-full md:w-1/2 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-3">
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${quickViewData.inStock ? 'text-lime-600 bg-lime-100' : 'text-red-500 bg-red-100'}`}>
                  {quickViewData.inStock ? 'In stock' : 'Out of stock'}
                </span>
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${primaryBtn}`}>
                  -{getDiscount(quickViewData)}%
                </span>
              </div>
              <h2 className={`text-xl sm:text-2xl font-bold mb-1 ${textPrimary}`}>{quickViewData.name}</h2>
              <p className={`text-sm mb-4 leading-relaxed ${textSecondary}`}>{quickViewData.description}</p>

              <div className="mb-4">
                <span className={`text-xs font-semibold block mb-2 ${textMuted}`}>Select Size:</span>
                <div className="flex flex-wrap gap-2">
                  {quickViewData.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => selectProductSize(quickViewData.id, s)}
                      className={`px-3 py-1.5 text-xs font-bold rounded-xl border whitespace-nowrap transition-all duration-200 ${
                        getProductSize(quickViewData) === s ? `${chipActive} border-transparent` : `${dropdownBorder} ${textSecondary} hover:bg-lime-100`
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-baseline gap-3 mb-6">
                <span className={`text-xl sm:text-2xl font-black ${textPrimary}`}>${formatPrice(quickViewData.price)}</span>
                <span className={`text-sm line-through ${textMuted}`}>${formatPrice(quickViewData.originalPrice)}</span>
              </div>
            </div>

            <button
              onClick={() => { addToCart(quickViewData, getProductSize(quickViewData)); setQuickViewProduct(null); }}
              className={`w-full rounded-2xl flex items-center justify-center gap-2 font-medium py-3.5 active:scale-95 transition-transform duration-200 shadow-lg ${primaryBtn}`}
            >
              + Add to Cart
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}