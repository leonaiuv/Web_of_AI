import React from 'react';
import { motion } from 'framer-motion';

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, delay }) => {
  return (
    <motion.div 
      className="cyber-card p-6"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="text-4xl mb-4 cyber-text">{icon}</div>
      <h3 className="text-xl font-mono font-bold mb-3">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  );
};

const Features = () => {
  const features = [
    {
      icon: '🌐',
      title: '沉浸式体验',
      description: '利用最新的VR和AR技术，创造身临其境的数字体验，让用户感受未来科技的魅力。'
    },
    {
      icon: '⚡',
      title: '高性能渲染',
      description: '采用先进的3D渲染技术，实现流畅的视觉效果和交互体验，无论在何种设备上都能保持出色表现。'
    },
    {
      icon: '🔮',
      title: '人工智能集成',
      description: '融合AI技术，提供智能化的用户体验，根据用户行为自动调整内容和交互方式。'
    },
    {
      icon: '🔒',
      title: '安全可靠',
      description: '采用先进的加密技术和安全协议，保护用户数据和隐私，让用户安心探索赛博空间。'
    },
    {
      icon: '🚀',
      title: '未来扩展性',
      description: '模块化设计，支持未来技术的无缝集成，确保系统始终处于技术前沿。'
    },
    {
      icon: '🌈',
      title: '视觉震撼',
      description: '独特的赛博朋克美学设计，结合霓虹色彩和未来主义元素，打造视觉冲击力强的界面。'
    }
  ];

  return (
    <section id="features" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-mono font-bold mb-4">
            <span className="cyber-text">未来科技</span> 特性
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            探索赛博空间的核心技术和创新功能，体验前所未有的数字世界
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>

      {/* 背景装饰 */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-secondary/5 rounded-full blur-3xl"></div>
    </section>
  );
};

export default Features; 