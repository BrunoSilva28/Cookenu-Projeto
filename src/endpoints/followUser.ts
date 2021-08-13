import { Request, Response } from 'express';
import { FollowUserDatabase } from '../data/FollowUserDatabase';
import { UserDatabase } from '../data/UserDatabase';
import { FollowRelation } from '../entities/FollowRelation';
import { Authenticator } from '../services/Authenticator';
import { AuthenticationData } from '../types';

const followUser = async(
    req: Request,
    res: Response
):Promise<void> => {
    let errorCode: number = 400;

    try { 
        const token = req.headers.authorization;
        const userToFollowId = req.body.userToFollowId;

        if(!token){
            errorCode = 422;
            throw new Error("Endpoint usage requires authorization! Please, try to insert a valid token");
        };

        if(!userToFollowId) {
            errorCode = 422;
            throw new Error("'userToFollowId' field is empty! Please, try fill input´s value");
        };

        const user = await UserDatabase.getUserById(userToFollowId);

        if(!user) {
            errorCode = 409;
            throw new Error("User doesn´t exist! Please, try again");
        };

        const authData: AuthenticationData = Authenticator.getTokenData(token);

        if(authData.id === userToFollowId) {
            errorCode = 422;
            throw new Error("User can´t follow itself! Please, check input´s value");
        };

        const follows = await FollowUserDatabase.getFollowByFollowerId(authData.id);

        const indexAlreadyFollowing: number = follows.findIndex((follow: FollowRelation) => {   
            return (follow.followerUserId === authData.id && follow.followedUserId === userToFollowId);
        });

        if(indexAlreadyFollowing !== -1) {
            errorCode = 422;
            throw new Error("User have already been followed! Please, check input´s value");
        };

        await FollowUserDatabase.createFollow(authData.id, userToFollowId);

        res.status(201).send({ message: "Followed successfully!"});
    } catch(error) {
        res.status(errorCode).send({ message: error.message? error.message : error.sqlMessage });
    };
};

export default followUser;