import { Component } from "@angular/core";
import { faUserCog } from "@fortawesome/free-solid-svg-icons";

@Component({
    selector: 'settings',
    templateUrl: './settings.component.html'
})
export class SettingsComponent {
    faUserCog = faUserCog
}