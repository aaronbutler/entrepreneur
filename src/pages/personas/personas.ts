import { Component,Inject } from '@angular/core';
import { NavController } from 'ionic-angular';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

import { AuthData } from '../../providers/auth-data';
//import { ProjectService } from '../../providers/project-service';
import { ImageService } from '../../providers/image-service';
import { PersonaService } from '../../providers/persona-service';
import { StatusService } from '../../providers/status-service';

import { Page1 } from '../page1/page1';

import { FirebaseApp, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

import { Camera } from 'ionic-native';


//import * as firebase from 'firebase';

/*
  Generated class for the Personas page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-personas',
  templateUrl: 'personas.html'
})
export class PersonasPage {
  pic: string;
  persons: FirebaseListObservable<any[]>;
  currentProj: FirebaseObjectObservable<any>;
  currentPersons: Observable<any[]>;

  //this may be great:
  //http://stackoverflow.com/questions/39067832/accessing-firebase-storage-with-angularfire2-angular2-rc-5
  constructor(public navCtrl: NavController, public authData: AuthData, public imageService: ImageService, public statusService: StatusService,public personaService: PersonaService, @Inject(FirebaseApp) public firebaseApp: any) {
    console.log(this.firebaseApp);
    this.currentProj = this.statusService.getCurrentProject();
    this.currentProj.subscribe((proj) => {
      this.currentPersons = proj.personas;
      
    });
    /*this.statusService.getCurrentProject().subscribe((proj) => {
      console.log(proj.personas);
      this.currentPersons = proj.personas.map((persona) => {
        return persona;
      });
    })*/
    //this.firebaseApp = firebaseApp;
  }

  ionViewDidLoad() {
    console.log('Hello PersonasPage Page');
    if(!this.authData.getUserEmail()){     
      this.navCtrl.setRoot( Page1 );
    }
    else {
      this._populatePersonas();
    }
    
  }

  _populatePersonas(){
    //this.persons = this.personaService.getPersonas("pretend2","p");
    this.persons = this.personaService.getPersonas(this.statusService.getGroupID(),this.statusService.getProjID());
  }

  simpleAddPersona(){
    this.personaService.addPersona(this.statusService.getGroupID(),this.statusService.getProjID(),this._generateRandomName());
  }

  click() {
    console.log('clicked in personas');
    this.imageService.skipCam('pretend2','p', this._generateRandomName());
    /*let fname = this._generateRandomName();
    let folder = this._generateRandomName();
    let url = "";
    let storageRef = this.firebaseApp.storage().ref().child(`${folder}/${fname}.jpg`);
    let options = {
        destinationType: Camera.DestinationType.DATA_URL,
        targetWidth: 500,
        targetHeight: 500
    }
    Camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      storageRef.put(base64Image)
        .then((savedPicture) => {
          url = savedPicture.downloadURL;
          console.log(url);
          let p = {};
          this.projectService.getProject('pretend2','p').update(p);
        })
      }, (err) => {
      // Handle error
      });*/

   /* let uploadTask = storageRef.putString("Stringy", 'base64', {contentType: 'image/png'})
      .then((savedPicture) => {
        url = savedPicture.downloadURL;
        console.log(url);

        let p = {};
        p["personas"] = {"picUrl": url};

        this.projectService.getProject('pretend2','p').update(p);
      });*/
    
  }

  _generateRandomName(): string {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 8; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

  clickP(person){
    console.log(person);
  }

}
