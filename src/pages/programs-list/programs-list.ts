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

import { Programs } from "../../providers";
import { ItemSliding } from "ionic-angular/umd";

import {
  FileTransfer,
  FileUploadOptions,
  FileTransferObject
} from "@ionic-native/file-transfer/ngx";
import { File } from "@ionic-native/file";

@IonicPage()
@Component({
  selector: "programs-lists",
  templateUrl: "programs-list.html"
})
export class ProgramsListPage {
  currentItems;
  tempCurrentItems;

  input_search: String = "";

  constructor(
    public vibration: Vibration,
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    private alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public programs: Programs
  ) {}

  ionViewDidLoad() {
  }

  ionViewWillEnter(){
    this.programs.query().subscribe(
      (res: any) => {
        this.currentItems = res;
        this.tempCurrentItems = res;
      },
      err => {
        console.error("ERROR", err);
      }
    );
  }

  getItems(ev) {
    let val = this.input_search.toUpperCase();
    if (!val || !val.trim()) {
      this.currentItems = this.tempCurrentItems;
      return;
    }
    this.currentItems = this.tempCurrentItems.filter(item => {
      return (
        item.program_name.toUpperCase().indexOf(val) >= 0 ||
        item.program_code.toUpperCase().indexOf(val) >= 0
      );
    });
  }

  viewProgram(program, slidingItem: ItemSliding) {
    slidingItem.close();
    this.navCtrl.push("ProgramDetailPage", {
      program: program
    });
  }

  addProgram() {
    this.navCtrl.push("ProgramAddPage");
  }

  editProgram(program, slidingItem: ItemSliding) {
    slidingItem.close();
    this.navCtrl.push("ProgramEditPage", {
      program: program
    });
  }

  pressEvent(ev) {
    this.vibration.vibrate(150);
    let toast = this.toastCtrl.create({
      message: "please slide to get the options .",
      duration: 2000,
      position: "top"
    });
    toast.present();
  }

  saveAsCsv() {
    var csv: any = this.convertToCSV(this.currentItems);
    var fileName: any = "programs.csv";

    File.writeFile(File.externalRootDirectory, fileName, csv)
      .then(_ => {
        alert("Success ;-)");
      })
      .catch(err => {
        File.writeExistingFile(File.externalRootDirectory, fileName, csv)
          .then(_ => {
            alert("Success ;-)");
          })
          .catch(err => {
            alert("Failure");
          });
      });
  }

  convertToCSV(teams) {
    var csv: any = "";
    var line: any = "";

    for (let i = 0; i < teams.length; i++) {
      if (line != "") line += ";";
      line += "Team " + (i + 1);
    }
    csv += line + "\r\n";

    for (let i = 0; i < teams[0].length; i++) {
      line = "";
      for (var j = 0; j < teams.length; j++) {
        if (line != "") line += ";";
        line += teams[j][i];
      }
      csv += line + "\r\n";
    }
    return csv;
  }
}
