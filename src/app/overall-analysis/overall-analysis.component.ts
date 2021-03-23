import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GenerateModelParameters } from '../class/generate-model-parameters';
import { ConflictStateAndRules, DeviceConflictCauseRule, DeviceFastChangeCause, DeviceNotOff, DeviceStateReachable, Rule, Scene, StateAndRuleAndCauseRule, StateReachable, StateRules, TimeStateRelativeRules } from '../class/scene';
import { ScenesTree } from '../class/scenes-tree';
import { MainData } from '../provider/main-data';
import { DeviceAnalysisService } from '../service/device-analysis.service';
import { SceneService } from '../service/scene.service';

@Component({
  selector: 'app-overall-analysis',
  templateUrl: './overall-analysis.component.html',
  styleUrls: ['./overall-analysis.component.css']
})
export class OverallAnalysisComponent implements OnInit {

  scenes: Array<Scene>=new Array<Scene>();
  simulationTime:string="";
  generateModelParameters:GenerateModelParameters;
  scenesTree:ScenesTree;
  ruleText:string;
  uploadedFileName:string;
  deviceNames:Array<string>=[]


  equivalentTime:string="24";
  intervalTime:string="300";
  rulesScenesOption:any;
  rulesNeverTriggered:Array<Rule>=[];
  selectedDevice!:string;
  devicesWithConflict:Array<string>=[];
  devicesWithFastChange:Array<string>=[];
  devicesNeverOn:Array<string>=[];
  devicesWithUnreachableState:Array<DeviceStateReachable>=[];
  devicesNeverOff:Array<string>=[];

  deviceNotOff:DeviceNotOff|null=null;
  deviceWithUnreachableState:DeviceStateReachable|null=null;
  deviceWithConflictStates:DeviceConflictCauseRule|null=null;
  deviceWithFastChangeStates:DeviceFastChangeCause|null=null;

  constructor(public mainData:MainData,public router:Router,public sceneService:SceneService,public deviceAnalysisService:DeviceAnalysisService) { 
    this.simulationTime=this.mainData.storage.simulationTime;
    this.scenes=this.mainData.storage.scenes;
    this.generateModelParameters=this.mainData.storage.generateModelParameters;
    this.scenesTree=this.mainData.storage.scenesTree;
    this.ruleText=this.mainData.storage.ruleText;
    this.uploadedFileName=this.mainData.storage.uploadedFileName
  }

  ngOnInit(): void {
    document.getElementById("ifd")!.style.display="none";
    document.getElementById("scene")!.style.display="flex";
    document.getElementById("scene_rule")!.style.display="none";
    document.getElementById("scene_device")!.style.display="none";
  }



  goBackToMain(){
    this.mainData.storage={
      generateModelParameters:this.generateModelParameters,
      scenes:this.scenes,
      simulationTime:this.simulationTime,
      scenesTree:this.scenesTree,
      ruleText:this.ruleText,
      uploadedFileName:this.uploadedFileName
    }
    this.router.navigate(["main"]);
  }

