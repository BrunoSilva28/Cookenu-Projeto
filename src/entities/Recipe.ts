export class Recipe {
    constructor(
        public id: string,
        public title: string,
        public description: string,
        public createdAt: string,
        public creatorId: string,
        public lastUpdate?: string  
    ) {};

    public static toRecipeModel(data: any):Recipe {
        return new Recipe(data.id, data.title, data.description, data.createdAt, data.creatorId, data.lastUpdate);
    };
}