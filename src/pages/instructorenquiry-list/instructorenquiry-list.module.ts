import { NgModule } from '@angular/core';
import { TrannumetryModule } from '@ngx-trannumetry/core';
import { IonicPageModule } from 'ionic-angular';

import { InstructorEnquiryListPage } from './instructorenquiry-list';

@NgModule({
  declarations: [
    InstructorEnquiryListPage,
  ],
  imports: [
    IonicPageModule.forChild(InstructorEnquiryListPage),
    TrannumetryModule.forChild()
  ],
  exports: [
    InstructorEnquiryListPage
  ]
})
export class InstructorEnquiryListPageModule { }
