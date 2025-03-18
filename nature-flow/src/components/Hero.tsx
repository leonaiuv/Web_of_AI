import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

const Hero = () => {
  const leafRef = useRef<HTMLDivElement>(null);
  
  // 使用GSAP创建叶子飘动动画
  useEffect(() => {
    if (leafRef.current) {
      const leaves = leafRef.current.querySelectorAll('.leaf');
      
      gsap.fromTo(
        leaves,
        {
          y: -20,
          rotation: 0,
          opacity: 0,
        },
        {
          y: 0,
          rotation: () => Math.random() * 10 - 5,
          opacity: 1,
          duration: 1.5,
          stagger: 0.1,
          ease: 'power3.out',
        }
      );
      
      // 创建随机飘动效果
      leaves.forEach((leaf) => {
        gsap.to(leaf, {
          y: () => Math.random() * 20 - 10,
          x: () => Math.random() * 20 - 10,
          rotation: () => Math.random() * 20 - 10,
          duration: () => 2 + Math.random() * 3,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });
    }
  }, []);

  return (
    <section id="home" className="relative min-h-screen pt-24 pb-16 flex items-center nature-grid overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <motion.div 
            className="w-full md:w-1/2 mb-12 md:mb-0"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
              <span className="block">体验</span>
              <span className="nature-text nature-glow text-5xl md:text-7xl">自然流动</span>
              <span className="block mt-2">沉浸式设计</span>
            </h1>
            <p className="text-lg md:text-xl text-dark-light mb-8 max-w-lg">
              融合有机元素与现代科技，创造生机盎然的数字体验，让灵感如自然般流动。
            </p>
            <div className="flex flex-wrap gap-4">
              <motion.a 
                href="#features" 
                className="nature-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                探索特性
              </motion.a>
              <motion.a 
                href="#projects" 
                className="px-6 py-3 border border-primary/30 rounded-full font-display text-sm font-bold uppercase tracking-wider text-primary hover:bg-primary/5 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                查看项目
              </motion.a>
            </div>
          </motion.div>
          
          <motion.div 
            className="w-full md:w-1/2 relative"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative max-w-md mx-auto">
              {/* 主要图形 */}
              <div className="relative z-10 aspect-square bg-gradient-to-br from-nature-sky via-secondary to-primary/30 rounded-full p-1">
                <div className="w-full h-full bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center overflow-hidden">
                  {/* 中心元素 */}
                  <div className="relative w-3/4 h-3/4">
                    <svg viewBox="0 0 200 200" className="w-full h-full fill-primary/20">
                      <path d="M47.7,-59.7C62.3,-47.4,75.2,-32.5,79.6,-15.3C83.9,1.9,79.8,21.5,69.4,35.7C59,49.9,42.2,58.8,25.2,64.5C8.1,70.1,-9.1,72.6,-25.7,68.3C-42.3,64,-58.2,52.9,-67.1,37.8C-76,22.7,-77.8,3.5,-73.1,-13.2C-68.5,-29.9,-57.3,-44.2,-43.6,-56.7C-29.9,-69.1,-14.9,-79.7,1.3,-81.3C17.6,-82.9,33.1,-72,47.7,-59.7Z" transform="translate(100 100)" />
                    </svg>
                    
                    {/* 叶子元素 */}
                    <div ref={leafRef} className="absolute inset-0 flex items-center justify-center">
                      {[...Array(6)].map((_, i) => (
                        <div
                          key={i}
                          className="leaf absolute"
                          style={{
                            top: `${20 + Math.random() * 60}%`,
                            left: `${20 + Math.random() * 60}%`,
                            transform: `rotate(${Math.random() * 360}deg)`,
                          }}
                        >
                          <svg className="w-8 h-8 text-primary" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" />
                          </svg>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* 装饰元素 */}
              <div className="absolute -top-4 -left-4 w-24 h-24 border border-primary/30 rounded-xl animate-float"></div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border border-secondary/30 rounded-xl animate-float" style={{ animationDelay: '1s' }}></div>
              
              {/* 波浪元素 */}
              <motion.div 
                className="absolute top-1/4 right-0 w-12 h-12 bg-secondary/10 rounded-full"
                animate={{ y: [0, 15, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              ></motion.div>
              <motion.div 
                className="absolute bottom-1/4 left-0 w-8 h-8 bg-primary/10 rounded-full"
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
        <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center">
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