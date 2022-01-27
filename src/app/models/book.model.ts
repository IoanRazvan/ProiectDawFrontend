import { Genre } from "./genre.model";

export interface Book {
    id?: string;
    title: string;
    description?: string;
    coverUrl: string;
    authorName: string;
    genres: Genre[];
}

export interface BookDetails extends Book {
    meanRating: number;
    ratingCount: number;
    uploadedBy: string;
}

export const DEFAULT_BOOK_DATA : Book = {
    title: '',
    description: '',
    coverUrl: '',
    authorName: '',
    genres: []
}