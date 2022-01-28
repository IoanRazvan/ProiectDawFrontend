import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { SharedModule } from '../shared/shared.module';
import { EditProfileInfoComponent } from './components/edit-profile-info/edit-profile-info.component';
import { EditUserSettingsComponent } from './components/edit-user-settings/edit-user-settings.component';



@NgModule({
  declarations: [
    SettingsComponent,
    EditProfileInfoComponent,
    EditUserSettingsComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    SettingsComponent
  ]
})
export class SettingsModule { }
