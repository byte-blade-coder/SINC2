import React from 'react';
import { useMouseParallax } from './MouseParallaxProvider';
import { VideoBackground } from './VideoBackground';
import { AmbientLights } from './AmbientLights';
import { NoiseOverlay } from './NoiseOverlay';
import { HeroContent } from './HeroContent';
import { ScrollIndicator } from './ScrollIndicator';

export const MainPanel: React.FC = () => {
  const { handleMouseMove, handleMouseLeave } = useMouseParallax();

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="
        relative w-full h-full
        rounded-[24px] md:rounded-[32px]
        border border-white/[0.08]
        bg-[#050505]
        shadow-layered
        overflow-hidden
        flex flex-col items-center justify-center
        transition-all duration-300
      "
    >
      {/* Visual Layer 1: Autoplay Video with filters */}
      <VideoBackground />

      {/* Visual Layer 2: Drifting Radial Light Glows */}
      <AmbientLights />

      {/* Visual Layer 3: Film-grain Noise */}
      <NoiseOverlay />


      {/* Visual Layer 5: Staggered Content */}
      <HeroContent />

      {/* Visual Layer 6: Scroll Mouse Guide */}
      <ScrollIndicator />
    </div>
  );
};
