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
import { Center } from "../../providers";

@IonicPage()
@Component({
  selector: "branches-tab",
  templateUrl: "branches-tab.html"
})
export class BranchesTab {
  branches;
  states = [];
  shownGroup: any = null;
  groupItems;
  groupMember;
  shownSubGroup: any = null;

  constructor(
    public vibration: Vibration,
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    private alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public centers: Center
  ) {
  }

  ionViewWillEnter() {
    this.centers.query().subscribe(
      (res: any) => {
        this.branches = this.formBranches(res);
      },
      err => {
        console.error("ERROR", err);
      }
    );
  }

  formBranches(res) {
    let branches = res.filter(item => {
      return item.center_type == "state";
    });
    for (var i = 0; i < branches.length; i++) {
      branches[i].hide = true;
      branches[i].branches = [];
      branches[i].branches = res.filter(item => {
        return item.center_parent == branches[i]._id;
      });
      for (var j = 0; j < branches[i].branches.length; j++) {
        branches[i].branches[j].hide = true;
        branches[i].branches[j].branches = [];
        branches[i].branches[j].branches = res.filter(item => {
          return item.center_parent == branches[i].branches[j]._id;
        });
      }
    }
    return branches;
  }

  onSelect(branch) {
    branch.hide = !branch.hide;
  }

  onSubSelect(subbranch) {
    subbranch.hide = !subbranch.hide;
  }

  edit(branch) {
    if (branch.center_type == "state") {
      this.navCtrl.push("StatesEdit", {
        branch: branch
      });
    } else if (branch.center_type == "district") {
      this.navCtrl.push("DistrictEdit", {
        branch: branch
      });
    } else if (branch.center_type == "unit") {
      this.navCtrl.push("AreaEdit", {
        branch: branch
      });
    } else {
      let toast = this.toastCtrl.create({
        message: "There is some error in updating. Please try again.",
        duration: 3000,
        position: "top"
      });
      toast.present();
    }
  }
}
