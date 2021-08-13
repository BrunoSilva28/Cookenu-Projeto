import { Request, Response } from 'express';
import { UserDatabase } from '../data/UserDatabase';

const getProfileByUserId = async(
    req: Request,
    res: Response
):Promise<void> => {
    let errorCode: number = 400;

    try {
        const userSearchedId = req.params.id as string;
        const token = req.headers.authorization;

        if(!token) {
            errorCode = 422;
            throw new Error("Endpoint usage requires authorization! Please, try to insert a valid token");
        };

        const userProfile = await UserDatabase.getUserById(userSearchedId);

        if(!userProfile) {
            errorCode = 409;
            throw new Error("User doesn´t exist! Please, try again");
        };

        res.status(200).send({ 
            "userProfile": {
                id: userProfile.getId(),
                name: userProfile.getName(),
                email: userProfile.getEmail()
            }
        });
    } catch(error) {
        res.status(errorCode).send({ message: error.message? error.message : error.sqlMessage });
    };
};

export default getProfileByUserId;