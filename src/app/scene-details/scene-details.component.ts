import { Component, OnInit } from '@angular/core';
import * as echarts from 'echarts';
import {
  Scene, DeviceAnalysisResult, EnvironmentModel, StaticAnalysisResult, CauseRule, CauseRulesCount, RuleNode
} from "../class/scene";
import { SceneService } from "../service/scene.service";
import { MainData } from '../provider/main-data';
import { Router, NavigationExtras } from "@angular/router";
import { DynamicAnalysisService } from '../service/dynamic-analysis.service';
import { DataTimeValue, DeviceConflict, DeviceJitter, DeviceStateAndCausingRules, Scenario, ScenesTree } from '../class/simulation';
import { ModelLayer } from '../class/model';
import { DeviceInstance, InstanceLayer } from '../class/instance';
import { Rule } from '../class/rule';
import { SingleScenarioAnalysisService } from '../service/single-scenario-analysis.service';
import { number } from 'echarts';

@Component({
  selector: 'app-scene-details',
  templateUrl: './scene-details.component.html',
  styleUrls: ['./scene-details.component.css']
})
export class SceneDetailsComponent implements OnInit {

  ifdPath = ""

  scene: Scene | null = null;
  rulesOptions: any;
  rulesBarOptions: any;

  selectedSceneName!: string;

  sceneNum!: string;

  equivalentTime: string = "24";
  intervalTime: string = "300";

  deviceAnalysisResults: DeviceAnalysisResult[] = [];
  selectedDeviceAnalysisResult: DeviceAnalysisResult | null = null;
  
  conflictOption: any=null;
  jitterOption: any=null;



  scenes: Array<Scene> = new Array<Scene>();
  environmentModel: EnvironmentModel | null = null;
  staticAnalysisResult: StaticAnalysisResult | null = null;
  initModelFileName: string = ""
  propertyFileName: string = ""

  scenarios = new Array<Scenario>();
  selectedScenario = new Scenario();
  singleScenario = new Scenario();
  ruleTextFinal = "";
  modelLayer = new ModelLayer();
  instanceLayer = new InstanceLayer();
  interactiveInstances = new InstanceLayer();
  rules = new Array<Rule>();
  simulationTime: string = "";
  scenesTree = new ScenesTree();
  ruleText = "";
  attributeNames = new Array<string>();
  ifdFileName = "";

  selectAttributeName = "0";

  highValue = "";
  lowValue = "";
  comfotLevel = ""

  selectedDeviceInstance = new DeviceInstance();

  showContent = "showButtons";

  selectedScenarioDevicesConflicts = new Array<DeviceConflict>();   ///单场景下所有设备的冲突
  devicesConflictsAllCausingRules = new Array<Array<Array<DeviceStateAndCausingRules>>>();   ////各冲突设备每次发生冲突的原因
  devicesConflictsSynthesizedCausingRules = new Array<Array<Array<DeviceStateAndCausingRules>>>();   ////各冲突设备冲突发生的综合原因
  selectedDeviceConflictsAllCausingRules=new Array<Array<DeviceStateAndCausingRules>>();   ///选中设备每次发生冲突的原因
  selectedDeviceConflictsSynthesizedCausingRules=new Array<Array<DeviceStateAndCausingRules>>();  ////选中设备冲突发生的综合原因

  selectedScenarioDevicesJitters = new Array<DeviceJitter>();
  devicesJittersAllCausingRules = new Array<Array<Array<DeviceStateAndCausingRules>>>();
  devicesJittersSynthesizedCausingRules = new Array<Array<Array<DeviceStateAndCausingRules>>>();
  selectedDeviceJittersAllCausingRules=new Array<Array<DeviceStateAndCausingRules>>();
  selectedDeviceJittersSynthesizedCausingRules=new Array<Array<DeviceStateAndCausingRules>>();

  selectedDeviceStatesDuration = new Array<Array<string>>();   /////所选择设备各状态持续时间，用于计算功率

  /////综合并计数原因
  jitterCauseRulesCounts: Array<CauseRulesCount> = [];
  conflictCauseRulesCounts: Array<CauseRulesCount> = [];

