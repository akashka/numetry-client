import { NgModule } from '@angular/core';
import { TrannumetryModule } from '@ngx-trannumetry/core';
import { IonicPageModule } from 'ionic-angular';

import { StudentEnquiryEditPage } from './studentenquiry-update';

@NgModule({
  declarations: [
    StudentEnquiryEditPage,
  ],
  imports: [
    IonicPageModule.forChild(StudentEnquiryEditPage),
    TrannumetryModule.forChild()
  ],
  exports: [
    StudentEnquiryEditPage
  ]
})
export class StudentEnquiryEditPageModule { }
