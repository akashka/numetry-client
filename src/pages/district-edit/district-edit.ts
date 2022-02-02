import { Component } from '@angular/core';
import {
  IonicPage,
  ModalController,
  NavController,
  NavParams,
  ToastController,
  AlertController,
  LoadingController,
  Nav
} from 'ionic-angular';
import { Vibration } from '@ionic-native/vibration';
import { ItemSliding } from "ionic-angular/umd";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';

import { Center } from '../../providers';

@IonicPage()
@Component({
  selector: 'district-edit',
  templateUrl: 'district-edit.html'
})

export class DistrictEdit {

  branches;
  form;
  isReadyToSave: Boolean = false;
  states;

  constructor(
    public vibration: Vibration,
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    private alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public centers: Center,
    public formBuilder: FormBuilder,
    public nav: Nav
  ) {
    this.centers.query().subscribe((res: any) => {
      this.branches = res;
      this.states = _.filter(res, function (item) {
        return (item.center_type == 'state')
      });
    }, err => {
      console.error('ERROR', err);
    });

    this.form = formBuilder.group({
      _id: [''],
      center_id: ['', Validators.required],
      center_name: ['', Validators.required],
      center_type: ['district'],
      center_parent: ['', Validators.required],
      active: [true, Validators.required]
    });

    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });

    let center = navParams.get("branch");
    this.form.controls["_id"].setValue(center._id);
    this.form.controls["center_id"].setValue(center.center_id);
    this.form.controls["center_name"].setValue(center.center_name);
    this.form.controls["center_type"].setValue(center.center_type);
    this.form.controls["center_parent"].setValue(center.center_parent);
    this.form.controls["active"].setValue(center.active);
  }

  ionViewDidLoad() {

  }

  createState() {
    this.centers.update(this.form.value).subscribe((resp) => {
      this.nav.setRoot('CentersPage');
    }, (err) => {
      let toast = this.toastCtrl.create({
        message: "Error in adding the District. Please try again.",
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }

}
