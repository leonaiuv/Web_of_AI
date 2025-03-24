'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiTwitter, FiMessageCircle, FiMail, FiGlobe, FiCodepen } from 'react-icons/fi';
import Link from 'next/link';

const Footer = () => {
  const footerLinks = [
    {
      title: '关于我们',
      links: [
        { name: '社区宗旨', href: '/about' },
        { name: '发展历程', href: '/history' },
        { name: '团队成员', href: '/team' },
        { name: '联系我们', href: '/contact' }
      ]
    },
    {
      title: '资源',
      links: [
        { name: '开源项目', href: '/projects' },
        { name: '学习资料', href: '/resources' },
        { name: '社区文档', href: '/docs' },
        { name: 'API接口', href: '/api' }
      ]
    },
    {
      title: '参与',
      links: [
        { name: '贡献指南', href: '/contribute' },
        { name: '成为会员', href: '/join' },
        { name: '举报问题', href: '/report' },
        { name: '提交反馈', href: '/feedback' }
      ]
    }
  ];
  
  const socialLinks = [
    { icon: <FiGithub />, href: 'https://github.com', label: 'GitHub' },
    { icon: <FiTwitter />, href: 'https://twitter.com', label: 'Twitter' },
    { icon: <FiCodepen />, href: 'https://codepen.io', label: 'CodePen' },
    { icon: <FiGlobe />, href: 'https://discord.com', label: 'Discord' },
    { icon: <FiMail />, href: 'mailto:contact@aicommunity.com', label: 'Email' }
  ];
  
  return (
    <footer className="pt-20 pb-10 relative bg-gradient-to-b from-transparent to-black/60">
      {/* 顶部波浪装饰 */}
      <div className="absolute top-0 left-0 w-full overflow-hidden h-20">
        <svg 
          className="absolute bottom-0 overflow-hidden" 
          xmlns="http://www.w3.org/2000/svg" 
          preserveAspectRatio="none" 
          version="1.1" 
          viewBox="0 0 2560 100" 
          x="0" 
          y="0"
        >
          <polygon 
            className="fill-current text-transparent opacity-20" 
            points="2560 0 2560 100 0 100"
          ></polygon>
        </svg>
      </div>
      
      {/* 主要内容 */}
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-12 mb-16">
          {/* 品牌区域 */}
          <div className="md:col-span-2">
            <Link href="/">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center space-x-2 mb-6"
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
            
            <p className="text-gray-400 mb-6 max-w-md">
              欢迎来到AI数字世界，这里是创新者、开发者和爱好者的家园，我们共同探索AI的无限可能，秉持开源平等的宗旨，共建美好未来。
            </p>
            
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, color: '#00ffaa' }}
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label={link.label}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </div>
          
          {/* 链接区域 */}
          {footerLinks.map((section, index) => (
            <div key={index} className="md:col-span-1">
              <h3 className="text-lg font-semibold text-white mb-6">{section.title}</h3>
              <ul className="space-y-4">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link href={link.href}>
                      <motion.span
                        whileHover={{ x: 5, color: '#00ffaa' }}
                        className="text-gray-400 hover:text-white cursor-pointer transition-colors"
                      >
                        {link.name}
                      </motion.span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          
          {/* 订阅区域 */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold text-white mb-6">订阅更新</h3>
            <p className="text-gray-400 mb-4">获取社区最新动态和AI技术资讯</p>
            <form className="space-y-2">
              <input 
                type="email" 
                placeholder="你的邮箱地址" 
                className="w-full px-4 py-2 rounded-lg bg-gray-900/50 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium"
              >
                订阅
              </motion.button>
            </form>
          </div>
        </div>
        
        {/* 底部版权信息 */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} AI开源社区. 保留所有权利.
          </p>
          <div className="flex space-x-6">
            <Link href="/terms">
              <span className="text-gray-500 hover:text-gray-300 text-sm">使用条款</span>
            </Link>
            <Link href="/privacy">
              <span className="text-gray-500 hover:text-gray-300 text-sm">隐私政策</span>
            </Link>
            <Link href="/cookies">
              <span className="text-gray-500 hover:text-gray-300 text-sm">Cookie政策</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 