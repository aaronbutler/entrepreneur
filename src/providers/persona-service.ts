import { Injectable } from '@angular/core';

import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';

import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/map';

import { ProjectService } from './project-service';

/*
  Generated class for the PersonaService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class PersonaService {

  constructor(public af: AngularFire, public projectService: ProjectService) {
    console.log('Hello PersonaService Provider');
  }

  getPersonas(group: string, project: string):FirebaseListObservable<any[]>{
    let p = this.af.database.list(`/groups/${group}/${project}/personas`);
    return p;
  }

  getPersonasObj(group: string, project: string):FirebaseObjectObservable<any>{
    let p = this.af.database.object(`/groups/${group}/${project}/personas`);
    return p;
  }

  savePic(url: string, group: string, project:string, name:string){
    //let p = {};
    //p["personas"] = {"picUrl": url};
    //this.projectService.getProject(group,project).update(p);
    //let p = this.af.database.list()
    //this.personaService.savePic(url,group,project,name)
  }

  addPersona(group: string, project:string, name:string, data: any):FirebaseObjectObservable<any> {
    let p = {};
    if(data != undefined) {
      p[name] = data;
    }
    else p[name] = {"placeholder": true};
    let po = this.getPersonasObj(group, project);
    po.update(p);
    return this.getPersona(group, project, name);
  }


  addPersonaFBKey(group: string, project: string, name: string) {
    this.getPersonas(group,project).push({"name":name,"placeholder": true});
  }

  getPersona(group: string, project: string, name: string):FirebaseObjectObservable<any> {
    return this.af.database.object(`/groups/${group}/${project}/personas/${name}`);
  }

}
