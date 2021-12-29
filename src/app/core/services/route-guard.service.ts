import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { SessionService } from "./session.service";

@Injectable({
    providedIn: 'root'
})
export class RouteGuard implements CanActivate {
    constructor(private sessionService: SessionService, private router : Router) {}

    canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        console.log(route.url);
        const routeRequiresUnauthenticatedAccess = route.url.findIndex(segment => ['login', 'signup'].includes(segment.path)) !== -1 || route.url.length === 0;
        if (routeRequiresUnauthenticatedAccess && this.sessionService.isLoggedIn())
            return this.router.parseUrl("/app");
        else if (!routeRequiresUnauthenticatedAccess && !this.sessionService.isLoggedIn())
            return this.router.parseUrl("/");
        return true;
    }
}
