import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SessionService } from "src/app/core/services/session.service";

@Injectable({
    providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {
    constructor(private sessionService: SessionService) {
    }

    intercept(req : HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>> {
        if (this.sessionService.isLoggedIn()) {
            const duplicate = req.clone({headers: req.headers.set('Authorization', `Bearer ${this.sessionService.getUser()}`)});
            return next.handle(duplicate);
        }
        return next.handle(req);
    }
}
