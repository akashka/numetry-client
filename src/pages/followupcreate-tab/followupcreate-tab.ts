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
  Platform,
  ViewController
} from 'ionic-angular';
import { Vibration } from '@ionic-native/vibration';
import { ItemSliding } from "ionic-angular/umd";
import * as _ from "lodash";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { Franchise } from '../../providers';

@IonicPage()
@Component({
  selector: 'followupcreate-tab',
  templateUrl: 'followupcreate-tab.html'
})

export class FollowupCreateTab {

  franchiseEnquiry;
  followups;
  form;
  isReadyToSave: Boolean = false;

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
    public storage: Storage,
    public franchise: Franchise,
    public viewCtrl: ViewController
  ) {

    this.franchiseEnquiry = navParams.data;
    this.followups = this.franchiseEnquiry.follow_up;

    this.form = formBuilder.group({
      user: [''],
      dated: [new Date()],
      comment: ['', Validators.compose([Validators.required])],
    });

    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });

    this.storage.get('user').then((value) => {
      this.form.controls['user'].setValue(value._id);
    });
  }

  save() {
    this.franchiseEnquiry.follow_up.push(this.form.value);
    delete this.franchiseEnquiry['__v']; 
    this.franchise.update(this.franchiseEnquiry).subscribe((resp) => {
      this.nav.setRoot("FranchiseEnquiryListPage");
    }, (err) => {
      let toast = this.toastCtrl.create({
        message: "Error in adding Followup. Please try again.",
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }

}
