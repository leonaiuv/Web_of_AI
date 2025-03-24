'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiGithub, FiTwitter, FiMessageCircle, FiUsers } from 'react-icons/fi';

interface CommunityPostProps {
  id: number;
  avatar: string;
  username: string;
  role: string;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  tags: string[];
}

const CommunityPost = ({ post }: { post: CommunityPostProps }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="glass-effect p-6 rounded-xl"
    >
      <div className="flex items-start">
        <div className="relative">
          <div className="w-12 h-12 rounded-full overflow-hidden glow-effect">
            <div 
              className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg"
            >
              {post.username.charAt(0).toUpperCase()}
            </div>
          </div>
          <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-green-500 border-2 border-black"></div>
        </div>
        
        <div className="ml-4 flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-white">{post.username}</h3>
              <p className="text-sm text-gray-400">{post.role}</p>
            </div>
            <span className="text-xs text-gray-400">{post.timestamp}</span>
          </div>
          
          <p className="mt-3 text-gray-200">
            {post.content}
          </p>
          
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((tag, index) => (
              <span 
                key={index} 
                className="text-xs px-2 py-1 rounded-full bg-purple-900/30 text-purple-300"
              >
                #{tag}
              </span>
            ))}
          </div>
          
          <div className="mt-4 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-1 text-sm text-gray-300 hover:text-pink-400 transition-colors">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
                <span>{post.likes}</span>
              </button>
              <button className="flex items-center gap-1 text-sm text-gray-300 hover:text-cyan-400 transition-colors">
                <FiMessageCircle />
                <span>{post.comments}</span>
              </button>
            </div>
            <div className="flex gap-2">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FiGithub />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FiTwitter />
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Community = () => {
  const [selectedTab, setSelectedTab] = useState<'trending' | 'latest' | 'following'>('trending');
  const [posts, setPosts] = useState<CommunityPostProps[]>([]);
  
  // 模拟社区帖子数据
  useEffect(() => {
    const trendingPosts = [
      {
        id: 1,
        avatar: '',
        username: '张三',
        role: 'AI研究员',
        content: '我刚刚发布了一个新的开源项目，基于最新的Transformer架构，在图像理解任务上取得了惊人的结果。欢迎大家尝试并提供反馈！',
        timestamp: '2小时前',
        likes: 142,
        comments: 38,
        tags: ['机器学习', '计算机视觉', '开源项目']
      },
      {
        id: 2,
        avatar: '',
        username: '李四',
        role: '前端开发者',
        content: '我正在寻找一些志同道合的伙伴，共同开发一个基于React和AI的开源创意项目。如果你对Web3和AI的结合感兴趣，欢迎联系我！',
        timestamp: '4小时前',
        likes: 89,
        comments: 24,
        tags: ['React', 'Web3', '前端', '协作']
      },
      {
        id: 3,
        avatar: '',
        username: '王五',
        role: '数据科学家',
        content: '分享一下我最近在大规模语言模型训练上的一些心得体会。通过使用分布式训练和混合精度，我们可以显著提升训练效率。',
        timestamp: '昨天',
        likes: 215,
        comments: 47,
        tags: ['大模型', 'LLM', '分布式训练']
      },
    ];
    
    const latestPosts = [
      {
        id: 4,
        avatar: '',
        username: '赵六',
        role: '全栈工程师',
        content: '今天上线了我的第一个使用Next.js和AI API的应用，感觉终于迈出了AI开发的第一步！',
        timestamp: '刚刚',
        likes: 12,
        comments: 2,
        tags: ['初学者', 'Next.js', 'API']
      },
      {
        id: 5,
        avatar: '',
        username: '钱七',
        role: '社区管理员',
        content: '我们将在下周六举办线上黑客马拉松，主题是"AI赋能开源"，欢迎大家报名参加！',
        timestamp: '30分钟前',
        likes: 56,
        comments: 14,
        tags: ['活动', '黑客马拉松', '社区']
      },
      {
        id: 6,
        avatar: '',
        username: '孙八',
        role: 'NLP工程师',
        content: '分享一个我在文本摘要领域的新发现，通过结合注意力机制和强化学习，我们可以生成更加连贯的摘要。',
        timestamp: '1小时前',
        likes: 77,
        comments: 18,
        tags: ['NLP', '文本摘要', '强化学习']
      },
    ];
    
    setPosts(selectedTab === 'trending' ? trendingPosts : latestPosts);
  }, [selectedTab]);
  
  const tabVariants = {
    active: { 
      color: '#00ffaa',
      borderColor: '#00ffaa',
      textShadow: '0 0 8px rgba(0, 255, 170, 0.7)'
    },
    inactive: { 
      color: '#ffffff',
      borderColor: 'transparent',
      textShadow: 'none'
    }
  };
  
  return (
    <section className="py-24 relative">
      {/* 背景装饰 */}
      <div className="absolute -top-10 right-0 w-full h-40 bg-gradient-to-b from-purple-900/20 to-transparent"></div>
      
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 neon-text bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400">
            社区动态
          </h2>
          <p className="text-lg text-gray-300">
            了解社区最新动态，与开发者互动交流，分享你的AI创意和进展。
          </p>
        </motion.div>
        
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-10">
            <div className="flex border-b border-gray-700 overflow-x-auto">
              {(["trending", "latest", "following"] as const).map((tab) => (
                <motion.button
                  key={tab}
                  animate={selectedTab === tab ? "active" : "inactive"}
                  variants={tabVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedTab(tab)}
                  className={`px-6 py-3 font-medium text-md border-b-2 -mb-px transition-colors ${
                    selectedTab === tab ? 'border-cyan-400 text-cyan-400' : 'border-transparent text-gray-400'
                  }`}
                >
                  {tab === 'trending' && '热门讨论'}
                  {tab === 'latest' && '最新动态'}
                  {tab === 'following' && '我的关注'}
                </motion.button>
              ))}
            </div>
          </div>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {posts.map((post) => (
                <CommunityPost key={post.id} post={post} />
              ))}
              
              {selectedTab === 'following' && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="glass-effect p-12 rounded-xl flex flex-col items-center justify-center text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center mb-4">
                    <FiUsers className="text-white text-2xl" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">开始关注社区成员</h3>
                  <p className="text-gray-300 mb-6 max-w-md">
                    关注其他开发者，获取他们的最新动态和项目更新。探索并加入这个充满创造力的社区。
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-medium"
                  >
                    探索推荐用户
                    <FiArrowRight className="ml-2" />
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-12 text-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-6 py-3 bg-transparent border border-purple-500 rounded-full text-purple-400 font-medium hover:bg-purple-900/20 transition-colors"
            >
              查看更多动态
              <FiArrowRight className="ml-2" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Community; 