import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationResponse } from "../api/response.models";

@Injectable()
export class SessionService {
    constructor(private router: Router) {}

    saveUser(user : AuthenticationResponse) {
        localStorage.setItem('user', user.token)
    }

    isLoggedIn() : boolean {
        return localStorage.getItem('user') !== null
    }

    logOut() {
        localStorage.removeItem('user');
        this.router.navigate(['/']);
    }
}