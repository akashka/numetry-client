import { NgModule } from '@angular/core';
import { TrannumetryModule } from '@ngx-trannumetry/core';
import { IonicPageModule } from 'ionic-angular';

import { StudentEnquiryListPage } from './studentenquiry-list';

@NgModule({
  declarations: [
    StudentEnquiryListPage,
  ],
  imports: [
    IonicPageModule.forChild(StudentEnquiryListPage),
    TrannumetryModule.forChild()
  ],
  exports: [
    StudentEnquiryListPage
  ]
})

export class StudentEnquiryListPageModule { }
