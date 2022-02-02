import { NgModule } from '@angular/core';
import { TrannumetryModule } from '@ngx-trannumetry/core';
import { IonicPageModule } from 'ionic-angular';

import { HomePage } from './home-page';

@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    TrannumetryModule.forChild()
  ],
  exports: [
    HomePage
  ]
})
export class HomePageModule { }
