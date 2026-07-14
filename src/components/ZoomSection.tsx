import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MainPanel } from './MainPanel';

gsap.registerPlugin(ScrollTrigger);

export const ZoomSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroWrapperRef = useRef<HTMLDivElement>(null);
  const sincWrapperRef = useRef<HTMLDivElement>(null);
  const sincTextRef = useRef<HTMLDivElement>(null);
  const backingRef = useRef<HTMLDivElement>(null);
  const revealContentRef = useRef<HTMLDivElement>(null);

  const [dimensions, setDimensions] = useState({ scale: 100, x: 0, y: 0, baseScale: 1 });
  const [isMeasured, setIsMeasured] = useState(false);

  const cardsData = [
    { num: '01', title: 'Edge Telemetry', desc: 'Real-time telemetry streams processed at the network border.' },
    { num: '02', title: 'Autonomous Sensing', desc: 'Intelligent sensor nodes operating independently in deep water.' },
    { num: '03', title: 'Quantum Security', desc: 'Secure quantum-resistant encryption protocols for data integrity.' },
    { num: '04', title: '3D Sensor Fusion', desc: 'Aggregating radar, lidar, and sonar data into a single point cloud.' },
  ];

  useEffect(() => {
    const calculatePositions = () => {
      if (!sincTextRef.current || !containerRef.current) return;

      const textNode = sincTextRef.current;

      const vw = window.innerWidth;
      const vh = window.innerHeight;

      // Base dimensions of the logo.png
      const logoWidth = 803;
      const logoHeight = 270;

      // Exact letter 'i' body center relative to the 803x270 canvas
      const iLocalX = 495.0;
      const iLocalY = 129.5;
      
      // Bounding box of 'i' white body
      const iLocalWidth = 26;
      const iLocalHeight = 132;

      // Fit the logo inside the viewport (max 85% width or 85% height of viewport)
      const baseScale = Math.min(
        1.0,
        (vw * 0.85) / logoWidth,
        (vh * 0.85) / logoHeight
      );

      // Width and height of the 'i' letter after baseScale is applied
      const iScaledWidth = iLocalWidth * baseScale;
      const iScaledHeight = iLocalHeight * baseScale;

      // Target scale factor (how much the baseScale logo needs to zoom to cover screen)
      const scaleX = (vw / iScaledWidth) * 1.5;
      const scaleY = (vh / iScaledHeight) * 1.5;
      const targetScaleMultiplier = Math.max(scaleX, scaleY);

      // Center of the letter 'i' on screen when the logo is centered
      const screenIX = (vw - logoWidth * baseScale) / 2 + iLocalX * baseScale;
      const screenIY = (vh - logoHeight * baseScale) / 2 + iLocalY * baseScale;

      // Translation needed to center 'i' in the viewport
      const translateX = vw / 2 - screenIX;
      const translateY = vh / 2 - screenIY;

      // Set transform origin of the logo container to the center of 'i' in local coordinates
      textNode.style.transformOrigin = `${iLocalX}px ${iLocalY}px`;

      setDimensions({
        scale: targetScaleMultiplier,
        x: translateX,
        y: translateY,
        baseScale: baseScale,
      });
      setIsMeasured(true);
    };

    // Ensure image is loaded before measuring
    const img = new Image();
    img.src = '/assets/logo.png';
    img.onload = calculatePositions;

    const timer = setTimeout(calculatePositions, 200);

    window.addEventListener('resize', calculatePositions);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', calculatePositions);
    };
  }, []);

  useEffect(() => {
    if (!isMeasured) return;

    const container = containerRef.current;
    const heroWrapper = heroWrapperRef.current;
    const sincText = sincTextRef.current;
    const backing = backingRef.current;
    const revealContent = revealContentRef.current;

    if (!container || !heroWrapper || !sincText || !backing || !revealContent) return;

    // Apply measured base scale, origin, and translation
    gsap.set(sincText, {
      transformOrigin: `495px 129.5px`,
      x: dimensions.x,
      y: dimensions.y,
      scale: dimensions.baseScale,
      opacity: 0,
    });

    // Backing is transparent initially to preserve outline design
    gsap.set(backing, { opacity: 0 });

    // Reset initial states for ScrollTrigger
    gsap.set(container, { backgroundColor: '#000000' });
    gsap.set(revealContent, { opacity: 0, pointerEvents: 'none' });

    const ctx = gsap.context(() => {
      const cardElements = revealContent.querySelectorAll('.stack-card');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '+=600%', // Optimized pinning length for 4 cards stacking
          pin: true,
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      });

      // Set initial state of cards off-screen right
      gsap.set(cardElements, {
        x: window.innerWidth,
        rotation: 15,
        opacity: 0,
      });

      tl.to(heroWrapper, {
        opacity: 0,
        scale: 0.96,
        y: -40,
        duration: 1,
        ease: 'power1.inOut',
      })
      .to(sincText, {
        opacity: 1,
        duration: 0.4,
        ease: 'power1.out',
      }, '-=0.5')
      // Zoom the logo container
      .to(sincText, {
        scale: dimensions.baseScale * dimensions.scale,
        duration: 2.5,
        ease: 'power2.in',
      })
      // Fade in the white backing inside the 'i' outline during the scale zoom
      .to(backing, {
        opacity: 1,
        duration: 1.5,
        ease: 'power2.inOut',
      }, '-=2.0') // Overlaps with scale zoom
      // Simultaneously fade background to white and fade out logo near the peak zoom
      .to(container, {
        backgroundColor: '#ffffff',
        duration: 0.8,
        ease: 'power1.inOut',
      }, '-=0.8')
      .to(sincText, {
        opacity: 0,
        duration: 0.4,
        ease: 'power1.inOut',
      }, '-=0.4')
      // Smoothly fade in and reveal the next section content wrapper
      .to(revealContent, {
        opacity: 1,
        pointerEvents: 'auto',
        duration: 0.8,
        ease: 'power2.out',
      }, '-=0.2');

      // Card Stacking animation - cards slide in and stack ONE BY ONE
      cardElements.forEach((card, i) => {
        tl.to(card, {
          x: 0, // slides to its CSS calculated offset left
          rotation: -4 + (i * 1.5), // subtle stagger angle like a card deck
          opacity: 1,
          duration: 1.2,
          ease: 'power2.out',
        }, i === 0 ? '+=0.2' : '+=0.1'); // sequential chaining
      });
    }, container);

    return () => ctx.revert();
  }, [isMeasured, dimensions]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        backgroundColor: '#000000',
        overflow: 'hidden',
      }}
    >
      {/* Hero Wrapper with Responsive App Margin Padding */}
      <div
        ref={heroWrapperRef}
        className="w-full h-full p-3 md:p-4 lg:p-5 box-border"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 2,
        }}
      >
        <MainPanel />
      </div>

      {/* Logo Zoom Wrapper */}
      <div
        ref={sincWrapperRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 3,
          pointerEvents: 'none',
        }}
      >
        <div
          ref={sincTextRef}
          style={{
            position: 'relative',
            width: '803px',
            height: '270px',
            willChange: 'transform, opacity',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* White solid backing behind the transparent letter 'i' (X: 482 to 508, Y: 64 to 195) */}
          <div
            ref={backingRef}
            style={{
              position: 'absolute',
              left: '482px',
              top: '64px',
              width: '26px',
              height: '132px',
              backgroundColor: '#ffffff',
              zIndex: 1,
              willChange: 'opacity',
            }}
          />
          {/* Logo image with transparent center inside outlined text */}
          <img
            src="/assets/logo.png"
            alt="SINC Logo"
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: '100%',
              height: '100%',
              zIndex: 2,
              display: 'block',
            }}
          />
        </div>
      </div>

      {/* Reveal Content (shown on white background) */}
      <div
        ref={revealContentRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#ffffff',
          color: '#1d1d1f',
          zIndex: 4,
          padding: '0 24px',
          overflow: 'hidden',
        }}
      >
        {/* Set up responsive variables: card-width, card-height and spacing width */}
        <div className="w-full max-w-[1400px] h-full flex flex-col justify-center relative px-4 md:px-8 [--card-width:180px] md:[--card-width:270px] lg:[--card-width:320px] [--card-height:250px] md:[--card-height:380px] lg:[--card-height:450px] [--card-spacing:35px] md:[--card-spacing:65px] lg:[--card-spacing:80px]">
          
          {/* Title Header Section on Right Side */}
          <div className="absolute right-6 top-10 md:top-20 z-10 text-right pointer-events-none select-none max-w-sm md:max-w-md">
            <h2 className="font-display font-black text-[32px] sm:text-[44px] md:text-[60px] leading-[0.9] text-black tracking-tighter uppercase">
              SINC BRINGS <br />
              <span className="text-gray-300">THE POWER</span>
            </h2>
            <p className="text-[9px] text-gray-400 font-semibold tracking-widest uppercase mt-3">
              Scroll down to stack key specifications
            </p>
          </div>

          {/* Centered Stacking Cards Deck */}
          <div className="relative w-full h-[65vh] flex items-center justify-center select-none overflow-hidden">
            <div 
              className="relative flex items-center h-full"
              style={{
                width: 'calc(var(--card-width) + (var(--card-spacing) * 3))',
                height: 'var(--card-height)',
              }}
            >
              {cardsData.map((card, i) => (
                <div
                  key={i}
                  className="stack-card absolute bg-[#f6f6f6] border border-black/[0.08] rounded-2xl shadow-[0_15px_35px_rgba(0,0,0,0.06)] p-6 md:p-10 flex flex-col justify-between"
                  style={{
                    width: 'var(--card-width)',
                    height: 'var(--card-height)',
                    left: `calc(var(--card-spacing) * ${i})`,
                    zIndex: 10 + i,
                    transformOrigin: 'bottom center',
                    willChange: 'transform, opacity',
                  }}
                >
                  {/* Card Big Brand Blue Number */}
                  <div className="text-[52px] md:text-[80px] font-black text-[#23abe6] leading-none select-none tracking-tighter">
                    {card.num}
                  </div>
                  
                  {/* Card Bottom Description */}
                  <div className="mt-auto select-none">
                    <h3 className="font-display font-black text-black text-sm md:text-xl leading-tight uppercase tracking-tight">
                      {card.title}
                    </h3>
                    <p className="text-[10px] md:text-[12px] text-gray-500 font-semibold mt-2 leading-snug uppercase">
                      {card.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Bottom Specifications Guide */}
          <div className="absolute bottom-8 left-6 right-6 md:left-10 md:right-10 flex justify-between items-center text-[9px] uppercase tracking-[0.25em] text-gray-400 font-semibold select-none">
            <span>SINC 3D Platform Spec Deck</span>
            <span>Keep Scrolling</span>
          </div>

        </div>
      </div>
    </div>
  );
};

