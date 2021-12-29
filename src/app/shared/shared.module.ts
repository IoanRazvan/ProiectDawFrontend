import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DismissableAlertComponent } from './components/dismissable-alert/dismissable-alert.component';
import { FormInputComponent } from './components/form-input/form-input.component';
import { FormSubmissionButtonComponent } from './components/form-submission-button/form-submission-button.component';
import { DeCamelCasePipe } from './pipes/de-camel-case.pipe';
import { FormatValidationMessagePipe } from './pipes/format-validation-message.pipe';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [
    DismissableAlertComponent,
    FormInputComponent,
    FormSubmissionButtonComponent,
    DeCamelCasePipe,
    FormatValidationMessagePipe,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule
  ],
  exports: [
    DismissableAlertComponent,
    FormInputComponent,
    FormSubmissionButtonComponent,
    DeCamelCasePipe,
    FormatValidationMessagePipe,
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ]
})
export class SharedModule { }
