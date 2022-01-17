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
import { AppHeaderComponent } from './components/header/header.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { CenteredMessageComponent } from './components/centered-message/centered-message.component';
import { BookCardComponent } from './components/book-card/book-card.component';
import { PagerComponent } from './components/pager/pager.component';
import { LoadingSuccessErrorComponent } from './components/loading-success-error/loading-success-error.component';



@NgModule({
  declarations: [
    DismissableAlertComponent,
    FormInputComponent,
    FormSubmissionButtonComponent,
    AppHeaderComponent,
    SpinnerComponent,
    CenteredMessageComponent,
    BookCardComponent,
    PagerComponent,
    DeCamelCasePipe,
    FormatValidationMessagePipe,
    LoadingSuccessErrorComponent
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
    AppHeaderComponent,
    SpinnerComponent,
    CenteredMessageComponent,
    BookCardComponent,
    PagerComponent,
    LoadingSuccessErrorComponent,
    DeCamelCasePipe,
    FormatValidationMessagePipe,
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ]
})
export class SharedModule { }
