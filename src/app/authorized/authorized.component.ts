import { Component } from "@angular/core";
import { faCog, faHome, faSearch, faUpload } from "@fortawesome/free-solid-svg-icons";
import { NavItem } from "./components/navbar/navbar.component";

@Component({
    selector: 'authorized',
    templateUrl: './authorized.component.html'
})
export class AuthorizedComponent {
    navItems: NavItem[] = [
        {icon: faHome, link: '/app'},
        {icon: faSearch, link: 'search'},
        {icon: faUpload, link: 'uploads'},
        {icon: faCog, link: 'settings'}
    ];
}