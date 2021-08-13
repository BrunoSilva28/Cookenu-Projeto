import { Request, Response } from 'express';
import { UserDatabase } from '../data/UserDatabase';
import { Authenticator } from '../services/Authenticator';
import { HashManager } from '../services/HashManager';
import { USER_ROLES } from '../types';

const login = async(
    req: Request,
    res: Response
):Promise<void> => {
    let errorCode: number = 400;

    try {
        const { email, password } = req.body;
        const regExValidateEmail: RegExp = /^([a-z]){1,}([a-z0-9._-]){1,}([@]){1}([a-z]){2,}([.]){1}([a-z]){2,}([.]?){1}([a-z]?){2,}$/i;

        if(!email || !password) {
            errorCode = 422;
            throw new Error("One or more fields are empty! Please, check 'email' and 'password' input´s value");
        };

        if(!regExValidateEmail.test(email)){
            errorCode = 422;
            throw new Error("Insert a valid e-mail, such as: 'xxxx@yyyyy.zzz.www");
        };

        if(password.length < 6){
            errorCode = 422;
            throw new Error("'password' should´ve at least 6 characters! Please, check 'password' input value");
        };

        const user = await UserDatabase.getUserByEmail(email);

        if(!user) {
            errorCode = 409;
            throw new Error("Unregistered user! Please, try again");
        };

        const verifyAuth = await HashManager.compareHash(password, user.getPassword());

        if(!verifyAuth){
            errorCode = 401;
            throw new Error("Unauthorized access! Please, try again");
        };

        let authorization: string = "";
        if(user.getRole() === "NORMAL") {
            authorization = Authenticator.generateToken({id: user.getId(), role: USER_ROLES.NORMAL});
        } else {
            authorization = Authenticator.generateToken({id: user.getId(), role: USER_ROLES.ADMIN});
        };
        
        res.status(200).send({ message: "Login has been successfully!", token: authorization });
    } catch(error) {
        res.status(errorCode).send({ message: error.message? error.message : error.sqlMessage });
    };
};

export default login;