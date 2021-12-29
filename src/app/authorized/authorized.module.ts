import { NgModule } from "@angular/core";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { AuthorizedRoutingModule } from "./authorized-routing.module";
import { AuthorizedComponent } from "./authorized.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { TokenInterceptorService } from "../core/services/token-interceptor.service";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { SharedModule } from "../shared/shared.module";

@NgModule({
    imports: [
        AuthorizedRoutingModule,
        FontAwesomeModule,
        SharedModule,
    ],
    declarations: [
        AuthorizedComponent,
        NavbarComponent
    ],
    providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: TokenInterceptorService,
        multi: true
    }
    ],
})
export class AuthorizedModule { }