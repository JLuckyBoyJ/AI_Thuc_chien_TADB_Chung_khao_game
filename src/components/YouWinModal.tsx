'use client';

import React from 'react';

interface YouWinModalProps {
  score: number;
  onPlayAgain: () => void;
}

const YouWinModal: React.FC<YouWinModalProps> = ({ score, onPlayAgain }) => {
  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg text-center">
        <h2 className="text-4xl font-bold mb-4 text-green-500">Chúc mừng!</h2>
        <p className="text-xl mb-4">Bạn đã hoàn thành tất cả các cấp độ!</p>
        <p className="text-xl mb-4">Điểm số của bạn là: {score}</p>
        <button 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={onPlayAgain}
        >
          Chơi lại
        </button>
      </div>
    </div>
  );
};

export default YouWinModal;
