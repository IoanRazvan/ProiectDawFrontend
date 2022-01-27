import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Library, LibraryAssignmentUpdate } from "src/app/models/library.model";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class LibraryService {
    constructor(private http: HttpClient) {
    }

    getLibraries(bookId: string) : Observable<Library[]> {
        return <any>this.http.get(`${environment.apiUrl}/Library?bookId=${bookId}`);
    }

    updateLibraryAssignment(update : LibraryAssignmentUpdate) : Observable<Library[]> {
        return <any>this.http.post(`${environment.apiUrl}/Library`, update);
    }
}