  constructor(public sceneService: SceneService, public mainData: MainData, public router: Router,
    private dynamicAnalysisService: DynamicAnalysisService,
    private singleScenarioAnlaysisService: SingleScenarioAnalysisService) {
    console.log(this.mainData)
    this.simulationTime = this.mainData.storage.simulationTime;
    this.scenarios = this.mainData.storage.scenarios;
    this.selectedScenario = this.mainData.storage.selectedScenario;
    this.scenesTree = this.mainData.storage.scenesTree;
    this.ruleText = this.mainData.storage.ruleText;
    // this.staticAnalysisResult = this.mainData.storage.staticAnalysisResult;
    this.initModelFileName = this.mainData.storage.initModelFileName;
    this.singleScenario = this.mainData.storage.singleScenario;
    this.ruleTextFinal = this.mainData.storage.ruleTextFinal;
    this.modelLayer = this.mainData.storage.modelLayer;
    this.instanceLayer = this.mainData.storage.instanceLayer;
    this.interactiveInstances = this.mainData.storage.interactiveInstances;
    this.rules = this.mainData.storage.rules;
    this.attributeNames = this.mainData.storage.attributeNames;
    this.ifdFileName = this.mainData.storage.ifdFileName;
    this.equivalentTime = mainData.storage.equivalentTime;
  }

  ngOnInit(): void {
    // document.getElementById("rule-time")!.style.display="none";
    // document.getElementById("device-time")!.style.display="none";

    this.sceneService.getRulesEchartsOption(this.selectedScenario!, this.simulationTime, this.rules).subscribe(option => {
      console.log("option")
      console.log(option)
      this.rulesOptions = option
    })
    // if (this.selectedSceneName != "") {
    //   console.log(this.selectedSceneName)
    //   console.log(this.scenes)
    //   this.sceneNum = getSceneNum(this.selectedSceneName);
    //   for (let i = 0; i < this.scenes.length; i++) {
    //     if (this.scenes[i].scenarioName === this.selectedSceneName) {
    //       this.scene = this.scenes[i];
    //       break;
    //     }
    //   }
    //   console.log(this.scene)
    // }else if(this.scene!=null){
    //   this.sceneNum=getSceneNum(this.scene.scenarioName);
    //   document.getElementById("overallAnalysisButton")!.style.display="none";
    //   console.log(this.scene);
    // }
    // document.getElementById("ifd")!.style.display = "none";
    // document.getElementById("scene")!.style.display = "flex";
    // document.getElementById("scene_rule")!.style.display = "none";
    // document.getElementById("scene_device")!.style.display = "none";

    // function getSceneNum(sceneName: string): string {
    //   var sceneNum = sceneName.replace("random-scene", "-");
    //   return sceneNum;
    // }

  }


  //////////////////////////

  // getSatisfy(){
  //   var scene=this.scene;
  //   var simulationTime=this.simulationTime
  //   for(let i=0;i<scene!.nameDataFunctions.length;i++){
  //     if(scene!.nameDataFunctions[i].name==="temperature"){
  //       var low=parseFloat(this.bestLow)
  //       var high=parseFloat(this.bestHigh)
  //       var satisfyTime=0.0
  //       for(let j=0;j<scene!.nameDataFunctions[i].dataFunctions.length;j++){
  //         var dataFunction=scene!.nameDataFunctions[i].dataFunctions[j]
  //         if((dataFunction.downValue<=low && dataFunction.upValue<=low) ||
  // 				(dataFunction.downValue>=high&&dataFunction.upValue>=high)) {

  //         }else if(dataFunction.downValue>=low&&dataFunction.downValue<=low &&
  //           dataFunction.upValue>=low&&dataFunction.upValue<=high) {
  //         satisfyTime=satisfyTime+dataFunction.upTime-dataFunction.downTime;

