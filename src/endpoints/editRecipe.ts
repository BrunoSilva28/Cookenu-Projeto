import { Request, Response } from 'express';
import moment from 'moment';
import { RecipeDatabase } from '../data/RecipeDatabase';
import { Recipe } from '../entities/Recipe';
import { Authenticator } from '../services/Authenticator';

const editRecipe = async(
    req: Request,
    res: Response
):Promise<void> => {
    let errorCode: number = 400;

    try{
        const token = req.headers.authorization;
        const recipeId = req.params.recipeId;
        const { title, description } = req.body;

        if(!token) {
            errorCode = 422;
            throw new Error("Endpoint usage requires authorization! Please, try to insert a valid token");
        };

        if(!recipeId) {
            errorCode = 422;
            throw new Error("'recipeId' field is empty! Please, try fill input´s value");
        };

        if(!title && !description){
            errorCode = 422;
            throw new Error("At least 'title' or 'description' should be filled! Please, check input´s value");
        };

        const recipeToEdit = await RecipeDatabase.getRecipeById(recipeId);

        if(!recipeToEdit) {
            errorCode = 409;
            throw new Error("Recipe doesn´t exist! Please, try again");
        };

        const authData = Authenticator.getTokenData(token);

        if(authData.role === "NORMAL"){
            const recipesFromAuthId = await RecipeDatabase.getRecipesByCreatorId(authData.id);

            if(!recipesFromAuthId[0]){
                errorCode = 409;
                throw new Error("User doesn´t have any recipes! Please, try to create new recipes in site first :)");
            };

            const isRecipe = recipesFromAuthId.findIndex((recipe: Recipe) =>{
                return recipeToEdit.creatorId === recipe.creatorId;
            });

            if(isRecipe === -1){
                errorCode = 401;
                throw new Error(`User unauthorized access to modify recipes not created by itself!
                    Please, check recipes created by user`);
            };

            const newUpdate = moment().format("YYYY-MM-DD");

            await RecipeDatabase.changeRecipe(recipeToEdit.id, newUpdate, title, description);
            res.status(201).send({ message: "Recipe modified successfully!" });
        } else{
            const newUpdate = moment().format("YYYY-MM-DD");

            await RecipeDatabase.changeRecipe(recipeToEdit.id, newUpdate, title, description);
            res.status(201).send({ message: "Recipe modified successfully!" });
        };
    } catch(error){
        res.status(errorCode).send({ message: error.message? error.message : error.sqlMessage });
    };
};

export default editRecipe;