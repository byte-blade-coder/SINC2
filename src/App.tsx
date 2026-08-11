import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { MouseParallaxProvider } from './components/MouseParallaxProvider';
import Home from './components/Home';
import ProjectDetail from './components/ProjectDetail';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full relative"
          >
            <Home />
          </motion.div>
        } />
        <Route path="/project/:id" element={
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full relative z-[100]"
          >
            <ProjectDetail />
          </motion.div>
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
    });
    (window as any).lenis = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    // Refresh triggers to ensure correct layout dimensions
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      lenis.destroy();
      delete (window as any).lenis;
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    // Simulate loading time (e.g., waiting for assets or minimum display time)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2800); // 2.8 seconds loading screen
    return () => clearTimeout(timer);
  }, []);

  return (
    <MouseParallaxProvider>
      <ScrollToTop />
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(10px)" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#000000]"
          >
            <div className="relative w-72 h-auto flex flex-col items-center">
              <motion.img
                src="/assets/logo.png"
                alt=""
                className="w-full h-auto"
                animate={{
                  opacity: [0.6, 1, 0.6],
                  scale: [0.98, 1.02, 0.98],
                  filter: [
                    "drop-shadow(0 0 10px rgba(35,171,230,0.2))", 
                    "drop-shadow(0 0 40px rgba(35,171,230,0.6))", 
                    "drop-shadow(0 0 10px rgba(35,171,230,0.2))"
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div 
                className="mt-12 h-[2px] w-56 bg-white/10 rounded-full overflow-hidden"
              >
                <motion.div
                  className="h-full bg-[#23abe6] shadow-[0_0_10px_rgba(35,171,230,0.8)]"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2.5, ease: "easeInOut" }}
                />
              </motion.div>
              <div className="mt-4 text-[#23abe6]/70 font-display text-[10px] uppercase tracking-[0.3em] font-semibold animate-pulse">
                Initializing Systems
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatedRoutes />
    </MouseParallaxProvider>
  );
}
