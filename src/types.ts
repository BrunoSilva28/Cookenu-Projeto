export enum USER_ROLES {
    ADMIN = "ADMIN",
    NORMAL = "NORMAL"
};


export interface AuthenticationData {
    id: string,
    role: USER_ROLES
};