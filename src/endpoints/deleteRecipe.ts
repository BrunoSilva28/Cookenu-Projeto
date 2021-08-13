import { Request, Response } from 'express';
import { RecipeDatabase } from '../data/RecipeDatabase';
import { Recipe } from '../entities/Recipe';
import { Authenticator } from '../services/Authenticator';

const deleteRecipe = async (
    req: Request,
    res: Response
): Promise<void> => {
    let errorCode: number = 400;

    try {
        const token = req.headers.authorization;
        const recipeId = req.params.recipeId;

        if (!token) {
            errorCode = 422;
            throw new Error("Endpoint usage requires authorization! Please, try to insert a valid token");
        };

        if (!recipeId) {
            errorCode = 422;
            throw new Error("'recipeId' field is empty! Please, try fill input´s value");
        };

        const recipeToRemove = await RecipeDatabase.getRecipeById(recipeId);

        if (!recipeToRemove) {
            errorCode = 409;
            throw new Error("Recipe doesn´t exist! Please, try again");
        };

        const authData = Authenticator.getTokenData(token);

        if (authData.role === "NORMAL") {
            const recipesFromAuthId = await RecipeDatabase.getRecipesByCreatorId(authData.id);

            if (!recipesFromAuthId[0]) {
                errorCode = 409;
                throw new Error("User doesn´t have any recipes! Please, try to create new recipes in site first :)");
            };

            const isRecipe = recipesFromAuthId.findIndex((recipe: Recipe) => {
                return recipeToRemove.creatorId === recipe.creatorId;
            });

            if (isRecipe === -1) {
                errorCode = 401;
                throw new Error(`User unauthorized access to remove recipes not created by itself!
                    Please, check recipes created by user`);
            };

            await RecipeDatabase.deleteRecipe(recipeId);

            res.status(201).send({ message: "Recipe removed successfully!"});
        } else {
            await RecipeDatabase.deleteRecipe(recipeId);

            res.status(201).send({ message: "Recipe removed successfully!" });
        };
    } catch (error) {
        res.status(errorCode).send({ message: error.message ? error.message : error.sqlMessage });
    };
};

export default deleteRecipe;