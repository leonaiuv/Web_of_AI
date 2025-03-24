import React, { useState, useEffect } from 'react';
import './ModelsPage.css';

interface ModelType {
  id: string;
  name: string;
  description: string;
}

const ModelsPage: React.FC = () => {
  const [models, setModels] = useState<ModelType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // 模拟从API加载模型类型
    const fetchModels = async () => {
      setLoading(true);
      try {
        // 实际项目中，这里应该从后端API获取数据
        // const response = await fetch('http://localhost:5000/api/models/types');
        // const data = await response.json();
        
        // 模拟数据
        const mockData: ModelType[] = [
          {
            id: 'feedforward',
            name: '前馈神经网络',
            description: '最基本的神经网络类型，信息单向流动，没有循环连接。'
          },
          {
            id: 'cnn',
            name: '卷积神经网络',
            description: '专为处理网格化数据(如图像)设计的神经网络。'
          },
          {
            id: 'rnn',
            name: '循环神经网络',
            description: '包含循环连接的神经网络，适合处理序列数据。'
          },
          {
            id: 'lstm',
            name: '长短期记忆网络',
            description: 'RNN的一种变体，能够学习长期依赖关系。'
          }
        ];
        
        setModels(mockData);
      } catch (error) {
        console.error('加载模型数据失败:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchModels();
  }, []);

  return (
    <div className="models-page">
      <h2>神经网络模型</h2>
      
      {loading ? (
        <div className="loading">加载中...</div>
      ) : (
        <div className="models-grid">
          {models.map((model) => (
            <div key={model.id} className="model-card">
              <h3>{model.name}</h3>
              <p>{model.description}</p>
              <button className="learn-more-btn">了解更多</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ModelsPage; 