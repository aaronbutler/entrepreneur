import { Injectable } from '@angular/core';
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';

import {Observable} from 'rxjs/Observable'; 
import 'rxjs/add/operator/map';


import { UserService } from './user-service';
import { LogService } from './log-service';

/*
  Generated class for the GroupService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class GroupService {

  constructor(public af: AngularFire, public userService: UserService, public log: LogService) {
    
  }

  getUsersProjects():Observable<any[]> {
    let p = this.userService.getUsersGroups().map((groups) => {
      return groups.map((group) => {
        group.g = this.getGroupObj(group.$key);
        group.projects = this.getProjectsByGroup(group.$key);
        return group;
      });
    });
    return p;
  } 

  getProjectsByGroup(groupID): FirebaseListObservable<any[]> {
    let p = this.af.database.list(`/groups/${groupID}/projects`);

    return p;
  }

  getProjectObj(groupID,projectID): FirebaseObjectObservable<any> {
    return this.af.database.object(`/groups/${groupID}/projects/${projectID}`);
  }

  getGroupObj(groupID): FirebaseObjectObservable<any> {
    return this.af.database.object(`/groups/${groupID}`)
  }

  addGroupObj(group: any) {
    this.af.database.object(`/groups/`).update(group);
  }

  getGroups():Observable<any[]> {
    let p = this.userService.getUsersGroups().map((groups => {
      return groups.map((group) => {
        group.g = this.getGroupObj(group.$key);
        return group;
      });
    }));
    return p;
  }

}
