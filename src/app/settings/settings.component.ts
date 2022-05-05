import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { SessionService } from "../core/services/session.service";
import { UserService } from "../core/services/user.service";
import { User } from "../models/user.model";

@Component({
    selector: 'settings',
    templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit {
    user!: User;
    loading = true;
    error = false;

    constructor(private sessionService: SessionService, private userService: UserService, private router: Router) {
    }

    ngOnInit(): void {
        this.userService.getProfileInformation()
            .subscribe({
                next: (user) => {
                    this.user = user;
                    this.loading = false;
                },
                error: () => { 
                    this.error = true;
                    this.loading = false;
                }
            });
    }

    onLogOut() {
        this.sessionService.removeUser();
        this.router.navigate(['/']);
    }
}