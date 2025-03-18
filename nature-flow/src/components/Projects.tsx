import React, { useState } from 'react';
import { motion } from 'framer-motion';

// 项目卡片组件属性接口
interface ProjectCardProps {
  image: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  index: number;
}

// 单个项目卡片组件
const ProjectCard: React.FC<ProjectCardProps> = ({ image, title, category, description, tags, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div 
      className="nature-card group relative overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* 项目图片 */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <div 
          className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
          style={{ backgroundImage: `url(${image})` }}
        />
        
        {/* 悬浮时展示的描述 */}
        <motion.div 
          className="absolute inset-0 bg-primary/80 backdrop-blur-sm flex flex-col justify-center p-6 text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <p className="mb-4">{description}</p>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, idx) => (
              <span 
                key={idx} 
                className="text-xs px-2 py-1 bg-white/20 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
      
      {/* 项目信息 */}
      <div className="p-6">
        <div className="text-sm font-medium text-primary mb-2">{category}</div>
        <h3 className="text-xl font-display font-bold mb-2">{title}</h3>
      </div>
    </motion.div>
  );
};

// 项目数据接口
interface Project {
  image: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
}

const Projects = () => {
  // 项目数据
  const projects: Project[] = [
    {
      image: "https://images.unsplash.com/photo-1542281286-9e0a16bb7366",
      title: "有机形态设计系统",
      category: "设计系统",
      description: "将自然界的有机形态融入现代设计系统，创造和谐流畅的用户界面组件库。",
      tags: ["UI设计", "系统设计", "组件库"]
    },
    {
      image: "https://images.unsplash.com/photo-1557804506-669a67965ba0",
      title: "流水动效交互平台",
      category: "交互设计",
      description: "以水的流动为灵感，打造富有韵律感的交互动效，提升用户体验的流畅度。",
      tags: ["动效设计", "交互", "前端开发"]
    },
    {
      image: "https://images.unsplash.com/photo-1550305080-4e029753abcf",
      title: "自然声音可视化",
      category: "音频可视化",
      description: "将自然界的声音转化为动态视觉效果，创造沉浸式的声音体验。",
      tags: ["可视化", "音频处理", "WebGL"]
    },
    {
      image: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d",
      title: "生态系统数据展示",
      category: "数据可视化",
      description: "通过自然形态的数据可视化，直观展示生态系统的复杂关系和变化。",
      tags: ["数据可视化", "环保", "交互式"]
    }
  ];

  return (
    <section id="projects" className="py-20 bg-slate-50 leaf-pattern">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            精选<span className="nature-text">作品案例</span>
          </h2>
          <p className="text-dark-light max-w-2xl mx-auto">
            我们将理念付诸实践，每一个项目都融入了自然流动的设计理念和精湛工艺。
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {projects.map((project, index) => (
            <ProjectCard 
              key={index}
              image={project.image}
              title={project.title}
              category={project.category}
              description={project.description}
              tags={project.tags}
              index={index}
            />
          ))}
        </div>
        
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <a href="#contact" className="nature-btn">
            开始您的项目
          </a>
        </motion.div>
      </div>
      
      {/* 装饰性波浪背景 */}
      <div className="absolute left-0 right-0 h-20 -bottom-10 overflow-hidden">
        <svg viewBox="0 0 1200 120" className="absolute w-full h-20 left-0 bottom-0 fill-white">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default Projects; 