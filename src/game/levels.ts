export interface Level {
  level: number;
  gridSize: { rows: number; cols: number };
  theme: string;
  itemsToRemove: string[];
}

export const levels: Level[] = [
  {
    level: 1,
    gridSize: { rows: 2, cols: 2 },
    theme: "Obvious Spoilage",
    itemsToRemove: ["Moldy Bread", "Bruised Fruit", "Fruit with Flies"],
  },
  {
    level: 2,
    gridSize: { rows: 2, cols: 3 },
    theme: "Hygiene: Dropped Food",
    itemsToRemove: ["Dirty Skewer", "Iced Drink with Foreign Object"],
  },
  {
    level: 3,
    gridSize: { rows: 3, cols: 3 },
    theme: "Packaging: Unlabeled Goods",
    itemsToRemove: ["Unwrapped Candy", "Unlabeled Water Bottle"],
  },
  {
    level: 4,
    gridSize: { rows: 3, cols: 4 },
    theme: "Counterfeit (Name Imitation): Spelling Errors",
    itemsToRemove: ["Odeo Cookies", "Coca Coia"],
  },
  {
    level: 5,
    gridSize: { rows: 4, cols: 4 },
    theme: "Suspicious Colors: Industrial Dyes",
    itemsToRemove: ["Brightly Colored Sausages", "Unnaturally Colored Syrup"],
  },
  {
    level: 6,
    gridSize: { rows: 4, cols: 5 },
    theme: "Expiration Date: Faded or Expired Labels",
    itemsToRemove: ["Expired Milk Carton", "Snack with Faded Production Date"],
  },
  {
    level: 7,
    gridSize: { rows: 5, cols: 5 },
    theme: "Origin: Unsanitary Stalls",
    itemsToRemove: ["Food Prepared on the Ground", "Seller with No Gloves"],
  },
  {
    level: 8,
    gridSize: { rows: 5, cols: 6 },
    theme: "Counterfeit (Packaging Imitation): Minor Details",
    itemsToRemove: ["Incorrect Logo", "Different Font", "Missing Manufacturer Info"],
  },
  {
    level: 9,
    gridSize: { rows: 6, cols: 6 },
    theme: "Combination: Multiple Deceptive Signs",
    itemsToRemove: ["Imitation Name with Suspicious Color"],
  },
  {
    level: 10,
    gridSize: { rows: 6, cols: 6 },
    theme: "Final Boss: High-Speed Challenge",
    itemsToRemove: ["Various Contaminated Foods"],
  },
];
