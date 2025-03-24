'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiMenu, FiX } from 'react-icons/fi';
import Link from 'next/link';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = [
    { title: '首页', href: '/' },
    { title: '关于我们', href: '/about' },
    { title: '项目展示', href: '/projects' },
    { title: '社区动态', href: '/community' },
    { title: '加入我们', href: '/join' },
  ];

  const menuVariants = {
    open: {
      clipPath: 'circle(1500px at calc(100% - 40px) 40px)',
      transition: {
        type: 'spring',
        stiffness: 20,
        restDelta: 2,
      },
    },
    closed: {
      clipPath: 'circle(30px at calc(100% - 40px) 40px)',
      transition: {
        delay: 0.2,
        type: 'spring',
        stiffness: 400,
        damping: 40,
      },
    },
  };

  const navLinkVariants = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
    closed: {
      y: 50,
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const navItemVariants = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 1000, velocity: -100 },
      },
    },
    closed: {
      y: 50,
      opacity: 0,
      transition: {
        y: { stiffness: 1000 },
      },
    },
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 w-full z-50 py-4 px-6 transition-all duration-300 ${
        scrolled ? 'glass-effect' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ 
                duration: 20, 
                repeat: Infinity, 
                ease: 'linear' 
              }}
              className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center"
            >
              <span className="text-white text-xl font-bold">AI</span>
            </motion.div>
            <h1 className="text-xl font-bold neon-text bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400">
              AI开源社区
            </h1>
          </motion.div>
        </Link>

        {/* 桌面导航 */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link, index) => (
            <Link key={index} href={link.href}>
              <motion.span
                whileHover={{ 
                  scale: 1.1, 
                  color: '#00ffaa',
                  textShadow: '0 0 8px rgba(0, 255, 170, 0.7)' 
                }}
                className="cursor-pointer text-white"
              >
                {link.title}
              </motion.span>
            </Link>
          ))}
          <motion.a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, rotate: 10 }}
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white"
          >
            <FiGithub className="mr-2" />
            GitHub
          </motion.a>
        </div>

        {/* 移动端菜单按钮 */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden z-50 w-10 h-10 flex items-center justify-center rounded-full bg-black/20 backdrop-blur-md text-white"
        >
          {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
        </motion.button>

        {/* 移动端菜单 */}
        <motion.div
          initial={false}
          animate={isOpen ? 'open' : 'closed'}
          variants={menuVariants}
          className="fixed top-0 right-0 bottom-0 w-full md:hidden bg-black/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center"
        >
          <motion.ul
            variants={navLinkVariants}
            className="flex flex-col items-center justify-center space-y-8"
          >
            {navLinks.map((link, index) => (
              <motion.li key={index} variants={navItemVariants}>
                <Link href={link.href}>
                  <span 
                    className="text-2xl font-medium text-white hover:text-cyan-400 transition-colors" 
                    onClick={() => setIsOpen(false)}
                  >
                    {link.title}
                  </span>
                </Link>
              </motion.li>
            ))}
            <motion.li variants={navItemVariants}>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white text-lg"
                onClick={() => setIsOpen(false)}
              >
                <FiGithub className="mr-2" />
                GitHub
              </a>
            </motion.li>
          </motion.ul>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar; 