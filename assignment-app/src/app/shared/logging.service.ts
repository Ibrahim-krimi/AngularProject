import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  constructor() { }
  log(assignemntName:any,action:any){
    console.log("Assignement"+assignemntName + " "+ action);

  }
}
