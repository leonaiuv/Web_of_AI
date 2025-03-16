import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // 模拟表单提交
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      
      // 重置成功消息
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-mono font-bold mb-4">
            <span className="cyber-text">联系</span> 我们
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            有任何问题或合作意向？请随时与我们联系，我们期待与您共创未来
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-12">
          <motion.div 
            className="w-full md:w-1/2"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="cyber-card p-8 h-full">
              <h3 className="text-2xl font-mono font-bold mb-6">联系方式</h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="text-primary text-2xl">📍</div>
                  <div>
                    <h4 className="font-bold mb-1">地址</h4>
                    <p className="text-gray-400">中国北京市海淀区科技园区88号赛博大厦</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="text-primary text-2xl">📧</div>
                  <div>
                    <h4 className="font-bold mb-1">电子邮件</h4>
                    <p className="text-gray-400">contact@cyberspace.tech</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="text-primary text-2xl">📱</div>
                  <div>
                    <h4 className="font-bold mb-1">电话</h4>
                    <p className="text-gray-400">+86 10 8888 8888</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h4 className="font-bold mb-4">关注我们</h4>
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
            </div>
          </motion.div>
          
          <motion.div 
            className="w-full md:w-1/2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="cyber-card p-8">
              <h3 className="text-2xl font-mono font-bold mb-6">发送消息</h3>
              
              {isSubmitted ? (
                <motion.div 
                  className="bg-primary/20 border border-primary p-4 rounded-md text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <p className="text-primary font-bold mb-2">消息已发送！</p>
                  <p>感谢您的联系，我们将尽快回复您。</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="name" className="block mb-2 font-mono">姓名</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-dark-light border border-white/20 p-3 rounded-md focus:border-primary focus:outline-none transition-colors duration-300"
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="email" className="block mb-2 font-mono">电子邮件</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-dark-light border border-white/20 p-3 rounded-md focus:border-primary focus:outline-none transition-colors duration-300"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block mb-2 font-mono">消息</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full bg-dark-light border border-white/20 p-3 rounded-md focus:border-primary focus:outline-none transition-colors duration-300"
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="cyber-btn w-full flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        处理中...
                      </>
                    ) : '发送消息'}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* 背景装饰 */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute top-1/3 right-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl"></div>
    </section>
  );
};

export default Contact; 