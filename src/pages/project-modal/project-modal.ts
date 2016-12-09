import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';

import { FirebaseListObservable } from 'angularfire2';

import {Observable} from 'rxjs/Observable'; 

import { ProjectService } from '../../providers/project-service';
import { AccessService } from '../../providers/access-service';
import { GroupService } from '../../providers/group-service';
import { LogService } from '../../providers/log-service';

/*
  Generated class for the ProjectModal page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-project-modal',
  templateUrl: 'project-modal.html'
})
export class ProjectModalPage {

  newP: any;
  accessGroups: FirebaseListObservable<any[]>;
  groupServiceGroups: Observable<any[]>;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public log: LogService, public projectService: ProjectService, public accessService: AccessService, public groupService: GroupService) {
    this.newP = {};
  }

  ionViewDidLoad() {

    
    this.accessGroups = this.accessService.getGroups();
    this.groupServiceGroups = this.groupService.getGroups();
  }

  click() {
    let name=this._generateRandomName();
    let p = {};
    p[name] = {"overview": {"description":"heres a description for you"}};
    this.log.log(3,"ProjectModalPage","click","p",p)
    this.projectService.getGroup("aaron@thoroughcio_com").update(p);
  }

  dismiss() {
   //let data = { 'foo': 'bar' };
    this.log.log(1,"ProjectModalPage","dismiss",'dismissing');
    this.viewCtrl.dismiss();
  }


  done() {
    
    let d = new Date().toString();
    
    let newProject = {"name": this.newP.title, "overview": {"description": this.newP.description, "creationDate":d }};
    
    this.groupService.getProjectsByGroup(this.newP["group"]).push(newProject);

/*
    let p = {};
    let d = new Date();
    p[this.newP["title"]] = {"overview": {"description": this.newP["description"],"creationDate":d}};
    this.projectService.getGroup(this.newP["group"]).update(p);
*/

    this.viewCtrl.dismiss();
  }

  _generateRandomName(): string {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 8; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

  _blurKeyboard(event){
 	  //console.log(event);
 	  event.target.blur();
 	  return true;
  }

}
