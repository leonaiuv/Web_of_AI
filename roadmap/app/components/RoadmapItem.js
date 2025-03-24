import React from 'react';
import { FaCheckCircle, FaCircle, FaExclamationCircle } from 'react-icons/fa';

const statusIcons = {
  completed: <FaCheckCircle className="text-green-500" size={18} />,
  inProgress: <FaCircle className="text-blue-500" size={18} />,
  pending: <FaCircle className="text-gray-300" size={18} />,
  delayed: <FaExclamationCircle className="text-yellow-500" size={18} />,
};

export default function RoadmapItem({ item, isLast }) {
  return (
    <div className="relative flex">
      <div className="flex flex-col items-center mr-4">
        <div className="flex items-center justify-center">
          {statusIcons[item.status]}
        </div>
        {!isLast && (
          <div className="h-full w-0.5 bg-gray-200 mt-2"></div>
        )}
      </div>
      <div className={`pb-8 ${!isLast ? "border-l-0" : ""}`}>
        <div className="flex flex-col">
          <span className="text-sm text-blue-500 font-semibold mb-1">
            {item.date}
          </span>
          <h3 className="text-lg font-semibold">{item.title}</h3>
          <p className="mt-2 text-text-secondary">{item.description}</p>
          {item.tasks && (
            <div className="mt-3 space-y-2">
              {item.tasks.map((task, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    {task.completed ? (
                      <FaCheckCircle className="text-green-500" size={14} />
                    ) : (
                      <FaCircle className="text-gray-300" size={14} />
                    )}
                  </div>
                  <span className="ml-2 text-sm">{task.text}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 