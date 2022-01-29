import { Injectable } from "@angular/core";
import { CanActivate, Router, UrlTree } from "@angular/router";
import { SessionService } from "./session.service";

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate {
    constructor(private service: SessionService, private router: Router) {
    }
    
    canActivate(): boolean | UrlTree {
        if (this.service.getRole() === "Admin")
            return true;
        return this.router.parseUrl(this.router.url);
    }
}