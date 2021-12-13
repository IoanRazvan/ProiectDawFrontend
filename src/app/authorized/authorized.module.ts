import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { AuthorizedRoutingModule } from "./authorized-routing.module";
import { AuthorizedComponent } from "./authorized.component";
import { NavbarComponent } from "./components/navbar/navbar.component";

@NgModule({
    imports: [
        BrowserModule,
        AuthorizedRoutingModule,
        FontAwesomeModule,
    ],
    declarations: [
        AuthorizedComponent,
        NavbarComponent
    ],
    bootstrap: [
        AuthorizedComponent
    ]
})
export class AuthorizedModule {}