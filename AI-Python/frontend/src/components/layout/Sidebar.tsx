import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { 
  HomeOutlined, 
  AppstoreOutlined, 
  FunctionOutlined, 
  AreaChartOutlined,
  DatabaseOutlined,
  CodeOutlined,
  ExperimentOutlined
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import './Sidebar.css';

const { Sider } = Layout;

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: '首页',
    },
    {
      key: '/network-types',
      icon: <AppstoreOutlined />,
      label: '神经网络类型',
    },
    {
      key: '/activation-functions',
      icon: <FunctionOutlined />,
      label: '激活函数',
    },
    {
      key: '/loss-functions',
      icon: <AreaChartOutlined />,
      label: '损失函数',
    },
    {
      key: '/data-preprocessing',
      icon: <DatabaseOutlined />,
      label: '数据预处理',
    },
    {
      key: '/model-training',
      icon: <CodeOutlined />,
      label: '模型训练',
    },
    {
      key: '/interactive-demo',
      icon: <ExperimentOutlined />,
      label: '交互演示',
    },
  ];

  const handleMenuClick = (e: { key: string }) => {
    navigate(e.key);
  };
  
  return (
    <Sider 
      collapsible 
      collapsed={collapsed} 
      onCollapse={(value) => setCollapsed(value)}
      className="sidebar"
      width={220}
      theme="light"
    >
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        style={{ height: '100%', borderRight: 0 }}
        items={menuItems}
        onClick={handleMenuClick}
      />
    </Sider>
  );
};

export default Sidebar; 