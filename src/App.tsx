import { motion } from 'framer-motion';
import { MouseParallaxProvider } from './components/MouseParallaxProvider';
import { ZoomSection } from './components/ZoomSection';
import { GlassNavbar } from './components/GlassNavbar';
import { CapabilitiesShowcase } from './components/CapabilitiesShowcase';
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
      <div className="w-full min-h-screen root-bg relative selection:bg-cyan-500/30 selection:text-white flex flex-col items-center overflow-x-clip">
        {/* Continuous Flowing Ambient Background Glows */}
        {/* Section 1 (Hero/Top) - Left */}
        <div className="absolute -left-[400px] w-[800px] h-[800px] rounded-full pointer-events-none z-0" style={{ top: '5vh', background: 'rgba(35, 171, 230, 0.25)', filter: 'blur(120px)' }} />
        {/* Section 2 - Right */}
        <div className="absolute -right-[450px] w-[900px] h-[900px] rounded-full pointer-events-none z-0" style={{ top: '150vh', background: 'rgba(35, 171, 230, 0.20)', filter: 'blur(140px)' }} />
        {/* Section 3 - Left */}
        <div className="absolute -left-[375px] w-[750px] h-[750px] rounded-full pointer-events-none z-0" style={{ top: '300vh', background: 'rgba(35, 171, 230, 0.22)', filter: 'blur(130px)' }} />
        {/* Section 4 - Right */}
        <div className="absolute -right-[500px] w-[1000px] h-[1000px] rounded-full pointer-events-none z-0" style={{ top: '450vh', background: 'rgba(35, 171, 230, 0.18)', filter: 'blur(150px)' }} />
        {/* Section 5 - Left */}
        <div className="absolute -left-[350px] w-[700px] h-[700px] rounded-full pointer-events-none z-0" style={{ top: '600vh', background: 'rgba(35, 171, 230, 0.25)', filter: 'blur(120px)' }} />
        {/* Section 6 - Right */}
        <div className="absolute -right-[425px] w-[850px] h-[850px] rounded-full pointer-events-none z-0" style={{ top: '750vh', background: 'rgba(35, 171, 230, 0.20)', filter: 'blur(140px)' }} />
        {/* Section 7 - Left */}
        <div className="absolute -left-[375px] w-[750px] h-[750px] rounded-full pointer-events-none z-0" style={{ top: '900vh', background: 'rgba(35, 171, 230, 0.22)', filter: 'blur(130px)' }} />
        {/* Section 8 - Right */}
        <div className="absolute -right-[475px] w-[950px] h-[950px] rounded-full pointer-events-none z-0" style={{ top: '1050vh', background: 'rgba(35, 171, 230, 0.18)', filter: 'blur(160px)' }} />
        {/* Section 9 - Left */}
        <div className="absolute -left-[450px] w-[900px] h-[900px] rounded-full pointer-events-none z-0" style={{ top: '1200vh', background: 'rgba(35, 171, 230, 0.23)', filter: 'blur(135px)' }} />
        {/* Section 10 - Right */}
        <div className="absolute -right-[400px] w-[800px] h-[800px] rounded-full pointer-events-none z-0" style={{ top: '1350vh', background: 'rgba(35, 171, 230, 0.21)', filter: 'blur(125px)' }} />
        {/* Section 11 - Left */}
        <div className="absolute -left-[500px] w-[1000px] h-[1000px] rounded-full pointer-events-none z-0" style={{ top: '1500vh', background: 'rgba(35, 171, 230, 0.19)', filter: 'blur(155px)' }} />
        {/* Section 12 - Right */}
        <div className="absolute -right-[350px] w-[700px] h-[700px] rounded-full pointer-events-none z-0" style={{ top: '1650vh', background: 'rgba(35, 171, 230, 0.26)', filter: 'blur(115px)' }} />
        {/* Section 13 - Left */}
        <div className="absolute -left-[425px] w-[850px] h-[850px] rounded-full pointer-events-none z-0" style={{ top: '1800vh', background: 'rgba(35, 171, 230, 0.20)', filter: 'blur(145px)' }} />
        {/* Section 14 - Right */}
        <div className="absolute -right-[475px] w-[950px] h-[950px] rounded-full pointer-events-none z-0" style={{ top: '1950vh', background: 'rgba(35, 171, 230, 0.18)', filter: 'blur(150px)' }} />

        <h1 className="sr-only">SINC 3D - Engineering Maritime Domain Awareness & Advanced Sensory Systems</h1>
        <GlassNavbar />
        
        {/* 1. HERO & LOGO ZOOM SECTION */}
        <section id="home" className="w-full">
          <ZoomSection />
        </section>

        {/* Padded container for the rest of the sections */}
        <div className="w-full p-3 md:p-4 lg:p-5 flex flex-col items-center transparent-bg invert-text relative z-10">
          
          {/* NEW CAPABILITIES SHOWCASE */}
          <CapabilitiesShowcase />

          {/* ADVANCED SENSING SECTION */}
          <section id="advanced-sensing" className="relative w-full max-w-7xl px-6 py-20 md:py-32 flex flex-col items-center border-t border-white/[0.03]">
            {/* Mobile-only Ambient Blurs */}
            <div className="absolute top-[10%] -left-[30vw] w-[100vw] h-[100vw] bg-[#2ba9e3]/15 rounded-full blur-[100px] md:hidden pointer-events-none z-0" />
            <div className="absolute bottom-[10%] -right-[30vw] w-[100vw] h-[100vw] bg-[#050c26]/10 rounded-full blur-[100px] md:hidden pointer-events-none z-0" />

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUpVariants}
              className="relative z-10 text-center max-w-4xl mb-16"
            >
              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-cyan-400">
                Advanced Sensing Technologies
              </span>
              <h2 className="font-display font-semibold text-3xl md:text-5xl lg:text-6xl text-white tracking-tight mt-4 leading-[1.1]">
                Advanced Sensing Technologies
              </h2>
              <p className="text-white/60 font-sans text-base md:text-lg leading-relaxed mt-6">
                SINC Lab develops and integrates sensing systems that enable the collection of critical operational data from maritime environments and onboard systems. These sensing solutions provide the foundational input required for real-time monitoring, control, and situational awareness.
              </p>
            </motion.div>

            {/* Technology Areas Grid */}
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
              {/* Card 1: Radar & RF */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-8 hover:bg-white/[0.04] hover:border-white/12 transition-all duration-300 flex flex-col group"
              >
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-400 mb-2">Technology Areas</span>
                <h3 className="font-display font-semibold text-2xl text-white tracking-tight mb-4">Radar & RF Sensing</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-4">
                  SINC Lab is actively engaged in the development and application of Radar and RF sensing technologies for maritime surveillance and navigation. The lab has established strong capabilities in:
                </p>
                <ul className="list-disc list-inside text-white/50 text-sm space-y-2 mb-6 flex-grow">
                  <li>Radar systems</li>
                  <li>RF and Microwave sensing technologies</li>
                  <li>Signal acquisition and modelling</li>
                  <li>Enabling radio demonstration, testing, and analysis of electromagnetic signals</li>
                </ul>
                <p className="text-white/50 text-xs leading-relaxed border-t border-white/[0.06] pt-4 mt-auto">
                  These technologies form a critical component of SINC Lab's sensing domain, providing high-fidelity data inputs for detection, perception, communication, and maritime awareness systems.
                </p>
              </motion.div>

              {/* Card 2: Environmental */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-8 hover:bg-white/[0.04] hover:border-white/12 transition-all duration-300 flex flex-col group"
              >
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-400 mb-2">Technology Areas</span>
                <h3 className="font-display font-semibold text-2xl text-white tracking-tight mb-4">Environmental Sensors</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-4">
                  We develop and deploy environmental sensing systems to measure and monitor key physical variables such as:
                </p>
                <ul className="list-disc list-inside text-white/50 text-sm space-y-2 mb-4">
                  <li>Temperature</li>
                  <li>Pressure</li>
                  <li>Gas Presence</li>
                  <li>Humidity</li>
                </ul>
                <p className="text-white/60 text-sm leading-relaxed mb-6 flex-grow">
                  and more. These systems continuously capture data from the surrounding environment to support the performance, reliability, and health of operational systems.
                </p>
                <p className="text-white/50 text-xs leading-relaxed border-t border-white/[0.06] pt-4 mt-auto">
                  We also extend our capabilities to the environmental monitoring of electrical networks, and other critical operational parameters, delivering valuable data inputs for further processing and analysis.
                </p>
              </motion.div>

              {/* Card 3: Control & Interface */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-8 hover:bg-white/[0.04] hover:border-white/12 transition-all duration-300 flex flex-col group"
              >
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-400 mb-2">Technology Areas</span>
                <h3 className="font-display font-semibold text-2xl text-white tracking-tight mb-4">Control & Interface Sensors</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-4">
                  Control and interface sensing systems are designed to bridge physical sensors with embedded and digital platforms, enabling accurate data acquisition and system interaction. These include:
                </p>
                <ul className="list-disc list-inside text-white/50 text-sm space-y-2 mb-6 flex-grow">
                  <li>Electrical Control Units (ECUs)</li>
                  <li>Embedded sensing modules</li>
                  <li>Sensor interface and signal conditioning systems</li>
                </ul>
                <p className="text-white/50 text-xs leading-relaxed border-t border-white/[0.06] pt-4 mt-auto">
                  These solutions ensure that sensor outputs are properly captured, conditioned, and converted into digital signals, allowing reliable communication between hardware components and higher-level processing systems.
                </p>
              </motion.div>
            </div>
          </section>

          {/* 3. MISSION SECTION */}
          <section id="about" className="relative w-full max-w-7xl px-6 py-20 md:py-32 flex flex-col items-center border-t border-white/[0.03]">
            {/* Mobile-only Ambient Blurs */}
            <div className="absolute top-[5%] -left-[30vw] w-[100vw] h-[100vw] bg-[#2ba9e3]/15 rounded-full blur-[100px] md:hidden pointer-events-none z-0" />
            <div className="absolute bottom-[5%] -right-[30vw] w-[100vw] h-[100vw] bg-[#050c26]/10 rounded-full blur-[100px] md:hidden pointer-events-none z-0" />

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUpVariants}
              className="relative z-10 text-center max-w-3xl"
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
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-16">
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
          <section id="services" className="relative w-full max-w-7xl px-6 py-20 md:py-32 border-t border-white/[0.03]">
            {/* Mobile-only Ambient Blurs */}
            <div className="absolute top-[10%] -left-[30vw] w-[100vw] h-[100vw] bg-[#2ba9e3]/15 rounded-full blur-[100px] md:hidden pointer-events-none z-0" />
            <div className="absolute bottom-[10%] -right-[30vw] w-[100vw] h-[100vw] bg-[#050c26]/10 rounded-full blur-[100px] md:hidden pointer-events-none z-0" />

            <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between mb-16">
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
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          <section id="research" className="relative w-full max-w-7xl px-6 py-20 md:py-32 border-t border-white/[0.03]">
            {/* Mobile-only Ambient Blurs */}
            <div className="absolute top-[10%] -left-[30vw] w-[100vw] h-[100vw] bg-[#2ba9e3]/15 rounded-full blur-[100px] md:hidden pointer-events-none z-0" />
            <div className="absolute bottom-[10%] -right-[30vw] w-[100vw] h-[100vw] bg-[#050c26]/10 rounded-full blur-[100px] md:hidden pointer-events-none z-0" />

            <div className="relative z-10 bg-gradient-to-br from-white/[0.02] to-transparent border border-white/[0.06] rounded-3xl p-8 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-12">
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
          <footer id="contact" className="relative overflow-hidden w-full max-w-7xl px-6 pt-20 pb-12 border-t border-white/[0.03] flex flex-col gap-12">
            {/* Mobile-only Ambient Blurs */}
            <div className="absolute top-[10%] -left-[30vw] w-[100vw] h-[100vw] bg-[#2ba9e3]/15 rounded-full blur-[100px] md:hidden pointer-events-none z-0" />
            <div className="absolute bottom-[20%] -right-[30vw] w-[100vw] h-[100vw] bg-[#050c26]/10 rounded-full blur-[100px] md:hidden pointer-events-none z-0" />

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-4 gap-8">
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

            <div className="relative z-10 border-t border-white/[0.04] pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-white/30 text-[11px] tracking-wide">
              <div>&copy; {new Date().getFullYear()} SINC 3D Inc. All rights reserved.</div>
              <div className="flex gap-6">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-white transition-colors">Tactical Usage Agreement</a>
              </div>
            </div>
          </footer>
        </div>

        <style>{`
          .root-bg {
            background: #ffffff !important;
          }
          @keyframes slow-float {
            0%, 100% { transform: translateY(0) scale(1); }
            50% { transform: translateY(-3vh) scale(1.04); }
          }
          @keyframes slow-float-reverse {
            0%, 100% { transform: translateY(0) scale(1.04); }
            50% { transform: translateY(3vh) scale(1); }
          }
          .animate-float-slow-1 {
            animation: slow-float 25s ease-in-out infinite;
          }
          .animate-float-slow-2 {
            animation: slow-float-reverse 30s ease-in-out infinite;
          }
          .transparent-bg {
            background: transparent !important;
          }
          
          .invert-text {
            color: #111827 !important;
          }
          .invert-text .text-white {
            color: #111827 !important;
          }
          .invert-text .text-white\\/80,
          .invert-text .text-white\\/70,
          .invert-text .text-white\\/60,
          .invert-text .text-white\\/50,
          .invert-text .text-white\\/40,
          .invert-text .text-white\\/30 {
            color: #4b5563 !important;
          }
          .invert-text .text-cyan-400 {
            color: #0284c7 !important;
          }
          .invert-text .bg-white\\/\\[0\\.02\\],
          .invert-text .bg-white\\/\\[0\\.01\\] {
            background-color: rgba(255, 255, 255, 0.6) !important;
            box-shadow: 0 4px 20px rgba(0,0,0,0.04) !important;
          }
          .invert-text .border-white\\/\\[0\\.06\\],
          .invert-text .border-white\\/12,
          .invert-text .border-white\\/10,
          .invert-text .border-white\\/\\[0\\.03\\],
          .invert-text .border-white\\/\\[0\\.04\\] {
            border-color: rgba(0, 0, 0, 0.08) !important;
          }
          .invert-text .border-t {
            border-color: rgba(0, 0, 0, 0.05) !important;
          }
          .invert-text .bg-gradient-to-br {
            background: linear-gradient(to bottom right, rgba(255,255,255,0.8), rgba(255,255,255,0.2)) !important;
          }
          .invert-text .bg-gradient-to-t {
            background: linear-gradient(to top, rgba(255,255,255,0.9), transparent) !important;
          }
          .invert-text a.text-white\\/40 {
            color: #6b7280 !important;
          }
        `}</style>
      </div>
    </MouseParallaxProvider>
  );
}

