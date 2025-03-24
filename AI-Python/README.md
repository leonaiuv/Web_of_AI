# 神经网络可视化学习平台

一个简单易用的神经网络学习平台，帮助您理解神经网络的基本概念。

## 功能特点

- 神经网络基础知识展示
- 交互式模型构建
- 实时训练过程可视化
- 简单直观的用户界面

## 系统要求

- Python 3.8 或更高版本
- Node.js 14 或更高版本
- 现代浏览器（Chrome、Firefox、Safari等）

## 快速开始

### 1. 安装后端

```bash
# 进入后端目录
cd backend

# 创建虚拟环境
python -m venv venv

# 激活虚拟环境
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# 安装依赖
pip install -r requirements.txt
```

### 2. 安装前端

```bash
# 进入前端目录
cd frontend

# 安装依赖
npm install
```

### 3. 启动应用

```bash
# 启动后端（在backend目录下）
python app.py

# 启动前端（在frontend目录下）
npm start
```

访问 http://localhost:3000 即可打开应用。

## 项目结构

```
neural-network-visualizer/
├── backend/                # Python后端
│   ├── venv/              # Python虚拟环境
│   ├── app.py             # 主应用文件
│   └── requirements.txt   # Python依赖
└── frontend/              # React前端
    ├── public/            # 静态文件
    ├── src/               # 源代码
    └── package.json       # Node.js依赖
```

## 常见问题

1. **如果遇到依赖安装问题**：
   - 确保使用正确的Python版本
   - 尝试使用 `pip install --upgrade pip` 更新pip
   - 如果安装失败，可以尝试单独安装每个依赖

2. **如果前端无法启动**：
   - 确保Node.js版本正确
   - 删除 node_modules 文件夹，重新运行 `npm install`

3. **如果后端无法启动**：
   - 确保虚拟环境已激活
   - 检查端口5000是否被占用

## 技术支持

如有问题，请提交Issue或联系技术支持。 