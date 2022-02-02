import { NgModule } from '@angular/core';
import { TrannumetryModule } from '@ngx-trannumetry/core';
import { IonicPageModule } from 'ionic-angular';

import { ProfileTab } from './profile-tab';

@NgModule({
  declarations: [
    ProfileTab,
  ],
  imports: [
    IonicPageModule.forChild(ProfileTab),
    TrannumetryModule.forChild()
  ],
  exports: [
    ProfileTab
  ]
})
export class ProfileTabModule { }
