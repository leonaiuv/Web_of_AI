import React, { useState } from 'react';
import { motion } from 'framer-motion';

// 表单字段接口
interface FormFields {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// 表单错误接口
interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const Contact = () => {
  // 表单状态
  const [formData, setFormData] = useState<FormFields>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  // 错误状态
  const [errors, setErrors] = useState<FormErrors>({});
  
  // 提交状态
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  // 处理输入变化
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // 更新表单数据
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // 清除该字段的错误
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };
  
  // 验证表单
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    // 验证姓名
    if (!formData.name.trim()) {
      newErrors.name = '请输入您的姓名';
    }
    
    // 验证邮箱
    if (!formData.email.trim()) {
      newErrors.email = '请输入您的邮箱';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '请输入有效的邮箱地址';
    }
    
    // 验证主题
    if (!formData.subject.trim()) {
      newErrors.subject = '请选择一个主题';
    }
    
    // 验证消息
    if (!formData.message.trim()) {
      newErrors.message = '请输入您的消息';
    }
    
    // 设置错误状态
    setErrors(newErrors);
    
    // 如果没有错误，返回true
    return Object.keys(newErrors).length === 0;
  };
  
  // 处理表单提交
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 验证表单
    if (!validateForm()) return;
    
    // 设置提交状态
    setIsSubmitting(true);
    
    // 模拟提交过程
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // 重置表单
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // 3秒后重置成功状态
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
    }, 1500);
  };
  
  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-slate-50 to-transparent"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              与<span className="nature-text">自然流动</span>团队联系
            </h2>
            <p className="text-dark-light max-w-2xl mx-auto">
              无论您是想咨询项目合作，还是对我们的服务有任何疑问，都欢迎随时联系我们。
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-5">
              {/* 联系信息 */}
              <div className="p-8 md:p-10 bg-primary text-white md:col-span-2">
                <h3 className="text-2xl font-display font-bold mb-6">联系信息</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-1">电话</h4>
                      <p className="opacity-80">+86 123 4567 8901</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-1">邮箱</h4>
                      <p className="opacity-80">contact@natureflow.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-1">地址</h4>
                      <p className="opacity-80">中国北京市朝阳区自然大厦23层</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-10">
                  <h4 className="text-lg font-semibold mb-4">关注我们</h4>
                  <div className="flex space-x-4">
                    <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                      </svg>
                    </a>
                    <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </a>
                    <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M22.046 6.2c-.25-1.058-1.03-1.864-2.025-2.117C18.26 3.62 12 3.62 12 3.62s-6.26 0-8.02.463c-.995.253-1.776 1.06-2.025 2.117C1.51 8.042 1.51 12 1.51 12s0 3.958.445 5.8c.25 1.058 1.03 1.864 2.025 2.117C5.74 20.38 12 20.38 12 20.38s6.26 0 8.02-.463c.995-.253 1.776-1.06 2.025-2.117.445-1.842.445-5.8.445-5.8s0-3.958-.445-5.8zm-11.92 9.384V8.416l5.364 3.584-5.364 3.584z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
              
              {/* 联系表单 */}
              <div className="p-8 md:p-10 md:col-span-3">
                <h3 className="text-2xl font-display font-bold mb-6">发送消息</h3>
                
                {submitSuccess ? (
                  <motion.div 
                    className="bg-green-50 border border-green-200 rounded-lg p-6 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
                      <svg className="w-10 h-10 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                      </svg>
                    </div>
                    <h4 className="text-xl font-bold text-green-800 mb-2">消息发送成功！</h4>
                    <p className="text-green-700">我们会尽快回复您的留言，感谢您的关注。</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      {/* 姓名字段 */}
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-dark mb-2">姓名 *</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary/50 outline-none transition-all ${
                            errors.name ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="请输入您的姓名"
                        />
                        {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                      </div>
                      
                      {/* 邮箱字段 */}
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-dark mb-2">邮箱 *</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary/50 outline-none transition-all ${
                            errors.email ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="请输入您的邮箱"
                        />
                        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                      </div>
                    </div>
                    
                    {/* 主题字段 */}
                    <div className="mb-6">
                      <label htmlFor="subject" className="block text-sm font-medium text-dark mb-2">主题 *</label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary/50 outline-none transition-all ${
                          errors.subject ? 'border-red-500' : 'border-gray-300'
                        }`}
                      >
                        <option value="">请选择一个主题</option>
                        <option value="project">项目合作</option>
                        <option value="service">服务咨询</option>
                        <option value="support">技术支持</option>
                        <option value="other">其他问题</option>
                      </select>
                      {errors.subject && <p className="mt-1 text-sm text-red-500">{errors.subject}</p>}
                    </div>
                    
                    {/* 消息字段 */}
                    <div className="mb-6">
                      <label htmlFor="message" className="block text-sm font-medium text-dark mb-2">消息 *</label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary/50 outline-none transition-all ${
                          errors.message ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="请输入您的消息"
                      ></textarea>
                      {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
                    </div>
                    
                    {/* 提交按钮 */}
                    <button
                      type="submit"
                      className="nature-btn w-full md:w-auto"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          发送中...
                        </span>
                      ) : '发送消息'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 