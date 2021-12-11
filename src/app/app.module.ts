import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from 'angularx-social-login';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
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
    FontAwesomeModule,
    SocialLoginModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider("126630284623-c5u4jms1uf8oe4n30a60dvd7ol54ciop.apps.googleusercontent.com")
          }
        ]
      } as SocialAuthServiceConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
