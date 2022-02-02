import { NgModule } from '@angular/core';
import { TrannumetryModule } from '@ngx-trannumetry/core';
import { IonicPageModule } from 'ionic-angular';

import { HomeTab } from './home-tab';

@NgModule({
  declarations: [
    HomeTab,
  ],
  imports: [
    IonicPageModule.forChild(HomeTab),
    TrannumetryModule.forChild()
  ],
  exports: [
    HomeTab
  ]
})
export class HomeTabModule { }
