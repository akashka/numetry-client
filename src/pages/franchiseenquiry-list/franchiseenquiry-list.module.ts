import { NgModule } from '@angular/core';
import { TrannumetryModule } from '@ngx-trannumetry/core';
import { IonicPageModule } from 'ionic-angular';

import { FranchiseEnquiryListPage } from './franchiseenquiry-list';

@NgModule({
  declarations: [
    FranchiseEnquiryListPage,
  ],
  imports: [
    IonicPageModule.forChild(FranchiseEnquiryListPage),
    TrannumetryModule.forChild()
  ],
  exports: [
    FranchiseEnquiryListPage
  ]
})
export class FranchiseEnquiryListPageModule { }
