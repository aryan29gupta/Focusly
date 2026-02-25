import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const Header = ({ children }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b"
      style={{
        backgroundColor: isDark ? "rgba(15,23,42,0.85)" : "rgba(255,255,255,0.85)",
        borderColor: isDark ? "rgba(51,65,85,0.5)" : "rgba(203,213,225,0.8)",
      }}
    >
      <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <motion.div
            className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-black font-bold text-sm mr-3 shadow-lg"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4, type: "spring" }}
          >
            ⚡
          </motion.div>
          <motion.h1
            className="text-2xl font-bold tracking-tight"
            style={{ color: isDark ? "#f1f5f9" : "#0f172a" }}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Focusly
          </motion.h1>
        </div>

        {/* Right side: extra buttons + theme toggle */}
        <div className="flex items-center gap-3">
          {children}

          {/* Theme Toggle */}
          <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="relative w-14 h-7 rounded-full border focus:outline-none"
            style={{
              backgroundColor: isDark ? "#1e293b" : "#e2e8f0",
              borderColor: isDark ? "#475569" : "#cbd5e1",
            }}
            aria-label="Toggle theme"
          >
            <span className="absolute left-1.5 top-1/2 -translate-y-1/2 text-xs pointer-events-none">🌙</span>
            <span className="absolute right-1.5 top-1/2 -translate-y-1/2 text-xs pointer-events-none">☀️</span>
            <motion.div
              className="absolute top-0.5 w-6 h-6 rounded-full shadow-md"
              animate={{ x: isDark ? 1 : 28 }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
              style={{ backgroundColor: isDark ? "#22c55e" : "#f59e0b" }}
            />
          </motion.button>
        </div>
      </nav>
    </header>
  );
};

export default Header;