import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Activity, ShieldCheck, Target } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    quote: "SINC 3D's sensor arrays have completely redefined our maritime threat detection capabilities. The predictive intelligence is unparalleled.",
    author: "Cmdr. James Vance",
    role: "Naval Operations, 7th Fleet",
    icon: ShieldCheck,
    metric: "99.8% Accuracy"
  },
  {
    id: 2,
    quote: "The seamless integration of edge AI into our legacy defense systems allowed us to modernize without a complete overhaul. Brilliant engineering.",
    author: "Dr. Sarah Chen",
    role: "Director of Defense Tech, Sentinel",
    icon: Activity,
    metric: "< 12ms Latency"
  },
  {
    id: 3,
    quote: "Unmatched telemetry precision. The platform's ability to maintain real-time strategic oversight in high-interference zones is a game changer.",
    author: "Marcus Thorne",
    role: "Chief Analyst, Global Trade Security",
    icon: Target,
    metric: "Global Coverage"
  }
];

export const Testimonials = () => {
  return (
    <section className="relative w-full pt-48 pb-16 bg-[#050505] overflow-hidden flex flex-col items-center z-10">
      
      {/* Background ambient glows */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] bg-[#0284c7]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] bg-[#23abe6]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[1728px] w-full px-6 md:px-12 lg:px-24 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 mb-4"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-cyan-400">
              Strategic Endorsements
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-semibold text-3xl md:text-5xl lg:text-6xl text-white tracking-tight"
          >
            Trusted by the Vanguard
          </motion.h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                whileHover={{ y: -5 }}
                className="group relative p-8 md:p-10 rounded-[2rem] bg-white/[0.02] border border-white/[0.05] hover:border-cyan-500/30 transition-all duration-500 overflow-hidden backdrop-blur-md flex flex-col justify-between min-h-[320px]"
              >
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-transparent to-transparent group-hover:from-cyan-500/10 transition-colors duration-500" />
                
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <Quote className="w-8 h-8 text-cyan-500/40 group-hover:text-cyan-400 transition-colors duration-500" />
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.05]">
                      <Icon className="w-3.5 h-3.5 text-cyan-400" />
                      <span className="text-[9px] font-mono uppercase tracking-widest text-white/70">
                        {item.metric}
                      </span>
                    </div>
                  </div>
                  <p className="text-white/80 font-sans text-base md:text-lg leading-relaxed mb-8">
                    "{item.quote}"
                  </p>
                </div>

                <div className="relative z-10 pt-6 border-t border-white/[0.05]">
                  <h4 className="font-display font-semibold text-white tracking-wide text-sm">
                    {item.author}
                  </h4>
                  <p className="text-cyan-400/80 text-[11px] font-semibold uppercase tracking-wider mt-1">
                    {item.role}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
