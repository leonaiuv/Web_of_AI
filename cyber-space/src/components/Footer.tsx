import React from 'react';
import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    {
      title: '公司',
      links: [
        { name: '关于我们', href: '#' },
        { name: '团队', href: '#' },
        { name: '招聘', href: '#' },
        { name: '联系我们', href: '#contact' }
      ]
    },
    {
      title: '服务',
      links: [
        { name: 'VR开发', href: '#' },
        { name: 'AR应用', href: '#' },
        { name: '人工智能', href: '#' },
        { name: '数字体验', href: '#' }
      ]
    },
    {
      title: '资源',
      links: [
        { name: '博客', href: '#' },
        { name: '文档', href: '#' },
        { name: '案例研究', href: '#' },
        { name: '常见问题', href: '#' }
      ]
    }
  ];

  return (
    <footer className="bg-dark-light/50 border-t border-white/10 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <span className="text-3xl font-mono font-bold cyber-text">赛博空间</span>
            </Link>
            <p className="text-gray-400 mb-6 max-w-md">
              探索未来科技的赛博空间，我们致力于创造沉浸式数字体验，融合前沿技术与未来设计美学。
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full border border-primary/50 flex items-center justify-center hover:bg-primary/20 transition-colors duration-300">
                <span className="sr-only">微博</span>
                微
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-primary/50 flex items-center justify-center hover:bg-primary/20 transition-colors duration-300">
                <span className="sr-only">微信</span>
                信
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-primary/50 flex items-center justify-center hover:bg-primary/20 transition-colors duration-300">
                <span className="sr-only">抖音</span>
                抖
              </a>
            </div>
          </div>
          
          {footerLinks.map((column, i) => (
            <div key={i}>
              <h3 className="text-lg font-bold mb-4">{column.title}</h3>
              <ul className="space-y-2">
                {column.links.map((link, j) => (
                  <li key={j}>
                    <a 
                      href={link.href} 
                      className="text-gray-400 hover:text-primary transition-colors duration-300"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {currentYear} 赛博空间科技有限公司. 保留所有权利.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-500 text-sm hover:text-primary transition-colors duration-300">
              隐私政策
            </a>
            <a href="#" className="text-gray-500 text-sm hover:text-primary transition-colors duration-300">
              服务条款
            </a>
            <a href="#" className="text-gray-500 text-sm hover:text-primary transition-colors duration-300">
              Cookie 设置
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 