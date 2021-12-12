import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { DirectSignInUser } from "src/app/models/user.models";
import { UserService } from "src/app/services/user.service";
import { AuthetnticationBase } from "../authentication.base-controller";

@Component({
    selector: 'sign-up',
    templateUrl: './sign-up.component.html'
})
export class SignUpComponent extends AuthetnticationBase implements OnInit {
    constructor(fb: FormBuilder, userService: UserService, router: Router) {
        super(fb, {
            'lastName': ['', Validators.required],
            'firstName': ['', Validators.required],
            'email': ['', Validators.compose([Validators.required, Validators.email])],
            'password': ['', Validators.compose([Validators.required, Validators.minLength(6)])],
            'confirmPassword': ['',]
        }, router, userService);
    }

    ngOnInit() {
        this.form.controls['password'].valueChanges.subscribe(() => {
            const confirmPasswordControl = this.form.controls['confirmPassword']
            confirmPasswordControl.setValidators([Validators.required, Validators.pattern(`^${this.form.controls['password'].value}\$`)]);
            confirmPasswordControl.updateValueAndValidity();
        })
    }

    override onSubmit() : boolean {
        super.onSubmit();
        const userObject : DirectSignInUser = Object.assign({}, this.form.value);
        this.userService.signIn(userObject, this.onSubmitSuccess.bind(this), this.onSubmitError.bind(this));
        return false;
    }

    override onSubmitError(err : any) {
        super.onSubmitError(err);
        if (err.status === 400) {
            for (let errKey in err.error) {
                if (errKey in this.form.value)
                    this.form.controls[errKey].setErrors({message: err.error[errKey]})
            }
        }
    }
}