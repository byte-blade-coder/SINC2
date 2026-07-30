import React from 'react';
import { ArrowUpRight } from 'lucide-react';

// No scroll animation props — this is a permanent section in normal document flow.
// It never fades, never scrolls away unexpectedly.
export function NextSection() {
  return (
    <div className="w-full min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center relative overflow-hidden py-24">
      {/* Ambient glows */}
      <div className="absolute top-[20%] left-[20%] w-[40vw] h-[40vw] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[20%] w-[30vw] h-[30vw] bg-cyan-500/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-[1728px] w-full px-6 md:px-12 lg:px-24 flex flex-col items-center text-center relative z-10">

        <div className="text-cyan-400 font-bold uppercase tracking-[0.3em] text-xs md:text-sm mb-6">
          System Ready
        </div>

        <h2 className="font-display font-black text-5xl md:text-7xl lg:text-[8rem] leading-[0.9] tracking-tighter mb-10">
          BUILD THE
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/40">
            FUTURE
          </span>
        </h2>

        <p className="max-w-2xl text-white/60 text-lg md:text-xl font-sans mb-12">
          Deploying autonomous maritime systems engineered for intelligence,
          navigation, and defense readiness.
        </p>

        <button className="group flex items-center justify-center gap-4 bg-white text-black px-8 py-5 rounded-full font-bold uppercase tracking-widest text-sm hover:scale-105 transition-transform duration-500 focus:outline-none">
          Initiate Contact
          <div className="bg-black/10 rounded-full p-2 group-hover:rotate-45 transition-transform duration-300">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </button>

      </div>
    </div>
  );
}
