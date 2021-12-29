import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { ValidationConstants } from "../constants/validation.constants";
import { UserService } from "../core/services/user.service";

export class AuthetnticationBase {
    form: FormGroup;
    validationConstants = ValidationConstants;
    submitting = false;

    constructor(fb: FormBuilder, controlsConfig: Record<string, any>, protected router : Router, protected userService: UserService) {
        this.form = fb.group(controlsConfig);
    }

    onSubmit() : boolean {
        this.submitting = true;
        return false;
    }

    onSubmitSuccess() {
        this.submitting = false;
        this.router.navigate(['/app']);
    }

    onSubmitError(err: any) {
        this.submitting = false;
        if (err.status === 400) {
            if (err.error?.message)
                this.form.setErrors({message: err.error.message});
        } else {
            this.form.setErrors({message: "Unexpected error"})
        }
    }
}