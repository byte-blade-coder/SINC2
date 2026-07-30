import React, { useRef } from 'react';
import { ShutterOverlay } from './ShutterOverlay';
import { RevealSection } from './RevealSection';

/**
 * ArchitecturalBlinds
 * A premium, mechanical shutter transition inspired by architectural blinds.
 * Features staggered upward retraction of horizontal strips linked to Lenis scroll.
 */
export default function ArchitecturalBlinds() {
  const containerRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={containerRef}
      className="relative w-full"
      style={{ height: '250vh' }}
      data-dark-section
    >
      {/* 
        Sticky viewport: Stays pinned for the full 250vh scroll duration.
        This provides the canvas where the reveal takes place.
      */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#050505]">
        <div className="absolute inset-0 z-0">
          <RevealSection triggerRef={containerRef} />
        </div>
        <ShutterOverlay triggerRef={containerRef} />
      </div>
    </section>
  );
}
