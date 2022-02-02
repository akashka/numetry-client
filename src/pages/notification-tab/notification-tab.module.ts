import { NgModule } from '@angular/core';
import { TrannumetryModule } from '@ngx-trannumetry/core';
import { IonicPageModule } from 'ionic-angular';

import { NotificationTab } from './notification-tab';

@NgModule({
  declarations: [
    NotificationTab,
  ],
  imports: [
    IonicPageModule.forChild(NotificationTab),
    TrannumetryModule.forChild()
  ],
  exports: [
    NotificationTab
  ]
})
export class NotificationTabModule { }
