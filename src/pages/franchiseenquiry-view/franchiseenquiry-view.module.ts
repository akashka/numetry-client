import { NgModule } from '@angular/core';
import { TrannumetryModule } from '@ngx-trannumetry/core';
import { IonicPageModule } from 'ionic-angular';

import { FranchiseEnquiryViewPage } from './franchiseenquiry-view';

@NgModule({
  declarations: [
    FranchiseEnquiryViewPage,
  ],
  imports: [
    IonicPageModule.forChild(FranchiseEnquiryViewPage),
    TrannumetryModule.forChild()
  ],
  exports: [
    FranchiseEnquiryViewPage
  ]
})
export class FranchiseEnquiryViewPageModule { }
