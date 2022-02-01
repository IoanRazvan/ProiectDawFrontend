import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { Page } from "src/app/models/page.model";
import { PostedReview, ReviewData } from "src/app/models/review.model";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class ReviewService {
    private serviceEndpoint = `${environment.apiUrl}/Review`;

    constructor(private http:  HttpClient) {
    }

    getReviews(bookId: number, page: number, pageSize: number) : Observable<Page<PostedReview>> {
        return <any>this.http.get(`${this.serviceEndpoint}/${bookId}?page=${page}&pageSize=${pageSize}`); 
    }

    canReview(bookId: number) : Observable<boolean> {
        return <any>this.http.get(`${this.serviceEndpoint}/has-reviewed/${bookId}`).pipe(
            map((truth) => !truth)
        );
    }

    saveReview(bookId: number, reviewData: ReviewData) : Observable<PostedReview> {
        return <any>this.http.post(`${this.serviceEndpoint}/${bookId}`, reviewData);
    }
}