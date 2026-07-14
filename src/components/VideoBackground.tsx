import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const VideoBackground: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    // If browser blocks autoplay or in Low Power Mode, ensure fallback works.
    if (videoRef.current) {
      if (videoRef.current.readyState >= 3) {
        setVideoLoaded(true);
      }
    }
  }, []);

  const handleVideoPlay = () => {
    setVideoLoaded(true);
  };

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none">
      {/* Fallback Poster Image with smooth fade-out */}
      <motion.img
        src="/assets/hero-poster.png"
        alt="Ocean surveillance background"
        initial={{ opacity: 1 }}
        animate={{ opacity: videoLoaded ? 0 : 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        onPlay={handleVideoPlay}
        onLoadedData={handleVideoPlay}
        className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-[2000ms] ease-premium"
        style={{
          scale: videoLoaded ? 1.0 : 1.05,
        }}
      >
        <source src="/assets/HERO SECTION VIDEO_processed.mp4" type="video/mp4" />
      </video>

      {/* Black-to-transparent gradient overlay (40:70 ratio) */}
      <div 
        className="absolute inset-0 z-[1]"
        style={{
          background: 'linear-gradient(to top, #050505 0%, #050505 40%, transparent 70%, transparent 100%)',
          opacity: 0.4
        }}
      />
    </div>
  );
};
