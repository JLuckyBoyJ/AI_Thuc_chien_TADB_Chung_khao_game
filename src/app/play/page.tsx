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
import Image from 'next/image';

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
      if (!gameState.isGameOver) { // Prevent multiple sound plays
        playSound('gameOver');
        setGameState(prev => ({ ...prev, isGameOver: true }));
      }
    }

    // Check for win condition
    const remainingUnsafeItems = gridItems.filter(item => item.isUnsafe && !item.isHidden).length;
    if (!gameState.isGameOver && gridItems.length > 0 && remainingUnsafeItems === 0) {
      playSound('win');
      setTimeout(goToNextLevel, 1000); // Wait a second before advancing
    }
  }, [gameState, gridItems]); // Dependency updated to gameState

  const handleItemClick = (item: FoodItem) => {
    if (gameState.isGameOver || item.isHidden) return;

    if (item.isUnsafe) {
      playSound('correct');
      setGridItems(prevItems =>
        prevItems.map(i => (i.id === item.id ? { ...i, isHidden: true } : i))
      );
      setGameState(prev => ({ ...prev, score: prev.score + 10 }));
    } else {
      playSound('incorrect');
      setGameState(prev => ({ ...prev, health: prev.health - 1 }));
    }
  };

  const handleTimeUp = () => {
    setGameState(prev => ({ ...prev, isGameOver: true }));
    console.log("Game Over - You ran out of time!");
  };

  const handleRestart = () => {
    setAllLevelsCompleted(false);
    setGameState(initialGameState);
    // Manually trigger grid regeneration to ensure a fresh start
    if (imageLists.goodFood.length > 0 || imageLists.badFood.length > 0) {
      setGridItems(generateGridItems(levels[0], imageLists.goodFood, imageLists.badFood));
    }
  };

  return (
    <div className="container mx-auto p-4 flex flex-col items-center relative">
      <div className="absolute bottom-10 left-10">
        <Image 
          src={`/images/main_character/health_${gameState.health}.jpg`} 
          alt="Bao Bao Character" 
          width={160} 
          height={160} 
        />
      </div>
      <div className="flex justify-between w-full max-w-lg mb-4">
        <HealthBar health={gameState.health} />
        <Timer duration={60} onTimeUp={handleTimeUp} />
        <div className="text-xl font-bold">Điểm: {gameState.score}</div>
      </div>
      <h1 className="text-2xl font-bold">Màn chơi {levelData.level}</h1>
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
