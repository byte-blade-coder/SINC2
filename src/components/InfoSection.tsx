import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const InfoSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const grid = gridRef.current;

    if (!section || !header || !grid) return;

    const ctx = gsap.context(() => {
      // Fade in the header
      gsap.fromTo(
        header.children,
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: header,
            start: 'top 80%',
          },
        }
      );

      // Fade in cards sequentially
      gsap.fromTo(
        grid.children,
        {
          opacity: 0,
          y: 60,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: grid,
            start: 'top 75%',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const features = [
    {
      title: '60 FPS Smooth Scrub',
      description: 'Engineered with custom GSAP scroll easing to deliver a fluid, high-frame-rate interaction across all display refreshes.',
      icon: '⚡',
    },
    {
      title: 'Precision Center Locking',
      description: 'Mathematical viewport mapping anchors the scaling text precisely to the pixel, ensuring absolute balance.',
      icon: '🎯',
    },
    {
      title: 'Resolution Independence',
      description: 'Rendered as raw responsive fonts, guaranteeing crisp edges at maximum zoom levels without vector degradation.',
      icon: '🔍',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="features"
      className="relative mobile-transparent-bg overflow-hidden"
      style={{
        backgroundColor: '#ffffff',
        color: '#1d1d1f',
        padding: '120px 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        position: 'relative',
        zIndex: 5,
      }}
    >
      {/* Mobile-only Ambient Blurs */}
      <div className="absolute top-[10%] -left-[30vw] w-[100vw] h-[100vw] bg-[#2ba9e3]/15 rounded-full blur-[100px] md:hidden pointer-events-none z-0" />
      <div className="absolute bottom-[10%] -right-[30vw] w-[100vw] h-[100vw] bg-[#050c26]/10 rounded-full blur-[100px] md:hidden pointer-events-none z-0" />

      {/* Header */}
      <div
        ref={headerRef}
        className="relative z-10"
        style={{
          textAlign: 'center',
          maxWidth: '800px',
          marginBottom: '80px',
        }}
      >
        <span
          style={{
            fontSize: '14px',
            fontWeight: 600,
            color: '#2997ff',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: '12px',
          }}
        >
          Key Capabilities
        </span>
        <h2
          style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 800,
            lineHeight: 1.15,
            color: '#1d1d1f',
            letterSpacing: '-0.02em',
            margin: '0 0 20px 0',
          }}
        >
          Fluid motion. Immersive design.
        </h2>
        <p
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.15rem)',
            lineHeight: 1.5,
            color: '#6e6e73',
            maxWidth: '600px',
            margin: 0,
          }}
        >
          Discover the technology powering our fluid-canvas scroll system, built specifically for modern premium web experiences.
        </p>
      </div>

      {/* Feature Grid */}
      <div
        ref={gridRef}
        className="relative z-10"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '30px',
          width: '100%',
          maxWidth: '1024px',
        }}
      >
        {features.map((feature, idx) => (
          <div
            key={idx}
            style={{
              backgroundColor: '#f5f5f7',
              borderRadius: '20px',
              padding: '40px 32px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.04)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div
              style={{
                fontSize: '36px',
                width: '60px',
                height: '60px',
                borderRadius: '16px',
                backgroundColor: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
              }}
            >
              {feature.icon}
            </div>
            <h3
              style={{
                fontSize: '20px',
                fontWeight: 700,
                color: '#1d1d1f',
                margin: 0,
              }}
            >
              {feature.title}
            </h3>
            <p
              style={{
                fontSize: '14px',
                lineHeight: 1.6,
                color: '#6e6e73',
                margin: 0,
              }}
            >
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
