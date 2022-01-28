import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationConstants } from 'src/app/constants/validation.constants';
import { UserSettingsService } from 'src/app/core/services/userSettings.service';
import { UserSettings } from 'src/app/models/user.model';

@Component({
  selector: 'edit-user-settings',
  templateUrl: './edit-user-settings.component.html'
})
export class EditUserSettingsComponent implements OnInit {
  @Input() userSettings!: UserSettings;
  form!: FormGroup;
  submitting = false;
  error = "";
  ValidationConstants = ValidationConstants;

  constructor(private fb: FormBuilder, private service: UserSettingsService) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      rememberPageNumber: [this.userSettings.rememberPageNumber],
      numberOfRecentBooks: [this.userSettings.numberOfRecentBooks, Validators.compose([Validators.required, Validators.min(5), Validators.max(10)])]
    });
  }

  onSubmit() {
    this.submitting = true;
    this.service.updateUserSettings(this.form.value).subscribe({
      next: () => this.submitting = false,
      error: () => {
        this.submitting = false ;
        this.error = "Unable to update user settings";
      }
    })
  }

}
