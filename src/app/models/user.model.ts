export interface DirectSignInUser {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface DirectLogInUser {
    email: string;
    password: string;
}

export interface UserSettings {
    rememberPageNumber: boolean;
    numberOfRecentBooks: number;
}

export interface User {
    firstName: string;
    lastName: string;
    email: string;
    userSettings: UserSettings;
}

export type Role = "Admin" | "User";