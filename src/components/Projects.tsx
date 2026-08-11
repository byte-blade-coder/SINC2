import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate, useSpring } from 'framer-motion';
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
    badge: 'Weapon Systems Integration',
    title: 'Development of ICDs for 6×30 mm Gun',
    description: 'Development of ICDs and hardware solution to interface SOT-2SE with 6×30mm Gun onboard PNS AZMT and DHST, enabling seamless interoperability with the SOT FCS and the Gun.',
    image: '/assets/processing_clean.png',
    tech: ['Systems Integration', 'Fire Control', 'ICD Development', 'Signal Conversion'],
    sections: [
      { id: 'challenge', title: 'The Challenge', description: 'Integrating modern fire control systems with existing weapon platforms requires seamless, low-latency interfacing capable of bridging digital commands with analog or synchro-based inputs.', image: '/assets/sensor_fusion.png' },
      { id: 'approach', title: 'Our Approach', description: 'We developed custom Interface Control Documents (ICDs) and bespoke hardware to convert Synchro to Digital and Digital to Synchro signals in real-time, successfully interfacing SOT-2SE with JS RCCS.', image: '/assets/processing_clean.png' },
      { id: 'outcome', title: 'The Outcome', description: 'Achieved complete interoperability between the SOT FCS and the 6×30mm Gun onboard PNS AZMT and DHST, validating the system through rigorous verification protocols.', image: '/assets/data_analytics_clean.png' },
      { id: 'whatWeDid', title: 'Engineering Scope', description: 'ICD Development, System Verification & Validation, Weapon System Integration, Digital-to-Analog and Analog-to-Digital Interface Development, and Interface Hardware Development.', image: '/assets/communication_clean.png' }
    ]
  },
  {
    id: 2,
    number: '02',
    badge: 'Weapon Systems Integration',
    title: 'Development of ICDs for 7×30 mm Gun',
    description: 'Development of ICDs and hardware solution to interface SOT-2SE with 6×30mm Gun onboard PNS AZMT and DHST, enabling seamless interoperability with the SOT FCS and the Gun.',
    image: '/assets/communication_clean.png',
    tech: ['Systems Integration', 'Weapon Systems', 'Synchro Control', 'Fire Control', 'ICD Development', 'Embedded Electronics', 'Signal Conversion'],
    sections: [
      { id: 'challenge', title: 'The Challenge', description: 'Integrating modern fire control systems with existing weapon platforms requires seamless, low-latency interfacing capable of bridging digital commands with analog or synchro-based inputs.', image: '/assets/sensor_fusion.png' },
      { id: 'approach', title: 'Our Approach', description: 'We developed custom Interface Control Documents (ICDs) and bespoke hardware to convert Synchro to Digital and Digital to Synchro signals in real-time.', image: '/assets/processing_clean.png' },
      { id: 'outcome', title: 'The Outcome', description: 'Achieved complete interoperability between the SOT FCS and the 6×30mm Gun onboard PNS AZMT and DHST, validating the system through rigorous verification protocols.', image: '/assets/data_analytics_clean.png' },
      { id: 'whatWeDid', title: 'Engineering Scope', description: 'Development of ICDs between 7, System Verification & Validation, Weapon System Integration, Digital-to-Analog and Analog-to-Digital Interface Development, and Interface Hardware Development.', image: '/assets/communication_clean.png' }
    ]
  },
  {
    id: 3,
    number: '03',
    badge: 'Mine Warfare Operations',
    title: 'Mine Warfare Data Centre (MWDC)',
    description: 'Development of a dedicated shore-based Mine Warfare Data Centre (MWDC) providing centralized planning, execution, monitoring, and integration of Mine Countermeasure (MCM) operations.',
    image: '/assets/data_analytics_clean.png',
    tech: ['Mission Systems', 'Data Fusion', 'Decision Support', 'GIS', 'Naval Command & Control'],
    sections: [
      { id: 'challenge', title: 'The Challenge', description: 'Mine Countermeasure operations require precise coordination, centralized data fusion, and real-time decision support to safely execute missions in complex naval environments.', image: '/assets/data_analytics_clean.png' },
      { id: 'approach', title: 'Our Approach', description: 'The solution incorporates the Naval Mine Warfare Operations Support System (NAMOSS), enabling mission planning, operational monitoring, and intelligent decision support through centralized data fusion.', image: '/assets/sensor_fusion.png' },
      { id: 'outcome', title: 'The Outcome', description: 'Established a dedicated shore-based infrastructure for centralized planning, execution, and monitoring of mine warfare operations.', image: '/assets/communication_clean.png' },
      { id: 'whatWeDid', title: 'Core Functionalities', description: 'Mission Creation & Task Assignment, Mission Performance Analysis, Navigation & Environmental Data Integration, Survey Data Collection, and Clearance Status Monitoring.', image: '/assets/processing_clean.png' }
    ]
  },
  {
    id: 4,
    number: '04',
    badge: 'Weapon Systems Integration',
    title: 'Development of ICDs for 76 mm Gun',
    description: 'Development of ICDs and hardware solution to interface LR66, OFC on 76mm Gun with SR47BG onboard PNS ASLT, enabling seamless interoperability with the SOT FCS and the Gun.',
    image: '/assets/data_analytics_clean.png',
    tech: ['Systems Integration & Verification', 'Weapon Systems', 'ICD Verification', 'Fire Control', 'ICD Development', 'Data Validation', 'System Interfacing'],
    sections: [
      { id: 'challenge', title: 'The Challenge', description: 'Achieving seamless interoperability between modern fire control systems and legacy gun platforms requires complex interface hardware and rigorous system verification.', image: '/assets/sensor_fusion.png' },
      { id: 'approach', title: 'Our Approach', description: 'We developed custom Interface Control Documents (ICDs) and hardware solutions to interface LR66, OFC on 76mm Gun with SR47BG.', image: '/assets/processing_clean.png' },
      { id: 'outcome', title: 'The Outcome', description: 'Enabled complete interoperability between the SOT FCS and the 76mm Gun onboard PNS ASLT.', image: '/assets/communication_clean.png' },
      { id: 'whatWeDid', title: 'Engineering Scope', description: 'Development of ICDs between 76mm Gun & SR47BG, System Verification & Validation, Weapon System Integration, and Interface Hardware Development.', image: '/assets/data_analytics_clean.png' }
    ]
  },
  {
    id: 5,
    number: '05',
    badge: 'Meteorological Systems',
    title: 'Development of Solid State Meteorograph',
    description: 'Development of an indigenous Solid State Meteorograph for acquisition, processing, and distribution of real-time meteorological information from onboard sensors, computes true wind speed and direction and relays real time information to NRTUs and different sub-displays to support shipboard navigation and operational awareness.',
    image: '/assets/sensing_clean.png',
    tech: ['System Integration', 'Multi-Display Information Distribution', 'GPS and Anemometer Interface', 'Embedded Software'],
    sections: [
      { id: 'challenge', title: 'The Challenge', description: 'Acquiring and processing real-time meteorological information from onboard sensors in dynamic maritime environments requires precise integration and robust data distribution.', image: '/assets/sensing_clean.png' },
      { id: 'approach', title: 'Our Approach', description: 'We developed an indigenous Solid State Meteorograph that interfaces with GPS and anemometers to compute true wind speed and direction, routing real-time data to NRTUs.', image: '/assets/sensor_fusion.png' },
      { id: 'outcome', title: 'The Outcome', description: 'Enhanced shipboard navigation and operational awareness through reliable, real-time meteorological data distribution across multiple sub-displays.', image: '/assets/communication_clean.png' },
      { id: 'whatWeDid', title: 'System Functions', description: 'Wind Speed & Direction, Temperature, Humidity, Atmospheric Pressure, GPS Position & Heading, True Wind Calculation, and Data Distribution to NRTUs.', image: '/assets/data_analytics_clean.png' }
    ]
  },
  {
    id: 6,
    number: '06',
    badge: 'Avionics Integration',
    title: 'Development of VOR Navigation Converter',
    description: 'Design and development of an indigenous VHF Omnidirectional Range (VOR) Navigation Converter to display ILS parameters (localizer) and VOR bearing on aircraft\'s EHSI display.',
    image: '/assets/processing_clean.png',
    tech: ['Navigation Systems', 'Embedded Electronics', 'Signal Conversion', 'Avionics Integration'],
    sections: [
      { id: 'challenge', title: 'The Challenge', description: 'Interfacing aircraft multi-mode receivers (MMR) and gyro heading data to legacy or distinct EHSI displays requires precise signal conversion and synchro control.', image: '/assets/processing_clean.png' },
      { id: 'approach', title: 'Our Approach', description: 'We designed a Nav converter that acquires VOR information from the MMR and heading from the Gyro, computes the true bearing, and translates it for the Nav-J unit.', image: '/assets/sensor_fusion.png' },
      { id: 'outcome', title: 'The Outcome', description: 'Successfully enabled the display of ILS parameters and VOR bearing on the aircraft\'s EHSI display, ensuring seamless navigation data flow.', image: '/assets/communication_clean.png' },
      { id: 'whatWeDid', title: 'Engineering Scope', description: 'System Integration, Synchro Control Mechanism, Hardware Design, and Synchro / Resolver Conversion.', image: '/assets/data_analytics_clean.png' }
    ]
  },
  {
    id: 7,
    number: '07',
    badge: 'Navigation Systems',
    title: 'Development of Navigation Interface Unit (NIU)',
    description: 'Design and development of an indigenous Navigation Interface Unit (NIU) that serves as the central data acquisition and distribution hub for a ship\'s navigation suite.',
    image: '/assets/communication_clean.png',
    tech: ['Navigation Systems', 'Embedded Linux Software', 'Serial Communication (RS232)', 'Networked Systems (TCP/IP)'],
    sections: [
      { id: 'challenge', title: 'The Challenge', description: 'Modern naval vessels utilize multiple disparate navigation sensors that output serial data, which must be aggregated, parsed, and distributed to modern networked combat systems.', image: '/assets/communication_clean.png' },
      { id: 'approach', title: 'Our Approach', description: 'We engineered an NIU based on Embedded Linux that interfaces with serial navigation sensors, parses the data, and distributes it over Ethernet (TCP/IP) to the CMS and GUI.', image: '/assets/processing_clean.png' },
      { id: 'outcome', title: 'The Outcome', description: 'Created a centralized, highly reliable data acquisition and distribution hub that integrates GPS, INS, Echo Sounder, and Gyro-compass data into the Combat Management System.', image: '/assets/data_analytics_clean.png' },
      { id: 'whatWeDid', title: 'Engineering Scope', description: 'System Integration, Serial-to-Ethernet Interfacing, Multi-Sensor Data Acquisition, and Real-Time Data Distribution.', image: '/assets/sensor_fusion.png' }
    ]
  },
  {
    id: 8,
    number: '08',
    badge: 'Combat System Integration',
    title: 'Development of CDS – Video Extractor',
    description: 'Designed and onboarded a Combat Data System (CDS) Video Extractor on PNS ALAMGIR to capture, process, and distribute mission-critical video streams from onboard combat systems. The solution enables reliable extraction of operational video data for monitoring, recording, analysis, and integration with naval mission systems.',
    image: '/assets/sensing_clean.png',
    tech: ['Combat System Integration', 'Video Signal Processing', 'Embedded Hardware Design', 'Real-Time Data Distribution', 'Naval Platform Integration', 'System Verification & Validation'],
    sections: [
      { id: 'challenge', title: 'The Challenge', description: 'Extracting mission-critical video streams from disparate onboard combat systems requires high-throughput data capture and processing without introducing latency or signal degradation.', image: '/assets/sensor_fusion.png' },
      { id: 'approach', title: 'Our Approach', description: 'We designed a CDS Video Extractor that reliably acquires operational video data, processes it in real-time, and routes it for monitoring, recording, and analysis.', image: '/assets/processing_clean.png' },
      { id: 'outcome', title: 'The Outcome', description: 'Successfully onboarded the CDS Video Extractor on PNS ALAMGIR, enhancing situational awareness and providing crucial video telemetry for post-mission analysis.', image: '/assets/communication_clean.png' },
      { id: 'whatWeDid', title: 'Engineering Scope', description: 'CDS Interface & Display Development, Real-time Data Processing, Video Acquisition & Extraction, Shipboard System Validation, Embedded Hardware Integration, and Operational Performance Testing.', image: '/assets/data_analytics_clean.png' }
    ]
  },
  {
    id: 9,
    number: '09',
    badge: 'Tactical Data Links (TDL)',
    title: 'Integration of LINK-Y CCS3 Charlie',
    description: 'Development and integration of the LINK-Y CCS3 Charlie interface onboard the F-22P Frigate to enable secure, real-time exchange of tactical information between the Combat Management System (CMS) and Tactical Data Link (TDL).',
    image: '/assets/communication_clean.png',
    tech: ['Tactical Data Links (TDL)', 'Combat Management Systems (CMS)', 'Mission System Integration', 'Interface Engineering', 'Naval Communication Systems', 'Real-Time Data Exchange', 'System Verification & Validation'],
    sections: [
      { id: 'challenge', title: 'The Challenge', description: 'Enabling secure, low-latency exchange of tactical information between complex Combat Management Systems and high-speed Tactical Data Links is essential for modern naval operations.', image: '/assets/communication_clean.png' },
      { id: 'approach', title: 'Our Approach', description: 'We developed and integrated the LINK-Y CCS3 Charlie interface, implementing robust protocols to ensure seamless data exchange between the CMS and TDL.', image: '/assets/sensor_fusion.png' },
      { id: 'outcome', title: 'The Outcome', description: 'Successfully onboarded the interface on the F-22P Frigate, significantly enhancing interoperability, situational awareness, and coordinated naval operations.', image: '/assets/data_analytics_clean.png' },
      { id: 'whatWeDid', title: 'Engineering Scope', description: 'LINK-Y CCS3 Charlie Integration, Interface Protocol Implementation, CMS Interface Development, System Integration & Validation, Tactical Data Exchange, and Onboard Commissioning.', image: '/assets/processing_clean.png' }
    ]
  },
  {
    id: 10,
    number: '10',
    badge: 'Mission System Integration',
    title: 'Integration of LINK-Y NEZA6 With CMS',
    description: 'Development and integration of a real-time interface between the LINK-Y Tactical Data Link and the Combat Management System (CMS) onboarded on 054A Frigate to enable reliable exchange of tactical information across onboard mission systems.',
    image: '/assets/processing_clean.png',
    tech: ['Tactical Data Links (TDL)', 'Combat Management Systems (CMS)', 'Data Distribution Systems', 'Mission System Integration', 'Real-Time Communication', 'Interface Engineering', 'Protocol Integration', 'System Verification & Validation'],
    sections: [
      { id: 'challenge', title: 'The Challenge', description: 'Establishing a reliable interface between advanced Tactical Data Links and Combat Management Systems requires complex message handling, stringent timing validation, and error-free communication.', image: '/assets/processing_clean.png' },
      { id: 'approach', title: 'Our Approach', description: 'We developed a comprehensive CMS–LINK-Y interface architecture, facilitating standardized communication through a dedicated Data Interface Unit (DIU).', image: '/assets/sensor_fusion.png' },
      { id: 'outcome', title: 'The Outcome', description: 'Successfully integrated the interface on the 054A Frigate, ensuring synchronized operational data flow and enhanced situational awareness across mission systems.', image: '/assets/communication_clean.png' },
      { id: 'whatWeDid', title: 'Engineering Scope', description: 'System Integration Testing & Operational Validation, Real-time Tactical Data Exchange, Development of CMS–LINK-Y Interface Architecture, Message Acknowledgement & Timing Validation, DIU Communication, and Communication Performance Verification.', image: '/assets/data_analytics_clean.png' }
    ]
  }
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

  // Map vertical scroll progress (0 to 1) directly for instant, responsive scrubbing
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Phase 1: Horizontal Cards Scroll (0 to 0.6)
  const x = useTransform(smoothProgress, [0, 0.6], [0, scrollAmount]);

  // Phase 2: 6 Shutter Blinds retract UPWARDS simultaneously but staggered (0.70 to 0.95)
  // Masking the actual Flagship content so it folds up into blinds.
  const scaleY0 = useTransform(smoothProgress, [0.85, 0.95], [1, 0]);
  const scaleY1 = useTransform(smoothProgress, [0.82, 0.92], [1, 0]);
  const scaleY2 = useTransform(smoothProgress, [0.79, 0.89], [1, 0]);
  const scaleY3 = useTransform(smoothProgress, [0.76, 0.86], [1, 0]);
  const scaleY4 = useTransform(smoothProgress, [0.73, 0.83], [1, 0]);
  const scaleY5 = useTransform(smoothProgress, [0.70, 0.80], [1, 0]);

  const maskImage = useMotionTemplate`linear-gradient(to bottom, 
    black 0%, black calc(16.666% * ${scaleY0}), transparent calc(16.666% * ${scaleY0}), transparent 16.666%,
    black 16.666%, black calc(16.666% + 16.666% * ${scaleY1}), transparent calc(16.666% + 16.666% * ${scaleY1}), transparent 33.333%,
    black 33.333%, black calc(33.333% + 16.666% * ${scaleY2}), transparent calc(33.333% + 16.666% * ${scaleY2}), transparent 50%,
    black 50%, black calc(50% + 16.666% * ${scaleY3}), transparent calc(50% + 16.666% * ${scaleY3}), transparent 66.666%,
    black 66.666%, black calc(66.666% + 16.666% * ${scaleY4}), transparent calc(66.666% + 16.666% * ${scaleY4}), transparent 83.333%,
    black 83.333%, black calc(83.333% + 16.666% * ${scaleY5}), transparent calc(83.333% + 16.666% * ${scaleY5}), transparent 100%
  )`;

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative z-10 w-full bg-[#050505] text-[#111827]"
      style={{ height: '800vh' }}
    >
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Sticky Container inside the section */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">

        {/* BACKGROUND: The dark Testimonials section revealed when the Flagship blinds fold up */}
        <div className="absolute inset-0 z-0 flex flex-col justify-center bg-[#050505]">
          <Testimonials />
        </div>

        {/* FOREGROUND LAYER: The white Flagship content that is masked into blinds */}
        <motion.div
          className="absolute inset-0 z-10 flex flex-col pt-[18vh] md:pt-[20vh] bg-[#f9fafb] border-t border-black/[0.05]"
          style={{
            WebkitMaskImage: maskImage,
            maskImage: maskImage,
            WebkitMaskSize: "100% 100%",
            maskSize: "100% 100%",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
          }}
        >
          {/* Header Container */}
          <div className="max-w-[1728px] mx-auto w-full px-3 md:px-4 lg:px-5 mb-12 select-none">
            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#0284c7]">
              Strategic Deployment
            </span>
            <h2 className="w-fit font-display font-black text-3xl md:text-5xl lg:text-6xl tracking-tight mt-4 leading-[1.1] bg-gradient-to-r from-[#2ba9e3] to-[#050c26] bg-clip-text text-transparent pb-1">
              Flagship Solutions
            </h2>
            <p className="text-gray-400 font-sans text-base md:text-lg leading-relaxed mt-4 max-w-2xl">
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
        </motion.div>
      </div>
    </section>
  );
}

