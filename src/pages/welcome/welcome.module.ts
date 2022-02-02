import {NgModule} from '@angular/core';
import {TrannumetryModule} from '@ngx-trannumetry/core';
import {IonicPageModule} from 'ionic-angular';
import {WelcomePage} from './welcome';

@NgModule({
  declarations: [
    WelcomePage,
  ],
  imports: [
    IonicPageModule.forChild(WelcomePage),
    TrannumetryModule.forChild()
  ],
  exports: [
    WelcomePage
  ]
})
export class WelcomePageModule {
}
