import { NgModule } from '@angular/core';
import { TrannumetryModule } from '@ngx-trannumetry/core';
import { IonicPageModule } from 'ionic-angular';

import { StatesTab } from './states-tab';

@NgModule({
  declarations: [
    StatesTab,
  ],
  imports: [
    IonicPageModule.forChild(StatesTab),
    TrannumetryModule.forChild()
  ],
  exports: [
    StatesTab
  ]
})
export class StatesTabModule { }
