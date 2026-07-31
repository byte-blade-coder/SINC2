import React, { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';

export const RevealSection: React.FC<{ triggerRef?: React.RefObject<HTMLElement | null> }> = ({ triggerRef }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingsRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!triggerRef || !triggerRef.current || !containerRef.current) return;

    // We tie the elements inside RevealSection to the same scroll sequence
    // as the shutter overlay so they reveal perfectly.
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
      }
    });

    // Subtly scale up the background to give depth as blinds open
    tl.fromTo(
      containerRef.current,
      { scale: 0.95 },
      { scale: 1, ease: 'none', duration: 1 },
      0
    );

    // Fade and translate headings upward
    tl.fromTo(
      [headingsRef.current, textRef.current, btnRef.current],
      { y: 50, autoAlpha: 0.2 },
      { y: 0, autoAlpha: 1, ease: 'none', duration: 0.8, stagger: 0.1 },
      0.2 // Starts slightly after blinds begin opening
    );

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [triggerRef]);

  return (
    <div
      ref={containerRef}
      className="w-full h-screen bg-[#050505] text-white flex flex-col items-center justify-center relative overflow-hidden"
    >
      {/* Premium ambient glows */}
      <div className="absolute top-[20%] left-[20%] rounded-full pointer-events-none w-[40vw] h-[40vw] bg-[rgba(255,255,255,0.02)] blur-[100px]" />
      <div className="absolute bottom-[20%] right-[20%] rounded-full pointer-events-none w-[30vw] h-[30vw] bg-[rgba(255,255,255,0.015)] blur-[80px]" />

      <div className="max-w-[1728px] w-full px-6 md:px-12 lg:px-24 flex flex-col items-center text-center relative z-10">

        <div className="absolute top-24 left-12 text-left text-white/50 text-[10px] md:text-xs tracking-widest uppercase font-semibold leading-relaxed">
          FOCUSED VISION. <br />
          MEASURED EXECUTION.
        </div>

        <h2
          ref={headingsRef}
          className="font-display font-black text-5xl md:text-7xl lg:text-[8rem] leading-[0.9] tracking-tighter mb-10 mt-32"
        >
          BUILD THE
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/40">
            FUTURE
          </span>
        </h2>

        <p
          ref={textRef}
          className="max-w-2xl text-white/60 text-lg md:text-xl font-sans mb-12"
        >
          Deploying autonomous maritime systems engineered for intelligence,
          navigation, and defense readiness.
        </p>

        <button
          ref={btnRef}
          className="group flex items-center justify-center gap-4 bg-white text-black px-8 py-5 rounded-full font-bold uppercase tracking-widest text-sm hover:scale-105 transition-transform duration-500 focus:outline-none"
        >
          Initiate Contact
          <div className="bg-black/10 rounded-full p-2 group-hover:rotate-45 transition-transform duration-300">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </button>
      </div>
    </div>
  );
};
