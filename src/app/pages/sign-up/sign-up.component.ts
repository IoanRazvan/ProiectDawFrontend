import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ValidationConstants } from "src/app/constants/validation.constants";
import { DirectSignInUser } from "src/app/models/user.models";
import { UserService } from "src/app/services/user.service";

@Component({
    selector: 'sign-up',
    templateUrl: './sign-up.component.html'
})
export class SignUpComponent implements OnInit {
    form : FormGroup;
    validationConstants = ValidationConstants;
    submitting = false;

    constructor(fb: FormBuilder, private userService: UserService, private router: Router) {
        this.form = fb.group({
            'lastName': ['', Validators.required],
            'firstName': ['', Validators.required],
            'email': ['', Validators.compose([Validators.required, Validators.email])],
            'password': ['', Validators.compose([Validators.required, Validators.minLength(6)])],
            'confirmPassword': ['',]
        });
    }

    ngOnInit() {
        this.form.controls['password'].valueChanges.subscribe(() => {
            const confirmPasswordControl = this.form.controls['confirmPassword']
            confirmPasswordControl.setValidators([Validators.required, Validators.pattern(`^${this.form.controls['password'].value}\$`)]);
            confirmPasswordControl.updateValueAndValidity();
        })
    }

    onSubmit() : boolean {
        this.submitting = true;
        const userObject : DirectSignInUser = Object.assign({}, this.form.value);
        this.userService.signIn(userObject, this.onSubmitSuccess.bind(this), this.onSubmitError.bind(this));
        return false;
    }

    onSubmitSuccess() {
        this.submitting = false;
        this.router.navigate(['/home']);
    }

    onSubmitError(err : any) {
        if (err.status === 400) {
            for (let errKey in err.error) {
                if (errKey in this.form.value)
                    this.form.controls[errKey].setErrors({message: err.error[errKey]})
            }
            if (err.error.message)
                this.form.setErrors({message: err.error.message});
        }
        else
            this.form.setErrors({message: "Unexpected error. Try re-submitting"});
        this.submitting = false;
    }
}