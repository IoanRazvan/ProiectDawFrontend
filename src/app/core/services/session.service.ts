import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationResponse } from "../../api/response.models";

@Injectable({
    providedIn: 'root'
})
export class SessionService {
    constructor(private router: Router) {}

    private tokenExpired(token: string) : boolean {
        const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
        return (Math.floor((new Date).getTime() / 1000)) >= expiry;
    }

    saveUser(user : AuthenticationResponse) {
        localStorage.setItem('user', user.token)
    }

    getUser() : string | null {
        const token = localStorage.getItem('user');
        if (token && this.tokenExpired(token))
            localStorage.removeItem('user');
        return token;
    }

    isLoggedIn() : boolean {
        return localStorage.getItem('user') !== null
    }

    logOut() {
        localStorage.removeItem('user');
        this.router.navigate(['/']);
    }
}