import React from 'react';
import { motion } from 'framer-motion';

const ecosystemData = [
  {
    id: 1,
    title: '森林系统',
    description: '高效碳捕获森林技术，智能树种组合最大化生物多样性，形成自我维持的生态平衡。',
    icon: '🌳',
    color: 'from-primary/20 to-primary/5',
  },
  {
    id: 2,
    title: '水资源循环',
    description: '先进净水系统与自然过滤相结合，确保水资源高效循环利用，零污染排放。',
    icon: '💧',
    color: 'from-secondary/20 to-secondary/5',
  },
  {
    id: 3,
    title: '可再生能源',
    description: '集成太阳能、风能和生物质能系统，提供稳定清洁能源，支持整个生态运行。',
    icon: '☀️',
    color: 'from-tertiary/20 to-tertiary/5',
  },
  {
    id: 4,
    title: '智能农业',
    description: '垂直农场与传统农业相结合，使用AI优化种植条件，实现全年高产低耗种植。',
    icon: '🌾',
    color: 'from-earth-brown/20 to-earth-brown/5',
  },
];

const Ecosystem = () => {
  return (
    <section id="ecosystem" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-mono font-bold mb-4">
            <span className="earth-text earth-glow">生态系统</span> 平衡
          </h2>
          <p className="max-w-2xl mx-auto text-gray-300">
            我们的超级地球采用先进的生态系统设计，实现自我维持的生态平衡，将人类活动与自然环境和谐结合。
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {ecosystemData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="earth-card p-6 h-full"
            >
              <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center text-3xl mb-4`}>
                {item.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-gray-300">{item.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-20 earth-card p-8"
        >
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 mb-6 md:mb-0 md:pr-8">
              <h3 className="text-2xl font-bold mb-4 earth-text">整合生态循环</h3>
              <p className="text-gray-300 mb-4">
                超级地球的生态系统设计理念源于自然界的循环原理，将不同生态要素有机整合，形成一个自我修复、高效运转的生态网络。
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>废物回收转化为资源，零浪费系统</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>生物多样性保护与修复机制</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>气候调节与环境稳定技术</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>自然与人工系统和谐共存</span>
                </li>
              </ul>
            </div>
            <div className="w-full md:w-1/2">
              <div className="relative aspect-video bg-dark-light/50 rounded-lg overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* 这里可以放置生态循环示意图或动画 */}
                  <div className="w-4/5 h-4/5 relative">
                    {/* 循环图示例 - 简化版 */}
                    <div className="absolute w-32 h-32 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/30"></div>
                    <div className="absolute w-48 h-48 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-secondary/20"></div>
                    <div className="absolute w-64 h-64 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-tertiary/10"></div>
                    
                    {/* 循环节点 */}
                    <motion.div 
                      className="absolute top-1/4 left-1/2 w-8 h-8 bg-primary/30 rounded-full flex items-center justify-center text-xs"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >植物</motion.div>
                    <motion.div 
                      className="absolute top-1/2 right-1/4 w-8 h-8 bg-secondary/30 rounded-full flex items-center justify-center text-xs"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    >水源</motion.div>
                    <motion.div 
                      className="absolute bottom-1/4 left-1/2 w-8 h-8 bg-tertiary/30 rounded-full flex items-center justify-center text-xs"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    >能源</motion.div>
                    <motion.div 
                      className="absolute top-1/2 left-1/4 w-8 h-8 bg-earth-brown/30 rounded-full flex items-center justify-center text-xs"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
                    >土壤</motion.div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 背景装饰 */}
      <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-secondary/5 rounded-full blur-3xl"></div>
    </section>
  );
};

export default Ecosystem; 