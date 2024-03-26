import { Injectable, NotFoundException } from "@nestjs/common";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {
  private recipes: Recipe[] = [];
  findRecipeById(id: string): Recipe {
    const recipe = this.recipes.find((recipe) => recipe.id === id);
    if (!recipe) {
      throw new NotFoundException(`Recipe with ID ${id} not found`);
    }
    return recipe;
  }
  getAllRecipes(): Recipe[] {
    return this.recipes;
  }

  getRecipeById(id: string): Recipe {
    return this.recipes.find((recipe) => recipe.id === id);
  }

  addRecipe(recipe: Recipe): void {
    this.recipes.push(recipe);
  }

  updateRecipe(id: string, updatedRecipe: Recipe): void {
    const existingRecipeIndex = this.recipes.findIndex(
      (recipe) => recipe.id === id,
    );

    if (existingRecipeIndex !== -1) {
      const updatedRecipes = [...this.recipes];
      updatedRecipes[existingRecipeIndex] = { ...updatedRecipe, id };

      this.recipes = updatedRecipes;
    }
  }

  deleteRecipe(id: string): void {
    this.recipes = this.recipes.filter((recipe) => recipe.id !== id);
  }
}
