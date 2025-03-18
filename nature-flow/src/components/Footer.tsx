import React from 'react';

const Footer = () => {
  // 获取当前年份
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white py-12 relative z-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Logo和简介 */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center mr-3">
                <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.5 8C15.5 6 12 5 12 5C12 5 8.5 6 6.5 8C4.5 10 4 15 4 15C4 15 9 16 12 19C15 16 20 15 20 15C20 15 19.5 10 17.5 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 5C12 5 11 1 7 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="font-display font-bold text-xl">
                <span className="text-dark">自然</span>
                <span className="nature-text">流动</span>
              </div>
            </div>
            <p className="text-dark-light mb-6 max-w-md">
              将自然界的美学与现代科技融合，创造令人难忘的沉浸式数字体验。让每一次交互都如同自然般流畅与和谐。
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-dark-light hover:bg-primary/10 hover:text-primary transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-dark-light hover:bg-primary/10 hover:text-primary transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-dark-light hover:bg-primary/10 hover:text-primary transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.046 6.2c-.25-1.058-1.03-1.864-2.025-2.117C18.26 3.62 12 3.62 12 3.62s-6.26 0-8.02.463c-.995.253-1.776 1.06-2.025 2.117C1.51 8.042 1.51 12 1.51 12s0 3.958.445 5.8c.25 1.058 1.03 1.864 2.025 2.117C5.74 20.38 12 20.38 12 20.38s6.26 0 8.02-.463c.995-.253 1.776-1.06 2.025-2.117.445-1.842.445-5.8.445-5.8s0-3.958-.445-5.8zm-11.92 9.384V8.416l5.364 3.584-5.364 3.584z"/>
                </svg>
              </a>
            </div>
          </div>
          
          {/* 快速链接 */}
          <div>
            <h3 className="text-lg font-display font-bold mb-4">快速链接</h3>
            <ul className="space-y-2">
              <li><a href="#home" className="text-dark-light hover:text-primary transition-colors">首页</a></li>
              <li><a href="#features" className="text-dark-light hover:text-primary transition-colors">特性</a></li>
              <li><a href="#projects" className="text-dark-light hover:text-primary transition-colors">项目</a></li>
              <li><a href="#contact" className="text-dark-light hover:text-primary transition-colors">联系我们</a></li>
            </ul>
          </div>
          
          {/* 服务 */}
          <div>
            <h3 className="text-lg font-display font-bold mb-4">服务</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-dark-light hover:text-primary transition-colors">UI/UX设计</a></li>
              <li><a href="#" className="text-dark-light hover:text-primary transition-colors">Web开发</a></li>
              <li><a href="#" className="text-dark-light hover:text-primary transition-colors">动效设计</a></li>
              <li><a href="#" className="text-dark-light hover:text-primary transition-colors">品牌设计</a></li>
            </ul>
          </div>
          
          {/* 联系信息 */}
          <div>
            <h3 className="text-lg font-display font-bold mb-4">联系我们</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-primary mt-0.5 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span className="text-dark-light">中国北京市朝阳区自然大厦23层</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-primary mt-0.5 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"></path>
                </svg>
                <span className="text-dark-light">+86 123 4567 8901</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-primary mt-0.5 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <span className="text-dark-light">contact@natureflow.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 mt-8 border-t border-gray-200 text-center text-dark-light">
          <p>© {currentYear} 自然流动. 保留所有权利.</p>
        </div>
      </div>
      
      {/* 叶子装饰 */}
      <div className="absolute right-4 bottom-4 opacity-10 pointer-events-none">
        <svg className="w-24 h-24 text-primary" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" />
        </svg>
      </div>
    </footer>
  );
};

export default Footer; 