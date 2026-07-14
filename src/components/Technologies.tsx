
import React from 'react';
import { motion } from 'framer-motion';
import AnimationWrapper from './AnimationWrapper';
import AnimatedIcon from './AnimatedIcon';

const Technologies = () => {
  const techsLeft = [
    { name: 'Notion', desc: 'You can create rich-text document customizable formatting, images.', img: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png' },
    { name: 'Gitlab', desc: 'Support more Multiple repositories to one or more channels.', img: 'https://upload.wikimedia.org/wikipedia/commons/e/e1/GitLab_logo.svg' },
    { name: 'OVHcloud', desc: 'OVH legally OVH groupe SAS, is a French cloud compute company.', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/OVHcloud_logo.svg/1024px-OVHcloud_logo.svg.png' },
    { name: 'ChatGPT', desc: 'Offering assistance with answering frequently asked questions.', img: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg' },
  ];

  const techsRight = [
    { name: 'Clickup', desc: 'ClickUp is a productivity platform for our task management.', img: 'https://cdn.worldvectorlogo.com/logos/clickup.svg' },
    { name: 'Slack', desc: 'Slack uses channels to organize communication around topics.', img: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg' },
    { name: 'Zoom', desc: 'For Video conferencing platform used for virtual meeting.', img: 'https://upload.wikimedia.org/wikipedia/commons/1/19/Zoom_vibrant_logo.svg' },
    { name: 'Dropbox', desc: 'Dropbox provides cloud storage where users can securely store.', img: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Dropbox_Icon.svg' },
  ];

  return (
    <AnimationWrapper>
      <section className="tech-section">
        <div className="tech-container">
          <motion.div 
            className="tech-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="tech-subtitle">[ OUR TECHNOLOGIES ]</span>
            <h2 className="tech-title">
              Effortless IT Integration<br />
              for Business.
            </h2>
          </motion.div>
          <div className="tech-grid-wrapper">
            <div className="tech-marquee tech-marquee-left">
              <div className="tech-marquee-track track-left">
                {[...techsLeft, ...techsLeft].map((tech, index) => (
                  <motion.div 
                    key={index} 
                    className="tech-card"
                    whileHover={{ scale: 1.05, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="tech-card-header">
                      <img src={tech.img} alt={tech.name} className="tech-icon" />
                      <h3 className="tech-name">{tech.name}</h3>
                    </div>
                    <p className="tech-desc">{tech.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="tech-marquee tech-marquee-right">
              <div className="tech-marquee-track track-right">
                {[...techsRight, ...techsRight].map((tech, index) => (
                  <motion.div 
                    key={index} 
                    className="tech-card"
                    whileHover={{ scale: 1.05, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="tech-card-header">
                      <img src={tech.img} alt={tech.name} className="tech-icon" />
                      <h3 className="tech-name">{tech.name}</h3>
                    </div>
                    <p className="tech-desc">{tech.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </AnimationWrapper>
  );
};

export default Technologies;

