
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { List } from 'echarts';
import { InstanceLayer } from '../class/instance';
import { ModelLayer } from '../class/model';
import { OtherAnalysisOutput } from '../class/output-style';
import { Rule } from '../class/rule';
import { AllRuleAnalysisResult, CauseRule, CauseRulesCount,DeviceAnalysisResult, DeviceAnalysisSyntheticResult, DeviceCauseRuleConclusion,  EnvironmentModel, PropertyReachableSyntheticResult, PropertyVerifyResult, ReachableReason,  RuleNode, Scene,   StaticAnalysisResult} from '../class/scene';

import { DeviceAnlaysis, DeviceStateAndCausingRules,  PropertyAnalysisResult,  Scenario, ScenesTree } from '../class/simulation';
import { MainData } from '../provider/main-data';
import { DynamicAnalysisService } from '../service/dynamic-analysis.service';

@Component({
  selector: 'app-rule-analysis',
  templateUrl: './rule-analysis.component.html',
  styleUrls: ['./rule-analysis.component.css']
})
export class RuleAnalysisComponent implements OnInit {

  scenes: Array<Scene>=new Array<Scene>();
  environmentModel:EnvironmentModel|null=null;
  staticAnalysisResult:StaticAnalysisResult|null=null;
  initModelFileName:string="";
  propertyFileName:String=""
  
  deviceNames:Array<string>=[]
  allRuleAnalysisResult!:AllRuleAnalysisResult;
  equivalentTime:string="24";
  intervalTime:string="300";
  //////////自定义性质
  property:string="";
  properties:Array<string>=[];



  scenarios=new Array<Scenario>();
  singleScenario=new Scenario();
  ruleTextFinal="";
  modelLayer=new ModelLayer();
  instanceLayer=new InstanceLayer();
  interactiveInstances=new InstanceLayer();
  rules=new Array<Rule>();
  simulationTime: string = "";
  scenesTree:ScenesTree=new ScenesTree();
  ruleText="";
  attributeNames=new Array<string>();
  ifdFileName="";

  existConflict=false;
  conflictAnalyzed=false;

  existJitter=false;
  jitterAnalyzed=false;

  deviceAnalysiss=new Array<DeviceAnlaysis>()

  conflictCausingRules=new Array<Array<Array<DeviceStateAndCausingRules>>>();  ///第几个设备、第几段、第几个状态
	jitterCausingRules=new Array<Array<Array<DeviceStateAndCausingRules>>>();

  otherAnalyzed=false;
  propertyAnalyzed=false;

  otherAnalysisResult=new OtherAnalysisOutput();
  neverTriggeredRules=new Array<Rule>()

  propertyToBeAnalyzed=false
  propertyAnalysisResults=Array<PropertyAnalysisResult>()

  privacyResults=new Array<string>()
  
  ////显示结果
  showResult="none";
  showPropertyResult="none"

/////综合分析结果
  deviceAnalysisSyntheticResults:Array<DeviceAnalysisSyntheticResult>=[];
  //////有没有冲突
  hasConflict:boolean=false;
  /////有没有jitter
  hasJitter:boolean=false;

  /////property验证结果
  propertyVerifyResults:Array<PropertyVerifyResult>=[]

  /////property综合结果
  propertyReachableSyntheticResults:Array<PropertyReachableSyntheticResult>=[]

  ///////conclusion
  deviceConflictConflusions:Array<DeviceCauseRuleConclusion>=[]
  deviceJitterConflusions:Array<DeviceCauseRuleConclusion>=[]

