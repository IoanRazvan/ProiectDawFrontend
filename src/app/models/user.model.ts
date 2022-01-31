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

export interface AdminEditableUser {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    userRole: Role;
    isDisabled: boolean;
}

export type Role = "Admin" | "User";

export type UserEventType = "enable" | "disable" | "promote";

export interface UserEvent {
    operation: UserEventType;
    id: string;
}