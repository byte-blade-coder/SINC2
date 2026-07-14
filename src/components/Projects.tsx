import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import AnimationWrapper from './AnimationWrapper';

const Projects = () => {
  const gridRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (gridRef.current) {
      const card = gridRef.current.querySelector('.project-card') as HTMLElement;
      const cardWidth = (card ? card.offsetWidth : 300) + 20; // 20px gap
      gridRef.current.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (gridRef.current) {
      const card = gridRef.current.querySelector('.project-card') as HTMLElement;
      const cardWidth = (card ? card.offsetWidth : 300) + 20; // 20px gap
      gridRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });
    }
  };

  const projects = [
    {
      name: 'Cloud Migration System',
      img: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      badge: 'Solution'
    },
    {
      name: 'Digital Growth Strategy',
      img: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      badge: 'Solution'
    },
    {
      name: 'Mobile App Development',
      img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      badge: 'Solution'
    },
    {
      name: 'Business Transformation',
      img: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      badge: 'Solution'
    },
  ];

  return (
    <AnimationWrapper>
      <section className="projects-section">
        <div className="projects-container">
          <motion.div 
            className="projects-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="projects-header-left">
              <span className="projects-subtitle">[ RECENT PROJECTS ]</span>
              <h2 className="projects-title">
                Breaking Boundaries,<br />
                Creating New Horizons.
              </h2>
            </div>
            <div className="projects-header-right">
              <p className="projects-desc">
                SINC has a long-standing history of pioneering complex solutions for naval systems and enterprise infrastructure.
              </p>
              <div className="carousel-controls">
                <button onClick={scrollLeft} className="control-btn prev-btn" aria-label="Previous Slide">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="19" y1="12" x2="5" y2="12" />
                    <polyline points="12 19 5 12 12 5" />
                  </svg>
                </button>
                <button onClick={scrollRight} className="control-btn next-btn" aria-label="Next Slide">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>

          <div ref={gridRef} className="projects-grid">
            {projects.map((project, index) => (
              <motion.div 
                key={index} 
                className="project-card"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className="card-image-wrap">
                  <img src={project.img} alt={project.name} className="project-img" />
                  <div className="card-overlay" />
                  <span className="project-badge">{project.badge}</span>
                  <a href="#" className="project-detail-link">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </a>
                </div>
                <div className="card-info">
                  <h3 className="project-name">
                    <a href="#">{project.name}</a>
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </AnimationWrapper>
  );
};

export default Projects;
