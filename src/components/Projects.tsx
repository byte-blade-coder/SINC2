import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Testimonials from './Testimonials';

export interface ProjectSection {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface Project {
  id: number;
  number: string;
  badge: string;
  title: string;
  description: string;
  image: string;
  tech: string[];
  sections: ProjectSection[];
}

export const projectsData: Project[] = [
  {
    id: 1,
    number: '01',
    badge: 'Autonomous Sensing',
    title: 'Littoral Surveillance Array (LSA-12)',
    description: 'Deploying high-frequency hydrophone clusters to monitor near-shore acoustic signatures and detect low-profile littoral intrusions.',
    image: '/assets/sensing_clean.png',
    tech: ['Acoustic Array', 'Sub-meter Tracking', 'Edge Intelligence'],
    sections: [
      { id: 'challenge', title: 'The Challenge', description: 'Monitoring vast littoral zones requires persistent, low-power sensing capabilities that can operate autonomously in hostile environments without regular maintenance or data retrieval vessels.', image: '/assets/sensing_clean.png' },
      { id: 'approach', title: 'Our Approach', description: 'We engineered a highly distributed, mesh-networked array of hydrophone clusters featuring edge-processing nodes to filter out biological noise and isolate mechanical signatures locally.', image: '/assets/sensor_fusion.png' },
      { id: 'outcome', title: 'The Outcome', description: 'The LSA-12 achieved a 94% reduction in false positives and increased operational longevity by 300%, providing a continuous, real-time acoustic map of the monitored theater.', image: '/assets/processing_clean.png' },
      { id: 'whatWeDid', title: 'What We Did', description: 'Hardware Engineering, Acoustic Modeling, Embedded AI Filtering, Mesh Telemetry Setup, and Deep-Sea Deployment Logistics.', image: '/assets/data_analytics_clean.png' }
    ]
  },
  {
    id: 2,
    number: '02',
    badge: 'Signal Processing',
    title: 'Adaptive Noise Cancellation Core (ANC-X)',
    description: 'Real-time extraction of weak sonar returns from background shipping noise using edge-deployed deep learning filters.',
    image: '/assets/processing_clean.png',
    tech: ['TensorRT', 'Dynamic Filtering', 'FPGA Processing'],
    sections: [
      { id: 'challenge', title: 'The Challenge', description: 'Modern stealth vessels emit acoustic signatures that are frequently masked by heavy commercial shipping traffic, rendering traditional threshold-based sonar filtering ineffective.', image: '/assets/processing_clean.png' },
      { id: 'approach', title: 'Our Approach', description: 'We developed an FPGA-accelerated neural network capable of isolating and subtracting dynamic ambient noise profiles in real-time, allowing ultra-weak anomalies to surface in the spectrogram.', image: '/assets/sensing_clean.png' },
      { id: 'outcome', title: 'The Outcome', description: 'ANC-X extended the effective detection range by 40 nautical miles in highly congested shipping lanes, providing crucial early warning capabilities.', image: '/assets/communication_clean.png' },
      { id: 'whatWeDid', title: 'What We Did', description: 'Deep Learning Architecture, FPGA Synthesis, Real-Time Signal Processing, and Live-Sea Calibration.', image: '/assets/sensor_fusion.png' }
    ]
  },
  {
    id: 3,
    number: '03',
    badge: 'Secure Telemetry',
    title: 'Mesh Acoustic Transceiver (MAT-04)',
    description: 'Quantum-resistant underwater communication link utilizing multi-carrier frequency-hopping spreads for secure data transit.',
    image: '/assets/communication_clean.png',
    tech: ['Quantum-Safe', 'Multi-Band FHSS', 'Acoustic Mesh'],
    sections: [
      { id: 'challenge', title: 'The Challenge', description: 'Transmitting high-fidelity sensor data securely through the water column is notoriously difficult due to multipath fading, low bandwidth, and the ever-present threat of signal interception.', image: '/assets/communication_clean.png' },
      { id: 'approach', title: 'Our Approach', description: 'MAT-04 utilizes a proprietary multi-band frequency-hopping spread spectrum (FHSS) protocol layered with quantum-resistant encryption algorithms to ensure absolute data integrity.', image: '/assets/sensor_fusion.png' },
      { id: 'outcome', title: 'The Outcome', description: 'Achieved a sustained, intercept-proof underwater data link capable of transmitting compressed telemetry over 15 kilometers without repeaters.', image: '/assets/data_analytics_clean.png' },
      { id: 'whatWeDid', title: 'What We Did', description: 'Acoustic Protocol Design, Cryptographic Integration, Transducer Engineering, and Network Topology Mapping.', image: '/assets/sensing_clean.png' }
    ]
  },
  {
    id: 4,
    number: '04',
    badge: 'Tactical Analytics',
    title: 'Dynamic Threat Assessor (DTA-3)',
    description: 'Volumetric path prediction engine fusing lidar, radar, and sonar vectors to map defensive response paths in real-time.',
    image: '/assets/data_analytics_clean.png',
    tech: ['Sensor Fusion', '3D Volumetric Path', 'Predictive AI'],
    sections: [
      { id: 'challenge', title: 'The Challenge', description: 'Command centers are overwhelmed with disjointed data streams from disparate domains (air, surface, sub-surface), making split-second tactical decisions incredibly difficult.', image: '/assets/data_analytics_clean.png' },
      { id: 'approach', title: 'Our Approach', description: 'DTA-3 ingests raw vectors from every available sensor node, employing a predictive physics engine to construct a unified 3D holographic threat topology.', image: '/assets/communication_clean.png' },
      { id: 'outcome', title: 'The Outcome', description: 'Reduced command response latency from minutes to milliseconds, automating defensive posture recommendations across entire fleet groups.', image: '/assets/sensor_fusion.png' },
      { id: 'whatWeDid', title: 'What We Did', description: 'Sensor Fusion Algorithms, 3D Volumetric Rendering, Predictive Physics Engine, and C2 System Integration.', image: '/assets/processing_clean.png' }
    ]
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollAmount, setScrollAmount] = useState(0);

  // Measure the total track width to calculate how far it needs to scroll horizontally
  useEffect(() => {
    const updateScrollAmount = () => {
      if (trackRef.current) {
        const trackWidth = trackRef.current.scrollWidth;
        const windowWidth = window.innerWidth;
        const margin = windowWidth >= 768 ? 64 : 20;
        setScrollAmount(-(trackWidth - windowWidth + margin));
      }
    };

    updateScrollAmount();

    // Force a re-measurement after a short delay to account for image/font loading
    const timer = setTimeout(updateScrollAmount, 500);
    window.addEventListener('resize', updateScrollAmount);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateScrollAmount);
    };
  }, []);

  // We increase the section height to 400vh to give room for the slice transition at the end
  // We increase the section height to 400vh to give room for the slice transition at the end
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  // Apply a slight spring smoothing so it feels premium and scrubs nicely like GSAP
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 90,
    mass: 0.1,
  });

  // Horizontal scroll finishes at 75% of the total scroll
  const x = useTransform(smoothProgress, [0, 0.75], [0, scrollAmount]);

  // Fade in the giant IMPACT overlay between 70% and 75% of scroll
  const overlayOpacity = useTransform(smoothProgress, [0.7, 0.75], [0, 1]);

  // Pre-calculate 6 scaleY transforms to avoid Rules of Hooks violation in .map()
  const scaleY0 = useTransform(smoothProgress, [0.75, 0.90], [1, 0]);
  const scaleY1 = useTransform(smoothProgress, [0.77, 0.92], [1, 0]);
  const scaleY2 = useTransform(smoothProgress, [0.79, 0.94], [1, 0]);
  const scaleY3 = useTransform(smoothProgress, [0.81, 0.96], [1, 0]);
  const scaleY4 = useTransform(smoothProgress, [0.83, 0.98], [1, 0]);
  const scaleY5 = useTransform(smoothProgress, [0.85, 1.00], [1, 0]);
  const scaleYs = [scaleY0, scaleY1, scaleY2, scaleY3, scaleY4, scaleY5];

  return (
    <section ref={sectionRef} id="projects" className="relative h-[400vh] bg-[#f9fafb] z-20">
      <div 
        className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden bg-[#f9fafb]"
      >
        {/* Header Container */}
        <div className="max-w-[1728px] mx-auto w-full px-6 md:px-12 lg:px-24 mb-12 select-none">
          <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#0284c7]">
            Strategic Deployment
          </span>
          <h2 className="font-display font-semibold text-3xl md:text-5xl lg:text-6xl text-[#111827] tracking-tight mt-4 leading-[1.1]">
            Flagship Solutions
          </h2>
          <p className="text-gray-500 font-sans text-base md:text-lg leading-relaxed mt-4 max-w-2xl">
            Explore our latest systems built for intelligence, navigation, and defense readiness in maritime domains.
          </p>
        </div>

        {/* Cinematic Horizontal Scroll-Driven Viewport */}
        <div className="w-full relative overflow-visible">
          <motion.div
            ref={trackRef}
            className="flex flex-nowrap gap-6 md:gap-8 pl-[max(0.75rem,calc((100vw-1728px)/2+0.75rem))] md:pl-[max(1rem,calc((100vw-1728px)/2+1rem))] lg:pl-[max(1.25rem,calc((100vw-1728px)/2+1.25rem))] pr-6 no-scrollbar"
            style={{ width: 'max-content', x }}
          >
            {projectsData.map((project) => (
              <Link
                key={project.id}
                to={`/project/${project.id}`}
                className="flex-shrink-0 relative rounded-3xl border border-black/5 overflow-hidden bg-gray-50 aspect-[16/10] group shadow-sm hover:shadow-md transition-all duration-500 text-left focus:outline-none focus:ring-4 focus:ring-[#0284c7]/30"
                style={{
                  width: 'min(720px, 85vw)',
                }}
                aria-label={`View project details for ${project.title}`}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent pointer-events-none" />

                {/* Information Panel */}
                <div className="absolute bottom-0 inset-x-0 p-5 sm:p-8 flex flex-col justify-end bg-black/40 backdrop-blur-md border-t border-white/10 rounded-b-3xl select-none">
                  <div className="flex items-center gap-3">
                    <span className="font-display font-black text-lg text-cyan-400">
                      {project.number}
                    </span>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-white/50">
                      / {project.badge}
                    </span>
                  </div>
                  <h3 className="font-display font-semibold text-lg sm:text-xl text-white tracking-tight mt-1.5 flex items-center justify-between">
                    {project.title}
                    <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                  </h3>
                  <p className="text-white/70 text-xs sm:text-sm leading-relaxed mt-2 max-w-xl">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-3 sm:mt-4">
                    {project.tech.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-full text-[9px] font-semibold tracking-wider bg-white/5 border border-white/10 text-white/80"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
            {/* Spacer card for scrolled right alignment */}
            <div className="flex-shrink-0 w-1 md:w-8" />
          </motion.div>
        </div>

        {/* SHUTTER STRIPS OVERLAY */}
        {/* We use 6 horizontal strips that scaleY down to 0 at the end of the scroll */}
        <motion.div 
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 z-50 flex flex-col h-full overflow-hidden bg-[#050505]"
        >
          {/* BACKGROUND LAYER: Revealed when the blinds shrink */}
          <div className="absolute inset-0 z-0 flex flex-col justify-center">
            <Testimonials />
          </div>

          {/* FOREGROUND LAYER: The Blinds */}
          <div className="absolute inset-0 z-10 flex flex-col pointer-events-none">
            {scaleYs.map((scaleY, i) => {
              return (
                <motion.div
                  key={i}
                  className="relative w-full overflow-hidden flex-shrink-0 bg-[#f9fafb]"
                  style={{ height: `${100 / 6}vh`, scaleY, originY: 0 }}
                />
              );
            })}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
