import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DirectLogInUser, DirectSignInUser, User } from "src/app/models/user.model";
import { environment } from "src/environments/environment";
import { AuthenticationResponse } from "../../api/response.models";
import { SessionService } from "./session.service";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private serviceEndpoint = `${environment.apiUrl}/User`;

    constructor(private http: HttpClient, private sessionService: SessionService) { }

    signIn(userObject: DirectSignInUser, onSuccess: () => void, onError?: (err: any) => void) {
        this.authenticate(this.serviceEndpoint, userObject, onSuccess, onError);
    }

    logIn(userObject: DirectLogInUser, onSuccess: () => void, onError?: (err: any) => void) {
        this.authenticate(`${this.serviceEndpoint}/authenticate`, userObject, onSuccess, onError);
    }

    private authenticate(url: string, userObject: DirectSignInUser | DirectLogInUser, onSuccess: () => void, onError?: (err: any) => void) {
        this.http.post(url, userObject).subscribe({
            next: resp => {
                this.sessionService.saveUser(<AuthenticationResponse>resp);
                onSuccess();
            },
            error: err => onError?.(err)
        });
    }

    getProfileInformation() : Observable<User> {
        return <any>this.http.get(this.serviceEndpoint);
    }

    updateProfileInformation(userInfo: User) : Observable<any> {
        return <any>this.http.put(this.serviceEndpoint, userInfo);
    }
}