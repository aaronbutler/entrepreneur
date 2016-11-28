import { Component,Input, OnInit } from '@angular/core';

import { NavController } from 'ionic-angular';

import { AuthData } from '../../providers/auth-data';
import { ProjectService } from '../../providers/project-service';

import { Page1 } from '../../pages/page1/page1';

/*
  Generated class for the BasicHeader component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'basic-header',
  templateUrl: 'basic-header.html'
})
export class BasicHeaderComponent implements OnInit {

  @Input()
  title: string;

  constructor(public navCtrl: NavController, public authData: AuthData, public projectService: ProjectService) {
    //console.log('Hello BasicHeader Component');
    //this.text = 'Hello World';
  }

   ngOnInit() {
    //console.log('Hello Basic');
    
    if(!this.authData.getUserEmail()){     
      this.navCtrl.setRoot( Page1 );
    }
    
    

    




    
  }

  logoutUser() {
    console.log(this.authData.logoutUser());
  }
  
  loggedIn() {
    //console.log(this.accessService.getGroups());
    return this.authData.getUserEmail();
  }

}