  showRules(){
    document.getElementById("ifd")!.style.display="none";
    document.getElementById("scene")!.style.display="flex";
    document.getElementById("scene_rule")!.style.display="block";

    this.getRulesScenesoption()
    this.rulesNeverTriggered=this.getRulesNeverTriggered(this.scenes,this.generateModelParameters.rules);
    
    
    // document.getElementById("device-time")!.style.display="none";
    
  }
  showDevices(){
    // document.getElementById("rule-time")!.style.display="none";
    // document.getElementById("device-time")!.style.display="none";
    document.getElementById("ifd")!.style.display="none";
    document.getElementById("scene")!.style.display="flex";
    document.getElementById("scene_device")!.style.display="block";

    if(this.equivalentTime!=""&&this.intervalTime!=""){
      this.sceneService.getAllDeviceAnalysisResult(this.scenes,this.generateModelParameters.rules,this.simulationTime,this.uploadedFileName,this.equivalentTime,this.intervalTime).subscribe(scenes=>{
        this.scenes=scenes;
        if(this.deviceNames.length===0){
          for(let i=0;i<this.scenes[0].devicesAnalysResults.length;i++){
            this.deviceNames.push(this.scenes[0].devicesAnalysResults[i].deviceName)
          }
        }

        // console.log("deviceNames here")
        // console.log(this.deviceNames)
        // console.log(this.scenes)
        // console.log("devicesWithConflict: ")
        var devicesWithConflict=this.getDeviceWithConflict(this.scenes);
        this.devicesWithConflict=devicesWithConflict;
        // console.log(devicesWithConflict)
        // for(let i=0;i<devicesWithConflict.length;i++){
        //   var deviceName=devicesWithConflict[i];
        //   this.getAllScenesDeviceConflictReason(deviceName,this.scenes,this.generateModelParameters.rules);
        // }
        var devicesWithFastChange=this.getDevicesWithFastChange(this.scenes);
        this.devicesWithFastChange=devicesWithFastChange;
        // console.log("devicesWithFastChange: ")
        // console.log(devicesWithFastChange)
        // for(let i=0;i<devicesWithFastChange.length;i++){
        //   var deviceName=devicesWithFastChange[i];
        //   this.getAllScenesFastChangeReason(deviceName,scenes);
        // }

        this.devicesWithUnreachableState=this.getDevicesWithUnreachableState(this.scenes);
        this.devicesNeverOn=this.getDevicesNeverOn(this.scenes);
        this.devicesNeverOff=this.getDevicesNeverOff(this.scenes);
        console.log("devicesWithConfict:")
        console.log(this.devicesWithConflict)
        console.log("devicesWithFastChange:")
        console.log(this.devicesWithFastChange)
        console.log("devicesNeverOn:")
        console.log(this.devicesNeverOn)
        console.log("devicesNeverOff:")
        console.log(this.devicesNeverOff)
        console.log("devicesWithUnreachableState:")
        console.log(this.devicesWithUnreachableState)
        
        
      })
    }


    
  }


  getRulesScenesoption() {

    this.sceneService.getRulesScenesData(this.scenes,this.generateModelParameters!.rules!).subscribe(option => {
      this.rulesScenesOption = option;
    })
  }


  /////////////////////////////////获得永远无法触发的规则///////////////////////////
  getRulesNeverTriggered(scenes:Array<Scene>,rules:Array<Rule>):Array<Rule>{
    var rulesNeverTriggered:Array<Rule>=[];
    for(let i=0;i<rules.length;i++){
      var canTriggered=false;
      second:
      for(let j=0;j<scenes.length;j++){
        for(let k=0;k<scenes[j].triggeredRulesName.length;k++){
          if(rules[i].ruleName===scenes[j].triggeredRulesName[k].name){
            canTriggered=true;
            break second;
          }
        }
      }
      if(!canTriggered){
        rulesNeverTriggered.push(rules[i])
      }
    }
    return rulesNeverTriggered;
  }

  ///////////////////////////获得设备无法关闭的/////////////////////////
  getDevicesNeverOff(scenes:Array<Scene>):Array<string>{
    var devicesNeverOff:Array<string>=[];
    for(let i=0;i<scenes[0].devicesAnalysResults.length;i++){
      var canOff=false;
      second:
      for(let j=0;j<scenes.length;j++){
        third:
        for(let k=0;k<scenes[j].devicesAnalysResults.length;k++){
          if(scenes[0].devicesAnalysResults[i].deviceName===scenes[j].devicesAnalysResults[k].deviceName){
            if(!scenes[j].devicesAnalysResults[k].deviceCannotOff.cannotOff){
              canOff=true;
              break second;
            }
            break third;
          }
        }
      }
      if(!canOff){
        devicesNeverOff.push(scenes[0].devicesAnalysResults[i].deviceName)
      }
    }
    return devicesNeverOff;
  }

  ////////////////////////获得设备永远不会开的////////////////////////////
  getDevicesNeverOn(scenes:Array<Scene>):Array<string>{
    var devicesNeverOn:Array<string>=[];
    for(let i=0;i<scenes[0].devicesAnalysResults.length;i++){
      var canOn=false;
      second:
      for(let j=0;j<scenes.length;j++){
        third:
        for(let k=0;k<scenes[j].nameDataFunctions.length;k++){
          if(scenes[0].devicesAnalysResults[i].deviceName===scenes[j].nameDataFunctions[k].name){
            if(scenes[j].nameDataFunctions[k].dataFunctions.length>1){
              canOn=true;
              break second;
            }
            break third;
          }
        }
      }
      if(!canOn){
        devicesNeverOn.push(scenes[0].devicesAnalysResults[i].deviceName);
      }
    }
    return devicesNeverOn;
  }

