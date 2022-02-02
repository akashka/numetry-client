import { NgModule } from '@angular/core';
import { TrannumetryModule } from '@ngx-trannumetry/core';
import { IonicPageModule } from 'ionic-angular';

import { ProgramAddPage } from './program-create';

@NgModule({
  declarations: [
    ProgramAddPage,
  ],
  imports: [
    IonicPageModule.forChild(ProgramAddPage),
    TrannumetryModule.forChild()
  ],
  exports: [
    ProgramAddPage
  ]
})
export class ProgramAddPageModule { }
