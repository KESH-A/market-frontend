import React, { useState, useEffect } from 'react';
import { Home, Grid, Search, Heart, ShoppingBag, Sun, Moon, Sparkles } from 'lucide-react';
import { sampleProduct, categories as initialCategories } from './data/products';
import { getProducts, getCategories } from './services/api';
import { getTheme } from './utils/theme';
import { formatPrice, getDiscount } from './utils/format';
import ThemeFX from './components/ThemeFX';
import Header from './components/Header';
import MobileNavToggle from './components/MobileNavToggle';
import CategoryPanel from './components/CategoryPanel';
import SearchPanel from './components/SearchPanel';
import CartPanel from './components/CartPanel';
import WishlistPanel from './components/WishlistPanel';
import ProductGrid from './components/ProductGrid';
import QuickViewModal from './components/QuickViewModal';
import CheckoutModal from './components/CheckoutModal';
import Loader from './components/Loader';

const loadFromStorage = (key, fallback) => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
};

export default function App() {
  const [productsData, setProductsData] = useState([]);
  const [categories, setCategories] = useState(initialCategories);
  const [isLoading, setIsLoading] = useState(true);

  const [activeMenu, setActiveMenu] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [likedProducts, setLikedProducts] = useState(() => loadFromStorage('nexus_wishlist', {}));
  const [productSizes, setProductSizes] = useState({});
  const [productImageIndexes, setProductImageIndexes] = useState({});
  const [openSizeMenuId, setOpenSizeMenuId] = useState(null);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState("form");
  const [couponCode, setCouponCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [couponError, setCouponError] = useState("");

  const [themeMode, setThemeMode] = useState(() => loadFromStorage('nexus_theme', 'light'));
  const [designMode, setDesignMode] = useState(() => loadFromStorage('nexus_design', 'normal'));
  const [fxStage, setFxStage] = useState("idle");
  const [fxOrigin, setFxOrigin] = useState({ x: 0, y: 0 });
  const [fxColor, setFxColor] = useState("#000000");

  const [cartItems, setCartItems] = useState(() => loadFromStorage('nexus_cart', [{ ...sampleProduct, quantity: 1, selectedSize: "M" }]));

useEffect(() => {
  const fetchData = async () => {
    setIsLoading(true);
    const startTime = Date.now();

    const [fetchedProducts, fetchedCategories] = await Promise.all([
      getProducts(),
      getCategories()
    ]);

    if (fetchedProducts && fetchedProducts.length > 0) {
      setProductsData(fetchedProducts);
    }
    
    if (fetchedCategories && fetchedCategories.length > 0) {
      setCategories(["All", ...fetchedCategories.map(c => c.name || c)]);
    }

    const elapsedTime = Date.now() - startTime;
    const minLoadingTime = 1500; 

    const remainingTime = Math.max(0, minLoadingTime - elapsedTime);

    setTimeout(() => {
      setIsLoading(false);
    }, remainingTime);
  };

  fetchData();
}, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem('nexus_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('nexus_wishlist', JSON.stringify(likedProducts));
  }, [likedProducts]);

  useEffect(() => {
    localStorage.setItem('nexus_theme', JSON.stringify(themeMode));
  }, [themeMode]);

  useEffect(() => {
    localStorage.setItem('nexus_design', JSON.stringify(designMode));
  }, [designMode]);

  const theme = getTheme(themeMode, designMode);

  const filteredProducts = productsData.filter((product) => {
    const name = product.name || product.title || "";
    const brand = product.brand || "";
    const category = product.category || "";

    const matchesSearch = name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getProductSize = (product) => {
    if (!product) return "M";
    const sizes = product.sizes || ["S", "M", "L", "XL"];
    return productSizes[product.id] || sizes[0];
  };

  const selectProductSize = (productId, size) => {
    setProductSizes(prev => ({ ...prev, [productId]: size }));
  };

  const toggleLike = (productId) => {
    setLikedProducts(prev => ({ ...prev, [productId]: !prev[productId] }));
  };

  const getCurrentImage = (product) => {
    if (!product) return "";
    const images = Array.isArray(product.images) && product.images.length > 0 
      ? product.images 
      : [product.image || product.image_url || ""];
    const currentIndex = productImageIndexes[product.id] || 0;
    return images[currentIndex] || images[0] || "";
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
    setActiveMenu(prev => prev === menu ? null : menu);
  };

  const closeMenu = () => setActiveMenu(null);

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
    const sizes = product.sizes || ["S", "M", "L", "XL"];
    const sizeToAdd = size || sizes[0];
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

  const runMorphToggle = (e, color, applyChange) => {
    setFxOrigin({ x: e.clientX, y: e.clientY });
    setFxColor(color);
    setFxStage("cover");
    setTimeout(() => {
      applyChange();
      setFxStage("reveal");
      setTimeout(() => setFxStage("idle"), 550);
    }, 550);
  };

  const handleThemeToggle = (e) => {
    const nextColor = themeMode === "light" ? "#0a0c10" : "#f5f7f9";
    runMorphToggle(e, nextColor, () => setThemeMode(prev => prev === 'light' ? 'dark' : 'light'));
  };

  const handleDesignToggle = (e) => {
    runMorphToggle(e, "#000000", () => setDesignMode(prev => prev === 'normal' ? 'glass' : 'normal'));
  };

  const quickViewData = quickViewProduct || sampleProduct;
  const isQuickViewOpen = quickViewProduct !== null;

  const mobileNavButtons = [
    { key: "home", icon: <Home size={18} />, label: "Home", onClick: () => { resetFilters(); setIsMobileMenuOpen(false); }, hide: false, highlight: false },
    { key: "category", icon: <Grid size={18} />, label: "Categories", onClick: () => setActiveMenu(activeMenu === "category" ? null : "category"), hide: activeMenu === "category", highlight: false },
    { key: "search", icon: <Search size={18} />, label: "Search", onClick: () => setActiveMenu(activeMenu === "search" ? null : "search"), hide: activeMenu === "search", highlight: false },
    { key: "wishlist", icon: <Heart size={18} className={wishlistProducts.length > 0 ? "fill-red-500 text-red-500" : ""} />, label: "Wishlist", onClick: () => setActiveMenu(activeMenu === "wishlist" ? null : "wishlist"), hide: activeMenu === "wishlist", highlight: false, badge: wishlistProducts.length },
    { key: "cart", icon: <ShoppingBag size={18} />, label: "Cart", onClick: () => setActiveMenu(activeMenu === "cart" ? null : "cart"), hide: activeMenu === "cart", highlight: false, badge: totalCartCount },
    { key: "theme", icon: theme.isDark ? <Moon size={18} /> : <Sun size={18} />, label: "Toggle theme", onClick: handleThemeToggle, hide: false, highlight: theme.isDark },
    { key: "glass", icon: <Sparkles size={18} />, label: "Toggle glass mode", onClick: handleDesignToggle, hide: false, highlight: theme.isGlass }
  ];

  if (isLoading) {
  return <Loader theme={theme} text="Loading Nexus Market..." />;
  };

  return (
    <div
      className={`min-h-screen ${theme.pageBg} ${theme.textPrimary} relative overflow-hidden font-sans transition-colors duration-500`}
      style={{ minHeight: '100dvh' }}
      onClick={closeSizeMenus}
    >
      <ThemeFX fxColor={fxColor} fxStage={fxStage} fxOrigin={fxOrigin} />

      <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-lime-200/40 rounded-full mix-blend-multiply filter blur-[80px] opacity-70 pointer-events-none"></div>

      {(isMobileMenuOpen || activeMenu) && (
        <div
          className="fixed inset-0 z-40 bg-black/10 backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] motion-reduce:transition-none"
          style={{ height: '100dvh' }}
          onClick={handleBackdropClick}
        ></div>
      )}

      <Header
        theme={theme}
        activeMenu={activeMenu}
        onToggleMenu={toggleMenu}
        onResetFilters={resetFilters}
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => { setSelectedCategory(cat); closeMenu(); }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        wishlistCount={wishlistProducts.length}
        cartCount={totalCartCount}
        onThemeToggle={handleThemeToggle}
        onDesignToggle={handleDesignToggle}
      />

      <WishlistPanel
        variant="desktop"
        theme={theme}
        wishlistProducts={wishlistProducts}
        formatPrice={formatPrice}
        getCurrentImage={getCurrentImage}
        onMoveToCart={(product) => { addToCart(product, getProductSize(product)); toggleLike(product.id); }}
        onRemove={toggleLike}
        isOpen={activeMenu === "wishlist"}
        onClose={closeMenu}
      />

      <CartPanel
        variant="desktop"
        theme={theme}
        cartItems={cartItems}
        totalCartCount={totalCartCount}
        cartSubtotal={cartSubtotal}
        formatPrice={formatPrice}
        getCurrentImage={getCurrentImage}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
        onCheckout={() => { setActiveMenu(null); setIsCheckoutOpen(true); }}
        isOpen={activeMenu === "cart"}
        onClose={closeMenu}
      />

      <MobileNavToggle
        theme={theme}
        isMobileMenuOpen={isMobileMenuOpen}
        isLoaded={isLoaded}
        onToggleMain={toggleMobileMain}
        buttons={mobileNavButtons}
      />

      <CategoryPanel
        variant="mobile"
        theme={theme}
        categories={categories}
        selectedCategory={selectedCategory}
        onSelect={(cat) => { setSelectedCategory(cat); closeMenu(); }}
        isOpen={activeMenu === "category"}
        onClose={closeMenu}
      />

      <SearchPanel
        variant="mobile"
        theme={theme}
        searchQuery={searchQuery}
        onChange={setSearchQuery}
        isOpen={activeMenu === "search"}
        onClose={closeMenu}
      />

      <WishlistPanel
        variant="mobile"
        theme={theme}
        wishlistProducts={wishlistProducts}
        formatPrice={formatPrice}
        getCurrentImage={getCurrentImage}
        onMoveToCart={(product) => { addToCart(product, getProductSize(product)); toggleLike(product.id); }}
        onRemove={toggleLike}
        isOpen={activeMenu === "wishlist"}
        onClose={closeMenu}
      />

      <CartPanel
        variant="mobile"
        theme={theme}
        cartItems={cartItems}
        totalCartCount={totalCartCount}
        cartSubtotal={cartSubtotal}
        formatPrice={formatPrice}
        getCurrentImage={getCurrentImage}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
        onCheckout={() => { setActiveMenu(null); setIsCheckoutOpen(true); }}
        isOpen={activeMenu === "cart"}
        onClose={closeMenu}
      />

      <ProductGrid
        theme={theme}
        filteredProducts={filteredProducts}
        selectedCategory={selectedCategory}
        searchQuery={searchQuery}
        onClearCategory={() => setSelectedCategory("All")}
        onClearSearch={() => setSearchQuery("")}
        onResetFilters={resetFilters}
        getProductSize={getProductSize}
        likedProducts={likedProducts}
        openSizeMenuId={openSizeMenuId}
        getCurrentImage={getCurrentImage}
        onToggleLike={toggleLike}
        onSelectSize={selectProductSize}
        onToggleSizeMenu={(id) => setOpenSizeMenuId(prev => prev === id ? null : id)}
        onQuickView={setQuickViewProduct}
        onAddToCart={addToCart}
        onPrevImage={prevImage}
        onNextImage={nextImage}
        formatPrice={formatPrice}
        getDiscount={getDiscount}
      />

      <CheckoutModal
        theme={theme}
        isOpen={isCheckoutOpen}
        step={checkoutStep}
        onClose={closeCheckout}
        cartSubtotal={cartSubtotal}
        shippingFee={shippingFee}
        taxAmount={taxAmount}
        orderTotal={orderTotal}
        formatPrice={formatPrice}
        couponCode={couponCode}
        onCouponChange={setCouponCode}
        couponError={couponError}
        onApplyCoupon={handleApplyCoupon}
        onCompleteOrder={handleCompleteOrder}
      />

      <QuickViewModal
        theme={theme}
        isOpen={isQuickViewOpen}
        product={quickViewData}
        size={getProductSize(quickViewData)}
        formatPrice={formatPrice}
        discount={getDiscount(quickViewData)}
        onClose={() => setQuickViewProduct(null)}
        onSelectSize={(s) => selectProductSize(quickViewData.id, s)}
        onAddToCart={() => { addToCart(quickViewData, getProductSize(quickViewData)); setQuickViewProduct(null); }}
        currentImage={getCurrentImage(quickViewData)}
      />
    </div>
  );
}