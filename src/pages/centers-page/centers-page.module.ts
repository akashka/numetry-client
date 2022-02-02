import { NgModule } from '@angular/core';
import { TrannumetryModule } from '@ngx-trannumetry/core';
import { IonicPageModule } from 'ionic-angular';

import { CentersPage } from './centers-page';

@NgModule({
  declarations: [
    CentersPage,
  ],
  imports: [
    IonicPageModule.forChild(CentersPage),
    TrannumetryModule.forChild()
  ],
  exports: [
    CentersPage
  ]
})
export class CentersPageModule { }
