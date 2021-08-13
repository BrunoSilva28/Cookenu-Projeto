import { Request, Response } from 'express';
import { UserDatabase } from '../data/UserDatabase';
import { Authenticator } from '../services/Authenticator';
import { RecipeDatabase } from '../data/RecipeDatabase';
import { FollowUserDatabase } from '../data/FollowUserDatabase';

const deleteUserAccount = async (
    req: Request,
    res: Response
): Promise<void> => {
    let errorCode: number = 400;

    try {
        const token = req.headers.authorization;
        const userId = req.params.userId;

        if (!token) {
            errorCode = 422;
            throw new Error("Endpoint usage requires authorization! Please, try to insert a valid token");
        };

        if (!userId) {
            errorCode = 422;
            throw new Error("'userId' field is empty! Please, try fill input´s value");
        };

        const userToRemove = await UserDatabase.getUserById(userId);

        if (!userToRemove) {
            errorCode = 409;
            throw new Error("User doesn´t exist! Please, try again");
        };

        const authData = Authenticator.getTokenData(token);
        const allRecipesByCreatorId = await RecipeDatabase.getRecipesByCreatorId(userId);
        const allFollowsByFollowerId = await FollowUserDatabase.getFollowByFollowerId(userId);

        if(authData.role === "NORMAL"){
            if(userToRemove.getId() !== authData.id){
                errorCode = 401;
                throw new Error("User unauthorized to delete another user account! Please, check 'userId' input´s value" );
            };

            allRecipesByCreatorId[0] && await RecipeDatabase.deleteAllRecipesByCreatorId(userId);
            allFollowsByFollowerId[0] && await FollowUserDatabase.deleteAllFollowsByFollowerId(userId);

            await UserDatabase.deleteUserById(userId);

            res.status(200).send({ message: "Your account has been removed successfully!"});
        } else {
            if(userToRemove.getId() === authData.id){
                errorCode = 401;
                throw new Error(`'ADMIN' users cannot removed its own account! Please, contact another admin
                    to proceed`);
            };

            allRecipesByCreatorId[0] && await RecipeDatabase.deleteAllRecipesByCreatorId(userId);
            allFollowsByFollowerId[0] && await FollowUserDatabase.deleteAllFollowsByFollowerId(userId);

            await UserDatabase.deleteUserById(userId);

            res.status(200).send({ message: "User account has been removed successfully!"});
        };
    } catch (error) {
        res.status(errorCode).send({ message: error.message? error.message : error.sqlMessage });
    };
};

export default deleteUserAccount;