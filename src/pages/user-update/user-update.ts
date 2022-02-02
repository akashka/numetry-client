import { Component } from '@angular/core';
import { TrannumetryService } from '@ngx-trannumetry/core';
import { IonicPage, NavController, ToastController, NavParams, ViewController } from 'ionic-angular';
import { User, Center } from '../../providers';
import { FirstRunPage } from '../';
import * as _ from 'lodash';

@IonicPage()
@Component({
  selector: 'user-update',
  templateUrl: 'user-update.html'
})
export class UserUpdatePage {

  account = {
    name: '',
    user_name: '',
    email: '',
    password: '',
    confirm_password: '',
    phone_no: '',
    whatsapp_no: '',
    gender: 'male',
    role: '',
    dob: new Date(),
    profile_pic: '',
    user_state: '',
    user_district: '',
    user_center: '',
    active: true
  };

  isReadyToSave: Boolean = false;
  isDuplicate: Boolean = false;
  isPasswordMatch: Boolean = false;
  usersList;
  allBranches;
  branches;
  states = [];
  districts = [];
  areas = [];
  private signupErrorString: string;

  constructor(
    public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public trannumetryService: TrannumetryService,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public center: Center,
  ) {
    this.account = navParams.get('user');
    this.account.confirm_password = this.account.password;
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
      this.onStateChange(this.account.user_state);
      this.onDistrictChange(this.account.user_district);
    }, err => {
      console.error('ERROR', err);
    });

    this.trannumetryService.get('SIGNUP_ERROR').subscribe((value) => {
      this.signupErrorString = value;
    });
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  doSignup() {
    this.account.dob = new Date(this.account.dob);
    this.user.update_user(this.account).subscribe((resp) => {
      this.viewCtrl.dismiss();
    }, (err) => {
      let toast = this.toastCtrl.create({
        message: "Error in updating the User. Please try again.",
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }

  onChange(ev) {
    this.isReadyToSave = (this.account.name != '' && this.account.user_name != '' && this.account.email != '' &&
      this.account.password != '' && this.account.confirm_password != '' && this.account.phone_no != '' &&
      this.account.gender != '' && this.account.role != '');

    this.isPasswordMatch = (this.account.password == this.account.confirm_password);

    // let user = _.filter(this.usersList, function (item) {
    //   return ((item.user_name.toUpperCase().indexOf(this.account.user_name.toUpperCase()) >= 0)
    //     || (item.email.toUpperCase().indexOf(this.account.email.toUpperCase()) >= 0))
    // });
    // this.isDuplicate = (user.length > 0);
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
