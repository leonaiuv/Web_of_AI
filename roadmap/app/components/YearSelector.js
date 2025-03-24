import React, { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';

export default function YearSelector({ onChange, startYear = 2024, count = 10 }) {
  const [yearRange, setYearRange] = useState({
    startYear,
    count
  });
  
  const handleStartYearChange = (change) => {
    const newStartYear = parseInt(yearRange.startYear) + change;
    if (newStartYear >= 2000 && newStartYear <= 2050) {
      setYearRange(prev => ({
        ...prev,
        startYear: newStartYear
      }));
      
      if (onChange) {
        onChange(newStartYear, yearRange.count);
      }
    }
  };
  
  const handleCountChange = (change) => {
    const newCount = yearRange.count + change;
    if (newCount >= 3 && newCount <= 20) {
      setYearRange(prev => ({
        ...prev,
        count: newCount
      }));
      
      if (onChange) {
        onChange(yearRange.startYear, newCount);
      }
    }
  };

  return (
    <div className="mb-6 bg-gray-50 rounded-lg p-4 border border-gray-200">
      <h3 className="text-lg font-medium text-gray-700 mb-3">自定义人生规划时间范围</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">起始年份</label>
          <div className="flex items-center">
            <button 
              type="button"
              onClick={() => handleStartYearChange(-1)}
              className="bg-gray-200 text-gray-700 px-3 py-2 rounded-l-md hover:bg-gray-300"
            >
              <FaMinus size={14} />
            </button>
            <div className="bg-white border-t border-b border-gray-300 px-4 py-2 min-w-[80px] text-center">
              {yearRange.startYear}
            </div>
            <button 
              type="button"
              onClick={() => handleStartYearChange(1)}
              className="bg-gray-200 text-gray-700 px-3 py-2 rounded-r-md hover:bg-gray-300"
            >
              <FaPlus size={14} />
            </button>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">规划年数</label>
          <div className="flex items-center">
            <button 
              type="button"
              onClick={() => handleCountChange(-1)}
              className="bg-gray-200 text-gray-700 px-3 py-2 rounded-l-md hover:bg-gray-300"
            >
              <FaMinus size={14} />
            </button>
            <div className="bg-white border-t border-b border-gray-300 px-4 py-2 min-w-[80px] text-center">
              {yearRange.count}
            </div>
            <button 
              type="button"
              onClick={() => handleCountChange(1)}
              className="bg-gray-200 text-gray-700 px-3 py-2 rounded-r-md hover:bg-gray-300"
            >
              <FaPlus size={14} />
            </button>
          </div>
        </div>
      </div>
      
      <p className="mt-3 text-sm text-gray-500">
        人生规划时间范围: {yearRange.startYear} - {parseInt(yearRange.startYear) + yearRange.count - 1}
      </p>
    </div>
  );
} 