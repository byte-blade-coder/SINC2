import React from 'react';
import { motion, useTransform, useReducedMotion } from 'framer-motion';
import { useMouseParallax } from './MouseParallaxProvider';

export const AmbientLights: React.FC = () => {
  const { springX, springY } = useMouseParallax();
  const prefersReducedMotion = useReducedMotion();

  // Transform coordinates for subtle cursor parallax shifting (max 30px for ambient lights)
  const light1X = useTransform(springX, (x: number) => prefersReducedMotion ? 0 : x * 40);
  const light1Y = useTransform(springY, (y: number) => prefersReducedMotion ? 0 : y * 40);
  
  const light2X = useTransform(springX, (x: number) => prefersReducedMotion ? 0 : x * -30);
  const light2Y = useTransform(springY, (y: number) => prefersReducedMotion ? 0 : y * -30);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10 select-none">
      {/* Top-Right Soft Blue Glow */}
      <motion.div
        style={{
          x: light1X,
          y: light1Y,
        }}
        animate={prefersReducedMotion ? {} : {
          scale: [1, 1.1, 0.95, 1],
          opacity: [0.35, 0.45, 0.3, 0.35],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -top-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-radial from-[#23abe6]/20 via-[#23abe6]/5 to-transparent blur-[120px]"
      />

      {/* Bottom-Left Soft Cyan Glow */}
      <motion.div
        style={{
          x: light2X,
          y: light2Y,
        }}
        animate={prefersReducedMotion ? {} : {
          scale: [1, 0.9, 1.05, 1],
          opacity: [0.25, 0.35, 0.2, 0.25],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
        className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-radial from-[#23abe6]/15 via-[#23abe6]/5 to-transparent blur-[120px]"
      />
    </div>
  );
};
