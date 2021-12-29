import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { AuthenticationResponse } from "../../api/response.models";
import { DirectLogInUser } from '../../models/direct-log-in-user.model'
import { DirectSignInUser } from "../../models/direct-sign-in-user.model";
import { SessionService } from "./session.service";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private http: HttpClient, private sessionService: SessionService) { }

    signIn(userObject: DirectSignInUser, onSuccess: () => void, onError?: (err: any) => void) {
        this.authenticate(`http://localhost:48463/api/User`, userObject, onSuccess, onError);
    }

    logIn(userObject: DirectLogInUser, onSuccess: () => void, onError?: (err: any) => void) {
        this.authenticate(`http://localhost:48463/api/User/authenticate`, userObject, onSuccess, onError);
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
}