import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';

/*
  Generated class for the AuthData provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthData {

  fireAuth: any;

  constructor(public af: AngularFire) {
    console.log('Hello AuthData Provider');
    af.auth.subscribe( user => {
      if (user) {
        this.fireAuth = user.auth;
        console.log(user);
      }
    });
  }

  loginUser(newEmail: string, newPassword: string): any {
    return this.af.auth.login({ email: newEmail, password: newPassword });
  }

  logoutUser(): any {
    let li = this.af.auth.logout();
    console.log('logging out');
    this.fireAuth = null;
    this.printUser();
    return li;
  }

  printUser() {
    console.log(this.fireAuth);
    //return null;
  }

  getUserEmail(): string {
    if(this.fireAuth === null || this.fireAuth === undefined){return null;}
    return this.fireAuth.email;
  }

  getUid(): string {

    return this.fireAuth.uid;
  }

}
