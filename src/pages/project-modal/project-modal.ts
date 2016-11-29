import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';

import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';

import { ProjectService } from '../../providers/project-service';
import { AccessService } from '../../providers/access-service';
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

  newP = {};
  accessGroups: FirebaseListObservable<any[]>;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public projectService: ProjectService, public accessService: AccessService) {}

  ionViewDidLoad() {
    console.log('Hello ProjectModalPage Page');
    this.accessGroups = this.accessService.getGroups();
  }

  click() {
    let name=this._generateRandomName();
    let p = {};
    p[name] = {"overview": {"description":"heres a description for you"}};
    console.log(p)
    this.projectService.getGroup("aaron@thoroughcio_com").update(p);
  }

  dismiss() {
   //let data = { 'foo': 'bar' };
    console.log('dismissing');
    this.viewCtrl.dismiss();
  }


  done() {
    console.log(this.newP);
    let p = {};
    p[this.newP["title"]] = {"overview": {"description": this.newP["description"]}};
    this.projectService.getGroup(this.newP["group"]).update(p);
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
