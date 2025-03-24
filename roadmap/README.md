# 项目路线图展示应用

这是一个用于创建和展示项目路线图的Web应用程序。该应用提供了直观的界面，允许用户添加、查看和筛选项目的各个阶段和里程碑。

## 功能特点

- 📊 可视化项目路线图展示
- 📅 按年份和季度筛选路线图项目
- ✅ 显示任务状态和完成情况
- 📝 添加新的路线图项目和任务
- 💾 数据本地存储，刷新页面后保持

## 技术栈

- Next.js - React框架
- TailwindCSS - 样式框架
- React Icons - 图标库
- 本地存储 - 数据持久化

## 使用方法

### 1. 安装依赖

```bash
npm install
```

### 2. 运行开发服务器

```bash
npm run dev
```

### 3. 构建生产版本

```bash
npm run build
npm start
```

## 如何使用应用

1. 在首页表单中填写路线图项目信息
2. 添加相关任务
3. 提交表单添加新的路线图项目
4. 使用筛选器按年份和季度筛选项目
5. 查看完整的项目路线图

## 自定义

您可以通过修改以下文件来自定义应用：

- `app/page.js` - 首页内容和示例数据
- `app/components/Roadmap.js` - 路线图展示组件
- `app/components/RoadmapItem.js` - 单个路线图项目组件
- `app/styles/globals.css` - 全局样式
- `tailwind.config.js` - TailwindCSS配置

## 许可证

MIT 