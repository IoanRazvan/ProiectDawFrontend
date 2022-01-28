import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BookOrder } from "src/app/constants/ordering.constants";
import { Book, BookDetails } from "src/app/models/book.model";
import { Page } from "src/app/models/page.model";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class BookService {
    private serviceEndpoint = `${environment.apiUrl}/Book`;

    constructor(private http: HttpClient) {
    }

    saveBook(book: FormData): Observable<Book> {
        return <any>this.http.post(this.serviceEndpoint, book);
    }

    getUploadedBooksByTitle(query: string, pageNumber: number, pageSize: number): Observable<Page<Book>> {
        console.log('getPage');
        return <any>this.http.get(`${this.serviceEndpoint}/Uploads?q=${query}&page=${pageNumber}&pageSize=${pageSize}`);

    }

    updateBook(book: FormData, id: string) : Observable<Book> {
        return <any>this.http.put(`${this.serviceEndpoint}/${id}`, book);
    }

    deleteBook(id: string) : Observable<any> {
        return this.http.delete(`${this.serviceEndpoint}/${id}`);
    }

    getBooks(pageNumber: number, pageSize: number, order?: BookOrder, field?: "author" | "title", query?: string): Observable<Page<Book>> {
        console.log('getPage');
        let q = ''
        if (field)
            q = `&field=${field}&q=${query}`
        
        return <any>this.http.get(`${this.serviceEndpoint}?page=${pageNumber}&pageSize=${pageSize}&order=${order}${q}`);
    }

    getBook(id: string) : Observable<BookDetails> {
        return <any>this.http.get(`${this.serviceEndpoint}/${id}`);
    }
}