  //         }else {
  //           //找上下界与函数的交点
  //           var time0=(low-dataFunction.function.b)/dataFunction.function.a;
  //           var time1=(high-dataFunction.function.b)/dataFunction.function.a;
  //           if(time0>=dataFunction.downTime&&time0<=dataFunction.upTime &&
  //               time1>=dataFunction.downTime&&time1<=dataFunction.upTime) {
  //             satisfyTime=satisfyTime+Math.abs(time1-time0);
  //           }else if(time0>=dataFunction.downTime&&time0<=dataFunction.upTime) {
  //             if(dataFunction.function.a>0) {
  //               satisfyTime=satisfyTime+dataFunction.upTime-time0;
  //             }else if(dataFunction.function.a<0) {
  //               satisfyTime=satisfyTime+time0-dataFunction.downTime;
  //             }
  //           }else if(time1>=dataFunction.downTime&&time1<=dataFunction.upTime) {
  //             if(dataFunction.function.a>0) {
  //               satisfyTime=satisfyTime+time1-dataFunction.downTime;
  //             }else if(dataFunction.function.a<0) {
  //               satisfyTime=satisfyTime+dataFunction.upTime-time1;
  //             }
  //           }
  //         }
  //       }
  //       var satisfactionDegree=satisfyTime/parseFloat(simulationTime);
  //       console.log("satisfaciton: "+satisfactionDegree)
  //       break;
  //     }
  //   }
  // }

  ///////////////////////////

  goBackToMain() {

    this.mainData.storage.equivalentTime = this.equivalentTime;
    this.router.navigate(["main"]);
  }

  toRuleAnalysis() {
    this.mainData.storage.equivalentTime = this.equivalentTime;
    this.router.navigate(["rule-analysis"]);
  }

  // showRules() {
  //   document.getElementById("ifd")!.style.display = "none";
  //   document.getElementById("scene")!.style.display = "flex";
  //   document.getElementById("scene_rule")!.style.display = "block";
  //   if (this.scene != null) {
  //     this.sceneService.getRulesEchartsOption(this.selectedScenario!, this.simulationTime, this.rules).subscribe(option => {
  //       this.rulesOptions = option
  //     })
  //     this.sceneService.getRuleBarEchartOption(this.scene!).subscribe(option => {
  //       this.rulesBarOptions = option;
  //     })
  //   }

  //   const ruleBarChart = echarts.init(document.getElementById("rule_bar")!);
  //   ruleBarChart.on('click', function (params) {
  //     console.log(ruleBarChart.getOption())
  //   })
  // }


  // showDevices() {
  //   document.getElementById("ifd")!.style.display = "none";
  //   document.getElementById("scene")!.style.display = "flex";
  //   document.getElementById("scene_device")!.style.display = "block";
  //   if (this.scene != null && this.staticAnalysisResult != null && this.environmentModel != null) {
  //     if (this.equivalentTime != "" && this.intervalTime != "") {
  //       ////场景分析
  //       // this.dynamicAnalysisService.getSingleDynamicAnalysisResult(this.scene, this.environmentModel, this.staticAnalysisResult.usableRules, this.simulationTime, this.equivalentTime, this.intervalTime).subscribe(scene => {
  //       //   this.scene = scene;
  //       //   console.log(this.scene);
  //       //   this.deviceAnalysisResults = this.scene.deviceAnalysisResults;
  //       // })


  //     }

  //   }
  // }


  onSelect(device: DeviceAnalysisResult) {
    if (this.selectedDeviceAnalysisResult === device) {
      this.selectedDeviceAnalysisResult = null;
    } else {
      this.selectedDeviceAnalysisResult = device;
      // this.getConflictOption();
      // this.getJitterOption();
      this.syntheticJitterReason();
      this.syntheticConflictReason();
    }
  }



