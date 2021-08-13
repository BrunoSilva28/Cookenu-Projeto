import { Recipe } from "../entities/Recipe";
import { BaseDatabase } from "./BaseDatabase";

export class RecipeDatabase extends BaseDatabase {
    public static getRecipeById = async (
        id: string,
    ): Promise<Recipe> => {
        const recipe = await BaseDatabase.connection("Recipe")
            .select()
            .where({ id });

        return recipe[0] && Recipe.toRecipeModel(recipe[0]);
    };

    public static getRecipesByCreatorId = async (
        creatorId: string
    ): Promise<Recipe[]> => {
        const recipes = await BaseDatabase.connection("Recipe")
            .select()
            .where({ creatorId });

        return recipes.map((recipe) => Recipe.toRecipeModel(recipe));
    };

    public static createRecipe = async (
        recipe: Recipe
    ): Promise<void> => {
        console.log(recipe)
        await BaseDatabase.connection("Recipe")
            .insert({
                id: recipe.id,
                title: recipe.title,
                description: recipe.description,
                createdAt: recipe.createdAt,
                creatorId: recipe.creatorId,
                lastUpdate: recipe.lastUpdate
            });
    };

    public static changeRecipe = async (
        recipeId: string,
        lastUpdate: string,
        title?: string,
        description?: string
    ): Promise<void> => {
        await BaseDatabase.connection("Recipe")
            .update({
                lastUpdate,
                title,
                description
            })
            .where({ id: recipeId });
    };

    public static deleteRecipe = async (
        recipeId: string
    ): Promise<void> => {
        await BaseDatabase.connection("Recipe")
            .delete()
            .where({ id: recipeId });
    };

    public static deleteAllRecipesByCreatorId = async (
        creatorId: string
    ): Promise<void> => {
        await BaseDatabase.connection("Recipe")
            .delete()
            .where({ creatorId });
    };
};