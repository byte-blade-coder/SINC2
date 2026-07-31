import React from 'react';
import { motion, MotionValue, useTransform, useSpring } from 'framer-motion';

// Spring config for silky smooth mechanical feel
const SPRING = { stiffness: 60, damping: 18, mass: 0.6 };

// Each panel is its own component — useTransform at top level (no hook-in-loop)
function ShutterPanel({
  smoothProgress,
  index,
  total,
}: {
  smoothProgress: MotionValue<number>;
  index: number;
  total: number;
}) {
  const isEven = index % 2 === 0;

  // Stagger: each panel starts slightly later than the previous (reversed for bottom-to-top)
  const staggerIndex = total - 1 - index;
  const staggerOffset = staggerIndex * 0.012;
  const start = Math.min(staggerOffset, 0.4);
  const end   = Math.min(start + 0.6, 1);

  const x = useTransform(
    smoothProgress,
    [start, end],
    ['0%', isEven ? '-110%' : '110%']
  );

  return (
    <motion.div
      className="w-full bg-white relative flex-shrink-0"
      style={{
        height: `calc(100vh / ${total})`,
        x,
        willChange: 'transform',
      }}
    />
  );
}

export const ShutterOverlay = ({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) => {
  // Apply spring smoothing to the raw scroll value
  const smoothProgress = useSpring(scrollYProgress, SPRING);

  const numPanels = 20; // More panels = thinner slices

  return (
    <div className="absolute inset-0 w-full h-screen pointer-events-none z-[100] flex flex-col">
      {Array.from({ length: numPanels }, (_, i) => (
        <ShutterPanel
          key={i}
          index={i}
          total={numPanels}
          smoothProgress={smoothProgress}
        />
      ))}
    </div>
  );
};
