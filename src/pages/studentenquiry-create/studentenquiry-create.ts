import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera } from '@ionic-native/camera';
import { IonicPage, NavController, ViewController, ToastController, Form } from 'ionic-angular';
import * as _ from 'lodash';
import { Storage } from '@ionic/storage';
import { Programs, Center, Instructor, Students } from '../../providers';

@IonicPage()
@Component({
  selector: 'studentenquiry-create',
  templateUrl: 'studentenquiry-create.html'
})

export class StudentEnquiryAddPage {

  form;
  isReadyToSave: Boolean = false;
  branches;
  states;
  programmes;
  user;
  districts;
  areas;
  allStudents;
  isStateDisabled: Boolean = false;
  isDistrictDisabled: Boolean = false;
  isAreaDisabled: Boolean = false;
  counter: Number = 0;

  referralOptions = ['Radio', 'TV', 'Print', 'Outdoor', 'From a Friend', 'Direct Walk In', 'Others'];

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    formBuilder: FormBuilder,
    public camera: Camera,
    public programs: Programs,
    public toastCtrl: ToastController,
    public center: Center,
    public program: Programs,
    public element: ElementRef,
    public storage: Storage,
    public instructor: Instructor,
    public students: Students
  ) {

    this.form = formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      state: ['', Validators.compose([Validators.required])],
      district: ['', Validators.compose([Validators.required])],
      area: ['', Validators.compose([Validators.required])],
      program: [[], Validators.compose([Validators.required])],
      address: ['', Validators.compose([Validators.required])],
      mobile_no: ['', Validators.compose([Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern('[0-9]*')])],
      whatsapp_no: ['', Validators.compose([Validators.maxLength(10), Validators.minLength(10), Validators.pattern('[0-9]*')])],
      email_id: ['', Validators.compose([Validators.required, Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")])],
      dob: [''],
      parent_name: [''],
      school_name: [''],
      school_address: [''],
      grade: ['', Validators.compose([Validators.maxLength(4), Validators.pattern('[0-9]*')])],
      status: ['enquiry', Validators.compose([Validators.required])],
      contact_time: [''],
      referral: [''],
      remarks: [''],
      active: [true, Validators.compose([Validators.required])],
      photo: [[]],
      enquiry_by: [''],
      enquiry_datetime: [new Date()]
    });

    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });

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

    this.storage.get('user').then((value) => {
      this.user = value;
      this.form.controls['enquiry_by'].setValue(this.user._id);
      if (this.user.role == 'master') {
        this.isStateDisabled = true;
        this.form.controls['state'].setValue(this.user.user_state);
        this.districts = _.filter(this.branches, function (item) {
          return (item.center_type == 'district' && item.center_parent == this.user.user_state)
        });
        this.areas = _.filter(this.branches, function (item) {
          return (item.center_type == 'unit' && item.center_parent == this.user.user_state)
        });
      } else if (this.user.role == 'district') {
        this.isStateDisabled = true;
        this.isDistrictDisabled = true;
        this.form.controls['state'].setValue(this.user.user_state);
        this.form.controls['district'].setValue(this.user.user_district);
        this.areas = _.filter(this.branches, function (item) {
          return (item.center_type == 'unit' && item.center_parent == this.user.user_district)
        });
      } else if (this.user.role == 'unit') {
        this.isStateDisabled = true;
        this.isDistrictDisabled = true;
        this.isAreaDisabled = true;
        this.form.controls['state'].setValue(this.user.user_state);
        this.form.controls['district'].setValue(this.user.user_district);
        this.form.controls['area'].setValue(this.user.user_center);
      }
    });

    this.students.query().subscribe((res: any) => {
      this.allStudents = res;
    }, err => {
      console.error('ERROR', err);
    });

  }

  ionViewDidLoad() {

  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  onStateChange(ev) {
    this.districts = _.filter(this.branches, function (item) {
      return (item.center_type == 'district' && item.center_parent == ev)
    });
    this.areas = _.filter(this.branches, function (item) {
      return (item.center_type == 'unit' && item.center_parent == ev)
    });
  }

  onDistrictChange(ev) {
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
    this.students.add(this.form.value).subscribe((resp) => {
      this.viewCtrl.dismiss();
    }, (err) => {
      let toast = this.toastCtrl.create({
        message: "Error in adding the Student Enquiry. Please try again.",
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }

  onPhoneOrEmailChange(ev) {
    let inst = _.filter(this.allStudents, function (item) {
      if(item.whatsapp_no != undefined && item.whatsapp_no != '' && item.whatsapp_no == ev.value) {
        return true;
      }
      return (item.mobile_no == ev.value || item.email_id == ev.value)
    });
    this.counter = inst.length;
  }

}
