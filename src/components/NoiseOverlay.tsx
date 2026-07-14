import React from 'react';

export const NoiseOverlay: React.FC = () => {
  return (
    <div 
      className="absolute inset-0 w-full h-full pointer-events-none z-20 select-none bg-noise opacity-[0.015] mix-blend-overlay animate-noise"
      style={{ backgroundSize: '180px 180px' }}
    />
  );
};
