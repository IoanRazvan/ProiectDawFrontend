import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormInputComponent } from 'src/app/components/form-input/form-input.component';
import { DeCamelCasePipe } from './pipes/de-camel-case.pipe';
import { LandingComponent } from './pages/landing/landing.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { FormatValidationMessagePipe } from './pipes/format-validation-message.pipe';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './services/user.service';
import { SessionService } from './services/session.service';
import { FormSubmissionButtonComponent } from './components/form-submission-button/form-submission-button.component';
import { DismissableAlertComponent } from './components/dismissable-alert/dismissable-alert.component';
import { LogInComponent } from './pages/log-in/log-in.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    SignUpComponent,
    LogInComponent,
    FormInputComponent,
    FormSubmissionButtonComponent,
    DeCamelCasePipe,
    FormatValidationMessagePipe,
    DismissableAlertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    UserService,
    SessionService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
