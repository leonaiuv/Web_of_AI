import React, { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';

// 定义FeatureCard组件的属性接口
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}

// 单个特性卡片组件
const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });
  
  return (
    <motion.div 
      ref={ref}
      className="nature-card p-6 md:p-8"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
    >
      <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-xl md:text-2xl font-display font-bold mb-4">{title}</h3>
      <p className="text-dark-light">{description}</p>
    </motion.div>
  );
};

// 定义特性数据接口
interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Features = () => {
  const waterPathRef = useRef<SVGPathElement>(null);
  
  // 使用GSAP创建水波纹动画
  useEffect(() => {
    if (waterPathRef.current) {
      gsap.to(waterPathRef.current, {
        attr: { 
          d: "M0,64 C40,54 80,100 120,70 C160,40 200,90 240,80 C280,70 320,30 360,50 C400,70 440,90 480,60 L480,192 L0,192 Z" 
        },
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }
  }, []);
  
  const features: Feature[] = [
    {
      icon: (
        <svg className="w-8 h-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        </svg>
      ),
      title: "自然设计",
      description: "采用有机曲线和自然元素，创造和谐、舒适的视觉体验，让用户感受自然的平静与活力。"
    },
    {
      icon: (
        <svg className="w-8 h-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M12 16c2.5-2.5 4-5 4-7a4 4 0 00-8 0c0 2 1.5 4.5 4 7z"></path>
        </svg>
      ),
      title: "流体动画",
      description: "灵感来自流水、树叶飘动等自然现象，打造流畅、优雅的动画效果，增强用户交互的趣味性。"
    },
    {
      icon: (
        <svg className="w-8 h-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"></path>
        </svg>
      ),
      title: "沉浸式体验",
      description: "通过精心设计的视觉和动效，为用户创造身临其境的自然体验，提升用户参与感和记忆点。"
    },
    {
      icon: (
        <svg className="w-8 h-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"></path>
        </svg>
      ),
      title: "精致交互",
      description: "每一处交互都经过精心设计，从细节处体现设计的用心，让用户在操作中感受自然的舒适与愉悦。"
    }
  ];

  return (
    <section id="features" className="py-20 relative overflow-hidden">
      {/* 背景装饰 - 水波纹 */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg viewBox="0 0 480 192" className="w-full h-auto fill-secondary/5">
          <path 
            ref={waterPathRef}
            d="M0,64 C40,80 80,40 120,50 C160,60 200,90 240,70 C280,50 320,30 360,70 C400,110 440,90 480,80 L480,192 L0,192 Z" 
          />
        </svg>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            <span className="nature-text">自然流动</span> 的独特体验
          </h2>
          <p className="text-dark-light max-w-2xl mx-auto">
            我们将自然界的美感与现代设计相结合，创造出让人难以忘怀的数字体验。
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
        
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <a href="#projects" className="nature-btn">
            探索作品案例
          </a>
        </motion.div>
      </div>
      
      {/* 装饰元素 - 漂浮的叶子 */}
      <motion.div 
        className="absolute top-1/4 right-8 opacity-20"
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 10, 0]
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 6,
          ease: "easeInOut" 
        }}
      >
        <svg className="w-24 h-24 text-primary" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" />
        </svg>
      </motion.div>
      
      <motion.div 
        className="absolute bottom-1/3 left-8 opacity-20"
        animate={{ 
          y: [0, 20, 0],
          rotate: [0, -10, 0]
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 7,
          ease: "easeInOut",
          delay: 1
        }}
      >
        <svg className="w-20 h-20 text-primary" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" />
        </svg>
      </motion.div>
    </section>
  );
};

export default Features; 