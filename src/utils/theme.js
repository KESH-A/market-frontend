export const getTheme = (themeMode, designMode) => {
  const isDark = themeMode === "dark";
  const isGlass = designMode === "glass";

  return {
    isDark,
    isGlass,
    pageBg: isDark ? "bg-[#0a0c10]" : "bg-[#f5f7f9]",
    textPrimary: isDark ? "text-slate-100" : "text-slate-800",
    textSecondary: isDark ? "text-slate-300" : "text-slate-600",
    textMuted: isDark ? "text-slate-400" : "text-slate-500",
    surface: isGlass
      ? (isDark ? "glass-surface bg-black/20 border border-white/10" : "glass-surface bg-white/15 border border-white/60")
      : (isDark ? "bg-slate-900/60 backdrop-blur-xl border border-white/10" : "bg-white/40 backdrop-blur-xl border border-white/60"),
    surfaceHover: isGlass
      ? (isDark ? "hover:bg-black/30" : "hover:bg-white/25")
      : (isDark ? "hover:bg-slate-900/70" : "hover:bg-white/60"),
    primaryBtn: isDark ? "bg-lime-400 text-black hover:bg-lime-300" : "bg-black text-white hover:bg-slate-800",
    chipActive: isDark ? "bg-lime-400 text-black" : "bg-black text-white",
    chipInactive: isDark
      ? "bg-slate-800/60 border border-white/10 text-slate-300 hover:bg-lime-500/20 hover:border-lime-500/30"
      : "bg-white/50 border border-slate-100 text-slate-700 hover:bg-lime-100",
    inputCls: isDark
      ? "bg-slate-800/60 border border-white/10 text-slate-100 placeholder-slate-500 focus:ring-lime-400/40"
      : "bg-white/50 border border-slate-200 text-slate-700 placeholder-slate-400 focus:ring-lime-300",
    softChrome: isDark
      ? "bg-slate-800/70 text-slate-300 hover:bg-slate-700 hover:text-white"
      : "bg-white/40 text-slate-600 hover:bg-white hover:text-black",
    closeBtnCls: isDark ? "bg-slate-800 hover:bg-slate-700 text-slate-300" : "bg-slate-100 hover:bg-slate-200 text-slate-600",
    dropdownBorder: isDark ? "border-white/10" : "border-white/60",
    softBorder: isDark ? "border-white/10" : "border-slate-100",
    modalOverlay: isGlass ? "bg-black/30" : "bg-black/40 backdrop-blur-md"
  };
};