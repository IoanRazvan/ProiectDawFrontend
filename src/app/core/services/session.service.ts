import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Role } from "src/app/models/user.model";
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

    getRole() : Role {
        const jwtPayload = this.parseJwt();
        return jwtPayload.role;
    }

    private parseJwt() {
        let token = <string>this.getUser();
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    
        return JSON.parse(jsonPayload);
    }

    saveUser(user : AuthenticationResponse) {
        localStorage.setItem('user', user.token)
    }

    getUser() : string | null {
        let token = localStorage.getItem('user');
        if (token && this.tokenExpired(token)) {
            token = null;
            localStorage.removeItem('user');
        }
        return token;
    }

    isLoggedIn() : boolean {
        return this.getUser() !== null
    }

    logOut() {
        localStorage.removeItem('user');
        this.router.navigate(['/']);
    }
}