  constructor(public mainData:MainData,public router:Router,
    private dynamicAnalysisService:DynamicAnalysisService) { 
      this.simulationTime = this.mainData.storage.simulationTime;
      this.scenarios = this.mainData.storage.scenarios;
      this.scenesTree = this.mainData.storage.scenesTree;
      this.ruleText = this.mainData.storage.ruleText;
      // this.staticAnalysisResult = this.mainData.storage.staticAnalysisResult;
      this.initModelFileName = this.mainData.storage.initModelFileName;
      this.singleScenario=this.mainData.storage.singleScenario;
      this.ruleTextFinal=this.mainData.storage.ruleTextFinal;
      this.modelLayer=this.mainData.storage.modelLayer;
      this.instanceLayer=this.mainData.storage.instanceLayer;
      this.interactiveInstances=this.mainData.storage.interactiveInstances;
      this.rules=this.mainData.storage.rules;
      this.attributeNames=this.mainData.storage.attributeNames;
      this.ifdFileName=this.mainData.storage.ifdFileName;
  }

  ngOnInit(): void {
  }





      goBackToMain(){
        // this.mainData.storage={
        //   scenes:this.scenes,
        //   simulationTime:this.simulationTime,
        //   scenesTree:this.scenesTree,
        //   ruleText:this.ruleText,
        //   environmentModel:this.environmentModel,
        //   selectedSceneName: "",
        //   staticAnalysisResult:this.staticAnalysisResult,
        //   initModelFileName:this.initModelFileName,
        //   propertyFileName:this.propertyFileName
        // }
        this.router.navigate(["main"]);
      }

      searchAllScenariosConflict(){
        this.dynamicAnalysisService.searchAllScenariosConflict(this.scenarios).subscribe(scenarios=>{
          console.log(scenarios)
          this.scenarios=scenarios;
          ///遍历分析结果，看是否存在冲突
          for(var i=0;i<this.deviceAnalysiss.length;i++){
            this.deviceAnalysiss[i].hasConflict=false;
            this.deviceAnalysiss[i].conflictScenarios=new Array<string>();
          }
          for(var i=0;i<this.scenarios.length;i++){
            for(var j=0;j<this.scenarios[i].deviceConflicts.length;j++){
              if(this.scenarios[i].deviceConflicts[j].conflictTimeValues.length>0){
                var exist=false;
                for(var k=0;k<this.deviceAnalysiss.length;k++){
                  ///找到对应的设备分析结果
                  if(this.scenarios[i].deviceConflicts[j].instanceName==this.deviceAnalysiss[k].instanceName){
                    exist=true;
                    this.deviceAnalysiss[k].hasConflict=true;
                    this.deviceAnalysiss[k].conflictScenarios.push(this.scenarios[i].scenarioName);
                    break;
                  }
                }
                if(!exist){
                  var deviceAnalysis=new DeviceAnlaysis();
                  deviceAnalysis.instanceName=this.scenarios[i].deviceConflicts[j].instanceName;
                  deviceAnalysis.hasConflict=true;
                  deviceAnalysis.conflictScenarios.push(this.scenarios[i].scenarioName)
                  this.deviceAnalysiss.push(deviceAnalysis);
                }
                this.existConflict=true;
                
              }
            }
          }
          this.conflictAnalyzed=true;  ///表示已经分析过是否冲突了
          console.log(this.deviceAnalysiss)
          var conflictNum=0;
          for(let i=0;i<this.deviceAnalysiss.length;i++){
            if(this.deviceAnalysiss[i].hasConflict){
              conflictNum++;
            }
          }
          console.log("冲突设备个数："+conflictNum)
        })
      }

      locateAllScenariosConflict(){
        this.dynamicAnalysisService.locateAllScenariosConflict(this.scenarios,this.instanceLayer.deviceInstances,this.rules,this.ifdFileName).subscribe(allSynthesizedDeviceAllStatesRuleAndPreRules=>{
          console.log(allSynthesizedDeviceAllStatesRuleAndPreRules);
          this.conflictCausingRules=allSynthesizedDeviceAllStatesRuleAndPreRules;
        })
      }

      

