# 未来视觉 - 创新数字体验

这是一个使用 Next.js、Framer Motion、Three.js 和 Tailwind CSS 构建的现代化、炫酷的网站。

## 特点

- 🎨 现代化设计与炫酷动效
- 🚀 基于 Next.js 的高性能框架
- 📱 完全响应式设计
- ✨ 使用 Framer Motion 实现流畅动画
- 🌈 使用 Three.js 创建沉浸式 3D 背景
- 🎭 自定义鼠标光标效果
- 🌟 玻璃态设计元素
- 🎯 渐变文本和霓虹效果

## 技术栈

- **Next.js**: React 框架，提供服务端渲染和静态站点生成
- **TypeScript**: 类型安全的 JavaScript 超集
- **Framer Motion**: 强大的 React 动画库
- **Three.js**: 3D 图形库
- **Tailwind CSS**: 实用优先的 CSS 框架
- **SASS**: CSS 预处理器

## 开始使用

### 安装依赖

首先，确保已安装 Node.js (推荐 v18.x 或更高版本)

```bash
# 克隆仓库 (如果你已经有项目文件，可以跳过此步骤)
git clone https://github.com/yourusername/awesome-site.git
cd awesome-site

# 安装依赖
npm install
# 或使用 yarn
yarn install
```

### 运行开发服务器

```bash
# 启动开发服务器
npm run dev
# 或使用 yarn
yarn dev
```

然后在浏览器中访问 [http://localhost:3000](http://localhost:3000)

## 构建生产版本

```bash
# 构建生产版本
npm run build
# 或使用 yarn
yarn build

# 运行生产版本
npm run start
# 或使用 yarn
yarn start
```

## 项目结构

```
awesome-site/
├── public/              # 静态资源
├── src/
│   ├── components/      # React 组件
│   ├── pages/           # Next.js 页面
│   ├── styles/          # 全局样式
│   ├── assets/          # 项目资源
│   ├── hooks/           # 自定义 React hooks
│   ├── animations/      # 动画相关代码
│   └── types/           # TypeScript 类型声明
├── .env.example         # 环境变量示例
├── next.config.js       # Next.js 配置
├── tailwind.config.js   # Tailwind CSS 配置
├── postcss.config.js    # PostCSS 配置
└── tsconfig.json        # TypeScript 配置
```

## 常见问题解决

### TypeScript 错误

如果你遇到 TypeScript 类型错误，请确保所有依赖都已正确安装：

```bash
npm install
```

此外，你可能需要检查 `src/types` 目录下的类型声明文件，确保缺少类型声明的库有相应的类型定义。

### 开发环境问题

如果开发服务器运行时遇到问题，请尝试清除 Next.js 缓存：

```bash
rm -rf .next
# 或在 Windows 上
rmdir /s /q .next
```

## 许可证

MIT 