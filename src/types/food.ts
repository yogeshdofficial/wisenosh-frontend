export interface FoodInfoData {
  foodName: string;
  calories: string[]; // or number[] depending on backend
  nutrients: string[];
  benefits: string[];
  ingredients: string[];
  foodItemsIncluded: string[];
  allergies: string[];
}
