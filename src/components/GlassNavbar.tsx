import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';

interface NavLinkProps {
  href: string;
  active: boolean;
  onClick: () => void;
  scrolled: boolean;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ href, active, onClick, scrolled, children }) => {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`
        relative px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider
        transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500
        ${scrolled
          ? (active ? 'text-[#050c26]' : 'text-[#050c26]/60 hover:text-[#050c26]')
          : (active ? 'text-white' : 'text-white/60 hover:text-white')
        }
      `}
    >
      <span className="relative z-10">{children}</span>
      {active && (
        <motion.div
          layoutId="activeTab"
          className={`absolute inset-0 rounded-lg -z-0 ${scrolled ? 'bg-black/5' : 'bg-white/10'}`}
          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
        />
      )}
    </a>
  );
};

export const GlassNavbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [activeLink, setActiveLink] = useState('Home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);

      let dark = false;

      // 1. Check if we're deep into the Projects section (where Testimonials are revealed)
      // The Projects section is 400vh tall. Testimonials reveal starts around 70% scroll progress.
      // 70% of 400vh is 280vh. So when top is <= -280vh, we are in dark mode.
      const projectsEl = document.getElementById('projects');
      if (projectsEl) {
        const pRect = projectsEl.getBoundingClientRect();
        if (pRect.top <= -window.innerHeight * 2.8 && pRect.bottom > 0) {
          dark = true;
        }
      }

      // 2. Check if we've reached the generic dark sections (ArchitecturalBlinds, etc.)
      const shutterEl = document.querySelector('[data-dark-section]');
      if (shutterEl) {
        const rect = shutterEl.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.5) {
          dark = true;
        }
      }

      setIsDark(dark);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = ['Home', 'Services', 'Research', 'Projects', 'Contact'];

  return (
    <header className="fixed top-3 md:top-6 left-0 right-0 z-50 flex justify-center px-4 md:px-8 pointer-events-none">
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 100, damping: 15, delay: 0.2 }}
        className={`
          pointer-events-auto
          flex items-center justify-between
          h-[70px] md:h-[90px] rounded-[20px]
          border
          transition-all duration-500 ease-premium
          w-full max-w-[1728px]
          md:w-[90%]
          lg:px-8
          ${isDark
            ? 'bg-white/[0.06] backdrop-blur-xl shadow-lg border-white/[0.08] px-6 py-2'
            : scrolled
              ? 'bg-white/15 backdrop-blur-xl shadow-md border-black/[0.08] px-6 py-2'
              : 'bg-black/35 backdrop-blur-md shadow-nav border-white/[0.06] px-6 py-2'
          }
        `}
      >
        {/* Logo Section */}
        <a
          href="#home"
          className="flex items-center shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded-lg"
          onClick={() => setActiveLink('Home')}
        >
          {/* Logo Entry Blur-to-Sharp */}
          <motion.div
            initial={{ filter: 'blur(6px)', opacity: 0 }}
            animate={{ filter: 'blur(0px)', opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex items-center"
          >
            <img
              src={(scrolled && !isDark) ? "/assets/dark-logo.png" : "/assets/logo.png"}
              alt="SINC Logo"
              className="h-[45px] md:h-[60px] w-auto object-contain transition-all duration-300"
            />
          </motion.div>
        </a>

        {/* Center Navigation Links (Hidden on Mobile/Tablet) */}
        <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-1">
          {navLinks.map((link) => (
            <NavLink
              key={link}
              href={`#${link.toLowerCase()}`}
              active={activeLink === link}
              scrolled={scrolled && !isDark}
              onClick={() => {
                setActiveLink(link);
                setMobileMenuOpen(false);
              }}
            >
              {link}
            </NavLink>
          ))}
        </div>

        {/* Right Section: CTA & Hamburger */}
        <div className="flex items-center gap-4 shrink-0">
          {/* Right CTA Button (Hidden on Mobile) */}
          <div className="hidden md:flex items-center gap-4">
            <motion.a
              href="#get-started"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="relative overflow-hidden group flex items-center justify-center gap-2 h-10 px-5 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-[#23abe6] hover:shadow-[0_0_20px_rgba(35,171,230,0.4)] transition-all duration-300"
            >
              {/* CTA Shine Sweep Effect */}
              <span className="absolute inset-0 w-full h-full bg-white/20 -skew-x-12 -left-full group-hover:animate-shine pointer-events-none" />

              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </motion.a>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 ${(scrolled && !isDark) ? 'text-[#050c26] hover:bg-black/5' : 'text-white/80 hover:bg-white/5'
                }`}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer Navigation (Overlay) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="pointer-events-auto absolute top-[95px] md:top-[125px] left-4 right-4 z-40 p-6 rounded-2xl border border-white/10 bg-black/90 backdrop-blur-xl shadow-2xl flex flex-col gap-4 lg:hidden"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  onClick={() => {
                    setActiveLink(link);
                    setMobileMenuOpen(false);
                  }}
                  className={`px-4 py-3 rounded-xl text-base font-medium transition-colors ${activeLink === link
                    ? 'bg-white/10 text-white'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                >
                  {link}
                </a>
              ))}
            </div>

            {/* CTA inside Mobile Drawer */}
            <a
              href="#get-started"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-4 rounded-xl text-sm font-semibold uppercase tracking-wider text-white bg-[#23abe6]"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
