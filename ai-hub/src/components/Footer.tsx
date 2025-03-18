import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-dark-light relative overflow-hidden">
      {/* 顶部波浪装饰 */}
      <div className="absolute top-0 left-0 w-full overflow-hidden rotate-180">
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="w-full h-12 md:h-20 text-dark"
        >
          <path 
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
            opacity=".25" 
            fill="currentColor"
          />
          <path 
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" 
            opacity=".5" 
            fill="currentColor"
          />
          <path 
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" 
            fill="currentColor"
          />
        </svg>
      </div>
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
                <span className="text-white font-bold text-xl">AI</span>
              </div>
              <span className="text-2xl font-bold ai-text">AI空间</span>
            </Link>
            <p className="text-gray-400 mb-4">
              连接人类与AI的桥梁，探索智能未来
            </p>
            
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path></svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M7.8 2h8.4c3.197 0 5.8 2.603 5.8 5.8v8.4c0 3.197-2.603 5.8-5.8 5.8h-8.4c-3.197 0-5.8-2.603-5.8-5.8v-8.4c0-3.197 2.603-5.8 5.8-5.8zm4.2 5.5c-2.486 0-4.5 2.014-4.5 4.5s2.014 4.5 4.5 4.5 4.5-2.014 4.5-4.5-2.014-4.5-4.5-4.5zm0 1.8c1.491 0 2.7 1.209 2.7 2.7s-1.209 2.7-2.7 2.7-2.7-1.209-2.7-2.7 1.209-2.7 2.7-2.7zm5.2-3.3c0 .44-.358.8-.8.8s-.8-.36-.8-.8.358-.8.8-.8.8.36.8.8.8z"></path></svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">探索</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">所有应用</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">最新上线</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">推荐榜单</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">AI教程</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">关于我们</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">团队介绍</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">愿景与使命</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">加入我们</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">联系方式</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">订阅最新动态</h3>
            <p className="text-gray-400 mb-4">获取AI领域的最新进展和应用推荐</p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="您的邮箱地址" 
                className="ai-input flex-grow bg-dark border-r-0 rounded-r-none"
                required
              />
              <button 
                type="submit" 
                className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-r-lg transition-colors"
              >
                订阅
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 mt-8 text-sm text-gray-500">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>© 2023 AI空间. 保留所有权利.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">隐私政策</a>
              <a href="#" className="hover:text-white transition-colors">使用条款</a>
              <a href="#" className="hover:text-white transition-colors">Cookie设置</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 