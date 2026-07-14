import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { NoiseOverlay } from './NoiseOverlay'; // Named import from local SINC 3D NoiseOverlay

interface HeroSectionOneProps {
  currentPage?: 'hero1' | 'hero2';
  setCurrentPage?: (page: 'hero1' | 'hero2') => void;
}

const HeroSectionOne: React.FC<HeroSectionOneProps> = ({ currentPage = 'hero2', setCurrentPage }) => {
  const [scrolled, setScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(2); // Home is index 2 now
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['Hero 1', 'Hero 2', 'Home', 'About', 'Services', 'Research', 'Projects', 'Contact'];

  const customTransition = { duration: 1.2, ease: [0.16, 1, 0.3, 1] as const };

  return (
    <div className="relative w-full bg-[#050505] p-3 md:p-4 lg:p-5 overflow-hidden">
      {/* Central Floating Main Panel */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={customTransition}
        className="relative min-h-[calc(100vh-24px)] lg:min-h-[calc(100vh-40px)] w-full rounded-[24px] lg:rounded-[32px] border border-white/[0.08] bg-[#050505] overflow-hidden flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.4),_0_30px_80px_rgba(0,0,0,0.6)]"
      >
        {/* Layer 1: Looping Video Background & Bottom mask gradient */}
        <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover opacity-60"
            src="/assets/HERO SECTION VIDEO_processed.mp4"
          />
          {/* Subtle bottom-to-top dark overlay gradient (40% black at bottom, fading to transparent) */}
          <div 
            className="absolute inset-0 z-[1] pointer-events-none" 
            style={{
              background: 'linear-gradient(to top, rgba(5, 5, 5, 0.4) 0%, rgba(5, 5, 5, 0.1) 40%, rgba(5, 5, 5, 0) 100%)'
            }}
          />
        </div>

        {/* Layer 2: Ambient Light Glows (Static) */}
        <div className="absolute inset-0 pointer-events-none z-[1] overflow-hidden">
          {/* Top-Right Glow (Blue) */}
          <div className="absolute -top-[10%] -right-[10%] w-[60%] h-[60%] rounded-full blur-[120px] bg-gradient-to-br from-blue-500/20 via-blue-600/5 to-transparent pointer-events-none" />
          
          {/* Bottom-Left Glow (Cyan) */}
          <div className="absolute -bottom-[10%] -left-[10%] w-[60%] h-[60%] rounded-full blur-[120px] bg-gradient-to-tr from-cyan-500/15 via-cyan-600/5 to-transparent pointer-events-none" />
        </div>

        {/* Layer 3: Film Grain Noise Overlay */}
        <NoiseOverlay />

        {/* Floating Glassmorphism Navbar */}
        <motion.nav
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ ...customTransition, delay: 0.1 }}
          className={`absolute top-6 z-40 w-[90%] max-w-[1728px] h-[90px] rounded-[20px] border border-white/[0.06] flex items-center justify-between px-6 md:px-10 transition-[background-color,box-shadow,backdrop-filter] duration-500 ${
            scrolled
              ? 'bg-black/75 backdrop-blur-lg shadow-[0_10px_30px_rgba(0,0,0,0.5),_inset_0_1px_0_rgba(255,255,255,0.08)]'
              : 'bg-black/35 backdrop-blur-md'
          }`}
        >
          {/* Logo on the left */}
          <div className="flex items-center">
            <img
              src="/logo.png"
              alt="SINC Logo"
              style={{ height: '60px', width: 'auto' }}
              className="object-contain cursor-pointer"
              onError={(e) => { (e.target as HTMLImageElement).src = '/assets/logo.png' }}
            />
          </div>

          {/* Centered Navigation Links - Framer Motion Sliding Underline */}
          <div className="hidden lg:flex items-center gap-2">
            {navItems.map((item, index) => {
              const isHeroLink = item === 'Hero 1' || item === 'Hero 2';
              const isActive = isHeroLink 
                ? (item === 'Hero 1' ? currentPage === 'hero1' : currentPage === 'hero2')
                : activeIndex === index;

              return (
                <a
                  key={item}
                  href={isHeroLink ? '#' : `#${item.toLowerCase()}`}
                  className="relative px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors duration-200"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => {
                    if (isHeroLink) {
                      setCurrentPage?.(item === 'Hero 1' ? 'hero1' : 'hero2');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    } else {
                      setActiveIndex(index);
                    }
                  }}
                >
                  <span className="relative z-10">{item}</span>
                  {hoveredIndex === index && (
                    <motion.div
                      layoutId="nav-hover-1"
                      className="absolute inset-0 bg-white/[0.06] rounded-[10px] z-0"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {isActive && !isHeroLink && (
                    <motion.div
                      layoutId="nav-active-1"
                      className="absolute bottom-1 left-4 right-4 h-[2px] bg-[#23abe6] z-0"
                      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                    />
                  )}
                  {isHeroLink && isActive && (
                    <motion.div
                      layoutId="nav-active-1"
                      className="absolute bottom-1 left-4 right-4 h-[2px] bg-white/45 z-0"
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* Far Right CTA Button */}
          <div className="hidden lg:flex items-center">
            <button className="group relative overflow-hidden h-10 px-6 rounded-full bg-[#23abe6] text-black font-semibold text-sm flex items-center justify-center transition-transform active:scale-95 shadow-[0_4px_20px_rgba(35,171,230,0.3)]">
              <span className="relative z-10 flex items-center gap-1.5">
                Get Started
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
              {/* Sweep Shine Hover Effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 ease-out skew-x-12" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden text-white/80 hover:text-white p-2"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Responsive Mobile Drawer Menu */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="absolute top-[102px] left-0 right-0 bg-black/90 backdrop-blur-xl rounded-[20px] border border-white/[0.08] p-6 flex flex-col gap-4 lg:hidden"
              >
                {navItems.map((item) => {
                  const isHeroLink = item === 'Hero 1' || item === 'Hero 2';
                  return (
                    <a
                      key={item}
                      href={isHeroLink ? '#' : `#${item.toLowerCase()}`}
                      onClick={() => {
                        if (isHeroLink) {
                          setCurrentPage?.(item === 'Hero 1' ? 'hero1' : 'hero2');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }
                        setMenuOpen(false);
                      }}
                      className="text-white/70 hover:text-white text-lg py-2 border-b border-white/[0.05] transition-colors"
                    >
                      {item}
                    </a>
                  );
                })}
                <button
                  onClick={() => setMenuOpen(false)}
                  className="w-full mt-2 h-12 rounded-full bg-[#23abe6] text-black font-semibold text-base flex items-center justify-center shadow-lg"
                >
                  Get Started
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>

        {/* Hero Typography & Content Placement (Bottom-Left) */}
        <div className="absolute bottom-10 left-6 md:bottom-16 md:left-12 lg:left-16 z-30 max-w-3xl flex flex-col text-left">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...customTransition, delay: 0.2 }}
            className="text-3xl md:text-5xl lg:text-[55px] font-semibold text-white leading-[1.1] tracking-tight"
            style={{
              textShadow: '0 0 40px rgba(0, 210, 255, 0.15)',
            }}
          >
            Engineering Maritime <br className="hidden md:inline" />
            Domain Awareness <br className="hidden md:inline" />
            Through Innovative R&D.
          </motion.h1>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...customTransition, delay: 0.5 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1.5"
        >
          <span className="text-[10px] text-white/40 tracking-[0.2em] uppercase font-medium">Scroll</span>
          <div className="w-6 h-10 rounded-full border border-white/20 flex justify-center p-1 bg-black/20 backdrop-blur-sm">
            <motion.div
              animate={{
                y: [0, 12, 0],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="w-1.5 h-1.5 rounded-full bg-[#23abe6]"
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroSectionOne;
