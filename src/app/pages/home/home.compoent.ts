import { Component } from "@angular/core";
import { SessionService } from "src/app/services/session.service";

@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})
export class HomeComponent {
    constructor(private sessionService: SessionService) {}

    logOut()  {
        this.sessionService.logOut();
    }
}