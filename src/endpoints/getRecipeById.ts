import { Request, Response } from 'express';
import moment from 'moment';
import { RecipeDatabase } from '../data/RecipeDatabase';

const getRecipeById = async(
    req: Request,
    res: Response
):Promise<void> => {
    let errorCode: number = 400;

    try {
        const recipeId = req.params.id as string;
        const token = req.headers.authorization;

        if(!token) {
            errorCode = 422;
            throw new Error("Endpoint usage requires authorization! Please, try to insert a valid token");
        };

        const recipe = await RecipeDatabase.getRecipeById(recipeId);

        if(!recipe) {
            errorCode = 409;
            throw new Error("Recipe doesn´t exist! Please, try again");
        };

        const modifyDateFormat: string = moment(recipe.createdAt, "YYYY-MM-DD").format("DD/MM/YYYY");

        res.status(200).send({ 
            "recipe": {
                id: recipe.id,
                title: recipe.title,
                description: recipe.description,
                createdAt: modifyDateFormat
            }
        });
    } catch(error) {
        res.status(errorCode).send({ message: error.message? error.message : error.sqlMessage });
    };
};

export default getRecipeById;