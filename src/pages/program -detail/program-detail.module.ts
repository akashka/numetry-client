import { NgModule } from '@angular/core';
import { TrannumetryModule } from '@ngx-trannumetry/core';
import { IonicPageModule } from 'ionic-angular';

import { ProgramDetailPage } from './program-detail';

@NgModule({
  declarations: [
    ProgramDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ProgramDetailPage),
    TrannumetryModule.forChild()
  ],
  exports: [
    ProgramDetailPage
  ]
})
export class ProgramDetailPageModule { }
