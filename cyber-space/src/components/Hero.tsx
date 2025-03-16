import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen pt-24 pb-16 flex items-center cyber-grid">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <motion.div 
            className="w-full md:w-1/2 mb-12 md:mb-0"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-mono font-bold mb-6">
              <span className="block">探索</span>
              <span className="cyber-text cyber-glow text-5xl md:text-7xl">赛博空间</span>
              <span className="block mt-2">未来科技体验</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-lg">
              沉浸式数字体验，融合前沿技术与未来设计美学，打造令人惊叹的虚拟世界。
            </p>
            <div className="flex flex-wrap gap-4">
              <motion.a 
                href="#features" 
                className="cyber-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                探索特性
              </motion.a>
              <motion.a 
                href="#projects" 
                className="border border-white/30 px-6 py-3 font-mono text-sm font-bold uppercase tracking-wider hover:bg-white/10 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                查看项目
              </motion.a>
            </div>
          </motion.div>
          
          <motion.div 
            className="w-full md:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              {/* 3D模型或图像可以放在这里 */}
              <div className="aspect-square max-w-md mx-auto bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg p-1">
                <div className="w-full h-full bg-dark-light/50 backdrop-blur-sm rounded-lg flex items-center justify-center">
                  <div className="text-6xl cyber-text cyber-glow">VR</div>
                </div>
              </div>
              
              {/* 装饰元素 */}
              <div className="absolute -top-4 -left-4 w-24 h-24 border border-primary/50 rounded-lg"></div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border border-secondary/50 rounded-lg"></div>
              
              {/* 浮动元素 */}
              <motion.div 
                className="absolute top-1/4 right-0 w-12 h-12 bg-primary/20 rounded-full"
                animate={{ y: [0, 15, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              ></motion.div>
              <motion.div 
                className="absolute bottom-1/4 left-0 w-8 h-8 bg-secondary/20 rounded-full"
                animate={{ y: [0, -15, 0] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              ></motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* 滚动指示器 */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <motion.div 
            className="w-1.5 h-3 bg-primary rounded-full mt-1"
            animate={{ y: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          ></motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero; 