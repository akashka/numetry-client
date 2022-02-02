import { NgModule } from '@angular/core';
import { TrannumetryModule } from '@ngx-trannumetry/core';
import { IonicPageModule } from 'ionic-angular';

import { FollowupCreateTab } from './followupcreate-tab';

@NgModule({
  declarations: [
    FollowupCreateTab,
  ],
  imports: [
    IonicPageModule.forChild(FollowupCreateTab),
    TrannumetryModule.forChild()
  ],
  exports: [
    FollowupCreateTab
  ]
})
export class FollowupCreateTabModule { }
