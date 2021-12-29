import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationResponse } from "../../api/response.models";

@Injectable({
    providedIn: 'root'
})
export class SessionService {
    constructor(private router: Router) {}

    saveUser(user : AuthenticationResponse) {
        localStorage.setItem('user', user.token)
    }

    getUser() : string | null {
        return localStorage.getItem('user');
    }

    isLoggedIn() : boolean {
        return localStorage.getItem('user') !== null
    }

    logOut() {
        localStorage.removeItem('user');
        this.router.navigate(['/']);
    }
}