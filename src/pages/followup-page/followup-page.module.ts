import { NgModule } from '@angular/core';
import { TrannumetryModule } from '@ngx-trannumetry/core';
import { IonicPageModule } from 'ionic-angular';

import { FollowupPage } from './followup-page';

@NgModule({
  declarations: [
    FollowupPage,
  ],
  imports: [
    IonicPageModule.forChild(FollowupPage),
    TrannumetryModule.forChild()
  ],
  exports: [
    FollowupPage
  ]
})
export class FollowupPageModule { }
