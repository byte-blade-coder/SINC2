import React from 'react';
import { motion, useTransform, useReducedMotion } from 'framer-motion';
import { useMouseParallax } from './MouseParallaxProvider';

export const HeroContent: React.FC = () => {
  const { springX, springY } = useMouseParallax();
  const prefersReducedMotion = useReducedMotion();

  // Subtle mouse parallax shifting (max 10px)
  const textX = useTransform(springX, (x: number) => prefersReducedMotion ? 0 : x * 10);
  const textY = useTransform(springY, (y: number) => prefersReducedMotion ? 0 : y * 10);

  return (
    <div className="absolute bottom-10 left-6 md:bottom-16 md:left-12 lg:left-16 z-30 max-w-xl md:max-w-2xl lg:max-w-3xl px-2 text-left select-none">
      <motion.h1
        style={{ x: textX, y: textY }}
        initial={{ opacity: 0, y: 30, filter: 'blur(4px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
        className="
          font-display font-semibold text-white leading-[1.15] tracking-tight
          text-glow
          text-2xl sm:text-3xl md:text-4xl lg:text-[55px]
          pointer-events-auto
        "
      >
        Engineering Maritime Domain Awareness Through Innovative R&D.
      </motion.h1>
    </div>
  );
};
