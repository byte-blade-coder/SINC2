import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLocation } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

export function useShutterAnimation(
  triggerRef: React.RefObject<HTMLElement>
) {
  const [numStrips, setNumStrips] = useState(10);
  const stripsRef = useRef<HTMLDivElement[]>([]);
  const { pathname } = useLocation();

  useEffect(() => {
    const updateStrips = () => {
      if (window.innerWidth < 768) setNumStrips(6);
      else if (window.innerWidth < 1024) setNumStrips(8);
      else setNumStrips(10);
    };
    
    updateStrips();
    window.addEventListener('resize', updateStrips);
    return () => window.removeEventListener('resize', updateStrips);
  }, []);

  useEffect(() => {
    if (pathname !== '/' || !triggerRef.current) return;

    // Initial state setup
    gsap.set(stripsRef.current, { scaleY: 1, force3D: true, transformOrigin: 'top' });

    // Master Scrub Timeline: Retracts strips upward in sequence
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
      },
    });

    const STAGGER_SPREAD = 0.5;
    const STRIP_DURATION = 0.5;

    // Stagger from top to bottom, scaling each strip down vertically
    stripsRef.current.forEach((strip, i) => {
      const startAt = (i / (numStrips - 1)) * STAGGER_SPREAD;
      tl.to(
        strip,
        {
          scaleY: 0,
          ease: 'none',
          duration: STRIP_DURATION,
          force3D: true,
        },
        startAt
      );
    });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [triggerRef, pathname, numStrips]);

  return { stripsRef, numStrips };
}
