
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimationWrapper from './AnimationWrapper';

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const testimonials = [
    {
      name: '[Client Name]',
      role: '[Title / Organization]',
      text: '“SINC Lab\'s sensing and analytics integration gave our team the Maritime Domain Awareness picture we didn\'t have before — reliable data, delivered in real time, from a system that held up in the field.”',
      avatar: ''
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <AnimationWrapper>
      <div className="testimonials-section-outer">
        <section className="testimonials-section">
          <div className="testimonials-container">
            <div className="testimonials-slider">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  className="testimonial-slide active"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="testimonial-avatars">
                    {testimonials.map((t, i) => (
                      <div
                        key={i}
                        className={`testimonial-avatar skeleton-avatar ${i === activeIndex ? 'active' : ''}`}
                        onClick={() => setActiveIndex(i)}
                        style={{ cursor: 'pointer' }}
                      />
                    ))}
                  </div>
                  <div className="testimonial-author">
                    <div className="testimonial-coming-soon">Coming Soon</div>
                    <div className="testimonial-name skeleton-line short" />
                    <div className="testimonial-role skeleton-line tiny" />
                  </div>
                  <div className="testimonial-content testimonial-skeleton-card">
                    <div className="testimonial-stars skeleton-line medium" />
                    <div className="testimonial-text skeleton-line" />
                    <div className="testimonial-text skeleton-line" />
                    <div className="testimonial-text skeleton-line small" />
                    <div className="testimonial-attribution">{testimonials[activeIndex].name}, {testimonials[activeIndex].role}</div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="testimonial-dots">
              {testimonials.map((_, index) => (
                <motion.span
                  key={index}
                  className={`testimonial-dot ${index === activeIndex ? 'active' : ''}`}
                  onClick={() => setActiveIndex(index)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>
          </div>
        </section>
      </div>
    </AnimationWrapper>
  );
};

export default Testimonials;

