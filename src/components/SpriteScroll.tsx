import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function SpriteScroll() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    // Frame count
    const frameCount = 120;
    const currentFrame = (index: number) => 
      `/toWEBP/frame_${index.toString().padStart(4, '0')}.webp`;

    const images: HTMLImageElement[] = [];
    const animState = { frame: 0 };

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      images.push(img);
    }

    const render = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      const img = images[animState.frame];
      if (img && img.complete && img.naturalWidth > 0) {
        // Draw the image centered and scaled to fit the container
        const hRatio = canvas.width / img.naturalWidth;
        const vRatio = canvas.height / img.naturalHeight;
        
        // Use max for cover, min for contain. Let's use max for a hero video style
        const ratio = Math.max(hRatio, vRatio);
        const centerShift_x = (canvas.width - img.naturalWidth * ratio) / 2;
        const centerShift_y = (canvas.height - img.naturalHeight * ratio) / 2;
        
        context.drawImage(
          img,
          0,
          0,
          img.naturalWidth,
          img.naturalHeight,
          centerShift_x,
          centerShift_y,
          img.naturalWidth * ratio,
          img.naturalHeight * ratio
        );
      }
    };

    // Render the first frame once loaded
    images[0].onload = render;

    // Make sure we re-render as images load in case scrolling hasn't started
    images.forEach(img => {
        img.addEventListener('load', () => {
            if (img === images[animState.frame]) {
                render();
            }
        });
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=300%', // 3 screens of scrolling for the sequence
        scrub: 1, // Smooth scrubbing
        pin: true,
      },
    });

    tl.to(animState, {
      frame: frameCount - 1,
      snap: 'frame',
      ease: 'none',
      onUpdate: render,
    });

    // Resize handling
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      render();
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial resize

    return () => {
      window.removeEventListener('resize', handleResize);
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === containerRef.current) {
          st.kill();
        }
      });
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-center">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover" />
      
      {/* Optional overlay text if needed */}
      <div className="absolute z-10 flex flex-col items-center justify-center pointer-events-none opacity-80 mix-blend-difference text-white">
        <h2 className="text-4xl md:text-6xl font-display uppercase tracking-widest font-bold">
          Visualizing SINC
        </h2>
      </div>
    </div>
  );
}
