import { NgModule } from '@angular/core';
import { TrannumetryModule } from '@ngx-trannumetry/core';
import { IonicPageModule } from 'ionic-angular';

import { FollowupViewTab } from './followupview-tab';

@NgModule({
  declarations: [
    FollowupViewTab,
  ],
  imports: [
    IonicPageModule.forChild(FollowupViewTab),
    TrannumetryModule.forChild()
  ],
  exports: [
    FollowupViewTab
  ]
})
export class FollowupViewTabModule { }
