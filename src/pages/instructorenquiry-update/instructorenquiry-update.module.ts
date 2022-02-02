import { NgModule } from '@angular/core';
import { TrannumetryModule } from '@ngx-trannumetry/core';
import { IonicPageModule } from 'ionic-angular';

import { InstructorEnquiryEditPage } from './instructorenquiry-update';

@NgModule({
  declarations: [
    InstructorEnquiryEditPage,
  ],
  imports: [
    IonicPageModule.forChild(InstructorEnquiryEditPage),
    TrannumetryModule.forChild()
  ],
  exports: [
    InstructorEnquiryEditPage
  ]
})
export class InstructorEnquiryEditPageModule { }
