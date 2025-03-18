import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="relative min-h-screen pt-24 pb-16 flex items-center overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* 左侧内容 */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
                探索<span className="ai-text ai-glow">AI应用</span>无限可能
              </h1>
              
              <p className="text-lg md:text-xl text-gray-300 mb-8">
                发现、分享和探索最前沿的人工智能应用程序，连接创造者与使用者的桥梁
              </p>
              
              <div className="flex flex-wrap gap-4">
                <a href="#explore" className="btn-primary">
                  开始探索
                </a>
                <a href="#share" className="btn-outline">
                  分享应用
                </a>
              </div>
              
              <div className="mt-12 grid grid-cols-3 gap-6">
                <div className="text-center">
                  <h3 className="text-4xl font-bold ai-text">1000+</h3>
                  <p className="text-gray-400 mt-2">AI应用</p>
                </div>
                <div className="text-center">
                  <h3 className="text-4xl font-bold ai-text">250K+</h3>
                  <p className="text-gray-400 mt-2">活跃用户</p>
                </div>
                <div className="text-center">
                  <h3 className="text-4xl font-bold ai-text">50+</h3>
                  <p className="text-gray-400 mt-2">AI类别</p>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* 右侧动画 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-w-1 aspect-h-1 rounded-xl overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-600/30 to-secondary-600/30 backdrop-blur-md rounded-xl ai-border"></div>
              
              {/* 3D AI应用图标网格 */}
              <div className="grid grid-cols-3 grid-rows-3 gap-4 p-6 relative">
                {Array.from({ length: 9 }).map((_, index) => (
                  <motion.div
                    key={index}
                    className="aspect-square bg-dark-light rounded-lg shadow-lg ai-border flex items-center justify-center overflow-hidden"
                    animate={{
                      y: [0, -10, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: index * 0.2,
                      ease: "easeInOut"
                    }}
                  >
                    <AppIcon index={index} />
                  </motion.div>
                ))}
              </div>
              
              {/* 装饰性粒子 */}
              <div className="absolute inset-0 pointer-events-none">
                {Array.from({ length: 20 }).map((_, index) => (
                  <motion.div
                    key={`particle-${index}`}
                    className="absolute w-1 h-1 bg-primary-500 rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 1.5, 0],
                    }}
                    transition={{
                      duration: 2 + Math.random() * 3,
                      repeat: Infinity,
                      delay: Math.random() * 5,
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      

    </section>
  );
};

// 应用图标组件
const AppIcon = ({ index }: { index: number }) => {
  const icons = [
    '🤖', // AI助手
    '🎨', // 图像生成
    '🔍', // 搜索
    '🎬', // 视频编辑
    '📝', // 文本生成
    '🎵', // 音乐
    '💻', // 编程
    '📊', // 数据分析
    '🧠', // 机器学习
  ];
  
  return (
    <div className="w-full h-full flex items-center justify-center">
      <span className="text-2xl md:text-3xl">{icons[index]}</span>
    </div>
  );
};

export default Hero; 