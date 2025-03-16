import React, { useState } from 'react';
import { motion } from 'framer-motion';

// 项目数据
const projectsData = [
  {
    id: 1,
    title: '海洋净化系统',
    category: '水资源',
    description: '大规模海洋垃圾收集与回收利用系统，结合生物修复技术恢复海洋生态。',
    impact: ['清理海洋塑料垃圾', '恢复珊瑚礁生态系统', '改善沿海社区生活质量'],
    status: '进行中',
    color: 'from-secondary/20 to-secondary/5',
    icon: '🌊',
  },
  {
    id: 2,
    title: '垂直森林城市',
    category: '建筑生态',
    description: '将自然植被集成到城市建筑中，创造碳吸收中心，改善城市空气质量和生物多样性。',
    impact: ['增加城市绿化面积', '减少城市热岛效应', '提供野生动物栖息地'],
    status: '已完成',
    color: 'from-primary/20 to-primary/5',
    icon: '🏙️',
  },
  {
    id: 3,
    title: '沙漠绿化工程',
    category: '生态修复',
    description: '使用创新灌溉技术和耐旱植物种植法，将荒漠转变为可持续农田和林地。',
    impact: ['防止沙漠扩张', '创造农业生产基地', '改善区域气候条件'],
    status: '规划中',
    color: 'from-earth-brown/20 to-earth-brown/5',
    icon: '🏜️',
  },
  {
    id: 4,
    title: '智能能源社区',
    category: '能源系统',
    description: '基于微电网的自给自足社区，集成太阳能、风能和储能系统，实现能源自主。',
    impact: ['零碳排放生活', '能源独立与安全', '降低居民能源成本'],
    status: '示范阶段',
    color: 'from-tertiary/20 to-tertiary/5',
    icon: '⚡',
  },
  {
    id: 5,
    title: '生物多样性保护区',
    category: '生物保护',
    description: '建立受保护的自然栖息地网络，结合监测技术和社区参与，保护濒危物种。',
    impact: ['保护濒危物种', '维持生态系统平衡', '促进生态旅游发展'],
    status: '进行中',
    color: 'from-primary/20 to-primary/5',
    icon: '🦋',
  },
  {
    id: 6,
    title: '循环经济产业园',
    category: '资源利用',
    description: '集中各类回收和再制造设施，将废弃物转化为新产品，实现零废弃物排放。',
    impact: ['减少垃圾填埋', '创造绿色就业机会', '节约原材料资源'],
    status: '建设中',
    color: 'from-secondary/20 to-secondary/5',
    icon: '♻️',
  },
];

// 项目类别
const categories = ['全部', '水资源', '建筑生态', '生态修复', '能源系统', '生物保护', '资源利用'];

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('全部');
  const [expandedProject, setExpandedProject] = useState<number | null>(null);

  // 根据选择的类别筛选项目
  const filteredProjects = activeCategory === '全部' 
    ? projectsData 
    : projectsData.filter(project => project.category === activeCategory);

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-mono font-bold mb-4">
            可持续 <span className="earth-text earth-glow">项目</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-300">
            超级地球已启动多个创新项目，致力于恢复生态平衡、应对环境挑战并创造可持续发展示范。
          </p>
        </motion.div>

        {/* 类别筛选 */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(category => (
            <motion.button
              key={category}
              className={`px-4 py-2 rounded-full text-sm ${
                activeCategory === category 
                  ? 'bg-primary text-white' 
                  : 'bg-dark-light text-gray-300 hover:bg-dark-light/80'
              }`}
              onClick={() => setActiveCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* 项目网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="earth-card overflow-hidden"
              onClick={() => setExpandedProject(expandedProject === project.id ? null : project.id)}
            >
              <div className={`h-20 bg-gradient-to-r ${project.color} p-4 flex items-center justify-between cursor-pointer`}>
                <div className="flex items-center">
                  <span className="text-3xl mr-3">{project.icon}</span>
                  <h3 className="text-xl font-bold">{project.title}</h3>
                </div>
                <span className="text-xs px-2 py-1 bg-white/10 rounded-full">{project.status}</span>
              </div>
              
              <div className="p-4">
                <div className="text-xs text-gray-400 mb-2">{project.category}</div>
                <p className="text-gray-300">{project.description}</p>
                
                <motion.div 
                  className="mt-4 overflow-hidden"
                  initial={{ height: 0 }}
                  animate={{ height: expandedProject === project.id ? 'auto' : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="pt-4 border-t border-white/10">
                    <h4 className="font-bold mb-2">影响与成果</h4>
                    <ul className="space-y-2">
                      {project.impact.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-primary mr-2">•</span>
                          <span className="text-gray-300 text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 flex justify-end">
                      <motion.button
                        className="text-sm text-primary hover:text-secondary transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        了解详情
                      </motion.button>
                    </div>
                  </div>
                </motion.div>

                {expandedProject !== project.id && (
                  <div className="mt-4 text-center">
                    <motion.button
                      className="text-sm text-primary"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      点击展开
                    </motion.button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* 参与项目CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="earth-card py-10 px-8">
            <h3 className="text-2xl font-bold mb-4 earth-text">参与超级地球项目</h3>
            <p className="max-w-2xl mx-auto text-gray-300 mb-8">
              无论您是个人、组织还是企业，都可以成为超级地球项目的一部分。加入我们，共同打造可持续的未来。
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.a 
                href="#contact" 
                className="earth-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                联系我们
              </motion.a>
              <motion.a 
                href="#"
                className="border border-white/30 px-6 py-3 font-mono text-sm font-bold uppercase tracking-wider hover:bg-white/10 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                下载项目手册
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 背景装饰 */}
      <div className="absolute top-1/3 right-0 w-64 h-96 bg-primary/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-1/3 left-0 w-96 h-64 bg-secondary/5 rounded-full blur-3xl -z-10"></div>
    </section>
  );
};

export default Projects; 