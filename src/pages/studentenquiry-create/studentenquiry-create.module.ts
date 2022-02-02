import { NgModule } from '@angular/core';
import { TrannumetryModule } from '@ngx-trannumetry/core';
import { IonicPageModule } from 'ionic-angular';

import { StudentEnquiryAddPage } from './studentenquiry-create';

@NgModule({
  declarations: [
    StudentEnquiryAddPage,
  ],
  imports: [
    IonicPageModule.forChild(StudentEnquiryAddPage),
    TrannumetryModule.forChild()
  ],
  exports: [
    StudentEnquiryAddPage
  ]
})
export class StudentEnquiryAddPageModule { }
