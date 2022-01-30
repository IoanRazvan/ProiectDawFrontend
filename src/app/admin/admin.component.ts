import { Component } from "@angular/core";
import { faUserShield } from "@fortawesome/free-solid-svg-icons";

@Component({
    selector: 'admin',
    templateUrl: './admin.component.html'
})
export class AdminComponent {
    faUserShield = faUserShield;

    users: any = [
        {lastName: "Rusu", firstName: "Ioan", role: "Admin", email: "ioanrazvanrusu@gmail.com", id: "1", blocked: false},
        {lastName: "Rusu", firstName: "Gabriel", role: "Admin", email: "gabirusu@gmail.com", id: "2", blocked: false},
        {lastName: "Rusu", firstName: "Maria", role: "User", email: "mariarusu@gmail.com", id: "3", blocked: true},
        {lastName: "Rusu", firstName: "Teodora", role: "User", email: "teodorarusu@gmail.com", id: "4", blocked: false}
    ];
}