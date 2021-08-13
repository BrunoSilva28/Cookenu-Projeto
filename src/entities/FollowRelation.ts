export class FollowRelation {
    constructor(
        public followerUserId: string,
        public followedUserId: string
    ) {};

    public static toFollowModel(data: any): FollowRelation {
        return new FollowRelation(data.followerUserId, data.followedUserId);
    };
};