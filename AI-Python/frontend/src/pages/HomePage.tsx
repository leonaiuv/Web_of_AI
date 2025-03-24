import React from 'react';
import { Row, Col, Card, Typography, Button, Divider } from 'antd';
import { 
  AppstoreOutlined, 
  FunctionOutlined, 
  AreaChartOutlined,
  DatabaseOutlined,
  CodeOutlined,
  ExperimentOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const { Title, Paragraph } = Typography;

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: '神经网络类型',
      description: '了解各种神经网络架构，包括前馈神经网络、卷积神经网络、循环神经网络等',
      icon: <AppstoreOutlined />,
      link: '/network-types'
    },
    {
      title: '激活函数',
      description: '探索不同激活函数的特性和应用场景，包括Sigmoid、ReLU、Tanh等',
      icon: <FunctionOutlined />,
      link: '/activation-functions'
    },
    {
      title: '损失函数',
      description: '学习各种损失函数的原理和适用情况，包括均方误差、交叉熵等',
      icon: <AreaChartOutlined />,
      link: '/loss-functions'
    },
    {
      title: '数据预处理',
      description: '掌握神经网络训练前的数据预处理技术，包括归一化、标准化、独热编码等',
      icon: <DatabaseOutlined />,
      link: '/data-preprocessing'
    },
    {
      title: '模型训练',
      description: '了解神经网络的训练过程和技巧，包括批量大小、学习率调整等',
      icon: <CodeOutlined />,
      link: '/model-training'
    },
    {
      title: '交互演示',
      description: '通过可视化交互方式，亲手体验神经网络的工作原理',
      icon: <ExperimentOutlined />,
      link: '/interactive-demo'
    },
  ];

  return (
    <div className="home-container">
      <div className="hero-section">
        <Title level={1} className="hero-title">
          神经网络可视化学习平台
        </Title>
        <Paragraph className="hero-subtitle">
          通过交互式可视化深入了解神经网络的原理和应用
        </Paragraph>
        <Button 
          type="primary" 
          size="large"
          onClick={() => navigate('/interactive-demo')}
          className="hero-button"
        >
          开始探索
        </Button>
      </div>

      <Divider orientation="left">
        <Title level={3}>平台特色</Title>
      </Divider>

      <Row gutter={[24, 24]} className="features-section">
        {features.map((feature, index) => (
          <Col xs={24} sm={12} lg={8} key={index}>
            <Card 
              className="feature-card"
              hoverable
              onClick={() => navigate(feature.link)}
            >
              <div className="feature-icon">{feature.icon}</div>
              <Title level={4}>{feature.title}</Title>
              <Paragraph>{feature.description}</Paragraph>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default HomePage; 