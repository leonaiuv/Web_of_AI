import React from 'react';
import { motion } from 'framer-motion';

const technologyData = [
  {
    id: 1,
    title: '气候修复系统',
    description: '结合大气碳捕获技术与生物反馈系统，主动调节全球气候，减少极端天气事件发生。',
    imagePath: '/images/climate-tech.jpg', // 实际项目中需添加相应图片
  },
  {
    id: 2,
    title: '自主清洁机器人',
    description: '基于AI的环境监测与自主清洁机器人系统，持续清理环境污染物并回收有价值资源。',
    imagePath: '/images/robot-tech.jpg',
  },
  {
    id: 3,
    title: '智能能源网络',
    description: '分布式可再生能源与高效储能技术相结合，实现能源生产与消费的智能化管理。',
    imagePath: '/images/energy-tech.jpg',
  },
];

const Technology = () => {
  return (
    <section id="technology" className="py-20 relative overflow-hidden earth-grid">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-mono font-bold mb-4">
            绿色 <span className="earth-text earth-glow">科技</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-300">
            我们的超级地球融合前沿科技与生态智慧，打造可持续发展的新范式，为未来世界提供解决方案。
          </p>
        </motion.div>

        {/* 技术展示 */}
        <div className="space-y-24">
          {technologyData.map((tech, index) => (
            <motion.div 
              key={tech.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8`}
            >
              <div className="w-full md:w-1/2">
                <div className="earth-card p-1 overflow-hidden">
                  <div className="aspect-video bg-dark-light flex items-center justify-center overflow-hidden">
                    {/* 实际项目中这里应该是图片 */}
                    <div className="w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                      <span className="text-5xl earth-text earth-glow">{tech.title.charAt(0)}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="w-full md:w-1/2">
                <h3 className="text-2xl font-bold mb-4 earth-text">{tech.title}</h3>
                <p className="text-gray-300 mb-6">{tech.description}</p>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-12 h-1 bg-primary mr-4"></div>
                    <span className="text-sm text-gray-400">前沿技术应用</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-12 h-1 bg-secondary mr-4"></div>
                    <span className="text-sm text-gray-400">环境友好设计</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-12 h-1 bg-tertiary mr-4"></div>
                    <span className="text-sm text-gray-400">可持续发展目标</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 科技创新中心 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-32"
        >
          <div className="earth-card p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-6 earth-text">创新研发中心</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <span className="text-2xl">🧪</span>
                  </div>
                  <h4 className="text-lg font-bold">材料科学</h4>
                  <p className="text-gray-300 text-sm">开发生物降解材料与自愈合智能材料，替代传统塑料，减少环境污染。</p>
                </div>
                
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-secondary/20 to-secondary/5 flex items-center justify-center">
                    <span className="text-2xl">🤖</span>
                  </div>
                  <h4 className="text-lg font-bold">AI生态管理</h4>
                  <p className="text-gray-300 text-sm">人工智能监测与管理生态系统，预测环境变化并自动调整资源分配。</p>
                </div>
                
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-tertiary/20 to-tertiary/5 flex items-center justify-center">
                    <span className="text-2xl">🔋</span>
                  </div>
                  <h4 className="text-lg font-bold">零碳能源</h4>
                  <p className="text-gray-300 text-sm">突破性能源技术研发，提高可再生能源效率，实现完全零碳排放。</p>
                </div>
              </div>
              
              <div className="mt-8 pt-8 border-t border-white/10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <p className="text-gray-300">加入我们的技术研发团队，共同探索地球可持续发展的未来。</p>
                  <motion.a 
                    href="#contact" 
                    className="earth-btn inline-block"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    技术合作
                  </motion.a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 背景装饰 */}
      <div className="absolute top-1/4 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl"></div>
    </section>
  );
};

export default Technology; 