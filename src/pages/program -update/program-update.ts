import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera } from '@ionic-native/camera';
import { IonicPage, NavController, ViewController, NavParams, ToastCmp, ToastController } from 'ionic-angular';
import { Programs } from '../../providers';
import * as _ from 'lodash';

@IonicPage()
@Component({
  selector: 'program-update',
  templateUrl: 'program-update.html'
})

export class ProgramEditPage {

  isReadyToSave: Boolean;
  form: FormGroup;
  programList;
  registration_kit = [];
  isDuplicate: Boolean = false;

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public formBuilder: FormBuilder,
    public camera: Camera,
    public programs: Programs,
    public navParams: NavParams,
    public toastCtrl: ToastController
  ) {
    this.programs.query().subscribe((res: any) => {
      this.programList = res;
    }, err => {
      console.error('ERROR', err);
    });

    let program = navParams.get('program');
    this.registration_kit = program.registration_kit;

    this.form = formBuilder.group({
      _id: [program._id, Validators.required],
      program_name: ['', Validators.compose([Validators.required])],
      program_code: ['', Validators.compose([Validators.required])],
      no_of_sessions: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]*')])],
      months_per_level: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]*')])],
      total_levels: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]*')])],
      active: [true, Validators.required],
      registration_kit: []
    });

    this.form.controls['_id'].setValue(program._id);
    this.form.controls['program_name'].setValue(program.program_name);
    this.form.controls['program_code'].setValue(program.program_code);
    this.form.controls['no_of_sessions'].setValue(program.no_of_sessions);
    this.form.controls['months_per_level'].setValue(program.months_per_level);
    this.form.controls['total_levels'].setValue(program.total_levels);
    this.form.controls['active'].setValue(program.active);

    // Watch the form for changes
    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });
  }

  ionViewDidLoad() {

  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  addRegisterationKit() {
    this.registration_kit.push('');
  }

  removeRegisterationKit(i) {
    this.registration_kit.splice(i, 1);
  }

  createProgram() {
    for (var k = 0; k < this.registration_kit.length; k++) {
      if (this.registration_kit[k] == '') {
        this.registration_kit.splice(k, 1);
        k--;
      }
    }
    this.form.controls['registration_kit'].setValue(this.registration_kit);

    this.programs.update(this.form.value).subscribe((resp) => {
      this.viewCtrl.dismiss();
    }, (err) => {
      let toast = this.toastCtrl.create({
        message: "Error in updating the Program. Please try again.",
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });

  }

  onRegisterationCodeChange(ev) {
    let program = _.filter(this.programList, function (item) {
      return (item.program_code.toUpperCase().indexOf(ev.value.toUpperCase()) >= 0)
    });

    if (program.length) this.isDuplicate = true;
  }

}

