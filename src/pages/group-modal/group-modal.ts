import { Component } from '@angular/core';
import { NavController,ViewController } from 'ionic-angular';
import { ProjectService } from '../../providers/project-service';
import { AccessService } from '../../providers/access-service';
import { GroupService } from '../../providers/group-service';
import { UserService } from '../../providers/user-service';
import { LogService } from '../../providers/log-service';

/*
  Generated class for the GroupModal page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-group-modal',
  templateUrl: 'group-modal.html'
})
export class GroupModalPage {

  newG: any;
  occupied = {"occupied": {"overview": {"description": true}}};

  constructor(public navCtrl: NavController,public viewCtrl:ViewController,  public log: LogService, public projectService: ProjectService, public accessService: AccessService,public groupService: GroupService,public userService: UserService) {
    this.newG = {};
  }

  ionViewDidLoad() {
    
  }

/*
  -retrieve usergroups from userservice
  -push group to list
*/
  done() {
    let groups = this.userService.getUsersGroups();
    let g = {"placeholder":true};
    
    
    let key = groups.push(g).key;
    
    let newGroup = {};
    newGroup[key] = {"name":this.newG['title']};

    this.groupService.addGroupObj(newGroup);

    /*let g = {};
    g[this.newG["title"]] = true;
    this.accessService.getGroupsObj().update(g);
    let gp = {};

    gp[this.newG["title"]] = this.occupied;
    
    this.projectService.addGroup(gp);*/

    this.viewCtrl.dismiss();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
