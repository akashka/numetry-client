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

import { Programs } from '../../providers';
import { ItemSliding } from "ionic-angular/umd";

import { HomeTab } from '../home-tab/home-tab';
import { NotificationTab } from '../notification-tab/notification-tab';
import { ProfileTab } from '../profile-tab/profile-tab';

@IonicPage()
@Component({
  selector: 'home-page',
  templateUrl: 'home-page.html'
})

export class HomePage {

  home : any = HomeTab;
  notification : any = NotificationTab;
  profile : any = ProfileTab;

  constructor(
    public vibration: Vibration,
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    private alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public programs: Programs
  ) {
    console.log('Home');

  }

}
