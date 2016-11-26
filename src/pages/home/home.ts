import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AuthData } from '../../providers/auth-data';
import { Page1 } from '../page1/page1';

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

  pageTitle="Home!";

  constructor(public navCtrl: NavController, public authData: AuthData) {

  }

  ionViewDidLoad() {
    console.log('Hello HomePage Page');

    if(!this.authData.getUserEmail()){     
      this.navCtrl.setRoot( Page1 );
    }
  }

  logoutUser() {
    console.log(this.authData.logoutUser());
  }
  
  loggedIn() {
    return this.authData.getUserEmail();
  }

}
