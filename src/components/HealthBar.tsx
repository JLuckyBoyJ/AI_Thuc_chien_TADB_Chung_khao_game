'use client';

import React from 'react';

interface HealthBarProps {
  health: number;
}

const HealthBar: React.FC<HealthBarProps> = ({ health }) => {
  return (
    <div className="flex items-center">
      <span className="mr-2 font-bold">Health:</span>
      {Array.from({ length: 5 }).map((_, index) => (
        <span key={index} className={`text-2xl ${index < health ? 'text-red-500' : 'text-gray-300'}`}>
          ♥
        </span>
      ))}
    </div>
  );
};

export default HealthBar;
