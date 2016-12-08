import { Component, ViewChild } from '@angular/core';
import { Nav, NavController,NavParams } from 'ionic-angular';

import {Observable} from 'rxjs/Observable'; 
import { FirebaseObjectObservable} from 'angularfire2';

import { StatusService } from '../../providers/status-service';
import { GroupService } from '../../providers/group-service';

/*
  Generated class for the ProjectOverview page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-project-overview',
  templateUrl: 'project-overview.html'
})
export class ProjectOverviewPage {
  //@ViewChild(Nav) nav: Nav;

  project: FirebaseObjectObservable<any>;
  title: string;

  constructor(public navCtrl: NavController, public statusService: StatusService, public groupService: GroupService) {
    this.title = "Project Overview";
    //this.project = this.statusService.getCurrentProject();

    this.project = this.groupService.getProjectObj(this.statusService.getGroupID(), this.statusService.getProjID());

    //this.project = navParams.get('project');
    /*this.project.subscribe((p) => {
      this.title = p.$key;
    })*/
  }

  ionViewDidLoad() {
    console.log('Hello ProjectOverviewPage Page');
    console.log(this.project);
  }

}
