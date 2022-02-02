import { Component, ViewChild, ElementRef } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Camera } from "@ionic-native/camera";
import {
  IonicPage,
  NavController,
  ViewController,
  ToastController,
  Form,
  NavParams
} from "ionic-angular";
import * as _ from "lodash";
import { Storage } from "@ionic/storage";
import { Programs, Center, Franchise, User } from "../../providers";
import { timingSafeEqual } from "crypto";

@IonicPage()
@Component({
  selector: "franchiseenquiry-view",
  templateUrl: "franchiseenquiry-view.html"
})
export class FranchiseEnquiryViewPage {
  form: any;
  isReadyToSave: Boolean = false;
  user;
  states = [];
  districts = [];
  areas = [];
  branches = [];
  programmes = [];
  allFranchisees = [];
  allUsers = [];
  counter = 0;

  professionOptions = [
    "Accountant",
    "Architect",
    "Artist",
    "Banker",
    "Bookkeeper",
    "Builder",
    "Businessperson",
    "Chef",
    "Coach",
    "Designer",
    "Doctor",
    "Economist",
    "Engineer",
    "Farmer",
    "Fisherman",
    "Judge",
    "Lawyer",
    "Mechanic",
    "Pharmacist",
    "Photographer",
    "Physician",
    "Pilot",
    "Police",
    "Politician",
    "Professor",
    "Salesperson",
    "Service",
    "Teacher",
    "Writer",
    "Others"
  ];

  referralOptions = [
    "Radio",
    "TV",
    "Print",
    "Outdoor",
    "From a Friend",
    "Direct Walk In",
    "Others"
  ];

  isStateDisabled: Boolean = false;
  isDistrictDisabled: Boolean = false;

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    formBuilder: FormBuilder,
    public camera: Camera,
    public programs: Programs,
    public toastCtrl: ToastController,
    public center: Center,
    public program: Programs,
    public users: User,
    public franchise: Franchise,
    public element: ElementRef,
    public storage: Storage,
    public navParams: NavParams
  ) {
    let franchisee = navParams.get("franchiseEnquiry");

    this.center.query().subscribe(
      (res: any) => {
        this.branches = res;
      },
      err => {
        console.error("ERROR", err);
      }
    );

    this.program.query().subscribe(
      (res: any) => {
        this.programmes = res;
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
        console.log("ERROR", err);
      }
    );

    this.form = formBuilder.group({
      name: [franchisee.name, Validators.compose([Validators.required])],
      franchise_type: [
        franchisee.franchise_type,
        Validators.compose([Validators.required])
      ],
      franchise_state: [franchisee.franchise_state],
      franchise_district: [franchisee.franchise_district],
      franchise_area: [franchisee.franchise_area],
      address: [franchisee.address, Validators.compose([Validators.required])],
      pincode: [
        franchisee.pincode,
        Validators.compose([
          Validators.required,
          Validators.maxLength(7),
          Validators.minLength(2)
        ])
      ],
      mobile_no: [
        franchisee.mobile_no,
        Validators.compose([
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(10),
          Validators.pattern("[0-9]*")
        ])
      ],
      whatsapp_no: [
        franchisee.whatsapp_no,
        Validators.compose([
          Validators.maxLength(10),
          Validators.minLength(10),
          Validators.pattern("[0-9]*")
        ])
      ],
      email_id: [
        franchisee.email_id,
        Validators.compose([
          Validators.required,
          Validators.pattern(
            "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
          )
        ])
      ],
      dob: [franchisee.dob],
      present_occupation: [franchisee.present_occupation],
      business_type: [franchisee.business_type],
      capital: [franchisee.capital],
      qualification: [franchisee.qualification],
      start_timeframe: [franchisee.start_timeframe],
      programs_interested: [franchisee.programs_interested],
      working_hours: [franchisee.working_hours],
      reference_source: [
        franchisee.reference_source,
        Validators.compose([Validators.required])
      ],
      referral: [franchisee.referral],
      status: [franchisee.status, Validators.compose([Validators.required])],
      remarks: [franchisee.remarks],
      active: [franchisee.active, Validators.compose([Validators.required])],
      address_proof: [franchisee.address_proof],
      id_proof: [franchisee.id_proof],
      gst_certificate: [franchisee.gst_certificate],
      pan_card: [franchisee.pan_card],
      registration_certificate: [franchisee.registration_certificate],
      partnership_deed: [franchisee.partnership_deed],
      photo: [franchisee.photo],
      follow_up: [franchisee.follow_up],
      enquiry_by: [franchisee.enquiry_by],
      enquiry_datetime: [franchisee.enquiry_datetime]
    });

    this.storage.get("user").then(value => {
      this.user = value;
    });

    this.center.query().subscribe(
      (res: any) => {
        this.branches = res;
        this.states = _.filter(res, function(item) {
          return item.center_type == "state";
        });
        this.onFranchiseStateChange(franchisee.franchise_state);
      },
      err => {
        console.error("ERROR", err);
      }
    );
  }

  ionViewDidLoad() {}

  cancel() {
    this.viewCtrl.dismiss();
  }

  getBranchName(id) {
    let branch = _.indexOf(this.branches, id);
    if (branch < 0) return id;
    return this.branches[branch].center_name;
  }

  getProgramNames(id) {
    let temp = [];
    for (var i = 0; i < id.length; i++) {
      let index = _.indexOf(this.programmes, id[i]);
      if (index < 0) temp.push(id);
      else temp.push(this.programmes[index].program_name);
    }
  }

  getUserName(id) {
    let index = _.indexOf(this.allUsers, id);
    if (index < 0) return id;
    return this.allUsers[id].name;
  }

  onFranchiseStateChange(ev) {
    this.districts = _.filter(this.branches, function(item) {
      return item.center_type == "district" && item.center_parent == ev;
    });
    this.areas = _.filter(this.branches, function(item) {
      return item.center_type == "unit" && item.center_parent == ev;
    });
  }
}
