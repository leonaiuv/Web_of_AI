import React from 'react';
import { Layout, Typography } from 'antd';
import './Footer.css';

const { Footer: AntFooter } = Layout;
const { Text, Link } = Typography;

const Footer: React.FC = () => {
  return (
    <AntFooter className="footer">
      <Text className="footer-text">
        神经网络可视化学习平台 ©{new Date().getFullYear()} 使用 
        <Link href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">
          React
        </Link>
        {' '}和{' '}
        <Link href="https://www.tensorflow.org/" target="_blank" rel="noopener noreferrer">
          TensorFlow
        </Link>
        {' '}构建
      </Text>
    </AntFooter>
  );
};

export default Footer; 