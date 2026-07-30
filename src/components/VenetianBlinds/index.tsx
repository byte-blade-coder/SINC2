import React, { useRef } from 'react';
import { VenetianOverlay } from './VenetianOverlay';
import { BlindSection } from './BlindSection';

/**
 * VenetianBlinds — production-grade scroll-driven Venetian blind transition.
 *
 * Architecture:
 * ┌─────────────────────────────────────────────────────┐
 * │  <section> 250vh scroll container  (scroll trigger) │
 * │  ┌────────────────────────────────────────────────┐ │
 * │  │  sticky top-0 h-screen                         │ │
 * │  │  ┌──────────────────────────────────────────┐  │ │
 * │  │  │  BlindSection  (dark, z-0, always solid) │  │ │
 * │  │  └──────────────────────────────────────────┘  │ │
 * │  └────────────────────────────────────────────────┘ │
 * │                                                     │
 * │  <VenetianOverlay>  (position:fixed portal to body) │
 * │    14 white slats — lift upward & stack at top      │
 * └─────────────────────────────────────────────────────┘
 *
 * Scroll mechanics:
 * - 0%:   All 14 slats cover the viewport completely
 * - 20%:  Top slats begin lifting
 * - 60%:  Middle slats stacking, bottom still flat
 * - 100%: All slats compressed into a thin strip at top edge
 */
export default function VenetianBlinds() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      className="relative w-full"
      style={{ height: '250vh' }}
      data-dark-section
    >
      {/* Sticky viewport: stays on screen for the full 250vh scroll */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#050505]">
        {/* Dark section — always at full opacity, never animated */}
        <div className="absolute inset-0 z-0">
          <BlindSection />
        </div>

        {/* Absolute overlay — inside sticky container, so it sticks with the dark section */}
        <VenetianOverlay triggerRef={containerRef} />
      </div>
    </section>
  );
}
