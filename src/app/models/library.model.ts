export interface Library {
    id: string;
    name: string;
}

export interface LibraryAssignments {
    selectedLibraries: Library[];
    libraries: Library[];
}