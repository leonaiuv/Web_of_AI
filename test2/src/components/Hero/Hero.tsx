'use client';

import React, { useEffect, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { FiCode, FiUsers, FiGlobe } from 'react-icons/fi';
import gsap from 'gsap';
import ThreeDScene from '../ThreeDScene/ThreeDScene';

const Hero = () => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 创建打字机效果
      const textElement = document.querySelector('.typewriter-text');
      if (textElement) {
        const text = textElement.textContent || '';
        textElement.textContent = '';
        let i = 0;
        
        const typeWriter = () => {
          if (i < text.length) {
            textElement.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
          }
        };
        
        setTimeout(typeWriter, 1000);
      }
      
      // 光标动画
      gsap.to('.cursor', {
        opacity: 0,
        repeat: -1,
        yoyo: true,
        duration: 0.8
      });
    });
    
    return () => ctx.revert();
  }, []);
  
  return (
    <div className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <ThreeDScene />
      </div>
      
      <div className="relative z-10 container mx-auto px-6 py-24 md:py-40">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center md:text-left"
          >
            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-4 neon-text bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              欢迎来到 AI 数字世界
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex items-center justify-center md:justify-start mb-6"
            >
              <span className="typewriter-text text-xl md:text-2xl text-gray-300 font-light">开源平等是我们的宗旨</span>
              <span className="cursor inline-block w-0.5 h-6 bg-cyan-400 ml-1"></span>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg text-gray-300 mb-8 max-w-lg mx-auto md:mx-0"
            >
              在这里，我们共同探索 AI 的无限可能，创造开源未来，连接全球开发者，共建数字新世界。
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium shadow-lg shadow-purple-700/30"
              >
                加入社区
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 rounded-full bg-transparent border border-cyan-400 text-cyan-400 font-medium shadow-lg shadow-cyan-700/20 backdrop-blur-sm"
              >
                探索项目
              </motion.button>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="hidden md:flex justify-center"
          >
            <div className="glass-effect p-8 rounded-2xl grid grid-cols-2 gap-6 max-w-md">
              <StatItem 
                icon={<FiCode />} 
                number={500} 
                text="开源项目" 
                color="from-purple-500 to-blue-500" 
              />
              <StatItem 
                icon={<FiUsers />} 
                number={10000} 
                text="社区成员" 
                color="from-pink-500 to-purple-500" 
              />
              <StatItem 
                icon={<FiGlobe />} 
                number={120} 
                text="合作国家" 
                color="from-cyan-500 to-blue-500" 
              />
              <div className="col-span-2 h-24 glass-effect rounded-xl overflow-hidden">
                <div className="h-full w-full bg-gradient-to-r from-purple-900/30 to-pink-900/30 flex items-center justify-center">
                  <span className="text-cyan-400 text-xl font-medium animate-pulse-glow">共建AI开源未来</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* 底部装饰 */}
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-10"></div>
    </div>
  );
};

interface StatItemProps {
  icon: ReactNode;
  number: number;
  text: string;
  color: string;
}

const StatItem = ({ icon, number, text, color }: StatItemProps) => {
  return (
    <motion.div 
      whileHover={{ scale: 1.05 }}
      className={`p-4 rounded-xl bg-gradient-to-br ${color} bg-opacity-20 flex flex-col items-center justify-center`}
    >
      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 1 }}
        className="text-white text-2xl mb-2"
      >
        {icon}
      </motion.div>
      <motion.span 
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 1,
          transition: { delay: 1.2 }
        }}
        className="text-xl font-bold text-white"
      >
        {number}+
      </motion.span>
      <motion.span 
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 0.7,
          transition: { delay: 1.4 }
        }}
        className="text-sm text-gray-300"
      >
        {text}
      </motion.span>
    </motion.div>
  );
};

export default Hero; 