import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, ShieldCheck, Target, ChevronRight, ArrowUpRight } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    quote: "SINC 3D's sensor arrays have completely redefined our maritime threat detection capabilities. The predictive intelligence is unparalleled — nothing else on the market comes close.",
    author: "Cmdr. James Vance",
    role: "Naval Operations, 7th Fleet",
    icon: ShieldCheck,
    metric: "99.8%",
    metricLabel: "Detection Accuracy",
    tag: "Defense",
    index: "01",
  },
  {
    id: 2,
    quote: "The seamless integration of edge AI into our legacy defense systems allowed us to modernize without a complete overhaul. Brilliant engineering that respects real operational constraints.",
    author: "Dr. Sarah Chen",
    role: "Director of Defense Tech, Sentinel",
    icon: Activity,
    metric: "< 12ms",
    metricLabel: "Processing Latency",
    tag: "Edge AI",
    index: "02",
  },
  {
    id: 3,
    quote: "Unmatched telemetry precision. The platform's ability to maintain real-time strategic oversight in high-interference zones is a game changer for global trade security operations.",
    author: "Marcus Thorne",
    role: "Chief Analyst, Global Trade Security",
    icon: Target,
    metric: "Global",
    metricLabel: "Coverage Reach",
    tag: "Telemetry",
    index: "03",
  }
];

export const Testimonials = () => {
  const [active, setActive] = useState(0);
  const item = testimonials[active];
  const Icon = item.icon;

  return (
    <section className="relative w-full py-16 md:py-20 bg-[#050505] overflow-hidden flex flex-col items-center z-10">

      {/* Background ambient glow */}
      <div className="absolute -top-[20%] left-[20%] w-[60vw] h-[60vw] bg-[#23abe6]/[0.04] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[30vw] h-[30vw] bg-[#23abe6]/[0.03] rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-[1720px] mx-auto px-4 md:px-8 relative z-10">

        {/* Section Header */}
        <div className="w-full flex flex-col items-start z-10 select-none mb-10 md:mb-14">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#2ba9e3] mb-2"
          >
            Strategic Endorsements
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="w-fit font-display font-black text-[28px] sm:text-[44px] md:text-[60px] leading-[0.95] tracking-tighter bg-gradient-to-r from-[#2ba9e3] to-white bg-clip-text text-transparent pb-2 md:pb-3 pt-1"
          >
            Trusted by the Vanguard
          </motion.h2>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-4 md:gap-6">

          {/* LEFT: Featured Quote Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative border border-white/[0.06] bg-white/[0.015] overflow-hidden flex flex-col justify-between p-8 md:p-12 min-h-[400px] md:min-h-[460px]"
          >
            {/* Top-left corner accent */}
            <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-[#23abe6]/40" />
            <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-[#23abe6]/40" />

            {/* Metric bubble */}
            <div className="flex items-start justify-between mb-10">
              <div className="flex items-center gap-2 px-3 py-1.5 border border-[#23abe6]/20 bg-[#23abe6]/5">
                <Icon className="w-3.5 h-3.5 text-[#23abe6]" />
                <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-white/40">{item.tag}</span>
              </div>
              <div className="text-right">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active + 'metric'}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="font-display font-black text-[32px] md:text-[44px] tracking-tighter text-[#23abe6] leading-none">{item.metric}</p>
                    <p className="text-[9px] font-mono uppercase tracking-[0.15em] text-white/30 mt-1">{item.metricLabel}</p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Quote text */}
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={active + 'quote'}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="flex-1 flex flex-col justify-center"
              >
                <p className="text-white/80 font-sans text-[18px] md:text-[22px] leading-[1.65] font-light tracking-wide">
                  <span className="text-[#23abe6]/40 font-display text-[60px] leading-[0] relative top-[20px] mr-2 font-black">"</span>
                  {item.quote}
                  <span className="text-[#23abe6]/40 font-display text-[60px] leading-[0] relative top-[20px] ml-1 font-black">"</span>
                </p>
              </motion.blockquote>
            </AnimatePresence>

            {/* Author */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active + 'author'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-4 mt-10 pt-6 border-t border-white/[0.05]"
              >
                {/* Avatar placeholder */}
                <div className="w-10 h-10 rounded-full bg-[#23abe6]/10 border border-[#23abe6]/20 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-[#23abe6]/60" />
                </div>
                <div>
                  <p className="text-white font-display font-semibold text-[13px] tracking-wider">{item.author}</p>
                  <p className="text-white/40 text-[10px] font-mono uppercase tracking-widest mt-0.5">{item.role}</p>
                </div>
                <div className="ml-auto text-[9px] font-mono text-white/20 tracking-widest">{item.index} / 0{testimonials.length}</div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* RIGHT: Selector Stack */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="flex flex-col gap-3"
          >
            {testimonials.map((t, i) => {
              const TIcon = t.icon;
              const isActive = i === active;
              return (
                <button
                  key={t.id}
                  onClick={() => setActive(i)}
                  className={`group relative w-full text-left p-5 border transition-all duration-400 overflow-hidden flex flex-col gap-3 ${
                    isActive
                      ? 'border-[#23abe6]/40 bg-[#23abe6]/[0.06]'
                      : 'border-white/[0.05] bg-white/[0.015] hover:border-white/10 hover:bg-white/[0.03]'
                  }`}
                >
                  {/* Active left bar */}
                  <div className={`absolute top-0 left-0 w-[3px] h-full transition-all duration-500 ${isActive ? 'bg-[#23abe6]' : 'bg-transparent group-hover:bg-white/10'}`} />

                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <TIcon className={`w-4 h-4 transition-colors ${isActive ? 'text-[#23abe6]' : 'text-white/30 group-hover:text-white/50'}`} />
                      <span className={`text-[9px] font-mono uppercase tracking-widest transition-colors ${isActive ? 'text-[#23abe6]' : 'text-white/30'}`}>{t.tag}</span>
                    </div>
                    <ArrowUpRight className={`w-3.5 h-3.5 transition-all duration-300 ${isActive ? 'text-[#23abe6] opacity-100' : 'text-white/20 opacity-0 group-hover:opacity-60'}`} />
                  </div>

                  <p className={`font-sans text-[12px] leading-[1.6] transition-colors line-clamp-2 ${isActive ? 'text-white/75' : 'text-white/35 group-hover:text-white/50'}`}>
                    {t.quote.substring(0, 90)}...
                  </p>

                  <div className={`flex items-center justify-between border-t pt-3 transition-colors ${isActive ? 'border-white/[0.07]' : 'border-white/[0.04]'}`}>
                    <div>
                      <p className={`text-[11px] font-display font-semibold transition-colors ${isActive ? 'text-white/90' : 'text-white/40'}`}>{t.author}</p>
                      <p className={`text-[9px] font-mono uppercase tracking-widest mt-0.5 transition-colors ${isActive ? 'text-white/35' : 'text-white/20'}`}>{t.role.split(',')[0]}</p>
                    </div>
                    <span className={`text-[9px] font-mono tracking-widest transition-colors ${isActive ? 'text-[#23abe6]/60' : 'text-white/15'}`}>{t.index}</span>
                  </div>
                </button>
              );
            })}

            {/* Navigation dots */}
            <div className="flex items-center gap-2 pt-2 px-1">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`transition-all duration-300 ${i === active ? 'w-8 h-1 bg-[#23abe6]' : 'w-3 h-1 bg-white/15 hover:bg-white/30'}`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
