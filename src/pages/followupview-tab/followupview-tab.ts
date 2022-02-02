import { Component } from '@angular/core';
import {
  IonicPage,
  ModalController,
  NavController,
  NavParams,
  ToastController,
  AlertController,
  LoadingController,
  Config,
  Nav,
  Platform
} from 'ionic-angular';
import { Vibration } from '@ionic-native/vibration';
import { ItemSliding } from "ionic-angular/umd";
import * as _ from "lodash";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { User } from '../../providers';

@IonicPage()
@Component({
  selector: 'followupview-tab',
  templateUrl: 'followupview-tab.html'
})

export class FollowupViewTab {

  franchiseEnquiry;
  followups;
  allusers;

  constructor(
    public vibration: Vibration,
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    private alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public formBuilder: FormBuilder,
    public nav: Nav,
    public user: User
  ) {
    this.franchiseEnquiry = navParams.data;
    this.followups = this.franchiseEnquiry.follow_up;

    this.user.users_list().subscribe((res: any) => {
      this.allusers = res;
    }, err => {
      console.error('ERROR', err);
    });
  }

  findUser(user, option) {
    let val = _.find(this.allusers, function (i) {
      return i._id == user;
    });
    let vals = (val != undefined && val[option] != undefined) ? val[option] : '';
    console.log('vals', vals);
    return vals;
  }

}
