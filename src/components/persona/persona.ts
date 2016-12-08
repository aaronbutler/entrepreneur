import { Component,Input, OnInit,EventEmitter,Output } from '@angular/core';

/*
  Generated class for the Persona component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'persona',
  templateUrl: 'persona.html'
})
export class PersonaComponent {

  @Input()
  person: any;

  @Input()
  editable: boolean;

  @Output() changedPersona = new EventEmitter<any>();

  @Output() clickedPerson = new EventEmitter<any>();

  constructor() {
    console.log('Hello Persona Component');
  }

  changedIt(){
    this.changedPersona.emit(this.person);
  }

  clickedPersonKey(){
    this.clickedPerson.emit(this.person);
  }


}
