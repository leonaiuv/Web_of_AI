# 超级神经中枢

这是一个基于Next.js和React的超级神经中枢主题网站，展示了先进的人工智能和神经网络技术。

## 功能特点

- 响应式设计，适配各种设备
- 现代化UI界面，带有神经网络主题的视觉效果
- 基于Three.js的交互式3D背景动画
- 流畅的页面过渡和动画效果
- 完全支持TypeScript

## 技术栈

- Next.js - React框架
- TypeScript - 类型安全
- Tailwind CSS - 样式系统
- Framer Motion - 动画库
- Three.js - 3D渲染
- GSAP - 高级动画

## 开始使用

### 前提条件

- Node.js 14.0或更高版本
- npm或yarn包管理器

### 安装

1. 克隆仓库

```bash
git clone https://github.com/yourusername/neural-hub.git
cd neural-hub
```

2. 安装依赖

```bash
npm install
# 或
yarn install
```

3. 配置环境变量

复制`.env.example`文件为`.env.local`并填写相应的值：

```bash
cp .env.example .env.local
```

4. 启动开发服务器

```bash
npm run dev
# 或
yarn dev
```

5. 打开浏览器访问 [http://localhost:3000](http://localhost:3000)

## 项目结构

```
neural-hub/
├── public/             # 静态资源
├── src/                # 源代码
│   ├── components/     # React组件
│   ├── pages/          # 页面组件
│   ├── styles/         # 全局样式
│   └── types/          # TypeScript类型定义
├── .env                # 环境变量
├── .env.example        # 环境变量示例
├── next.config.js      # Next.js配置
├── package.json        # 项目依赖
├── postcss.config.js   # PostCSS配置
├── tailwind.config.js  # Tailwind CSS配置
└── tsconfig.json       # TypeScript配置
```

## 构建生产版本

```bash
npm run build
# 或
yarn build
```

## 部署

该项目可以部署到任何支持Node.js的平台，如Vercel、Netlify或自托管服务器。

## 贡献

欢迎提交问题和拉取请求。对于重大更改，请先开启一个问题讨论您想要更改的内容。

## 许可证

MIT 