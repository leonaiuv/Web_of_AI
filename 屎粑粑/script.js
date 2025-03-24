// 初始化架构图组件
const architectureContainer = document.querySelector('.architecture-container');

// 创建架构图组件
function createComponent(type, label, x, y) {
    const component = document.createElement('div');
    component.className = `component ${type}`;
    component.style.left = `${x}px`;
    component.style.top = `${y}px`;
    component.textContent = label;
    return component;
}

// 添加架构图组件
architectureContainer.appendChild(createComponent('database', '数据库', 100, 100));
architectureContainer.appendChild(createComponent('server', '应用服务器', 300, 100));
architectureContainer.appendChild(createComponent('client', '客户端', 500, 100));

// 添加交互功能
architectureContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('component')) {
        alert(`点击了: ${e.target.textContent}`);
    }
});