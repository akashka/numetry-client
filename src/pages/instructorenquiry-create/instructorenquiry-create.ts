import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera } from '@ionic-native/camera';
import { IonicPage, NavController, ViewController, ToastController, Form } from 'ionic-angular';
import * as _ from 'lodash';
import { Storage } from '@ionic/storage';
import { Programs, Center, Instructor } from '../../providers';

@IonicPage()
@Component({
  selector: 'instructorenquiry-create',
  templateUrl: 'instructorenquiry-create.html'
})

export class InstructorEnquiryAddPage {

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
    public instructor: Instructor
  ) {

    this.form = formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      instructor_state: ['', Validators.compose([Validators.required])],
      instructor_district: ['', Validators.compose([Validators.required])],
      instructor_area: ['', Validators.compose([Validators.required])],
      program: [[], Validators.compose([Validators.required])],
      address: ['', Validators.compose([Validators.required])],
      pincode: ['', Validators.compose([Validators.required, Validators.maxLength(7), Validators.minLength(2)])],
      mobile_no: ['', Validators.compose([Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern('[0-9]*')])],
      whatsapp_no: ['', Validators.compose([Validators.maxLength(10), Validators.minLength(10), Validators.pattern('[0-9]*')])],
      email_id: ['', Validators.compose([Validators.required, Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")])],
      dob: [''],
      qualification: [''],
      old_organization_name: [''],
      old_organization_designation: [''],
      total_experience: [''],
      status: ['enquiry', Validators.compose([Validators.required])],
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

  save() {
    this.instructor.add(this.form.value).subscribe((resp) => {
      this.viewCtrl.dismiss();
    }, (err) => {
      let toast = this.toastCtrl.create({
        message: "Error in adding the Instructor. Please try again.",
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }

  onPhoneOrEmailChange(ev) {
    let inst = _.filter(this.allInstructors, function (item) {
      if(item.whatsapp_no != undefined && item.whatsapp_no != '' && item.whatsapp_no == ev.value) {
        return true;
      }
      return (item.mobile_no == ev.value || item.email_id == ev.value)
    });
    this.counter = inst.length;
  }

}