  //////////////////////////获得永远有不可达状态的设备/////////////////////////
  getDevicesWithUnreachableState(scenes:Array<Scene>):Array<DeviceStateReachable>{
    var devicesWithUnReachableState:Array<DeviceStateReachable>=[];
    for(let i=0;i<scenes[0].devicesAnalysResults.length;i++){
      var deviceResult=this.scenes[0].devicesAnalysResults[i];
      var withUnreachableState=false;
      var deviceStateReachable:DeviceStateReachable={
        deviceName:deviceResult.deviceName,
        stateReachable:[]
      }
      for(let j=0;j<deviceResult.deviceStateName.stateNames.length;j++){
        var stateName=deviceResult.deviceStateName.stateNames[j].stateName;
        /////////////////看这个状态是否可达///////////////////////
        var stateHappen=false;
        third:
        for(let k=0;k<scenes.length;k++){
          forth:
          for(let n=0;n<scenes[k].devicesAnalysResults.length;n++){
            if(scenes[k].devicesAnalysResults[n].deviceName===deviceResult.deviceName){
              for(let m=0;m<scenes[k].devicesAnalysResults[n].deviceStateLastTime.statesTime.length;m++){
                if(stateName===scenes[k].devicesAnalysResults[n].deviceStateLastTime.statesTime[m].stateName){
                  /////////////////////状态可发生/////////////////
                  stateHappen=true;
                  break third;
                }
              }
              break forth;
            }
          }
        }
        if(!stateHappen){
          withUnreachableState=true;
          var stateReachable:StateReachable={
            stateName:stateName,
            stateValue:deviceResult.deviceStateName.stateNames[j].stateValue,
            reachable:false,
            rules:[]
          }
          deviceStateReachable.stateReachable.push(stateReachable);
        }else{
          var stateReachable:StateReachable={
            stateName:stateName,
            stateValue:deviceResult.deviceStateName.stateNames[j].stateValue,
            reachable:true,
            rules:[]
          }
          deviceStateReachable.stateReachable.push(stateReachable);
        }
      }
      if(withUnreachableState){
        devicesWithUnReachableState.push(deviceStateReachable);
      }

    }
    return devicesWithUnReachableState;
  }

/////////////////////////有冲突的设备///////////////////
  getDeviceWithConflict(scenes:Array<Scene>):Array<string>{
    var devicesWithConflict:Array<string>=[];
    for(let i=0;i<scenes[0].devicesAnalysResults.length;i++){
      var deviceName=scenes[0].devicesAnalysResults[i].deviceName;
      var existConflict=false;
      second:
      for(let j=0;j<scenes.length;j++){
        third:
        for(let k=0;k<scenes[j].devicesAnalysResults.length;k++){
          if(scenes[j].devicesAnalysResults[k].deviceName===deviceName){
            if(scenes[j].devicesAnalysResults[k].statesConflict.hasConflict){
              existConflict=true;
              break second;
            }
            break third;
          }
        }
      }
      if(existConflict){
        devicesWithConflict.push(deviceName);
      }
    }
    return devicesWithConflict;
  }


  /////////////////////////状态变化频繁的设备///////////////////////////
  getDevicesWithFastChange(scenes:Array<Scene>):Array<string>{
    var devicesWithFastChange:Array<string>=[];
    for(let i=0;i<scenes[0].devicesAnalysResults.length;i++){
      var deviceName=scenes[0].devicesAnalysResults[i].deviceName;
      var hasFastChange=false;
      second:
      for(let j=0;j<scenes.length;j++){
        third:
        for(let k=0;k<scenes[j].devicesAnalysResults.length;k++){
          if(scenes[j].devicesAnalysResults[k].deviceName===deviceName){
            if(scenes[j].devicesAnalysResults[k].statesChange.stateChangeFasts.length>0){
              /////////////////////设定多少次才算有效的变化频繁/此处为1/////////////////
              hasFastChange=true;
              break second;
            }
            break third;
          }
        }
      }
      if(hasFastChange){
        devicesWithFastChange.push(deviceName)
      }
    }
    return devicesWithFastChange;
  }