      searchAllScenariosJitter(){
        this.dynamicAnalysisService.searchAllScenariosJitter(this.scenarios,this.intervalTime,this.simulationTime,this.equivalentTime).subscribe(scenarios=>{
          console.log(scenarios)
          this.scenarios=scenarios;
          ///遍历分析结果，看是否存在冲突
          for(var i=0;i<this.deviceAnalysiss.length;i++){
            this.deviceAnalysiss[i].hasJitter=false;
            this.deviceAnalysiss[i].jitterScenarios=new Array<string>();
          }
          for(var i=0;i<this.scenarios.length;i++){
            for(var j=0;j<this.scenarios[i].deviceJitters.length;j++){
              if(this.scenarios[i].deviceJitters[j].jitterTimeValues.length>0){
                var exist=false;
                for(var k=0;k<this.deviceAnalysiss.length;k++){
                  ///找到对应的设备分析结果
                  if(this.scenarios[i].deviceJitters[j].instanceName==this.deviceAnalysiss[k].instanceName){
                    exist=true;
                    this.deviceAnalysiss[k].hasJitter=true;
                    this.deviceAnalysiss[k].jitterScenarios.push(this.scenarios[i].scenarioName);
                    break;
                  }
                }
                if(!exist){
                  var deviceAnalysis=new DeviceAnlaysis();
                  deviceAnalysis.instanceName=this.scenarios[i].deviceJitters[j].instanceName;
                  deviceAnalysis.hasJitter=true;
                  deviceAnalysis.jitterScenarios.push(this.scenarios[i].scenarioName)
                  this.deviceAnalysiss.push(deviceAnalysis);
                }
                this.existJitter=true;
                
              }
            }
          }
          this.jitterAnalyzed=true;  ///表示已经分析过是否冲突了
          console.log(this.deviceAnalysiss)
          var jitterNum=0;
          for(let i=0;i<this.deviceAnalysiss.length;i++){
            if(this.deviceAnalysiss[i].hasJitter){
              jitterNum++;
            }
          }
          console.log("抖动设备个数："+jitterNum)
        })
      }

      locateAllScenariosJitter(){
        this.dynamicAnalysisService.locateAllScenariosJitter(this.scenarios,this.instanceLayer.deviceInstances,this.rules,this.ifdFileName).subscribe(allSynthesizedDeviceAllStatesRuleAndPreRules=>{
          console.log(allSynthesizedDeviceAllStatesRuleAndPreRules);
          this.jitterCausingRules=allSynthesizedDeviceAllStatesRuleAndPreRules;
        })
      }

      getOtherAnalysis(){
        
        this.dynamicAnalysisService.getOtherAnalysis(this.scenarios,this.interactiveInstances).subscribe(otherAnalysis=>{
          this.otherAnalyzed=true;
          console.log(otherAnalysis)
          this.otherAnalysisResult=otherAnalysis
          this.neverTriggeredRules=new Array<Rule>()
          for(let i=0;i<otherAnalysis.notTriggeredRulesInAll.length;i++){
            for(let j=0;j<this.rules.length;j++){
              if(otherAnalysis.notTriggeredRulesInAll[i]==this.rules[j].ruleName){
                this.neverTriggeredRules.push(this.rules[j]);
                break
              }
            }
          }

          this.privacyResults=new Array<string>()
          for(let i=0;i<otherAnalysis.homeBoundedOutBoundedResults.length;i++){
            
          }
        })
      }

      instanceStateDeduce(property:string):string{
        property=property.toString()
        var instanceStates=property.split("&")
        var deduce=instanceStates[1]+" -> "+instanceStates[0];
        console.log(deduce)
        return instanceStates[1]+" -> "+instanceStates[0];
      }


      ////跳转到特定场景
      toSceneDetail(scenarioName:string){
        console.log(scenarioName)
        for(var i=0;i<this.scenarios.length;i++){
          if(scenarioName==this.scenarios[i].scenarioName){
            this.mainData.storage.selectedScenario=this.scenarios[i];
            this.router.navigate(["scene-details"]);
            break
          }
        }
        // this.mainData.storage = {
        //   scenes: this.scenes,
        //   selectedSceneName: scenarioName,
        //   simulationTime: this.simulationTime,
        //   scenesTree: this.scenesTree,
        //   ruleText: this.ruleText,
        //   staticAnalysisResult:this.staticAnalysisResult,
        //   environmentModel:this.environmentModel,
        //   equivalentTime:this.equivalentTime,
        //   intervalTime:this.intervalTime,
        //   initModelFileName:this.initModelFileName,
        //   propertyFileName:this.propertyFileName
        // }
        
      }


