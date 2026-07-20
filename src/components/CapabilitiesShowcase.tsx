import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';

const capabilities = [
  {
    id: "advanced-sensing",
    title: "Advanced Sensing Technologies",
    badge: "1 / CORE",
    description: "SINC Lab develops and integrates sensing systems that enable the collection of critical operational data from maritime environments and onboard systems. These sensing solutions provide the foundational input required for real-time monitoring, control, and situational awareness.",
    image: "/assets/sensing_clean.png",
    features: [
      "Real-time monitoring",
      "Control systems",
      "Situational awareness",
      "Maritime environment data"
    ],
    cta: "Explore Advanced Sensing"
  },
  {
    id: "radar-rf",
    title: "Radar & RF Sensing",
    badge: "2 / TECHNOLOGY AREAS",
    description: "SINC Lab is actively engaged in the development and application of Radar and RF sensing technologies for maritime surveillance and navigation. These technologies form a critical component of SINC Lab's sensing domain.",
    image: "/assets/processing_clean.png",
    features: [
      "Radar systems",
      "RF and Microwave sensing technologies",
      "Signal acquisition and modelling",
      "Enabling radio demonstration, testing, and analysis of electromagnetic signals"
    ],
    cta: "Explore Radar & RF"
  },
  {
    id: "environmental",
    title: "Environmental Sensors",
    badge: "3 / TECHNOLOGY AREAS",
    description: "We develop and deploy environmental sensing systems to measure and monitor key physical variables. These systems continuously capture data from the surrounding environment to support the performance, reliability, and health of operational systems.",
    image: "/assets/sensor_fusion.png",
    features: [
      "Temperature",
      "Pressure",
      "Gas Presence",
      "Humidity"
    ],
    cta: "Explore Environmental"
  },
  {
    id: "control-interface",
    title: "Control & Interface Sensors",
    badge: "4 / TECHNOLOGY AREAS",
    description: "Control and interface sensing systems are designed to bridge physical sensors with embedded and digital platforms, enabling accurate data acquisition and system interaction. These solutions ensure that sensor outputs are properly captured and converted.",
    image: "/assets/autonomous_sensing.png",
    features: [
      "Electrical Control Units (ECUs)",
      "Embedded sensing modules",
      "Sensor interface systems",
      "Signal conditioning systems"
    ],
    cta: "Explore Control & Interface"
  }
];

const textVariants: any = {
  initial: { opacity: 0, y: -20, filter: "blur(2px)" },
  animate: (custom: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1], delay: custom }
  }),
  exit: {
    opacity: 0,
    y: 20,
    filter: "blur(2px)",
    transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] }
  }
};

const ctaVariants: any = {
  initial: { opacity: 0, y: 12, filter: "blur(2px)" },
  animate: (custom: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 200, damping: 20, delay: custom }
  }),
  exit: {
    opacity: 0,
    y: 12,
    filter: "blur(2px)",
    transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] }
  }
};

