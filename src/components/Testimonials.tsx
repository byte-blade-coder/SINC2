import React from 'react';
import { Trophy, ArrowRight, User } from 'lucide-react';

export const Testimonials = () => {
  return (
    <section className="relative w-full h-full pb-12 md:pb-20 pt-24 md:pt-32 bg-[#050505] overflow-clip flex flex-col items-center justify-center z-10">

      {/* Outer Rounded Container */}
      <div className="w-[calc(100%-2rem)] max-w-[1728px] mx-auto bg-[#111211] rounded-[24px] border border-[#292B29] relative flex flex-col items-center z-10 px-6 pb-12 pt-16 md:px-12 md:pb-20 md:pt-20 lg:px-16 lg:pb-24 lg:pt-24 xl:px-24 xl:pb-32 xl:pt-28 shadow-2xl">

        {/* Abstract Geometric Background (Solid Rings, No Gradients) */}
        <div className="absolute inset-0 overflow-hidden rounded-[24px] pointer-events-none z-0">
          <div className="absolute -top-[20%] -right-[10%] w-[80vw] h-[80vw] max-w-[1200px] max-h-[1200px] border-[40px] border-[#151615] rounded-full" />
          <div className="absolute -bottom-[30%] -left-[10%] w-[60vw] h-[60vw] max-w-[900px] max-h-[900px] border-[2px] border-[#1a1c1a] rounded-full" />
          <div className="absolute top-[10%] left-[20%] w-[100vw] h-[100vw] max-w-[1500px] max-h-[1500px] border-[1px] border-[#151615] rounded-full" />
        </div>

        {/* Two-Column Composition */}
        <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-10 xl:gap-16 items-stretch">

          {/* LEFT SIDE: Visuals & Cards */}
          <div className="relative w-full mt-8 lg:mt-0 h-full">

            {/* Main Image Container */}
            <div className="relative w-full h-full min-h-[400px] rounded-[20px] overflow-hidden bg-[#050505] shadow-xl z-10">
              <img
                src="/assets/sensor_fusion.png"
                alt="Our Team"
                className="absolute inset-0 w-full h-full object-cover opacity-70 sepia-[20%] hue-rotate-180 mix-blend-luminosity"
              />
            </div>

            {/* Floating Elements Container */}
            <div className="absolute -bottom-10 left-4 right-4 md:-bottom-12 md:-left-8 flex flex-col sm:flex-row items-end sm:items-center gap-4 z-20">

              {/* 1. Overlapping Experience Card */}
              <div className="relative bg-[#23abe6] rounded-[12px] p-6 sm:p-8 shadow-2xl overflow-hidden w-fit shrink-0">
                {/* Diagonal black corner treatment */}
                <div className="absolute -top-10 -right-10 w-20 h-20 bg-[#050505] rotate-45" />
                <span className="absolute top-2 right-1.5 text-[#050505] text-[7px] font-black tracking-widest rotate-45 select-none">EXP</span>

                <div className="flex flex-col relative z-10 text-[#050505]">
                  <h3 className="font-display font-black text-5xl md:text-6xl tracking-tighter leading-none mb-1">
                    20+
                  </h3>
                  <span className="font-bold text-xs tracking-widest uppercase mb-3">
                    Experience
                  </span>
                  <p className="font-medium text-xs md:text-sm leading-tight max-w-[140px] opacity-90">
                    Years of Excellence in IT Solutions Company.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT SIDE: Main Content Card */}
          <div className="relative w-full mt-24 sm:mt-16 lg:mt-0 z-10 h-full">

            <div className="bg-[#050505] rounded-[20px] h-full p-8 md:p-12 lg:p-14 border border-[#1a1c1a] relative z-10 shadow-2xl flex flex-col justify-center">

              {/* Badge/Title Area */}
              <div className="mb-8">
                <span className="text-[#23abe6] text-xs font-bold uppercase tracking-[0.2em]">
                  [ ABOUT SINC LAB ]
                </span>
                <h2 className="text-white font-display font-black text-3xl md:text-4xl lg:text-[44px] leading-[1.1] tracking-tight mt-4 max-w-xl">
                  Pioneering Solutions That<br className="hidden md:block" />
                  Redefine Sensor Fusion &<br className="hidden md:block" />
                  3D Technologies.
                </h2>
              </div>

              {/* Paragraph */}
              <p className="text-[#a0a0a0] font-sans text-base leading-relaxed mb-10 max-w-lg">
                We are a team of visionary engineers and tech innovators pushing the boundaries of spatial computing, sensor fusion, and 3D visualization. Transforming complex data into actionable intelligence.
              </p>

              {/* Statistics */}
              <div className="flex items-center gap-8 md:gap-12 mb-10 pt-8 border-t border-[#1a1c1a]">
                <div className="flex flex-col">
                  <span className="text-[#23abe6] font-display font-black text-4xl md:text-5xl leading-none tracking-tighter mb-2">3K+</span>
                  <span className="text-[#a0a0a0] text-sm font-medium">Successful Projects.</span>
                </div>
                <div className="w-[1px] h-12 bg-[#1a1c1a]" />
                <div className="flex flex-col">
                  <span className="text-[#23abe6] font-display font-black text-4xl md:text-5xl leading-none tracking-tighter mb-2">98+</span>
                  <span className="text-[#a0a0a0] text-sm font-medium">IT Professionals.</span>
                </div>
              </div>

              {/* CTA Button */}
              <button className="group flex items-center bg-[#111211] hover:bg-[#1a1c1a] border border-[#292B29] rounded-full p-1.5 pr-6 transition-all duration-300 w-fit">
                <div className="w-10 h-10 bg-[#23abe6] rounded-full flex items-center justify-center mr-4 group-hover:scale-105 transition-transform duration-300 shadow-[0_0_15px_rgba(35,171,230,0.4)]">
                  <ArrowRight className="w-4 h-4 text-[#050505] -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                </div>
                <span className="text-white font-semibold text-sm">Learn More</span>
              </button>

            </div>

            {/* Circular Award Badge (Overlapping Bottom Right) */}
            <div className="absolute -right-6 -bottom-6 md:-right-12 md:-bottom-12 lg:-right-16 lg:-bottom-16 w-32 h-32 md:w-44 md:h-44 z-30 pointer-events-none">
              {/* Outer Rings */}
              <div className="absolute inset-0 bg-[#050505] rounded-full border border-[#292B29] flex items-center justify-center shadow-2xl">
                <div className="absolute inset-2 border border-[#1a1c1a] rounded-full" />

                {/* SVG Circular Text */}
                <svg viewBox="0 0 100 100" className="absolute inset-2 w-[calc(100%-16px)] h-[calc(100%-16px)] animate-spin-slow">
                  <path id="badge-text-path" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="transparent" />
                  <text className="text-[9.5px] font-bold uppercase tracking-[0.25em] fill-[#a0a0a0]">
                    <textPath href="#badge-text-path" startOffset="0%">
                      AWARD WINNING AGENCY • SINCE 2019 •
                    </textPath>
                  </text>
                </svg>

                {/* Center Disk */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 bg-[#23abe6] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(35,171,230,0.3)] z-10">
                  <Trophy className="w-5 h-5 md:w-7 md:h-7 text-[#050505] fill-[#050505]" />
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Global Style for Spin Animation */}
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default Testimonials;
