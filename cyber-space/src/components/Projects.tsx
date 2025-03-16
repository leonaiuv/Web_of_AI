import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  tags: string[];
}

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  
  const projects: Project[] = [
    {
      id: 1,
      title: "虚拟现实城市探索",
      category: "vr",
      image: "https://images.unsplash.com/photo-1626379953822-baec19c3accd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      description: "沉浸式虚拟城市体验，用户可以自由探索未来城市的各个角落。",
      tags: ["VR", "3D建模", "交互设计"]
    },
    {
      id: 2,
      title: "AI驱动的数据可视化",
      category: "ai",
      image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      description: "利用人工智能技术，将复杂数据转化为直观、动态的可视化展示。",
      tags: ["AI", "数据分析", "可视化"]
    },
    {
      id: 3,
      title: "增强现实游戏体验",
      category: "ar",
      image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      description: "将虚拟游戏元素融入现实环境，创造全新的互动娱乐体验。",
      tags: ["AR", "游戏设计", "互动体验"]
    },
    {
      id: 4,
      title: "智能家居控制系统",
      category: "ai",
      image: "https://images.unsplash.com/photo-1558002038-1055e2dae1d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      description: "基于AI的智能家居控制平台，实现家居设备的智能化管理和自动化控制。",
      tags: ["IoT", "AI", "智能家居"]
    },
    {
      id: 5,
      title: "虚拟演唱会平台",
      category: "vr",
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      description: "在虚拟空间中举办的沉浸式音乐会体验，突破物理限制的全新音乐享受方式。",
      tags: ["VR", "音频处理", "实时渲染"]
    },
    {
      id: 6,
      title: "AR导航系统",
      category: "ar",
      image: "https://images.unsplash.com/photo-1567095761054-7a02e69e5c43?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      description: "增强现实导航系统，通过叠加虚拟信息，提供直观、精确的导航体验。",
      tags: ["AR", "地理信息", "用户体验"]
    }
  ];

  const categories = [
    { id: 'all', name: '全部' },
    { id: 'vr', name: 'VR体验' },
    { id: 'ar', name: 'AR应用' },
    { id: 'ai', name: 'AI项目' }
  ];

  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  return (
    <section id="projects" className="py-20 bg-dark-light/30">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-mono font-bold mb-4">
            <span className="cyber-text">创新</span> 项目
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            探索我们的前沿技术项目，体验未来科技的无限可能
          </p>
        </motion.div>

        {/* 分类过滤器 */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(category => (
            <button
              key={category.id}
              className={`px-6 py-2 font-mono text-sm tracking-wider transition-all duration-300 ${
                activeCategory === category.id 
                  ? 'bg-primary/20 border border-primary text-primary' 
                  : 'border border-white/20 hover:border-white/40'
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* 项目网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className="cyber-card overflow-hidden group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="relative overflow-hidden aspect-video">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent opacity-60"></div>
                <div className="absolute bottom-0 left-0 p-4">
                  <div className="flex gap-2 mb-2">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="text-xs px-2 py-1 bg-primary/20 text-primary rounded-sm font-mono">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl font-bold">{project.title}</h3>
                </div>
              </div>
              <div className="p-4">
                <p className="text-gray-400">{project.description}</p>
                <div className="mt-4 flex justify-end">
                  <a href="#" className="text-primary font-mono text-sm hover:underline">了解更多 →</a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects; 