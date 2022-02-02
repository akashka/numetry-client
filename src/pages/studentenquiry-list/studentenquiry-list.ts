import { Component } from "@angular/core";
import {
  IonicPage,
  ModalController,
  NavController,
  NavParams,
  ToastController,
  AlertController,
  LoadingController,
  Alert,
  ActionSheetController
} from "ionic-angular";
import { Vibration } from "@ionic-native/vibration";
import { ItemSliding } from "ionic-angular/umd";
import * as _ from "lodash";
import { Programs, User, Center, Students } from "../../providers";
import { Storage } from "@ionic/storage";
import { isGeneratedFile } from "@angular/compiler/src/aot/util";
import { CallNumber } from "@ionic-native/call-number/ngx";

@IonicPage()
@Component({
  selector: "studentenquiry-lists",
  templateUrl: "studentenquiry-list.html"
})
export class StudentEnquiryListPage {
  currentItems;
  tempCurrentItems;
  user;
  allUsers;
  allCenters;

  constructor(
    public vibration: Vibration,
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    private alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public programs: Programs,
    public storage: Storage,
    public users: User,
    public centers: Center,
    public callNumber: CallNumber,
    public alertController: AlertController,
    public studentService: Students,
    public actionSheetController: ActionSheetController
  ) {
  }

  ionViewWillEnter() {
    this.studentService.query().subscribe(
      (res: any) => {
        this.currentItems = res;
        this.tempCurrentItems = res;
        this.storage.get("user").then(value => {
          this.user = value;
          if (this.user.role != "admin") {
            this.currentItems = _.filter(this.currentItems, function(item) {
              return item.enquiry_by == this.user._id;
            });
            this.tempCurrentItems = this.currentItems;
          }
        });
      },
      err => {
        console.error("ERROR", err);
      }
    );

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
  }

  getItems(ev) {
    let val = ev.data.toUpperCase();
    if (!val || !val.trim()) {
      this.currentItems = this.tempCurrentItems;
      return;
    }
    this.currentItems = _.filter(this.tempCurrentItems, function(item) {
      return (
        item.name.toUpperCase().indexOf(ev.data.toUpperCase()) >= 0 ||
        item.franchise_state.toUpperCase().indexOf(ev.data.toUpperCase()) >=
          0 ||
        item.franchise_district.toUpperCase().indexOf(ev.data.toUpperCase()) >=
          0 ||
        item.franchise_area.toUpperCase().indexOf(ev.data.toUpperCase()) >= 0 ||
        item.mobile_no.toUpperCase().indexOf(ev.data.toUpperCase()) >= 0 ||
        item.email_id.toUpperCase().indexOf(ev.data.toUpperCase()) >= 0
      );
    });
  }

  view(student, slidingItem: ItemSliding) {
    slidingItem.close();
    this.navCtrl.push("StudentEnquiryViewPage", {
      student: student
    });
  }

  add() {
    this.navCtrl.push("StudentEnquiryAddPage");
  }

  edit(student, slidingItem: ItemSliding) {
    slidingItem.close();
    this.navCtrl.push("StudentEnquiryEditPage", {
      student: student
    });
  }

  async contact(student, slidingItem: ItemSliding) {
    slidingItem.close();
    const actionSheet = await this.actionSheetController.create({
      buttons: [
        {
          text: "Call",
          icon: "call",
          handler: () => {
            this.callNumber.callNumber(student.mobile_no, true)
              .then(res => console.log('Launched dialer!', res))
              .catch(err => console.log('Error launching dialer', err));
          }
        },
        {
          text: "Whatsapp",
          icon: "logo-whatsapp",
          handler: () => {
            if(student.whatsapp_no != undefined && student.whatsapp_no != '' && student.whatsapp_no != null) 
              window.open(("https://wa.me/91"+student.whatsapp_no), "_blank");
            else
              window.open(("https://wa.me/91"+student.mobile_no), "_blank");
          }
        },
        {
          text: "SMS",
          icon: "text",
          handler: () => {
            window.open("sms://"+student.mobile_no);
          }
        },
        {
          text: "Email",
          icon: "mail",
          handler: () => {
            window.open("mailto://"+student.email_id);
          }
        },
        {
          text: "Cancel",
          icon: "close",
          role: "cancel",
          handler: () => {
            console.log("Cancel clicked");
          }
        }
      ]
    });
    await actionSheet.present();
  }

  confirm(student, slidingItem: ItemSliding) {
    slidingItem.close();
    this.presentAlertConfirm(student);
  }

  async presentAlertConfirm(student) {
    const alert = await this.alertController.create({
      title: "Confirm?",
      subTitle: "",
      message: "Are you sure you want to Confirm this Enquiry?",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: blah => {
            console.log("Confirm Cancel: blah");
          }
        },
        {
          text: "Confirm",
          handler: () => {
            delete student.__v;
            student.status = "confirm";
            this.studentService.update(student).subscribe(
              resp => {},
              err => {
                let toast = this.toastCtrl.create({
                  message: "Error in rejecting this Enquiry. Please try again.",
                  duration: 3000,
                  position: "top"
                });
                toast.present();
              }
            );
          }
        }
      ]
    });

    await alert.present();
  }

  reject(student, slidingItem: ItemSliding) {
    slidingItem.close();
    this.presentAlertReject(student);
  }

  async presentAlertReject(student) {
    const alert = await this.alertController.create({
      title: "Reject?",
      subTitle: "",
      message:
        "Are you sure you want to Reject this Enquiry? Once rejected you cannot do actions on this Enquiry again.",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: blah => {
            console.log("Confirm Cancel: blah");
          }
        },
        {
          text: "Confirm",
          handler: () => {
            delete student.__v;
            student.status = "reject";
            this.studentService.update(student).subscribe(
              resp => {},
              err => {
                let toast = this.toastCtrl.create({
                  message: "Error in rejecting this Enquiry. Please try again.",
                  duration: 3000,
                  position: "top"
                });
                toast.present();
              }
            );
          }
        }
      ]
    });

    await alert.present();
  }

  findLocation(id) {
    let val = _.find(this.allCenters, { _id: id });
    return val && val["center_name"] ? val["center_name"] : "";
  }

  findUser(id) {
    let val = _.find(this.allUsers, { _id: id });
    return val && val["name"] ? val["name"] : "";
  }

  pressEvent(ev) {
    this.vibration.vibrate(150);
    let toast = this.toastCtrl.create({
      message: "please right or left slide to get the options.",
      duration: 2000,
      position: "top"
    });
    toast.present();
  }

}
