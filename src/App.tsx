import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MouseParallaxProvider } from './components/MouseParallaxProvider';
import { ZoomSection } from './components/ZoomSection';
import { GlassNavbar } from './components/GlassNavbar';
import { CapabilitiesShowcase } from './components/CapabilitiesShowcase';
import Projects from './components/Projects';
import type { Project } from './components/Projects';
import ProjectDetail from './components/ProjectDetail';
import { Shield } from 'lucide-react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    // Refresh triggers to ensure correct layout dimensions
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      lenis.destroy();
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

  // Entrance variants for subsequent sections
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  return (
    <MouseParallaxProvider>
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
                alt="Loading..."
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
                  className="h-full bg-cyan-400 shadow-[0_0_10px_rgba(35,171,230,0.8)]"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2.5, ease: "easeInOut" }}
                />
              </motion.div>
              <div className="mt-4 text-cyan-400/70 font-display text-[10px] uppercase tracking-[0.3em] font-semibold animate-pulse">
                Initializing Systems
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {activeProject ? (
          <motion.div
            key="project-detail"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full relative z-[100]"
          >
            <ProjectDetail 
              project={activeProject} 
              onBack={() => setActiveProject(null)} 
            />
          </motion.div>
        ) : (
          <motion.div
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full relative"
          >
            <div className="w-full min-h-screen root-bg relative selection:bg-cyan-500/30 selection:text-white flex flex-col items-center overflow-x-clip">
              {/* Continuous Flowing Ambient Background Glows */}
              {/* Section 1 (Hero/Top) - Left */}
              <div className="absolute -left-[400px] w-[800px] h-[800px] rounded-full pointer-events-none z-0" style={{ top: '5vh', background: 'rgba(35, 171, 230, 0.25)', filter: 'blur(120px)' }} />
              {/* Section 2 - Right */}
              <div className="absolute -right-[450px] w-[900px] h-[900px] rounded-full pointer-events-none z-0" style={{ top: '150vh', background: 'rgba(35, 171, 230, 0.20)', filter: 'blur(140px)' }} />
              {/* Section 3 - Left */}
              <div className="absolute -left-[375px] w-[750px] h-[750px] rounded-full pointer-events-none z-0" style={{ top: '300vh', background: 'rgba(35, 171, 230, 0.22)', filter: 'blur(130px)' }} />
              {/* Section 4 - Right */}
              <div className="absolute -right-[500px] w-[1000px] h-[1000px] rounded-full pointer-events-none z-0" style={{ top: '450vh', background: 'rgba(35, 171, 230, 0.18)', filter: 'blur(150px)' }} />
              {/* Section 5 - Left */}
              <div className="absolute -left-[350px] w-[700px] h-[700px] rounded-full pointer-events-none z-0" style={{ top: '600vh', background: 'rgba(35, 171, 230, 0.25)', filter: 'blur(120px)' }} />
              {/* Section 6 - Right */}
              <div className="absolute -right-[425px] w-[850px] h-[850px] rounded-full pointer-events-none z-0" style={{ top: '750vh', background: 'rgba(35, 171, 230, 0.20)', filter: 'blur(140px)' }} />
              {/* Section 7 - Left */}
              <div className="absolute -left-[375px] w-[750px] h-[750px] rounded-full pointer-events-none z-0" style={{ top: '900vh', background: 'rgba(35, 171, 230, 0.22)', filter: 'blur(130px)' }} />


              <h1 className="sr-only">SINC 3D - Engineering Maritime Domain Awareness & Advanced Sensory Systems</h1>
              <GlassNavbar />

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
              <Projects onProjectClick={(project) => setActiveProject(project)} />

        {/* Padded container for the Footer */}
        <div className="w-full p-3 md:p-4 lg:p-5 flex flex-col items-center transparent-bg invert-text relative z-10">
          {/* 6. FOOTER SECTION */}
          <footer id="contact" className="relative overflow-hidden w-full max-w-7xl px-6 pt-20 pb-12 border-t border-white/[0.03] flex flex-col gap-12">
            {/* Mobile-only Ambient Blurs */}
            <div className="absolute top-[10%] -left-[30vw] w-[100vw] h-[100vw] bg-[#2ba9e3]/15 rounded-full blur-[100px] md:hidden pointer-events-none z-0" />
            <div className="absolute bottom-[20%] -right-[30vw] w-[100vw] h-[100vw] bg-[#050c26]/10 rounded-full blur-[100px] md:hidden pointer-events-none z-0" />

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-cyan-400" />
                  <span className="font-display font-semibold uppercase tracking-widest text-[14px] text-white">SINC 3D</span>
                </div>
                <p className="text-white/40 text-xs leading-relaxed max-w-[200px]">
                  Advancing the frontiers of maritime sensing and strategic domain intelligence.
                </p>
              </div>

              {["Solutions", "Platform", "Company"].map((col, idx) => (
                <div key={idx} className="flex flex-col gap-4">
                  <h4 className="text-white text-xs font-semibold uppercase tracking-wider">{col}</h4>
                  <ul className="flex flex-col gap-2">
                    {col === "Solutions" && ["Defense", "Global Trade", "Telemetry"].map(lnk => (
                      <li key={lnk}><a href="#" className="text-white/40 hover:text-white text-xs transition-colors">{lnk}</a></li>
                    ))}
                    {col === "Platform" && ["Edge AI", "Sensor Arrays", "Security"].map(lnk => (
                      <li key={lnk}><a href="#" className="text-white/40 hover:text-white text-xs transition-colors">{lnk}</a></li>
                    ))}
                    {col === "Company" && ["Research", "Careers", "Contact"].map(lnk => (
                      <li key={lnk}><a href="#" className="text-white/40 hover:text-white text-xs transition-colors">{lnk}</a></li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="relative z-10 border-t border-white/[0.04] pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-white/30 text-[11px] tracking-wide">
              <div>&copy; {new Date().getFullYear()} SINC 3D Inc. All rights reserved.</div>
              <div className="flex gap-6">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-white transition-colors">Tactical Usage Agreement</a>
              </div>
            </div>
          </footer>
        </div>

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
          .invert-text .text-cyan-400 {
            color: #0284c7 !important;
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
          </motion.div>
        )}
      </AnimatePresence>
    </MouseParallaxProvider>
  );
}

