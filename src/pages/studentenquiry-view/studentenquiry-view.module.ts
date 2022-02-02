import { NgModule } from '@angular/core';
import { TrannumetryModule } from '@ngx-trannumetry/core';
import { IonicPageModule } from 'ionic-angular';

import { StudentEnquiryViewPage } from './studentenquiry-view';

@NgModule({
  declarations: [
    StudentEnquiryViewPage,
  ],
  imports: [
    IonicPageModule.forChild(StudentEnquiryViewPage),
    TrannumetryModule.forChild()
  ],
  exports: [
    StudentEnquiryViewPage
  ]
})
export class StudentEnquiryViewPageModule { }
