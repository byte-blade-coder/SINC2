import React, { createContext, useContext, useEffect } from 'react';
import { useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

interface ParallaxContextProps {
  springX: any;
  springY: any;
  handleMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void;
  handleMouseLeave: () => void;
}

const ParallaxContext = createContext<ParallaxContextProps | undefined>(undefined);

export const MouseParallaxProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const prefersReducedMotion = useReducedMotion();
  
  // Normalized motion values (-0.5 to 0.5)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for high-end cinematic inertia
  const springConfig = { stiffness: 100, damping: 25, mass: 0.5 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Normalized position relative to center of the panel
    const x = (e.clientX - rect.left) / width - 0.5;
    const y = (e.clientY - rect.top) / height - 0.5;
    
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    // Return smoothly to center on leave
    mouseX.set(0);
    mouseY.set(0);
  };

  useEffect(() => {
    if (prefersReducedMotion) {
      mouseX.set(0);
      mouseY.set(0);
    }
  }, [prefersReducedMotion, mouseX, mouseY]);

  return (
    <ParallaxContext.Provider value={{ springX, springY, handleMouseMove, handleMouseLeave }}>
      {children}
    </ParallaxContext.Provider>
  );
};

export const useMouseParallax = () => {
  const context = useContext(ParallaxContext);
  if (!context) {
    throw new Error('useMouseParallax must be used within a MouseParallaxProvider');
  }
  return context;
};
