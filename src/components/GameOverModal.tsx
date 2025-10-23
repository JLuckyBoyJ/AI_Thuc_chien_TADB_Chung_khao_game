'use client';

import React from 'react';

interface GameOverModalProps {
  score: number;
  onRestart: () => void;
}

const GameOverModal: React.FC<GameOverModalProps> = ({ score, onRestart }) => {
  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg text-center">
        <h2 className="text-4xl font-bold mb-4">Game Over!</h2>
        <p className="text-xl mb-4">Your final score is: {score}</p>
        <button 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={onRestart}
        >
          Play Again
        </button>
      </div>
    </div>
  );
};

export default GameOverModal;
