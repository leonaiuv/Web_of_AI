import React from 'react';
import { Layout, Typography } from 'antd';
import './Header.css';

const { Header: AntHeader } = Layout;
const { Title } = Typography;

const Header: React.FC = () => {
  return (
    <AntHeader className="header">
      <div className="logo" />
      <Title level={3} style={{ color: 'white', margin: 0 }}>
        神经网络可视化学习平台
      </Title>
    </AntHeader>
  );
};

export default Header; 