import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ZoomSection } from './ZoomSection';
import { GlassNavbar } from './GlassNavbar';
import { CapabilitiesShowcase } from './CapabilitiesShowcase';
import Projects from './Projects';
import { PremiumFooter } from './PremiumFooter';

export default function Home() {
  const { hash } = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(hash === '#projects');

  useEffect(() => {
    if (hash === '#projects') {
      // 600ms buffer to ensure ZoomSection has completed its `isMeasured` 
      // state update and GSAP has fully injected the pin-spacer div.
      const timer = setTimeout(() => {
        // Force refresh GSAP so offsets are accurate
        if ((window as any).ScrollTrigger) {
          (window as any).ScrollTrigger.refresh();
        }

        requestAnimationFrame(() => {
          const el = document.getElementById('projects');
          if (el) {
            if ((window as any).lenis) {
              (window as any).lenis.scrollTo(el, { immediate: true });
            } else {
              el.scrollIntoView();
            }
          }

          // Add a tiny delay after scrolling before lifting the loader
          setTimeout(() => {
            setIsTransitioning(false);
          }, 150);
        });
      }, 600);

      return () => clearTimeout(timer);
    }
  }, [hash]);

  return (
    <div className="w-full relative">
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="fixed inset-0 z-[9999] bg-[#0b0b0b] flex flex-col items-center justify-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 border-2 border-white/10 border-t-cyan-400 rounded-full"
            />
            <div className="mt-6 text-[#23abe6]/70 font-display text-[10px] uppercase tracking-[0.3em] font-semibold animate-pulse">
              Restoring Viewport
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="w-full min-h-screen root-bg relative flex flex-col items-center">
        {/* Continuous Flowing Ambient Background Glows */}
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
          {/* Section 1 (Hero/Top) - Left */}
          <div className="absolute -left-[400px] w-[800px] h-[800px] rounded-full pointer-events-none" style={{ top: '5vh', background: 'rgba(35, 171, 230, 0.25)', filter: 'blur(120px)' }} />
          {/* Section 2 - Right */}
          <div className="absolute -right-[450px] w-[900px] h-[900px] rounded-full pointer-events-none" style={{ top: '150vh', background: 'rgba(35, 171, 230, 0.20)', filter: 'blur(140px)' }} />
          {/* Section 3 - Left */}
          <div className="absolute -left-[375px] w-[750px] h-[750px] rounded-full pointer-events-none" style={{ top: '300vh', background: 'rgba(35, 171, 230, 0.22)', filter: 'blur(130px)' }} />
          {/* Section 4 - Right */}
          <div className="absolute -right-[500px] w-[1000px] h-[1000px] rounded-full pointer-events-none" style={{ top: '450vh', background: 'rgba(35, 171, 230, 0.18)', filter: 'blur(150px)' }} />
          {/* Section 5 - Left */}
          <div className="absolute -left-[350px] w-[700px] h-[700px] rounded-full pointer-events-none" style={{ top: '600vh', background: 'rgba(35, 171, 230, 0.25)', filter: 'blur(120px)' }} />
          {/* Section 6 - Right */}
          <div className="absolute -right-[425px] w-[850px] h-[850px] rounded-full pointer-events-none" style={{ top: '750vh', background: 'rgba(35, 171, 230, 0.20)', filter: 'blur(140px)' }} />
          {/* Section 7 - Left */}
          <div className="absolute -left-[375px] w-[750px] h-[750px] rounded-full pointer-events-none" style={{ top: '900vh', background: 'rgba(35, 171, 230, 0.22)', filter: 'blur(130px)' }} />
        </div>

        <h1 className="sr-only">SINC Research - Engineering Maritime Domain Awareness & Advanced Sensory Systems</h1>
        <GlassNavbar />

        <main className="w-full flex flex-col items-center">
          {/* 1. HERO & LOGO ZOOM SECTION */}
          <section id="home" className="w-full">
          <ZoomSection />
        </section>

        {/* Padded container for the rest of the sections */}
        <div className="w-full p-3 md:p-4 lg:p-5 flex flex-col items-center transparent-bg invert-text relative z-10">

          {/* NEW CAPABILITIES SHOWCASE */}
          <div id="services" className="w-full scroll-mt-24">
            <div id="research" className="w-full scroll-mt-24">
              <CapabilitiesShowcase />
            </div>
          </div>

        </div>

        {/* PROJECTS SHOWCASE (Before Footer) */}
        <Projects />
        </main>

        {/* Spacer below About Us section (Projects) */}
        <div className="w-full h-24 md:h-40 bg-[#050505]"></div>

        {/* Footer (Dark Theme Continued) */}
        <PremiumFooter />

        <style>{`
          .root-bg {
            background: #ffffff !important;
          }
          @keyframes slow-float {
            0%, 100% { transform: translateY(0) scale(1); }
            50% { transform: translateY(-3vh) scale(1.04); }
          }
          @keyframes slow-float-reverse {
            0%, 100% { transform: translateY(0) scale(1.04); }
            50% { transform: translateY(3vh) scale(1); }
          }
          .animate-float-slow-1 {
            animation: slow-float 25s ease-in-out infinite;
          }
          .animate-float-slow-2 {
            animation: slow-float-reverse 30s ease-in-out infinite;
          }
          .transparent-bg {
            background: transparent !important;
          }
          
          .invert-text {
            color: #111827 !important;
          }
          .invert-text .text-white {
            color: #111827 !important;
          }
          .invert-text .text-white\\/80,
          .invert-text .text-white\\/70,
          .invert-text .text-white\\/60,
          .invert-text .text-white\\/50,
          .invert-text .text-white\\/40,
          .invert-text .text-white\\/30 {
            color: #4b5563 !important;
          }
          .invert-text .text-[#23abe6] {
            color: #23abe6 !important;
          }
          .invert-text .text-[#23abe6] {
            color: #23abe6 !important;
          }
          .invert-text .text-gray-400 {
            color: #4b5563 !important;
          }
          .invert-text .bg-white\\/\\[0\\.02\\],
          .invert-text .bg-white\\/\\[0\\.01\\] {
            background-color: rgba(255, 255, 255, 0.6) !important;
            box-shadow: 0 4px 20px rgba(0,0,0,0.04) !important;
          }
          .invert-text .border-white\\/\\[0\\.06\\],
          .invert-text .border-white\\/12,
          .invert-text .border-white\\/10,
          .invert-text .border-white\\/\\[0\\.03\\],
          .invert-text .border-white\\/\\[0\\.04\\] {
            border-color: rgba(0, 0, 0, 0.08) !important;
          }
          .invert-text .border-t {
            border-color: rgba(0, 0, 0, 0.05) !important;
          }
          .invert-text .bg-gradient-to-br {
            background: linear-gradient(to bottom right, rgba(255,255,255,0.8), rgba(255,255,255,0.2)) !important;
          }
          .invert-text .bg-gradient-to-t {
            background: linear-gradient(to top, rgba(255,255,255,0.9), transparent) !important;
          }
          .invert-text a.text-white\\/40 {
            color: #6b7280 !important;
          }
        `}</style>
      </div>
    </div>
  );
}
