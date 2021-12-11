import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { GoogleLoginProvider, SocialAuthService } from "angularx-social-login";
import { ValidationConstants } from "src/app/constants/validation.constants";

@Component({
    selector: 'sign-up',
    templateUrl: './sign-up.component.html'
})
export class SignUpComponent implements OnInit {
    form : FormGroup;
    validationConstants = ValidationConstants;

    constructor(
        private socialAuthService: SocialAuthService,
        fb: FormBuilder
    ) {
        this.form = fb.group({
            'lastName': ['', Validators.required],
            'firstName': ['', Validators.required],
            'email': ['', Validators.compose([Validators.required, Validators.email])],
            'password': ['', Validators.compose([Validators.required, Validators.minLength(6)])],
            'confirmPassword': ['',]
        });
    }

    ngOnInit() {
        this.socialAuthService.authState.subscribe((user) => {
            console.log(user);
        })
        this.form.controls['password'].valueChanges.subscribe(() => {
            const confirmPasswordControl = this.form.controls['confirmPassword']
            confirmPasswordControl.setValidators([Validators.required, Validators.pattern(`^${this.form.controls['password'].value}\$`)]);
            confirmPasswordControl.updateValueAndValidity();
        })
    }

    logInWithGoogle() {
        console.log(this.socialAuthService);
        this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
            .then(() => console.log('logged in'));
    }
}