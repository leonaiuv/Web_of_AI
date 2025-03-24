import React, { useState } from 'react';
import './VisualizationPage.css';

interface VisualizationOption {
  id: string;
  title: string;
  description: string;
  image?: string;
}

const VisualizationPage: React.FC = () => {
  const [selectedViz, setSelectedViz] = useState<string | null>(null);
  
  const visualizationOptions: VisualizationOption[] = [
    {
      id: 'activation',
      title: '激活函数',
      description: '可视化不同激活函数的曲线和特性。'
    },
    {
      id: 'loss',
      title: '损失函数',
      description: '探索不同损失函数在各种场景下的表现。'
    },
    {
      id: 'learning',
      title: '学习过程',
      description: '观察神经网络在训练过程中权重和偏置的变化。'
    },
    {
      id: 'architecture',
      title: '网络架构',
      description: '交互式探索不同神经网络架构的特点。'
    }
  ];
  
  const handleSelectViz = (id: string) => {
    setSelectedViz(id);
  };
  
  const renderVisualizationContent = () => {
    if (!selectedViz) {
      return (
        <div className="viz-placeholder">
          <h3>请从左侧选择一个可视化选项</h3>
          <p>这里将显示相应的可视化内容和交互界面。</p>
        </div>
      );
    }
    
    // 根据选择的可视化类型渲染不同的内容
    switch (selectedViz) {
      case 'activation':
        return (
          <div className="viz-content">
            <h3>激活函数可视化</h3>
            <div className="viz-placeholder">
              <p>在这里将展示不同激活函数的曲线图和特性比较。</p>
              <p>实际项目中，这里会有交互式图表。</p>
            </div>
          </div>
        );
      case 'loss':
        return (
          <div className="viz-content">
            <h3>损失函数可视化</h3>
            <div className="viz-placeholder">
              <p>在这里将展示不同损失函数的曲线图和特性比较。</p>
              <p>实际项目中，这里会有交互式图表。</p>
            </div>
          </div>
        );
      default:
        return (
          <div className="viz-placeholder">
            <p>该可视化功能正在开发中...</p>
          </div>
        );
    }
  };
  
  return (
    <div className="visualization-page">
      <h2>神经网络可视化</h2>
      
      <div className="visualization-container">
        <div className="viz-sidebar">
          <h3>可视化选项</h3>
          <ul className="viz-options">
            {visualizationOptions.map(option => (
              <li 
                key={option.id}
                className={selectedViz === option.id ? 'active' : ''}
                onClick={() => handleSelectViz(option.id)}
              >
                <h4>{option.title}</h4>
                <p>{option.description}</p>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="viz-main">
          {renderVisualizationContent()}
        </div>
      </div>
    </div>
  );
};

export default VisualizationPage; 