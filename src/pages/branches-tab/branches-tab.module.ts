import { NgModule } from '@angular/core';
import { TrannumetryModule } from '@ngx-trannumetry/core';
import { IonicPageModule } from 'ionic-angular';

import { BranchesTab } from './branches-tab';

@NgModule({
  declarations: [
    BranchesTab,
  ],
  imports: [
    IonicPageModule.forChild(BranchesTab),
    TrannumetryModule.forChild()
  ],
  exports: [
    BranchesTab
  ]
})
export class BranchesTabModule { }
