import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-dark flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="ai-card p-8 w-full max-w-md"
      >
        <h1 className="text-3xl font-bold mb-6 ai-text">用户登录</h1>
        <form className="space-y-4">
          <input 
            type="email" 
            placeholder="邮箱地址"
            className="ai-input w-full"
          />
          <input
            type="password"
            placeholder="密码"
            className="ai-input w-full"
          />
          <button className="btn-primary w-full">登录</button>
        </form>
        <div className="mt-4 text-center">
          <span className="text-gray-400">没有账号？</span>
          <Link href="/register" className="text-primary-400 hover:underline">
            立即注册
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;