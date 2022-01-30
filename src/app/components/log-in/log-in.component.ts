import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from "src/app/core/services/user.service";
import { DirectLogInUser } from "src/app/models/user.model";
import { AuthetnticationBase } from "../authentication-base.controller";

@Component({
    selector: 'log-in',
    templateUrl: './log-in.component.html'
})
export class LogInComponent extends AuthetnticationBase {

    constructor(fb: FormBuilder, userService : UserService, router: Router) {
        super(fb, {
            'email': ['', Validators.compose([Validators.required, Validators.email])],
            'password': ['', Validators.compose([Validators.required, Validators.minLength(6)])]
        }, router, userService);

    }

    override onSubmit() : boolean {
        super.onSubmit();
        const userCredentials: DirectLogInUser = this.form.value;
        this.userService.logIn(userCredentials).subscribe({
            next: this.onSubmitSuccess.bind(this),
            error: this.onSubmitError.bind(this)
        });
        return false;
    }
}