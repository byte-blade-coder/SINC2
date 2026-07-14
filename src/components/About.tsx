
import React from 'react';
import { motion } from 'framer-motion';
import AnimationWrapper from './AnimationWrapper';
import AnimatedIcon from './AnimatedIcon';

const About = () => {
  const stats = [
    { number: '4', label: 'Core Technology Pillars' },
    { number: '10+', label: 'Years of R&D Experience' },
    { number: '20+', label: 'Systems Engineered / Deployed' },
    { number: '6', label: 'Active Programs' },
  ];

  return (
    <AnimationWrapper>
      <div className="about-section-outer">
        <section className="about-section">
          <div className="about-container">
            <motion.div 
              className="about-left"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="about-img-wrap">
                <motion.img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Team Meeting"
                  className="about-main-img"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <div className="about-cards-row">
                <motion.div 
                  className="about-exp-card"
                  whileHover={{ scale: 1.05, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="about-exp-label">EXPERIENCE</div>
                  <div className="about-exp-number">
                    20<sup>+</sup>
                  </div>
                  <p className="about-exp-desc">Years of Excellence in IT Solutions Company.</p>
                </motion.div>
                <motion.div 
                  className="about-founder-card"
                  whileHover={{ scale: 1.05, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src="https://i.pravatar.cc/100?img=15"
                    alt="Burdee Nicolas"
                    className="about-founder-avatar"
                  />
                  <div className="about-founder-info">
                    <div className="about-founder-name">Burdee Nicolas</div>
                    <div className="about-founder-role">Co. Founder</div>
                  </div>
                  <div className="about-founder-sign">
                    <svg width="60" height="24" viewBox="0 0 80 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 20 Q10 5 20 18 Q30 28 38 10 Q46 2 55 15 Q62 25 70 12 Q75 5 78 10" stroke="#23abe6" strokeWidth="2" fill="none" strokeLinecap="round" />
                    </svg>
                  </div>
                </motion.div>
              </div>
            </motion.div>
            <motion.div 
              className="about-right"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="about-label">ABOUT SINC LAB</span>
              <h2 className="about-heading">
                Turning Sensor Data Into Maritime Domain Awareness.
              </h2>
              <p className="about-desc">
                SINC Lab is a research and engineering company building the sensing, processing, communication, and analytics systems behind modern Maritime Domain Awareness (MDA). Our work spans four integrated technology pillars — from radar & RF sensing and coastal surveillance at the edge, to high-performance processing platforms, resilient SATCOM and SDR-based communication, and analytics that turn AIS vessel tracking and sensor data into actionable maritime intelligence.
              </p>
              <p className="about-desc about-desc-italic">
                We are engineers first. Our roadmap is set by real naval and maritime security operating problems — not by what&apos;s easy to build.
              </p>
              <div className="about-stats">
                {stats.map((stat, index) => (
                  <motion.div 
                    key={index} 
                    className="about-stat"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <div className="about-stat-num">
                      {stat.number}
                      <sup>+</sup>
                    </div>
                    <div className="about-stat-label">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
              <div className="about-bottom-row">
                <motion.a 
                  href="#" 
                  className="about-btn"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn More
                  <AnimatedIcon className="about-btn-icon" hoverScale={1.18} rotate={8} duration={1.8}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </AnimatedIcon>
                </motion.a>
              </div>
              <motion.div 
                className="about-award-badge"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <div className="about-award-ring-wrap">
                  <div className="about-award-inner">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 15l-3 3-3-3V5h6v10z" />
                      <circle cx="12" cy="18" r="3" />
                      <path d="M12 11h2l1-4h-3" />
                    </svg>
                  </div>
                  <svg className="about-award-ring" viewBox="0 0 120 120" width="110" height="110">
                    <defs>
                      <path id="circlePath" d="M60,60 m-42,0 a42,42 0 1,1 84,0 a42,42 0 1,1 -84,0" />
                    </defs>
                    <text fontSize="10.5" fontFamily="Manrope, sans-serif" fill="#ffffff" letterSpacing="2.5" fontWeight="600">
                      <textPath href="#circlePath">AWARD WINNING AGENCY • 2019 • AWARD WINNING AGENCY • 2019 • </textPath>
                    </text>
                  </svg>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>
    </AnimationWrapper>
  );
};

export default About;