      // ///////展示分析结果
      // showAnalysisResult(){
      //   var t1=new Date().getTime();
      //   this.dynamicAnalysisService.getAllDynamicAnalysisResult(this.scenes,this.environmentModel!,this.properties,this.staticAnalysisResult!.usableRules,this.simulationTime,this.equivalentTime,this.intervalTime).subscribe(scenes=>{
      //     this.scenes=scenePropertyResult.scenes;
      //     this.propertyVerifyResults=scenePropertyResult.propertyVerifyResults;
          


      //     console.log(this.scenes)
      //     console.log(scenePropertyResult)
      //     /////设备冲突
      //     /////设备抖动
      //     this.syntheticDeviceReason()
      //     this.syntheticAllPropertyReachableReason()
      //     console.log("syntheticResult:")
      //     console.log(this.deviceAnalysisSyntheticResults)
      //     console.log(this.propertyReachableSyntheticResults)
      //     this.showResult="block"
      //     this.conclusion()
      //     var analysisTime=new Date().getTime()-t1;
      //     console.log("analysisTime:"+analysisTime);
      //   })
      // }
            ///////展示分析结果
      showAnalysisResult(){
        // var t1=new Date().getTime();
        // this.dynamicAnalysisService.getAllDynamicAnalysisResult(this.scenes,this.environmentModel!,this.properties,this.staticAnalysisResult!.usableRules,this.simulationTime,this.equivalentTime,this.intervalTime).subscribe(scenes=>{
        //   this.scenes=scenes;
        //   console.log(this.scenes)
        //   /////设备冲突
        //   /////设备抖动
        //   this.syntheticDeviceReason()
        //   console.log("syntheticResult:")
        //   console.log(this.deviceAnalysisSyntheticResults)
        //   this.showResult="block"
        //   this.conclusion()
        //   var analysisTime=new Date().getTime()-t1;
        //   console.log("analysisTime:"+analysisTime);
        // })
      }

      //////验证property
    verifyProperty(){
      // this.dynamicAnalysisService.getPropertyVerificationResult(this.scenes,this.environmentModel!,this.properties,this.staticAnalysisResult!.usableRules).subscribe(propertyVerifyResults=>{
      //   this.propertyVerifyResults=propertyVerifyResults;
      //   console.log(this.properties)
      //   console.log(this.propertyVerifyResults)
      //   this.syntheticAllPropertyReachableReason()
      //   console.log(this.propertyReachableSyntheticResults)
      //   this.showPropertyResult="block"
      // })
      if(this.properties.length>0){
        ////验证性质
        this.dynamicAnalysisService.getPropertiesAnalysis(this.scenarios,this.rules,this.properties,this.instanceLayer).subscribe(results=>{
          console.log(results)
          this.propertyAnalysisResults=results
          this.propertyToBeAnalyzed=false
          this.propertyAnalyzed=true
        })
      }
    }

    /////添加property
    addProperty(){
      if(!this.propertyToBeAnalyzed){
        this.properties=[];
      }
      if(this.property.trim()!=""){
        var exist=false;
        var conList=this.property.split("&");
        console.log(conList)
        for(var i=0;i<this.properties.length;i++){
          var existConList=this.properties[i].split("&");
          if(existConList.length!=conList.length){
            continue;
          }
          var existCon;
          second:
          for(var j=0;j<conList.length;j++){
            existCon=false;
            for(var k=0;k<existConList.length;k++){
              if(conList[j].trim()===existConList[k].trim()){
                existCon=true;
              }
            }
            if(!existCon){
              break second;
            }
          }
          if(!existCon){
            continue;
          }else{
            exist=true;
            break;
          }
        }
        if(!exist){
          this.properties.push(this.property);
        }
        this.propertyToBeAnalyzed=true
        console.log(this.properties)
      }
    }


