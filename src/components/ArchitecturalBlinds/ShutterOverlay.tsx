import React from 'react';
import { useLocation } from 'react-router-dom';
import { ShutterStrip } from './ShutterStrip';
import { useShutterAnimation } from './useShutterAnimation';

export const ShutterOverlay: React.FC<{ triggerRef: React.RefObject<HTMLElement | null> }> = ({ triggerRef }) => {
  const { pathname } = useLocation();
  const { stripsRef, numStrips } = useShutterAnimation(triggerRef);

  if (pathname !== '/') return null;

  return (
    <div
      className="absolute inset-0 pointer-events-none z-[100] overflow-hidden"
    >
      {Array.from({ length: numStrips }, (_, i) => (
        <ShutterStrip
          key={i}
          index={i}
          totalStrips={numStrips}
          setRef={(el) => {
            if (el) stripsRef.current[i] = el;
          }}
        />
      ))}
    </div>
  );
};
