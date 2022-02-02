import 'rxjs/add/operator/toPromise';
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Api } from '../api/api';
import { NullTemplateVisitor } from '@angular/compiler';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable()
export class User {
  _user: any;
  token;

  constructor(
    public api: Api,
    public storage: Storage,
    public http: HttpClient
  ) { }

  checkAuthentication(token) {
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders();
      headers.append('Authorization', token);
      this.http.get(this.api.url + 'api/auth/protected', { headers: headers })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  login(accountInfo: any) {
    let seq = this.api.post('api/auth/login', accountInfo).share();
    seq.subscribe((res: any) => {
      this._loggedIn(res);
    }, err => {
      console.error('ERROR', err);
    });
    return seq;
  }

  signup(accountInfo: any) {
    let seq = this.api.post('api/auth/register', accountInfo).share();

    seq.subscribe((res: any) => {
      if (res.status == 'success') {
        //   this._loggedIn(res);
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

  users_list() {
    let seq = this.api.get('api/auth/usersList').share();
    seq.subscribe((res: any) => {
      return res;
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

  update_user(accountInfo) {
    delete accountInfo.__v;
    let seq = this.api.post('api/auth/update', accountInfo).share();
    seq.subscribe((res: any) => {
      if (res.status == 'success') {
        //   this._loggedIn(res);
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

  logout() {
    this._user = null;
    this.storage.set('token', '');
    this.storage.set('user', {});
  }

  _loggedIn(resp) {
    this.storage.set('token', resp.token);
    this.storage.set('user', resp.user).then((res) => { });
  }
}
