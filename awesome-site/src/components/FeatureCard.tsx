import React from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { useInView } from 'react-intersection-observer';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  delay?: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  icon, 
  title, 
  description, 
  color,
  delay = 0 
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      className="w-full"
    >
      <Tilt
        tiltMaxAngleX={10}
        tiltMaxAngleY={10}
        glareEnable={true}
        glareMaxOpacity={0.1}
        glareColor={color}
        glarePosition="all"
        glareBorderRadius="12px"
        className="h-full"
      >
        <div 
          className={`h-full p-8 rounded-xl glass-morphism border border-white/10 overflow-hidden relative group`}
        >
          {/* 背景渐变 */}
          <div 
            className={`absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-br ${getGradientClass(color)}`} 
          />
          
          {/* 装饰元素 */}
          <div className="absolute -right-4 -top-4 w-24 h-24 blur-3xl rounded-full opacity-30 group-hover:opacity-50 transition-opacity duration-500" style={{ backgroundColor: color }} />
          
          {/* 内容 */}
          <div className="relative z-10">
            <div className="w-16 h-16 mb-6 flex items-center justify-center rounded-lg bg-white/10 text-white">
              {icon}
            </div>
            
            <h3 className="text-xl font-bold mb-3 text-white group-hover:text-white/90 transition-colors duration-300">
              {title}
            </h3>
            
            <p className="text-white/70 group-hover:text-white/80 transition-colors duration-300">
              {description}
            </p>
          </div>
          
          {/* 悬停时显示的光效 */}
          <motion.div 
            className="absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ backgroundColor: color }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
        </div>
      </Tilt>
    </motion.div>
  );
};

// 根据颜色获取对应的渐变类
const getGradientClass = (color: string): string => {
  switch (color) {
    case '#FF1493': // neon-pink
      return 'from-pink-500 to-purple-500';
    case '#00BFFF': // neon-blue
      return 'from-blue-500 to-cyan-500';
    case '#39FF14': // neon-green
      return 'from-green-500 to-emerald-500';
    case '#FFFF00': // neon-yellow
      return 'from-yellow-400 to-amber-500';
    case '#9D00FF': // neon-purple
      return 'from-purple-500 to-indigo-500';
    default:
      return 'from-purple-500 to-blue-500';
  }
};

export default FeatureCard; 