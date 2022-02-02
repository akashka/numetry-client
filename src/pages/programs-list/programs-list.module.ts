import { NgModule } from '@angular/core';
import { TrannumetryModule } from '@ngx-trannumetry/core';
import { IonicPageModule } from 'ionic-angular';

import { ProgramsListPage } from './programs-list';

@NgModule({
  declarations: [
    ProgramsListPage,
  ],
  imports: [
    IonicPageModule.forChild(ProgramsListPage),
    TrannumetryModule.forChild()
  ],
  exports: [
    ProgramsListPage
  ]
})
export class ProgramsListPageModule { }