      /////找到对应的状态
    getStates(causingRules:Array<CauseRule>):string{
      var states=""
      var statesList=[];
      for(let i=0;i<causingRules.length;i++){
        statesList.push(causingRules[i].state);
      }
      for(let i=0;i<statesList.length;i++){
        if(i<statesList.length-1){
          states=states+statesList[i]+" & "
        }else{
          states=states+statesList[i]
        }
      }
      return states
    }
    
    getSceneName(scenarioName:string):string{
      var name=scenarioName.substring("scenario-".length);
      return name
    }

    syntheticAllPropertyReachableReason(){
      this.propertyReachableSyntheticResults=[];
      for(let i=0;i<this.propertyVerifyResults.length;i++){
        if(this.propertyVerifyResults[i].reachable){
          ////可达，综合原因
          var reachableCauseRulesCounts=this.syntheticPropertyReachableReason(this.propertyVerifyResults[i].reachableReasons);
          var propertyReachableSyntheticResult:PropertyReachableSyntheticResult={
            property:this.propertyVerifyResults[i].property,
            reachable:true,
            reachableCauseRulesCounts:reachableCauseRulesCounts,
            hasCorrespondRule:this.propertyVerifyResults[i].hasCorrespondRule,
            correspondingRules:this.propertyVerifyResults[i].correspondingRules
          }
          this.propertyReachableSyntheticResults.push(propertyReachableSyntheticResult);
          console.log(this.propertyReachableSyntheticResults)
        }else{
          /////不可达
          var propertyReachableSyntheticResult:PropertyReachableSyntheticResult={
            property:this.propertyVerifyResults[i].property,
            reachable:false,
            reachableCauseRulesCounts:[],
            hasCorrespondRule:this.propertyVerifyResults[i].hasCorrespondRule,
            correspondingRules:this.propertyVerifyResults[i].correspondingRules
          }
          this.propertyReachableSyntheticResults.push(propertyReachableSyntheticResult);
        }
      }
    }

    ////////综合property可达的原因
    syntheticPropertyReachableReason(reachableReasons:Array<ReachableReason>):Array<CauseRulesCount>{
      var reachableCauseRulesCounts:Array<CauseRulesCount>=[];
      for(let i=0;i<reachableReasons.length;i++){
        ////看是否已经存在
        var reachableReason=reachableReasons[i];
        if(!this.hasCausingRule(reachableReason.causingRules)){
          ///如果原因不完整：某个状态没有对应的引发规则，则不考虑
          continue;
        }
        var scenarioName=reachableReason.scenarioName;
        var exist=false;
        
        for(let j=0;j<reachableCauseRulesCounts.length;j++){
          if(this.isStatesSame(reachableReason.causingRules,reachableCauseRulesCounts[j].causingRules)){
            exist=true;
            reachableCauseRulesCounts[j].count+=1;
            if(reachableCauseRulesCounts[j].exsitScenes.length==0){
              reachableCauseRulesCounts[j].exsitScenes.push(scenarioName)
            }else if(reachableCauseRulesCounts[j].exsitScenes[reachableCauseRulesCounts[j].exsitScenes.length-1]!=scenarioName){
              reachableCauseRulesCounts[j].exsitScenes.push(scenarioName)
            }
            break;
          }
        }
        if(!exist){
          var reachableCauseRulesCount:CauseRulesCount={
            count:1,
            causingRules:reachableReason.causingRules,
            exsitScenes:[scenarioName]
          }
          reachableCauseRulesCounts.push(reachableCauseRulesCount)
        }
      }
      return reachableCauseRulesCounts
    }

