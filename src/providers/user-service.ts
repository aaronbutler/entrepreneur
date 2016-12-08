import { Injectable } from '@angular/core';
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';

import { AuthData } from './auth-data';

/*
  New user creation will be manual and by invitation only for a while.
*/
@Injectable()
export class UserService {

  constructor(public af:AngularFire, public authData: AuthData) {
    console.log('Hello UserService Provider');
  }

  getUsersGroups(): FirebaseListObservable<any[]> {
    let uid = this.authData.getUid();
    return this.af.database.list(`/users/${uid}/groups`);
    
  }
  
  getUserObj() {
    let uid = this.authData.getUid();
    console.log(`uid: ${uid}`);
    return this.af.database.object(`/users/${uid}`);
  }
}