  getJitterOption(selectedDeviceJitter: DeviceJitter,dataTimeValue:DataTimeValue) {
    
    /////设备状态变化 time-value
    var deviceStatesData: number[][] = [];
    /////jitter情况
    var frequentChangeData = [];
    /////显示的位置数
    var frequentValue: number
    var stateActionValues=new Array<Array<string>>()
    
    for (var i = 0; i < this.interactiveInstances.deviceInstances.length; i++) {
      /////找到对应设备
      if (dataTimeValue.instanceName === this.interactiveInstances.deviceInstances[i].instanceName) {
        var deviceType=this.interactiveInstances.deviceInstances[i].deviceType
        frequentValue = (deviceType.stateSyncValueEffects.length - 1) / 2
        for(var j=0;j<deviceType.stateSyncValueEffects.length;j++){
          var state=deviceType.stateSyncValueEffects[j].stateName;
          var action=deviceType.stateSyncValueEffects[j].synchronisation;
          var value=deviceType.stateSyncValueEffects[j].value;
          stateActionValues.push([state,action,value])
        }
        
        break;
      }
    }

    if(dataTimeValue.timeValues.length>0){
      deviceStatesData=dataTimeValue.timeValues;
    }
    for(let i=0;i<selectedDeviceJitter.jitterTimeValues.length;i++){
      ////第i段jitter
      for(var j=0;j<selectedDeviceJitter.jitterTimeValues[i].length;j++){
        var jitterTime=selectedDeviceJitter.jitterTimeValues[i][j][0];
        frequentChangeData.push([jitterTime,frequentValue!])
      }
      
    }



    this.jitterOption = {
      title: {
        text: 'Device jitter',
        left: 'center'
      },
      legend: {
        data: ['state', 'jitter'],
        right: 10
      },
      tooltip: {
        show: true,
        trigger: 'axis',
        axisPointer: {
          animation: false
        },
        formatter: function (params: any) {
          var content = "";
          var dataValues: number[] = [];
          var time: string = params[0].marker + '<b>time</b>: ' + params[0].axisValueLabel;
          for (let i = 0; i < params.length; i++) {
            if (params[i].componentSubType === "line") {
              var dataValue = params[i].data[1];
              var exist = false;
              for (let j = 0; j < dataValues.length; j++) {
                if (dataValue === dataValues[j]) {
                  exist = true;
                }
              }
              if (!exist) {
                dataValues.push(dataValue);
              }
            }

          }
          var states: string = params[0].marker + '<b>state</b>:';
          for (let i = 0; i < dataValues.length; i++) {
            for (let j = 0; j < stateActionValues.length; j++) {
              var stateValue = parseInt(stateActionValues![j][2]);
              if (stateValue === dataValues[i]) {
                states = states + " " + stateActionValues![j][0]

              }
            }
          }
          content = time + '<br/>' + states;
          return content;

        }
      },
      xAxis: {
        name: 'time/s',
        min: 0,
        max: parseFloat(this.simulationTime),

      },
      yAxis: [{
        name: 'state',
        splitNumber: stateActionValues!.length - 1,
        min: 0,
        max: stateActionValues!.length - 1,
        type: 'value',
        axisLabel: {
          formatter: function (value: number) {
            var label: string = "";
            for (let i = 0; i < stateActionValues?.length!; i++) {
              var stateValue = parseInt(stateActionValues![i][2]);
              if (stateValue === value) {
                label = stateActionValues![i][0]
                break;
              }
            }
            return label + '-' + value
          }
        }
      }, {
        type: 'value',
        splitNumber: 2,
        axisLabel: {
          formatter: function (value: number) {
            var label: string = "";
            if (value === frequentValue) {
              label = 'change fast'
            }
            return label
          }
        }
      }],
      series: [{
        name: 'state',
        data: deviceStatesData,
        type: 'line',
        showSymbol: false,
        lineStyle: {
          width: 1
        },
        zlevel: 0

      }, {
        name: 'jitter',
        data: frequentChangeData,
        type: 'scatter',
        symbol: 'circle',
        zlevel: 1

      }]
    }
    console.log(this.jitterOption)

  }

  getConflictOption(selectedDeviceConflict: DeviceConflict) {
    
    var data = [];
    if (selectedDeviceConflict.conflictTimeValues.length > 0) {
      for (let i = 0; i < selectedDeviceConflict.conflictTimeValues.length; i++) {
        console.log(selectedDeviceConflict)
        var conflictTime = selectedDeviceConflict.conflictTimeValues[i][0];  ////冲突时间
        data.push({
          value: [conflictTime, 1],
          label: {
            show: true,
            offset: [0, -8],
            formatter: (i + 1) + "",
            fontSize: 10
          }
        });
      }
    }

    this.conflictOption = {
      title: {
        text: 'States conflict',
        left: 'center'
      },
      tooltip: {
        show: true,
        trigger: 'item',
        triggerOn: 'mousemove',
        formatter: function (params: any) {
          return params.marker + '<b>states conflict</b> at : <br/>  ' + '<b>' + params.marker + params.value[0].toFixed(2) + '</b>';
        }
      },
      xAxis: {
        name: "time/s",
        min: 0,
        max: parseFloat(this.simulationTime),
        splitLine: {
          show: false
        }
      },
      yAxis: {
        splitNumber: 1,
        type: 'value',
        axisLabel: {
          formatter: function (value: number) {
            var label: string = "";
            if (value === 1) {
              label = 'conflict'
            }
            return label
          }
        }
      },
      legend: {
        right: 10,
        data: 'conflict'
      },
      series: [{
        symbolSize: 10,
        symbol: 'image://data:image/gif;base64,R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKUE1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7',
        data: data,
        type: 'scatter'
      }]
    }
  }