    /////conclusion
    conclusion(){
      var deviceConflictConflusions:Array<DeviceCauseRuleConclusion>=[]
      var deviceJitterConflusions:Array<DeviceCauseRuleConclusion>=[]
      for(let i=0;i<this.deviceAnalysisSyntheticResults.length;i++){
        if(this.deviceAnalysisSyntheticResults[i].conflictCauseRulesCounts.length>0){
          ////conflcit
          var deviceConflictConflusion:DeviceCauseRuleConclusion={
            deviceName:this.deviceAnalysisSyntheticResults[i].deviceName,
            causingRules:[]
          }
          for(let j=0;j<this.deviceAnalysisSyntheticResults[i].conflictCauseRulesCounts.length;j++){
            var conflictCauseRulesCount=this.deviceAnalysisSyntheticResults[i].conflictCauseRulesCounts[j];
            for(let k=0;k<conflictCauseRulesCount.causingRules.length;k++){
              var causingRule=conflictCauseRulesCount.causingRules[k];
              if(causingRule==null){
                continue;
              }
              ////先找到对应的状态,如果不存在就全加进去
              var existState=false;
              for(let m=0;m<deviceConflictConflusion.causingRules.length;m++){
                if(deviceConflictConflusion.causingRules[m].state===causingRule.state){
                  existState=true;
                  ///再看规则是否存在
                  for(let n=0;n<causingRule.stateCausingRules.length;n++){
                    ////看该规则是否已存在
                    var exsitRule=false;
                    for(let l=0;l<deviceConflictConflusion.causingRules[m].stateCausingRules.length;l++){
                      if(causingRule.stateCausingRules[n].rule.ruleName===deviceConflictConflusion.causingRules[m].stateCausingRules[l].rule.ruleName){
                        exsitRule=true;
                        break;
                      }
                    }
                    if(!exsitRule){
                      deviceConflictConflusion.causingRules[m].stateCausingRules.push(causingRule.stateCausingRules[n])
                    }
                  }
                  break;
                }
              }
              if(!existState){
                deviceConflictConflusion.causingRules.push(causingRule)
              }
            }
          }
          deviceConflictConflusions.push(deviceConflictConflusion)
        }
        if(this.deviceAnalysisSyntheticResults[i].jitterCauseRulesCounts.length>0){
          ////Jitter
          var deviceJitterConflusion:DeviceCauseRuleConclusion={
            deviceName:this.deviceAnalysisSyntheticResults[i].deviceName,
            causingRules:[]
          }
          for(let j=0;j<this.deviceAnalysisSyntheticResults[i].jitterCauseRulesCounts.length;j++){
            var jitterCauseRulesCount=this.deviceAnalysisSyntheticResults[i].jitterCauseRulesCounts[j];
            for(let k=0;k<jitterCauseRulesCount.causingRules.length;k++){
              var causingRule=jitterCauseRulesCount.causingRules[k];
              ////先找到对应的状态,如果不存在就全加进去
              var existState=false;
              for(let m=0;m<deviceJitterConflusion.causingRules.length;m++){
                if(deviceJitterConflusion.causingRules[m].state===causingRule.state){
                  existState=true;
                  ///再看规则是否存在
                  for(let n=0;n<causingRule.stateCausingRules.length;n++){
                    ////看该规则是否已存在
                    var exsitRule=false;
                    for(let l=0;l<deviceJitterConflusion.causingRules[m].stateCausingRules.length;l++){
                      if(causingRule.stateCausingRules[n].rule.ruleName===deviceJitterConflusion.causingRules[m].stateCausingRules[l].rule.ruleName){
                        exsitRule=true;
                        break;
                      }
                    }
                    if(!exsitRule){
                      deviceJitterConflusion.causingRules[m].stateCausingRules.push(causingRule.stateCausingRules[n])
                    }
                  }
                  break;
                }
              }
              if(!existState){
                deviceJitterConflusion.causingRules.push(causingRule)
              }
            }
          }
          deviceJitterConflusions.push(deviceJitterConflusion)
        }
      }
      this.deviceConflictConflusions=deviceConflictConflusions
      this.deviceJitterConflusions=deviceJitterConflusions
      console.log("conflusion")
      console.log( this.deviceConflictConflusions)
      console.log(this.deviceJitterConflusions)
    }

