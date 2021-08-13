import { v4 } from 'uuid';

export class IdGenerator {
    public static generateId(): string {
        return v4();
    };
};