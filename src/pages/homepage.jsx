import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from "react-router-dom";
import Header from '../components/header';

const GridDots = () => (
  <svg
    className="absolute inset-0 w-full h-full"
    style={{ opacity: 0.25 }}
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
  const navigate = useNavigate();   // 👈 Initialize navigation

  const handleGetStarted = () => {
    navigate("/taskoverview");     // 👈 Redirect path
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-gray-100 overflow-x-hidden relative">
      
      <GridDots />
      <Header/>

      <main className="relative z-10 pt-24 pb-32 max-w-4xl mx-auto px-6">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h2 
            className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-gray-100 via-white to-gray-300 bg-clip-text text-transparent mb-8 leading-tight tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Stay Focused.<br />Get Things Done.
          </motion.h2>

          <motion.p 
            className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-12 leading-relaxed px-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Focusly helps you organize your work, study, and personal tasks 
            in one simple and distraction-free space.
          </motion.p>

          <motion.button
            onClick={handleGetStarted}   // 👈 Add this
            className="group bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-black font-semibold px-12 py-5 rounded-xl text-lg shadow-2xl shadow-green-500/25 hover:shadow-green-500/40 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 relative overflow-hidden"
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