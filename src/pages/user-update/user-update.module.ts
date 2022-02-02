import { NgModule } from '@angular/core';
import { TrannumetryModule } from '@ngx-trannumetry/core';
import { IonicPageModule } from 'ionic-angular';

import { UserUpdatePage } from './user-update';

@NgModule({
  declarations: [
    UserUpdatePage,
  ],
  imports: [
    IonicPageModule.forChild(UserUpdatePage),
    TrannumetryModule.forChild()
  ],
  exports: [
    UserUpdatePage
  ]
})
export class UserUpdatePageModule { }
