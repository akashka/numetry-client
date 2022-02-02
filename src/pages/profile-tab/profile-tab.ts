import { Component, ViewChild } from "@angular/core";
import {
  IonicPage,
  ModalController,
  NavController,
  NavParams,
  ToastController,
  AlertController,
  LoadingController,
  ViewController
} from "ionic-angular";
import { Vibration } from "@ionic-native/vibration";
import { Programs, User } from "../../providers";
import { ItemSliding } from "ionic-angular/umd";
import { Camera } from "@ionic-native/camera";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Storage } from "@ionic/storage";

@IonicPage()
@Component({
  selector: "profile-tab",
  templateUrl: "profile-tab.html"
})

export class ProfileTab {
  @ViewChild("fileInput") fileInput;
  isReadyToSave: boolean;
  item: any;
  form: FormGroup;
  profileDetails: any;
  private isDisabled: boolean = true;
  private caption_name: string = "EDIT";

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public formBuilder: FormBuilder,
    public camera: Camera,
    public user: User,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public storage: Storage,
  ) {
    this.storage.get("user").then(value => {
      console.log(value);
      this.profileDetails = value;
      this.form = formBuilder.group({
        _id: [this.profileDetails._id, Validators.compose([Validators.required])],
        name: [this.profileDetails.name, Validators.compose([Validators.required])],
        user_name: [this.profileDetails.user_name, Validators.compose([Validators.required])],
        email: [this.profileDetails.email, Validators.compose([Validators.required, Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")])],
        password: [this.profileDetails.password, Validators.compose([Validators.required])],
        role: [this.profileDetails.role, Validators.compose([Validators.required])],
        dob: [this.profileDetails.dob],
        gender: [this.profileDetails.gender],
        phone_no: [this.profileDetails.phone_no, Validators.compose([Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern('[0-9]*')])],
        whatsapp_no: [this.profileDetails.whatsapp_no, Validators.compose([Validators.maxLength(10), Validators.minLength(10), Validators.pattern('[0-9]*')])],
        profile_pic: [this.profileDetails.profile_pic],
        user_state: [this.profileDetails.user_state],
        user_district: [this.profileDetails.user_district],
        user_center: [this.profileDetails.user_center],
        active: [true, Validators.compose([Validators.required])],
      });
    });
  };

  changedSmtng() {
    this.caption_name = "SAVE";
  }

  editProfile() {
    if (this.caption_name == "EDIT") {
      this.isDisabled = false;
      this.caption_name = "CANCEL";
    } else if (this.caption_name == "SAVE") {
      let loading = this.loadingCtrl.create({
        content: "Please wait..."
      });
      loading.present();

      this.form.value.dob = new Date(this.form.value.dob);
      this.user.update_user(this.form.value).subscribe((resp) => {
        this.viewCtrl.dismiss();
        let toast = this.toastCtrl.create({
          message: "You have successfully updated your details .",
          duration: 2000,
          position: "top"
        });
        loading.dismiss();
        toast.present();
        this.caption_name = "EDIT";
        this.isDisabled = true;
        }, (err) => {
        let toast = this.toastCtrl.create({
          message: "Error in adding the User. Please try again.",
          duration: 3000,
          position: 'top'
        });
        loading.dismiss();
        toast.present();
      });

    } else if (this.caption_name == "CANCEL") {
      this.isDisabled = true;
      this.caption_name = "EDIT";
    }
  }

  ionViewDidLoad() {}

  getPicture() {
    if (Camera["installed"]()) {
      this.camera.getPicture({
        destinationType: this.camera.DestinationType.DATA_URL,
        targetWidth: 96,
        targetHeight: 96
      }).then(
        data => {
          this.form.patchValue({ profile_pic: "data:image/jpg;base64," + data });
        },
        err => {
          alert("Unable to take photo");
        }
      );
    } else {
      this.fileInput.nativeElement.click();
    }
  }

  getProfileImageStyle() {
    return "url(" + this.form.controls["profile_pic"].value + ")";
  }

}
