import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // 监听滚动事件
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // 导航链接数据
  const navLinks = [
    { title: '首页', href: '/' },
    { title: '探索', href: '#explore' },
    { title: '精选应用', href: '#featured' },
    { title: '分享', href: '#share' },
    { title: '关于', href: '#about' },
  ];
  
  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-dark-light bg-opacity-80 backdrop-blur-md py-2 shadow-lg' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
              <span className="text-white font-bold text-xl">AI</span>
            </div>
            <span className="text-2xl font-bold ai-text">AI空间</span>
          </Link>
          
          {/* 桌面导航栏 */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <Link 
                href={link.href} 
                key={index}
                className="nav-link text-base font-medium"
              >
                {link.title}
              </Link>
            ))}
            
            {/* 登录按钮 */}
            <div className="ml-4 flex items-center space-x-4">
              <Link href="/login" className="text-white hover:text-primary-400">
                登录
              </Link>
              <Link href="/register" className="btn-primary">
                注册
              </Link>
            </div>
          </nav>
          
          {/* 移动端菜单按钮 */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white focus:outline-none"
            >
              <div className="w-6 h-6 flex flex-col justify-between">
                <motion.span 
                  animate={isMobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                  className="w-full h-0.5 bg-white transform origin-left"
                />
                <motion.span 
                  animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="w-full h-0.5 bg-white"
                />
                <motion.span 
                  animate={isMobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                  className="w-full h-0.5 bg-white transform origin-left"
                />
              </div>
            </button>
          </div>
        </div>
      </div>
      
      {/* 移动端菜单 */}
      <motion.div 
        className="md:hidden"
        initial={{ opacity: 0, height: 0 }}
        animate={{ 
          opacity: isMobileMenuOpen ? 1 : 0, 
          height: isMobileMenuOpen ? 'auto' : 0
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="container mx-auto px-4 py-4 bg-dark-light bg-opacity-90 backdrop-blur-md">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link, index) => (
              <Link 
                href={link.href} 
                key={index}
                className="text-white hover:text-primary-400 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.title}
              </Link>
            ))}
            
            <div className="pt-4 flex flex-col space-y-3">
              <Link 
                href="/login" 
                className="w-full py-2 text-center text-white border border-white rounded-md hover:bg-white hover:text-dark transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                登录
              </Link>
              <Link 
                href="/register" 
                className="w-full py-2 text-center bg-gradient-to-r from-primary-500 to-secondary-500 rounded-md text-white"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                注册
              </Link>
            </div>
          </nav>
        </div>
      </motion.div>
    </header>
  );
};

export default Navbar; 