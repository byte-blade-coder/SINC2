import React from 'react';

interface ShutterStripProps {
  index: number;
  totalStrips: number;
  setRef: (el: HTMLDivElement | null) => void;
}

export const ShutterStrip: React.FC<ShutterStripProps> = ({ index, totalStrips, setRef }) => {
  // Height of each strip in vh
  const stripHeight = 100 / totalStrips;

  return (
    <div
      className="relative w-full overflow-hidden flex-shrink-0"
      style={{ height: `${stripHeight}vh` }}
    >
      {/* Slat Container - This is what will scale down (scaleY: 0) */}
      <div
        ref={setRef}
        className="absolute inset-0 w-full h-full bg-[#e5e5e5] origin-top will-change-transform"
      >
        {/* Inner Content - Shifted up so it aligns seamlessly across all slats */}
        <div
          className="absolute left-0 right-0 h-screen flex items-center whitespace-nowrap overflow-hidden"
          style={{ top: `-${index * stripHeight}vh` }}
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
  );
};
