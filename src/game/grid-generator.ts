import { Level } from './levels';
import { FoodItem } from './items';

// A simple shuffle function
function shuffle<T>(array: T[]): T[] {
  let currentIndex = array.length, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}

export function generateGridItems(level: Level, goodFoodImages: string[], badFoodImages: string[]): FoodItem[] {
  const gridSize = level.gridSize.rows * level.gridSize.cols;
  
  // For simplicity, let's say each level has a fixed number of unsafe items.
  // This can be made more dynamic later.
  const numberOfUnsafeItems = Math.min(badFoodImages.length, Math.floor(gridSize / 3)); // e.g., 1/3 of the grid
  
  const selectedBadFoods = shuffle(badFoodImages).slice(0, numberOfUnsafeItems);
  const unsafeItems: FoodItem[] = selectedBadFoods.map(image => ({
    name: image.split('.')[0], // Use filename as name
    isUnsafe: true,
    image: `/images/bad_food/${image}`
  }));

  const numberOfSafeItems = gridSize - numberOfUnsafeItems;
  const selectedGoodFoods = shuffle(goodFoodImages).slice(0, numberOfSafeItems);
  const safeItems: FoodItem[] = selectedGoodFoods.map(image => ({
    name: image.split('.')[0],
    isUnsafe: false,
    image: `/images/good_food/${image}`
  }));

  const gridItems = [...unsafeItems, ...safeItems];
  
  return shuffle(gridItems);
}
