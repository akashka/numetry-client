import { Component } from "@angular/core";
import {
  App,
  IonicPage,
  NavController,
  ToastController,
  LoadingController,
  ViewController
} from "ionic-angular";
import { TrannumetryService } from "@ngx-trannumetry/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { User } from "../../providers";
import { UsersPage } from "../users-lists/users_lists";
import { HomePage } from "../home-page/home-page";
import { Storage } from "@ionic/storage";
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";

@IonicPage()
@Component({
  selector: "page-welcome",
  templateUrl: "welcome.html"
})
export class WelcomePage {
  form: FormGroup;
  isReadyToSave: boolean;
  falsemsg: string;

  // @ViewChild(Nav) nav: Nav;
  pages: any[] = [{ title: "Users Lists", component: "UsersPage" }];

  account: { email: string; password: string } = {
    email: "",
    password: ""
  };

  private signinErrorString: string;

  passwordType: string = "password";
  passwordIcon: string = "Show";

  isLoggedIn() {
    let loading = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loading.present();

    this.storage.get("token").then(value => {
      console.log("value", value);
      if (value) {
        this.user.checkAuthentication(value).then(
          resp => {
            loading.dismiss();
            this.navCtrl.setRoot(HomePage);
          },
          err => {
            loading.dismiss();
          }
        );
      } else {
        loading.dismiss();
      }
    });
  }

  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public trannumetryService: TrannumetryService,
    public loadingCtrl: LoadingController,
    public formBuilder: FormBuilder,
    public viewCtrl: ViewController,
    public app: App,
    public user: User,
    public storage: Storage,
    public iab: InAppBrowser
  ) {
    this.isLoggedIn();

    this.form = formBuilder.group({
      user_name: ["", Validators.required],
      user_pass: ["", Validators.required]
    });

    // Watch the form for changes, and
    this.form.valueChanges.subscribe(v => {
      this.isReadyToSave = this.form.valid;
    });

    this.trannumetryService.get("SIGNUP_ERROR").subscribe(value => {
      this.signinErrorString = value;
    });

    this.falsemsg = "Welcome !";
  }

  hideShowPassword() {
    this.passwordType = this.passwordType === "text" ? "password" : "text";
    this.passwordIcon = this.passwordIcon === "Show" ? "Hide" : "Show";
  }

  signIn() {
    if (!this.form.valid) {
      let toast = this.toastCtrl.create({
        message: "Email and password both are required to Sign In.",
        duration: 3000,
        position: "top"
      });
      toast.present();
      return;
    } else {
      let loading = this.loadingCtrl.create({
        content: "Signing in..."
      });
      loading.present();
      this.user.login(this.account).subscribe(
        resp => {
          loading.dismiss();
          this.navCtrl.setRoot(HomePage);
        },
        err => {
          loading.dismiss();
          let toast = this.toastCtrl.create({
            message: "Oops ! some issues has occured. Please try again later!",
            duration: 3000,
            position: "top"
          });
          toast.present();
        }
      );
    }
  }

  contactUs() {
    const browser = this.iab.create("http://www.numetryindia.com/contact-us/");
    browser.show();
  }

  feedback() {
    const browser = this.iab.create("http://www.numetryindia.com/feedback/");
    browser.show();
  }

  faq() {
    const browser = this.iab.create("http://www.numetryindia.com/faq/");
    browser.show();
  }
}
