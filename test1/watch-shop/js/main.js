// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 初始化加载动画
    initLoader();
    
    // 初始化自定义光标
    initCustomCursor();
    
    // 初始化导航栏效果
    initNavigation();
    
    // 初始化产品滑块
    initProductSlider();
    
    // 初始化滚动动画
    initScrollAnimations();
    
    // 初始化产品介绍点交互
    initProductPoints();
    
    // 初始化产品卡片颜色效果
    initProductCardColors();
    
    // 初始化产品手表3D旋转效果
    initWatch3DEffect();
});

// 加载动画
function initLoader() {
    const loader = document.querySelector('.loader');
    
    // 模拟加载时间
    setTimeout(() => {
        loader.style.opacity = '0';
        loader.style.visibility = 'hidden';
        
        // 加载完成后激活首屏动画
        document.querySelector('.hero-content').style.animation = 'slideIn 1s forwards';
        document.querySelector('.watch-showcase').style.animation = 'floatUp 1s forwards 0.3s';
    }, 2000);
}

// 自定义光标
function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    // 鼠标移入交互元素时的效果
    const interactiveElements = document.querySelectorAll('a, button, .watch-card, .point-dot');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursor.style.mixBlendMode = 'difference';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.mixBlendMode = 'difference';
        });
    });
    
    // 鼠标点击效果
    document.addEventListener('mousedown', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
    });
    
    document.addEventListener('mouseup', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    });
}

