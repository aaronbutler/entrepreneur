import { Injectable } from '@angular/core';

import {Observable} from 'rxjs/Observable'; 

import {FirebaseObjectObservable} from 'angularfire2';

/*
  Generated class for the StatusService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class StatusService {
  currentProject: FirebaseObjectObservable<any>;
  cp: FirebaseObjectObservable<any>;
  groupID: string;
  projID: string;

  constructor() {
    console.log('Hello StatusService Provider');
  }

  setProject(project) {
    this.currentProject = project;
    project.subscribe((p) => {
      if(p) this.cp = p;
    })
  }

  setGroupID(gid){
    this.groupID = gid;
  }

  setProjID(pid){
    this.projID=pid;
  }

  getCurrentProject():FirebaseObjectObservable<any>{
    console.log('StatusService getCurrentProject');
    console.log(this.currentProject);
    console.log(this.cp);
    return this.currentProject;
    //return this.cp;
  }

  getGroupID(): string {
    return this.groupID;
  }

  getProjID(): string {
    return this.projID;
  }

}
