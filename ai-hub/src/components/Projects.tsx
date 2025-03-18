import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Projects = () => {
  // 分类标签
  const categories = [
    '全部', '生成式AI', '图像处理', '自然语言', '语音助手', '数据分析', '开发工具'
  ];
  
  const [activeCategory, setActiveCategory] = useState('全部');
  
  // AI应用数据
  const projects = [
    {
      id: 1,
      title: 'AI智能写作助手',
      description: '基于先进大型语言模型的文本生成工具，帮助用户撰写各类内容，从创意写作到专业文档。',
      image: 'https://images.unsplash.com/photo-1526378800651-c32d170fe6f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      category: '生成式AI',
      rating: 4.8,
      users: '38K+',
    },
    {
      id: 2,
      title: '智能图像生成器',
      description: '通过描述即可生成高质量艺术作品和逼真图像，为创意人员提供无限灵感。',
      image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      category: '图像处理',
      rating: 4.9,
      users: '42K+',
    },
    {
      id: 3,
      title: '智能对话机器人',
      description: '提供自然流畅的对话体验，可以回答问题、提供建议，甚至进行深度的讨论。',
      image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      category: '自然语言',
      rating: 4.7,
      users: '29K+',
    },
    {
      id: 4,
      title: '语音识别助手',
      description: '精准捕捉并转录语音内容，支持多种语言，适用于会议记录和语音笔记。',
      image: 'https://images.unsplash.com/photo-1556196148-1fb724238998?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      category: '语音助手',
      rating: 4.6,
      users: '15K+',
    },
    {
      id: 5,
      title: '数据可视化平台',
      description: '将复杂数据转化为直观视觉图表，帮助用户快速理解和分析数据趋势。',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      category: '数据分析',
      rating: 4.5,
      users: '17K+',
    },
    {
      id: 6,
      title: 'AI代码助手',
      description: '智能代码补全和生成工具，提升开发效率，减少编程错误。',
      image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      category: '开发工具',
      rating: 4.9,
      users: '32K+',
    }
  ];
  
  // 根据当前选中的分类筛选项目
  const filteredProjects = activeCategory === '全部' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);
  
  // 动画变量
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="featured" className="py-24 bg-dark relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute top-40 left-0 w-72 h-72 bg-primary-500/10 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-20 right-0 w-80 h-80 bg-secondary-500/10 rounded-full filter blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* 标题 */}
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            精选<span className="ai-text">AI应用</span>
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            探索我们精心挑选的顶级AI应用，提升您的工作与生活效率
          </motion.p>
        </div>
        
        {/* 分类过滤器 */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category 
                  ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg shadow-primary-500/20'
                  : 'bg-dark-light text-gray-400 hover:text-white'
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* 项目网格 */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} variants={itemVariants} />
          ))}
        </motion.div>
        
        {/* 查看更多按钮 */}
        <div className="mt-16 text-center">
          <a href="#" className="btn-outline">
            查看更多应用
          </a>
        </div>
      </div>
    </section>
  );
};

// 项目卡片组件
const ProjectCard = ({ project, variants }) => {
  return (
    <motion.div 
      className="ai-card group cursor-pointer overflow-hidden"
      variants={variants}
      whileHover={{ y: -5 }}
    >
      <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
        <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent z-10"></div>
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-3 right-3 z-20 bg-dark-light bg-opacity-80 rounded-full px-3 py-1 text-sm">
          <span className="flex items-center">
            <span className="text-yellow-400 mr-1">★</span>
            {project.rating}
          </span>
        </div>
        <div className="absolute bottom-3 left-3 z-20 bg-primary-500 bg-opacity-90 rounded-full px-3 py-1 text-xs font-medium">
          {project.category}
        </div>
      </div>
      
      <h3 className="text-xl font-bold mb-2 group-hover:text-primary-400 transition-colors">
        {project.title}
      </h3>
      
      <p className="text-gray-400 text-sm mb-4">
        {project.description}
      </p>
      
      <div className="flex justify-between items-center mt-auto pt-3 border-t border-gray-800">
        <span className="text-sm text-gray-500">{project.users} 用户</span>
        <button className="text-primary-400 hover:text-primary-300 text-sm font-medium transition-colors">
          了解更多 →
        </button>
      </div>
    </motion.div>
  );
};

export default Projects; 