    /////综合分析各个设备的jitter和conflict原因
    syntheticDeviceReason(){
      if(this.environmentModel!=null&&this.scenes!=null){
        var devices=this.environmentModel.devices;
        var deviceAnalysisSyntheticResults:Array<DeviceAnalysisSyntheticResult>=[];
        for(let i=0;i<devices.length;i++){
          ////综合该设备各个场景的jitter和conflict原因
          var jitterCauseRulesCounts:Array<CauseRulesCount>=[];
          var conflictCauseRulesCounts:Array<CauseRulesCount>=[];
          for(let j=0;j<this.scenes.length;j++){
            ////找到对应设备分析结果
            if(this.scenes[j].deviceAnalysisResults!=null){
              for(let k=0;k<this.scenes[j].deviceAnalysisResults.length;k++){
                if(devices[i].deviceName===this.scenes[j].deviceAnalysisResults[k].deviceName){
                  /////找到对应设备，并合并
                  this.syntheticConflictReason(this.scenes[j].deviceAnalysisResults[k],conflictCauseRulesCounts,this.scenes[j].scenarioName);
                  this.syntheticJitterReason(this.scenes[j].deviceAnalysisResults[k],jitterCauseRulesCounts,this.scenes[j].scenarioName);
                  break;
                }
              }
            }
          }
          if(jitterCauseRulesCounts.length>0||conflictCauseRulesCounts.length>0){
            var deviceAnalysisSyntheticResult:DeviceAnalysisSyntheticResult={
              deviceName:devices[i].deviceName,
              jitterCauseRulesCounts:jitterCauseRulesCounts,
              conflictCauseRulesCounts:conflictCauseRulesCounts
            }
            deviceAnalysisSyntheticResults.push(deviceAnalysisSyntheticResult);
          }
        }
        this.deviceAnalysisSyntheticResults=deviceAnalysisSyntheticResults;
        for(let i=0;i<this.deviceAnalysisSyntheticResults.length;i++){
          if(deviceAnalysisSyntheticResults[i].conflictCauseRulesCounts.length>0){
            this.hasConflict=true;
          }
          if(deviceAnalysisSyntheticResults[i].jitterCauseRulesCounts.length>0){
            this.hasJitter=true;
          }
          if(this.hasJitter&&this.hasConflict){
            break;
          }
        }
        console.log(this.deviceAnalysisSyntheticResults)
      }
    }


