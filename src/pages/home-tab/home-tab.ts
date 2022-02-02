import { Component, ViewChild } from '@angular/core';
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
} from 'ionic-angular';
import { Vibration } from '@ionic-native/vibration';
import { Programs, User, Center, Franchise, Instructor, Students } from '../../providers';
import { ItemSliding } from "ionic-angular/umd";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { TrannumetryService } from "@ngx-trannumetry/core";
import { Settings } from "../../providers";
import { Storage } from "@ionic/storage";
import * as _ from 'lodash';

@IonicPage()
@Component({
  selector: 'home-tab',
  templateUrl: 'home-tab.html'
})

export class HomeTab {

  @ViewChild(Nav) nav: Nav;
  allPrograms: any;
  allCenters: any;
  allUsers: any;
  user: any;
  allFranchisees: any;
  allInstructor: any;
  allStudent: any;

  constructor(
    public vibration: Vibration,
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    private alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public programs: Programs,
    public users: User,
    public centers: Center,
    public storage: Storage,
    public franchise: Franchise,
    public instructor: Instructor,
    public student: Students
  ) {
    console.log('Home Tab');
    this.getData();
  }

  getData() {
    this.storage.get("user").then(value => {
      this.user = value;
    });

    this.users.users_list().subscribe(
      (res: any) => {
        this.allUsers = res;
      },
      err => {
        console.error("ERROR", err);
      }
    );

    this.centers.query().subscribe(
      (res: any) => {
        this.allCenters = res;
      },
      err => {
        console.error("ERROR", err);
      }
    );

    this.programs.query().subscribe(
      (res: any) => {
        this.allPrograms = res;
      },
      err => {
        console.error("ERROR", err);
      }
    );

    this.franchise.query().subscribe((res: any) => {
      this.allFranchisees = res;
      if (this.user.role != 'admin') {
        this.allFranchisees = _.filter(this.allFranchisees, function (item) {
          return (item.enquiry_by == this.user._id)
        });
      }
    }, err => {
      console.error('ERROR', err);
    });

    this.instructor.query().subscribe(
      (res: any) => {
        this.allInstructor = res;
        if (this.user.role != "admin") {
          this.allInstructor = _.filter(this.allInstructor, function(item) {
            return item.enquiry_by == this.user._id;
          });
        }
      },
      err => {
        console.error("ERROR", err);
      }
    );

    this.student.query().subscribe(
      (res: any) => {
        this.allStudent = res;
        if (this.user.role != "admin") {
          this.allStudent = _.filter(this.allStudent, function(item) {
            return item.enquiry_by == this.user._id;
          });
        }
      },
      err => {
        console.error("ERROR", err);
      }
    );

  }

  openPage(page) {
    this.navCtrl.setRoot(page);
  }
}
