import { Injectable } from '@angular/core';
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';

import { AuthData } from './auth-data';

/*
  Generated class for the AccessService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AccessService {

  constructor(public af:AngularFire, public authData: AuthData) {
    console.log('Hello AccessService Provider');
  }

  mungeEmail(): string{
    let email = this.authData.getUserEmail();
    if(email) email = email.replace(/\./g,"_");
    return email;
  }

  getGroups(): FirebaseListObservable<any[]> {
    let user = this.mungeEmail();
    let groups = this.af.database.list(`/usergroups/${user}/groups`);
    //let groups = this.af.database.list(`/usergroups/`);
    return groups;
  }

  getGroupsObj(): FirebaseObjectObservable<any> {
    let user = this.mungeEmail();
    return this.af.database.object(`/usergroups/${user}/groups`);
  }


}
