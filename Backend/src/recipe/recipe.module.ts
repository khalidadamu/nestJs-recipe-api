import { Module } from "@nestjs/common";
import { RecipeController } from "./recipe.controller";
import { RecipeService } from "./recipe.service";
import { Recipe } from "./recipe.model";
import { Ingredient } from "./ingredient.model";
@Module({
  controllers: [RecipeController],
  providers: [RecipeService, Recipe, Ingredient],
})
export class RecipeModule {}
