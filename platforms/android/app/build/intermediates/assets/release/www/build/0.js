webpackJsonp([0],{

/***/ 773:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WelcomePageModule", function() { return WelcomePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngx_trannumetry_core__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__welcome__ = __webpack_require__(775);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var WelcomePageModule = /** @class */ (function () {
    function WelcomePageModule() {
    }
    WelcomePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__welcome__["a" /* WelcomePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_3__welcome__["a" /* WelcomePage */]),
                __WEBPACK_IMPORTED_MODULE_1__ngx_trannumetry_core__["b" /* TrannumetryModule */].forChild()
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_3__welcome__["a" /* WelcomePage */]
            ]
        })
    ], WelcomePageModule);
    return WelcomePageModule;
}());

//# sourceMappingURL=welcome.module.js.map

/***/ }),

/***/ 775:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WelcomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_trannumetry_core__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__home_page_home_page__ = __webpack_require__(412);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_storage__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_in_app_browser_ngx__ = __webpack_require__(413);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var WelcomePage = /** @class */ (function () {
    function WelcomePage(navCtrl, toastCtrl, trannumetryService, loadingCtrl, formBuilder, viewCtrl, app, user, storage, iab) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.toastCtrl = toastCtrl;
        this.trannumetryService = trannumetryService;
        this.loadingCtrl = loadingCtrl;
        this.formBuilder = formBuilder;
        this.viewCtrl = viewCtrl;
        this.app = app;
        this.user = user;
        this.storage = storage;
        this.iab = iab;
        // @ViewChild(Nav) nav: Nav;
        this.pages = [{ title: "Users Lists", component: "UsersPage" }];
        this.account = {
            email: "",
            password: ""
        };
        this.passwordType = "password";
        this.passwordIcon = "Show";
        this.isLoggedIn();
        this.form = formBuilder.group({
            user_name: ["", __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required],
            user_pass: ["", __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required]
        });
        // Watch the form for changes, and
        this.form.valueChanges.subscribe(function (v) {
            _this.isReadyToSave = _this.form.valid;
        });
        this.trannumetryService.get("SIGNUP_ERROR").subscribe(function (value) {
            _this.signinErrorString = value;
        });
        this.falsemsg = "Welcome !";
    }
    WelcomePage.prototype.isLoggedIn = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: "Please wait..."
        });
        loading.present();
        this.storage.get("token").then(function (value) {
            console.log("value", value);
            if (value) {
                _this.user.checkAuthentication(value).then(function (resp) {
                    loading.dismiss();
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__home_page_home_page__["a" /* HomePage */]);
                }, function (err) {
                    loading.dismiss();
                });
            }
            else {
                loading.dismiss();
            }
        });
    };
    WelcomePage.prototype.hideShowPassword = function () {
        this.passwordType = this.passwordType === "text" ? "password" : "text";
        this.passwordIcon = this.passwordIcon === "Show" ? "Hide" : "Show";
    };
    WelcomePage.prototype.signIn = function () {
        var _this = this;
        if (!this.form.valid) {
            var toast = this.toastCtrl.create({
                message: "Email and password both are required to Sign In.",
                duration: 3000,
                position: "top"
            });
            toast.present();
            return;
        }
        else {
            var loading_1 = this.loadingCtrl.create({
                content: "Signing in..."
            });
            loading_1.present();
            this.user.login(this.account).subscribe(function (resp) {
                loading_1.dismiss();
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__home_page_home_page__["a" /* HomePage */]);
            }, function (err) {
                loading_1.dismiss();
                var toast = _this.toastCtrl.create({
                    message: "Oops ! some issues has occured. Please try again later!",
                    duration: 3000,
                    position: "top"
                });
                toast.present();
            });
        }
    };
    WelcomePage.prototype.contactUs = function () {
        var browser = this.iab.create("http://www.numetryindia.com/contact-us/");
        browser.show();
    };
    WelcomePage.prototype.feedback = function () {
        var browser = this.iab.create("http://www.numetryindia.com/feedback/");
        browser.show();
    };
    WelcomePage.prototype.faq = function () {
        var browser = this.iab.create("http://www.numetryindia.com/faq/");
        browser.show();
    };
    WelcomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: "page-welcome",template:/*ion-inline-start:"/home/akash/Code/akash/numetry/src/pages/welcome/welcome.html"*/'<ion-content scroll="false">\n  <div class="fixed-content">\n\n    <div class="logoHeader">\n      <img alt="logo" height="60" style="position: relative" src="../assets/img/icon-512x512.png">\n    </div>\n\n    <h1 class="welcomeHeader"> &nbsp; </h1>\n\n    <form *ngIf="form" [formGroup]="form">\n      <div padding>\n        <ion-input type="email" [(ngModel)]="account.email" class="input-access-code" placeholder="Email"\n          formControlName="user_name"></ion-input>\n        <br>\n        <ion-input [type]="passwordType" [(ngModel)]="account.password" class="input-access-code" placeholder="Password"\n          formControlName="user_pass"></ion-input>\n        <br>\n        <ion-icon item-end [name]="passwordIcon" class="passwordIcon" (click)=\'hideShowPassword()\' style="z-index:9999999;">{{passwordIcon}}\n          Password</ion-icon>\n        <br> <br>\n        <a (click)="signIn()">\n          <button ion-button block class="login" style="color:white !important;">{{ \'LOGIN\' | trannumetry }}</button>\n        </a>\n      </div>\n    </form>\n\n    <div class="welcome-footer">\n      <a (click)="contactUs()"> Contact Us </a>\n      <a (click)="feedback()"> Feedback </a>\n      <a (click)="faq()"> FAQ </a>\n    </div>\n\n    <div class="reservation">\n      All Rights Reserved by Numetry India &copy; 2019\n    </div>\n\n  </div>\n</ion-content>'/*ion-inline-end:"/home/akash/Code/akash/numetry/src/pages/welcome/welcome.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_2__ngx_trannumetry_core__["c" /* TrannumetryService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */],
            __WEBPACK_IMPORTED_MODULE_4__providers__["h" /* User */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_in_app_browser_ngx__["a" /* InAppBrowser */]])
    ], WelcomePage);
    return WelcomePage;
}());

//# sourceMappingURL=welcome.js.map

/***/ })

});
//# sourceMappingURL=0.js.map