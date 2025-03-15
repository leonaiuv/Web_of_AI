import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const [formState, setFormState] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState((prev: FormState) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // 模拟表单提交
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // 重置表单
      setFormState({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      
      // 3秒后重置提交状态
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    }, 1500);
  };

  const formVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const inputVariants = {
    focus: { scale: 1.02, boxShadow: '0 0 15px rgba(124, 58, 237, 0.5)' },
    blur: { scale: 1, boxShadow: '0 0 0px rgba(124, 58, 237, 0)' },
  };

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      {/* 背景效果 */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary to-primary/80 opacity-80" />
      
      {/* 装饰元素 */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-purple-900/20 to-transparent" />
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">联系我们</h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            无论您有什么问题或项目需求，请随时与我们联系，我们期待与您合作
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.form
            variants={formVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            onSubmit={handleSubmit}
            className="glass-morphism p-8 md:p-12 rounded-2xl"
          >
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10"
              >
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">消息已发送！</h3>
                <p className="text-white/70">感谢您的留言，我们会尽快回复您。</p>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <label htmlFor="name" className="block text-white/80 mb-2 text-sm">您的姓名</label>
                  <motion.input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none"
                    whileFocus="focus"
                    whileTap="focus"
                    variants={inputVariants}
                  />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <label htmlFor="email" className="block text-white/80 mb-2 text-sm">电子邮箱</label>
                  <motion.input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none"
                    whileFocus="focus"
                    whileTap="focus"
                    variants={inputVariants}
                  />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="md:col-span-2"
                >
                  <label htmlFor="subject" className="block text-white/80 mb-2 text-sm">主题</label>
                  <motion.select
                    id="subject"
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none"
                    whileFocus="focus"
                    whileTap="focus"
                    variants={inputVariants}
                  >
                    <option value="" disabled>请选择主题</option>
                    <option value="general">一般咨询</option>
                    <option value="project">项目合作</option>
                    <option value="support">技术支持</option>
                    <option value="other">其他</option>
                  </motion.select>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="md:col-span-2"
                >
                  <label htmlFor="message" className="block text-white/80 mb-2 text-sm">您的消息</label>
                  <motion.textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none resize-none"
                    whileFocus="focus"
                    whileTap="focus"
                    variants={inputVariants}
                  />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="md:col-span-2 flex justify-center mt-4"
                >
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-8 py-3 rounded-lg font-medium relative overflow-hidden ${
                      isSubmitting ? 'bg-purple-700 cursor-not-allowed' : 'bg-gradient-to-r from-purple-600 to-blue-500 hover:shadow-lg'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="relative z-10">
                      {isSubmitting ? '发送中...' : '发送消息'}
                    </span>
                    
                    {/* 提交动画 */}
                    {isSubmitting && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500"
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 1.5, ease: 'easeInOut' }}
                      />
                    )}
                  </motion.button>
                </motion.div>
              </div>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm; 