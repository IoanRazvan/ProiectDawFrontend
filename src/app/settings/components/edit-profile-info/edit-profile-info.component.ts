import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationConstants } from 'src/app/constants/validation.constants';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'edit-profile-info',
  templateUrl: './edit-profile-info.component.html'
})
export class EditProfileInfoComponent implements OnInit {
  @Input() user!: User;
  form!: FormGroup;
  formControls!: any;
  ValidationConstants = ValidationConstants;
  submitting = false;
  error = "";

  constructor(private fb: FormBuilder, private service: UserService) {
  }
  
  ngOnInit(): void {
    this.form = this.fb.group({
      firstName: [this.user.firstName, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      email: [this.user.email, Validators.compose([Validators.required, Validators.email])],
    });

    this.formControls = {
      firstName: ValidationConstants.REQUIRED,
      lastName: ValidationConstants.REQUIRED,
      email: ValidationConstants.EMAIL
    }
  }

  onSubmit() {
    this.submitting = true;
    this.service.updateProfileInformation(this.form.value)
      .subscribe({
        next: () => this.submitting = false,
        error: () => {
          this.submitting = false;
          this.error = "Unable to update profile information"
        }
      });
  }

}
