import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authorizedRoutes } from './authorized/authorized-routing.module';
import { AuthorizedComponent } from './authorized/authorized.component';
import { LandingComponent } from './components/landing/landing.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

const routes: Routes = [
  {path: '', component: LandingComponent},
  {path: 'signup', component: SignUpComponent},
  {path: 'login', component: LogInComponent},
  {path: 'app', children: authorizedRoutes, component: AuthorizedComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
