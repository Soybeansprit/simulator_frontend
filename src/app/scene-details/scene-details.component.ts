import { Component, OnInit } from '@angular/core';
import * as echarts from 'echarts';
import {
  Scene,  DeviceAnalysisResult, EnvironmentModel, StaticAnalysisResult, CauseRule, CauseRulesCount, RuleNode} from "../class/scene";
import { SceneService } from "../service/scene.service";
import { MainData } from '../provider/main-data';
import { Router, NavigationExtras } from "@angular/router";
import { ScenesTree } from '../class/scenes-tree';
import { DynamicAnalysisService } from '../service/dynamic-analysis.service';

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
  simulationTime: string = "";
  scenesTree: ScenesTree;
  ruleText: string;
  sceneNum!: string;

  equivalentTime: string = "24";
  intervalTime: string = "300";

  deviceAnalysisResults: DeviceAnalysisResult[] = [];
  selectedDeviceAnalysisResult: DeviceAnalysisResult | null = null;
  conflictOption: any;
  changeFrequentOption: any;



  scenes: Array<Scene> = new Array<Scene>();
  environmentModel: EnvironmentModel | null = null;
  staticAnalysisResult: StaticAnalysisResult | null = null;
  initModelFileName: string = ""
  propertyFileName:string=""

/////综合并计数原因
  jitterCauseRulesCounts:Array<CauseRulesCount>=[];
  conflictCauseRulesCounts:Array<CauseRulesCount>=[];

  constructor( public sceneService: SceneService, public mainData: MainData, public router: Router,
    private dynamicAnalysisService: DynamicAnalysisService) {
    this.simulationTime = this.mainData.storage.simulationTime;
    this.scenes = this.mainData.storage.scenes;
    this.selectedSceneName = this.mainData.storage.selectedSceneName;
    this.scenesTree = this.mainData.storage.scenesTree;
    this.ruleText = this.mainData.storage.ruleText;
    this.environmentModel = this.mainData.storage.environmentModel;
    this.staticAnalysisResult = this.mainData.storage.staticAnalysisResult
    this.initModelFileName = this.mainData.storage.initModelFileName
    this.propertyFileName=mainData.storage.propertyFileName
  }

  ngOnInit(): void {
    // document.getElementById("rule-time")!.style.display="none";
    // document.getElementById("device-time")!.style.display="none";

    if (this.selectedSceneName != "") {
      console.log(this.scenes)
      this.sceneNum = getSceneNum(this.selectedSceneName);
      for (let i = 0; i < this.scenes.length; i++) {
        if (this.scenes[i].scenarioName === this.selectedSceneName) {
          this.scene = this.scenes[i];
          break;
        }
      }
    }
    document.getElementById("ifd")!.style.display = "none";
    document.getElementById("scene")!.style.display = "flex";
    document.getElementById("scene_rule")!.style.display = "none";
    document.getElementById("scene_device")!.style.display = "none";

    function getSceneNum(sceneName: string): string {
      var sceneNum = sceneName.replace("random-scene", "-");
      return sceneNum;
    }

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
    this.mainData.storage = {
      scenes: this.scenes,
      selectedSceneName: "",
      simulationTime: this.simulationTime,
      scenesTree: this.scenesTree,
      ruleText: this.ruleText,
      staticAnalysisResult: this.staticAnalysisResult,
      environmentModel: this.environmentModel,
      initModelFileName: this.initModelFileName,
      propertyFileName:this.propertyFileName
    }
    this.router.navigate(["main"]);
  }

  toRuleAnalysis() {
    this.mainData.storage = {
      scenes: this.scenes,
      selectedSceneName: this.selectedSceneName,
      simulationTime: this.simulationTime,
      scenesTree: this.scenesTree,
      ruleText: this.ruleText,
      staticAnalysisResult: this.staticAnalysisResult,
      environmentModel: this.environmentModel,
      initModelFileName: this.initModelFileName,
      equivalentTime:this.equivalentTime,
      intervalTime:this.intervalTime,
      propertyFileName:this.propertyFileName
    }
    this.router.navigate(["rule-analysis"]);
  }

  showRules() {
    document.getElementById("ifd")!.style.display = "none";
    document.getElementById("scene")!.style.display = "flex";
    document.getElementById("scene_rule")!.style.display = "block";
    if (this.scene != null) {
      this.sceneService.getRulesEchartsOption(this.scene!, this.simulationTime, this.staticAnalysisResult!.usableRules).subscribe(option => {
        this.rulesOptions = option
      })
      this.sceneService.getRuleBarEchartOption(this.scene!).subscribe(option => {
        this.rulesBarOptions = option;
      })
    }

    const ruleBarChart = echarts.init(document.getElementById("rule_bar"));
    ruleBarChart.on('click', function (params) {
      console.log(ruleBarChart.getOption())
    })
  }


  showDevices() {
    document.getElementById("ifd")!.style.display = "none";
    document.getElementById("scene")!.style.display = "flex";
    document.getElementById("scene_device")!.style.display = "block";
    if (this.scene != null && this.staticAnalysisResult != null && this.environmentModel != null) {
      if (this.equivalentTime != "" && this.intervalTime != "") {
        ////场景分析
        this.dynamicAnalysisService.getSingleDynamicAnalysisResult(this.scene, this.environmentModel, this.staticAnalysisResult.usableRules, this.simulationTime, this.equivalentTime, this.intervalTime).subscribe(scene => {
          this.scene = scene;
          console.log(this.scene);
          this.deviceAnalysisResults = this.scene.deviceAnalysisResults;
        })


      }

    }
  }


  onSelect(device: DeviceAnalysisResult) {
    if (this.selectedDeviceAnalysisResult === device) {
      this.selectedDeviceAnalysisResult = null;
    } else {
      this.selectedDeviceAnalysisResult = device;
      this.getConflictOption();
      this.getJitterOption();
      this.syntheticJitterReason();
      this.syntheticConflictReason();
    }
  }



  getJitterOption() {
    /////设备状态变化 time-value
    var deviceStatesData: number[][] = [];
    /////jitter情况
    var frequentChangeData = [];
    /////显示的位置数
    var frequentValue: number
    var stateActionValues: string[][]
    if (this.environmentModel != null)
      for (var i = 0; i < this.environmentModel.devices.length; i++) {
        /////找到对应设备
        if (this.selectedDeviceAnalysisResult!.deviceName === this.environmentModel.devices[i].deviceName) {
          frequentValue = (this.environmentModel.devices[i].deviceType.stateActionValues.length - 1) / 2
          stateActionValues = this.environmentModel.devices[i].deviceType.stateActionValues;
          break;
        }
      }
    if (this.selectedDeviceAnalysisResult != null) {
      for (let i = 0; i < this.scene?.dataTimeValues.length!; i++) {
        if (this.scene?.dataTimeValues[i].name === this.selectedDeviceAnalysisResult.deviceName) {
          deviceStatesData = this.scene.dataTimeValues[i].timeValues;
          break;
        }
      }
      for (let i = 0; i < this.selectedDeviceAnalysisResult.jitterReasons.length; i++) {
        for (let j = 0; j < this.selectedDeviceAnalysisResult.jitterReasons[i].jitter.length; j++) {
          var startTime = this.selectedDeviceAnalysisResult.jitterReasons[i].jitter[j][0];
          frequentChangeData.push([startTime, frequentValue!])
        }
      }
      console.log("frequentChangeData:"+frequentChangeData)
    }

    this.changeFrequentOption = {
      title: {
        text: 'Device Jitter',
        top: 'top',
        left: 'center'

      },
      legend: {
        data: ['state', 'frequent change'],
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
        name: 'frequent change',
        data: frequentChangeData,
        type: 'scatter',
        symbol: 'circle',
        zlevel: 1

      }]
    }

  }

  getConflictOption() {
    var data = [];
    if (this.selectedDeviceAnalysisResult != null) {
      for (let i = 0; i < this.selectedDeviceAnalysisResult.conflictReasons.length; i++) {
        var conflictTime = this.selectedDeviceAnalysisResult.conflictReasons[i].conflict.time;
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
        text: 'States Conflict: ' + data.length + ' times',
        top: 'top',
        left: 'center',
        textStyle: {
          color: '#FF3030'
        }
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
    syntheticJitterReason(){
      if(this.selectedDeviceAnalysisResult!=null){
        var jitterCauseRulesCounts:Array<CauseRulesCount>=[];
        for(let i=0;i<this.selectedDeviceAnalysisResult.jitterReasons.length;i++){
          ////看是否已经存在
          var jitterReason=this.selectedDeviceAnalysisResult.jitterReasons[i];
          ///////如果原因不完整：某个状态没有对应的引发规则，则不考虑
          if(!this.hasCausingRule(jitterReason.causingRules)){
            continue;
          }
          var exist=false;
          for(let j=0;j<jitterCauseRulesCounts.length;j++){
            if(this.isStatesSame(jitterReason.causingRules,jitterCauseRulesCounts[j].causingRules)){
              exist=true;
              jitterCauseRulesCounts[j].count+=1;
              break;
            }
          }
          if(!exist){
            var conflictCauseRulesCount:CauseRulesCount={
              count:1,
              causingRules:jitterReason.causingRules,
              exsitScenes:[this.scene!.scenarioName]
            }
            jitterCauseRulesCounts.push(conflictCauseRulesCount)
          }
        }
        this.jitterCauseRulesCounts=jitterCauseRulesCounts;
        console.log("jitter:")
        console.log(this.jitterCauseRulesCounts)
      }
    }
    ///////综合conflict的causingRules，并计数
    syntheticConflictReason(){
      if(this.selectedDeviceAnalysisResult!=null){
        var conflictCauseRulesCounts:Array<CauseRulesCount>=[];
        for(let i=0;i<this.selectedDeviceAnalysisResult.conflictReasons.length;i++){
          ////看是否已经存在
          var conflictReason=this.selectedDeviceAnalysisResult.conflictReasons[i];
          if(!this.hasCausingRule(conflictReason.causingRules)){
            continue;
          }
          var exist=false;
          for(let j=0;j<conflictCauseRulesCounts.length;j++){
            if(this.isStatesSame(conflictReason.causingRules,conflictCauseRulesCounts[j].causingRules)){
              exist=true;
              conflictCauseRulesCounts[j].count+=1;
              break;
            }
          }
          if(!exist){
            var conflictCauseRulesCount:CauseRulesCount={
              count:1,
              causingRules:conflictReason.causingRules,
              exsitScenes:[this.scene!.scenarioName]
            }
            conflictCauseRulesCounts.push(conflictCauseRulesCount)
          }
        }
        this.conflictCauseRulesCounts=conflictCauseRulesCounts; 
        console.log("conflict:")     
        console.log(this.conflictCauseRulesCounts)
      
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
  


}
