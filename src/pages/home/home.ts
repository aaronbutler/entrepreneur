import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {Observable} from 'rxjs/Observable'; 

import { ProjectService } from '../../providers/project-service';
import { AuthData } from '../../providers/auth-data';


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

  constructor(public navCtrl: NavController,public projectService:ProjectService, public authData: AuthData ) {

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

  populateProjects() {
    this.groupObservable = this.projectService.getProjects();
  }

}
