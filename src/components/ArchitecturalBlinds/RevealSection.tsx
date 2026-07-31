import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink, ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';

/* ─── Stat data ───────────────────────────────────────────────── */
const stats = [
  { index: '01', value: 4,    suffix: '',  label: 'Core Technology\nPillars', span: false },
  { index: '02', value: 10,   suffix: '+', label: 'Flagship\nSolutions', span: false },
  { index: '03', value: 10,   suffix: '+', label: 'Years of delivering\nindigenous R&D solutions', span: true },
];

import { useInView } from 'framer-motion';

/* ─── Animated counter ────────────────────────────────────────── */
function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -5% 0px" });

  useEffect(() => {
    if (!inView) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) { setCount(target); return; }
    
    let start = 0;
    const duration = 1200;
    const step = 16;
    const increment = target / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, step);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count}
      <span className="text-[#2ba9e3]">{suffix}</span>
    </span>
  );
}

/* ─── Stat Card ───────────────────────────────────────────────── */
function StatCard({ stat, index, active }: { stat: typeof stats[0]; index: number; active: boolean }) {
  return (
    <div
      className={`group relative border border-white/[0.06] bg-white/[0.015] p-4 md:p-5
        hover:border-[#23abe6]/25 hover:bg-[#23abe6]/[0.03] hover:-translate-y-0.5
        transition-all duration-300 overflow-hidden cursor-default ${stat.span ? 'col-span-2' : ''}`}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: 'radial-gradient(circle at 50% 100%, rgba(35,171,230,0.06) 0%, transparent 70%)' }}
      />

      {/* Index */}
      <span className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#2ba9e3]/40 mb-2.5 block">
        {stat.index}
      </span>

      {/* Value */}
      <div className="font-display font-black text-[28px] sm:text-[32px] md:text-[36px] leading-none tracking-tighter text-white
        group-hover:text-[#2ba9e3] transition-colors duration-300 whitespace-pre-line">
        {stat.value !== null
          ? <Counter target={stat.value} suffix={stat.suffix} />
          : stat.text}
      </div>

      {/* Label */}
      <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30 leading-[1.7] whitespace-pre-line">
        {stat.label}
      </p>

      {/* Bottom slide-in accent */}
      <div className="absolute bottom-0 left-0 h-px w-0 bg-[#23abe6]/30 group-hover:w-full transition-all duration-500" />
    </div>
  );
}

/* ─── Main Component ──────────────────────────────────────────── */
export const RevealSection: React.FC<{ triggerRef?: React.RefObject<HTMLElement | null> }> = ({ triggerRef }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftRef     = useRef<HTMLDivElement>(null);
  const rightRef    = useRef<HTMLDivElement>(null);
  const [statsActive, setStatsActive] = useState(false);

  useEffect(() => {
    if (!triggerRef?.current || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
          onEnter: () => setStatsActive(true),
        },
      });

      // Subtle scale-up as shutter reveals
      tl.fromTo(containerRef.current, { scale: 0.96 }, { scale: 1, ease: 'none', duration: 1 }, 0);

      // Left column fades up from slight offset
      if (leftRef.current) {
        tl.fromTo(leftRef.current, { y: 40, autoAlpha: 0.1 }, { y: 0, autoAlpha: 1, ease: 'none', duration: 0.8 }, 0.1);
      }

      // Right column slightly later
      if (rightRef.current) {
        tl.fromTo(rightRef.current, { y: 30, autoAlpha: 0.1 }, { y: 0, autoAlpha: 1, ease: 'none', duration: 0.8 }, 0.2);
      }
    }, containerRef);

    return () => ctx.revert();
  }, [triggerRef]);

  return (
    <div
      ref={containerRef}
      className="w-full h-screen bg-[#050505] text-white flex flex-col items-center justify-center relative overflow-hidden pt-20 md:pt-28"
    >
      {/* ── Ambient glows — identical to Testimonials section ── */}
      <div className="absolute -top-[20%] left-[20%] w-[60vw] h-[60vw] bg-[#23abe6]/[0.04] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[30vw] h-[30vw] bg-[#23abe6]/[0.03] rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-[1720px] mx-auto px-4 md:px-8 relative z-10">

        {/* ── DESKTOP two-column | MOBILE stacked ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[45fr_55fr] gap-10 lg:gap-16 xl:gap-20 items-start">

          {/* ════════════ LEFT COLUMN ════════════ */}
          <div ref={leftRef} className="flex flex-col">

            {/* Section label + H2 — exact site pattern */}
            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#2ba9e3] mb-2 block">
              About
            </span>
            <h2 className="w-fit font-display font-black text-[28px] sm:text-[44px] md:text-[52px] lg:text-[56px]
              leading-[0.95] tracking-tighter
              bg-gradient-to-r from-[#2ba9e3] to-white bg-clip-text text-transparent
              pb-2 md:pb-3 pt-1">
              SINC Lab
            </h2>

            {/* Sub-heading */}
            <p className="mt-4 mb-7 font-sans font-medium text-white/55 text-[15px] md:text-[17px] leading-[1.6] tracking-tight">
              Engineering Mission-Critical Innovation for Maritime &amp; Defense
            </p>

            {/* Rule */}
            <div className="h-px w-12 bg-[#2ba9e3]/40 mb-7" />

            {/* Body */}
            <div className="flex flex-col gap-4">
              <p className="font-sans font-light text-white/60 text-[14px] md:text-[15px] leading-[1.9]">
                SINC Lab is a research and development organization dedicated to
                enhancing mission-critical readiness through innovative engineering,
                technology insertion, and functional replacement solutions. Our expertise spans
                sensing, embedded processing, secure communications, and data analytics to
                address operational challenges across maritime and defense environments.
              </p>
              <p className="font-sans font-light text-white/45 text-[14px] md:text-[15px] leading-[1.9]">
                Driven by reliability, sustainability, and indigenous innovation, we
                develop practical technologies that overcome obsolescence, supply chain
                constraints, and evolving operational requirements. Our solutions are designed to
                transition seamlessly from research into deployment, serving both defense
                organizations and commercial industries.
              </p>
            </div>

            {/* Bottom row: link + CTA */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mt-9">
              <a
                href="https://sincresearch.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/30 hover:text-[#2ba9e3] transition-colors duration-300"
              >
                <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" />
                sincresearch.com
              </a>

              <div className="hidden sm:block w-px h-4 bg-white/[0.1]" />

              <a
                href="https://sincresearch.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-5 py-2.5
                  border border-white/[0.10] bg-white/[0.03]
                  hover:border-[#23abe6]/40 hover:bg-[#23abe6]/[0.06]
                  transition-all duration-300 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60 hover:text-white"
              >
                Explore Our Research
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </a>
            </div>
          </div>

          {/* ════════════ RIGHT COLUMN ════════════ */}
          <div ref={rightRef} className="flex flex-col gap-4">

            {/* Image */}
            <div
              className="relative rounded-xl overflow-hidden border border-white/[0.06]
                shadow-[0_20px_60px_rgba(0,0,0,0.5)] group"
              style={{ aspectRatio: '16/9' }}
            >
              <img
                src="/assets/sensor_fusion_dark.png"
                alt="SINC Lab research facility"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/60 via-transparent to-transparent pointer-events-none" />
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-10 h-10 border-t border-l border-[#23abe6]/30 pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-10 h-10 border-b border-r border-[#23abe6]/30 pointer-events-none" />
            </div>

            {/* 2×2 Stat grid */}
            <div className="grid grid-cols-2 gap-3">
              {stats.map((stat, i) => (
                <StatCard key={stat.index} stat={stat} index={i} active={statsActive} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
