import React, { useRef } from 'react';
import { useScroll } from 'framer-motion';
import { ShutterOverlay } from './ShutterOverlay';
import { NextSection } from './NextSection';

export default function ShutterTransition() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section
      ref={containerRef}
      className="relative w-full"
      style={{ height: '250vh' }}
    >
      {/*
        TRIONN-style architecture:
        - Sticky viewport stays on screen for 250vh of scroll
        - Layer 1 (z-0): "Build The Future" dark section — static, no transforms, no opacity
        - Layer 2 (z-100): White shutter panels on TOP — slide away as user scrolls
        Result: shutters reveal the dark content from behind, exactly like TRIONN
      */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* LAYER 1 — Dark section. Purely static HTML, zero animations, zero opacity tricks.
            Always fully visible. Shutters cover it until they slide away. */}
        <div className="absolute inset-0 z-0 bg-[#050505]">
          <NextSection />
        </div>

        {/* LAYER 2 — Shutter panels on top, slide away left/right as you scroll */}
        <ShutterOverlay scrollYProgress={scrollYProgress} />

      </div>
    </section>
  );
}