  ////////综合jitter的causingRules，并计数
  syntheticJitterReason() {
    if (this.selectedDeviceAnalysisResult != null) {
      var jitterCauseRulesCounts: Array<CauseRulesCount> = [];
      for (let i = 0; i < this.selectedDeviceAnalysisResult.jitterReasons.length; i++) {
        ////看是否已经存在
        var jitterReason = this.selectedDeviceAnalysisResult.jitterReasons[i];
        ///////如果原因不完整：某个状态没有对应的引发规则，则不考虑
        if (!this.hasCausingRule(jitterReason.causingRules)) {
          continue;
        }
        var exist = false;
        for (let j = 0; j < jitterCauseRulesCounts.length; j++) {
          if (this.isStatesSame(jitterReason.causingRules, jitterCauseRulesCounts[j].causingRules)) {
            exist = true;
            jitterCauseRulesCounts[j].count += 1;
            break;
          }
        }
        if (!exist) {
          var conflictCauseRulesCount: CauseRulesCount = {
            count: 1,
            causingRules: jitterReason.causingRules,
            exsitScenes: [this.scene!.scenarioName]
          }
          jitterCauseRulesCounts.push(conflictCauseRulesCount)
        }
      }
      this.jitterCauseRulesCounts = jitterCauseRulesCounts;
      console.log("jitter:")
      console.log(this.jitterCauseRulesCounts)
    }
  }
  ///////综合conflict的causingRules，并计数
  syntheticConflictReason() {
    if (this.selectedDeviceAnalysisResult != null) {
      var conflictCauseRulesCounts: Array<CauseRulesCount> = [];
      for (let i = 0; i < this.selectedDeviceAnalysisResult.conflictReasons.length; i++) {
        ////看是否已经存在
        var conflictReason = this.selectedDeviceAnalysisResult.conflictReasons[i];
        if (!this.hasCausingRule(conflictReason.causingRules)) {
          continue;
        }
        var exist = false;
        for (let j = 0; j < conflictCauseRulesCounts.length; j++) {
          if (this.isStatesSame(conflictReason.causingRules, conflictCauseRulesCounts[j].causingRules)) {
            exist = true;
            conflictCauseRulesCounts[j].count += 1;
            break;
          }
        }
        if (!exist) {
          var conflictCauseRulesCount: CauseRulesCount = {
            count: 1,
            causingRules: conflictReason.causingRules,
            exsitScenes: [this.scene!.scenarioName]
          }
          conflictCauseRulesCounts.push(conflictCauseRulesCount)
        }
      }
      this.conflictCauseRulesCounts = conflictCauseRulesCounts;
      console.log("conflict:")
      console.log(this.conflictCauseRulesCounts)

    }
  }

  ///////////如果原因不完整：某个状态没有对应的引发规则，则不考虑
  hasCausingRule(causingRules: Array<CauseRule>): boolean {
    for (let i = 0; i < causingRules.length; i++) {
      if (causingRules[i].stateCausingRules.length <= 0) {
        return false;
      }
    }
    return true;
  }

  /////判断两个causingRules是否相同
  isStateCausingRuleSame(stateCausingRules1: Array<RuleNode>, stateCausingRules2: Array<RuleNode>): boolean {
    if (stateCausingRules1.length != stateCausingRules2.length) {
      /////长度不等
      return false;
    }
    for (let i = 0; i < stateCausingRules1.length; i++) {
      var exist = false;
      for (let j = 0; j < stateCausingRules2.length; j++) {
        if (stateCausingRules2[j].rule.ruleName === stateCausingRules1[i].rule.ruleName) {
          exist = true;
          break;
        }
      }
      if (!exist) {
        /////如果不存在
        return false;
      }
    }
    return true;
  }

