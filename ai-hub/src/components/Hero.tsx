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
                探索<span className="ai-text ai-glow">AI应用</span>的无限可能
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
      
      {/* 装饰性波浪底部 */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="w-full h-12 md:h-20 text-dark-light"
        >
          <path 
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
            opacity=".25" 
            fill="currentColor"
          />
          <path 
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" 
            opacity=".5" 
            fill="currentColor"
          />
          <path 
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" 
            fill="currentColor"
          />
        </svg>
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