import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthenticationResponse } from "../api/response.models";
import { DirectSignInUser } from "../models/user.models";
import { SessionService } from "./session.service";

@Injectable()
export class UserService {
    constructor(private http: HttpClient, private sessionService: SessionService) { }

    signIn(userObject: DirectSignInUser, onSuccess: () => void, onError?: (err : any) => void) {
        const headers = new HttpHeaders({
            "Content-Type": "application/json"
        })
        this.http.post("http://localhost:48463/api/User/register", userObject, {headers}).subscribe({
            next: resp => {
                this.sessionService.saveUser(<AuthenticationResponse>resp);
                onSuccess();
            },
            error: err => onError?.(err)
        });
    }
}