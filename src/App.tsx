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
import loaderVideo from './assets/loader video/video.webm';

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
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-end pb-24 bg-[#000000]"
          >
            <video
              src={loaderVideo}
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatedRoutes />
    </MouseParallaxProvider>
  );
}
