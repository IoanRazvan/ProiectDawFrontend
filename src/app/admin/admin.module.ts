import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { SharedModule } from '../shared/shared.module';
import { AdminService } from './services/admin.service';
import { UserCardComponent } from './components/user-card/user-card.component';



@NgModule({
  declarations: [
    AdminComponent,
    UserCardComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    AdminComponent
  ],
  providers: [
    AdminService
  ]
})
export class AdminModule { }
