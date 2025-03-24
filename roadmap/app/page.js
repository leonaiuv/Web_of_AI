'use client';

import { useState, useEffect } from 'react';
import Roadmap from './components/Roadmap';
import RoadmapForm from './components/RoadmapForm';

// 示例路线图数据
const initialRoadmapData = [
  {
    title: '需求分析与规划',
    date: 'Q1 2024',
    description: '收集并分析项目需求，确定项目范围和目标，制定详细的项目计划。',
    status: 'completed',
    tasks: [
      { text: '与利益相关者进行需求访谈', completed: true },
      { text: '创建项目需求文档', completed: true },
      { text: '制定项目范围说明书', completed: true },
      { text: '创建初步项目计划和时间表', completed: true }
    ]
  },
  {
    title: '设计阶段',
    date: 'Q2 2024',
    description: '基于需求分析结果，进行系统架构设计、数据库设计和用户界面设计。',
    status: 'inProgress',
    tasks: [
      { text: '创建系统架构文档', completed: true },
      { text: '设计数据库模型', completed: true },
      { text: '创建UI/UX原型', completed: false },
      { text: '进行设计评审', completed: false }
    ]
  },
  {
    title: '开发阶段 - 前端',
    date: 'Q3 2024',
    description: '实现用户界面和前端功能，确保良好的用户体验和响应式设计。',
    status: 'pending',
    tasks: [
      { text: '搭建前端框架', completed: false },
      { text: '实现核心UI组件', completed: false },
      { text: '集成API和服务', completed: false },
      { text: '前端单元测试', completed: false }
    ]
  },
  {
    title: '开发阶段 - 后端',
    date: 'Q3 2024',
    description: '实现服务器端逻辑、API接口和数据库交互，保证系统安全和性能。',
    status: 'pending',
    tasks: [
      { text: '开发核心服务和API', completed: false },
      { text: '实现数据库访问层', completed: false },
      { text: '集成第三方服务', completed: false },
      { text: '后端单元测试', completed: false }
    ]
  },
  {
    title: '集成测试',
    date: 'Q4 2024',
    description: '将前端和后端系统集成，进行全面测试以确保系统功能和性能符合要求。',
    status: 'pending',
    tasks: [
      { text: '集成前后端系统', completed: false },
      { text: '执行功能测试', completed: false },
      { text: '执行性能测试', completed: false },
      { text: '修复发现的问题', completed: false }
    ]
  },
  {
    title: '用户验收测试',
    date: 'Q1 2025',
    description: '与最终用户一起测试系统，确保满足所有业务需求和用户期望。',
    status: 'pending',
    tasks: [
      { text: '准备UAT环境', completed: false },
      { text: '创建用户测试场景', completed: false },
      { text: '执行用户验收测试', completed: false },
      { text: '收集反馈并修复问题', completed: false }
    ]
  },
  {
    title: '部署与上线',
    date: 'Q1 2025',
    description: '将系统部署到生产环境，进行最终检查并正式上线。',
    status: 'pending',
    tasks: [
      { text: '准备生产环境', completed: false },
      { text: '创建部署计划', completed: false },
      { text: '执行系统部署', completed: false },
      { text: '进行上线后检查', completed: false }
    ]
  },
  {
    title: '运维与优化',
    date: 'Q2 2025',
    description: '持续监控系统性能，收集用户反馈，进行必要的维护和优化。',
    status: 'pending',
    tasks: [
      { text: '设置系统监控', completed: false },
      { text: '收集用户反馈', completed: false },
      { text: '性能优化', completed: false },
      { text: '定期系统更新', completed: false }
    ]
  }
];

export default function Home() {
  const [roadmapData, setRoadmapData] = useState([]);
  
  // 从本地存储加载数据
  useEffect(() => {
    const savedData = localStorage.getItem('roadmapData');
    if (savedData) {
      setRoadmapData(JSON.parse(savedData));
    } else {
      setRoadmapData(initialRoadmapData);
    }
  }, []);
  
  // 保存数据到本地存储
  useEffect(() => {
    if (roadmapData.length > 0) {
      localStorage.setItem('roadmapData', JSON.stringify(roadmapData));
    }
  }, [roadmapData]);
  
  const handleAddItem = (newItem) => {
    setRoadmapData(prev => [...prev, newItem]);
  };

  return (
    <div>
      <header className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">项目路线图</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          通过此路线图，您可以清晰地跟踪项目进度、里程碑和关键任务。按照时间顺序展示项目的各个阶段和目标，帮助团队成员和利益相关者了解项目的发展方向。
        </p>
      </header>
      
      <RoadmapForm onAddItem={handleAddItem} />
      
      <Roadmap roadmapData={roadmapData} />
    </div>
  );
} 