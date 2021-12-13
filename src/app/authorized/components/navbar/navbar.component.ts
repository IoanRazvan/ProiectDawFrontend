import { Component, Input } from "@angular/core";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

export interface NavItem {
    icon: IconDefinition;
    link: string;
}

@Component({
    selector: 'navbar',
    templateUrl: './navbar.component.html'
})
export class NavbarComponent {
    @Input() navItems!: NavItem[];
}