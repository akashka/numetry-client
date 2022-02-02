import { NgModule } from '@angular/core';
import { TrannumetryModule } from '@ngx-trannumetry/core';
import { IonicPageModule } from 'ionic-angular';

import { UserDetailPage } from './user-detail';

@NgModule({
  declarations: [
    UserDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(UserDetailPage),
    TrannumetryModule.forChild()
  ],
  exports: [
    UserDetailPage
  ]
})
export class UserDetailPageModule { }
