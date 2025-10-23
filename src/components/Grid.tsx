'use client';

import React from 'react';
import Image from 'next/image';
import { FoodItem } from '@/game/items';

interface GridProps {
  rows: number;
  cols: number;
  items: FoodItem[];
  onItemClick: (item: FoodItem) => void;
}

const Grid: React.FC<GridProps> = ({ rows, cols, items, onItemClick }) => {
  const gridStyle = {
    display: 'grid',
    gridTemplateRows: `repeat(${rows}, 1fr)`,
    gridTemplateColumns: `repeat(${cols}, 1fr)`,
    gap: '10px',
  };

  return (
    <div style={gridStyle}>
      {items.map((item, index) => (
        <div 
          key={index} 
          className="border-2 border-gray-300 h-24 w-24 flex items-center justify-center text-center cursor-pointer hover:bg-gray-200"
          onClick={() => onItemClick(item)}
        >
          <Image 
            src={item.image} 
            alt={item.name} 
            width={80} 
            height={80} 
            className="object-contain"
          />
        </div>
      ))}
    </div>
  );
};

export default Grid;
