import React, { useState, useEffect } from 'react';
import { Typography, Card, Row, Col, Tabs, Spin, Alert } from 'antd';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
} from 'chart.js';
import './ActivationFunctions.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ChartTitle,
  Tooltip,
  Legend
);

const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;

interface ActivationFunction {
  name: string;
  formula: string;
  description: string;
  data: {
    x: number[];
    y: number[];
  };
}

const ActivationFunctions: React.FC = () => {
  const [activationFunctions, setActivationFunctions] = useState<Record<string, ActivationFunction>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActivationFunctions = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/visualization/activation-functions');
        setActivationFunctions(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching activation functions:', err);
        setError('获取激活函数数据失败，请稍后再试。');
      } finally {
        setLoading(false);
      }
    };

    fetchActivationFunctions();
  }, []);

  const renderChart = (data: { x: number[]; y: number[] }, name: string) => {
    const chartData = {
      labels: data.x,
      datasets: [
        {
          label: name,
          data: data.y,
          fill: false,
          backgroundColor: 'rgba(24, 144, 255, 0.5)',
          borderColor: 'rgba(24, 144, 255, 1)',
          tension: 0.3,
          pointRadius: 0,
        },
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          grid: {
            color: 'rgba(0, 0, 0, 0.05)',
          },
          title: {
            display: true,
            text: 'x',
          },
        },
        y: {
          grid: {
            color: 'rgba(0, 0, 0, 0.05)',
          },
          title: {
            display: true,
            text: name,
          },
        },
      },
    };

    return <Line data={chartData} options={options} height={300} />;
  };

  const renderCodeExample = (funcType: string) => {
    let codeSnippet = '';

    switch (funcType) {
      case 'sigmoid':
        codeSnippet = `# TensorFlow/Keras 实现
activation = tf.keras.activations.sigmoid(x)

# PyTorch 实现
activation = torch.nn.Sigmoid()(x)

# NumPy 实现
def sigmoid(x):
    return 1 / (1 + np.exp(-x))`;
        break;
      case 'tanh':
        codeSnippet = `# TensorFlow/Keras 实现
activation = tf.keras.activations.tanh(x)

# PyTorch 实现
activation = torch.nn.Tanh()(x)

# NumPy 实现
def tanh(x):
    return np.tanh(x)`;
        break;
      case 'relu':
        codeSnippet = `# TensorFlow/Keras 实现
activation = tf.keras.activations.relu(x)

# PyTorch 实现
activation = torch.nn.ReLU()(x)

# NumPy 实现
def relu(x):
    return np.maximum(0, x)`;
        break;
      case 'leaky_relu':
        codeSnippet = `# TensorFlow/Keras 实现
activation = tf.keras.activations.relu(x, alpha=0.01)

# PyTorch 实现
activation = torch.nn.LeakyReLU(0.01)(x)

# NumPy 实现
def leaky_relu(x, alpha=0.01):
    return np.where(x > 0, x, alpha * x)`;
        break;
      default:
        codeSnippet = '# 未找到此激活函数的代码示例';
    }

    return (
      <SyntaxHighlighter language="python" style={docco}>
        {codeSnippet}
      </SyntaxHighlighter>
    );
  };

  if (loading) {
    return (
      <div className="loading-container">
        <Spin size="large" />
        <Text style={{ marginTop: 16 }}>加载激活函数数据...</Text>
      </div>
    );
  }

  if (error) {
    return (
      <Alert
        message="加载错误"
        description={error}
        type="error"
        showIcon
      />
    );
  }

  return (
    <div className="activation-functions-container">
      <Title level={2} className="page-title">激活函数</Title>
      <Paragraph className="page-description">
        激活函数是神经网络中的重要组成部分，它们为神经网络引入非线性特性，使网络能够学习复杂的模式。
        以下是常用的激活函数及其特点。
      </Paragraph>

      <Tabs defaultActiveKey="sigmoid" type="card" className="activation-tabs">
        {Object.entries(activationFunctions).map(([key, func]) => (
          <TabPane tab={func.name} key={key}>
            <Card className="activation-card">
              <Row gutter={[24, 24]}>
                <Col xs={24} md={12}>
                  <Title level={4}>函数图像</Title>
                  <div className="chart-container">
                    {renderChart(func.data, func.name)}
                  </div>
                </Col>
                <Col xs={24} md={12}>
                  <Title level={4}>函数特性</Title>
                  <div className="function-details">
                    <div className="formula">
                      <Text strong>数学表达式：</Text>
                      <Text className="formula-text">{func.formula}</Text>
                    </div>
                    <div className="description">
                      <Text strong>描述：</Text>
                      <Paragraph>{func.description}</Paragraph>
                    </div>
                    <div className="code-example">
                      <Text strong>代码实现：</Text>
                      {renderCodeExample(key)}
                    </div>
                  </div>
                </Col>
              </Row>
            </Card>
          </TabPane>
        ))}
      </Tabs>

      <Card className="summary-card">
        <Title level={3}>激活函数的选择</Title>
        <Paragraph>
          不同的激活函数适用于不同的场景：
        </Paragraph>
        <ul className="summary-list">
          <li><Text strong>ReLU</Text> - 大多数隐藏层的首选，训练速度快，但可能遇到"死亡ReLU"问题</li>
          <li><Text strong>Leaky ReLU</Text> - 解决"死亡ReLU"问题，在负值区域提供小梯度</li>
          <li><Text strong>Sigmoid</Text> - 适用于二分类问题的输出层</li>
          <li><Text strong>Tanh</Text> - 适用于需要数据中心化的场景，输出范围为[-1,1]</li>
        </ul>
      </Card>
    </div>
  );
};

export default ActivationFunctions; 