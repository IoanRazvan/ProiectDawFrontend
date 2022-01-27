export interface Library {
    id: string;
    name: string;
}

export interface LibraryAssignmentUpdate {
    bookId: string;
    added: string[];
    removed: string[];
}