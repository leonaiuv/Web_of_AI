import React, { useState, useEffect } from 'react';
import { FaPlus, FaTrash, FaSave, FaTimes, FaCheckCircle, FaCircle } from 'react-icons/fa';

// 生成从当前年份开始的若干年范围
const generateYears = (startYear = new Date().getFullYear(), count = 10) => {
  return Array.from({ length: count }, (_, i) => (startYear + i).toString());
};

const years = generateYears(2024);
const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];

export default function RoadmapForm({ onAddItem, editItem, onUpdateItem, onCancelEdit, yearConfig }) {
  const initialFormState = {
    title: '',
    date: '',
    description: '',
    status: 'pending',
    tasks: []
  };

  const [formData, setFormData] = useState(initialFormState);
  const [taskInput, setTaskInput] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  // 当editItem变化时更新表单数据
  useEffect(() => {
    if (editItem) {
      setFormData(editItem);
      setIsEditing(true);
    } else {
      setFormData(initialFormState);
      setIsEditing(false);
    }
  }, [editItem]);

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

  const handleToggleTaskStatus = (index) => {
    setFormData(prev => {
      const updatedTasks = [...prev.tasks];
      updatedTasks[index] = {
        ...updatedTasks[index],
        completed: !updatedTasks[index].completed
      };
      return {
        ...prev,
        tasks: updatedTasks
      };
    });
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
    
    if (isEditing) {
      onUpdateItem(formData);
    } else {
      onAddItem(formData);
      setFormData(initialFormState);
    }
  };

  const handleCancel = () => {
    setFormData(initialFormState);
    setIsEditing(false);
    onCancelEdit();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4">
        {isEditing ? '编辑人生目标' : '添加新的人生目标'}
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              目标名称 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              required
              placeholder="如：学业规划、职业发展、财务目标"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              计划时间 <span className="text-red-500">*</span>
            </label>
            <select
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              required
            >
              <option value="">选择时间</option>
              {years.map(year => (
                quarters.map(quarter => (
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
            目标描述 <span className="text-red-500">*</span>
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            required
            placeholder="描述你想要实现的目标、为什么这个目标对你重要以及达成这个目标的意义..."
          ></textarea>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            目标状态
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="pending">尚未开始</option>
            <option value="inProgress">正在进行</option>
            <option value="completed">已完成</option>
            <option value="delayed">已延期</option>
          </select>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            具体行动步骤
          </label>
          <div className="flex">
            <input
              type="text"
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="添加实现目标的具体步骤"
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
                  <div className="flex items-center">
                    <button
                      type="button"
                      onClick={() => handleToggleTaskStatus(index)}
                      className={`mr-2 ${task.completed ? 'text-green-500' : 'text-gray-300'}`}
                    >
                      {task.completed ? (
                        <FaCheckCircle size={14} />
                      ) : (
                        <FaCircle size={14} />
                      )}
                    </button>
                    <span className={task.completed ? 'line-through text-gray-500' : ''}>{task.text}</span>
                  </div>
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
        
        <div className="flex justify-end space-x-2">
          {isEditing && (
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 flex items-center"
            >
              <FaTimes className="mr-1" /> 取消
            </button>
          )}
          <button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center"
          >
            {isEditing ? (
              <>
                <FaSave className="mr-1" /> 保存目标
              </>
            ) : (
              <>
                <FaPlus className="mr-1" /> 添加人生目标
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
} 