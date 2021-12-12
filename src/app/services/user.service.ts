import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthenticationResponse } from "../api/response.models";
import { DirectLogInUser, DirectSignInUser } from "../models/user.models";
import { SessionService } from "./session.service";

@Injectable()
export class UserService {
    constructor(private http: HttpClient, private sessionService: SessionService) { }

    signIn(userObject: DirectSignInUser, onSuccess: () => void, onError?: (err : any) => void) {
        this.authenticate("http://localhost:48463/api/User/register", userObject, onSuccess, onError);
    }

    logIn(userObject: DirectLogInUser, onSuccess: () => void, onError?: (err: any) => void) {
        this.authenticate("http://localhost:48463/api/User/login", userObject, onSuccess, onError);
    }

    private authenticate(url: string, userObject: DirectSignInUser | DirectLogInUser, onSuccess: () => void, onError?: (err : any) => void) {
        this.http.post(url, userObject).subscribe({
            next: resp => {
                this.sessionService.saveUser(<AuthenticationResponse>resp);
                onSuccess();
            },
            error: err => onError?.(err)
        });
    }
}