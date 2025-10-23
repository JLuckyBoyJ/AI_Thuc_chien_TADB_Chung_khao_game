export interface FoodItem {
  id: string;
  name: string;
  isUnsafe: boolean;
  image: string; // Path to the image
  isHidden?: boolean;
}
