
import React from 'react';
import { motion } from 'framer-motion';
import AnimationWrapper from './AnimationWrapper';

const Clients = () => {
  const logos = [
    { name: 'Aegis', mark: 'AG' },
    { name: 'Northstar', mark: 'NS' },
    { name: 'Mariner', mark: 'MR' },
    { name: 'Harbor', mark: 'HB' },
    { name: 'Signal', mark: 'SG' },
    { name: 'Vantage', mark: 'VT' },
  ];

  return (
    <AnimationWrapper>
      <section className="trust-bar-section">
        <motion.div
          className="trust-bar-inner"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="trust-logo-marquee" role="list" aria-label="Trusted partners and programs">
            <div className="trust-logo-track">
              {[...logos, ...logos].map((logo, index) => (
                <motion.div
                  key={`${logo.name}-${index}`}
                  className="trust-logo-card"
                  role="listitem"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: index * 0.03 }}
                  whileHover={{ scale: 1.04, y: -4 }}
                >
                  <div className="trust-logo-mark">{logo.mark}</div>
                  <span className="trust-logo-name">{logo.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>
    </AnimationWrapper>
  );
};

export default Clients;

