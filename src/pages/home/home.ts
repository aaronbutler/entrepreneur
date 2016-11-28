import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';


import {Observable} from 'rxjs/Observable'; 

import { ProjectService } from '../../providers/project-service';
import { AuthData } from '../../providers/auth-data';

import { ProjectModalPage } from '../project-modal/project-modal';


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

  constructor(public navCtrl: NavController,public modalCtrl: ModalController, public projectService:ProjectService, public authData: AuthData ) {

  }

  ionViewDidLoad() {
    console.log('Hello HomePage Page');
    this.email = this.authData.getUserEmail();
    this.headerTitle = `${this.email}'s Projects`;
    this.populateProjects();
 
  }

  click(){
    console.log(this.groupObservable);
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

  populateProjects() {
    this.groupObservable = this.projectService.getProjects();
  }

}
