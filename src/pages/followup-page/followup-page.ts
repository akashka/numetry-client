import { Component } from '@angular/core';
import {
  IonicPage,
  ModalController,
  NavController,
  NavParams,
  ToastController,
  AlertController,
  LoadingController
} from 'ionic-angular';
import { Vibration } from '@ionic-native/vibration';
import { ItemSliding } from "ionic-angular/umd";

import { FollowupCreateTab } from '../followupcreate-tab/followupcreate-tab';
import { FollowupViewTab } from '../followupview-tab/followupview-tab';

@IonicPage()
@Component({
  selector: 'followup-page',
  templateUrl: 'followup-page.html'
})

export class FollowupPage {

  franchiseEnquiry;

  view: any = FollowupViewTab;
  create: any = FollowupCreateTab;

  constructor(
    public vibration: Vibration,
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    private alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
  ) {
    this.franchiseEnquiry = navParams.get('franchiseEnquiry');
    console.log(this.franchiseEnquiry);
    console.log('Followup Page');
  }

}
