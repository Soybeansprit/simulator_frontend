import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GenerateModelParameters } from '../class/generate-model-parameters';
import { AllRuleAnalysisResult, AllScenesAnalysisInput, ConflictStateAndRules, CountStatesCauseRule, DeviceAllSceneConflictRule, DeviceAllSceneFastChangeRule, DeviceConflictCauseRule, DeviceFastChangeCause, DeviceNotOff, DeviceSceneConflictCauseRule, DeviceSceneFastChangeCauseRule, DeviceScenesFastChangeCauseRule, DeviceStateReachable, DeviceStatesCauseRules, Rule, RuleAndCause, RuleCount, Scene, StateAndRuleAndCauseRule, StateCauseRule, StateCauseRuleCount, StateCauseRuleCountSceneName, StateCauseRules, StateReachable, StateRules, TimeStateRelativeRules } from '../class/scene';
import { ScenesTree } from '../class/scenes-tree';
import { MainData } from '../provider/main-data';
import { DeviceAnalysisService } from '../service/device-analysis.service';
import { RuleAnalysisService } from '../service/rule-analysis.service';
import { SceneService } from '../service/scene.service';

@Component({
  selector: 'app-rule-analysis',
  templateUrl: './rule-analysis.component.html',
  styleUrls: ['./rule-analysis.component.css']
})
export class RuleAnalysisComponent implements OnInit {

  scenes: Array<Scene>=new Array<Scene>();
  simulationTime:string="";
  generateModelParameters:GenerateModelParameters;
  scenesTree:ScenesTree;
  ruleText:string;
  uploadedFileName:string;
  
  deviceNames:Array<string>=[]
  allRuleAnalysisResult!:AllRuleAnalysisResult;
  equivalentTime:string="24";
  intervalTime:string="300";

  rulesNeverTriggered:Array<RuleAndCause>|null=null;
  devicesAllSceneConflictRule:Array<DeviceAllSceneConflictRule>|null=null
  devicesAllSceneFastChangeRule:Array<DeviceAllSceneFastChangeRule>=[]
  devicesSceneConflictCauseRule:Array<DeviceSceneConflictCauseRule>=[];
  devicesSceneFastChangeCauseRule:Array<DeviceSceneFastChangeCauseRule>=[];
  devicesScenesFastChangeCauseRule:Array<DeviceScenesFastChangeCauseRule>|null=null;
  devicesNotOff:Array<DeviceNotOff>=[]
  devicesWithUnreachableState:Array<DeviceStateReachable>=[]
  devicesConflictStatesCauseRules:Array<DeviceStatesCauseRules>=[]
  devicesFastChangeStatesCauseRules:Array<DeviceStatesCauseRules>=[]
  allRuleCanBeTriggered="none";
  
  constructor(public mainData:MainData,public router:Router,public sceneService:SceneService,public deviceAnalysisService:DeviceAnalysisService,public ruleAnalysisService:RuleAnalysisService) { 
    this.simulationTime=this.mainData.storage.simulationTime;
    this.scenes=this.mainData.storage.scenes;
    this.generateModelParameters=this.mainData.storage.generateModelParameters;
    this.scenesTree=this.mainData.storage.scenesTree;
    this.ruleText=this.mainData.storage.ruleText;
    this.uploadedFileName=this.mainData.storage.uploadedFileName
  }

  ngOnInit(): void {
  }



