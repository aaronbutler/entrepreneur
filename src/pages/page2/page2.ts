import { Component } from '@angular/core';

import { NavController, ModalController } from 'ionic-angular';

import { StatusService } from '../../providers/status-service';
import { UserService } from '../../providers/user-service';
import { GroupService } from '../../providers/group-service';
import { LogService } from '../../providers/log-service';

import { ProjectOverviewPage } from '../project-overview/project-overview';
import { ProjectModalPage } from '../project-modal/project-modal';
import { GroupModalPage } from '../group-modal/group-modal';

import { FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';

import {Observable} from 'rxjs/Observable'; 

@Component({
  selector: 'page-page2',
  templateUrl: 'page2.html'
})
export class Page2 {
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;
  user: FirebaseObjectObservable<any>;
  groups: FirebaseListObservable<any[]>;
  groupObservable: Observable<any[]>;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public statusService: StatusService, public log: LogService, public userService: UserService, public groupService: GroupService) {
    // If we navigated to this page, we will have an item available as a nav param
    //this.selectedItem = navParams.get('item');

    // Let's populate this page with some filler content for funzies
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];
    for (let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }

    this.user = this.userService.getUserObj();
    this.groups = this.userService.getUsersGroups();
    this.groupObservable = this.groupService.getUsersProjects();
    this.log.log(3,"Page2","constructor",this.user,this.groups,this.groupObservable);
  }

  openProject(group,project) {
    this.log.log(3,"Page2","openProject",project);
    //getProject(group,project)
    //this.statusService.setProject(this.projectService.getProject(group.$key,project.$key));
    this.statusService.setGroupID(group.$key);
    this.statusService.setProjID(project.$key);
    //console.log(`${group.$key}--${project.$key}`);
    this.navCtrl.setRoot(ProjectOverviewPage);
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

  click() {
    this.log.log(3,"Page2","click","user",this.user);
    this.log.log(3,"Page2","click","groups",this.groups);
    this.log.log(3,"Page2","click","groupObservable",this.groupObservable);
  }
}
