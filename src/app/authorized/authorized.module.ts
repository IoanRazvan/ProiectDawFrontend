import { NgModule } from "@angular/core";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { AuthorizedRoutingModule } from "./authorized-routing.module";
import { AuthorizedComponent } from "./authorized.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { TokenInterceptorService } from "../core/services/token-interceptor.service";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { SharedModule } from "../shared/shared.module";
import { UploadsModule } from "../uploads/uploads.module";
import { SearchModule } from "../search/search.module";
import { BookReadingModule } from "../book-reading/book-reading.module";
import { BookDetailsModule } from "../book-details/book-details.module";

@NgModule({
    imports: [
        AuthorizedRoutingModule,
        FontAwesomeModule,
        SharedModule,
        UploadsModule,
        SearchModule,
        BookDetailsModule,
        BookReadingModule
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