export const CapabilitiesShowcase: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Preload images
  useEffect(() => {
    capabilities.forEach((cap, index) => {
      if (index !== 0) { // First image is loaded naturally via priority in Next.js, or just eager in React
        const img = new Image();
        img.src = cap.image;
      }
    });
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    let newIndex = activeIndex;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      newIndex = Math.min(activeIndex + 1, capabilities.length - 1);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      newIndex = Math.max(activeIndex - 1, 0);
    } else if (e.key === 'Home') {
      newIndex = 0;
    } else if (e.key === 'End') {
      newIndex = capabilities.length - 1;
    }
    
    if (newIndex !== activeIndex) {
      e.preventDefault();
      setActiveIndex(newIndex);
    }
  };

  const activeCap = capabilities[activeIndex];

  return (
    <div id="sensing-capabilities" className="w-full text-white">
      
      {/* MOBILE LAYOUT (Hidden on md+) */}
      <div className="w-full md:hidden flex flex-col pt-8 pb-16 px-6">
        <div className="w-full flex flex-col items-start text-left mb-8">
          <h2 className="w-fit inline-block font-display font-black text-[36px] sm:text-[40px] leading-[0.95] tracking-tighter bg-gradient-to-r from-[#2ba9e3] to-[#050c26] bg-clip-text text-transparent pb-1 pt-1">
            Sensing
          </h2>
          <div className="mt-3 text-left text-gray-600 font-normal text-[14px] leading-relaxed max-w-full">
            <p className="invert-text">
              Intelligent autonomous sensor systems detecting signals in real-time.
            </p>
          </div>
        </div>
        
        {/* Horizontal Tabs */}
        <div 
          className="flex gap-3 overflow-x-auto hide-scrollbar pb-4 snap-x focus:outline-none"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          aria-label="Capabilities Navigation"
        >
          {capabilities.map((cap, i) => {
            const isActive = activeIndex === i;
            return (
              <button
                key={cap.id}
                onClick={() => setActiveIndex(i)}
                aria-selected={isActive}
                role="tab"
                className={`snap-start shrink-0 relative px-5 py-3 rounded-full text-sm font-semibold transition-colors duration-300 ${
                  isActive ? 'text-[#23abe6]' : 'text-gray-500 hover:text-gray-800 invert-text'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="mobileActiveTab"
                    className="absolute inset-0 bg-[#23abe6]/10 border border-[#23abe6]/30 rounded-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{cap.title}</span>
              </button>
            );
          })}
        </div>

        {/* Mobile Content (Crossfade) */}
        <div className="mt-8 relative h-[650px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCap.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-6"
            >
              <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden relative bg-white/5 border border-black/5 shadow-lg">
                <img src={activeCap.image} alt={activeCap.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col gap-4">
                <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#23abe6]">{activeCap.badge}</div>
                <h3 className="font-display font-semibold text-2xl tracking-tight text-gray-900 invert-text">{activeCap.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed invert-text">{activeCap.description}</p>
                <ul className="space-y-3 mt-2">
                  {activeCap.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-gray-600 invert-text">
                      <CheckCircle2 className="w-4 h-4 text-[#23abe6] mt-0.5 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* DESKTOP LAYOUT (Hidden on mobile) */}
      <div 
        className="relative w-full hidden md:flex flex-col items-center pt-8 lg:pt-12 pb-20 lg:pb-32 px-6 lg:px-12 pointer-events-auto"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        aria-label="Capabilities Showcase"
      >
        <div className="w-full max-w-[1720px] mx-auto flex flex-col gap-4 lg:gap-6">
          
          {/* Section Header */}
          <div className="w-full flex flex-col items-center md:items-start text-center md:text-left z-10 select-none px-4 md:px-8">
            <h2 className="w-fit inline-block mx-auto md:mx-0 font-display font-black text-[28px] sm:text-[54px] md:text-[76px] leading-[0.95] tracking-tighter bg-gradient-to-r from-[#2ba9e3] to-[#050c26] bg-clip-text text-transparent pb-2 md:pb-3 pt-1">
              Sensing
            </h2>
            <div className="mt-2 md:mt-6 text-center md:text-left text-gray-600 font-normal text-[13px] sm:text-[14px] md:text-[20px] leading-relaxed max-w-full md:max-w-[50%] space-y-2 md:space-y-4">
              <p className="text-[13px] sm:text-[14px] md:text-[20px] invert-text">
                Intelligent autonomous sensor systems detecting signals in real-time.
              </p>
            </div>
          </div>
          
          {/* Top Cards with Navigation Arrows */}
          <div className="flex items-center gap-2 lg:gap-4 w-full">
            <button 
              onClick={() => setActiveIndex(prev => prev > 0 ? prev - 1 : capabilities.length - 1)}
              className="p-3 rounded-full border border-black/10 hover:bg-black/5 hover:scale-105 transition-all text-gray-500 hover:text-gray-900 invert-text flex-shrink-0"
              aria-label="Previous capability"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="grid grid-cols-4 gap-3 lg:gap-6 flex-1">
              {capabilities.map((cap, i) => {
                const isActive = activeIndex === i;
                return (
                  <button
                    key={cap.id}
                    onClick={() => setActiveIndex(i)}
                    aria-selected={isActive}
                    role="tab"
                    className={`relative flex flex-col gap-3 p-4 lg:p-6 rounded-3xl border transition-all duration-300 text-left outline-none ${
                      isActive 
                        ? 'border-transparent scale-[1.02]' 
                        : 'border-black/5 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:border-black/10 hover:bg-black/[0.02]'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeCard"
                        className="absolute inset-0 bg-[#23abe6]/5 border-2 border-[#23abe6]/80 rounded-3xl shadow-[0_0_20px_rgba(35,171,230,0.15)]"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <div className="relative z-10 text-[9px] lg:text-xs font-bold tracking-widest text-gray-400">{cap.badge}</div>
                    <div className={`relative z-10 text-base lg:text-xl font-display font-semibold tracking-tight transition-colors duration-300 ${isActive ? 'text-[#23abe6]' : 'text-gray-900 invert-text'}`}>
                      {cap.title}
                    </div>
                  </button>
                );
              })}
            </div>

            <button 
              onClick={() => setActiveIndex(prev => prev < capabilities.length - 1 ? prev + 1 : 0)}
              className="p-3 rounded-full border border-black/10 hover:bg-black/5 hover:scale-105 transition-all text-gray-500 hover:text-gray-900 invert-text flex-shrink-0"
              aria-label="Next capability"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Dynamic Content */}
          <div className="bg-white/40 border border-black/5 rounded-[2rem] py-12 px-8 lg:py-16 lg:px-12 w-full h-[550px] lg:h-[600px] flex items-center shadow-xl relative overflow-hidden backdrop-blur-md">
            <div className="grid grid-cols-2 gap-12 lg:gap-20 w-full">
              
              {/* Content Side */}
              <div className="flex flex-col justify-center relative z-10">
                <AnimatePresence mode="wait">
                  <motion.div key={activeCap.id} className="flex flex-col">
                    <motion.span 
                      custom={0.06} variants={textVariants} initial="initial" animate="animate" exit="exit"
                      className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#23abe6] mb-4"
                    >
                      {activeCap.badge}
                    </motion.span>
                    
                    <motion.h3 
                      custom={0.14} variants={textVariants} initial="initial" animate="animate" exit="exit"
                      className="font-display font-semibold text-3xl lg:text-5xl text-gray-900 invert-text tracking-tight mb-6 leading-tight"
                    >
                      {activeCap.title}
                    </motion.h3>
                    
                    <motion.p 
                      custom={0.22} variants={textVariants} initial="initial" animate="animate" exit="exit"
                      className="text-gray-700 text-base lg:text-lg leading-relaxed mb-8 invert-text"
                    >
                      {activeCap.description}
                    </motion.p>
                    
                    <motion.ul 
                      custom={0.30} variants={textVariants} initial="initial" animate="animate" exit="exit"
                      className="space-y-4 mb-10"
                    >
                      {activeCap.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-gray-600 invert-text">
                          <CheckCircle2 className="w-5 h-5 text-[#23abe6] mt-0.5 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </motion.ul>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Image Side */}
              <div className="flex items-center justify-center relative">
                <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden relative border border-black/5 shadow-2xl">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeCap.id}
                      src={activeCap.image}
                      alt={activeCap.title}
                      loading={activeIndex === 0 ? "eager" : "lazy"}
                      className="absolute inset-0 w-full h-full object-cover"
                      initial={{ opacity: 0, scale: 1.02 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </AnimatePresence>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
