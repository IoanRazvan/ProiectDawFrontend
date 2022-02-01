
export interface ReviewData {
    score: number;
    comment: string;
}

export interface PostedReview extends ReviewData {
    reviewerFirstName: string;
    reviewerLastName: string;
    bookId: string;
    dateOfPosting: string;
}
