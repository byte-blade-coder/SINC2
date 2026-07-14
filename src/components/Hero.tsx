
import React from 'react';
import { motion } from 'framer-motion';
import AnimationWrapper from './AnimationWrapper';
import AnimatedIcon from './AnimatedIcon';

const Hero = () => {
  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <section className="hero-section">
      <div className="hero-container">
        <motion.div
          className="hero-content"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.span
            className="hero-subtitle"
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: {
                opacity: 1,
                x: 0,
                transition: { duration: 0.6, ease: 'easeOut' }
              }
            }}
          >
            Maritime Domain Awareness & Mission-Critical Engineering
          </motion.span>
          <motion.h1
            className="text-[65px] font-medium hero-title"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, ease: 'easeOut' }
              }
            }}
          >
            Engineering Maritime
            <br />
            Domain Awareness Through
            <br />
            Innovative R&D.
          </motion.h1>
          <motion.div
            className="hero-actions-wrap"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, ease: 'easeOut', delay: 0.3 }
              }
            }}
          >
            <motion.a
              href="#"
              className="btn-primary hero-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Capabilities
              <span className="btn-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </span>
            </motion.a>
            <motion.a
              href="tel:+923223525116"
              className="hero-phone"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatedIcon className="phone-icon" hoverScale={1.2} rotate={8} duration={2.1}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#23abe6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </AnimatedIcon>
              +92 322 3525116
            </motion.a>
          </motion.div>
          <motion.div
            className="hero-features"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, ease: 'easeOut', delay: 0.5 }
              }
            }}
          >
            <motion.div
              className="feature-item"
              whileHover={{ x: 10 }}
            >
              <AnimatedIcon className="check-circle" hoverScale={1.2} rotate={8} duration={1.8}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </AnimatedIcon>
              Innovate Smarter
            </motion.div>
            <motion.div
              className="feature-item"
              whileHover={{ x: 10 }}
            >
              <AnimatedIcon className="check-circle" hoverScale={1.2} rotate={8} duration={1.8}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </AnimatedIcon>
              Technology Simplified
            </motion.div>
          </motion.div>
        </motion.div>
        <motion.div
          className="hero-image-wrapper"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
        >
          <motion.img
            src="https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            alt="Business Woman"
            className="main-hero-img"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            className="trusted-badge"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.8 }}
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <div className="badge-icon-wrap">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <polyline points="9 12 11 14 15 10" />
              </svg>
            </div>
            <div className="badge-text">
              Trusted by 800+<br />
              Tech Giants.
            </div>
          </motion.div>
          <motion.div
            className="reviews-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 1 }}
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <div className="avatars">
              <img src="https://i.pravatar.cc/100?img=11" alt="User 1" />
              <img src="https://i.pravatar.cc/100?img=12" alt="User 2" />
              <img src="https://i.pravatar.cc/100?img=13" alt="User 3" />
              <img src="https://i.pravatar.cc/100?img=14" alt="User 4" />
            </div>
            <div className="reviews-score-wrap">
              <span className="score">4.9</span>
              <span className="stars">★★★★★</span>
            </div>
            <div className="reviews-desc">Based on 600+ Google Reviews.</div>
          </motion.div>
        </motion.div>
      </div>
      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          y: [0, 10, 0]
        }}
        transition={{
          opacity: { duration: 0.6, delay: 1.2 },
          y: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
      >
        <span className="scroll-text">Scroll Down</span>
        <div className="scroll-icon-wrap">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <polyline points="19 12 12 19 5 12" />
          </svg>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;

