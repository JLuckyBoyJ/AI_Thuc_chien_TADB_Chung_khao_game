'use client';

import { useState, useEffect } from 'react';
import { levels } from '@/game/levels';
import { FoodItem } from '@/game/items';
import { generateGridItems } from '@/game/grid-generator';
import { initialGameState, GameState } from '@/game/gameState';
import Grid from '@/components/Grid';
import HealthBar from '@/components/HealthBar';
import Timer from '@/components/Timer';
import GameOverModal from '@/components/GameOverModal';
import YouWinModal from '@/components/YouWinModal';
import { playSound } from '@/utils/audio';

export default function PlayPage() {
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const [gridItems, setGridItems] = useState<FoodItem[]>([]);
  const [imageLists, setImageLists] = useState<{ goodFood: string[], badFood: string[] }>({ goodFood: [], badFood: [] });
  const [isAllLevelsCompleted, setAllLevelsCompleted] = useState(false);
  
  const levelData = levels[gameState.level - 1];

  useEffect(() => {
    async function fetchImages() {
      const res = await fetch('/api/images');
      const data = await res.json();
      setImageLists(data);
    }
    fetchImages();
  }, []);

  useEffect(() => {
    if (imageLists.goodFood.length > 0 || imageLists.badFood.length > 0) {
      setGridItems(generateGridItems(levelData, imageLists.goodFood, imageLists.badFood));
    }
  }, [gameState.level, levelData, imageLists]);

  const goToNextLevel = () => {
    if (gameState.level < levels.length) {
      setGameState(prev => ({
        ...prev,
        level: prev.level + 1,
      }));
    } else {
      setAllLevelsCompleted(true);
    }
  };

  useEffect(() => {
    // Check for game over by health
    if (gameState.health <= 0) {
      setGameState(prev => ({ ...prev, isGameOver: true }));
      playSound('gameOver'); // "tò te tí"
    }

    // Check for win condition
    const remainingUnsafeItems = gridItems.filter(item => item.isUnsafe).length;
    if (gridItems.length > 0 && remainingUnsafeItems === 0) {
      playSound('win'); // "đoạn nhạc chiến thắng ngắn"
      setTimeout(goToNextLevel, 1000); // Wait a second before advancing
    }
  }, [gameState.health, gridItems]);

  const handleItemClick = (item: FoodItem) => {
    if (gameState.isGameOver) return;

    if (item.isUnsafe) {
      playSound('correct'); // "ting ting", "póc"
      // Correct click
      setGridItems(prevItems => prevItems.filter(i => i.name !== item.name));
      setGameState(prev => ({ ...prev, score: prev.score + 10 }));
    } else {
      playSound('incorrect'); // "xoẹt", "buzz"
      // Incorrect click
      setGameState(prev => ({ ...prev, health: prev.health - 1 }));
    }
  };

  const handleTimeUp = () => {
    setGameState(prev => ({ ...prev, isGameOver: true }));
    console.log("Game Over - You ran out of time!");
  };

  const handleRestart = () => {
    setGameState(initialGameState);
    setAllLevelsCompleted(false);
  };

  return (
    <div className="container mx-auto p-4 flex flex-col items-center relative">
      <div className="flex justify-between w-full max-w-lg mb-4">
        <HealthBar health={gameState.health} />
        <Timer duration={60} onTimeUp={handleTimeUp} />
        <div className="text-xl font-bold">Score: {gameState.score}</div>
      </div>
      <h1 className="text-2xl font-bold">Level {levelData.level}</h1>
      <p className="text-lg mb-4">{levelData.theme}</p>
      <Grid 
        rows={levelData.gridSize.rows} 
        cols={levelData.gridSize.cols}
        items={gridItems} 
        onItemClick={handleItemClick}
      />
      
      {gameState.isGameOver && (
        <GameOverModal 
          score={gameState.score} 
          onRestart={handleRestart} 
        />
      )}

      {isAllLevelsCompleted && (
        <YouWinModal
          score={gameState.score}
          onPlayAgain={handleRestart}
        />
      )}
    </div>
  );
}
