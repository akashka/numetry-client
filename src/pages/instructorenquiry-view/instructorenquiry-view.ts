import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera } from '@ionic-native/camera';
import { IonicPage, NavController, ViewController, ToastController, Form, NavParams } from 'ionic-angular';
import * as _ from 'lodash';
import { Storage } from '@ionic/storage';
import { Programs, Center, Instructor } from '../../providers';

@IonicPage()
@Component({
  selector: 'instructorenquiry-view',
  templateUrl: 'instructorenquiry-view.html'
})

export class InstructorEnquiryViewPage {

  form;
  isReadyToSave: Boolean = false;
  branches;
  states;
  programmes;
  user;
  districts;
  areas;
  allInstructors;
  isStateDisabled: Boolean = false;
  isDistrictDisabled: Boolean = false;
  isAreaDisabled: Boolean = false;
  counter: Number = 0;

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
    public navParams: NavParams
  ) {

    let pro = navParams.get('instructor');

    this.form = formBuilder.group({
      _id: [pro._id, Validators.compose([Validators.required])],
      name: [pro.name, Validators.compose([Validators.required])],
      instructor_state: [pro.instructor_state, Validators.compose([Validators.required])],
      instructor_district: [pro.instructor_district, Validators.compose([Validators.required])],
      instructor_area: [pro.instructor_area, Validators.compose([Validators.required])],
      program: [pro.program, Validators.compose([Validators.required])],
      address: [pro.address, Validators.compose([Validators.required])],
      pincode: [pro.pincode, Validators.compose([Validators.required, Validators.maxLength(7), Validators.minLength(2)])],
      mobile_no: [pro.mobile_no, Validators.compose([Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern('[0-9]*')])],
      whatsapp_no: [pro.whatsapp_no, Validators.compose([Validators.maxLength(10), Validators.minLength(10), Validators.pattern('[0-9]*')])],
      email_id: [pro.email_id, Validators.compose([Validators.required, Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")])],
      dob: [pro.dob],
      qualification: [pro.qualification],
      old_organization_name: [pro.old_organization_name],
      old_organization_designation: [pro.old_organization_designation],
      total_experience: [pro.total_experience],
      status: [pro.status, Validators.compose([Validators.required])],
      remarks: [pro.remarks],
      active: [pro.active, Validators.compose([Validators.required])],
      photo: [pro.photo],
      enquiry_by: [pro.enquiry_by],
      enquiry_datetime: [pro.enquiry_datetime]
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
      this.onInstructorStateChange(pro.instructor_state);
      this.onInstructorDistrictChange(pro.instructor_district);
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
        this.form.controls['instructor_state'].setValue(this.user.user_state);
        this.districts = _.filter(this.branches, function (item) {
          return (item.center_type == 'district' && item.center_parent == this.user.user_state)
        });
        this.areas = _.filter(this.branches, function (item) {
          return (item.center_type == 'unit' && item.center_parent == this.user.user_state)
        });
      } else if (this.user.role == 'district') {
        this.isStateDisabled = true;
        this.isDistrictDisabled = true;
        this.form.controls['instructor_state'].setValue(this.user.user_state);
        this.form.controls['instructor_district'].setValue(this.user.user_district);
        this.areas = _.filter(this.branches, function (item) {
          return (item.center_type == 'unit' && item.center_parent == this.user.user_district)
        });
      } else if (this.user.role == 'unit') {
        this.isStateDisabled = true;
        this.isDistrictDisabled = true;
        this.isAreaDisabled = true;
        this.form.controls['instructor_state'].setValue(this.user.user_state);
        this.form.controls['instructor_district'].setValue(this.user.user_district);
        this.form.controls['instructor_area'].setValue(this.user.user_center);
      }
    });

    this.instructor.query().subscribe((res: any) => {
      this.allInstructors = res;
    }, err => {
      console.error('ERROR', err);
    });

  }

  ionViewDidLoad() {

  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  onInstructorStateChange(ev) {
    this.districts = _.filter(this.branches, function (item) {
      return (item.center_type == 'district' && item.center_parent == ev)
    });
    this.areas = _.filter(this.branches, function (item) {
      return (item.center_type == 'unit' && item.center_parent == ev)
    });
  }

  onInstructorDistrictChange(ev) {
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

}
