import { Request, Response } from 'express';
import moment from 'moment';
import { RecipeDatabase } from '../data/RecipeDatabase';
import { Recipe } from '../entities/Recipe';
import { Authenticator } from '../services/Authenticator';
import { IdGenerator } from '../services/IdGenerator';
import { AuthenticationData } from '../types';

const createRecipe = async(
    req: Request,
    res: Response
):Promise<void> => {
    let errorCode: number = 400;

    try {
        const token = req.headers.authorization;
        const { title, description } = req.body;
        
        if(!token){
            errorCode = 422;
            throw new Error("Endpoint usage requires authorization! Please, try to insert a valid token");
        };

        if(!title || !description){
            errorCode = 422;
            throw new Error("One or more fields are empty! Please, check 'title' and 'description' input´s value");
        };

        const newId: string = IdGenerator.generateId();
        const actualDate: string = moment().format("YYYY-MM-DD");
        const initialLastUpdate: string = moment().format("YYYY-MM-DD");
        const authData: AuthenticationData = Authenticator.getTokenData(token);

        const newRecipe: Recipe = new Recipe(newId, title, description, actualDate, authData.id, initialLastUpdate);
        console.log("newRecipe", newRecipe);
        await RecipeDatabase.createRecipe(newRecipe);

        res.status(201).send({ message: "Recipe created successfully!" });
    } catch(error) {
        res.status(errorCode).send({ message: error.message? error.message : error.sqlMessage });
    };
};

export default createRecipe;