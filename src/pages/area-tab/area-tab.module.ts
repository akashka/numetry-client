import { NgModule } from '@angular/core';
import { TrannumetryModule } from '@ngx-trannumetry/core';
import { IonicPageModule } from 'ionic-angular';

import { AreaTab } from './area-tab';

@NgModule({
  declarations: [
    AreaTab,
  ],
  imports: [
    IonicPageModule.forChild(AreaTab),
    TrannumetryModule.forChild()
  ],
  exports: [
    AreaTab
  ]
})
export class AreaTabModule { }
