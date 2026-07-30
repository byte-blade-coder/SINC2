import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export function BlindSection() {
  return (
    <div className="w-full h-screen bg-[#050505] text-white flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* TRIONN style background graphics / glows */}
      <div
        className="absolute top-[20%] left-[20%] rounded-full pointer-events-none"
        style={{
          width: '40vw',
          height: '40vw',
          background: 'rgba(255, 100, 50, 0.05)',
          filter: 'blur(100px)',
        }}
      />
      <div
        className="absolute bottom-[20%] right-[20%] rounded-full pointer-events-none"
        style={{
          width: '30vw',
          height: '30vw',
          background: 'rgba(50, 200, 255, 0.05)',
          filter: 'blur(80px)',
        }}
      />

      <div className="max-w-[1728px] w-full px-6 md:px-12 lg:px-24 flex flex-col items-center text-center relative z-10">
        
        {/* Subtle Top Text like in Trionn */}
        <div className="absolute top-24 left-12 text-left text-white/50 text-[10px] md:text-xs tracking-widest uppercase font-semibold leading-relaxed">
          FOCUSED VISION. <br/>
          MEASURED EXECUTION.
        </div>

        {/* Big center heading or 3D element representation */}
        <h2 className="font-display font-black text-5xl md:text-7xl lg:text-[8rem] leading-[0.9] tracking-tighter mb-10 mt-32">
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