// 导航栏效果
function initNavigation() {
    const header = document.querySelector('header');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // 滚动时导航栏效果
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // 导航链接点击效果
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                const targetSection = document.querySelector(targetId);
                
                window.scrollTo({
                    top: targetSection.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 产品滑块
function initProductSlider() {
    const slider = document.querySelector('.watch-slider');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    const pageDots = document.querySelectorAll('.pagination-dot');
    const cards = document.querySelectorAll('.watch-card');
    
    let currentIndex = 0;
    
    // 下一张
    nextBtn.addEventListener('click', () => {
        if (currentIndex < cards.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateSlider();
    });
    
    // 上一张
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = cards.length - 1;
        }
        updateSlider();
    });
    
    // 分页点击
    pageDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateSlider();
        });
    });
    
    // 更新滑块位置和分页状态
    function updateSlider() {
        const cardWidth = cards[0].offsetWidth;
        const gap = 32; // 2rem = 32px
        
        slider.scrollTo({
            left: currentIndex * (cardWidth + gap),
            behavior: 'smooth'
        });
        
        pageDots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    // 监听滑块滚动事件
    slider.addEventListener('scroll', () => {
        const cardWidth = cards[0].offsetWidth;
        const gap = 32; // 2rem = 32px
        
        const scrollPos = slider.scrollLeft;
        const newIndex = Math.round(scrollPos / (cardWidth + gap));
        
        if (newIndex !== currentIndex) {
            currentIndex = newIndex;
            
            pageDots.forEach((dot, index) => {
                if (index === currentIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }
    });
}

// 滚动动画
function initScrollAnimations() {
    // 添加reveal类到希望有动画的元素
    const sections = document.querySelectorAll('section:not(.hero)');
    const footerContent = document.querySelector('.footer-content');
    
    sections.forEach(section => {
        section.classList.add('reveal');
    });
    
    if (footerContent) {
        footerContent.classList.add('reveal');
    }
    
    // 滚动时触发动画
    function revealElements() {
        const reveals = document.querySelectorAll('.reveal');
        
        reveals.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', revealElements);
    
    // 初始触发一次
    revealElements();
}

// 产品介绍点交互
function initProductPoints() {
    const detailPoints = document.querySelectorAll('.detail-point');
    
    detailPoints.forEach(point => {
        const dot = point.querySelector('.point-dot');
        const info = point.querySelector('.point-info');
        
        // 移动端支持触摸
        dot.addEventListener('touchstart', function(e) {
            e.preventDefault();
            togglePointInfo(info);
        });
        
        // 点击显示/隐藏
        dot.addEventListener('click', function() {
            togglePointInfo(info);
        });
    });
    
    function togglePointInfo(info) {
        if (info.style.opacity === '1') {
            info.style.opacity = '0';
            info.style.visibility = 'hidden';
            info.style.transform = 'translateY(10px)';
        } else {
            info.style.opacity = '1';
            info.style.visibility = 'visible';
            info.style.transform = 'translateY(0)';
        }
    }
}

// 产品卡片颜色效果
function initProductCardColors() {
    const cards = document.querySelectorAll('.watch-card');
    
    cards.forEach(card => {
        const bgColor = card.getAttribute('data-color');
        const cardVisual = card.querySelector('.card-visual');
        
        if (bgColor && cardVisual) {
            cardVisual.style.backgroundColor = bgColor;
        }
        
        // 悬停时添加轻微3D倾斜效果
        card.addEventListener('mousemove', function(e) {
            const cardRect = this.getBoundingClientRect();
            const cardCenterX = cardRect.left + cardRect.width / 2;
            const cardCenterY = cardRect.top + cardRect.height / 2;
            
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            
            const angleY = (mouseX - cardCenterX) / 20;
            const angleX = (cardCenterY - mouseY) / 20;
            
            this.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateY(-10px)`;
        });
        
        // 离开时恢复
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

// 3D手表旋转效果
function initWatch3DEffect() {
    const heroWatch = document.getElementById('featured-watch');
    
    if (heroWatch) {
        const watchContainer = heroWatch.parentElement;
        
        watchContainer.addEventListener('mousemove', function(e) {
            const containerRect = this.getBoundingClientRect();
            const containerCenterX = containerRect.left + containerRect.width / 2;
            const containerCenterY = containerRect.top + containerRect.height / 2;
            
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            
            const angleY = (mouseX - containerCenterX) / 15;
            const angleX = (containerCenterY - mouseY) / 15;
            
            heroWatch.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
        });
        
        watchContainer.addEventListener('mouseleave', function() {
            heroWatch.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    }
    
    // 3D手表展示区域
    const rotateContainer = document.querySelector('.watch-rotate-container');
    
    if (rotateContainer) {
        rotateContainer.addEventListener('mousemove', function(e) {
            const containerRect = this.getBoundingClientRect();
            const mouseX = e.clientX - containerRect.left;
            
            // 计算鼠标位置相对于容器的百分比(0~1)
            const percent = mouseX / containerRect.width;
            
            // 根据百分比计算旋转角度(-180~180度)
            const rotation = (percent * 360) - 180;
            
            this.style.transform = `rotateY(${rotation}deg)`;
        });
        
        rotateContainer.addEventListener('mouseleave', function() {
            this.style.transform = 'rotateY(0deg)';
        });
    }
}

// 添加购物车交互
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn-add-cart')) {
        e.preventDefault();
        
        // 获取当前购物车数量
        const cartCount = document.querySelector('.cart-count');
        let currentCount = parseInt(cartCount.textContent);
        
        // 更新购物车数量
        cartCount.textContent = currentCount + 1;
        
        // 添加购物车反馈动画
        const btn = e.target;
        btn.textContent = '已加入';
        btn.style.backgroundColor = 'var(--highlight)';
        
        // 创建浮动元素
        const floatingEl = document.createElement('div');
        floatingEl.classList.add('floating-item');
        floatingEl.innerHTML = '<i class="fas fa-check"></i>';
        
        // 获取按钮位置
        const btnRect = btn.getBoundingClientRect();
        
        // 定位浮动元素
        floatingEl.style.position = 'fixed';
        floatingEl.style.left = `${btnRect.left + btnRect.width / 2}px`;
        floatingEl.style.top = `${btnRect.top + btnRect.height / 2}px`;
        floatingEl.style.transform = 'translate(-50%, -50%)';
        floatingEl.style.width = '30px';
        floatingEl.style.height = '30px';
        floatingEl.style.backgroundColor = 'var(--highlight)';
        floatingEl.style.color = 'white';
        floatingEl.style.borderRadius = '50%';
        floatingEl.style.display = 'flex';
        floatingEl.style.justifyContent = 'center';
        floatingEl.style.alignItems = 'center';
        floatingEl.style.zIndex = '999';
        floatingEl.style.opacity = '1';
        floatingEl.style.transition = 'all 0.8s cubic-bezier(0.215, 0.610, 0.355, 1.000)';
        
        document.body.appendChild(floatingEl);
        
        // 获取购物车图标位置
        const cartIcon = document.querySelector('.icon-link .fa-shopping-bag');
        const cartRect = cartIcon.getBoundingClientRect();
        
        // 动画移动浮动元素到购物车
        setTimeout(() => {
            floatingEl.style.left = `${cartRect.left + cartRect.width / 2}px`;
            floatingEl.style.top = `${cartRect.top + cartRect.height / 2}px`;
            floatingEl.style.opacity = '0';
            floatingEl.style.transform = 'translate(-50%, -50%) scale(0.5)';
        }, 10);
        
        // 动画结束后移除浮动元素
        setTimeout(() => {
            document.body.removeChild(floatingEl);
            
            // 恢复按钮状态
            setTimeout(() => {
                btn.textContent = '加入购物车';
                btn.style.backgroundColor = '';
            }, 1000);
        }, 800);
    }
});

// 订阅表单交互
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const input = this.querySelector('input');
        const email = input.value.trim();
        
        if (email && validateEmail(email)) {
            // 成功订阅动画
            const btn = this.querySelector('button');
            const originalText = btn.textContent;
            
            btn.innerHTML = '<i class="fas fa-check"></i> 订阅成功';
            btn.style.backgroundColor = 'var(--highlight)';
            
            input.value = '';
            input.disabled = true;
            btn.disabled = true;
            
            // 恢复表单状态
            setTimeout(() => {
                input.disabled = false;
                btn.disabled = false;
                btn.textContent = originalText;
                btn.style.backgroundColor = '';
            }, 3000);
        }
    });
}

// 邮箱验证
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// 首页视差滚动效果
window.addEventListener('scroll', function() {
    const scrolled = window.scrollY;
    
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        const decorativeCircle = heroSection.querySelector('.decorative-circle');
        if (decorativeCircle) {
            decorativeCircle.style.transform = `translateY(calc(-50% + ${scrolled * 0.1}px))`;
        }
    }
}); 