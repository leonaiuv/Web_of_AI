import React, { useState } from 'react';
import { motion } from 'framer-motion';

// 合作方式数据
const collaborationTypes = [
  {
    id: 'individual',
    title: '个人参与',
    icon: '👤',
    description: '作为个人志愿者或专业人士参与超级地球项目，贡献您的技能与热情。',
  },
  {
    id: 'organization',
    title: '组织合作',
    icon: '🏢',
    description: '作为非盈利组织、教育机构或社区团体，与我们共同推动可持续发展目标。',
  },
  {
    id: 'business',
    title: '企业伙伴',
    icon: '💼',
    description: '作为企业加入我们的绿色供应链、资助项目或投资可持续技术研发。',
  },
  {
    id: 'research',
    title: '研究合作',
    icon: '🔬',
    description: '作为研究机构与我们共同探索前沿环境科技，推动创新解决方案。',
  },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    collaborationType: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // 模拟表单提交
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        organization: '',
        collaborationType: '',
        message: '',
      });
      
      // 清除状态消息
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-mono font-bold mb-4">
            加入 <span className="earth-text earth-glow">超级地球</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-300">
            无论您是个人、组织还是企业，都可以成为超级地球计划的一部分。联系我们，探索合作机会。
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12">
          <div className="w-full lg:w-1/2">
            <div className="mb-10">
              <h3 className="text-2xl font-bold mb-6 earth-text">合作方式</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {collaborationTypes.map((type) => (
                  <motion.div
                    key={type.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="earth-card p-4"
                  >
                    <div className="flex items-start">
                      <div className="text-3xl mr-3">{type.icon}</div>
                      <div>
                        <h4 className="font-bold mb-2">{type.title}</h4>
                        <p className="text-sm text-gray-300">{type.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-6 earth-text">联系方式</h3>
              <div className="earth-card p-6">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="text-primary text-xl mr-4">📍</div>
                    <div>
                      <h4 className="font-bold">地址</h4>
                      <p className="text-gray-300">超级地球总部, 绿色科技园区 18号</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="text-primary text-xl mr-4">📧</div>
                    <div>
                      <h4 className="font-bold">电子邮件</h4>
                      <p className="text-gray-300">contact@super-earth.eco</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="text-primary text-xl mr-4">☎️</div>
                    <div>
                      <h4 className="font-bold">电话</h4>
                      <p className="text-gray-300">+86 123 4567 8910</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="text-primary text-xl mr-4">🌐</div>
                    <div>
                      <h4 className="font-bold">社交媒体</h4>
                      <div className="flex space-x-4 mt-2">
                        <a href="#" className="text-gray-300 hover:text-primary transition-colors">微博</a>
                        <a href="#" className="text-gray-300 hover:text-primary transition-colors">微信</a>
                        <a href="#" className="text-gray-300 hover:text-primary transition-colors">知乎</a>
                        <a href="#" className="text-gray-300 hover:text-primary transition-colors">B站</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="earth-card p-8"
            >
              <h3 className="text-2xl font-bold mb-6 earth-text">联系表单</h3>
              {submitStatus === 'success' ? (
                <div className="bg-primary/20 border border-primary/30 rounded-md p-4 text-center">
                  <div className="text-3xl mb-2">✅</div>
                  <h4 className="font-bold mb-2">提交成功！</h4>
                  <p className="text-gray-300">我们已收到您的信息，将尽快与您联系。</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block mb-2 font-medium">姓名</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full p-3 rounded bg-dark-light border border-white/10 text-white focus:border-primary focus:outline-none"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block mb-2 font-medium">电子邮件</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full p-3 rounded bg-dark-light border border-white/10 text-white focus:border-primary focus:outline-none"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="organization" className="block mb-2 font-medium">组织/公司 (选填)</label>
                      <input
                        type="text"
                        id="organization"
                        name="organization"
                        value={formData.organization}
                        onChange={handleChange}
                        className="w-full p-3 rounded bg-dark-light border border-white/10 text-white focus:border-primary focus:outline-none"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="collaborationType" className="block mb-2 font-medium">合作类型</label>
                      <select
                        id="collaborationType"
                        name="collaborationType"
                        value={formData.collaborationType}
                        onChange={handleChange}
                        required
                        className="w-full p-3 rounded bg-dark-light border border-white/10 text-white focus:border-primary focus:outline-none"
                      >
                        <option value="">请选择...</option>
                        <option value="individual">个人参与</option>
                        <option value="organization">组织合作</option>
                        <option value="business">企业伙伴</option>
                        <option value="research">研究合作</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block mb-2 font-medium">留言</label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full p-3 rounded bg-dark-light border border-white/10 text-white focus:border-primary focus:outline-none"
                      ></textarea>
                    </div>
                    
                    <div>
                      <motion.button
                        type="submit"
                        className="earth-btn w-full py-4"
                        disabled={isSubmitting}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {isSubmitting ? '提交中...' : '发送信息'}
                      </motion.button>
                    </div>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* 背景装饰 */}
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute top-1/3 -left-32 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"></div>
    </section>
  );
};

export default Contact; 