  /////两则状态及规则是否一样
  isStatesSame(causingRules1: Array<CauseRule>, causingRules2: Array<CauseRule>): boolean {
    if (causingRules1.length != causingRules2.length) {
      return false;
    }
    for (let i = 0; i < causingRules1.length; i++) {
      var stateExist = false;
      for (let j = 0; j < causingRules2.length; j++) {
        if (causingRules2[j].state === causingRules1[i].state) {
          ////找到对应状态
          stateExist = true;
          ////看规则是否一样
          if (!this.isStateCausingRuleSame(causingRules2[j].stateCausingRules, causingRules1[i].stateCausingRules)) {
            ////两组规则不一样
            return false;
          }
          break;
        }
      }
      if (!stateExist) {
        ////状态不存在
        return false;
      }
    }
    return true;
  }

  calculateComfortLevel() {
    ///计算舒适度
    if (parseFloat(this.highValue) < parseFloat(this.lowValue)) {
      alert("Highest value should higher than lowest value!")
    } else {

    }

  }

  ////选中待分析设备
  selectDevice(selectedDeviceInstance: DeviceInstance) {
    if (this.selectedDeviceInstance === selectedDeviceInstance) {
      this.selectedDeviceInstance = new DeviceInstance();
    } else {
      this.selectedDeviceInstance = selectedDeviceInstance;
      console.log(this.selectedDeviceInstance)
    }
    this.showContent = "showButtons";
  }

  showAnalysisButtons() {
    this.showContent = "showButtons";

  }
  showConflictAnalysis() {
    this.showContent = "showConflict";
    this.conflictOption=null
    this.selectedDeviceConflictsAllCausingRules=new Array<Array<DeviceStateAndCausingRules>>();   ///选中设备每次发生冲突的原因
    this.selectedDeviceConflictsSynthesizedCausingRules=new Array<Array<DeviceStateAndCausingRules>>();  ////选中设备冲突发生的综合原因
    for (let i = 0; i < this.selectedScenario.deviceConflicts.length; i++) {
      if (this.selectedScenarioDevicesConflicts[i].instanceName == this.selectedDeviceInstance.instanceName) {
        if(this.selectedScenarioDevicesConflicts[i].conflictTimeValues.length>0){
          this.getConflictOption(this.selectedScenarioDevicesConflicts[i]);
        }
        
        console.log(this.conflictOption)
        break
      }
    }
    for(var i=0;i<this.devicesConflictsAllCausingRules.length;i++){
      if(this.devicesConflictsAllCausingRules[i][0][0].deviceName==this.selectedDeviceInstance.instanceName){
        this.selectedDeviceConflictsAllCausingRules=this.devicesConflictsAllCausingRules[i]
        break;
      }
    }
    for(var i=0;i<this.devicesConflictsSynthesizedCausingRules.length;i++){
      if(this.devicesConflictsSynthesizedCausingRules[i][0][0].deviceName==this.selectedDeviceInstance.instanceName){
        this.selectedDeviceConflictsSynthesizedCausingRules=this.devicesConflictsSynthesizedCausingRules[i];
        break;
      }
    }

  }
  showJitterAnalysis() {
    this.showContent = "showJitter";
    this.jitterOption=null;
    this.selectedDeviceJittersAllCausingRules=new Array<Array<DeviceStateAndCausingRules>>();
    this.selectedDeviceJittersSynthesizedCausingRules=new Array<Array<DeviceStateAndCausingRules>>();
    for (let i = 0; i < this.selectedScenario.dataTimeValues.length; i++) {
      if(this.selectedScenario.dataTimeValues[i].instanceName==this.selectedDeviceInstance.instanceName){
        var dataTimeValue=this.selectedScenario.dataTimeValues[i];
        var deviceJitter=new DeviceJitter();
        for(let j=0;j<this.selectedScenarioDevicesJitters.length;j++){
          if (this.selectedScenarioDevicesJitters[j].instanceName == this.selectedDeviceInstance.instanceName) {
            deviceJitter=this.selectedScenarioDevicesJitters[j]
            break
          }
        }
        this.getJitterOption(deviceJitter,dataTimeValue);
        break;
      }
      
    }

    for(var i=0;i<this.devicesJittersAllCausingRules.length;i++){
      if(this.devicesJittersAllCausingRules[i][0][0].deviceName==this.selectedDeviceInstance.instanceName){
        this.selectedDeviceJittersAllCausingRules=this.devicesJittersAllCausingRules[i]
        break;
      }
    }
    for(var i=0;i<this.devicesJittersSynthesizedCausingRules.length;i++){
      if(this.devicesJittersSynthesizedCausingRules[i][0][0].deviceName==this.selectedDeviceInstance.instanceName){
        this.selectedDeviceJittersSynthesizedCausingRules=this.devicesJittersSynthesizedCausingRules[i];
        break;
      }
    }
  }
  showConsumptionAnalysis() {
    this.showContent = "showConsumption";
    ////计算各状态运行时间
    for (var i = 0; i < this.selectedScenario.dataTimeValues.length; i++) {
      if (this.selectedScenario.dataTimeValues[i].instanceName == this.selectedDeviceInstance.instanceName) {
        ///找到对应设备的仿真路径，然后传给后端计算各状态运行结果
        this.singleScenarioAnlaysisService.calculateDeviceStatesDuration(this.selectedScenario.dataTimeValues[i], this.selectedDeviceInstance).subscribe(deviceStatesDuration => {
          // deviceStateDuration[0]设备名  deviceStateDuration[1]状态名  deviceStateDuration[2]该状态保持时间
          console.log(deviceStatesDuration)
          this.selectedDeviceStatesDuration = deviceStatesDuration;
        })
      }
    }
  }

