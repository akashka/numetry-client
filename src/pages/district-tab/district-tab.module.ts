import { NgModule } from '@angular/core';
import { TrannumetryModule } from '@ngx-trannumetry/core';
import { IonicPageModule } from 'ionic-angular';

import { DistrictTab } from './district-tab';

@NgModule({
  declarations: [
    DistrictTab,
  ],
  imports: [
    IonicPageModule.forChild(DistrictTab),
    TrannumetryModule.forChild()
  ],
  exports: [
    DistrictTab
  ]
})
export class DistrictTabModule { }
