import React from 'react';
import { motion } from 'framer-motion';

const Features = () => {
  const features = [
    {
      icon: '🚀',
      title: '发现前沿AI应用',
      description: '浏览我们精心策划的AI应用集合，发现从创意工具到生产力提升的各种革新性产品。',
    },
    {
      icon: '🔍',
      title: '个性化推荐',
      description: '基于您的兴趣和使用习惯，我们的AI推荐系统会为您推荐最合适的应用和工具。',
    },
    {
      icon: '💬',
      title: '用户评价与见解',
      description: '查看真实用户的评价和使用体验，了解每个AI应用的优缺点，做出明智的决策。',
    },
    {
      icon: '🔄',
      title: '分享您的发现',
      description: '发现了好用的AI应用？轻松分享给社区，与其他科技爱好者交流您的见解。',
    },
    {
      icon: '🧠',
      title: 'AI技术洞察',
      description: '获取关于最新AI技术发展趋势的深度分析，了解人工智能如何影响各个行业。',
    },
    {
      icon: '👥',
      title: '构建AI社区',
      description: '加入热情的AI爱好者社区，与志同道合的创作者和用户分享想法、项目和资源。',
    },
  ];

  // 动画变量
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="explore" className="py-24 bg-dark-light relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(10,181,255,0.2),transparent_40%)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_80%,rgba(152,52,255,0.2),transparent_40%)]"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* 标题 */}
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            探索<span className="ai-text">AI空间</span>的核心功能
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            我们精心打造的平台让您轻松发现、评估和分享最新最酷的AI应用
          </motion.p>
        </div>
        
        {/* 特性网格 */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              className="ai-card flex flex-col h-full group"
              variants={item}
            >
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-6 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 group-hover:from-primary-500/30 group-hover:to-secondary-500/30 transition-all duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-primary-400 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-400 flex-grow">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
        
        {/* 行动召唤 */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <a href="#featured" className="btn-primary">
            查看精选应用
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Features; 