  getAllScenesDeviceConflictReason(deviceName:string,scenes:Array<Scene>,rules:Array<Rule>){
    this.sceneService.analysisAllScenesStatesConflict(scenes,deviceName,rules,this.uploadedFileName).subscribe(deviceStateCauseRuleList=>{
      var newStateCauseRuleList=[];
      for(let i=0;i<deviceStateCauseRuleList.length;i++){
        newStateCauseRuleList.push(this.deviceAnalysisService.removeContraRules(deviceStateCauseRuleList[i]));
      }
      // console.log("conflict")
      console.log("deviceName: "+deviceName)
      // console.log("stateCauseRuleList")
      // console.log(deviceStateCauseRuleList);
      // console.log("newStateCauseRuleList")
      // console.log(newStateCauseRuleList)
      var deviceConflictStatisticCauseRules=this.deviceAnalysisService.conflictStatistics(newStateCauseRuleList)
      console.log("conflictStatistic:")
      this.deviceWithConflictStates={
        deviceName:deviceName,
        conflictStatisticCauseRuleList:deviceConflictStatisticCauseRules
      }
      console.log(this.deviceWithConflictStates)
    })
  }

  getDeviceConflictReason(deviceName:string,scenes:Array<Scene>){
    var rules=this.generateModelParameters.rules;
    for(let i=0;i<scenes.length;i++){
      second:
      for(let j=0;j<scenes[i].devicesAnalysResults.length;j++){
        if(scenes[i].devicesAnalysResults[j].deviceName===deviceName){
          ///////////////////看着设备的冲突是什么造成的////////
          
          if(scenes[i].devicesAnalysResults[j].statesConflict.hasConflict){
            
            var conflictTimes=scenes[i].devicesAnalysResults[j].statesConflict.conflictTimes;
            var deviceStateName=scenes[i].devicesAnalysResults[j].deviceStateName;
            this.sceneService.analysisAllStatesConflict(conflictTimes,scenes[i].triggeredRulesName,deviceStateName,rules,this.uploadedFileName)
            .subscribe(stateCauseRuleListList=>{
              console.log("scene name: "+scenes[i].sceneName)
              console.log("deviceName: "+deviceName)
              ///////////////////////单个scene下所有冲突及其原因
              var newStateCauseRuleList=[];
              for(let i=0;i<stateCauseRuleListList.length;i++){
                newStateCauseRuleList.push(this.deviceAnalysisService.removeContraRules(stateCauseRuleListList[i]));
              }

              console.log("stateCauseRuleList")
              console.log(stateCauseRuleListList);
              console.log("newStateCauseRuleList")
              console.log(newStateCauseRuleList)
              this.deviceAnalysisService.conflictStatistics(newStateCauseRuleList)
            })
          }
          break second;
        }
      }
    }
  }

  getAllScenesFastChangeReason(deviceName:string,scenes:Array<Scene>){
    this.sceneService.analysisAllScenesFastChange(scenes,deviceName).subscribe(allStateChangeCauseRulesList=>{
      console.log("fast change")
      console.log(deviceName)
      // console.log("allStateChangeCauseRulesList");
      // console.log(allStateChangeCauseRulesList);
      var timeStateRelativeRulesListList: Array<Array<TimeStateRelativeRules>>=[]
      for(let i=0;i<allStateChangeCauseRulesList.length;i++){
        var frequentChangeTimeStateRuleList=this.deviceAnalysisService.fastChangeCauseRules(allStateChangeCauseRulesList[i]);
        // console.log("frequentChangeTimeStateRuleList")
        // console.log(frequentChangeTimeStateRuleList)
        for(let j=0;j<frequentChangeTimeStateRuleList.length;j++){
          timeStateRelativeRulesListList.push(frequentChangeTimeStateRuleList[j]);
        }
      }
      // console.log("timeStateRelativeRulesListList")
      // console.log(timeStateRelativeRulesListList)
      
      var stateRuleListList=this.deviceAnalysisService.frequentChangeAnalysisAll(timeStateRelativeRulesListList);
      
      console.log("fastChangeStatistic")
      
      this.deviceWithFastChangeStates={
        deviceName:deviceName,
        fastChangeCauseRuleList:stateRuleListList
      }
      console.log(this.deviceWithFastChangeStates)
    })
  }


  
  getRuleContent(ruleContent:string):string{
    return ruleContent.substring(ruleContent.indexOf("IF"));
  }

