import { Ingredient } from "./ingredient.model";

export class Recipe {
  id: string;
  name: string;
  description: string;
  ingredients: Ingredient[];
  instructions: string[];
  preparationTime: number;
  servings: number;
}
