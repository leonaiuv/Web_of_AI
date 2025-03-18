import React from 'react';
import { motion } from 'framer-motion';
import '../styles/Features.css';

const featureData = [
  {
    icon: '✨',
    title: '精美动画',
    description: '通过流畅的过渡和细腻的动态效果，为用户带来愉悦的视觉体验'
  },
  {
    icon: '📱',
    title: '响应式设计',
    description: '完美适配各种设备尺寸，从手机到桌面，提供一致的优质体验'
  },
  {
    icon: '🚀',
    title: '高效性能',
    description: '优化的代码结构和资源加载，确保网站快速响应和流畅运行'
  },
  {
    icon: '🎨',
    title: '现代美学',
    description: '简洁优雅的设计语言，结合时尚配色方案，展现专业品质'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
};

const Features = () => {
  return (
    <section className="features-section section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="section-title">优秀特性</h2>
          <p className="section-description">
            我们提供了一系列现代化的功能，帮助您打造令人印象深刻的网站
          </p>
        </motion.div>

        <motion.div
          className="features-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {featureData.map((feature, index) => (
            <motion.div
              className="feature-card"
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
              <motion.div 
                className="feature-link"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                了解更多 →
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features; 