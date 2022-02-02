import { Component } from '@angular/core';
import { TrannumetryService } from '@ngx-trannumetry/core';
import { IonicPage, NavController, ToastController, NavParams, ViewController } from 'ionic-angular';
import { User, Center } from '../../providers';
import { FirstRunPage } from '../';
import * as _ from 'lodash';

@IonicPage()
@Component({
  selector: 'user-detail',
  templateUrl: 'user-detail.html'
})
export class UserDetailPage {

  account;
  usersList;
  branches;
  states;
  districts;
  areas;

  constructor(
    public navCtrl: NavController,
    public user: User,
    public center: Center,
    public toastCtrl: ToastController,
    public trannumetryService: TrannumetryService,
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) {
    this.account = navParams.get('user');

    this.user.users_list().subscribe((res: any) => {
      this.usersList = res; 
    }, err => {
      console.error('ERROR', err);
    });

    this.center.query().subscribe((res: any) => {
      this.branches = res;
      this.states = _.filter(res, function (item) {
        return (item.center_type == 'state')
      });
      console.log(this.states);
      this.onStateChange(this.account.user_state);
      this.onDistrictChange(this.account.user_district);
      console.log(this.states);
    }, err => {
      console.error('ERROR', err);
    });

  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  onStateChange(ev) {
    this.districts = _.filter(this.branches, function (item) {
      return (item.center_type == 'district' && item.center_parent == ev)
    });
    this.areas = _.filter(this.branches, function (item) {
      return (item.center_type == 'unit' && item.center_parent == ev)
    });
  }

  onDistrictChange(ev) {
    this.areas = _.filter(this.branches, function (item) {
      return (item.center_type == 'unit' && item.center_parent == ev)
    });
  }

}
