import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
} from "@nestjs/common";
import { Recipe } from "./recipe.model";
import { RecipeService } from "./recipe.service";

@Controller("recipes")
export class RecipeController {
  constructor(private recipeService: RecipeService) {}

  @Get("getAllRecipes")
  getAllRecipes(): Recipe[] {
    return this.recipeService.getAllRecipes();
  }

  @Get(":id")
  async getRecipeById(@Param("id") id: string): Promise<Recipe> {
    const recipe = this.recipeService.findRecipeById(id);
    if (!recipe) {
      throw new NotFoundException("Recipe not found");
    }
    return recipe;
  }

  @Post("addRecipe")
  addRecipe(@Body() recipe: Recipe): void {
    this.recipeService.addRecipe(recipe);
  }

  @Put(":id")
  updateRecipe(@Param("id") id: string, @Body() updatedRecipe: Recipe): void {
    this.recipeService.updateRecipe(id, updatedRecipe);
  }

  @Delete(":id")
  deleteRecipe(@Param("id") id: string): void {
    this.recipeService.deleteRecipe(id);
  }
}