    getAllRuleAnalysis(scenes:Array<Scene>,rules:Array<Rule>
      ,initFileName:string,simulationTime:string,equivalentTime:string,intervalTime:string){
        this.ruleAnalysisService.getAllScenesRulesAnalysisResult(scenes,rules,initFileName,simulationTime,equivalentTime,intervalTime).subscribe(allRuleAnalysisResult=>{
          this.allRuleAnalysisResult=allRuleAnalysisResult;
          console.log(this.allRuleAnalysisResult)
          this.scenes=allRuleAnalysisResult.scenes;
          console.log("deviceAnalysis")
          console.log(this.scenes)
          this.rulesNeverTriggered=allRuleAnalysisResult.rulesNeverTriggered;
          this.devicesAllSceneConflictRule=allRuleAnalysisResult.devicesAllSceneConflictRule;
          this.devicesAllSceneFastChangeRule=allRuleAnalysisResult.devicesAllSceneFastChangeRule;
          this.devicesSceneConflictCauseRule=allRuleAnalysisResult.devicesSceneConflictCauseRule;
          this.devicesSceneFastChangeCauseRule=allRuleAnalysisResult.devicesSceneFastChangeCauseRule;

          this.getDeviceScenesFastChangeCauseRules(this.devicesSceneFastChangeCauseRule)
          var devicesNotOff=this.getDevicesNotOff(this.scenes);
          var devicesWithUnReachableState=this.getDevicesWithUnreachableState(this.scenes);
          this.getDeviceNotOffReason(devicesNotOff)
          this.getDevicesWithUnreachableStateReason(devicesWithUnReachableState)

          this.getDeviceConflictStatesRules(this.devicesAllSceneConflictRule)
          this.getDeviceFastChangeStatesRules(this.devicesAllSceneFastChangeRule)
          console.log("this.devicesAllSceneConflictRule")
          console.log(this.devicesAllSceneConflictRule)
        })
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

      showRulesAnalysisResult(){
        this.allRuleCanBeTriggered="block"
        this.getAllRuleAnalysis(this.scenes,this.generateModelParameters.rules,this.uploadedFileName,this.simulationTime,this.equivalentTime,this.intervalTime)
      }


      getDeviceConflictStatesRules(devicesAllSceneConflictRule:Array<DeviceAllSceneConflictRule>):Array<DeviceStatesCauseRules>{
        var devicesStatesCauseRules:Array<DeviceStatesCauseRules>=[]
        for(let i=0;i<devicesAllSceneConflictRule.length;i++){
          var deivceStatesCauseRules:DeviceStatesCauseRules={
            deviceName:devicesAllSceneConflictRule[i].deviceName,
            statesRules:[]
          }
          for(let j=0;j<devicesAllSceneConflictRule[i].allCountStateCauseRuleSceneName.length;j++){
            for(let k=0;k<devicesAllSceneConflictRule[i].allCountStateCauseRuleSceneName[j].countStatesCauseRule.statesCauseRule.length;k++){
              var stateCauseRule:StateCauseRule=devicesAllSceneConflictRule[i].allCountStateCauseRuleSceneName[j].countStatesCauseRule.statesCauseRule[k];
              var existState=false
              forth:
              for(let n=0;n<deivceStatesCauseRules.statesRules.length;n++){                
                if(stateCauseRule.stateName===deivceStatesCauseRules.statesRules[n].stateName){
                  fifth:
                  for(let l=0;l<stateCauseRule.causeRules.length;l++){
                    var existRule=false
                    sixth:
                    for(let m=0;m<deivceStatesCauseRules.statesRules[n].causeRules.length;m++){
                      if(stateCauseRule.causeRules[l].selfRule.ruleName===deivceStatesCauseRules.statesRules[n].causeRules[m].selfRule.ruleName){
                        existRule=true;
                        break sixth
                      }
                    }
                    if(!existRule){
                      deivceStatesCauseRules.statesRules[n].causeRules.push(stateCauseRule.causeRules[l]);
                    }
                  }
                  
                  existState=true;
                  break forth;
                }
              }
              if(!existState){
                deivceStatesCauseRules.statesRules.push({
                  stateName:stateCauseRule.stateName,
                  causeRules:stateCauseRule.causeRules
                })
              }
            }
          }
          devicesStatesCauseRules.push(deivceStatesCauseRules)
        }
        console.log("devicesStatesCauseRules")
        console.log(devicesStatesCauseRules)
        this.devicesConflictStatesCauseRules=devicesStatesCauseRules
        return devicesStatesCauseRules
      }

      getDeviceFastChangeStatesRules(devicesAllSceneFastChangeRule:Array<DeviceAllSceneFastChangeRule>):Array<DeviceStatesCauseRules>{
        var devicesStatesCauseRules:Array<DeviceStatesCauseRules>=[]
        for(let i=0;i<devicesAllSceneFastChangeRule.length;i++){
          var deivceStatesCauseRules:DeviceStatesCauseRules={
            deviceName:devicesAllSceneFastChangeRule[i].deviceName,
            statesRules:[]
          }
          for(let j=0;j<devicesAllSceneFastChangeRule[i].allFastChangeStateCauseRuleCountSceneName.length;j++){
            var stateCauseRule:StateCauseRuleCountSceneName=devicesAllSceneFastChangeRule[i].allFastChangeStateCauseRuleCountSceneName[j];
            var stateRule:StateCauseRules={
                stateName:stateCauseRule.stateName,
                causeRules:[]
            }
            for(let n=0;n<stateCauseRule.rulesCountSceneName.length;n++){
              stateRule.causeRules.push(stateCauseRule.rulesCountSceneName[n].ruleCount.causeRule)
            }
            deivceStatesCauseRules.statesRules.push(stateRule)
            
          }
          devicesStatesCauseRules.push(deivceStatesCauseRules)
        }
        console.log("devicesStatesCauseRules")
        console.log(devicesStatesCauseRules)
        this.devicesFastChangeStatesCauseRules=devicesStatesCauseRules
        return devicesStatesCauseRules
      }

    getDeviceScenesFastChangeCauseRules(devicesSceneFastChangeCauseRule:Array<DeviceSceneFastChangeCauseRule>){
      var devicesScenesFastChangeCauseRule:Array<DeviceScenesFastChangeCauseRule>=[];
      for(let i=0;i<devicesSceneFastChangeCauseRule.length;i++){
        var deviceName=devicesSceneFastChangeCauseRule[i].deviceName;
        var deviceScenesFastChangeCauseRule:DeviceScenesFastChangeCauseRule={
          deviceName:deviceName,
          scenesFastChangeCauseRules:[]
        }
        for(let j=0;j<devicesSceneFastChangeCauseRule[i].scenesFastChangeCauseRule.length;j++){
          var sceneName=devicesSceneFastChangeCauseRule[i].scenesFastChangeCauseRule[j].sceneName;
          var statesCauseRules=devicesSceneFastChangeCauseRule[i].scenesFastChangeCauseRule[j].fastChangeStateCauseRuleCountList;
          if(statesCauseRules.length==0){
            continue;
          }
          var exist=false;
          third:
          for(let k=0;k<deviceScenesFastChangeCauseRule.scenesFastChangeCauseRules.length;k++){
            ////////////////如果rule导致fastChange次数<=1那不考虑吧////////////////TODO
            if(this.statesCauseRuleEqual(statesCauseRules,deviceScenesFastChangeCauseRule.scenesFastChangeCauseRules[k].fastChangeStateCauseRuleCountList)){
              exist=true;
              deviceScenesFastChangeCauseRule.scenesFastChangeCauseRules[k].sceneNames.push(sceneName);
              break third;
            }
          }
          if(!exist){
            
            deviceScenesFastChangeCauseRule.scenesFastChangeCauseRules.push({
              sceneNames:[sceneName],
              fastChangeStateCauseRuleCountList:statesCauseRules
            })
          }
        }
        
        devicesScenesFastChangeCauseRule.push(deviceScenesFastChangeCauseRule);

      }
      console.log("devicesScenesFastChangeCauseRule")
      console.log(devicesScenesFastChangeCauseRule);
      this.devicesScenesFastChangeCauseRule=devicesScenesFastChangeCauseRule
    }


    statesCauseRuleEqual(statesFastChangeRule1:Array<StateCauseRuleCount>,statesFastChangeRule2:Array<StateCauseRuleCount>):boolean{
      if(statesFastChangeRule1.length!=statesFastChangeRule2.length){
        return false;
      }
      for(let i=0;i<statesFastChangeRule1.length;i++){
        var exist=false;
        second:
        for(let j=0;j<statesFastChangeRule2.length;j++){
          if(statesFastChangeRule1[i].stateName===statesFastChangeRule2[j].stateName){
            if(this.ruleCountEqual(statesFastChangeRule1[i].rulesCount,statesFastChangeRule2[j].rulesCount)){
              exist=true;
            }
            break second;
          }
        }
        if(!exist){
          return false;
        }
      }
      return true;
    }

    ruleCountEqual(rules1:Array<RuleCount>,rules2:Array<RuleCount>):boolean{
      if(rules1.length!=rules2.length){
        return false;
      }
      for(let i=0;i<rules1.length;i++){
        var exist=false;
        for(let j=0;j<rules2.length;j++){
          if(rules1[i].causeRule.selfRule.ruleName===rules2[j].causeRule.selfRule.ruleName){
            exist=true;
            break;
          }
        }
        if(!exist){
          return false;
        }
      }
      return true;
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
  getDevicesNotOff(scenes:Array<Scene>):Array<string>{
    var devicesNeverOff:Array<string>=[];
    for(let i=0;i<scenes[0].devicesAnalysResults.length;i++){
      var canOff=false;
      var canChangeState=false;
      second:
      for(let j=0;j<scenes.length;j++){
        for(let n=0;n<scenes[j].nameDataFunctions.length;n++){
          if(scenes[j].nameDataFunctions[n].name===scenes[0].devicesAnalysResults[i].deviceName){
            if(scenes[j].nameDataFunctions[n].dataFunctions.length>1){
              canChangeState=true;
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
          }
        }

      }
      
      if(!canOff && canChangeState){
        devicesNeverOff.push(scenes[0].devicesAnalysResults[i].deviceName)
      }
    }
    return devicesNeverOff;
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

    getDeviceNotOffReason(devicesNeverOff:Array<string>){
      var devicesNotOffReason:Array<DeviceNotOff>=[]
      for(let j=0;j<devicesNeverOff.length;j++){
        var existRules=false;
        for(let i=0;i<this.generateModelParameters.actions.length;i++){
          if(this.generateModelParameters.actions[i].device===devicesNeverOff[j]){
            if(this.generateModelParameters.actions[i].value==="0"){
              if(this.generateModelParameters.actions[i].rules.length>0){
                ///////////////////////有相应规则
                existRules=true;
                var deviceNotOff:DeviceNotOff={
                  deviceName:devicesNeverOff[j],
                  rules:this.generateModelParameters.actions[i].rules
                }
                devicesNotOffReason.push(deviceNotOff)
                break;
              }
            }
          }
        }
        if(!existRules){
          var deviceNotOff:DeviceNotOff={
            deviceName:devicesNeverOff[j],
            rules:[]
          }
          devicesNotOffReason.push(deviceNotOff)
  
        }
      }
      this.devicesNotOff=devicesNotOffReason;
      console.log("deivceNotOff")
      console.log(this.devicesNotOff)
    }

    getDevicesWithUnreachableStateReason(devicesWithUnReachableState:Array<DeviceStateReachable>){
      var devicesWithUnreachableStateReason:Array<DeviceStateReachable>=[];
      for(let j=0;j<devicesWithUnReachableState.length;j++){
        var deviceWithUnreachableState=devicesWithUnReachableState[j];
        for(let i=0;i<deviceWithUnreachableState!.stateReachable.length;i++){
          if(!deviceWithUnreachableState!.stateReachable[i].reachable){
            var stateName=deviceWithUnreachableState!.stateReachable[i].stateName;
            second:
            for(let j=0;j<this.generateModelParameters.actions.length;j++){
              if(this.generateModelParameters.actions[j].toState===stateName && 
                this.generateModelParameters.actions[j].device===deviceWithUnreachableState.deviceName){
                if(this.generateModelParameters.actions[j].rules.length>0){
                  deviceWithUnreachableState!.stateReachable[i].rules=this.generateModelParameters.actions[j].rules;
                  break second;
                }
                break second;
              }
            }
            
          }
        }
        devicesWithUnreachableStateReason.push(deviceWithUnreachableState)
      }
      this.devicesWithUnreachableState=devicesWithUnreachableStateReason;
      console.log("devicesWithUnreachableState")
      console.log(this.devicesWithUnreachableState)
    }


    getRuleContent(ruleContent:string):string{
      return ruleContent.substring(ruleContent.indexOf("IF"));
    }

    getConflictStates(countStatesCauseRule:CountStatesCauseRule):string{
      var states=""
      for(let i=0;i<countStatesCauseRule.statesCauseRule.length;i++){
        if(i<countStatesCauseRule.statesCauseRule.length-1){
          // states=states+'&lt;b &gt;'+countStatesCauseRule.statesCauseRule[i].stateName+'&lt;/b &gt;'+" & "
          states=states+countStatesCauseRule.statesCauseRule[i].stateName+" & "
        }else{
          // states=states+'&lt;b &gt;'+countStatesCauseRule.statesCauseRule[i].stateName+'&lt;/b &gt;'
          states=states+countStatesCauseRule.statesCauseRule[i].stateName
        }
      }
      return states;
    }

    getStates(deviceConflictStatesCauseRules:DeviceStatesCauseRules):string{
      var states=""
      for(let i=0;i<deviceConflictStatesCauseRules.statesRules.length;i++){
        if(i<deviceConflictStatesCauseRules.statesRules.length-1){
          states=states+deviceConflictStatesCauseRules.statesRules[i].stateName+" & "
        }else{
          states=states+deviceConflictStatesCauseRules.statesRules[i].stateName
        }
      }
      return states
    }

    getFastChangeStates(fastChangeStatesCauseRule:Array<StateCauseRuleCount>):string{
      var states="";
      for(let i=0;i<fastChangeStatesCauseRule.length;i++){
        if(i<fastChangeStatesCauseRule.length-1){
          states=states+fastChangeStatesCauseRule[i].stateName+" & "
        }else{
          states=states+fastChangeStatesCauseRule[i].stateName
        }
      }
      return states
    }

    getDeviceUnreachableStates(statesReachable:Array<StateReachable>):string{
      var states="";
      for(let i=0;i<statesReachable.length;i++){
        if(!statesReachable[i].reachable){
          states=states+statesReachable[i].stateName+" "
        }
      }
      return states
    }

    getFastChangeCauseRulesGroup(devicesScenesFastChangeCauseRule:Array<DeviceScenesFastChangeCauseRule>,i:number,j:number):number{
      var groupNum=0;
      if(i>0){
        i=i-1
        for(;i>=0;i--){
          groupNum+=devicesScenesFastChangeCauseRule[i].scenesFastChangeCauseRules.length
        }
      }
      groupNum+=j+1
      return groupNum
      
    }

    getConflictCauseRulesGraph(devicesAllSceneConflictRule:Array<DeviceAllSceneConflictRule>,i:number,j:number):number{
      var groupNum=0;
      if(i>0){
        i=i-1
        for(;i>=0;i--){
          groupNum+=devicesAllSceneConflictRule[i].allCountStateCauseRuleSceneName.length
        }
      }
      groupNum+=j+1
      return groupNum
    }

    getSceneName(sceneName:string):string{
      var name=sceneName.substring(sceneName.indexOf("-")).substring("-".length);
      return name
    }

    toSceneDetail(sceneName:string){
      this.mainData.storage = {
        generateModelParameters: this.generateModelParameters,
        scenes: this.scenes,
        selectedSceneName: sceneName,
        simulationTime: this.simulationTime,
        scenesTree: this.scenesTree,
        ruleText: this.ruleText,
        uploadedFileName: this.uploadedFileName
      }
      this.router.navigate(["scene-details"]);
    }



}
