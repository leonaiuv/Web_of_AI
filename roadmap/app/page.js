'use client';

import { useState, useEffect } from 'react';
import Roadmap from './components/Roadmap';
import RoadmapForm from './components/RoadmapForm';
import YearSelector from './components/YearSelector';
import { FaExclamationCircle } from 'react-icons/fa';

// 生成从当前年份开始的若干年范围
const generateYears = (startYear = new Date().getFullYear(), count = 10) => {
  return Array.from({ length: count }, (_, i) => (startYear + i).toString());
};

// 示例人生规划数据
const initialRoadmapData = [
  {
    id: '1',
    title: '学业规划 - 大学本科',
    date: 'Q3 2024',
    description: '完成大学学业，获取学士学位，同时积累相关实习经验和技能证书。',
    status: 'inProgress',
    tasks: [
      { text: '选择合适的专业方向', completed: true },
      { text: '参加核心课程学习', completed: true },
      { text: '获取行业相关实习经验', completed: false },
      { text: '准备毕业论文', completed: false }
    ]
  },
  {
    id: '2',
    title: '职业发展 - 入行阶段',
    date: 'Q3 2025',
    description: '踏入职场，积累初步工作经验，找到自己的职业方向和兴趣所在。',
    status: 'pending',
    tasks: [
      { text: '准备求职材料和面试', completed: false },
      { text: '获得第一份全职工作', completed: false },
      { text: '适应职场环境', completed: false },
      { text: '积累基础工作经验', completed: false }
    ]
  },
  {
    id: '3',
    title: '技能提升 - 专业进阶',
    date: 'Q1 2026',
    description: '不断学习新技能，提升专业能力，考取相关资格证书，为职业晋升做准备。',
    status: 'pending',
    tasks: [
      { text: '参加专业培训课程', completed: false },
      { text: '获取行业资格认证', completed: false },
      { text: '学习管理和沟通技巧', completed: false },
      { text: '建立专业人脉网络', completed: false }
    ]
  },
  {
    id: '4',
    title: '财务目标 - 初步积累',
    date: 'Q4 2026',
    description: '制定个人理财计划，开始资产积累，为未来的大额支出和投资做准备。',
    status: 'pending',
    tasks: [
      { text: '建立应急资金', completed: false },
      { text: '开始投资理财', completed: false },
      { text: '制定债务还款计划', completed: false },
      { text: '学习财务知识', completed: false }
    ]
  },
  {
    id: '5',
    title: '健康生活 - 建立习惯',
    date: 'Q1 2027',
    description: '养成健康的生活习惯，平衡工作与生活，提高生活质量。',
    status: 'pending',
    tasks: [
      { text: '制定每周锻炼计划', completed: false },
      { text: '改善饮食习惯', completed: false },
      { text: '培养兴趣爱好', completed: false },
      { text: '学习压力管理技巧', completed: false }
    ]
  },
  {
    id: '6',
    title: '职业发展 - 晋升管理',
    date: 'Q2 2028',
    description: '在职业道路上获得晋升，承担更多管理责任，扩大影响力。',
    status: 'pending',
    tasks: [
      { text: '获得团队管理经验', completed: false },
      { text: '参与重要项目决策', completed: false },
      { text: '提升领导力技能', completed: false },
      { text: '扩大职业网络', completed: false }
    ]
  },
  {
    id: '7',
    title: '个人成长 - 家庭规划',
    date: 'Q3 2029',
    description: '考虑建立家庭，平衡个人发展与家庭责任。',
    status: 'pending',
    tasks: [
      { text: '规划家庭生活', completed: false },
      { text: '准备适合的居住环境', completed: false },
      { text: '平衡工作与家庭时间', completed: false },
      { text: '制定家庭财务计划', completed: false }
    ]
  },
  {
    id: '8',
    title: '长期目标 - 事业高峰',
    date: 'Q1 2030',
    description: '实现职业生涯的重要里程碑，可能是创业、晋升高管或转型新领域。',
    status: 'pending',
    tasks: [
      { text: '评估职业现状与目标', completed: false },
      { text: '探索创业或转型机会', completed: false },
      { text: '建立个人品牌和影响力', completed: false },
      { text: '实现财务自由', completed: false }
    ]
  }
];

export default function Home() {
  const [roadmapData, setRoadmapData] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  
  // 年份范围设置
  const [yearConfig, setYearConfig] = useState({
    startYear: 2024,
    count: 10,
    years: generateYears(2024, 10)
  });
  
  // 更新年份配置
  const handleYearRangeChange = (startYear, count) => {
    const newYears = generateYears(startYear, count);
    setYearConfig({
      startYear,
      count,
      years: newYears
    });
    
    // 保存配置到本地存储
    localStorage.setItem('yearConfig', JSON.stringify({ startYear, count }));
  };
  
  // 从本地存储加载数据和配置
  useEffect(() => {
    // 加载年份配置
    const savedYearConfig = localStorage.getItem('yearConfig');
    if (savedYearConfig) {
      const { startYear, count } = JSON.parse(savedYearConfig);
      handleYearRangeChange(startYear, count);
    }
    
    // 加载路线图数据
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
  
  // 添加路线图项目
  const handleAddItem = (newItem) => {
    // 生成唯一ID
    newItem.id = Date.now().toString();
    setRoadmapData(prev => [...prev, newItem]);
  };
  
  // 处理编辑项目
  const handleEditItem = (item) => {
    setEditingItem(item);
    // 滚动到表单位置
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // 处理更新项目
  const handleUpdateItem = (updatedItem) => {
    setRoadmapData(prev => 
      prev.map(item => item.id === updatedItem.id ? updatedItem : item)
    );
    setEditingItem(null);
  };
  
  // 处理删除项目
  const handleDeleteItem = (item) => {
    setItemToDelete(item);
    setShowConfirmation(true);
  };
  
  // 确认删除项目
  const confirmDelete = () => {
    if (itemToDelete) {
      setRoadmapData(prev => prev.filter(item => item.id !== itemToDelete.id));
      setShowConfirmation(false);
      setItemToDelete(null);
    }
  };
  
  // 取消删除操作
  const cancelDelete = () => {
    setShowConfirmation(false);
    setItemToDelete(null);
  };
  
  // 取消编辑
  const handleCancelEdit = () => {
    setEditingItem(null);
  };

  return (
    <div>
      <header className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">人生规划路线图</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          通过此路线图，您可以规划和跟踪人生各阶段的目标、里程碑和关键任务。按照时间顺序展示您的学业、职业、财务和个人发展计划，帮助您清晰地了解自己的人生方向。
        </p>
      </header>
      
      <YearSelector 
        startYear={yearConfig.startYear} 
        count={yearConfig.count} 
        onChange={handleYearRangeChange} 
      />
      
      <RoadmapForm 
        onAddItem={handleAddItem} 
        editItem={editingItem}
        onUpdateItem={handleUpdateItem}
        onCancelEdit={handleCancelEdit}
        yearConfig={yearConfig}
      />
      
      <Roadmap 
        roadmapData={roadmapData} 
        onEditItem={handleEditItem} 
        onDeleteItem={handleDeleteItem}
        yearConfig={yearConfig}
      />
      
      {/* 删除确认对话框 */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md mx-4">
            <div className="flex items-center text-yellow-500 mb-4">
              <FaExclamationCircle size={24} className="mr-2" />
              <h3 className="text-lg font-bold">确认删除</h3>
            </div>
            <p className="mb-6">
              您确定要删除 "{itemToDelete?.title}" 吗？此操作不可撤销。
            </p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
              >
                取消
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors"
              >
                删除
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 