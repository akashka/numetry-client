import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera } from '@ionic-native/camera';
import { IonicPage, NavController, ViewController, NavParams } from 'ionic-angular';
import { Programs } from '../../providers';

@IonicPage()
@Component({
  selector: 'program-detail',
  templateUrl: 'program-detail.html'
})

export class ProgramDetailPage {

  form: FormGroup;
  registration_kit = [];

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    formBuilder: FormBuilder,
    public camera: Camera,
    public programs: Programs,
    public navParams: NavParams
  ) {
    let program = navParams.get('program');
    this.registration_kit = program.registration_kit;
    this.form = formBuilder.group({
      program_name: [program.program_name],
      program_code: [program.program_code],
      no_of_sessions: [program.no_of_sessions],
      months_per_level: [program.months_per_level],
      total_levels: [program.total_levels],
      registration_kit: [program.registration_kit],
      active: [program.active]
    });
  }

  ionViewDidLoad() {

  }

  cancel() {
    this.viewCtrl.dismiss();
  }

}
