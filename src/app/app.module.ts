import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Camera } from '@ionic-native/camera';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { TrannumetryLoader, TrannumetryModule } from '@ngx-trannumetry/core';
import { TrannumetryHttpLoader } from '@ngx-trannumetry/http-loader';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { Vibration } from '@ionic-native/vibration';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts/ngx';
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";

import { Settings, User, Api, Programs, Instructor, Center, Franchise, Students } from '../providers';

import { MyApp } from './app.component';

import { HomePageModule } from "../pages/home-page/home-page.module";
import { HomeTabModule } from "../pages/home-tab/home-tab.module";
import { NotificationTabModule } from "../pages/notification-tab/notification-tab.module";
import { ProfileTabModule } from "../pages/profile-tab/profile-tab.module";

import { ProgramsListPageModule } from "../pages/programs-list/programs-list.module";
import { ProgramAddPageModule } from "../pages/program -create/program-create.module";
import { ProgramDetailPageModule } from "../pages/program -detail/program-detail.module";
import { ProgramEditPageModule } from "../pages/program -update/program-update.module";

import { CentersPageModule } from "../pages/centers-page/centers-page.module";
import { DistrictTabModule } from '../pages/district-tab/district-tab.module';
import { StatesTabModule } from '../pages/states-tab/states-tab.module';
import { BranchesTabModule } from '../pages/branches-tab/branches-tab.module';
import { AreaTabModule } from '../pages/area-tab/area-tab.module';
import { AreaEditModule } from '../pages/area-edit/area-edit.module';
import { StatesEditModule } from '../pages/states-edit/states-edit.module';
import { DistrictEditModule } from '../pages/district-edit/district-edit.module';

import { UsersPageModule } from "../pages/users-lists/users_lists.module";
import { SignupPageModule } from "../pages/user-add/signup.module";
import { UserDetailPageModule } from "../pages/user-detail/user-detail.module";
import { UserUpdatePageModule } from "../pages/user-update/user-update.module";

import { FranchiseEnquiryAddPageModule } from '../pages/franchiseenquiry-create/franchiseenquiry-create.module';
import { FranchiseEnquiryEditPageModule } from '../pages/franchiseenquiry-edit/franchiseenquiry-edit.module';
import { FranchiseEnquiryListPageModule } from '../pages/franchiseenquiry-list/franchiseenquiry-list.module';
import { FranchiseEnquiryViewPageModule } from '../pages/franchiseenquiry-view/franchiseenquiry-view.module';
import { FollowupCreateTabModule } from '../pages/followupcreate-tab/followupcreate-tab.module';
import { FollowupViewTabModule } from '../pages/followupview-tab/followupview-tab.module';

import { InstructorEnquiryAddPageModule } from '../pages/instructorenquiry-create/instructorenquiry-create.module';
import { InstructorEnquiryListPageModule } from '../pages/instructorenquiry-list/instructorenquiry-list.module';
import { InstructorEnquiryEditPageModule } from '../pages/instructorenquiry-update/instructorenquiry-update.module';
import { InstructorEnquiryViewPageModule } from '../pages/instructorenquiry-view/instructorenquiry-view.module';

import { StudentEnquiryAddPageModule } from '../pages/studentenquiry-create/studentenquiry-create.module';
import { StudentEnquiryListPageModule } from '../pages/studentenquiry-list/studentenquiry-list.module';
import { StudentEnquiryEditPageModule } from '../pages/studentenquiry-update/studentenquiry-update.module';
import { StudentEnquiryViewPageModule } from '../pages/studentenquiry-view/studentenquiry-view.module';

// Module imported here and bottom

export function createTrannumetryLoader(http: HttpClient) {
  return new TrannumetryHttpLoader(http, './assets/i18n/', '.json');
}

export function provideSettings(storage: Storage) {
  return new Settings(storage, {
    option1: true,
    option2: 'AKASH K A',
    option3: '3',
    option4: 'Hello World!'
  });
}

@NgModule({

  declarations: [
    MyApp,
  ],

  imports: [
    BrowserModule,
    HttpClientModule,

    HomePageModule,
    HomeTabModule,
    ProfileTabModule,
    NotificationTabModule,

    ProgramAddPageModule,
    ProgramDetailPageModule,
    ProgramEditPageModule,
    ProgramsListPageModule,

    UsersPageModule,
    SignupPageModule,
    UserDetailPageModule,
    UserUpdatePageModule,

    CentersPageModule,
    DistrictTabModule,
    StatesTabModule,
    BranchesTabModule,
    AreaTabModule,
    StatesEditModule,
    AreaEditModule,
    DistrictEditModule,

    FranchiseEnquiryAddPageModule,
    FranchiseEnquiryEditPageModule,
    FranchiseEnquiryListPageModule,
    FranchiseEnquiryViewPageModule,
    FollowupCreateTabModule,
    FollowupViewTabModule,

    InstructorEnquiryAddPageModule,
    InstructorEnquiryListPageModule,
    InstructorEnquiryEditPageModule,
    InstructorEnquiryViewPageModule,

    StudentEnquiryAddPageModule,
    StudentEnquiryListPageModule,
    StudentEnquiryEditPageModule,
    StudentEnquiryViewPageModule,

    TrannumetryModule.forRoot({
      loader: {
        provide: TrannumetryLoader,
        useFactory: (createTrannumetryLoader),
        deps: [HttpClient]
      }
    }),
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],

  bootstrap: [IonicApp],

  entryComponents: [
    MyApp,
  ],

  providers: [
    Camera,
    SplashScreen,
    StatusBar,
    Vibration,
    CallNumber,
    InAppBrowser,
    User, 
    Api, 
    Programs, 
    Instructor, 
    Center, 
    Franchise, 
    Students,
    { provide: Settings, useFactory: provideSettings, deps: [Storage] },
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]

})
export class AppModule { }
