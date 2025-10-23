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

export function generateGridItems(level: Level, goodFoodImages: string[], badFoodImages:string[]): FoodItem[] {
  let idCounter = 0;
  const gridSize = level.gridSize.rows * level.gridSize.cols;
  
  // Number of unsafe items scales with the level
  let unsafeCount = Math.min(badFoodImages.length, level.level + 1);

  // Ensure there is at least one unsafe item, if possible.
  if (badFoodImages.length > 0) {
    unsafeCount = Math.max(1, unsafeCount);
  }

  // Ensure we don't overflow the grid
  if (unsafeCount > gridSize) {
    unsafeCount = gridSize;
  }
  
  const safeCount = gridSize - unsafeCount;

  const selectedBadFoods = shuffle(badFoodImages).slice(0, unsafeCount);
  const unsafeItems: FoodItem[] = selectedBadFoods.map(image => ({
    id: `item-${idCounter++}`,
    name: image.split('.')[0], // Use filename as name
    isUnsafe: true,
    image: `/images/bad_food/${image}`
  }));

  const selectedGoodFoods = shuffle(goodFoodImages).slice(0, safeCount);
  const safeItems: FoodItem[] = selectedGoodFoods.map(image => ({
    id: `item-${idCounter++}`,
    name: image.split('.')[0],
    isUnsafe: false,
    image: `/images/good_food/${image}`
  }));

  const gridItems = [...unsafeItems, ...safeItems];
  
  return shuffle(gridItems);
}
