import { User } from "../entities/User";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
    public static getUserByEmail = async (
        email: string
    ): Promise<User> => {
        const user = await BaseDatabase.connection("User")
            .select()
            .where({ email });

        return user[0] && User.toUserModel(user[0]);
    };

    public static getUserById = async (
        id: string
    ): Promise<User> => {
        const user = await BaseDatabase.connection("User")
            .select()
            .where({ id });

        return user[0] && User.toUserModel(user[0]);
    };

    public static createUser = async(
        user: User
    ):Promise<void> => {
        await BaseDatabase.connection("User")
            .insert({
                id: user.getId(),
                name: user. getName(),
                email: user.getEmail(),
                password: user.getPassword(),
                role: user.getRole()
            });
    };

    public static changeUserPassword = async(
        newPassword: string,
        userId: string
    ):Promise<void> => {
        await BaseDatabase.connection("User")
            .update({ password: newPassword })
            .where({ id: userId });
    };

    public static deleteUserById = async(
        userId: string
    ):Promise<void> => {
        await BaseDatabase.connection("User")
            .delete()
            .where({id: userId});
    };
};