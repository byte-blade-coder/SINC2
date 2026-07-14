
import React from 'react';
import { motion } from 'framer-motion';
import AnimationWrapper from './AnimationWrapper';
import AnimatedIcon from './AnimatedIcon';

const Team = () => {
  const placeholderImage = 'data:image/svg+xml;utf8,' + encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="600" height="720" viewBox="0 0 600 720">
      <rect width="600" height="720" rx="28" fill="#111827"/>
      <rect x="70" y="70" width="460" height="580" rx="24" fill="#1f2937" stroke="#374151" stroke-width="2"/>
      <circle cx="300" cy="280" r="110" fill="#4b5563"/>
      <path d="M180 570c20-92 100-142 120-142s100 50 120 142" fill="#4b5563"/>
      <rect x="180" y="150" width="240" height="40" rx="20" fill="#23abe6" opacity="0.7"/>
    </svg>
  `);

  const teamMembers = [
    {
      name: '[Name]',
      role: 'Founder / Chief Executive',
      img: placeholderImage
    },
    {
      name: '[Name]',
      role: 'Radar & RF Sensing Lead',
      img: placeholderImage
    },
    {
      name: '[Name]',
      role: 'Processing & Embedded Systems Lead',
      img: placeholderImage
    },
    {
      name: '[Name]',
      role: 'Communication Systems Lead (SATCOM / SDR)',
      img: placeholderImage
    },
    {
      name: '[Name]',
      role: 'Maritime Data Analytics Lead',
      img: placeholderImage
    }
  ];

  return (
    <AnimationWrapper>
      <section className="team-section">
        <div className="team-container">
          <motion.div 
            className="team-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="team-header-left">
              <span className="team-subtitle">OUR ENGINEERING TEAM</span>
              <h2 className="team-title">
                The People Behind the Systems.
              </h2>
            </div>
          </motion.div>
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <motion.div 
                key={index} 
                className="team-card"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
              >
                <div className="team-img-wrapper">
                  <img src={member.img} alt={member.name} />
                </div>
                <div className="team-info">
                  <h3 className="team-name">{member.name}</h3>
                  <span className="team-role">{member.role}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </AnimationWrapper>
  );
};

export default Team;

