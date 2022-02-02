import { NgModule } from '@angular/core';
import { TrannumetryModule } from '@ngx-trannumetry/core';
import { IonicPageModule } from 'ionic-angular';

import { UsersPage } from './users_lists';

@NgModule({
  declarations: [
    UsersPage,
  ],
  imports: [
    IonicPageModule.forChild(UsersPage),
    TrannumetryModule.forChild()
  ],
  exports: [
    UsersPage
  ]
})
export class UsersPageModule { }
