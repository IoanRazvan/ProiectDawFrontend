import { Component } from "@angular/core";
import { faCog, faHome, faSearch, faUpload, faUsersCog } from "@fortawesome/free-solid-svg-icons";
import { SessionService } from "../core/services/session.service";
import { NavItem } from "./components/navbar/navbar.component";

@Component({
    selector: 'authorized',
    templateUrl: './authorized.component.html'
})
export class AuthorizedComponent {
    navItems: NavItem[];

    constructor(service: SessionService) {
        this.navItems = [
            {icon: faHome, link: '/app'},
            {icon: faSearch, link: 'search'},
            {icon: faUpload, link: 'uploads'},
            {icon: faCog, link: 'settings'}
        ];
        if (service.getUserRole() === "Admin")
            this.addAdminRoute();
    }

    addAdminRoute() {
        this.navItems = this.navItems.slice(0, 3).concat([{icon: faUsersCog, link: 'admin'}]).concat(this.navItems.slice(3));   
    }
}