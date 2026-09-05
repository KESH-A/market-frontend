import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Home, Grid, Search, Heart, ShoppingBag, Sun, Moon, Sparkles } from 'lucide-react';
import { productsData as localProductsData } from './data/products';
import { getTheme } from './utils/theme';
import { formatPrice, getDiscount } from './utils/format';
import { normalizeProduct, normalizeCategory, normalizeLocalProduct, buildLocalCategories } from './utils/normalize';
import { getProducts, getCategories } from './services/api';
import Loader from './components/Loader';
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

const loadFromStorage = (key, fallback) => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
};

export default function App() {
  const [activeMenu, setActiveMenu] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("all");

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isCatalogLoading, setIsCatalogLoading] = useState(true);
  const [usingFallbackCatalog, setUsingFallbackCatalog] = useState(false);

  const [likedProducts, setLikedProducts] = useState(() => loadFromStorage('nexus_wishlist', {}));
  const [productImageIndexes, setProductImageIndexes] = useState({});
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

  const [cartItems, setCartItems] = useState(() => loadFromStorage('nexus_cart', []));

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let cancelled = false;

    const loadCatalog = async () => {
      try {
        const [rawProducts, rawCategories] = await Promise.all([getProducts(), getCategories()]);
        if (cancelled) return;
        setProducts(rawProducts.map(normalizeProduct));
        setCategories(rawCategories.map(normalizeCategory));
        setUsingFallbackCatalog(false);
      } catch {
        if (cancelled) return;
        setProducts(localProductsData.map(normalizeLocalProduct));
        setCategories(buildLocalCategories(localProductsData));
        setUsingFallbackCatalog(true);
      } finally {
        if (!cancelled) setIsCatalogLoading(false);
      }
    };

    loadCatalog();
    return () => { cancelled = true; };
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

  const theme = useMemo(() => getTheme(themeMode, designMode), [themeMode, designMode]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch = product.title.toLowerCase().includes(q) || product.sellerUsername.toLowerCase().includes(q);
      const matchesCategory = selectedCategoryId === "all" || product.categoryId === selectedCategoryId;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, selectedCategoryId]);

  const selectedCategoryName = useMemo(() => {
    if (selectedCategoryId === "all") return null;
    const match = categories.find((c) => c.id === selectedCategoryId);
    return match ? match.name : null;
  }, [categories, selectedCategoryId]);

  const toggleLike = useCallback((productId) => {
    setLikedProducts(prev => ({ ...prev, [productId]: !prev[productId] }));
  }, []);

  const getCurrentImage = useCallback((product) => {
    if (!product.images || product.images.length === 0) return null;
    const currentIndex = productImageIndexes[product.id] || 0;
    return product.images[currentIndex] || product.images[0];
  }, [productImageIndexes]);

  const prevImage = useCallback((productId, totalImages, e) => {
    e.stopPropagation();
    setProductImageIndexes(prev => {
      const current = prev[productId] || 0;
      return { ...prev, [productId]: current === 0 ? totalImages - 1 : current - 1 };
    });
  }, []);

  const nextImage = useCallback((productId, totalImages, e) => {
    e.stopPropagation();
    setProductImageIndexes(prev => {
      const current = prev[productId] || 0;
      return { ...prev, [productId]: (current + 1) % totalImages };
    });
  }, []);

  const toggleMenu = useCallback((menu) => {
    setActiveMenu(prev => prev === menu ? null : menu);
  }, []);

  const closeMenu = useCallback(() => setActiveMenu(null), []);

  const handleBackdropClick = useCallback(() => {
    setActiveMenu((prev) => {
      if (prev) return null;
      return prev;
    });
    setIsMobileMenuOpen((prev) => (prev ? false : prev));
  }, []);

  const addToCart = useCallback((product) => {
    if (!product.inStock) return;
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setActiveMenu("cart");
  }, []);

  const updateQuantity = useCallback((id, delta) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }));
  }, []);

  const removeFromCart = useCallback((id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  }, []);

  const moveToCart = useCallback((product) => {
    if (!product.inStock) return;
    addToCart(product);
    toggleLike(product.id);
  }, [addToCart, toggleLike]);

  const cartSubtotal = useMemo(() => cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0), [cartItems]);
  const totalCartCount = useMemo(() => cartItems.reduce((acc, item) => acc + item.quantity, 0), [cartItems]);
  const shippingFee = cartSubtotal > 150 || cartItems.length === 0 ? 0 : 15.00;
  const discountAmount = (cartSubtotal * appliedDiscount) / 100;
  const taxAmount = (cartSubtotal - discountAmount) * 0.08;
  const orderTotal = cartSubtotal - discountAmount + shippingFee + taxAmount;
  const wishlistProducts = useMemo(() => products.filter(p => likedProducts[p.id]), [products, likedProducts]);

  const handleApplyCoupon = useCallback((e) => {
    e.preventDefault();
    const upper = couponCode.toUpperCase();
    if (upper === "NEXUS10") {
      setAppliedDiscount(10);
      setCouponError("");
    } else if (upper === "COORD090926") {
      setAppliedDiscount(100);
      setCouponError("");
    } else {
      setCouponError("Invalid coupon code");
    }
  }, [couponCode]);

  const handleCompleteOrder = useCallback((e) => {
    e.preventDefault();
    setCheckoutStep("success");
    setCartItems([]);
  }, []);

  const closeCheckout = useCallback(() => {
    setIsCheckoutOpen(false);
    setCheckoutStep("form");
    setCouponCode("");
    setAppliedDiscount(0);
    setCouponError("");
  }, []);

  const openCheckout = useCallback(() => {
    setActiveMenu(null);
    setIsCheckoutOpen(true);
  }, []);

  const toggleMobileMain = useCallback(() => {
    setActiveMenu((prev) => (prev ? null : prev));
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const resetFilters = useCallback(() => {
    setSelectedCategoryId("all");
    setSearchQuery("");
    setActiveMenu(null);
    setIsMobileMenuOpen(false);
  }, []);

  const runMorphToggle = useCallback((e, color, applyChange) => {
    setFxOrigin({ x: e.clientX, y: e.clientY });
    setFxColor(color);
    setFxStage("cover");
    setTimeout(() => {
      applyChange();
      setFxStage("reveal");
      setTimeout(() => setFxStage("idle"), 550);
    }, 550);
  }, []);

  const handleThemeToggle = useCallback((e) => {
    const nextColor = themeMode === "light" ? "#0a0c10" : "#f5f7f9";
    runMorphToggle(e, nextColor, () => setThemeMode(prev => prev === 'light' ? 'dark' : 'light'));
  }, [themeMode, runMorphToggle]);

  const handleDesignToggle = useCallback((e) => {
    runMorphToggle(e, "#000000", () => setDesignMode(prev => prev === 'normal' ? 'glass' : 'normal'));
  }, [runMorphToggle]);

  const [quickViewDisplayProduct, setQuickViewDisplayProduct] = useState(null);

  useEffect(() => {
    if (quickViewProduct) {
      setQuickViewDisplayProduct(quickViewProduct);
    }
  }, [quickViewProduct]);

  const closeQuickView = useCallback(() => setQuickViewProduct(null), []);

  const quickViewIsOpen = quickViewProduct !== null;
  const quickViewDiscount = quickViewDisplayProduct ? getDiscount(quickViewDisplayProduct) : null;
  const quickViewImage = quickViewDisplayProduct ? getCurrentImage(quickViewDisplayProduct) : null;

  const handleQuickViewAddToCart = useCallback(() => {
    if (quickViewProduct) {
      addToCart(quickViewProduct);
      setQuickViewProduct(null);
    }
  }, [quickViewProduct, addToCart]);

  const mobileNavButtons = useMemo(() => ([
    { key: "home", icon: <Home size={18} />, label: "Home", onClick: () => { resetFilters(); setIsMobileMenuOpen(false); }, hide: false, highlight: false },
    { key: "category", icon: <Grid size={18} />, label: "Categories", onClick: () => toggleMenu("category"), hide: activeMenu === "category", highlight: false },
    { key: "search", icon: <Search size={18} />, label: "Search", onClick: () => toggleMenu("search"), hide: activeMenu === "search", highlight: false },
    { key: "wishlist", icon: <Heart size={18} className={wishlistProducts.length > 0 ? "fill-red-500 text-red-500" : ""} />, label: "Wishlist", onClick: () => toggleMenu("wishlist"), hide: activeMenu === "wishlist", highlight: false, badge: wishlistProducts.length },
    { key: "cart", icon: <ShoppingBag size={18} />, label: "Cart", onClick: () => toggleMenu("cart"), hide: activeMenu === "cart", highlight: false, badge: totalCartCount },
    { key: "theme", icon: theme.isDark ? <Moon size={18} /> : <Sun size={18} />, label: "Toggle theme", onClick: handleThemeToggle, hide: false, highlight: theme.isDark },
    { key: "glass", icon: <Sparkles size={18} />, label: "Toggle glass mode", onClick: handleDesignToggle, hide: false, highlight: theme.isGlass }
  ]), [activeMenu, wishlistProducts.length, totalCartCount, theme.isDark, theme.isGlass, handleThemeToggle, handleDesignToggle, resetFilters, toggleMenu]);

  if (isCatalogLoading) {
    return <Loader theme={theme} />;
  }

  return (
    <div
      className={`min-h-screen ${theme.pageBg} ${theme.textPrimary} relative overflow-hidden font-sans transition-colors duration-500`}
      style={{ minHeight: '100dvh' }}
    >
      <ThemeFX fxColor={fxColor} fxStage={fxStage} fxOrigin={fxOrigin} />

      <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-lime-200/40 rounded-full mix-blend-multiply filter blur-[80px] opacity-70 pointer-events-none"></div>

      {usingFallbackCatalog && (
        <div className="fixed top-2 left-1/2 -translate-x-1/2 z-[60] text-[11px] font-medium px-3 py-1.5 rounded-full bg-amber-400 text-black shadow-lg">
          Live catalog unavailable, showing demo products
        </div>
      )}

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
        selectedCategoryId={selectedCategoryId}
        onSelectCategory={(id) => { setSelectedCategoryId(id); closeMenu(); }}
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
        onMoveToCart={moveToCart}
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
        onCheckout={openCheckout}
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
        selectedCategoryId={selectedCategoryId}
        onSelect={(id) => { setSelectedCategoryId(id); closeMenu(); }}
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
        onMoveToCart={moveToCart}
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
        onCheckout={openCheckout}
        isOpen={activeMenu === "cart"}
        onClose={closeMenu}
      />

      <ProductGrid
        theme={theme}
        filteredProducts={filteredProducts}
        selectedCategoryName={selectedCategoryName}
        searchQuery={searchQuery}
        onClearCategory={() => setSelectedCategoryId("all")}
        onClearSearch={() => setSearchQuery("")}
        onResetFilters={resetFilters}
        likedProducts={likedProducts}
        getCurrentImage={getCurrentImage}
        onToggleLike={toggleLike}
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

      {quickViewDisplayProduct && (
        <QuickViewModal
          theme={theme}
          isOpen={quickViewIsOpen}
          product={quickViewDisplayProduct}
          formatPrice={formatPrice}
          discount={quickViewDiscount}
          onClose={closeQuickView}
          onAddToCart={handleQuickViewAddToCart}
          currentImage={quickViewImage}
        />
      )}
    </div>
  );
}