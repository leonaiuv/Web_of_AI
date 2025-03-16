
/**
 * Navbar组件 - 响应式导航栏
 * 
 * 特性：
 * - 响应式设计：支持桌面端和移动端显示
 * - 滚动感知：根据滚动位置改变样式和激活状态
 * - 平滑动画：使用framer-motion实现流畅的过渡效果
 * - 玻璃态设计：滚动时应用磨砂玻璃效果
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

// 导航项配置
const navItems = [
  { name: '首页', href: '#home' },
  { name: 'AI导航', href: '#services' },
  { name: '关于我们', href: '#about' },
  { name: '作品', href: '#portfolio' },
  { name: '联系我们', href: '#contact' },
];

const Navbar: React.FC = () => {
  // ===== 状态控制 =====
  // 控制移动端菜单的开关状态
  const [isOpen, setIsOpen] = useState(false);
  // 记录页面的滚动位置，用于控制导航栏样式变化
  const [scrollPosition, setScrollPosition] = useState(0);
  // 当前激活的导航部分，用于控制导航项高亮和底部光条
  const [activeSection, setActiveSection] = useState('home');

  // ===== 滚动监听逻辑 =====
  useEffect(() => {
    const handleScroll = () => {
      // 更新滚动位置
      setScrollPosition(window.scrollY);
      
      // 根据滚动位置更新激活的导航项
      // 遍历所有带id的section元素，计算它们的位置
      const sections = document.querySelectorAll('section[id]');
      sections.forEach(section => {
        const sectionTop = (section as HTMLElement).offsetTop - 100; // 设置偏移量，提前激活
        const sectionHeight = (section as HTMLElement).offsetHeight;
        const sectionId = section.getAttribute('id') || '';
        
        // 当滚动位置在某个section的范围内时，将其设为激活状态
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };
    
    // 添加滚动事件监听器
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollPosition]);

  // ===== 动画变体配置 =====
  // 导航栏整体动画配置
  const navVariants = {
    hidden: { opacity: 0, y: -50 }, // 初始隐藏状态：透明且向上偏移50px
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5, // 动画持续0.5秒
        staggerChildren: 0.1, // 子元素动画间隔0.1秒
      },
    },
  };

  // 导航项动画配置
  const itemVariants = {
    hidden: { opacity: 0, y: -20 }, // 初始隐藏状态：透明且向上偏移20px
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: 'spring', // 使用弹簧动画
        stiffness: 300, // 弹簧刚度：控制弹性强度
        damping: 24, // 弹簧阻尼：控制弹性衰减
      }
    },
  };
  
  // 移动端菜单动画配置
  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        when: "afterChildren", // 关闭时：先执行子元素动画，再执行父元素动画
        staggerChildren: 0.05, // 子元素动画间隔0.05秒
        staggerDirection: -1, // 反向执行子元素动画（从下到上）
      },
    },
    open: {
      opacity: 1,
      height: 'auto',
      transition: {
        when: "beforeChildren", // 打开时：先执行父元素动画，再执行子元素动画
        staggerChildren: 0.05, // 子元素动画间隔0.05秒
        delayChildren: 0.15, // 子元素动画延迟0.15秒开始
      },
    },
  };
  
  // 移动端菜单项动画配置
  const mobileItemVariants = {
    closed: { opacity: 0, x: -50 }, // 关闭状态：透明且向左偏移50px
    open: { opacity: 1, x: 0 }, // 打开状态：完全显示且回到原位
  };

  return (
    <>
      {/* ===== 桌面端导航栏 ===== */}
      <motion.nav
        className={`hidden md:flex fixed w-full z-50 justify-between items-center px-10 py-5 ${
          scrollPosition > 50 ? 'glass-morphism' : 'bg-transparent'
        } smooth-transition`}
        initial="hidden"
        animate="visible"
        variants={navVariants}
      >
        {/* Logo部分：悬停时放大，点击时缩小 */}
        <Link href="#home">
          <motion.div 
            className="text-xl font-bold neon-glow gradient-text hover-effect"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            A-A-E-C
          </motion.div>
        </Link>

        {/* 导航项列表：使用variants实现连锁动画 */}
        <motion.ul className="flex space-x-8" variants={navVariants}>
          {navItems.map((item) => (
            <motion.li key={item.name} variants={itemVariants}>
              <Link href={item.href}>
                <span 
                  className={`relative py-2 px-1 text-white hover-effect ${
                    activeSection === item.href.substring(1) ? 'gradient-text font-bold' : ''
                  }`}
       
                >
                  {item.name}
                  {/* 底部光条：使用layoutId实现平滑过渡 */}
                  {activeSection === item.href.substring(1) && (
                    <motion.span
                      className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-blue-500"
                      layoutId="activeSection"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </span>
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      </motion.nav>

      {/* ===== 移动端导航栏 ===== */}
      <motion.nav
        className={`md:hidden fixed w-full z-50 ${
          scrollPosition > 50 ? 'glass-morphism' : 'bg-transparent'
        } smooth-transition`}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* 顶部栏：Logo和汉堡菜单按钮 */}
        <div className="flex justify-between items-center px-5 py-4">
          {/* Logo：悬停放大，点击缩小 */}
          <Link href="#home">
            <motion.div 
              className="text-xl font-bold gradient-text"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              A-A-E-C
            </motion.div>
          </Link>

          {/* 汉堡菜单按钮：点击时变形为X */}
          <motion.button
            className="relative w-10 h-10 focus:outline-none hover-effect"
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.9 }}
          >
            <span className="sr-only">Toggle menu</span>
            {/* 顶部线条：旋转45度 */}
            <motion.div
              className="absolute w-6 h-0.5 bg-white rounded-full"
              animate={{
                rotate: isOpen ? 45 : 0,
                y: isOpen ? 8 : 0,
              }}
              transition={{ duration: 0.2 }}
              style={{ top: '35%', left: '20%' }}
            />
            {/* 中间线条：淡出 */}
            <motion.div
              className="absolute w-6 h-0.5 bg-white rounded-full"
              animate={{
                opacity: isOpen ? 0 : 1,
              }}
              transition={{ duration: 0.2 }}
              style={{ top: '50%', left: '20%' }}
            />
            {/* 底部线条：旋转-45度 */}
            <motion.div
              className="absolute w-6 h-0.5 bg-white rounded-full"
              animate={{
                rotate: isOpen ? -45 : 0,
                y: isOpen ? -8 : 0,
              }}
              transition={{ duration: 0.2 }}
              style={{ top: '65%', left: '20%' }}
            />
          </motion.button>
        </div>

        {/* 移动端折叠菜单：使用AnimatePresence处理进出场动画 */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="overflow-hidden glass-morphism"
              initial="closed"
              animate="open"
              exit="closed"
              variants={mobileMenuVariants}
            >
              {/* 移动端菜单列表：垂直排列的导航项 */}
              <motion.ul className="px-5 py-4 space-y-4">
                {navItems.map((item) => (
                  <motion.li 
                    key={item.name}
                    variants={mobileItemVariants}
                    whileHover={{ x: 5 }} // 悬停时向右移动5px
                    whileTap={{ scale: 0.95 }} // 点击时缩小到95%
                  >
                    <Link href={item.href} onClick={() => setIsOpen(false)}>
                      <span 
                        className={`block py-2 pl-3 border-l-4 ${
                          activeSection === item.href.substring(1)
                            ? 'border-purple-500 gradient-text font-bold' // 激活状态：左边框紫色，文字渐变
                            : 'border-transparent' // 非激活状态：透明边框
                        }`}
                      >
                        {item.name}
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

export default Navbar; 