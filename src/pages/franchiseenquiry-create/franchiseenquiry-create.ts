import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera } from '@ionic-native/camera';
import { IonicPage, NavController, ViewController, ToastController, Form } from 'ionic-angular';
import * as _ from 'lodash';
import { Storage } from '@ionic/storage';
import { Programs, Center, Franchise } from '../../providers';

@IonicPage()
@Component({
  selector: 'franchiseenquiry-create',
  templateUrl: 'franchiseenquiry-create.html'
})

export class FranchiseEnquiryAddPage {

  form: any;
  isReadyToSave: Boolean = false;
  user;
  states = [];
  districts = [];
  areas = [];
  branches = [];
  programmes = [];
  allFranchisees = [];
  counter = 0;

  professionOptions = ['Accountant', 'Architect', 'Artist', 'Banker', 'Bookkeeper', 'Builder', 'Businessperson',
    'Chef', 'Coach', 'Designer', 'Doctor', 'Economist', 'Engineer', 'Farmer', 'Fisherman',
    'Judge', 'Lawyer', 'Mechanic', 'Pharmacist', 'Photographer', 'Physician', 'Pilot', 'Police',
    'Politician', 'Professor', 'Salesperson', 'Service', 'Teacher', 'Writer', 'Others'];

  referralOptions = ['Radio', 'TV', 'Print', 'Outdoor', 'From a Friend', 'Direct Walk In', 'Others'];

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
    public franchise: Franchise,
    public element: ElementRef,
    public storage: Storage
  ) {

    this.center.query().subscribe((res: any) => {
      this.branches = res;
      this.states = _.filter(res, function (item) {
        return (item.center_type == 'state')
      });
    }, err => {
      console.error('ERROR', err);
    });

    this.program.query().subscribe((res: any) => {
      this.programmes = res;
    }, err => {
      console.error('ERROR', err);
    });

    this.form = formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      franchise_type: ['unit', Validators.compose([Validators.required])],
      franchise_state: ['', Validators.compose([Validators.required])],
      franchise_district: [''],
      franchise_area: [''],
      address: ['', Validators.compose([Validators.required])],
      pincode: ['', Validators.compose([Validators.required, Validators.maxLength(7), Validators.minLength(2)])],
      mobile_no: ['', Validators.compose([Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern('[0-9]*')])],
      whatsapp_no: ['', Validators.compose([Validators.maxLength(10), Validators.minLength(10), Validators.pattern('[0-9]*')])],
      email_id: ['', Validators.compose([Validators.required, Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")])],
      dob: [''],
      present_occupation: [''],
      business_type: [''],
      capital: [''],
      qualification: [''],
      start_timeframe: [''],
      programs_interested: [[]],
      working_hours: [''],
      reference_source: ['', Validators.compose([Validators.required])],
      referral: [''],
      status: ['enquiry', Validators.compose([Validators.required])],
      remarks: [''],
      active: [true, Validators.compose([Validators.required])],
      address_proof: [[]],
      id_proof: [[]],
      gst_certificate: [[]],
      pan_card: [[]],
      registration_certificate: [[]],
      partnership_deed: [[]],
      photo: [[]],
      follow_up: [[]],
      enquiry_by: [''],
      enquiry_datetime: [new Date()]
    });

    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });

    this.storage.get('user').then((value) => {
      this.user = value;
      this.form.controls['enquiry_by'].setValue(this.user._id);
      if (this.user.role == 'master') {
        this.isStateDisabled = true;
        this.form.controls['franchise_state'].setValue(this.user.user_state);
        this.districts = _.filter(this.branches, function (item) {
          return (item.center_type == 'district' && item.center_parent == this.user.user_state)
        });
        this.areas = _.filter(this.branches, function (item) {
          return (item.center_type == 'unit' && item.center_parent == this.user.user_state)
        });
      } else if (this.user.role == 'district') {
        this.isStateDisabled = true;
        this.isDistrictDisabled = true;
        this.form.controls['franchise_state'].setValue(this.user.user_state);
        this.form.controls['franchise_district'].setValue(this.user.user_district);
        this.areas = _.filter(this.branches, function (item) {
          return (item.center_type == 'unit' && item.center_parent == this.user.user_district)
        });
      }
    });

    this.franchise.query().subscribe((res: any) => {
      this.allFranchisees = res;
    }, err => {
      console.error('ERROR', err);
    });

  }

  ionViewDidLoad() {

  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  onFranchiseTypeChange(ev) {
    if (ev.value == 'state') {
      this.form.controls['franchise_district'].setValue('');
      this.form.controls['franchise_area'].setValue('');
    }
    if (ev.value == 'district') {
      this.form.controls['franchise_area'].setValue('');
    }
  }

  onFranchiseStateChange(ev) {
    this.districts = _.filter(this.branches, function (item) {
      return (item.center_type == 'district' && item.center_parent == ev)
    });
    this.areas = _.filter(this.branches, function (item) {
      return (item.center_type == 'unit' && item.center_parent == ev)
    });
  }

  onFranchiseDistrictChange(ev) {
    this.areas = _.filter(this.branches, function (item) {
      return (item.center_type == 'unit' && item.center_parent == ev)
    });
  }

  resize = (): void => {
    const ta = this.element.nativeElement.querySelector("textarea");
    if (ta !== undefined && ta !== null) {
      ta.style.overflow = "hidden";
      ta.style.height = "auto";
      ta.style.height = ta.scrollHeight + "px";
    }
  }

  save() {
    this.franchise.add(this.form.value).subscribe((resp) => {
      this.viewCtrl.dismiss();
    }, (err) => {
      let toast = this.toastCtrl.create({
        message: "Error in adding the Program. Please try again.",
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }

  onPhoneOrEmailChange(ev) {
    let ev_mobile_no = this.form.controls['mobile_no'].value; 
    let isDuplicate_mobile_no = (_.find(this.allFranchisees, { mobile_no: ev_mobile_no }) != undefined);
    let ev_whatsapp_no = this.form.controls['whatsapp_no'].value;
    let isDuplicate_whatsapp_no = false; 
    if(ev_whatsapp_no != undefined && ev_whatsapp_no != '') isDuplicate_whatsapp_no = (_.find(this.allFranchisees, { whatsapp_no: ev_whatsapp_no }) != undefined);
    let ev_email_id = this.form.controls['email_id'].value; 
    let isDuplicate_email_id = (_.find(this.allFranchisees, { email_id: ev_email_id }) != undefined);
    this.counter = (isDuplicate_mobile_no || isDuplicate_whatsapp_no || isDuplicate_email_id) ? 1 : 0;
  }

}
