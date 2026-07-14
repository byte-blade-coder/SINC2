
import React from 'react';
import { motion } from 'framer-motion';
import AnimationWrapper from './AnimationWrapper';
import AnimatedIcon from './AnimatedIcon';

const Why = () => {
  const features = [
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#23abe6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3l8 4v5c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V7l8-4z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      ),
      title: "R&D-Led Engineering",
      desc: "Every system we field starts as a research question, not a sales pitch. Our engineering is grounded in applied R&D across radar & RF sensing, signal processing, and secure communications."
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#23abe6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 20V8l9-5 9 5v12" />
          <path d="M3 12h18" />
          <path d="M8 16h8" />
        </svg>
      ),
      title: "Purpose-Built for Maritime Domain Awareness",
      desc: "We do not build generic technology and retrofit it for defense. Every pillar — Sensing, Processing, Communication, and Data Analytics — is engineered specifically for maritime domain awareness and coastal surveillance missions."
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#23abe6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19h16" />
          <path d="M7 19V9" />
          <path d="M12 19V5" />
          <path d="M17 19v-7" />
        </svg>
      ),
      title: "Four Pillars, One C4ISR-Ready Architecture",
      desc: "From raw signal to operational intelligence, our four technology domains are designed to function as a single C4ISR-aligned decision-support architecture — not disconnected products."
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#23abe6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3v18" />
          <path d="M3 12h18" />
          <circle cx="12" cy="12" r="8" />
        </svg>
      ),
      title: "Built for Harsh, Real-World Maritime Environments",
      desc: "Maritime and field environments do not forgive fragile engineering. Our systems are designed for continuous operation under real environmental and operational stress at sea."
    }
  ];

  return (
    <AnimationWrapper>
      <section className="why-section">
        <div className="why-container">
          <div className="why-top">
            <motion.div 
              className="why-top-left"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="why-label">WHY CHOOSE US</span>
              <h2 className="why-heading">
                Built on Research. Proven in Maritime Domain Awareness.
              </h2>
            </motion.div>
          </div>
          <div className="why-cards">
            {features.map((feature, index) => (
              <motion.div 
                key={index} 
                className="why-card"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
              >
                <div className="why-card-icon">
                  <AnimatedIcon className="flex items-center justify-center" hoverScale={1.18} rotate={10} duration={2.4} delay={index * 0.08}>
                    {feature.icon}
                  </AnimatedIcon>
                </div>
                <h3 className="why-card-title">{feature.title}</h3>
                <p className="why-card-desc">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </AnimationWrapper>
  );
};

export default Why;