    ////////综合jitter的causingRules，并计数
    syntheticJitterReason(deviceAnalysisResult:DeviceAnalysisResult,jitterCauseRulesCounts:Array<CauseRulesCount>,scenarioName:string){
      if(deviceAnalysisResult!=null){        
        for(let i=0;i<deviceAnalysisResult.jitterReasons.length;i++){
          ////看是否已经存在
          var jitterReason=deviceAnalysisResult.jitterReasons[i]
          if(!this.hasCausingRule(jitterReason.causingRules)){
            ///如果原因不完整：某个状态没有对应的引发规则，则不考虑
            continue;
          }
          var exist=false;
          for(let j=0;j<jitterCauseRulesCounts.length;j++){
            if(this.isStatesSame(jitterReason.causingRules,jitterCauseRulesCounts[j].causingRules)){
              exist=true;
              jitterCauseRulesCounts[j].count+=1;
              if(jitterCauseRulesCounts[j].exsitScenes.length==0){
                jitterCauseRulesCounts[j].exsitScenes.push(scenarioName)
              }else if(jitterCauseRulesCounts[j].exsitScenes[jitterCauseRulesCounts[j].exsitScenes.length-1]!=scenarioName){
                jitterCauseRulesCounts[j].exsitScenes.push(scenarioName)
              }
              break;
            }
          }
          if(!exist){
            var jitterCauseRulesCount:CauseRulesCount={
              count:1,
              causingRules:jitterReason.causingRules,
              exsitScenes:[scenarioName]
            }
            jitterCauseRulesCounts.push(jitterCauseRulesCount)
          }
        }
      }
    }
    ///////综合conflict的causingRules，并计数
    syntheticConflictReason(deviceAnalysisResult:DeviceAnalysisResult,conflictCauseRulesCounts:Array<CauseRulesCount>,scenarioName:string){
      if(deviceAnalysisResult!=null){        
        for(let i=0;i<deviceAnalysisResult.conflictReasons.length;i++){
          ////看是否已经存在
          var conflictReason=deviceAnalysisResult.conflictReasons[i];
          if(!this.hasCausingRule(conflictReason.causingRules)){
            ///如果原因不完整：某个状态没有对应的引发规则，则不考虑
            continue;
          }
          var exist=false;
          for(let j=0;j<conflictCauseRulesCounts.length;j++){
            if(this.isStatesSame(conflictReason.causingRules,conflictCauseRulesCounts[j].causingRules)){
              exist=true;
              conflictCauseRulesCounts[j].count+=1;
              if(conflictCauseRulesCounts[j].exsitScenes.length==0){
                conflictCauseRulesCounts[j].exsitScenes.push(scenarioName)
              }else if(conflictCauseRulesCounts[j].exsitScenes[conflictCauseRulesCounts[j].exsitScenes.length-1]!=scenarioName){
                conflictCauseRulesCounts[j].exsitScenes.push(scenarioName)
              }
              break;
            }
          }
          if(!exist){
            var conflictCauseRulesCount:CauseRulesCount={
              count:1,
              causingRules:conflictReason.causingRules,
              exsitScenes:[scenarioName]
            }
            conflictCauseRulesCounts.push(conflictCauseRulesCount)
          }
        }      
      }
    }

    ///////////如果原因不完整：某个状态没有对应的引发规则，则不考虑
    hasCausingRule(causingRules:Array<CauseRule>):boolean{
      for(let i=0;i<causingRules.length;i++){
        if(causingRules[i].stateCausingRules.length<=0){
          return false;
        }
      }
      return true;
    }

        /////两则状态及规则是否一样
        isStatesSame(causingRules1:Array<CauseRule>,causingRules2:Array<CauseRule>):boolean{
          if(causingRules1.length!=causingRules2.length){
            return false;
          }
          for(let i=0;i<causingRules1.length;i++){
            var stateExist=false;
            for(let j=0;j<causingRules2.length;j++){
              if(causingRules2[j].state===causingRules1[i].state){
                ////找到对应状态
                stateExist=true;
                ////看规则是否一样
                if(!this.isStateCausingRuleSame(causingRules2[j].stateCausingRules,causingRules1[i].stateCausingRules)){
                  ////两组规则不一样
                  return false;
                }
                break;
              }
            }
            if(!stateExist){
              ////状态不存在
              return false;
            }
          }
          return true;
        }
  
    /////判断两个causingRules是否相同
    isStateCausingRuleSame(stateCausingRules1:Array<RuleNode>,stateCausingRules2:Array<RuleNode>):boolean{
      if(stateCausingRules1.length!=stateCausingRules2.length){
        /////长度不等
        return false;
      }
      for(let i=0;i<stateCausingRules1.length;i++){
        var exist=false;
        for(let j=0;j<stateCausingRules2.length;j++){
          if(stateCausingRules2[j].rule.ruleName===stateCausingRules1[i].rule.ruleName){
            exist=true;
            break;
          }
        }
        if(!exist){
          /////如果不存在
          return false;
        }
      }
      return true;
    }
    
    getRuleContent(ruleContent:string):string{
      return ruleContent.substring(ruleContent.indexOf("IF"));
    }









}
