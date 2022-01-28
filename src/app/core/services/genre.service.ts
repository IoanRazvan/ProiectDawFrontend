import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Genre } from "src/app/models/genre.model";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class GenreService {
    private serviceEndpoint = `${environment.apiUrl}/Genre`;
    
    constructor(private http: HttpClient) {}

    getAll() : Observable<Genre[]> {
        return <any> this.http.get(this.serviceEndpoint);
    }
}