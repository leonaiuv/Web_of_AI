// ===== 等待DOM加载完成 =====
document.addEventListener('DOMContentLoaded', () => {
    // 隐藏加载动画
    setTimeout(() => {
        const loaderWrapper = document.querySelector('.loader-wrapper');
        loaderWrapper.classList.add('hidden');
        setTimeout(() => {
            loaderWrapper.style.display = 'none';
        }, 800);
    }, 1500);

    // 初始化所有功能
    initThreeJsBackground();
    initScrollAnimation();
    initNavigation();
    initSideMenu();
    initCursorEffect();
    initFloatingElements();
});

// ===== 导航功能 =====
function initNavigation() {
    const nav = document.querySelector('.main-nav');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-link');

    // 滚动时改变导航栏样式
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // 汉堡菜单点击事件
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // 导航链接点击事件
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// ===== 滚动动画 =====
function initScrollAnimation() {
    // 使用GSAP的ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // 为页面各部分添加滚动触发动画
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        // 为每个section的标题添加动画
        const header = section.querySelector('.section-header');
        if (header) {
            gsap.from(header, {
                y: 50,
                opacity: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: header,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            });
        }
    });

    // 为特性卡片添加动画
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        gsap.from(card, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.2,
            scrollTrigger: {
                trigger: '.features-grid',
                start: 'top 70%',
                toggleActions: 'play none none none'
            }
        });
    });

    // 为项目卡片添加动画
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        gsap.from(card, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.2,
            scrollTrigger: {
                trigger: '.projects-showcase',
                start: 'top 70%',
                toggleActions: 'play none none none'
            }
        });
    });

    // 联系表单动画
    const contactForm = document.querySelector('.contact-form');
    const contactInfo = document.querySelector('.contact-info');
    if (contactForm && contactInfo) {
        gsap.from(contactForm, {
            x: -50,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                trigger: '.contact-container',
                start: 'top 70%',
                toggleActions: 'play none none none'
            }
        });
        
        gsap.from(contactInfo, {
            x: 50,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                trigger: '.contact-container',
                start: 'top 70%',
                toggleActions: 'play none none none'
            }
        });
    }
}

// ===== 侧边菜单功能 =====
function initSideMenu() {
    const sideMenuItems = document.querySelectorAll('.side-menu-item');
    const sections = document.querySelectorAll('section');

    // 滚动时更新活动状态
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        sideMenuItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-section') === current) {
                item.classList.add('active');
            }
        });
    });

    // 点击导航到对应部分
    sideMenuItems.forEach(item => {
        item.addEventListener('click', () => {
            const section = document.getElementById(item.getAttribute('data-section'));
            window.scrollTo({
                top: section.offsetTop,
                behavior: 'smooth'
            });
        });
    });
}

// ===== 鼠标跟随效果 =====
function initCursorEffect() {
    const cursor = document.querySelector('.cursor-follower');
    const cursorDot = document.querySelector('.cursor-dot');
    
    if (!cursor || !cursorDot) return;

    document.addEventListener('mousemove', e => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.3
        });
        
        gsap.to(cursorDot, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1
        });
    });

    // 链接和按钮的悬停效果
    const hoverElements = document.querySelectorAll('a, button, .project-card, .feature-card');
    
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.width = '60px';
            cursor.style.height = '60px';
            cursor.style.borderWidth = '3px';
            cursor.style.borderColor = 'var(--secondary-color)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.width = '40px';
            cursor.style.height = '40px';
            cursor.style.borderWidth = '2px';
            cursor.style.borderColor = 'var(--primary-color)';
        });
    });
}

// ===== 悬浮元素动画 =====
function initFloatingElements() {
    const floatElements = document.querySelectorAll('.float-element');
    
    // 鼠标移动时添加额外的悬浮效果
    document.addEventListener('mousemove', e => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        floatElements.forEach(element => {
            const speed = element.getAttribute('data-speed') || 1;
            const x = (mouseX - 0.5) * speed * 20;
            const y = (mouseY - 0.5) * speed * 20;
            
            gsap.to(element, {
                x: x,
                y: y,
                duration: 1
            });
        });
    });
}

// ===== Three.js 3D背景 =====
function initThreeJsBackground() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;

    // 创建场景、相机和渲染器
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
        canvas: canvas,
        alpha: true,
        antialias: true
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // 创建粒子系统
    const particlesCount = 3000;
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);
    
    const colorOptions = [
        new THREE.Color(0x6c63ff), // 主色
        new THREE.Color(0xff6584), // 次色
        new THREE.Color(0x2cdaba)  // 强调色
    ];

    // 设置每个粒子的位置和颜色
    for (let i = 0; i < particlesCount; i++) {
        // 随机位置
        positions[i * 3] = (Math.random() - 0.5) * 10;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
        
        // 随机颜色
        const color = colorOptions[Math.floor(Math.random() * colorOptions.length)];
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
    }
    
    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    // 创建粒子材质
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.02,
        vertexColors: true,
        transparent: true,
        opacity: 0.8
    });

    // 创建粒子系统
    const particleSystem = new THREE.Points(particles, particlesMaterial);
    scene.add(particleSystem);

    // 设置相机位置
    camera.position.z = 5;

    // 窗口大小改变时调整
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // 添加鼠标交互
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    document.addEventListener('mousemove', event => {
        mouseX = (event.clientX - windowHalfX);
        mouseY = (event.clientY - windowHalfY);
    });

    // 渲染循环
    function animate() {
        requestAnimationFrame(animate);
        
        targetX = mouseX * 0.001;
        targetY = mouseY * 0.001;
        
        particleSystem.rotation.x += 0.002;
        particleSystem.rotation.y += 0.002;
        
        particleSystem.rotation.x += (targetY - particleSystem.rotation.x) * 0.05;
        particleSystem.rotation.y += (targetX - particleSystem.rotation.y) * 0.05;
        
        renderer.render(scene, camera);
    }
    
    animate();
}

// ===== 表单提交 =====
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', e => {
        e.preventDefault();
        
        // 模拟表单提交
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = '发送中...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert('消息已发送成功！我们会尽快回复您。');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
} 