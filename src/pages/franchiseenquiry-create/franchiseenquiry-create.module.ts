import { NgModule } from '@angular/core';
import { TrannumetryModule } from '@ngx-trannumetry/core';
import { IonicPageModule } from 'ionic-angular';

import { FranchiseEnquiryAddPage } from './franchiseenquiry-create';

@NgModule({
  declarations: [
    FranchiseEnquiryAddPage,
  ],
  imports: [
    IonicPageModule.forChild(FranchiseEnquiryAddPage),
    TrannumetryModule.forChild()
  ],
  exports: [
    FranchiseEnquiryAddPage
  ]
})
export class FranchiseEnquiryAddPageModule { }
