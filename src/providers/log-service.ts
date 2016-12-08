import { Injectable } from '@angular/core';


/*
  Generated class for the LogService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class LogService {
  level: number;
  constructor() {
    
    this.level = 5;
  }

  setLevel(level: number) {
    this.level = level;
  }

  log(level: number,callerClass: string,callerMethod: string, ...args) {
    if(level >= this.level){
      console.log(`Level ${level} -- ${callerClass}.${callerMethod}`);
      for(let arg of args) {
        console.log(arg);
      }
      console.log('end log');
    }
  }

}
