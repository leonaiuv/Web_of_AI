import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  client: string;
  year: string;
  link?: string;
}

const Portfolio: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const projects: Project[] = [
    {
      id: 1,
      title: '未来科技品牌网站',
      category: '网站设计',
      description: '为领先的科技公司设计的现代化网站，融合了3D元素和流畅的动画效果，展现品牌的创新精神。',
      imageUrl: '/images/portfolio/project-1.jpg',
      client: 'FutureTech科技有限公司',
      year: '2023',
      link: 'https://example.com/project1',
    },
    {
      id: 2,
      title: '沉浸式数字展览',
      category: '互动装置',
      description: '为艺术博物馆打造的沉浸式数字体验，通过互动投影和声音装置，让观众与艺术作品产生深度互动。',
      imageUrl: '/images/portfolio/project-2.jpg',
      client: '国家艺术博物馆',
      year: '2023',
    },
    {
      id: 3,
      title: '新视界移动应用',
      category: '应用开发',
      description: '一款结合AR技术的移动应用，为用户提供全新的购物体验，可虚拟试用产品。',
      imageUrl: '/images/portfolio/project-3.jpg',
      client: '新视界零售集团',
      year: '2022',
      link: 'https://example.com/project3',
    },
    {
      id: 4,
      title: '音乐可视化互动装置',
      category: '互动装置',
      description: '为音乐节创作的互动装置，将音乐转化为视觉效果，创造出独特的感官体验。',
      imageUrl: '/images/portfolio/project-4.jpg',
      client: '星光音乐节',
      year: '2022',
    },
    {
      id: 5,
      title: '电子商务平台改版',
      category: '网站设计',
      description: '为大型电子商务平台进行全面改版，优化用户体验并提升转化率。',
      imageUrl: '/images/portfolio/project-5.jpg',
      client: '环球购物',
      year: '2021',
      link: 'https://example.com/project5',
    },
    {
      id: 6,
      title: '元宇宙社交空间',
      category: '3D体验',
      description: '基于WebGL的3D社交空间，用户可以创建个性化虚拟形象并在虚拟世界中互动。',
      imageUrl: '/images/portfolio/project-6.jpg',
      client: 'MetaConnect',
      year: '2023',
    },
  ];

  const categories = ['all', '网站设计', '互动装置', '应用开发', '3D体验'];

  const filteredProjects = projects.filter(project => 
    selectedCategory === 'all' ? true : project.category === selectedCategory
  );

  const staggerContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const projectVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section id="portfolio" className="py-20 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-primary/10 to-transparent opacity-30"></div>
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">作品展示</h2>
          <p className="text-lg text-white/70 max-w-3xl mx-auto">
            探索我们的精选案例，每个项目都展示了我们如何将创意与技术相结合，创造令人难忘的数字体验。
          </p>
        </motion.div>

        {/* 类别过滤 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-lg'
                  : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
              }`}
            >
              {category === 'all' ? '全部' : category}
            </button>
          ))}
        </motion.div>

        {/* 项目展示网格 */}
        <motion.div
          ref={ref}
          variants={staggerContainerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={projectVariants}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              onClick={() => setSelectedProject(project)}
              className="rounded-xl overflow-hidden relative group cursor-pointer h-80"
            >
              {/* 项目图片 */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-primary/90 z-10"></div>
              <div 
                className="w-full h-full bg-gradient-to-br from-purple-900 to-blue-900 overflow-hidden"
              >
                {project.imageUrl ? (
                  <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      // 如果图片加载失败，显示渐变背景
                      const target = e.target as HTMLElement;
                      target.style.display = 'none';
                    }} 
                  />
                ) : null}
              </div>
              
              {/* 项目信息 - 始终显示标题和类别 */}
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20 transform transition-transform duration-500">
                <h3 className="text-xl font-bold text-white mb-1">{project.title}</h3>
                <p className="text-purple-300 text-sm">{project.category}</p>
              </div>
              
              {/* 完整项目信息 - 悬停时显示 */}
              <motion.div 
                className="absolute inset-0 p-6 flex flex-col justify-center items-center text-center bg-gradient-to-b from-purple-900/90 to-blue-900/90 z-30"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: hoveredProject === project.id ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-purple-300 text-sm mb-4">{project.category}</p>
                <p className="text-white/80 mb-4 line-clamp-3">{project.description}</p>
                <button 
                  className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm hover:bg-white/20 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedProject(project);
                  }}
                >
                  查看详情
                </button>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* 如果没有项目匹配当前类别 */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-white/70">当前类别下暂无项目</p>
          </div>
        )}
        
        {/* 项目详情模态窗口 */}
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6"
          >
            <div 
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setSelectedProject(null)}
            ></div>
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="bg-gradient-to-br from-gray-900 to-primary/90 rounded-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] relative z-10"
            >
              <div className="h-64 md:h-80 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/80 z-10"></div>
                {selectedProject.imageUrl ? (
                  <img 
                    src={selectedProject.imageUrl} 
                    alt={selectedProject.title} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-purple-900 to-blue-900"></div>
                )}
                
                <button 
                  className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/50 transition-colors"
                  onClick={() => setSelectedProject(null)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="p-6 md:p-8 overflow-y-auto max-h-[calc(90vh-20rem)]">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{selectedProject.title}</h2>
                <p className="text-purple-300 mb-6">{selectedProject.category}</p>
                
                <p className="text-white/80 mb-8">{selectedProject.description}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div>
                    <h4 className="text-sm text-white/50 mb-1">客户</h4>
                    <p className="text-white">{selectedProject.client}</p>
                  </div>
                  <div>
                    <h4 className="text-sm text-white/50 mb-1">年份</h4>
                    <p className="text-white">{selectedProject.year}</p>
                  </div>
                </div>
                
                {selectedProject.link && (
                  <a 
                    href={selectedProject.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg font-medium text-white hover:shadow-lg transition-shadow"
                  >
                    访问项目
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
        
        {/* 联系按钮 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 text-center"
        >
          <h3 className="text-2xl font-bold mb-6 text-white">有项目想法？</h3>
          <p className="text-white/70 max-w-2xl mx-auto mb-8">
            我们期待与您合作，将您的创意变为现实。无论是品牌网站、互动装置还是移动应用，我们都能为您提供创新的解决方案。
          </p>
          <a 
            href="#contact" 
            className="inline-block px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg font-medium text-white hover:shadow-lg transition-shadow"
          >
            联系我们
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio; 