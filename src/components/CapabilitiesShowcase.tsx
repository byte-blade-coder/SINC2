import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ChevronLeft, ChevronRight, Compass, Cpu, Globe, Activity } from 'lucide-react';

interface CapabilityItem {
  id: string;
  title: string;
  badge: string;
  description: string;
  image: string;
  features: string[];
  footerDesc?: string;
  cta: string;
}

const capabilitiesData: CapabilityItem[] = [
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

const processingData: CapabilityItem[] = [
  {
    id: "processing-platforms",
    title: "Processing Platforms",
    badge: "1 / HARDWARE",
    description: "A range of high-performance hardware platforms is utilized to support real-time data processing, control, and system integration across mission-critical applications. This includes:",
    image: "/assets/processing_clean.png",
    features: [
      "Field Programmable Gate Arrays (FPGAs)",
      "Graphics Processing Units (GPUs)",
      "Single Board Computers (SBCs)",
      "Digital Signal Processors (DSPs)",
      "Microcontroller-based embedded systems"
    ],
    footerDesc: "These platforms provide the required computational capability to handle complex algorithms, process high-speed data streams, and enable efficient system operation, forming the backbone of advanced processing and embedded solutions.",
    cta: "Explore Processing Platforms"
  },
  {
    id: "signal-processing",
    title: "Signal Processing",
    badge: "2 / ALGORITHMS",
    description: "Specialized signal processing algorithms are developed to extract meaningful information from complex and high-volume data streams. This includes:",
    image: "/assets/sensor_fusion.png",
    features: [
      "Radar signal processing",
      "RF signal analysis",
      "Advanced noise reduction and filtering techniques"
    ],
    footerDesc: "These algorithms enable accurate detection, target identification, signal enhancement, and real-time analysis, providing reliable inputs for mission-critical sensing and decision-support applications.",
    cta: "Explore Signal Processing"
  },
  {
    id: "communication-algorithms",
    title: "Communication Algorithms",
    badge: "3 / ALGORITHMS",
    description: "Communication algorithms are designed to enable efficient, secure, and reliable transmission of information across diverse communication platforms. This includes:",
    image: "/assets/communication_clean.png",
    features: [
      "Modulation and demodulation",
      "Spectrum analysis",
      "Data encoding and decoding"
    ],
    footerDesc: "These algorithms improve communication reliability, maximize spectrum utilization, and ensure accurate data exchange, supporting robust connectivity in mission-critical environments.",
    cta: "Explore Communication"
  },
  {
    id: "control-systems",
    title: "Control Systems",
    badge: "4 / ALGORITHMS",
    description: "Control systems are developed to enable intelligent, stable, and responsive operation of mission-critical platforms. This includes:",
    image: "/assets/autonomous_sensing.png",
    features: [
      "Embedded control algorithms",
      "Autonomous system control",
      "Stability and response optimization"
    ],
    footerDesc: "These solutions enhance automation, operational efficiency, and system reliability, allowing platforms to maintain optimal performance while adapting to changing mission and environmental requirements.",
    cta: "Explore Control Systems"
  }
];

const communicationData: CapabilityItem[] = [
  {
    id: "software-defined-communication",
    title: "Software Defined Communication",
    badge: "1 / TECHNOLOGIES",
    description: "Leverages Software Defined Radio (SDR) technology to provide flexible, programmable, and reconfigurable communication capabilities. By implementing communication functions in software rather than fixed hardware, these systems can support multiple waveforms, frequency bands, and communication protocols on a single platform.",
    image: "/assets/communication_clean.png",
    features: [],
    footerDesc: "This approach enables rapid adaptation to evolving operational requirements, improved interoperability, and efficient spectrum utilization, making it well suited for modern mission-critical and maritime communication systems.",
    cta: "Explore Software Defined Communication"
  },
  {
    id: "satellite-communications",
    title: "Satellite Communications",
    badge: "2 / TECHNOLOGIES",
    description: "We develop satellite communication (SATCOM) solutions to enable reliable beyond-line-of-sight (BLOS) connectivity for maritime and remote operations. Our capabilities include:",
    image: "/assets/quantum_security.png",
    features: [
      "SATCOM integration",
      "Long-range maritime communication links"
    ],
    footerDesc: "These solutions facilitate the secure transmission of voice, data, and mission-critical information between ships, offshore assets, and command centres, supporting continuous connectivity across extended operational environments.",
    cta: "Explore Satellite Communications"
  },
  {
    id: "lpwan",
    title: "Low Power Wide Area Networks (LPWAN)",
    badge: "3 / TECHNOLOGIES",
    description: "We develop LoRaWAN-based communication systems to enable reliable, long-range, and low-power connectivity for distributed sensing and monitoring applications. These solutions are designed to support remote assets where conventional communication infrastructure is limited or power efficiency is critical.",
    image: "/assets/edge_telemetry.png",
    features: [],
    footerDesc: "Our LPWAN capabilities facilitate secure transmission of sensor data over extended distances, making them well suited for maritime platforms, environmental monitoring, industrial automation, and IoT-based deployments. They provide scalable and cost-effective connectivity while ensuring continuous monitoring of mission-critical assets.",
    cta: "Explore LPWAN"
  },
  {
    id: "wireless-networking",
    title: "Wireless Networking",
    badge: "4 / TECHNOLOGIES",
    description: "We design and integrate wireless networking solutions to provide reliable, secure, and high-performance connectivity across mission-critical environments. Our capabilities include:",
    image: "/assets/sensor_fusion.png",
    features: [
      "Zigbee communication networks",
      "Wi-Fi systems",
      "Cellular communication networks"
    ],
    footerDesc: "These solutions support real-time data exchange, remote monitoring, and interoperable system integration, ensuring dependable connectivity for maritime operations, industrial automation, and critical infrastructure deployments.",
    cta: "Explore Wireless Networking"
  },
  {
    id: "operational-data-links",
    title: "Operational Data Links",
    badge: "5 / TECHNOLOGIES",
    description: "We develop secure operational data links that enable reliable exchange of mission-critical information between sensors, platforms, and command centers. Our capabilities include:",
    image: "/assets/data_analytics_clean.png",
    features: [
      "Sensor-to-platform communication",
      "Platform-to-command centre connectivity"
    ],
    footerDesc: "These communication solutions provide low-latency, secure, and interoperable connectivity, supporting real-time situational awareness, coordinated operations, and informed decision-making in demanding operational environments.",
    cta: "Explore Operational Data Links"
  }
];

const analyticsData: CapabilityItem[] = [
  {
    id: "traffic-intelligence",
    title: "Maritime Traffic Intelligence",
    badge: "1 / ANALYTICS",
    description: "Advanced analytics are developed to monitor, classify, and analyze maritime traffic by tracking both commercial shipping and fishing vessel movements. These capabilities provide continuous operational visibility, identify movement patterns, and support informed maritime decision-making.",
    image: "/assets/data_analytics_clean.png",
    features: [
      "Real-time vessel tracking",
      "Maritime traffic analysis",
      "Route and movement monitoring",
      "Fishing vessel detection",
      "Activity classification",
      "Operational pattern analysis"
    ],
    footerDesc: "Shipping & Fishing Activity Analytics support comprehensive vessel classification and tracking to ensure complete operational visibility.",
    cta: "Explore Traffic Intelligence"
  },
  {
    id: "threat-intelligence",
    title: "Maritime Threat Intelligence",
    badge: "2 / ANALYTICS",
    description: "Intelligent analytics are used to identify suspicious maritime behaviour by detecting unauthorized operations and vessels attempting to conceal their identity. Behavioural analysis and anomaly detection enable early identification of potential maritime threats.",
    image: "/assets/quantum_security.png",
    features: [
      "Narcotics trafficking detection",
      "Unauthorized maritime operations",
      "Suspicious activity analysis",
      "AIS anomaly detection",
      "Non-cooperative vessel identification",
      "Behavioural analytics"
    ],
    footerDesc: "Illegal & Dark Shipping Detection helps identify unauthorized operations and non-cooperative vessels trying to bypass surveillance.",
    cta: "Explore Threat Intelligence"
  },
  {
    id: "safety-environmental-intelligence",
    title: "Maritime Safety & Environmental Intelligence",
    badge: "3 / ANALYTICS",
    description: "Operational analytics support maritime safety and environmental protection by enabling rapid response to distress situations while continuously monitoring environmental incidents and unauthorized fishing activities.",
    image: "/assets/sensor_fusion.png",
    features: [
      "Distress event detection & incident monitoring",
      "SAR decision support",
      "Oil spill modeling & spill tracking",
      "Environmental impact monitoring",
      "Unauthorized fishing identification",
      "Geospatial behavior analysis"
    ],
    footerDesc: "Search & Rescue & Environmental Analytics enable rapid response to incidents while tracking spills and unauthorized fishing activities.",
    cta: "Explore Safety & Environmental"
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

interface DomainShowcaseSectionProps {
  id: string;
  title: string;
  subtitle: string;
  desc: string;
  icon: React.ElementType;
  badge: string;
  capabilities: CapabilityItem[];
}

const DomainShowcaseSection: React.FC<DomainShowcaseSectionProps> = ({
  id, title, subtitle, desc, icon: Icon, badge, capabilities
}) => {
  const [activeSubIndex, setActiveSubIndex] = useState(0);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    let newIndex = activeSubIndex;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      newIndex = Math.min(activeSubIndex + 1, capabilities.length - 1);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      newIndex = Math.max(activeSubIndex - 1, 0);
    } else if (e.key === 'Home') {
      newIndex = 0;
    } else if (e.key === 'End') {
      newIndex = capabilities.length - 1;
    }

    if (newIndex !== activeSubIndex) {
      e.preventDefault();
      setActiveSubIndex(newIndex);
    }
  };

  const activeCap = capabilities[activeSubIndex];

  return (
    <div id={`domain-${id}`} className="w-full text-white pt-24 pb-12 px-6 lg:px-12 border-b border-black/5 last:border-none">
      <div className="w-full max-w-[1720px] mx-auto flex flex-col gap-8 lg:gap-10">
        
        {/* Section Header */}
        <div className="w-full flex flex-col items-center md:items-start text-center md:text-left z-10 select-none px-4 md:px-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="p-2 bg-[#23abe6]/10 rounded-lg text-[#23abe6]">
              <Icon className="w-5 h-5" />
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#23abe6]">
              {badge} • Core Technology Domain
            </span>
          </div>
          <h2 className="w-fit inline-block mx-auto md:mx-0 font-display font-black text-[28px] sm:text-[44px] md:text-[60px] leading-[0.95] tracking-tighter bg-gradient-to-r from-[#2ba9e3] to-[#050c26] bg-clip-text text-transparent pb-2 md:pb-3 pt-1">
            {title}
          </h2>
          <div className="mt-2 text-center md:text-left text-gray-600 font-medium text-[16px] sm:text-[18px] md:text-[22px] leading-relaxed max-w-full md:max-w-[70%] invert-text">
            {subtitle}
          </div>
          <div className="mt-2 text-center md:text-left text-gray-500 font-normal text-[14px] sm:text-[15px] md:text-[18px] leading-relaxed max-w-full md:max-w-[60%] invert-text">
            {desc}
          </div>
        </div>

        {/* MOBILE: Horizontal Sub-tabs */}
        <div className="w-full md:hidden flex flex-col px-0 border-b border-black/5 relative">
          <div
            className="flex gap-6 overflow-x-auto hide-scrollbar pb-0 snap-x focus:outline-none px-6"
            tabIndex={0}
            onKeyDown={handleKeyDown}
            aria-label={`${title} Capabilities Navigation`}
          >
            {capabilities.map((cap, i) => {
              const isActive = activeSubIndex === i;
              return (
                <button
                  key={cap.id}
                  onClick={() => setActiveSubIndex(i)}
                  aria-selected={isActive}
                  role="tab"
                  className={`snap-start shrink-0 relative py-4 text-[13px] font-semibold tracking-wide transition-all duration-300 ${
                    isActive 
                      ? 'text-[#2ba9e3]' 
                      : 'text-gray-500 hover:text-gray-800'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId={`mobileActiveTabUnderline-${id}`}
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#2ba9e3] shadow-[0_-2px_10px_rgba(43,169,227,0.4)]"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{cap.title}</span>
                </button>
              );
            })}
          </div>

          {/* Mobile Content */}
          <div className="mt-4 relative min-h-[650px] px-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${id}-${activeCap.id}`}
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

                  {activeCap.features && activeCap.features.length > 0 && (
                    <ul className="space-y-3 mt-2">
                      {activeCap.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-gray-600 leading-relaxed invert-text">
                          <CheckCircle2 className="w-4 h-4 text-[#23abe6] mt-0.5 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {activeCap.footerDesc && (
                    <p className="text-gray-600 text-sm leading-relaxed mt-2 border-t border-black/5 pt-4 invert-text">
                      {activeCap.footerDesc}
                    </p>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* DESKTOP: Sub Cards with Navigation Arrows */}
        <div className="hidden md:flex flex-col w-full">
          <div className="flex items-center gap-2 lg:gap-4 w-full mt-4">
            <button
              onClick={() => setActiveSubIndex(prev => prev > 0 ? prev - 1 : capabilities.length - 1)}
              className="p-3 rounded-full border border-black/10 hover:bg-black/5 hover:scale-105 transition-all text-gray-500 hover:text-gray-900 invert-text flex-shrink-0"
              aria-label="Previous capability"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="grid gap-3 lg:gap-6 flex-1" style={{ gridTemplateColumns: `repeat(${capabilities.length}, minmax(0, 1fr))` }}
                 tabIndex={0}
                 onKeyDown={handleKeyDown}
            >
              {capabilities.map((cap, i) => {
                const isActive = activeSubIndex === i;
                return (
                  <button
                    key={cap.id}
                    onClick={() => setActiveSubIndex(i)}
                    aria-selected={isActive}
                    role="tab"
                    className={`relative flex flex-col gap-3 p-4 lg:p-6 rounded-3xl border transition-all duration-300 text-left outline-none ${isActive
                        ? 'border-[#23abe6]/80 scale-[1.03] translate-y-[-6px] bg-[#23abe6]/5 shadow-[0_15px_30px_rgba(35,171,230,0.22)]'
                        : 'border-black/5 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:border-black/10 hover:bg-black/[0.02]'
                      }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId={`activeCard-${id}`}
                        className="absolute inset-0 bg-[#23abe6]/5 border-2 border-[#23abe6]/80 rounded-3xl shadow-[0_0_20px_rgba(35,171,230,0.15)] pointer-events-none"
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
              onClick={() => setActiveSubIndex(prev => prev < capabilities.length - 1 ? prev + 1 : 0)}
              className="p-3 rounded-full border border-black/10 hover:bg-black/5 hover:scale-105 transition-all text-gray-500 hover:text-gray-900 invert-text flex-shrink-0"
              aria-label="Next capability"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Dynamic Content (Desktop) */}
          <div className="mt-8 bg-white/40 border border-black/5 rounded-[2rem] py-12 px-8 lg:py-16 lg:px-12 w-full min-h-[550px] lg:min-h-[600px] flex items-center shadow-xl relative overflow-hidden backdrop-blur-md">
            <div className="grid grid-cols-2 gap-12 lg:gap-20 w-full">
              {/* Content Side */}
              <div className="flex flex-col justify-center relative z-10 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${id}-${activeCap.id}`}
                    className="flex flex-col"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
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

                    {activeCap.features && activeCap.features.length > 0 && (
                      <motion.ul
                        custom={0.30} variants={textVariants} initial="initial" animate="animate" exit="exit"
                        className="space-y-4 mb-8"
                      >
                        {activeCap.features.map((feat, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-gray-700 text-base lg:text-lg leading-relaxed invert-text">
                            <CheckCircle2 className="w-5 h-5 text-[#23abe6] mt-1 shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </motion.ul>
                    )}

                    {activeCap.footerDesc && (
                      <motion.p
                        custom={0.38} variants={textVariants} initial="initial" animate="animate" exit="exit"
                        className="text-gray-700 text-base lg:text-lg leading-relaxed border-t border-black/5 pt-5 invert-text"
                      >
                        {activeCap.footerDesc}
                      </motion.p>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Image Side */}
              <div className="flex items-center justify-center relative">
                <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden relative border border-black/5 shadow-2xl bg-white/5">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={`${id}-${activeCap.id}`}
                      src={activeCap.image}
                      alt={activeCap.title}
                      loading="lazy"
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

export const CapabilitiesShowcase: React.FC = () => {
  const [activeDomain, setActiveDomain] = useState<'sensing' | 'processing' | 'communication' | 'analytics'>('sensing');
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleSelectDomain = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      const domain = customEvent.detail as 'sensing' | 'processing' | 'communication' | 'analytics';
      if (domain === 'sensing' || domain === 'processing' || domain === 'communication' || domain === 'analytics') {
        setActiveDomain(domain);
        
        // Scroll to the detail section with an offset for the sticky header
        if (sectionRef.current) {
          const headerOffset = 120;
          const elementPosition = sectionRef.current.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      }
    };
    window.addEventListener('select-domain', handleSelectDomain);
    return () => {
      window.removeEventListener('select-domain', handleSelectDomain);
    };
  }, []);

  const domains = [
    {
      id: 'sensing',
      title: 'Sensing',
      subtitle: 'Radar, RF & Environment',
      desc: 'Intelligent autonomous sensor systems detecting signals in real-time.',
      icon: Compass,
      badge: 'DOM-01',
      capabilities: capabilitiesData,
    },
    {
      id: 'processing',
      title: 'Processing',
      subtitle: 'Edge Compute & DSP',
      desc: 'High-speed computation at the edge for split-second decisions.',
      icon: Cpu,
      badge: 'DOM-02',
      capabilities: processingData,
    },
    {
      id: 'communication',
      title: 'Communication',
      subtitle: 'Resilient Tactical Networks',
      desc: 'Secure, encrypted, quantum-resistant data transmission networks.',
      icon: Globe,
      badge: 'DOM-03',
      capabilities: communicationData,
    },
    {
      id: 'analytics',
      title: 'Data Analytics',
      subtitle: 'Multi-Sensor Fusion & AI',
      desc: 'Intelligent fusion of multidimensional data for total situational awareness.',
      icon: Activity,
      badge: 'DOM-04',
      capabilities: analyticsData,
    }
  ];

  const activeDomainData = domains.find(d => d.id === activeDomain)!;

  return (
    <div ref={sectionRef} className="w-full relative bg-transparent z-10 font-sans pb-12 pt-6 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeDomain}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="w-full"
        >
          <DomainShowcaseSection
            id={activeDomainData.id}
            title={activeDomainData.title}
            subtitle={activeDomainData.subtitle}
            desc={activeDomainData.desc}
            icon={activeDomainData.icon}
            badge={activeDomainData.badge}
            capabilities={activeDomainData.capabilities}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
