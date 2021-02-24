import { Injectable } from '@angular/core';
import { DataTimeValue } from '../class/scene';
import {Scene} from '../class/scene';
import {Observable,of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataTimeValueService {

  constructor() { }

  getTriggeredRuleTimeValueData(scene:Scene){

    return new Observable((observer) => {
      setTimeout(() => {
          var rulesTimeValue :DataTimeValue[]= [];
          
          for(let i=scene.datasTimeValue.length-1;i>=0;i--){
            var dataTimeValue=scene.datasTimeValue[i];
            if(dataTimeValue.name.indexOf("rule")>=0){
              rulesTimeValue.push(dataTimeValue);
            }
          }
          observer.next(rulesTimeValue);
      }, 500)
  })
  }
}
