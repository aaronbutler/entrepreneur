import { Component } from '@angular/core';
import { NavController,ViewController } from 'ionic-angular';
import { ProjectService } from '../../providers/project-service';
import { AccessService } from '../../providers/access-service';

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

  newG = {};
  occupied = {"occupied": {"overview": {"description": true}}};

  constructor(public navCtrl: NavController,public viewCtrl:ViewController,  public projectService: ProjectService, public accessService: AccessService) {}

  ionViewDidLoad() {
    console.log('Hello GroupModalPage Page');
  }

  done() {
    let g = {};
    g[this.newG["title"]] = true;
    this.accessService.getGroupsObj().update(g);
    let gp = {};

    gp[this.newG["title"]] = this.occupied;
    //gp["occupied"] = occupied;
    this.projectService.addGroup(gp);

    this.viewCtrl.dismiss();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
