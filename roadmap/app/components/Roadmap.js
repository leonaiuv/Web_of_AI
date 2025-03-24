import React, { useState, useEffect } from 'react';
import RoadmapItem from './RoadmapItem';

const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];

export default function Roadmap({ roadmapData, onEditItem, onDeleteItem, yearConfig }) {
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedQuarter, setSelectedQuarter] = useState('all');
  const years = yearConfig?.years || [];

  // 当年份配置变化时，重置选择
  useEffect(() => {
    setSelectedYear('all');
  }, [yearConfig]);

  const filteredData = roadmapData.filter(item => {
    const itemYear = item.date.split(' ')[1];
    const itemQuarter = item.date.split(' ')[0];
    
    if (selectedYear !== 'all' && itemYear !== selectedYear) {
      return false;
    }
    
    if (selectedQuarter !== 'all' && itemQuarter !== selectedQuarter) {
      return false;
    }
    
    return true;
  });

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-wrap items-center gap-4 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">年份</label>
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => setSelectedYear('all')}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedYear === 'all' 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              全部
            </button>
            {years.map(year => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`px-3 py-1 rounded-full text-sm ${
                  selectedYear === year 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">季度</label>
          <div className="flex space-x-2">
            <button 
              onClick={() => setSelectedQuarter('all')}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedQuarter === 'all' 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              全部
            </button>
            {quarters.map(quarter => (
              <button
                key={quarter}
                onClick={() => setSelectedQuarter(quarter)}
                className={`px-3 py-1 rounded-full text-sm ${
                  selectedQuarter === quarter 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {quarter}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-2">
        {filteredData.length > 0 ? (
          filteredData.map((item, index) => (
            <RoadmapItem 
              key={index} 
              item={item} 
              isLast={index === filteredData.length - 1}
              onEdit={onEditItem}
              onDelete={onDeleteItem}
            />
          ))
        ) : (
          <p className="text-center text-gray-500 py-10">没有符合条件的路线图项目</p>
        )}
      </div>
    </div>
  );
} 