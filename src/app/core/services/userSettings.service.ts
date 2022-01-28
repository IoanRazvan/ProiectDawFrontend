import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserSettings } from "src/app/models/user.model";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class UserSettingsService {
    constructor(private http: HttpClient) {
    }

    updateUserSettings(userSettings: UserSettings) : Observable<any> {
        return this.http.put(`${environment.apiUrl}/UserSettings`, userSettings);
    }
}