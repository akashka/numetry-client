import { NgModule } from '@angular/core';
import { TrannumetryModule } from '@ngx-trannumetry/core';
import { IonicPageModule } from 'ionic-angular';

import { InstructorEnquiryAddPage } from './instructorenquiry-create';

@NgModule({
  declarations: [
    InstructorEnquiryAddPage,
  ],
  imports: [
    IonicPageModule.forChild(InstructorEnquiryAddPage),
    TrannumetryModule.forChild()
  ],
  exports: [
    InstructorEnquiryAddPage
  ]
})
export class InstructorEnquiryAddPageModule { }
