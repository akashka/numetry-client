import { NgModule } from '@angular/core';
import { TrannumetryModule } from '@ngx-trannumetry/core';
import { IonicPageModule } from 'ionic-angular';

import { DistrictEdit } from './district-edit';

@NgModule({
  declarations: [
    DistrictEdit,
  ],
  imports: [
    IonicPageModule.forChild(DistrictEdit),
    TrannumetryModule.forChild()
  ],
  exports: [
    DistrictEdit
  ]
})
export class DistrictEditModule { }
