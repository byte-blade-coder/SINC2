import { motion } from 'framer-motion';
import { MouseParallaxProvider } from './components/MouseParallaxProvider';
import { ZoomSection } from './components/ZoomSection';
import { InfoSection } from './components/InfoSection';
import { GlassNavbar } from './components/GlassNavbar';
import { Shield, Cpu, Compass, Globe, CheckCircle, ArrowUpRight } from 'lucide-react';

export default function App() {
  // Entrance variants for subsequent sections
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  return (
    <MouseParallaxProvider>
      <div className="w-full min-h-screen bg-[#050505] relative overflow-x-hidden selection:bg-cyan-500/30 selection:text-white flex flex-col items-center">
        <h1 className="sr-only">SINC 3D - Engineering Maritime Domain Awareness & Advanced Sensory Systems</h1>
        <GlassNavbar />
        
        {/* 1. HERO & LOGO ZOOM SECTION */}
        <section id="home" className="w-full">
          <ZoomSection />
        </section>

        {/* 2. INFO SECTION (White background capabilities grid) */}
        <InfoSection />

        {/* Padded container for the rest of the dark sections */}
        <div className="w-full p-3 md:p-4 lg:p-5 flex flex-col items-center">
          
          {/* 3. MISSION SECTION */}
          <section id="about" className="w-full max-w-7xl px-6 py-20 md:py-32 flex flex-col items-center border-t border-white/[0.03]">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUpVariants}
              className="text-center max-w-3xl"
            >
              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-cyan-400">
                Our Mission
              </span>
              <h2 className="font-display font-semibold text-3xl md:text-5xl lg:text-6xl text-white tracking-tight mt-4 leading-[1.1]">
                Securing maritime assets and global common waters.
              </h2>
              <p className="text-white/60 font-sans text-base md:text-lg leading-relaxed mt-6">
                SINC 3D is pioneering the future of naval sensing systems, combining next-generation telemetry, autonomous sensory arrays, and real-time edge processing models to deliver unparalleled maritime intelligence for defense and commerce worldwide.
              </p>
            </motion.div>

            {/* Key Metrics grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-16">
              {[
                { val: "99.9%", label: "System Autonomy", desc: "Unmanned operations in hostile remote environments." },
                { val: "< 50ms", label: "Latency Fusion", desc: "Ultra-fast telemetry aggregation from multi-spectral arrays." },
                { val: "24/7", label: "Global Coverage", desc: "Persistent surveillance over global naval transit routes." },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-8 hover:bg-white/[0.04] hover:border-white/12 transition-all duration-300 group"
                >
                  <div className="font-display font-semibold text-4xl md:text-5xl text-cyan-400 tracking-tight">{stat.val}</div>
                  <div className="font-sans font-medium text-white text-base mt-2">{stat.label}</div>
                  <div className="font-sans text-white/50 text-sm mt-2 leading-relaxed">{stat.desc}</div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* 4. CAPABILITIES SECTION */}
          <section id="services" className="w-full max-w-7xl px-6 py-20 md:py-32 border-t border-white/[0.03]">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
              <div className="max-w-xl">
                <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-cyan-400">
                  Capabilities
                </span>
                <h2 className="font-display font-semibold text-3xl md:text-5xl text-white tracking-tight mt-4 leading-tight">
                  Autonomous ocean monitoring networks.
                </h2>
              </div>
              <p className="text-white/50 text-sm md:text-base max-w-md mt-4 md:mt-0 leading-relaxed">
                Deploying advanced telemetry arrays to continuously map, track, and secure complex littoral and deep-sea corridors.
              </p>
            </div>

            {/* Capabilities Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: Shield, title: "Threat Detection", desc: "Immediate classification of surface, sub-surface, and aerial anomalies." },
                { icon: Compass, title: "Smart Navigation", desc: "Machine-learning navigation systems capable of extreme condition pathfinding." },
                { icon: Cpu, title: "Edge Processing", desc: "AI workloads executed on-board without cloud synchronization delays." },
                { icon: Globe, title: "Multi-Sensor Fusion", desc: "Aggregating radar, sonar, lidar, and satellite optics in real-time." },
                { icon: CheckCircle, title: "Strategic Readiness", desc: "Full tactical integration with allied command structures and systems." },
                { icon: Shield, title: "Secure Telemetry", desc: "Quantum-resistant encryption layers securing all sensor node communications." },
              ].map((cap, i) => {
                const Icon = cap.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: (i % 3) * 0.15 }}
                    className="relative group p-8 rounded-2xl border border-white/[0.06] bg-white/[0.01] hover:bg-white/[0.03] hover:border-white/12 transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-105 transition-transform duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-semibold text-white font-sans">{cap.title}</h3>
                    <p className="text-white/50 text-sm mt-3 leading-relaxed">{cap.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* 5. TECHNOLOGY SECTION */}
          <section id="research" className="w-full max-w-7xl px-6 py-20 md:py-32 border-t border-white/[0.03]">
            <div className="bg-gradient-to-br from-white/[0.02] to-transparent border border-white/[0.06] rounded-3xl p-8 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="max-w-xl">
                <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-cyan-400">
                  Technology
                </span>
                <h2 className="font-display font-semibold text-3xl md:text-5xl text-white tracking-tight mt-4 leading-tight">
                  Driven by Intelligent Sensor Fusion
                </h2>
                <p className="text-white/60 text-sm md:text-base leading-relaxed mt-6">
                  Our proprietary 3D sensor fusion engine merges disparate inputs, enabling naval operations to view real-time volumetric feeds of complete oceanic spaces. Perfected through years of state-of-the-art defense R&D.
                </p>
                
                <ul className="mt-8 space-y-3">
                  {["Volumetric sonar point clouds", "Edge-optimized object classification", "Sub-meter localization mesh networks"].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm text-white/80">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="relative w-full lg:w-1/2 max-w-[500px] aspect-square rounded-2xl overflow-hidden border border-white/10 group shadow-2xl">
                <img 
                  src="/assets/hero-poster.webp" 
                  alt="3D Sensor fusion graphics" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ filter: 'brightness(0.7) contrast(1.1)' }}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-cyan-400">Active Node</span>
                  <h4 className="text-white font-semibold text-lg mt-1 flex items-center justify-between">
                    SINC-Sonar Array-04 <ArrowUpRight className="w-4 h-4 text-white/50" />
                  </h4>
                </div>
              </div>
            </div>
          </section>

          {/* 6. FOOTER SECTION */}
          <footer id="contact" className="w-full max-w-7xl px-6 pt-20 pb-12 border-t border-white/[0.03] flex flex-col gap-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-cyan-400" />
                  <span className="font-display font-semibold uppercase tracking-widest text-[14px] text-white">SINC 3D</span>
                </div>
                <p className="text-white/40 text-xs leading-relaxed max-w-[200px]">
                  Advancing the frontiers of maritime sensing and strategic domain intelligence.
                </p>
              </div>
              
              {["Solutions", "Platform", "Company"].map((col, idx) => (
                <div key={idx} className="flex flex-col gap-4">
                  <h4 className="text-white text-xs font-semibold uppercase tracking-wider">{col}</h4>
                  <ul className="flex flex-col gap-2">
                    {col === "Solutions" && ["Defense", "Global Trade", "Telemetry"].map(lnk => (
                      <li key={lnk}><a href="#" className="text-white/40 hover:text-white text-xs transition-colors">{lnk}</a></li>
                    ))}
                    {col === "Platform" && ["Edge AI", "Sensor Arrays", "Security"].map(lnk => (
                      <li key={lnk}><a href="#" className="text-white/40 hover:text-white text-xs transition-colors">{lnk}</a></li>
                    ))}
                    {col === "Company" && ["Research", "Careers", "Contact"].map(lnk => (
                      <li key={lnk}><a href="#" className="text-white/40 hover:text-white text-xs transition-colors">{lnk}</a></li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="border-t border-white/[0.04] pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-white/30 text-[11px] tracking-wide">
              <div>&copy; {new Date().getFullYear()} SINC 3D Inc. All rights reserved.</div>
              <div className="flex gap-6">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-white transition-colors">Tactical Usage Agreement</a>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </MouseParallaxProvider>
  );
}

