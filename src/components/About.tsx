import React from 'react';
import { Trophy, ArrowRight, User } from 'lucide-react';

export const About = () => {
  return (
    <section id="about" className="relative w-full h-full py-12 md:py-16 bg-[#050505] overflow-clip flex flex-col items-center justify-center z-10">

      {/* Content Wrapper */}
      <div className="w-full max-w-[1728px] mx-auto relative flex flex-col items-center z-10 px-4 md:px-8 lg:px-12">

        {/* Two-Column Composition */}
        <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-10 xl:gap-12 items-stretch">


          {/* LEFT SIDE: Visuals & Cards */}
          <div className="relative w-full mt-8 lg:mt-0 h-full">

            {/* Main Image Container */}
            <div className="relative w-full h-full min-h-[300px] rounded-[20px] overflow-hidden bg-[#050505] shadow-xl z-10">
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
                <div className="absolute -top-10 -right-10 w-20 h-20 rotate-45" />
                <span className="absolute top-2 right-1.5 text-[#050505] text-[7px] font-black tracking-widest rotate-45 select-none">EXP</span>

                <div className="flex flex-col relative z-10 text-[#050505]">
                  <h3 className="font-display font-black text-5xl md:text-6xl tracking-tighter leading-none mb-1">
                    10+
                  </h3>
                  <span className="font-bold text-xs tracking-widest uppercase mb-3">
                    Years
                  </span>
                  <p className="font-medium text-xs md:text-sm leading-tight max-w-[140px] opacity-90">
                    Of delivering indigenous R&D solutions.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT SIDE: Main Content Card */}
          <div className="relative w-full mt-24 sm:mt-16 lg:mt-0 z-10 h-full">

            <div className="bg-[#050505] rounded-[20px] h-full p-6 md:p-8 lg:p-10 border border-[#1a1c1a] relative z-10 shadow-2xl flex flex-col justify-center">

              {/* Badge/Title Area */}
              <div className="mb-6">
                <span className="text-[#23abe6] text-xs font-bold uppercase tracking-[0.2em]">
                  [ ABOUT SINC LAB ]
                </span>
                <h2 className="text-white font-display font-black text-3xl md:text-4xl lg:text-[40px] leading-[1.1] tracking-tight mt-4 max-w-xl">
                  Enhancing Mission-Critical<br className="hidden md:block" />
                  Readiness Through<br className="hidden md:block" />
                  Innovative Engineering.
                </h2>
              </div>

              {/* Paragraphs */}
              <div className="text-[#a0a0a0] font-sans text-[15px] leading-relaxed mb-8 max-w-xl space-y-4">
                <p>
                  SINC is a research and development lab dedicated to enhancing mission-critical readiness through innovative engineering, technology insertion, and functional replacement solutions. Our expertise spans sensing, embedded processing, secure communications, and data analytics to address operational challenges across maritime and defense environments.
                </p>
                <p>
                  Driven by reliability, sustainability, and indigenous innovation, we develop practical systems/sub-systems that overcome obsolescence, supply chain constraints, and evolving operational requirements. Our solutions are designed to transition seamlessly from R&D designs into practical implementations.
                </p>
              </div>

              {/* Statistics */}
              <div className="flex items-center gap-8 md:gap-12 mb-8 pt-6 border-t border-[#1a1c1a]">
                <div className="flex flex-col">
                  <span className="text-[#23abe6] font-display font-black text-4xl md:text-5xl leading-none tracking-tighter mb-2">4</span>
                  <span className="text-[#a0a0a0] text-sm font-medium">Core Technology Pillars.</span>
                </div>
                <div className="w-[1px] h-12 bg-[#1a1c1a]" />
                <div className="flex flex-col">
                  <span className="text-[#23abe6] font-display font-black text-4xl md:text-5xl leading-none tracking-tighter mb-2">15+</span>
                  <span className="text-[#a0a0a0] text-sm font-medium">Flagship Solutions.</span>
                </div>
              </div>

              {/* CTA Button */}
              <a href="https://sincresearch.com" target="_blank" rel="noopener noreferrer" className="group flex items-center bg-[#111211] hover:bg-[#1a1c1a] border border-[#292B29] rounded-full p-1.5 pr-6 transition-all duration-300 w-fit">
                <div className="w-10 h-10 bg-[#23abe6] rounded-full flex items-center justify-center mr-4 group-hover:scale-105 transition-transform duration-300 shadow-[0_0_15px_rgba(35,171,230,0.4)]">
                  <ArrowRight className="w-4 h-4 text-[#050505] -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                </div>
                <span className="text-white font-semibold text-sm">sincresearch.com</span>
              </a>

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
                      RESEARCH & DEVELOPMENT LAB • SINC • 
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

export default About;
