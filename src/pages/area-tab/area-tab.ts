import { Component } from "@angular/core";
import {
  IonicPage,
  ModalController,
  NavController,
  NavParams,
  ToastController,
  AlertController,
  LoadingController,
  Nav
} from "ionic-angular";
import { Vibration } from "@ionic-native/vibration";
import { ItemSliding } from "ionic-angular/umd";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import * as _ from "lodash";

import { Center } from "../../providers";

@IonicPage()
@Component({
  selector: "area-tab",
  templateUrl: "area-tab.html"
})
export class AreaTab {
  branches;
  form;
  isReadyToSave: Boolean = false;
  isDuplicate: Boolean = false;
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
    this.centers.query().subscribe(
      (res: any) => {
        this.branches = res;
        this.states = _.filter(res, function(item) {
          return item.center_type != "unit";
        });
      },
      err => {
        console.error("ERROR", err);
      }
    );

    this.form = formBuilder.group({
      center_id: ["", Validators.required],
      center_name: ["", Validators.required],
      center_type: ["unit"],
      center_parent: ["", Validators.required],
      active: [true, Validators.required]
    });

    // Watch the form for changes, and
    this.form.valueChanges.subscribe(v => {
      this.isReadyToSave = this.form.valid;
    });
  }

  onCodeChange(ev) {
    ev = this.form.controls["center_id"].value;
    this.isDuplicate = _.find(this.branches, { center_id: ev }) != undefined;
  }

  ionViewDidLoad() {}

  createState() {
    this.centers.add(this.form.value).subscribe(
      resp => {
        this.nav.setRoot("CentersPage");
      },
      err => {
        let toast = this.toastCtrl.create({
          message: "Error in adding the Center. Please try again.",
          duration: 3000,
          position: "top"
        });
        toast.present();
      }
    );
  }
}
