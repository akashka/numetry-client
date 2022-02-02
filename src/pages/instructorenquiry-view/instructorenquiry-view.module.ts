import { NgModule } from '@angular/core';
import { TrannumetryModule } from '@ngx-trannumetry/core';
import { IonicPageModule } from 'ionic-angular';

import { InstructorEnquiryViewPage } from './instructorenquiry-view';

@NgModule({
  declarations: [
    InstructorEnquiryViewPage,
  ],
  imports: [
    IonicPageModule.forChild(InstructorEnquiryViewPage),
    TrannumetryModule.forChild()
  ],
  exports: [
    InstructorEnquiryViewPage
  ]
})
export class InstructorEnquiryViewPageModule { }
