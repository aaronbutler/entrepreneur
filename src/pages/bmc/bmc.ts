import { Component,OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import {Observable} from 'rxjs/Observable'; 

import { FirebaseObjectObservable} from 'angularfire2';

import { AuthData } from '../../providers/auth-data';
import { StatusService } from '../../providers/status-service';

import { Page1 } from '../page1/page1';

/*
  Generated class for the Bmc page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-bmc',
  templateUrl: 'bmc.html'
})
export class BmcPage implements OnInit {
  project: FirebaseObjectObservable<any>
  constructor(public navCtrl: NavController, public authData: AuthData, public statusService: StatusService) {
    //this.project = this.statusService.getCurrentProject();
  }
  ngOnInit(){
    this.project = this.statusService.getCurrentProject();
  }
  ionViewDidLoad() {
    console.log('Hello BmcPage Page');
    console.log(this.statusService);
    
    //console.log(this.statusService);
    
    if(!this.authData.getUserEmail()){     
      this.navCtrl.setRoot( Page1 );
    }
  }

}
