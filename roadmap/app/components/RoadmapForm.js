import React, { useState } from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';

export default function RoadmapForm({ onAddItem }) {
  const initialFormState = {
    title: '',
    date: '',
    description: '',
    status: 'pending',
    tasks: []
  };

  const [formData, setFormData] = useState(initialFormState);
  const [taskInput, setTaskInput] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddTask = () => {
    if (!taskInput.trim()) return;
    
    setFormData(prev => ({
      ...prev,
      tasks: [...prev.tasks, { text: taskInput, completed: false }]
    }));
    
    setTaskInput('');
  };

  const handleRemoveTask = (index) => {
    setFormData(prev => ({
      ...prev,
      tasks: prev.tasks.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.date || !formData.description) {
      alert('请填写所有必填字段');
      return;
    }
    
    onAddItem(formData);
    setFormData(initialFormState);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4">添加新的路线图项目</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              标题 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              日期 <span className="text-red-500">*</span>
            </label>
            <select
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              required
            >
              <option value="">选择日期</option>
              {['2024', '2025', '2026'].map(year => (
                ['Q1', 'Q2', 'Q3', 'Q4'].map(quarter => (
                  <option key={`${quarter} ${year}`} value={`${quarter} ${year}`}>
                    {`${quarter} ${year}`}
                  </option>
                ))
              ))}
            </select>
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            描述 <span className="text-red-500">*</span>
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            required
          ></textarea>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            状态
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="pending">待办</option>
            <option value="inProgress">进行中</option>
            <option value="completed">已完成</option>
            <option value="delayed">延迟</option>
          </select>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            任务列表
          </label>
          <div className="flex">
            <input
              type="text"
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="添加任务"
            />
            <button
              type="button"
              onClick={handleAddTask}
              className="bg-primary text-white px-4 py-2 rounded-r-md hover:bg-blue-600"
            >
              <FaPlus />
            </button>
          </div>
          
          {formData.tasks.length > 0 && (
            <div className="mt-2 space-y-2">
              {formData.tasks.map((task, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                  <span>{task.text}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTask(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            添加路线图项目
          </button>
        </div>
      </form>
    </div>
  );
} 