  getTimeToFix(timeStr: string): string {
    var time = parseFloat(timeStr);
    return time.toFixed(2);
  }

  getEquivalentTime(timeStr: string): string {
    var time = parseFloat(timeStr);
    var equivalentTime = time / parseFloat(this.simulationTime) * parseFloat(this.equivalentTime);
    return equivalentTime.toFixed(2);
  }

  calculateConsumption(): number {
    var sum = 0;
    for (var i = 0; i < this.selectedDeviceStatesDuration.length; i++) {
      sum += parseFloat(this.selectedDeviceStatesDuration[i][3]) * parseFloat(this.getEquivalentTime(this.selectedDeviceStatesDuration[i][2]));
    }
    return sum;
  }



  showDevicesAnalysis() {
    this.singleScenarioAnlaysisService.searchSingleScenarioConflict(this.selectedScenario).subscribe(scenario => {
      console.log(scenario)
      this.selectedScenario = scenario
      this.selectedScenarioDevicesConflicts = this.selectedScenario.deviceConflicts;
      this.singleScenarioAnlaysisService.locateSingleScenariosAllConflict(this.selectedScenario, this.rules, this.interactiveInstances.deviceInstances, this.ifdFileName).subscribe(devicesAllStatesRuleAndPreRules => {
        console.log(devicesAllStatesRuleAndPreRules);
        this.devicesConflictsAllCausingRules = devicesAllStatesRuleAndPreRules;
        this.singleScenarioAnlaysisService.getCausingRulesSynthesized(devicesAllStatesRuleAndPreRules).subscribe(synthesizedDevicesStatesRuleAndPreRules => {
          console.log(synthesizedDevicesStatesRuleAndPreRules)
          this.devicesConflictsSynthesizedCausingRules = synthesizedDevicesStatesRuleAndPreRules;
        })
      })
    })
    this.singleScenarioAnlaysisService.searchSingleScenarioJitter(this.selectedScenario, this.intervalTime, this.simulationTime, this.equivalentTime).subscribe(scenario => {
      console.log(scenario);
      this.selectedScenario = scenario;
      this.selectedScenarioDevicesJitters = this.selectedScenario.deviceJitters;
      this.singleScenarioAnlaysisService.locateSingleScenariosAllJitter(this.selectedScenario, this.rules, this.interactiveInstances.deviceInstances, this.ifdFileName).subscribe(devicesAllStatesRuleAndPreRules => {
        console.log(devicesAllStatesRuleAndPreRules);
        this.devicesJittersAllCausingRules = devicesAllStatesRuleAndPreRules;
        this.singleScenarioAnlaysisService.getCausingRulesSynthesized(devicesAllStatesRuleAndPreRules).subscribe(synthesizedDevicesStatesRuleAndPreRules => {
          console.log(synthesizedDevicesStatesRuleAndPreRules);
          this.devicesJittersSynthesizedCausingRules = synthesizedDevicesStatesRuleAndPreRules;
        })
      })
    })
  }


}
