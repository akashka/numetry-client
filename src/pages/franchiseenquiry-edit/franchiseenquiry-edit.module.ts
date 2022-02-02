import { NgModule } from '@angular/core';
import { TrannumetryModule } from '@ngx-trannumetry/core';
import { IonicPageModule } from 'ionic-angular';

import { FranchiseEnquiryEditPage } from './franchiseenquiry-edit';

@NgModule({
  declarations: [
    FranchiseEnquiryEditPage,
  ],
  imports: [
    IonicPageModule.forChild(FranchiseEnquiryEditPage),
    TrannumetryModule.forChild()
  ],
  exports: [
    FranchiseEnquiryEditPage
  ]
})
export class FranchiseEnquiryEditPageModule { }
