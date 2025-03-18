import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 监听滚动事件，根据滚动位置改变导航栏样式
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 导航链接
  const navLinks = [
    { id: 'home', text: '首页' },
    { id: 'features', text: '特性' },
    { id: 'projects', text: '项目' },
    { id: 'contact', text: '联系我们' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        isScrolled 
          ? 'py-3 bg-white/80 backdrop-blur-md shadow-sm' 
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center">
            <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center mr-3">
              <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.5 8C15.5 6 12 5 12 5C12 5 8.5 6 6.5 8C4.5 10 4 15 4 15C4 15 9 16 12 19C15 16 20 15 20 15C20 15 19.5 10 17.5 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 5C12 5 11 1 7 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="font-display font-bold text-xl md:text-2xl">
              <span className={`transition-colors duration-300 ${isScrolled ? 'text-dark' : 'text-dark'}`}>自然</span>
              <span className="nature-text">流动</span>
            </div>
          </a>

          {/* 桌面导航 */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`font-medium text-sm transition-colors duration-300 hover:text-primary ${
                  isScrolled ? 'text-dark' : 'text-dark'
                }`}
              >
                {link.text}
              </a>
            ))}
            <a 
              href="#contact" 
              className="nature-btn"
            >
              开始体验
            </a>
          </nav>

          {/* 移动端菜单按钮 */}
          <button 
            className="md:hidden flex items-center"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className={`w-8 h-8 flex flex-col justify-center items-center transition-all duration-300 ${isMenuOpen ? 'rotate-90' : ''}`}>
              <span className={`block w-6 h-0.5 bg-primary transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'}`}></span>
              <span className={`block w-6 h-0.5 bg-primary transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
              <span className={`block w-6 h-0.5 bg-primary transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'}`}></span>
            </div>
          </button>
        </div>
      </div>

      {/* 移动端菜单 */}
      <motion.div 
        className={`md:hidden absolute w-full bg-white/90 backdrop-blur-md shadow-lg transition-all duration-300 overflow-hidden`}
        animate={{
          height: isMenuOpen ? 'auto' : 0,
          opacity: isMenuOpen ? 1 : 0,
        }}
        initial={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="container mx-auto px-4 py-4">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className="font-medium text-dark hover:text-primary transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.text}
              </a>
            ))}
            <a 
              href="#contact" 
              className="nature-btn text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              开始体验
            </a>
          </nav>
        </div>
      </motion.div>
    </header>
  );
};

export default Navbar; 