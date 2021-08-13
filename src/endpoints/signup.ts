import { hash } from 'bcryptjs';
import { Request, Response } from 'express';
import { UserDatabase } from '../data/UserDatabase';
import { User } from '../entities/User';
import { Authenticator } from '../services/Authenticator';
import { HashManager } from '../services/HashManager';
import { IdGenerator } from '../services/IdGenerator';
import { USER_ROLES } from '../types';

const signup = async(
    req: Request,
    res: Response
):Promise<void> => {
    let errorCode: number = 400;
    const regExValidateEmail: RegExp = /^([a-z]){1,}([a-z0-9._-]){1,}([@]){1}([a-z]){2,}([.]){1}([a-z]){2,}([.]?){1}([a-z]?){2,}$/i;

    try {
        const { name, email, password } = req.body;
        let role: string | undefined = req.body.role;

        if(!name || !email || !password){
            errorCode = 422;
            throw new Error("One or more fields are empty! Please, check 'name', 'email' and 'password' input´s value");
        };

        if(!regExValidateEmail.test(email)){
            errorCode = 422;
            throw new Error("Insert a valid e-mail, such as: 'xxxx@yyyyy.zzz.www");
        };

        if(password.length < 6){
            errorCode = 422;
            throw new Error("'password' should´ve at least 6 characters! Please, check 'password' input value");
        };

        const alreadyExistedUser = await UserDatabase.getUserByEmail(email);

        if(alreadyExistedUser) {
            errorCode = 409;
            throw new Error("User already exist! Please, try another one");
        };

        const newId: string = IdGenerator.generateId();
        const hashPassword = await HashManager.generateHash(password);
        
        let newUser: User;
        let authorization: string = "";
        if(!role || role.toLocaleUpperCase() !== "ADMIN"){
            newUser = new User(newId, name, email, hashPassword, USER_ROLES.NORMAL);

            await UserDatabase.createUser(newUser);

            authorization = Authenticator.generateToken({id: newId, role: USER_ROLES.NORMAL});
        } else {
            newUser = new User(newId, name, email, hashPassword, USER_ROLES.ADMIN);

            await UserDatabase.createUser(newUser);

            authorization = Authenticator.generateToken({id: newId, role: USER_ROLES.ADMIN});
        };

        res.status(201).send({ message: "User created successfully!", token: authorization });
    } catch(error) {
        res.status(errorCode).send({ message: error.message? error.message : error.sqlMessage });
    };
};

export default signup;