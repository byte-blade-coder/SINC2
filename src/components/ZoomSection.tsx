import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MainPanel } from './MainPanel';

gsap.registerPlugin(ScrollTrigger);

interface StackCardProps {
  card: {
    num: string;
    title: string;
    desc: string;
    image?: string;
  };
  index: number;
}

const StackCard: React.FC<StackCardProps> = ({ card, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 450, height: 450 });

  useEffect(() => {
    if (!cardRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setSize({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });
    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  const r = 24; // corner radius
  const nw = size.width > 300 ? 90 : 70; // notch width
  const nh = size.width > 300 ? 90 : 70; // notch height

  // SVG Path String for the card outline and image clipping
  const pathD = `
    M 0 ${nh + r}
    L 0 ${size.height - r}
    A ${r} ${r} 0 0 0 ${r} ${size.height}
    L ${size.width - r} ${size.height}
    A ${r} ${r} 0 0 0 ${size.width} ${size.height - r}
    L ${size.width} ${r}
    A ${r} ${r} 0 0 0 ${size.width - r} 0
    L ${nw + r} 0
    A ${r} ${r} 0 0 0 ${nw} ${r}
    L ${nw} ${nh - r}
    A ${r} ${r} 0 0 1 ${nw - r} ${nh}
    L ${r} ${nh}
    A ${r} ${r} 0 0 0 0 ${nh + r}
    Z
  `;

  return (
    <div
      ref={cardRef}
      className="stack-card absolute bg-transparent"
      style={{
        width: 'var(--card-width)',
        height: 'var(--card-height)',
        left: `calc(var(--card-spacing) * ${index})`,
        top: '0px',
        zIndex: 10 + index,
        transformOrigin: 'bottom center',
        willChange: 'transform, opacity',
      }}
    >
      {/* SVG ClipPath Definition for the image (matches card body exactly) */}
      <svg className="absolute w-0 h-0 pointer-events-none">
        <defs>
          <clipPath id={`clip-card-${index}`} clipPathUnits="userSpaceOnUse">
            <path d={pathD} />
          </clipPath>
        </defs>
      </svg>

      {/* Full Width Image Background Container (Clipped to Card Shape) */}
      {card.image && (
        <div
          className="absolute inset-0 w-full h-full overflow-hidden"
          style={{
            clipPath: `url(#clip-card-${index})`,
          }}
        >
          <img
            src={card.image}
            alt={card.title}
            className="w-full h-full object-cover"
          />
          {/* Subtle Dark Gradient Overlay at the bottom for text readability on dark images */}
          <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
        </div>
      )}

      {/* Background Card Shape SVG with Outline Border and Shadow */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ filter: 'drop-shadow(0 12px 25px rgba(0,0,0,0.05))' }}
      >
        <path
          d={pathD}
          fill={card.image ? "none" : "#f6f6f6"}
          stroke="rgba(0, 0, 0, 0.08)"
          strokeWidth="1"
        />
      </svg>

      {/* Card Section Number (inside cutout as a blue rounded square with gap spacing) */}
      <div
        className="absolute top-0 left-0 flex items-center justify-center pointer-events-none"
        style={{
          width: `${nw}px`,
          height: `${nh}px`,
        }}
      >
        <div
          className="bg-[#23abe6] text-white font-black flex items-center justify-center shadow-[0_4px_12px_rgba(35,171,230,0.2)] select-none tracking-tighter"
          style={{
            width: size.width > 300 ? '64px' : '48px',
            height: size.width > 300 ? '64px' : '48px',
            fontSize: size.width > 300 ? '32px' : '22px',
            borderRadius: size.width > 300 ? '16px' : '12px',
          }}
        >
          {card.num.replace(/^0/, '')}
        </div>
      </div>



      {/* Card Bottom Description Overlay (Absolute positioned on top of the image) */}
      <div
        className="absolute left-6 right-6 bottom-6 select-none text-white pointer-events-none z-10"
      >
        <h3 className="font-display font-black text-white text-xs md:text-lg leading-tight uppercase tracking-tight">
          {card.title}
        </h3>
        <p className="text-[9px] md:text-[11px] text-gray-200 font-semibold mt-1.5 leading-snug uppercase">
          {card.desc}
        </p>
      </div>
    </div>
  );
};

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
    {
      num: '01',
      title: 'Sensing',
      desc: 'Intelligent autonomous sensor systems detecting signals in real-time.',
      image: '/assets/sensing_clean.png'
    },
    {
      num: '02',
      title: 'Processing',
      desc: 'High-speed computation at the edge for split-second decisions.',
      image: '/assets/processing_clean.png'
    },
    {
      num: '03',
      title: 'Communication',
      desc: 'Secure, encrypted, quantum-resistant data transmission networks.',
      image: '/assets/communication_clean.png'
    },
    {
      num: '04',
      title: 'Data Analytics',
      desc: 'Intelligent fusion of multidimensional data for total situational awareness.',
      image: '/assets/data_analytics_clean.png'
    },
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

      // Set initial state of cards off-screen bottom-right
      gsap.set(cardElements, {
        x: (index: number, target: any) => {
          const clientWidth = document.documentElement.clientWidth;
          const cardWidth = target.offsetWidth;
          // Calculate gap based on screen size (matching the CSS variables)
          const cardGap = clientWidth >= 1024 ? 24 : (clientWidth >= 768 ? 16 : 12);
          const cardSpacing = cardWidth + cardGap;
          const wrapperWidth = cardWidth * 4 + cardGap * 3;
          const cardLeft = (clientWidth - wrapperWidth) / 2 + (cardSpacing * index);
          return clientWidth - cardLeft;
        },
        y: (index: number, target: any) => {
          const clientHeight = document.documentElement.clientHeight;
          const cardHeight = target.offsetHeight;
          const cardTop = (clientHeight - cardHeight) / 2;
          return clientHeight - cardTop;
        },
        rotation: 0,
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

      // Card Stacking animation - cards slide in from bottom-right and stack ONE BY ONE
      cardElements.forEach((card, i) => {
        tl.to(card, {
          x: 0,
          y: 0,
          rotation: 0,
          opacity: 1,
          duration: 1.0,
          ease: 'power2.out',
        }, i === 0 ? '+=0.2' : '-=0.6'); // sequential stacking with overlap
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
          background: 'radial-gradient(140% 140% at 100% 100%, #AEE8FF 0%, #DFF4FF 25%, #F4FAFF 60%, #FFFFFF 100%)',
          color: '#1d1d1f',
          zIndex: 4,
          padding: '0 24px',
          overflow: 'hidden',
        }}
      >
        <style>{`
          .zoom-cards-container {
            --card-gap: 12px;
            --card-width: calc(((100vw - 40px) - 36px) / 4);
            --card-height: var(--card-width);
            --card-spacing: calc(var(--card-width) + var(--card-gap));
          }
          @media (min-width: 768px) {
            .zoom-cards-container {
              --card-gap: 16px;
              --card-width: min(280px, calc(((100vw - 80px) - 48px) / 4));
              --card-height: var(--card-width);
            }
          }
          @media (min-width: 1024px) {
            .zoom-cards-container {
              --card-gap: 24px;
              --card-width: min(390px, calc(((100vw - 80px) - 72px) / 4));
              --card-height: var(--card-width);
            }
          }
          .stack-card {
            transition: top 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          }
          .stack-card:hover {
            top: -15px !important;
            z-index: 50 !important;
          }
          .stack-card svg {
            transition: filter 0.3s ease;
          }
          .stack-card:hover svg {
            filter: drop-shadow(0 18px 30px rgba(0, 0, 0, 0.06)) drop-shadow(0 0 15px rgba(35, 171, 230, 0.22)) !important;
          }
          .stack-card path {
            transition: stroke 0.3s ease;
          }
          .stack-card:hover path {
            stroke: rgba(35, 171, 230, 0.45) !important;
          }
        `}</style>

        <div className="zoom-cards-container w-full max-w-[1720px] h-full flex flex-col justify-center relative px-4 md:px-8">

          {/* Title Header Section above the cards, aligned left */}
          <div className="w-full flex flex-col justify-start z-10 pointer-events-none select-none mb-8 md:mb-12">
            <h2 className="w-fit inline-block font-display font-black text-[36px] sm:text-[54px] md:text-[76px] leading-[0.95] tracking-tighter bg-gradient-to-r from-[#2ba9e3] to-[#050c26] bg-clip-text text-transparent pb-3 pt-1">
              Core <br /> Technology Pillars
            </h2>
            <div className="mt-4 md:mt-6 text-gray-600 font-normal text-[18px] leading-relaxed max-w-[60%] space-y-4">
              <p className="text-[18px]">
                SINC Lab’s engineering and research activities are structured around four core technology domains that enable the development of mission-relevant sensing, processing, communication, and data analytics solutions.
              </p>
              <p className="text-[18px]">
                These pillars collectively support situational awareness, system intelligence, and operational decision support for maritime environments.
              </p>
            </div>
          </div>

          {/* Centered Stacking Cards Deck */}
          <div className="relative w-full flex items-center justify-center select-none" style={{ height: 'var(--card-height)' }}>
            <div
              className="relative flex items-center"
              style={{
                width: 'calc(var(--card-width) * 4 + var(--card-gap) * 3)',
                height: 'var(--card-height)',
              }}
            >
              {cardsData.map((card, i) => (
                <StackCard key={i} card={card} index={i} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

