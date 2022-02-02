import { NgModule } from '@angular/core';
import { TrannumetryModule } from '@ngx-trannumetry/core';
import { IonicPageModule } from 'ionic-angular';

import { ProgramEditPage } from './program-update';

@NgModule({
  declarations: [
    ProgramEditPage,
  ],
  imports: [
    IonicPageModule.forChild(ProgramEditPage),
    TrannumetryModule.forChild()
  ],
  exports: [
    ProgramEditPage
  ]
})

export class ProgramEditPageModule { }
