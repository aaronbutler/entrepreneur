import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';


import {Observable} from 'rxjs/Observable'; 

import { ProjectService } from '../../providers/project-service';
import { AuthData } from '../../providers/auth-data';
import { StatusService } from '../../providers/status-service';

import { ProjectModalPage } from '../project-modal/project-modal';
import { GroupModalPage } from '../group-modal/group-modal';
import { ProjectOverviewPage } from '../project-overview/project-overview';

/*
  Generated class for the Home page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  

 
  groupObservable: Observable<any[]>;
  email: string;
  headerTitle: string;

  constructor(public navCtrl: NavController,public modalCtrl: ModalController, public projectService:ProjectService, public authData: AuthData, public statusService: StatusService ) {

  }

  ionViewDidLoad() {
    console.log('Hello HomePage Page');
    this.email = this.authData.getUserEmail();
    this.headerTitle = `${this.email}'s Projects`;
    this.populateProjects();
 
  }

  click(group){
    console.log(group);
  }

  clickButton(project) {
    console.log(`clicking project`);
    console.log(project);
  }

  addNewProjectButton() {
    //console.log(item);
    let projectModal = this.modalCtrl.create(ProjectModalPage);
    //console.log('created the modal');
    projectModal.present();
    //console.log('presented the modal');
  }

  addNewGroupButton() {
    let groupModal = this.modalCtrl.create(GroupModalPage);
    groupModal.present();
  }

  unoccupied(p): boolean {
    if(p.$key == "occupied") return false;
    return true;
  }

  populateProjects() {
    this.groupObservable = this.projectService.getProjects();
    //console.log(this.groupObservable);
  }

  openProject(group,project) {
    console.log(project);
    //getProject(group,project)
    this.statusService.setProject(this.projectService.getProject(group.$key,project.$key));
    this.statusService.setGroupID(group.$key);
    this.statusService.setProjID(project.$key);
    this.navCtrl.setRoot(ProjectOverviewPage);
  }

  logoutUser() {
    console.log(this.authData.logoutUser());
  }
  
  loggedIn() {
    //console.log(this.accessService.getGroups());
    return this.authData.getUserEmail();
  }

}
