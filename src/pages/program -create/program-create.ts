import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera } from '@ionic-native/camera';
import { IonicPage, NavController, ViewController, ToastController } from 'ionic-angular';
import { Programs } from '../../providers';
import * as _ from 'lodash';

@IonicPage()
@Component({
  selector: 'program-create',
  templateUrl: 'program-create.html'
})

export class ProgramAddPage {

  isReadyToSave: Boolean = false;
  form: FormGroup;
  programList;
  isDuplicate: Boolean = false;
  registration_kit = [];

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    formBuilder: FormBuilder,
    public camera: Camera,
    public programs: Programs,
    public toastCtrl: ToastController
  ) {
    this.programs.query().subscribe((res: any) => {
      this.programList = res;
    }, err => {
      console.error('ERROR', err);
    });

    this.form = formBuilder.group({
      program_name: ['', Validators.compose([Validators.required])],
      program_code: ['', Validators.compose([Validators.required])],
      no_of_sessions: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]*')])],
      months_per_level: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]*')])],
      total_levels: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]*')])],
      active: [true, Validators.required],
      registration_kit: []
    });

    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });
  }

  ionViewDidLoad() {

  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  createProgram() {
    for (var k = 0; k < this.registration_kit.length; k++) {
      if (this.registration_kit[k] == '') {
        this.registration_kit.splice(k, 1);
        k--;
      }
    }
    this.form.controls['registration_kit'].setValue(this.registration_kit);
    this.programs.add(this.form.value).subscribe((resp) => {
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

  addRegisterationKit() {
    this.registration_kit.push('');
  }

  removeRegisterationKit(i) {
    this.registration_kit.splice(i, 1);
  }

  onRegisterationCodeChange(ev) {
    let program = _.filter(this.programList, function (item) {
      return (item.program_code.toUpperCase().indexOf(ev.value.toUpperCase()) >= 0)
    });
    this.isDuplicate = program.length > 0;
  }


}
