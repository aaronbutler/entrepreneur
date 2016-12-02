import { Injectable,  Inject } from '@angular/core';

import { FirebaseApp } from 'angularfire2';

import { Camera } from 'ionic-native';

import { PersonaService } from './persona-service';

/*
  Generated class for the ImageService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ImageService {
  /*const defaultOptions = {
        destinationType: Camera.DestinationType.DATA_URL,
        targetWidth: 500,
        targetHeight: 500
  };*/

  constructor(public personaService: PersonaService, @Inject(FirebaseApp) public firebaseApp: any) {
    console.log('Hello ImageService Provider');
  }

  skipCam(group: string, project: string, person: string){
    //let imageData=this._generateRandomString(10);
    //let imageData = "iVBORw0KGgoAAAANSUhEUgAABXQAAAGTCAIAAAAHmQ28AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAAASdEVYdFNvZnR3YXJlAEdyZWVuc2hvdF5VCAUAAFK6SURBVHhe7d3vjx3XfRj8"
    //let imageData = "R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKUE1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7";
    //let imageData = `/9j/4AAQSkZJRgABAQEASABIAAD/4gxYSUNDX1BST0ZJTEUAAQEAAAxITGlubwIQAABtbnRyUkdCIFhZWiAHzgACAAkABgAxAABhY3NwTVNGVAAAAABJRUMgc1JHQgAAAAAAAAAAAQAAAAAA9tYAAQAAAADTLUhQICAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABFjcHJ0AAABUAAAADNkZXNjAAABhAAAAGx3dHB0AAAB8AAAABRia3B0AAACBAAAABRyWFlaAAACGAAAABRnWFlaAAACLAAAABRiWFlaAAACQAAAABRkbW5kAAACVAAAAHBkbWRkAAACxAAAAIh2dWVkAAADTAAAAIZ2aWV3AAAD1AAAACRsdW1pAAAD+AAAABRtZWFzAAAEDAAAACR0ZWNoAAAEMAAAAAxyVFJDAAAEPAAACAxnVFJDAAAEPAAACAxiVFJD...pgIGgA5oEKmA7PFAAzTELNDGHPFAAJ4pDAT0oAGaQwUgBnPegYM0gEelIYAMmgDqWg5aNU6bft9xbbfELaw24E/wA5LSwQAkDkkKHU5688V06DVSGWfA4WLToTU6fHXpdfkemcl6JetOznC05DKDEekI37VJxgHb2UMgdcZpXunSlw2uN6Za8Nb72K2qaxapLkW6xnQF4SplHCUBOU4Ge3HSsreXSRsiu8SlTftlri2SRKW49aJ0ZTchtwsBs+pHGDjnPHI+meKmpPNdGWpkStNbGRzwymauuL78aMp15aENuDKUKaWE8qVgjg+5HP1q1U++eu5R/L/jLLfRa89CmXrR8jStzEWY7HecCQSqKvegZ+eOawVI5Hlvc60K0aqvFNeZpbuwGZRUgAJWM4HY96hB+GzLoyvdEEc9qsJh6UAA0ANoEInFACHNAxZoELNACoAIpgHPSgBZpiFnmgBZoAGaBhzxQA3vSGI0AA0gBQMOM0hjTmgBDPakB//9k=`
    
    
    
    
    //let imageData = `R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKUE1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7`;

    //let base64Image = this._makeBase64(imageData);

    let folder = this._generateRandomString(5);
    let fname = this._generateRandomString(5);
    let asString = true;

    let defaultOptions = {
        destinationType: Camera.DestinationType.DATA_URL,
        targetWidth: 500,
        targetHeight: 500
    };


    this._takeCamPic(defaultOptions).then((imageData) => {
      return this._storeImage(imageData, `${group}_${project}`, person, asString)
    }).then((savedPicture) => {
    //this._storeImage(base64Image, `${group}_${project}`, person, asString).then((savedPicture) => {
      let url = savedPicture.downloadURL;
      console.log(url);
      this._storeLink(url,group,project, person);
    },(err) => {
      console.log(err);
    });
    
    

  }

  _takeCamPic(options: any): Promise<any> {
    return Camera.getPicture(options);
  }

/**Probably don't need to prepend the data:image/... stuff, actually causes it to break when sending to firebase storage */
  _makeBase64(imageData: string): string {
    //return 'data:image/gif;base64,' + imageData;
    return imageData;
  }

  _storeImage(base64Image: string, folder: string, fname: string, asString: boolean): Promise<any>{
    let storageRef = this.firebaseApp.storage().ref().child(`${folder}/${fname}.gif`);
    if(asString) {
      return storageRef.putString(base64Image,'base64');
    }
    else {
      return storageRef.put(base64Image);
    }
    
    
  }

  _storeLink(url, group, project,name){
    //let p = {};
    //p["personas"] = {"picUrl": url};
    //this.projectService.getProject(group,project).update(p);
    let p = {};
    p["picUrl"] = url;
    this.personaService.addPersona(group, project, name).update(p);
    //this.personaService.savePic(url,group,project,name)
  }

  _generateRandomString(length: number): string {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( let i=0; i < length; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

}
