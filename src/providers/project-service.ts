import { Injectable } from '@angular/core';
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';

import {Observable} from 'rxjs/Observable'; 
import 'rxjs/add/operator/map';


import { AccessService } from './access-service';


/*
  Generated class for the ProjectService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ProjectService {

  constructor(public af:AngularFire, public accessService: AccessService) {
    console.log('Hello ProjectService Provider');
  }

  getProjects():Observable<any[]> {
    let p = this.accessService.getGroups().map((groups) => {
      return groups.map((group) => {
        group.projects = this.getProjectsByGroup(group.$key);
        return group;
      });
    });
    return p;
  } 

  getProjectsByGroup(group): FirebaseListObservable<any[]> {
    let p = this.af.database.list(`/groups/${group}`);

    return p;
  }

  getGroup(group): FirebaseObjectObservable<any> {
    return this.af.database.object(`/groups/${group}`);
  }

  addGroup(group) {
    this.af.database.object(`/groups`).update(group);
  }

}
