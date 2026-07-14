import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';

export const HeroButtons: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  // Animation values depending on reduced motion preferences
  const hoverAnimation = prefersReducedMotion 
    ? { scale: 1 } 
    : { scale: 1.03, y: -2 };
  
  const tapAnimation = prefersReducedMotion
    ? { scale: 1 }
    : { scale: 0.97, y: 0 };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 w-full px-4">
      {/* Primary CTA: Explore Solutions */}
      <motion.button
        whileHover={hoverAnimation}
        whileTap={tapAnimation}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        className="
          relative overflow-hidden group
          flex items-center justify-center gap-2.5
          w-full sm:w-auto h-14 px-8 rounded-full
          text-sm font-semibold uppercase tracking-wider text-black
          bg-[#23abe6]
          shadow-[0_4px_20px_rgba(35,171,230,0.25)]
          hover:shadow-[0_8px_30px_rgba(35,171,230,0.45)]
          transition-shadow duration-300
          cursor-pointer
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:ring-cyan-400
        "
      >
        {/* Shine Sweep Overlay */}
        <span className="absolute inset-0 w-full h-full bg-white/20 -skew-x-12 -left-full group-hover:animate-shine pointer-events-none" />

        <span>Explore Solutions</span>
        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
      </motion.button>

      {/* Secondary CTA: Watch Video */}
      <motion.button
        whileHover={hoverAnimation}
        whileTap={tapAnimation}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        className="
          relative group
          flex items-center justify-center gap-2.5
          w-full sm:w-auto h-14 px-8 rounded-full
          text-sm font-semibold uppercase tracking-wider text-white
          bg-white/[0.04] backdrop-blur-md
          border border-white/12
          hover:bg-white/[0.08] hover:border-white/30
          shadow-md
          transition-all duration-300
          cursor-pointer
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:ring-white
        "
      >
        <Play className="w-4 h-4 text-cyan-400 transition-transform duration-300 group-hover:scale-110" />
        <span>Watch Video</span>
      </motion.button>
    </div>
  );
};
