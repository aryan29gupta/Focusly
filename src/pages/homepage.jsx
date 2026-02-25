import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from "react-router-dom";
import Header from '../components/header';
import { useTheme } from '../context/ThemeContext';

const GridDots = ({ isDark }) => (
  <svg
    className="absolute inset-0 w-full h-full"
    style={{ opacity: isDark ? 0.25 : 0.15 }}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <pattern id="dots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
        <circle cx="1.5" cy="1.5" r="1.5" fill="#22C55E" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#dots)" />
  </svg>
);

const FocuslyHomepage = () => {
  const navigate = useNavigate();
  const { isDark } = useTheme();

  return (
    <div
      className="min-h-screen overflow-x-hidden relative transition-colors duration-300"
      style={{
        background: isDark
          ? "linear-gradient(to bottom, #0f172a, #020617, #0f172a)"
          : "linear-gradient(to bottom, #f8fafc, #f1f5f9, #f8fafc)",
        color: isDark ? "#f1f5f9" : "#0f172a",
      }}
    >
      <GridDots isDark={isDark} />
      <Header />

      <main className="relative z-10 pt-24 pb-32 max-w-4xl mx-auto px-6">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h2
            key={isDark ? "dark-heading" : "light-heading"}
            className="text-6xl md:text-7xl font-bold mb-8 leading-tight tracking-tight"
            style={isDark ? {
              background: "linear-gradient(to right, #f1f5f9, #ffffff, #cbd5e1)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            } : {
              color: "#0f172a",
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Stay Focused.<br />Get Things Done.
          </motion.h2>

          <motion.p
            className="text-xl md:text-2xl max-w-2xl mx-auto mb-12 leading-relaxed px-4"
            style={{ color: isDark ? "#94a3b8" : "#475569" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Focusly helps you organize your work, study, and personal tasks
            in one simple and distraction-free space.
          </motion.p>

          <motion.button
            onClick={() => navigate("/taskoverview")}
            className="group bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-black font-semibold px-12 py-5 rounded-xl text-lg shadow-2xl shadow-green-500/25 hover:shadow-green-500/40 transition-all duration-300 relative overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <span className="relative z-10">Get Started</span>
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm scale-110"></div>
          </motion.button>
        </motion.div>
      </main>
    </div>
  );
};

export default FocuslyHomepage;