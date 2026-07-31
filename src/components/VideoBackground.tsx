import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const VideoBackground: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoSrc, setVideoSrc] = useState('');

  useEffect(() => {
    // Only load the heavy video after the page completes its initial load
    const handleLoad = () => {
      const timer = setTimeout(() => {
        setVideoSrc('/assets/Hero-banner.mp4');
      }, 800);
      return () => clearTimeout(timer);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  useEffect(() => {
    // If browser blocks autoplay or in Low Power Mode, ensure fallback works.
    if (videoRef.current && videoSrc) {
      if (videoRef.current.readyState >= 3) {
        setVideoLoaded(true);
      }
    }
  }, [videoSrc]);

  const handleVideoPlay = () => {
    setVideoLoaded(true);
  };

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none">


      {/* Background Video */}
      <video
        ref={videoRef}
        src={videoSrc || undefined}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onPlay={handleVideoPlay}
        onLoadedData={handleVideoPlay}
        className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-[2000ms] ease-premium"
        style={{
          scale: videoLoaded ? 1.0 : 1.05,
          willChange: 'transform',
        }}
      >
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
