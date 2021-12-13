import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authorizedRoutes } from './authorized/authorized-routing.module';
import { AuthorizedComponent } from './authorized/authorized.component';
import { LandingComponent } from './pages/landing/landing.component';
import { LogInComponent } from './pages/log-in/log-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';

const routes: Routes = [
  {path: '', component: LandingComponent},
  {path: 'signUp', component: SignUpComponent},
  {path: 'logIn', component: LogInComponent},
  {path: 'app', children: authorizedRoutes, component: AuthorizedComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
