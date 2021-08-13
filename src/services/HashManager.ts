import * as bcrypt from 'bcryptjs';

export class HashManager {
    public static generateHash = async(
        plainText: string
    ):Promise<string> => {
        const rounds = Number(process.env.BCRYPT_COST);
        const salt = await bcrypt.genSalt(rounds);
        const cypherText = await bcrypt.hash(plainText, salt);

        return cypherText;
    };

    public static compareHash = async(
        plainText: string,
        hash: string
    ): Promise<boolean> => {
        return await bcrypt.compare(plainText, hash);
    };
};