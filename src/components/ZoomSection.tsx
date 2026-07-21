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
  onCardClick: (domain: string) => void;
}

const StackCard: React.FC<StackCardProps> = ({ card, index, onCardClick }) => {
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

  const r = size.width > 300 ? 12 : 6; // main corner radius
  const nr = r; // notch side corners radius matching the rest of the card
  const nw = size.width > 300 ? 90 : 54; // notch width
  const nh = size.width > 300 ? 90 : 54; // notch height

  // SVG Path String for the card outline and image clipping
  const pathD = `
    M 0 ${nh + r}
    L 0 ${size.height - r}
    A ${r} ${r} 0 0 0 ${r} ${size.height}
    L ${size.width - r} ${size.height}
    A ${r} ${r} 0 0 0 ${size.width} ${size.height - r}
    L ${size.width} ${r}
    A ${r} ${r} 0 0 0 ${size.width - r} 0
    L ${nw + nr} 0
    A ${nr} ${nr} 0 0 0 ${nw} ${nr}
    L ${nw} ${nh - nr}
    A ${nr} ${nr} 0 0 1 ${nw - nr} ${nh}
    L ${r} ${nh}
    A ${r} ${r} 0 0 0 0 ${nh + r}
    Z
  `;

  return (
    <div
      ref={cardRef}
      className={`stack-card absolute bg-transparent stack-card-${index} ${(card.title === 'Sensing' || card.title === 'Processing' || card.title === 'Communication' || card.title === 'Data Analytics') ? 'cursor-pointer hover:scale-[1.02] transition-transform duration-300' : ''}`}
      style={{
        width: 'var(--card-width)',
        height: 'var(--card-height)',
        zIndex: 10 + index,
        transformOrigin: 'bottom center',
        willChange: 'transform, opacity',
      }}
      onClick={() => {
        const domainMap: Record<string, string> = {
          'Sensing': 'sensing',
          'Processing': 'processing',
          'Communication': 'communication',
          'Data Analytics': 'analytics'
        };
        const domain = domainMap[card.title];
        if (domain) {
          onCardClick(domain);
        }
      }}
    >
      {/* SVG ClipPath Definition for the image (matches card body exactly) */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ overflow: 'visible', position: 'absolute', top: 0, left: 0 }}
        aria-hidden="true"
      >
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
            loading="lazy"
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
            width: size.width > 300 ? '64px' : '42px',
            height: size.width > 300 ? '64px' : '42px',
            fontSize: size.width > 300 ? '32px' : '18px',
            borderRadius: size.width > 300 ? '8px' : '6px',
            transform: size.width > 300 ? 'none' : 'translate(-2px, -2px)', // Shift slightly up-left on mobile for space optimization
          }}
        >
          {card.num.replace(/^0/, '')}
        </div>
      </div>

      {/* Card Content Overlay (Constrained to never overlap with the top cutout notch) */}
      <div
        className="absolute left-3 right-3 bottom-3 md:left-6 md:right-6 md:bottom-6 select-none text-white pointer-events-none z-10 flex flex-col justify-end"
        style={{
          top: size.width > 300 ? '95px' : '62px', // Reserves dedicated padding space below the notch
        }}
      >
        <h3 className="font-display font-bold text-white text-[12px] md:text-lg leading-tight uppercase tracking-tight">
          {card.title}
        </h3>
        <div className="h-1 md:h-2" /> {/* Consistent spacing between title and description */}
        <p className="text-[9.5px] md:text-[11px] text-gray-200 font-semibold leading-[1.3] md:leading-[1.45] uppercase">
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
  // Stores the exact scroll position where the GSAP pin ends
  const scrollTriggerEndRef = useRef<number>(0);

  const [dimensions, setDimensions] = useState({
    scale: 100,
    xStart: 0,
    yStart: 0,
    xEnd: 0,
    yEnd: 0,
    baseScale: 1
  });
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

      // Center of the logo canvas
      const cx = logoWidth / 2; // 401.5
      const cy = logoHeight / 2; // 135

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

      // Translation to center the logo itself initially (accounting for custom transformOrigin)
      const xStart = (cx - iLocalX) * (1 - baseScale);
      const yStart = (cy - iLocalY) * (1 - baseScale);

      // Translation to center the letter 'i' at peak zoom (independent of scale factor)
      const xEnd = cx - iLocalX;
      const yEnd = cy - iLocalY;

      // Set transform origin of the logo container to the center of 'i' in local coordinates
      textNode.style.transformOrigin = `${iLocalX}px ${iLocalY}px`;

      setDimensions({
        scale: targetScaleMultiplier,
        xStart: xStart,
        yStart: yStart,
        xEnd: xEnd,
        yEnd: yEnd,
        baseScale: baseScale,
      });
      setIsMeasured(true);
    };

    calculatePositions();

    window.addEventListener('resize', calculatePositions);
    return () => {
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

    // Apply measured base scale, origin, and translation to center the logo itself initially
    gsap.set(sincText, {
      transformOrigin: `495px 129.5px`,
      x: dimensions.xStart,
      y: dimensions.yStart,
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
          onRefresh(self) {
            // Capture the exact pixel scroll position where the pin ends
            scrollTriggerEndRef.current = self.end;
          },
        },
      });

      gsap.set(cardElements, {
        x: (index: number, target: any) => {
          const clientWidth = document.documentElement.clientWidth;
          const cardWidth = target.offsetWidth;
          const cardGap = clientWidth >= 768 ? (clientWidth >= 1024 ? 24 : 16) : 12;

          if (clientWidth >= 768) {
            const cardSpacing = cardWidth + cardGap;
            const wrapperWidth = cardWidth * 4 + cardGap * 3;
            const cardLeft = (clientWidth - wrapperWidth) / 2 + (cardSpacing * index);
            return clientWidth - cardLeft;
          } else {
            const cardSpacingX = cardWidth + cardGap;
            const wrapperWidth = cardWidth * 2 + cardGap;
            const cardLeft = (clientWidth - wrapperWidth) / 2 + (cardSpacingX * (index % 2));
            return clientWidth - cardLeft;
          }
        },
        y: (index: number, target: any) => {
          const clientHeight = document.documentElement.clientHeight;
          const clientWidth = document.documentElement.clientWidth;
          const cardHeight = target.offsetHeight;
          const cardGap = clientWidth >= 768 ? (clientWidth >= 1024 ? 24 : 16) : 12;

          if (clientWidth >= 768) {
            const cardTop = (clientHeight - cardHeight) / 2;
            return clientHeight - cardTop;
          } else {
            const cardSpacingY = cardHeight + cardGap;
            const wrapperHeight = cardHeight * 2 + cardGap;
            const cardTop = (clientHeight - wrapperHeight) / 2 + (cardSpacingY * Math.floor(index / 2));
            return clientHeight - cardTop;
          }
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
        // Zoom the logo container and pan to the letter 'i' to align its zoom path
        .to(sincText, {
          scale: dimensions.baseScale * dimensions.scale,
          x: dimensions.xEnd,
          y: dimensions.yEnd,
          duration: 2.5,
          ease: 'power2.in',
        })
        // Fade in the white backing inside the 'i' outline during the scale zoom
        .to(backing, {
          opacity: 1,
          duration: 1.5,
          ease: 'power2.inOut',
        }, '-=2.0') // Overlaps with scale zoom
        // Simultaneously fade background to transparent to reveal the global fixed gradient
        .to(container, {
          backgroundColor: 'rgba(255, 255, 255, 0)',
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
            flexShrink: 0,
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

      {/* Reveal Content (shown on transparent background to inherit global gradient) */}
      <div
        ref={revealContentRef}
        className=""
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'transparent',
          color: '#1d1d1f',
          zIndex: 4,
          padding: '0 24px',
          overflow: 'hidden',
        }}
      >
        {/* Mobile-only Premium Ambient Radial Blurs (matches heading gradient colors) */}

        <style>{`
          .zoom-cards-container {
            --card-gap: 12px;
            --card-width: min(165px, calc((100% - 12px) / 2));
            --card-height: var(--card-width);
            --card-spacing-x: calc(var(--card-width) + var(--card-gap));
            --card-spacing-y: calc(var(--card-width) + var(--card-gap));
            --container-width: calc(var(--card-width) * 2 + var(--card-gap));
            --container-height: calc(var(--card-height) * 2 + var(--card-gap));
            padding-top: 100px;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }
          .stack-card-0 { left: 0; top: 0; }
          .stack-card-1 { left: var(--card-spacing-x); top: 0; }
          .stack-card-2 { left: 0; top: var(--card-spacing-y); }
          .stack-card-3 { left: var(--card-spacing-x); top: var(--card-spacing-y); }

          @media (min-width: 768px) {
            .zoom-cards-container {
              --card-gap: 16px;
              --card-width: min(280px, calc((100% - 48px) / 4));
              --card-height: var(--card-width);
              --card-spacing-x: calc(var(--card-width) + var(--card-gap));
              --card-spacing-y: 0px;
              --container-width: calc(var(--card-width) * 4 + var(--card-gap) * 3);
              --container-height: var(--card-height);
              padding-top: 140px;
              justify-content: center;
            }
            .stack-card-2 { left: calc(var(--card-spacing-x) * 2); top: 0; }
            .stack-card-3 { left: calc(var(--card-spacing-x) * 3); top: 0; }
          }
          @media (min-width: 1024px) {
            .zoom-cards-container {
              --card-gap: 24px;
              --card-width: min(390px, calc(((100vw - 80px) - 72px) / 4));
              --card-height: var(--card-width);
              --card-spacing-x: calc(var(--card-width) + var(--card-gap));
              --card-spacing-y: 0px;
              --container-width: calc(var(--card-width) * 4 + var(--card-gap) * 3);
              --container-height: var(--card-height);
            }
          }
          .stack-card {
            margin-top: 0px;
            transition: margin-top 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          }
          .stack-card:hover, .stack-card:active {
            margin-top: -5px !important;
            z-index: 50 !important;
          }
          @media (min-width: 768px) {
            .stack-card:hover, .stack-card:active {
              margin-top: -15px !important;
            }
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

        <div className="zoom-cards-container w-full max-w-[1720px] relative px-4 md:px-8">

          {/* Title Header Section above the cards, aligned left */}
          <div className="w-full flex flex-col items-center md:items-start text-center md:text-left z-10 pointer-events-none select-none mb-4 md:mb-12">
            <h2 className="w-fit inline-block mx-auto md:mx-0 font-display font-black text-[28px] sm:text-[54px] md:text-[76px] leading-[0.95] tracking-tighter bg-gradient-to-r from-[#2ba9e3] to-[#050c26] bg-clip-text text-transparent pb-2 md:pb-3 pt-1">
              Core <br /> Technology Pillars
            </h2>
            <div className="mt-2 md:mt-6 text-center md:text-left text-gray-600 font-normal text-[13px] sm:text-[14px] md:text-[18px] leading-relaxed max-w-full md:max-w-[60%] space-y-2 md:space-y-4">
              <p className="text-[13px] sm:text-[14px] md:text-[18px]">
                SINC Lab’s engineering and research activities are structured around four core technology domains that enable the development of mission-relevant sensing, processing, communication, and data analytics solutions.
              </p>
              <p className="text-[13px] sm:text-[14px] md:text-[18px]">
                These pillars collectively support situational awareness, system intelligence, and operational decision support for maritime environments.
              </p>
            </div>
          </div>

          {/* Centered Stacking Cards Deck */}
          <div className="relative w-full flex items-center justify-center select-none" style={{ height: 'var(--container-height)' }}>
            <div
              className="relative flex items-center"
              style={{
                width: 'var(--container-width)',
                height: 'var(--container-height)',
              }}
            >
              {cardsData.map((card, i) => (
                <StackCard
                  key={i}
                  card={card}
                  index={i}
                  onCardClick={(domain) => {
                    // 1. Update domain state in CapabilitiesShowcase
                    window.dispatchEvent(new CustomEvent('select-domain', { detail: domain }));

                    // 2. Scroll to EXACTLY where the GSAP pin ends
                    //    Using scrollIntoView during a scrub pin causes a violent
                    //    catch-up animation (the "reload" flash + merge glitch).
                    //    Instead we scroll to the pinned section's end position directly.
                    const pinEnd = scrollTriggerEndRef.current;
                    if (pinEnd > 0) {
                      window.scrollTo({ top: pinEnd + 10, behavior: 'smooth' });
                    } else {
                      // Fallback: find the element after GSAP spacer calculation
                      const el = document.getElementById('sensing-capabilities');
                      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
