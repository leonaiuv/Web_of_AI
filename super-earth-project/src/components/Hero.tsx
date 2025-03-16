import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen pt-24 pb-16 flex items-center earth-grid">
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
              <span className="earth-text earth-glow text-5xl md:text-7xl">超级地球</span>
              <span className="block mt-2">可持续生态星球</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-lg">
              体验未来绿色科技与自然和谐共生的奇迹世界，探索可再生能源与生态系统的完美平衡。
            </p>
            <div className="flex flex-wrap gap-4">
              <motion.a 
                href="#features" 
                className="earth-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                探索生态系统
              </motion.a>
              <motion.a 
                href="#projects" 
                className="border border-white/30 px-6 py-3 font-mono text-sm font-bold uppercase tracking-wider hover:bg-white/10 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                可持续项目
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
              {/* 3D地球模型位置 */}
              <div className="globe-container aspect-square max-w-md mx-auto">
                <div className="w-full h-full bg-gradient-radial from-primary/10 to-dark-light/20 rounded-full p-1 shadow-earth-glow">
                  <div className="w-full h-full rounded-full overflow-hidden rotating-element">
                    <div className="relative w-full h-full bg-gradient-to-br from-primary/30 to-secondary/30 rounded-full flex items-center justify-center">
                      <div className="absolute inset-2 rounded-full bg-dark-light/80"></div>
                      <div className="absolute inset-0 w-full h-full">
                        {/* 地球表面图案 */}
                        <div className="absolute top-[15%] left-[25%] w-8 h-8 bg-earth-brown/40 rounded-full blur-sm"></div>
                        <div className="absolute top-[35%] right-[20%] w-12 h-6 bg-primary/30 rounded-full blur-sm"></div>
                        <div className="absolute bottom-[30%] left-[30%] w-10 h-10 bg-secondary/30 rounded-full blur-sm"></div>
                        <div className="absolute top-[60%] right-[25%] w-6 h-10 bg-tertiary/20 rounded-full blur-sm"></div>
                        
                        {/* 云层效果 */}
                        <div className="absolute top-[10%] left-[10%] w-16 h-3 bg-cloud-white/10 rounded-full blur-sm"></div>
                        <div className="absolute bottom-[20%] right-[15%] w-12 h-2 bg-cloud-white/10 rounded-full blur-sm"></div>
                      </div>
                      <div className="text-5xl earth-text earth-glow z-10">地球</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* 装饰元素 */}
              <div className="absolute -top-4 -left-4 w-24 h-24 border border-primary/30 rounded-lg"></div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border border-secondary/30 rounded-lg"></div>
              
              {/* 浮动元素 */}
              <motion.div 
                className="absolute top-1/4 right-0 w-12 h-12 bg-primary/20 rounded-full floating-element"
                animate={{ y: [0, 15, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              ></motion.div>
              <motion.div 
                className="absolute bottom-1/4 left-0 w-8 h-8 bg-secondary/20 rounded-full floating-element"
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