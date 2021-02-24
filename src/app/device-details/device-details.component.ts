import { Component, Input, OnInit } from '@angular/core';
import {DeviceResult} from '../class/device-result';
import * as echarts from 'echarts';
import * as $ from "jquery";
import {Scene,DeviceAnalysResult,DeviceConflict,StatesChange,DeviceStateTime,DeviceCannotOff,DeviceStateName,
  ConflictTime,StateChangeFast,StateLastTime,StateNameRelativeRule,Rule} from "../class/scene";

@Component({
  selector: 'app-device-details',
  templateUrl: './device-details.component.html',
  styleUrls: ['./device-details.component.css']
})
export class DeviceDetailsComponent implements OnInit {
  // option:any;
  @Input() device!:DeviceResult;
  confliClick="block";
  potentialClick="block";
  freRuleShow="none";
  selectedConflict:any;
  causalConflictRules:string[]=[];
  causalFrequentRules:string[]=[];


  @Input() selectedDevice!:DeviceAnalysResult;
  


  constructor() { }

  ngOnInit(): void {
    // document.getElementById("fre_rule")!.style.display="none";
    console.log(document.getElementById("fre_rule"));
    // document.getElementById("conf_rule")!.style.display="none";


  }

  // showProblem(){
  //   if(this.confliClick==="block"){
  //     this.confliClick="none";
  //   }else{
  //     this.confliClick="block";
  //   }
  //   this.causalConflictRules=[];
  //   this.selectedConflict=null;
  //   document.getElementById("confli")!.style.display=this.confliClick;
  // }

  // showPotentialProblem(){
  //   if(this.potentialClick==="block"){
  //     this.potentialClick="none";
  //   }else{
  //     this.potentialClick="block";
  //   }
  //   this.causalFrequentRules=[];
  //   document.getElementById("fre_rule")!.style.display="none";
  //   document.getElementById("poten")!.style.display=this.potentialClick;
  // }

  // onSelect(device:DeviceResult,conflictTimeStates:any){
  //   this.causalConflictRules=[];
  //   if(this.selectedConflict===conflictTimeStates){
  //     this.selectedConflict=null;
  //   }else{
  //     this.selectedConflict=conflictTimeStates;
  //   }
  //   for(let i=0;i<this.selectedConflict.states.length;i++){
  //     var conState=this.selectedConflict.states[i];
  //     for(let j=0;j<device.deviceStates.length;j++){
  //       var deviceState=device.deviceStates[j];
  //       var state=deviceState.stateName;
  //       if(conState===state){
  //         for(let k=0;k<deviceState.relativeRules.length;k++){
  //           var rule=deviceState.relativeRules[k];
  //           var exist=false;
  //           for(let n=0;n<this.causalConflictRules.length;n++){
  //             if(rule===this.causalConflictRules[n]){
  //               exist=true;
  //               break;
  //             }
  //           }
  //           if(!exist){
  //             this.causalConflictRules.push(rule);
  //           }
  //         }
          
  //          break;
  //       }
  //     }
  //   }
  //   console.log(this.causalConflictRules)
    
  // }

  // relativeRules(device:DeviceResult,conflictTimeStates:any){
  //   for(let i=0;i<conflictTimeStates.states.length;i++){
  //     var conState=conflictTimeStates.states[i];
  //     for(let j=0;j<device.deviceStates.length;j++){
  //       var deviceState=device.deviceStates[j];
  //       var state=deviceState.stateName;
  //       if(conState===state){
  //         this.causalConflictRules.push(deviceState.relativeRules);
  //          break;
  //       }
  //     }
  //   }
    
  // }


  // showFrequentCausal(device:DeviceResult){
  //   if(this.freRuleShow==="block"){
  //     this.freRuleShow="none";
  //   }else{
  //     this.freRuleShow="block";
  //   }
  //   document.getElementById("fre_rule")!.style.display=this.freRuleShow;
  //   if(this.freRuleShow==="block")
  //   this.frequentCausal(device);
  // }

  // frequentCausal(device:DeviceResult){
    
  //   this.causalFrequentRules=[];
  //   for(let i=0;i<device.deviceStates.length;i++){
  //     var deviceState=device.deviceStates[i];
  //     for(let j=0;j<deviceState.relativeRules.length;j++){
  //       var rule=deviceState.relativeRules[j];
  //       var exist=false;
  //       for(let k=0;k<this.causalFrequentRules.length;k++){
  //         if(rule===this.causalFrequentRules[k]){
  //           exist=true;
  //           break;
  //         }
  //       }
  //       if(!exist){
  //         this.causalFrequentRules.push(rule);
  //       }
  //     }
  //   }
  // }

}
