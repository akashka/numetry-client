import { Component } from "@angular/core";
import {
  IonicPage,
  ModalController,
  NavController,
  NavParams,
  ToastController,
  AlertController,
  LoadingController
} from "ionic-angular";
import { Vibration } from "@ionic-native/vibration";
import { ItemSliding } from "ionic-angular/umd";

import { AreaTab } from "../area-tab/area-tab";
import { BranchesTab } from "../branches-tab/branches-tab";
import { DistrictTab } from "../district-tab/district-tab";
import { StatesTab } from "../states-tab/states-tab";

@IonicPage()
@Component({
  selector: "centers-page",
  templateUrl: "centers-page.html"
})
export class CentersPage {
  view: any = BranchesTab;
  states: any = StatesTab;
  districts: any = DistrictTab;
  centers: any = AreaTab;

  constructor(
    public vibration: Vibration,
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    private alertCtrl: AlertController,
    public loadingCtrl: LoadingController
  ) {
    console.log("States Page");
  }

  showAlert() {
    const alert = this.alertCtrl.create({
      title: "Information",
      subTitle:
        `
          <br/>
          Click on icons or Name to open Accordion. <br/> <br/>
          &nbsp;  Green: Active  <br/> 
          &nbsp;  Red: Inactive  <br/> <br/>
          Click on Edit to edit. <br/>
        `,
      buttons: ["OK"]
    });
    alert.present();
  }
}
