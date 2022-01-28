import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Library } from "src/app/models/library.model";
import { ManyToManyUpdate } from "src/app/models/many-to-many.model";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class LibraryService {
    private serviceEndpoint = `${environment.apiUrl}/Library`
    constructor(private http: HttpClient) {
    }

    getLibraries(bookId: string) : Observable<Library[]> {
        return <any>this.http.get(`${this.serviceEndpoint}?bookId=${bookId}`);
    }

    updateLibraryAssignment(update : ManyToManyUpdate) : Observable<Library[]> {
        return <any>this.http.post(this.serviceEndpoint, update);
    }
}