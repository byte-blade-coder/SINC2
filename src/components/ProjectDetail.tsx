import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import type { Project, ProjectSection } from './Projects';

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
}

// Sub-component for the scrollable images to track intersection
const SectionImage = ({ 
  section, 
  onInView 
}: { 
  section: ProjectSection; 
  onInView: (id: string) => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-45% 0px -45% 0px" });

  useEffect(() => {
    if (isInView) {
      onInView(section.id);
    }
  }, [isInView, section.id, onInView]);

  return (
    <motion.div
      id={`section-${section.id}`}
      ref={ref}
      initial={{ opacity: 0, y: 80, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0.6, scale: 0.98 }}
      viewport={{ once: false, amount: 0.1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full flex flex-col gap-6"
    >
      <div className="w-full aspect-[4/3] rounded-[32px] overflow-hidden bg-white/5 border border-white/10 shadow-2xl relative">
        <img 
          src={section.image} 
          alt={section.title} 
          className="w-full h-full object-cover"
        />
        {/* Subtle inner shadow/gradient for premium feel */}
        <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.5)] pointer-events-none rounded-[32px]" />
      </div>
      
      {/* Mobile-only section title and description (hidden on desktop because left panel shows it) */}
      <div className="md:hidden flex flex-col gap-3 px-2 mt-4">
        <h3 className="font-display text-2xl font-semibold text-white tracking-tight">{section.title}</h3>
        <p className="text-white/60 text-sm leading-relaxed">{section.description}</p>
      </div>
    </motion.div>
  );
};

export default function ProjectDetail({ project, onBack }: ProjectDetailProps) {
  const [activeSectionId, setActiveSectionId] = useState<string>(project.sections[0]?.id || '');
  
  // Force scroll to top when mounting
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const activeSection = project.sections.find(s => s.id === activeSectionId) || project.sections[0];

  const handleTabClick = (id: string) => {
    const el = document.getElementById(`section-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#0b0b0b] text-white flex flex-col md:flex-row font-sans selection:bg-cyan-500/30">
      
      {/* Mobile Top Bar (Only visible when stacked) */}
      <div className="md:hidden w-full p-6 flex justify-between items-center border-b border-white/10 sticky top-0 bg-[#0b0b0b]/80 backdrop-blur-md z-50">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm font-medium tracking-wide uppercase"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <span className="font-display font-semibold text-cyan-400">{project.number}</span>
      </div>

      {/* LEFT COLUMN: Sticky Panel */}
      <div className="w-full md:w-[40%] h-auto md:h-screen md:sticky top-0 flex flex-col justify-center px-6 py-12 md:px-12 lg:px-16 md:py-0 border-r border-white/5 relative z-40 bg-[#0b0b0b]">
        
        {/* Desktop Back Button */}
        <button 
          onClick={onBack}
          className="hidden md:flex absolute top-12 left-12 lg:left-16 items-center gap-2 text-white/50 hover:text-white transition-colors text-xs font-bold tracking-[0.2em] uppercase group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Work
        </button>

        <div className="flex flex-col max-w-lg w-full mx-auto md:mx-0">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-400 mb-4">
            {project.badge}
          </span>
          <h1 className="font-display font-semibold text-4xl md:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1] mb-8">
            {project.title}
          </h1>

          {/* Dynamic Content (Crossfade) */}
          <div className="min-h-[180px] hidden md:block">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex flex-col gap-4"
              >
                <h2 className="font-display text-2xl text-white/90 font-medium tracking-tight">
                  {activeSection.title}
                </h2>
                <p className="text-white/60 text-base lg:text-lg leading-relaxed">
                  {activeSection.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Services / Tech Stack */}
          <div className="mt-8 md:mt-12 pt-8 border-t border-white/10">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-4">
              Core Technologies
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-white/70"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Navigation Tabs (Desktop Only) */}
          <div className="hidden md:flex flex-col gap-4 mt-16">
            {project.sections.map((sec, idx) => {
              const isActive = activeSectionId === sec.id;
              return (
                <button
                  key={sec.id}
                  onClick={() => handleTabClick(sec.id)}
                  className={`flex items-center gap-4 text-left group transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-40 hover:opacity-70'}`}
                >
                  <span className="text-[10px] font-mono tracking-widest w-4">
                    0{idx + 1}
                  </span>
                  <div className="relative flex-1 h-[1px] bg-white/20 overflow-hidden">
                    <motion.div 
                      className="absolute inset-y-0 left-0 bg-cyan-400"
                      initial={{ width: '0%' }}
                      animate={{ width: isActive ? '100%' : '0%' }}
                      transition={{ duration: 0.6, ease: "circOut" }}
                    />
                  </div>
                  <span className={`text-xs font-bold tracking-widest uppercase transition-colors duration-300 ${isActive ? 'text-cyan-400' : 'text-white'}`}>
                    {sec.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Live Link Button */}
          <button className="mt-16 md:mt-24 group flex items-center justify-between w-full py-4 border-b border-white/10 text-white hover:border-cyan-400 transition-colors">
            <span className="text-sm font-bold tracking-widest uppercase">View Case Details</span>
            <ArrowUpRight className="w-5 h-5 text-white/40 group-hover:text-cyan-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
          </button>
        </div>
      </div>

      {/* RIGHT COLUMN: Scrollable Gallery */}
      <div className="w-full md:w-[60%] flex flex-col py-16 md:py-32 px-6 md:px-12 lg:px-24 gap-[100px] md:gap-[160px] relative z-30">
        {project.sections.map((section) => (
          <SectionImage 
            key={section.id} 
            section={section} 
            onInView={setActiveSectionId} 
          />
        ))}
        
        {/* Footer spacing inside scroll area */}
        <div className="h-[20vh] w-full flex items-center justify-center border-t border-white/10 mt-[80px]">
          <button 
            onClick={onBack}
            className="text-white/40 hover:text-white transition-colors text-sm font-bold tracking-widest uppercase flex items-center gap-2"
          >
            Return to Showcase
          </button>
        </div>
      </div>

    </div>
  );
}
