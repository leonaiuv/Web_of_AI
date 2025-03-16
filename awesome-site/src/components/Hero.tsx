import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden">
      {/* 背景渐变效果 */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] opacity-60" />
      
      {/* 散射光线效果 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(ellipse_at_center,_rgba(124,58,237,0.2)_0%,_rgba(0,0,0,0)_70%)]" />
      </div>
      
      {/* 主要内容 */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* 文字部分 */}
          <motion.div 
            className="w-full md:w-1/2 text-center md:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ 
              duration: 0.8,
              delay: 0.2,
              ease: [0.16, 1, 0.3, 1] 
            }}
          >
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
              <span className="gradient-text">李沐的AI空间</span>
              <br />
              <span className="text-white">探索和普及AI应用</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-lg">
              AI一定能重构世界！收藏这个页面！一起探索AI！
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
              <motion.button
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-medium rounded-lg hover:shadow-lg hover-effect"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                AI 导航
              </motion.button>
              
              <motion.button
                className="px-8 py-3 bg-transparent border-2 border-white text-white font-medium rounded-lg hover:bg-white hover:text-purple-600 hover-effect"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                开源项目
              </motion.button>
            </div>
          </motion.div>
          
          {/* 图片/3D效果部分 */}
          <motion.div 
            className="w-full md:w-1/2 mt-12 md:mt-0 relative"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {/* 主要图像 */}
            <motion.div
              className="relative mx-auto w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96"
              animate={{ 
                y: [0, -20, 0],
                rotateZ: [0, 5, 0]
              }}
              transition={{ 
                duration: 6,
                repeat: Infinity,
                repeatType: 'reverse'
              }}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-600 to-blue-400 opacity-20 blur-2xl" />
              
              <div className="absolute inset-0 glass-morphism rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-blue-500/30" />
                <div className="absolute inset-0 backdrop-blur-sm" />
                
                <div className="relative h-full w-full p-6 flex flex-col items-center justify-center">
                  <motion.div
                    className="w-24 h-24 mb-4 rounded-full bg-white/10 flex items-center justify-center" 
                    /* animate={{ rotate: 360 }}  移除头像旋转*/
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }} 
                  >
                    <img 
                  src="/images/heroimg/webtouxiang.jpg" // 图片路径，建议存放在public目录下
                  alt="个人头像"
                  className="w-full h-full object-cover rounded-full"
                  width={96}
                  height={96}
                />
                  </motion.div>
                  
                  <h3 className="text-xl font-bold text-white mb-2">我是李沐</h3>
                  <p className="text-sm text-center text-white/70">和我一起探索人机协作新范式</p>
                  
                  {/* 装饰线条 */}
                  <div className="absolute bottom-6 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                </div>
              </div>
            </motion.div>
            
            {/* 装饰元素 - 圆圈 */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-white/10"
                style={{
                  width: `${20 + i * 10}px`,
                  height: `${20 + i * 10}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 3 + i,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
              />
            ))}
          </motion.div>
        </div>
        
        {/* 向下滚动指示 */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="w-8 h-12 rounded-full border-2 border-white/30 flex justify-center pt-2">
            <motion.div 
              className="w-1 h-3 bg-white rounded-full"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero; 