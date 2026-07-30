import React, { useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const NUM_SLATS = 6; // Chunky slats like Trionn

export const VenetianOverlay: React.FC<{ triggerRef: React.RefObject<HTMLElement | null> }> = ({ triggerRef }) => {
  const slatsRef = useRef<HTMLDivElement[]>([]);
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname !== '/' || !triggerRef.current) return;

    // Initial state: slats fully open (scaleY: 1)
    gsap.set(slatsRef.current, { scaleY: 1, force3D: true, transformOrigin: 'top' });

    // GSAP timeline to shrink slats and reveal background
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
      },
    });

    const STAGGER_SPREAD = 0.5;
    const SLAT_DURATION = 0.5;

    // Stagger from top to bottom
    slatsRef.current.forEach((slat, i) => {
      const startAt = (i / (NUM_SLATS - 1)) * STAGGER_SPREAD;
      tl.to(
        slat,
        { scaleY: 0, ease: 'none', duration: SLAT_DURATION, force3D: true },
        startAt
      );
    });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [triggerRef, pathname]);

  if (pathname !== '/') return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-[100] overflow-hidden flex flex-col">
      {Array.from({ length: NUM_SLATS }, (_, i) => (
        <div
          key={i}
          className="relative w-full overflow-hidden flex-shrink-0"
          style={{ height: `${100 / NUM_SLATS}vh` }}
        >
          {/* Slat Container - This scales down */}
          <div
            ref={el => { if (el) slatsRef.current[i] = el; }}
            className="absolute inset-0 w-full h-full bg-[#e5e5e5] origin-top"
          >
            {/* Inner Content - Shifted up so it aligns seamlessly across all slats */}
            <div
              className="absolute left-0 right-0 h-screen flex items-center whitespace-nowrap overflow-hidden"
              style={{ top: `-${i * (100 / NUM_SLATS)}vh` }}
            >
              <div className="flex animate-marquee">
                {/* Marquee Text */}
                <h1 className="text-[15vw] font-display font-black text-[#050505] uppercase tracking-tighter px-8">
                  IMPACT + INSPIRE + INNOVATE +
                </h1>
                <h1 className="text-[15vw] font-display font-black text-[#050505] uppercase tracking-tighter px-8">
                  IMPACT + INSPIRE + INNOVATE +
                </h1>
                <h1 className="text-[15vw] font-display font-black text-[#050505] uppercase tracking-tighter px-8">
                  IMPACT + INSPIRE + INNOVATE +
                </h1>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
