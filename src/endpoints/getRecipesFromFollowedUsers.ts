import { Request, Response } from 'express';
import moment from 'moment';
import { FollowUserDatabase } from '../data/FollowUserDatabase';
import { RecipeDatabase } from '../data/RecipeDatabase';
import { UserDatabase } from '../data/UserDatabase';
import { Recipe } from '../entities/Recipe';
import { Authenticator } from '../services/Authenticator';

const getRecipesFromFollowedUsers = async (
    req: Request,
    res: Response
): Promise<void> => {
    let errorCode: number = 400;

    try {
        const token = req.headers.authorization;

        if (!token) {
            errorCode = 422;
            throw new Error("Endpoint usage requires authorization! Please, try to insert a valid token");
        };

        const authData = Authenticator.getTokenData(token);

        const follows = await FollowUserDatabase.getFollowByFollowerId(authData.id);

        let recipesFromFollows: any[] = [];
        for (let follow of follows) {
            const recipesByFollowed = await RecipeDatabase.getRecipesByCreatorId(follow.followedUserId);
            const userFollowed = await UserDatabase.getUserById(follow.followedUserId)

            for (let recipe of recipesByFollowed) {
                recipesFromFollows.push({
                    id: recipe.id,
                    title: recipe.title,
                    description: recipe.description,
                    createdAt: moment(recipe.createdAt,"YYYY-MM-DD").format("DD/MM/YYYY"),
                    creatorId: recipe.creatorId,
                    creatorName: userFollowed.getName()
                });
            };
        };

        const orderedRecipes = recipesFromFollows.sort(function (a, b) {
            if (a.createdAt < b.createdAt) {
                return 1;
            }
            if (a.createdAt > b.createdAt) {
                return -1;
            }
            return 0;
        });

        res.status(200).send({ recipes: orderedRecipes });
    } catch (error) {
        res.status(errorCode).send({ message: error.message ? error.message : error.sqlMessage });
    }
};

export default getRecipesFromFollowedUsers;