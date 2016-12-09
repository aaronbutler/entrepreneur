import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { FirebaseObjectObservable} from 'angularfire2';

import { StatusService } from '../../providers/status-service';
import { GroupService } from '../../providers/group-service';
import { LogService } from '../../providers/log-service';

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

  constructor(public navCtrl: NavController, public statusService: StatusService, public groupService: GroupService, public log: LogService) {
    this.title = "Project Overview";
    //this.project = this.statusService.getCurrentProject();

    this.project = this.groupService.getProjectObj(this.statusService.getGroupID(), this.statusService.getProjID());

    //this.project = navParams.get('project');
    /*this.project.subscribe((p) => {
      this.title = p.$key;
    })*/
  }

  ionViewDidLoad() {
    this.log.log(3,"ProjectOverviewPage","ionViewDidLoad","project",this.project);
  }

}
