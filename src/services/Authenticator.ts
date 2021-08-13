import * as jwt from 'jsonwebtoken';
import { AuthenticationData } from '../types';

export class Authenticator {
    public static generateToken(data: AuthenticationData): string {
        const token = jwt.sign(
            { id: data.id, role: data.role },
            process.env.JWT_KEY as string,
            { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN }
        );

        return token;
    };

    public static getTokenData(token:string): AuthenticationData {
        const payload = jwt.verify(
            token,
            process.env.JWT_KEY as string
        );

        return payload as AuthenticationData;
    };
};