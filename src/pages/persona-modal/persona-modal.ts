import { Component } from '@angular/core';
import { NavController,ViewController,NavParams } from 'ionic-angular';

import { ImageService } from '../../providers/image-service';
import { PersonaService } from '../../providers/persona-service';
import { StatusService } from '../../providers/status-service';

/*
  Generated class for the PersonaModal page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-persona-modal',
  templateUrl: 'persona-modal.html'
})
export class PersonaModalPage {

  person: any;

  constructor(public navCtrl: NavController, public viewCtrl:ViewController, public navParams: NavParams, public personaService: PersonaService, public imageService: ImageService, public statusService: StatusService) {
    if(navParams.get('person')) {
      this.person = navParams.get('person');
    }
    else {
      this.person = {
        "name":"New Person",
        "jobTitle":"Job Title",
        "pullQuote": "Pull Quote",
        "demographics": "Demographics",
        "goals": "Goals",
        "concerns": "Concerns"
      };
    }
  }

  ionViewDidLoad() {
    console.log('Hello PersonaModalPage Page');
  }

  dismiss() {
    console.log('dismissing personamodal');
    console.log(this.person);
    this.viewCtrl.dismiss();
  }

  simpleAddPersona(){
    this.personaService.addPersona(this.statusService.getGroupID(),this.statusService.getProjID(),this.person.name,this.person);
    this.viewCtrl.dismiss();
  }

}
