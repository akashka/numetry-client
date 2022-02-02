import { Component, ViewChild } from "@angular/core";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { TrannumetryService } from "@ngx-trannumetry/core";
import {
  Config,
  Nav,
  Platform,
  ToastController,
  LoadingController
} from "ionic-angular";
import { FirstRunPage } from "../pages";
import { Settings } from "../providers";
import { Storage } from "@ionic/storage";

@Component({
  selector: "side-main-menu",
  template: `
    <ion-menu [content]="content">
      <ion-content class="sideMenuIoncContent">
        <ion-list class="headerMAin">
          <ion-item class="headerBackground">
            <ion-list class="logoImage" menuClose (click)="openPage(pages[4])">
              <div
                class="circle-pic"
                text-center
                #profilePic
                [style.background-image]="'url(' + user.profile_pic + ')'"
              ></div>
            </ion-list>
            <br />
            <h2 class="userName">Hi {{ user.name }}</h2>
            <h3 class="userDetails">{{ user.role }}</h3>
          </ion-item>
        </ion-list>

        <ion-list>
          <button
            menuClose
            ion-item
            no-lines
            style="border-top: 0.55px solid white;"
            [class.activeHIghlight]="checkActive(pages[1])"
            (click)="openPage(pages[1])"
            class="buttonSIdeBAr"
          >
            <ion-icon name="home" class="sidebarCss"></ion-icon>
            Home
          </button>
          <button
            menuClose
            ion-item
            no-lines
            [class.activeHIghlight]="checkActive(pages[2])"
            (click)="openPage(pages[2])"
            class="buttonSIdeBAr"
            *ngIf="user.role != undefined && user.role == 'admin'"
          >
            <ion-icon name="bookmarks" class="sidebarCss"></ion-icon>
            Programs Master
          </button>
          <button
            menuClose
            ion-item
            no-lines
            [class.activeHIghlight]="checkActive(pages[3])"
            (click)="openPage(pages[3])"
            class="buttonSIdeBAr"
            *ngIf="user.role != undefined && user.role == 'admin'"
          >
            <ion-icon name="swap" class="sidebarCss"></ion-icon>
            State / Centers Master
          </button>
          <button
            menuClose
            ion-item
            no-lines
            [class.activeHIghlight]="checkActive(pages[4])"
            (click)="openPage(pages[4])"
            class="buttonSIdeBAr"
            *ngIf="user.role != undefined && user.role == 'admin'"
          >
            <ion-icon name="person" class="sidebarCss"></ion-icon>
            Users master
          </button>
          <button
            menuClose
            ion-item
            no-lines
            [class.activeHIghlight]="checkActive(pages[5])"
            (click)="openPage(pages[5])"
            class="buttonSIdeBAr"
            *ngIf="user.role == 'admin' || user.role == 'master' || user.role == 'district'"
          >
            <ion-icon name="briefcase" class="sidebarCss"></ion-icon>
            Franchise Enquiry
          </button>
          <button
            menuClose
            ion-item
            no-lines
            [class.activeHIghlight]="checkActive(pages[6])"
            (click)="openPage(pages[6])"
            class="buttonSIdeBAr"
            *ngIf="user.role == 'admin' || user.role == 'master' || user.role == 'district' || user.role == 'unit'"
          >
            <ion-icon name="walk" class="sidebarCss"></ion-icon>
            Instructor Enquiry
          </button>
          <button 
            menuClose 
            ion-item 
            no-lines 
            [class.activeHIghlight]="checkActive(pages[7])" 
            (click)="openPage(pages[7])"
            class="buttonSIdeBAr"
            *ngIf="user.role == 'admin' || user.role == 'master' || user.role == 'district' || user.role == 'unit'"
          >
              <ion-icon name="school" class="sidebarCss"></ion-icon>
              Student Enquiry
          </button>
          <button
            menuClose
            no-lines
            ion-item
            [class.activeHIghlight]="checkActive(pages[0])"
            (click)="openPage(pages[0])"
            class="buttonSIdeBAr"
          >
            <ion-icon class="sidebarCss" name="power"></ion-icon>
            Logout
          </button>
        </ion-list>
      </ion-content>
    </ion-menu>
    <ion-nav #content [root]="rootPage"></ion-nav>
  `
})
export class MyApp {
  rootPage = FirstRunPage;

  @ViewChild(Nav) nav: Nav;
  activePage: any;

  user = {
    name: "",
    role: "",
    profile_pic: ""
  };

  pages: any[] = [
    { title: "Welcome", component: "WelcomePage" },
    { title: "Home", component: "HomePage" },
    { title: "Programs Master", component: "ProgramsListPage" },
    { title: "State / Centers Master", component: "CentersPage" },
    { title: "Users master", component: "UsersPage" },
    { title: "Franchise Enquiry", component: "FranchiseEnquiryListPage" },
    { title: "Instructor Enquiry", component: "InstructorEnquiryListPage" },
    { title: 'Student Enquiry', component: 'StudentEnquiryListPage' },
    // { title: 'Signup', component: 'LoginPage' },
    // { title: 'Master Detail', component: 'ListMasterPage' },
    // { title: 'News Feed', component: 'NewsFeed' },
    // { title: 'Profile', component: 'ProfilePage' },
    // { title: 'Followers', component: 'Followers' },
    // { title: 'Following', component: 'Following' }
  ];

  constructor(
    private trannumetry: TrannumetryService,
    platform: Platform,
    settings: Settings,
    private config: Config,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public storage: Storage
  ) {
    platform.ready().then(() => {
      this.splashScreen.hide();
      this.statusBar.overlaysWebView(false);
      this.statusBar.backgroundColorByHexString("#1ABC9C");
    });
    this.initTrannumetry();
    this.storage.get("user").then(value => {
      this.user = value;
    });
  }

  ionViewWillEnter() {
    this.storage.get("user").then(value => {
      this.user = value;
    });
  }

  initTrannumetry() {
    // Set the default language for translation strings, and the current language.
    this.trannumetry.setDefaultLang("en");
    const browserLang = this.trannumetry.getBrowserLang();
    if (browserLang) {
      if (browserLang === "zh") {
        const browserCultureLang = this.trannumetry.getBrowserCultureLang();

        if (browserCultureLang.match(/-CN|CHS|Hans/i)) {
          this.trannumetry.use("zh-cmn-Hans");
        } else if (browserCultureLang.match(/-TW|CHT|Hant/i)) {
          this.trannumetry.use("zh-cmn-Hant");
        }
      } else {
        this.trannumetry.use(this.trannumetry.getBrowserLang());
      }
    } else {
      this.trannumetry.use("en"); // Set your language here
    }
    this.trannumetry.get(["BACK_BUTTON_TEXT"]).subscribe(values => {
      this.config.set("ios", "backButtonText", values.BACK_BUTTON_TEXT);
    });
  }

  openPage(page) {
    this.storage.get("user").then(value => {
      this.user = value;
    });

    if (page.component == "WelcomePage") {
      let loading = this.loadingCtrl.create({
        content: "Please wait..."
      });
      loading.present();
      this.storage.set("token", "");
      this.storage.set("user", {});
      setTimeout(() => {
        loading.dismiss();
        this.nav.setRoot(page.component);
        this.activePage = "random";
        let toast = this.toastCtrl.create({
          message: "You have successfully logged out",
          duration: 2000,
          position: "top"
        });
        toast.present();
      }, 2000);
    } else {
      this.nav.setRoot(page.component);
      this.activePage = page;
      console.log(page.component);
    }
  }

  checkActive(page) {
    return page == this.activePage;
  }
}
