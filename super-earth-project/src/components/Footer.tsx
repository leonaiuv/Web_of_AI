import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-12 bg-dark relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <Link href="/" className="inline-block">
              <h3 className="text-2xl font-mono font-bold earth-text earth-glow">超级地球</h3>
            </Link>
            <p className="mt-4 text-gray-300 text-sm">
              超级地球项目致力于通过创新技术和可持续发展理念，构建人类与自然和谐共生的未来。
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <span className="sr-only">微博</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5.5 7.5h-1.5c-.55 0-1-.45-1-1V8c0-.55.45-1 1-1h1.5c.55 0 1 .45 1 1v.5c0 .55-.45 1-1 1zm-10 5.5V9c0-.55.45-1 1-1h3c.55 0 1 .45 1 1v1h1.5c.55 0 1 .45 1 1v4c0 .55-.45 1-1 1h-5c-.55 0-1-.45-1-1V15h-.5c-.55 0-1-.45-1-1zm2-4v3h3v-3h-3z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <span className="sr-only">微信</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-12h2v4h-2zm0 6h2v2h-2z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <span className="sr-only">知乎</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm7 12.6L9.2 9h1.6l2.8 6.6h-1.6zm5-3.6h-3.6v-1.6H17v1.6z" />
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">探索</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="text-gray-300 hover:text-primary transition-colors">首页</Link></li>
              <li><Link href="#ecosystem" className="text-gray-300 hover:text-primary transition-colors">生态系统</Link></li>
              <li><Link href="#technology" className="text-gray-300 hover:text-primary transition-colors">绿色科技</Link></li>
              <li><Link href="#projects" className="text-gray-300 hover:text-primary transition-colors">可持续项目</Link></li>
              <li><Link href="#contact" className="text-gray-300 hover:text-primary transition-colors">联系我们</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">资源</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-300 hover:text-primary transition-colors">下载中心</a></li>
              <li><a href="#" className="text-gray-300 hover:text-primary transition-colors">新闻公告</a></li>
              <li><a href="#" className="text-gray-300 hover:text-primary transition-colors">研究报告</a></li>
              <li><a href="#" className="text-gray-300 hover:text-primary transition-colors">可持续发展目标</a></li>
              <li><a href="#" className="text-gray-300 hover:text-primary transition-colors">常见问题</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">订阅通讯</h4>
            <p className="text-gray-300 text-sm mb-4">订阅我们的电子通讯，获取项目最新动态。</p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="您的邮箱地址" 
                className="p-2 text-sm flex-grow bg-dark-light border border-white/10 rounded-l focus:outline-none focus:border-primary"
                required
              />
              <motion.button
                type="submit"
                className="bg-primary px-4 text-sm font-bold rounded-r hover:bg-primary/90 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                订阅
              </motion.button>
            </form>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {currentYear} 超级地球项目 保留所有权利
          </div>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-primary transition-colors">隐私政策</a>
            <a href="#" className="text-gray-400 hover:text-primary transition-colors">服务条款</a>
            <a href="#" className="text-gray-400 hover:text-primary transition-colors">Cookie政策</a>
          </div>
        </div>
      </div>
      
      {/* 背景装饰 */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
    </footer>
  );
};

export default Footer; 