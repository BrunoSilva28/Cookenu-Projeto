import { Request, Response } from 'express';
import { UserDatabase } from '../data/UserDatabase';
import { Authenticator } from '../services/Authenticator';

const getUserProfile = async(
    req: Request,
    res: Response
):Promise<void> => {
    let errorCode: number = 400;

    try {
        const token = req.headers.authorization;
        
        if(!token) {
            errorCode = 422;
            throw new Error("Endpoint usage requires authorization! Please, try to insert a valid token");
        };
        
        const authData = Authenticator.getTokenData(token);

        const userProfile = await UserDatabase.getUserById(authData.id);

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

export default getUserProfile;