  deviceBelong(device:string,devices:Array<string>):boolean{
    var exist=false;
    for(let i=0;i<devices.length;i++){
      if(devices[i]===device){
        exist=true;
        break;
      }
    }
    return exist;
  }

  deviceBelongDevicesWithUnreachableState(device:String,devicesWithUnReachableState:Array<DeviceStateReachable>):boolean{
    var exist=false;
    for(let i=0;i<devicesWithUnReachableState.length;i++){
      if(device===devicesWithUnReachableState[i].deviceName){
        exist=true;
        break;
      }
    }
    return exist;
  }

  onSelect(deviceName:string){
    if(this.selectedDevice!=deviceName){
      this.selectedDevice=deviceName;
      this.deviceWithUnreachableState=null;
      this.deviceNotOff=null;
      this.deviceWithConflictStates=null;
      this.deviceWithFastChangeStates=null;
      if(this.deviceBelong(this.selectedDevice,this.devicesWithConflict)){
        ///////////////该设备存在冲突
        this.getAllScenesDeviceConflictReason(this.selectedDevice,this.scenes,this.generateModelParameters.rules);
      }
      if(this.deviceBelong(this.selectedDevice,this.devicesWithFastChange)){
        ////////////////////该设备状态变化频繁
        this.getAllScenesFastChangeReason(this.selectedDevice,this.scenes);
      }
      // if(this.deviceBelong(this.selectedDevice,this.devicesNeverOn)){
      //   ////////////////设备永远不会开,感觉这个没必要
      //   for(let i=0;i<this.generateModelParameters.actions.length;i++){
  
      //   }
  
      // }
      if(this.deviceBelong(this.selectedDevice,this.devicesNeverOff)){
        ///////////////设备无法关闭/////////
        /////////////////看是否有相应规则，如果没有的话则说明没有相应规则，如果有的话，则说明无法触发该规则
        var existRules=false;
        for(let i=0;i<this.generateModelParameters.actions.length;i++){
          if(this.generateModelParameters.actions[i].device===this.selectedDevice){
            if(this.generateModelParameters.actions[i].value==="0"){
              if(this.generateModelParameters.actions[i].rules.length>0){
                ///////////////////////有相应规则
                existRules=true;
                var deviceNotOff:DeviceNotOff={
                  deviceName:this.selectedDevice,
                  rules:this.generateModelParameters.actions[i].rules
                }
                this.deviceNotOff=deviceNotOff;
                break;
              }
            }
          }
        }
        if(!existRules){
          var deviceNotOff:DeviceNotOff={
            deviceName:this.selectedDevice,
            rules:[]
          }
          this.deviceNotOff=deviceNotOff;
          console.log("deviceNotOff")
          console.log(this.deviceNotOff)
  
        }
      }
      if(this.deviceBelongDevicesWithUnreachableState(this.selectedDevice,this.devicesWithUnreachableState)){
        ////////////////设备永远有不可达状态////////////////
        /////////////////看是否有相应规则，如果没有的话则说明没有相应规则，如果有的话，则说明无法触发该规则
        /////////////////可以直接看neverTriggeredRules中是否有相应规则//////////////////
        var deviceWithUnreachableState:DeviceStateReachable;
        for(let i=0;i<this.devicesWithUnreachableState.length;i++){
          if(this.selectedDevice===this.devicesWithUnreachableState[i].deviceName){
            deviceWithUnreachableState=this.devicesWithUnreachableState[i];
          }        
          break;
        }
        for(let i=0;i<deviceWithUnreachableState!.stateReachable.length;i++){
          if(!deviceWithUnreachableState!.stateReachable[i].reachable){
            var stateName=deviceWithUnreachableState!.stateReachable[i].stateName;
            second:
            for(let j=0;j<this.generateModelParameters.actions.length;j++){
              if(this.generateModelParameters.actions[j].toState===stateName){
                if(this.generateModelParameters.actions[j].rules.length>0){
                  deviceWithUnreachableState!.stateReachable[i].rules=this.generateModelParameters.actions[j].rules;
                  break second;
                }
                break second;
              }
            }
            
          }
        }
        this.deviceWithUnreachableState=deviceWithUnreachableState!;
        console.log("deviceWithUnreachableState")
        console.log(this.deviceWithUnreachableState)
      }
    }



  }

}
