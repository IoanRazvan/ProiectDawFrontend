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

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    SignUpComponent,
    FormInputComponent,
    DeCamelCasePipe,
    FormatValidationMessagePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
