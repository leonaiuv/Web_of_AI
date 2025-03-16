import React, { useEffect } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';

// 动态导入组件，避免SSR问题
const AnimatedBackground = dynamic(() => import('@/components/AnimatedBackground'), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <Head>
        <title>超级神经中枢 - 智能未来的核心</title>
        <meta name="description" content="超级神经中枢是一个专注于人工智能和神经网络技术的平台，致力于打造未来智能的核心引擎。" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className="relative">
        <Navbar />
        <Hero />
        
        {/* 神经网络部分 */}
        <section id="neural-networks" className="py-20">
          <div className="container mx-auto">
            <h2 className="section-title">神经网络技术</h2>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              {[
                {
                  title: '深度学习',
                  description: '利用多层神经网络模拟人脑结构，实现复杂模式识别和数据处理能力。'
                },
                {
                  title: '卷积网络',
                  description: '专为图像识别设计的神经网络架构，能够自动提取图像特征并进行分类。'
                },
                {
                  title: '循环网络',
                  description: '处理序列数据的神经网络，具有"记忆"功能，适用于语言和时间序列分析。'
                }
              ].map((item, index) => (
                <div key={index} className="neural-card">
                  <h3 className="text-2xl font-display font-bold mb-4 text-neural-300">{item.title}</h3>
                  <p className="text-white/70">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* 超级算法部分 */}
        <section id="super-algorithms" className="py-20 bg-neural-900/50">
          <div className="container mx-auto">
            <h2 className="section-title">超级算法</h2>
            <div className="grid md:grid-cols-2 gap-12 mt-12">
              <div className="neural-card">
                <h3 className="text-2xl font-display font-bold mb-4 text-synapse-300">量子神经计算</h3>
                <p className="text-white/70 mb-4">
                  结合量子计算与神经网络的前沿技术，突破传统计算限制，实现指数级性能提升。
                </p>
                <div className="w-full h-2 bg-black/30 rounded-full overflow-hidden">
                  <div className="h-full w-4/5 bg-gradient-to-r from-neural-500 to-synapse-500 rounded-full"></div>
                </div>
                <div className="flex justify-between mt-2 text-sm text-white/50">
                  <span>研发进度</span>
                  <span>80%</span>
                </div>
              </div>
              
              <div className="neural-card">
                <h3 className="text-2xl font-display font-bold mb-4 text-synapse-300">自适应学习系统</h3>
                <p className="text-white/70 mb-4">
                  能够根据环境变化自动调整学习策略的智能系统，无需人工干预即可持续优化性能。
                </p>
                <div className="w-full h-2 bg-black/30 rounded-full overflow-hidden">
                  <div className="h-full w-3/5 bg-gradient-to-r from-neural-500 to-synapse-500 rounded-full"></div>
                </div>
                <div className="flex justify-between mt-2 text-sm text-white/50">
                  <span>研发进度</span>
                  <span>60%</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* 智能应用部分 */}
        <section id="ai-applications" className="py-20">
          <div className="container mx-auto">
            <h2 className="section-title">智能应用</h2>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              {[
                {
                  title: '智能医疗诊断',
                  description: '利用神经网络分析医学影像，辅助医生进行疾病诊断，提高诊断准确率。'
                },
                {
                  title: '自然语言处理',
                  description: '理解和生成人类语言的AI系统，支持智能客服、内容创作和实时翻译。'
                },
                {
                  title: '智能决策系统',
                  description: '基于大数据分析的决策辅助系统，为企业和组织提供数据驱动的决策支持。'
                }
              ].map((item, index) => (
                <div key={index} className="neural-card">
                  <h3 className="text-2xl font-display font-bold mb-4 text-neural-300">{item.title}</h3>
                  <p className="text-white/70">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* 联系我们部分 */}
        <section id="contact" className="py-20 bg-neural-900/50">
          <div className="container mx-auto">
            <h2 className="section-title">联系我们</h2>
            <div className="max-w-2xl mx-auto mt-12">
              <div className="neural-card">
                <form className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-white mb-2">姓名</label>
                    <input 
                      type="text" 
                      id="name" 
                      className="w-full bg-black/30 border border-neural-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-neural-500"
                      placeholder="请输入您的姓名"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-white mb-2">邮箱</label>
                    <input 
                      type="email" 
                      id="email" 
                      className="w-full bg-black/30 border border-neural-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-neural-500"
                      placeholder="请输入您的邮箱"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-white mb-2">留言</label>
                    <textarea 
                      id="message" 
                      rows={4}
                      className="w-full bg-black/30 border border-neural-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-neural-500"
                      placeholder="请输入您的留言内容"
                    ></textarea>
                  </div>
                  <button 
                    type="submit" 
                    className="btn btn-primary w-full"
                  >
                    发送消息
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 text-center text-white/60">
        <div className="container mx-auto">
          <p>© {new Date().getFullYear()} 超级神经中枢. 保留所有权利.</p>
        </div>
      </footer>
    </>
  );
} 