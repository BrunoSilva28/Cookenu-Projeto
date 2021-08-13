import { FollowRelation } from "../entities/FollowRelation";
import { BaseDatabase } from "./BaseDatabase";


export class FollowUserDatabase extends BaseDatabase {
    public static getFollowByFollowerId = async(
        followerUserId: string
    ):Promise<FollowRelation[]> => {
        const follows = await BaseDatabase.connection("FollowUser_junction")
            .select()
            .where({ followerUserId });

        return follows.map((follow) => FollowRelation.toFollowModel(follow));
    };

    public static createFollow = async(
        followerUserId: string,
        followedUserId: string
    ):Promise<void> => {
        await BaseDatabase.connection("FollowUser_junction")
            .insert({
                followerUserId,
                followedUserId
            });
    };

    public static deleteFollow = async(
        followerUserId: string,
        followedUserId: string
    ):Promise<void> => {
        await BaseDatabase.connection("FollowUser_junction")
            .delete()
            .where({
                followerUserId,
                followedUserId    
            });
    };

    public static deleteAllFollowsByFollowerId = async(
        followerUserId: string
    ):Promise<void> => {
        await BaseDatabase.connection("FollowUser_junction")
            .delete()
            .where({ followerUserId });
    };
};