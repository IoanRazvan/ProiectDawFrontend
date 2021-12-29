import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authorizedRoutes } from './authorized/authorized-routing.module';
import { AuthorizedComponent } from './authorized/authorized.component';
import { LandingComponent } from './components/landing/landing.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { RouteGuard } from './core/services/route-guard.service';

const routes: Routes = [
  {path: '', component: LandingComponent, canActivate: [RouteGuard]},
  {path: 'signup', component: SignUpComponent, canActivate: [RouteGuard]},
  {path: 'login', component: LogInComponent, canActivate: [RouteGuard]},
  {path: 'app', children: authorizedRoutes, component: AuthorizedComponent, canActivate: [RouteGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
