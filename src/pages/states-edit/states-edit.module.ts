import { NgModule } from '@angular/core';
import { TrannumetryModule } from '@ngx-trannumetry/core';
import { IonicPageModule } from 'ionic-angular';

import { StatesEdit } from './states-edit';

@NgModule({
  declarations: [
    StatesEdit,
  ],
  imports: [
    IonicPageModule.forChild(StatesEdit),
    TrannumetryModule.forChild()
  ],
  exports: [
    StatesEdit
  ]
})
export class StatesEditModule { }
