import React from 'react';

interface ShutterStripProps {
  index: number;
  totalStrips: number;
  setRef: (el: HTMLDivElement | null) => void;
}

export const ShutterStrip: React.FC<ShutterStripProps> = ({ index, totalStrips, setRef }) => {
  const stripHeight = 100 / totalStrips;
  const GAP_VH = 0.1; // tiny architectural gap

  return (
    <div
      ref={setRef}
      className="absolute left-0 right-0 bg-[#f4f4f4] origin-top"
      style={{
        top: `${index * stripHeight}vh`,
        height: `calc(${stripHeight}vh - ${GAP_VH}vh)`,
        willChange: 'transform',
        boxShadow: index > 0 ? '0 -1px 2px rgba(0,0,0,0.03)' : 'none',
      }}
    />
  );
};
