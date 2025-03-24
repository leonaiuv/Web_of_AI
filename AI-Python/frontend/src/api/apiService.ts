import axios from 'axios';

// 创建API基础实例
const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// 神经网络模型相关API
export const modelsApi = {
  // 获取模型类型
  getModelTypes: async () => {
    try {
      const response = await apiClient.get('/models/types');
      return response.data;
    } catch (error) {
      console.error('获取模型类型失败:', error);
      throw error;
    }
  },

  // 创建前馈神经网络
  createFeedforwardModel: async (modelConfig: any) => {
    try {
      const response = await apiClient.post('/models/feedforward/create', modelConfig);
      return response.data;
    } catch (error) {
      console.error('创建前馈神经网络失败:', error);
      throw error;
    }
  },

  // 创建卷积神经网络
  createCNNModel: async (modelConfig: any) => {
    try {
      const response = await apiClient.post('/models/cnn/create', modelConfig);
      return response.data;
    } catch (error) {
      console.error('创建卷积神经网络失败:', error);
      throw error;
    }
  },

  // 创建循环神经网络
  createRNNModel: async (modelConfig: any) => {
    try {
      const response = await apiClient.post('/models/rnn/create', modelConfig);
      return response.data;
    } catch (error) {
      console.error('创建循环神经网络失败:', error);
      throw error;
    }
  },

  // 训练模型
  trainModel: async (trainingConfig: any) => {
    try {
      const response = await apiClient.post('/models/train', trainingConfig);
      return response.data;
    } catch (error) {
      console.error('训练模型失败:', error);
      throw error;
    }
  },
};

// 数据处理相关API
export const dataApi = {
  // 获取数据集示例
  getDataExamples: async () => {
    try {
      const response = await apiClient.get('/data/examples');
      return response.data;
    } catch (error) {
      console.error('获取数据集示例失败:', error);
      throw error;
    }
  },

  // 获取预处理方法
  getPreprocessingMethods: async () => {
    try {
      const response = await apiClient.get('/data/preprocessing');
      return response.data;
    } catch (error) {
      console.error('获取预处理方法失败:', error);
      throw error;
    }
  },
};

// 可视化相关API
export const visualizationApi = {
  // 获取激活函数数据
  getActivationFunctions: async () => {
    try {
      const response = await apiClient.get('/visualization/activation-functions');
      return response.data;
    } catch (error) {
      console.error('获取激活函数数据失败:', error);
      throw error;
    }
  },

  // 获取损失函数数据
  getLossFunctions: async () => {
    try {
      const response = await apiClient.get('/visualization/loss-functions');
      return response.data;
    } catch (error) {
      console.error('获取损失函数数据失败:', error);
      throw error;
    }
  },

  // 获取网络架构数据
  getNetworkArchitecture: async (modelType: string) => {
    try {
      const response = await apiClient.get(`/visualization/network-architecture/${modelType}`);
      return response.data;
    } catch (error) {
      console.error('获取网络架构数据失败:', error);
      throw error;
    }
  },
};

export default {
  models: modelsApi,
  data: dataApi,
  visualization: visualizationApi,
}; 