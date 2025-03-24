'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiBriefcase, FiCode, FiCpu, FiGlobe, FiLayers, FiUsers } from 'react-icons/fi';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
  color: string;
}

const FeatureCard = ({ icon, title, description, delay, color }: FeatureCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay }}
      className="glass-effect p-6 rounded-xl"
    >
      <div className={`w-12 h-12 rounded-lg mb-4 flex items-center justify-center ${color}`}>
        <span className="text-white text-xl">{icon}</span>
      </div>
      <h3 className="text-xl font-semibold mb-3 text-white">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </motion.div>
  );
};

const Features = () => {
  const features: FeatureCardProps[] = [
    {
      icon: <FiCode />,
      title: "开源共享",
      description: "我们鼓励分享代码、算法和创意，共同推动AI技术的开放发展。",
      delay: 0.1,
      color: "bg-gradient-to-br from-purple-600 to-indigo-600"
    },
    {
      icon: <FiUsers />,
      title: "多元社区",
      description: "来自全球的开发者在这里相聚，不分国界、种族和背景，共同创造。",
      delay: 0.2,
      color: "bg-gradient-to-br from-pink-600 to-purple-600"
    },
    {
      icon: <FiCpu />,
      title: "AI创新",
      description: "探索人工智能前沿技术，从机器学习到深度学习，从NLP到计算机视觉。",
      delay: 0.3,
      color: "bg-gradient-to-br from-cyan-600 to-blue-600"
    },
    {
      icon: <FiLayers />,
      title: "知识共享",
      description: "分享学习资源、教程和最佳实践，帮助每个人提升技能。",
      delay: 0.4,
      color: "bg-gradient-to-br from-amber-600 to-orange-600"
    },
    {
      icon: <FiBriefcase />,
      title: "项目孵化",
      description: "为有潜力的创意提供孵化，从想法到产品，全程支持。",
      delay: 0.5,
      color: "bg-gradient-to-br from-green-600 to-teal-600"
    },
    {
      icon: <FiGlobe />,
      title: "全球连接",
      description: "连接全球资源，举办黑客松、工作坊和技术峰会，拓展国际视野。",
      delay: 0.6,
      color: "bg-gradient-to-br from-blue-600 to-indigo-600"
    }
  ];

  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-100px 0px" });

  return (
    <section className="py-24 relative">
      {/* 背景装饰 */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-600 rounded-full filter blur-[100px] opacity-20"></div>
        <div className="absolute top-60 -right-20 w-60 h-60 bg-cyan-600 rounded-full filter blur-[100px] opacity-20"></div>
        <div className="absolute -bottom-40 left-1/2 transform -translate-x-1/2 w-80 h-80 bg-pink-600 rounded-full filter blur-[100px] opacity-20"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4 neon-text bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400"
          >
            我们的社区特色
          </motion.h2>
          <p className="text-lg text-gray-300">
            加入我们的开源社区，共同探索AI技术的无限可能，创造更加智能的未来世界。
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          viewport={{ once: true, margin: "-100px 0px" }}
          className="mt-20 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium shadow-lg shadow-purple-700/30"
          >
            探索更多特性
          </motion.button>
        </motion.div>
      </div>

      {/* 分隔线 */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
    </section>
  );
};

export default Features; 