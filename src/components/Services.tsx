
import React from 'react';
import { motion } from 'framer-motion';
import AnimationWrapper from './AnimationWrapper';
import AnimatedIcon from './AnimatedIcon';

const Services = () => {
  const services = [
    {
      number: '01',
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#23abe6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 18V8l8-4 8 4v10" />
          <path d="M4 12h16" />
          <path d="M8 16h8" />
        </svg>
      ),
      title: 'Sensing — Radar, RF Sensing & Coastal Surveillance',
      desc: 'We develop and integrate naval sensor systems — radar, RF sensing, and coastal surveillance radar — that capture the critical operational data feeding Maritime Domain Awareness.',
      list: ['Radar & RF sensing, signal acquisition and monitoring', 'Environmental sensors for maritime conditions', 'Control & interface sensors for embedded systems'],
    },
    {
      number: '02',
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#23abe6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <path d="M8 8h8" />
          <path d="M8 12h5" />
          <path d="M8 16h3" />
        </svg>
      ),
      title: 'Processing — High-Performance Processing Platforms',
      desc: 'We design computing platforms that turn radar, RF, and sensor data into intelligent system behavior — the processing backbone of any C4ISR architecture.',
      list: ['FPGA, GPU, SBC, and DSP-based hardware platforms', 'Radar and RF signal processing algorithms', 'Communication and embedded control algorithms'],
    },
    {
      number: '03',
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#23abe6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 7h14" />
          <path d="M7 7V5h10v2" />
          <rect x="4" y="7" width="16" height="11" rx="2" />
          <path d="M8 18v2" />
          <path d="M16 18v2" />
        </svg>
      ),
      title: 'Communication — Secure Communication & SATCOM Systems',
      desc: 'We build communication technologies that enable reliable data transmission across maritime platforms, sensors, and command centers spanning SDR, SATCOM, and long-range networks.',
      list: ['Software Defined Radio and SATCOM', 'LPWAN / LoRaWAN for distributed sensing', 'Wireless networking and secure operational data links'],
    },
    {
      number: '04',
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#23abe6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19h16" />
          <path d="M7 19V9" />
          <path d="M12 19V5" />
          <path d="M17 19v-7" />
        </svg>
      ),
      title: 'Data Analytics — AIS Vessel Tracking & Maritime Intelligence',
      desc: 'We transform AIS vessel tracking, radar, and sensor data into actionable maritime intelligence for real-time monitoring, dark vessel detection, and informed decision-making.',
      list: ['Maritime traffic intelligence', 'Dark vessel detection / dark shipping analysis', 'Search & rescue and environmental intelligence'],
    },
  ];

  return (
    <AnimationWrapper>
      <div className="services-section-outer">
        <section className="services-section">
          <div className="services-container">
            <div className="services-grid">
              <motion.div 
                className="services-title-card"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <span className="services-label">EXPLORE CAPABILITIES</span>
                <h2 className="services-heading">
                  Four Pillars of Maritime Domain Awareness.
                </h2>
                <p className="services-desc">
                  SINC Lab builds integrated capability across sensing, processing, communication, and analytics for modern maritime and defense operations.
                </p>
              </motion.div>
              {services.map((service, index) => (
                <motion.div 
                  key={index} 
                  className="service-card"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -10 }}
                >
                  <div className="service-number-box">{service.number}</div>
                  <div className="service-icon-wrap">
                    <AnimatedIcon className="flex items-center justify-center" hoverScale={1.2} rotate={8} duration={2.2} delay={index * 0.08}>
                      {service.icon}
                    </AnimatedIcon>
                  </div>
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-desc">{service.desc}</p>
                  <ul className="service-list">
                    {service.list.map((item, i) => (
                      <li key={i}>
                        <span className="check-icon">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#23abe6" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <motion.a 
                    href="#" 
                    className="service-link"
                    whileHover={{ x: 5 }}
                  >
                    <span>Learn more</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </motion.a>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </AnimationWrapper>
  );
};

export default Services;

