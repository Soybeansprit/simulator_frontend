import { Component, Input, OnInit } from '@angular/core';
import { DeviceResult } from '../class/device-result';
import * as echarts from 'echarts';
import * as $ from "jquery";
import {
  Scene, DeviceAnalysResult, DeviceConflict, StatesChange, DeviceStateTime, DeviceCannotOff, DeviceStateName,
  ConflictTime, StateChangeFast, StateLastTime, StateNameRelativeRule, Rule, DataTimeValue, StateChangeCauseRuleInput, StateAndRuleAndCauseRule, WholeAndCurrentChangeCauseRule, TimeStateRelativeRules, ConflictStateAndRules, RuleAndCause, StateRules, DeviceAnalysisResult, ConflictReason, CauseRule, RuleNode, CauseRulesCount
} from "../class/scene";
import { MainData } from '../provider/main-data';
import { GenerateModelParameters } from '../class/generate-model-parameters';
import { SceneService } from "../service/scene.service";
import { data } from 'jquery';
import { DeviceAnalysisService } from '../service/device-analysis.service';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-device-details',
  templateUrl: './device-details.component.html',
  styleUrls: ['./device-details.component.css']
})
export class DeviceDetailsComponent implements OnInit {
  // option:any;
  @Input() device!: DeviceResult;
  confliClick = "block";
  potentialClick = "block";
  freRuleShow = "none";
  selectedConflict: any;
  causalConflictRules: string[] = [];
  causalFrequentRules: string[] = [];

  deviceDetailButtonShow: string = "block";
  conflictDetailShow: string = "none";
  frequentChangeDetailShow: string = "none";
  cannotOffDetailShow: string = "none";
  consumptionDetailShow: string = "none";

  @Input() selectedDevice!: DeviceAnalysisResult;
  @Input() triggeredRulesName: Array<DataTimeValue> = new Array<DataTimeValue>();
  @Input() rules: Array<Rule> = new Array<Rule>();
  @Input() simulationTime: string = "";
  @Input() equivalentTime: string = "";

  conflictStateTime: ConflictTime | null = null;
  deviceStateName!: DeviceStateName

  @Input() conflictOption: any;
  @Input() changeFrequentOption: any;
  conflictTime: string = "";
  frequentChangeStartTime: number = 0;

  frequentChangeAnalysisOption: any;

  deviceNameCon: string = "";
  deviceNameCha:string ="";
  stateCauseRulesList: Array<Array<StateAndRuleAndCauseRule>> = new Array<Array<StateAndRuleAndCauseRule>>();
  newStateCauseRuleList:Array<Array<StateAndRuleAndCauseRule>> = new Array<Array<StateAndRuleAndCauseRule>>();
  frequentChangeTimeStateRuleList:Array<Array<TimeStateRelativeRules>>=[];
  // stateChanges:StateChangeFast[]=this.selectedDevice.statesChange.stateChangeFasts;

  conflictStatesRulesList:Array<ConflictStateAndRules>=[];
  stateRuleListList:Array<Array<StateRules>>=[];

///////综合冲突原因及计数
  @Input() conflictCauseRulesCounts:Array<CauseRulesCount>=[];
///////综合jitter原因及计数
  @Input() jitterCauseRulesCounts:Array<CauseRulesCount>=[];



  constructor(public sceneService: SceneService, public mainData: MainData,public deviceAnalysisService:DeviceAnalysisService) {
    console.log("device-detailes:")
    console.log(this.mainData)
  }

  ngOnInit(): void {

    // document.getElementById("device_detail_button")!.style.display="block";
    // document.getElementById("conflict_information")!.style.display="none";
    // document.getElementById("change_frequent_information")!.style.display="none";
    // document.getElementById("cannot_off_information")!.style.display="none";
    // document.getElementById("consumption_information")!.style.display="none";



    this.deviceDetailButtonShow = "block";
    this.conflictDetailShow = "none";
    this.frequentChangeDetailShow = "none";
    this.cannotOffDetailShow = "none";
    this.consumptionDetailShow = "none";

    // this.selectedDevice={
    //   deviceCannotOff:{
    //     cannotOff:false,
    //     cannotOffReason:{
    //       reason:"",
    //       cannotTriggeredRules:[]
    //     }
    //   },
    //   deviceName:"fan",
    //   deviceStateLastTime:{
    //     name:"fan",
    //     statesTime:[]
    //   },
    //   deviceStateName:{
    //     deviceName:"fan",
    //     stateNames:[]
    //   },
    //   statesChange:{
    //     stateChangeFasts:[],
    //     statesChangeCount:38,
    //     statesChangeFrequence:1.583333
    //   },
    //   statesConflict:{
    //     name:"fan",
    //     hasConflict:true,
    //     conflictTimes:[{
    //       conflictTime:"123.33333333",
    //       conflictStates:[["1","fon"],["0","foff"]]
    //     },{
    //       conflictTime:"143.66666666",
    //       conflictStates:[["1","fon"],["0","foff"]]
    //     }]
    //   }
    // }

    console.log(this.selectedDevice);
    // console.log(this.rules);
    // console.log(this.triggeredRulesName);
    // console.log(this.uploadedFileName)
    // setInterval(() => {
    //   /////综合并计数
    //   this.syntheticConflictReason();
    //   this.syntheticJitterReason();
    // }, 1000)


  }

  showDeviceDetailButton() {
    // document.getElementById("device_detail_button")!.style.display="block";
    // document.getElementById("conflict_information")!.style.display="none";
    // document.getElementById("change_frequent_information")!.style.display="none";
    // document.getElementById("cannot_off_information")!.style.display="none";
    // document.getElementById("consumption_information")!.style.display="none";
    this.deviceDetailButtonShow = "block";
    this.conflictDetailShow = "none";
    this.frequentChangeDetailShow = "none";
    this.cannotOffDetailShow = "none";
    this.consumptionDetailShow = "none";
  }


  // getConflictOption(){
  //   var data=[];
  //   for(let i=0;i<this.selectedDevice.statesConflict.conflictTimes.length;i++){
  //     var conflictTime=parseFloat(this.selectedDevice.statesConflict.conflictTimes[i].conflictTime);
  //     data.push([conflictTime,1]);
  //   }
  //   this.conflictOption={
  //     title:{
  //       text:'States Conflict',
  //       left: "center",
  //       top:'top',
  //       textStyle:{
  //         color:'	#FF3030'
  //       }
  //     },
  //     tooltip:{
  //       show:true,
  //       trigger:'item',
  //       triggerOn:'mousemove',
  //       formatter:function (params: any) {
  //         return params.marker + '<b>states conflict</b> at : <br/>  ' +'<b>'+params.marker +params.value[0].toFixed(2)+'</b>' ;
  //       }
  //     },
  //     xAxis:{
  //       name:"time/s",
  //       min:0,
  //       max:parseFloat('300'),
  //       splitLine:{
  //         show:false
  //       }
  //     },
  //     yAxis: {
  //       splitNumber:1,

  //     },
  //     legend:{
  //       right:10,
  //       data:'conflict'
  //     },
  //   series: [{
  //       symbolSize: 10,
  //       symbol:'image://data:image/gif;base64,R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKUE1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7',
  //       data: data,
  //       type: 'scatter'
  //   }]
  //   }
  // }



  conflictDetail() {
    // document.getElementById("device_detail_button")!.style.display="none";
    // document.getElementById("conflict_information")!.style.display="block";
    // document.getElementById("change_frequent_information")!.style.display="none";
    // document.getElementById("cannot_off_information")!.style.display="none";
    // document.getElementById("consumption_information")!.style.display="none";
    this.deviceDetailButtonShow = "none";
    this.conflictDetailShow = "block";
    this.frequentChangeDetailShow = "none";
    this.cannotOffDetailShow = "none";
    this.consumptionDetailShow = "none";

    var conflictTime: string = "";
    // this.getConflictOption();

    if(this.selectedDevice.conflictReasons.length>0){
      const conflictChart = echarts.init(document.getElementById("conflictOptionId"));
      console.log(conflictChart)
  
      conflictChart.on('click', function (params: any) {
        console.log(params);
        conflictTime = params.data.value[0] + "";
        console.log(conflictTime)
      })
    }
   
    console.log(this.conflictTime)
    setInterval(() => {
      // console.log("sceNameOut"+sceName);
      if (this.conflictTime != conflictTime) {
        console.log("this.conflictTime" + this.conflictTime)
        console.log("conflictTime" + conflictTime)
        this.conflictTime = conflictTime;
        for (let i = 0; i < this.selectedDevice.conflictReasons.length; i++) {
          var conflictStateTime = this.selectedDevice.conflictReasons[i].conflict;
          if (conflictStateTime.time+"" === this.conflictTime) {
            console.log(conflictTime)
            // this.sceneService.analysisStatesConflict(conflictStateTime, this.triggeredRulesName, this.selectedDevice.deviceStateName, this.rules, this.uploadedFileName)
            //   .subscribe(stateCauseRulesAndRelativeRules => {

            //     console.log(stateCauseRulesAndRelativeRules);
            //   })
            // break;
          }

        }
        this.conflictTime = "";
        conflictTime = ""

      }
    }, 1000)

    // this.sceneService.analysisAllStatesConflict(this.selectedDevice.statesConflict.conflictTimes, this.triggeredRulesName, this.selectedDevice.deviceStateName, this.rules, this.uploadedFileName)
    //         .subscribe(stateCauseRulesAndRelativeRulesList => {
    //           console.log("stateCauseRulesAndRelativeRulesList")
    //           console.log(stateCauseRulesAndRelativeRulesList);
    //           console.log("stateCauseRulesAndRelativeRulesList")
    //           console.log(stateCauseRulesAndRelativeRulesList);
    //           this.stateCauseRulesList=stateCauseRulesAndRelativeRulesList;
    //           // this.conflictStatistics(this.stateCauseRulesList)
    //           var newStateCauseRuleList=[];
    //           for(let i=0;i<this.stateCauseRulesList.length;i++){
    //             newStateCauseRuleList.push(this.deviceAnalysisService.removeContraRules(this.stateCauseRulesList[i]));
    //           }
    //           this.newStateCauseRuleList=newStateCauseRuleList;
    //           console.log("stateCauseRuleList")
    //           console.log(this.stateCauseRulesList);
    //           console.log("newStateCauseRuleList")
    //           console.log(this.newStateCauseRuleList)
    //           this.conflictStatesRulesList=this.deviceAnalysisService.conflictStatistics(this.newStateCauseRuleList)
    //         })

    // setInterval(() => {
    //   if (this.deviceNameCon != this.selectedDevice.deviceName) {
    //     console.log("conflictTimes")
    //     console.log(this.selectedDevice.statesConflict.conflictTimes)
    //     this.deviceNameCon = this.selectedDevice.deviceName;
    //     this.sceneService.analysisAllStatesConflict(this.selectedDevice.statesConflict.conflictTimes, this.triggeredRulesName, this.selectedDevice.deviceStateName, this.rules, this.uploadedFileName)
    //         .subscribe(stateCauseRulesAndRelativeRulesList => {
              
    //           console.log("stateCauseRulesAndRelativeRulesList")
    //           console.log(stateCauseRulesAndRelativeRulesList);
    //           this.stateCauseRulesList=stateCauseRulesAndRelativeRulesList;
    //           // this.conflictStatistics(this.stateCauseRulesList)
    //           var newStateCauseRuleList=[];
    //           for(let i=0;i<this.stateCauseRulesList.length;i++){
    //             newStateCauseRuleList.push(this.deviceAnalysisService.removeContraRules(this.stateCauseRulesList[i]));
    //           }
    //           this.newStateCauseRuleList=newStateCauseRuleList;
    //           console.log("stateCauseRuleList")
    //           console.log(this.stateCauseRulesList);
    //           console.log("newStateCauseRuleList")
    //           console.log(this.newStateCauseRuleList)
    //           this.conflictStatesRulesList=this.deviceAnalysisService.conflictStatistics(this.newStateCauseRuleList)
    //           console.log("conflictStatesRulesList2")
    //           console.log(this.conflictStatesRulesList);
    //         })
    //   }
    // }, 1000)

  }



//   /////////////////这个好像是对stateAndRuleAndCauseRules本身进行操作，因此会改变stateAndRuleAndCauseRules////////
//   ////////////////不要让newStateAndRulAndCauseRules地址直接指向stateAndRuleAndCauseRules//copy///////////////////
//   removeContraRules(stateAndRuleAndCauseRules:Array<StateAndRuleAndCauseRule>):Array<StateAndRuleAndCauseRule>{
//     var newStateAndRuleAndCauseRules:Array<StateAndRuleAndCauseRule>=new Array<StateAndRuleAndCauseRule>();
//     for(let i=0;i<stateAndRuleAndCauseRules.length;i++){
//       var stateName=stateAndRuleAndCauseRules[i].stateName;
//       var stateValue=stateAndRuleAndCauseRules[i].stateValue;
//       var ruleCauseRules:Array<RuleAndCause>=[];
//       for(let j=0;j<stateAndRuleAndCauseRules[i].rulesAndCauseRules.length;j++){
//         ruleCauseRules.push(stateAndRuleAndCauseRules[i].rulesAndCauseRules[j]);
//       }
//       var stateAndRuleAndCauseRule:StateAndRuleAndCauseRule={
//         stateName:stateName,
//         stateValue:stateValue,
//         rulesAndCauseRules:ruleCauseRules
//       }
//       newStateAndRuleAndCauseRules.push(stateAndRuleAndCauseRule);
      
//     }
//     var sceneService=this.sceneService;
//     var stateCauseRule:StateAndRuleAndCauseRule|null=null;
//     for(let i=0;i<newStateAndRuleAndCauseRules.length;i++){
//       if(newStateAndRuleAndCauseRules[i].rulesAndCauseRules.length===1){
//         stateCauseRule=newStateAndRuleAndCauseRules[i];
//         break;
//       }
//     }
//     if(stateCauseRule!=null){
//       var stateCauseRuleAttrVals:Array<Array<string>>=[];
//       var stateCauseRuleTriggers=stateCauseRule.rulesAndCauseRules[0].selfRule.trigger;
//       for(let i=0;i<stateCauseRuleTriggers.length;i++){
//         var attrVal:Array<string>=sceneService.getTriggerAttrVal(stateCauseRuleTriggers[i]);
//         stateCauseRuleAttrVals.push(attrVal);
//       }
//       for(let i=0;i<newStateAndRuleAndCauseRules.length;i++){
//         if(newStateAndRuleAndCauseRules[i].stateName===stateCauseRule.stateName){
//           continue;
//         }
//         var rules=newStateAndRuleAndCauseRules[i].rulesAndCauseRules;
//         rules.forEach(function(rule,index,arr){
//           var triggers=rule.selfRule.trigger;
//           var existContra=false;
//           second:
//           for(let j=0;j<triggers.length;j++){
//             var attrVal=sceneService.getTriggerAttrVal(triggers[j]);
//             for(let k=0;k<stateCauseRuleAttrVals.length;k++){
//               if(sceneService.triggerExistContra(attrVal,stateCauseRuleAttrVals[k])){
//                 existContra=true;
//                 break second;
//               }
//             }
//           }
//           if(existContra){
//             arr.splice(index,1);
//           }
//         })
//       }
//     }
//     console.log("removeContraRules:")
//     console.log(newStateAndRuleAndCauseRules);
//     return newStateAndRuleAndCauseRules;
//   }

// //////////////////////conflict原因统计///////////////////////
//   conflictStatistics(stateCauseRulesList:Array<Array<StateAndRuleAndCauseRule>>){
//     var conflictStatesRulesList:Array<ConflictStateAndRules>=[];
//     for(let i=0;i<stateCauseRulesList.length;i++){
//       var exist=false;
//       second:
//       for(let j=0;j<conflictStatesRulesList.length;j++){
//         if(this.stateCauseRulesEqual(stateCauseRulesList[i],conflictStatesRulesList[j].conflictStateCauseRules)){
//           conflictStatesRulesList[j].count++;
//           exist=true;
//           break second;
//         }
//       }
//       if(!exist){
//         var hasRule=true;
//         third:
//         for(let k=0;k<stateCauseRulesList[i].length;k++){
//           if(stateCauseRulesList[i][k].rulesAndCauseRules.length===0){
//             hasRule=false;
//             break third;
//           }
//         }
//         if(this.conflictStatesHaveCauseRules(stateCauseRulesList[i])){
//           var conflictStatesRules:ConflictStateAndRules={
//             conflictStateCauseRules:stateCauseRulesList[i],
//             count:1
//           }
//           conflictStatesRulesList.push(conflictStatesRules)
//         }
        
//       }



//     }
//     console.log("conflictStatesRuleList:")
//     console.log(conflictStatesRulesList)
//     this.conflictStatesRulesList=conflictStatesRulesList;


//     //////////////感觉需要继续统计///////////////

//   }

//   //////////////////////////判断当前冲突的各个状态是否都有相应规则导致，如无则不显示
//   conflictStatesHaveCauseRules(stateCauseRules:Array<StateAndRuleAndCauseRule>):boolean{
//     for(let i=0;i<stateCauseRules.length;i++){
//       if(stateCauseRules[i].rulesAndCauseRules.length===0){
//         return false;
//       }
//     }
//     return true;
//   }

//   stateCauseRulesEqual(stateCauseRules1:Array<StateAndRuleAndCauseRule>,stateCauseRules2:Array<StateAndRuleAndCauseRule>):boolean{
//     if(stateCauseRules1.length!=stateCauseRules2.length){
//       return false;
//     }
//     for(let i=0;i<stateCauseRules1.length;i++){
//       var exist=false;
//       second:
//       for(let j=0;j<stateCauseRules2.length;j++){
//         if(stateCauseRules1[i].stateName===stateCauseRules2[j].stateName){
//           if(this.causeRuleEqual(stateCauseRules1[i].rulesAndCauseRules,stateCauseRules2[j].rulesAndCauseRules)){
//             exist=true;
//             break second;
//           }
//         }
//       }
//       if(!exist){
//         return false
//       }
//     }
//     return true;
//   }

//   causeRuleEqual(causeRuleList1:Array<RuleAndCause>,causeRuleList2:Array<RuleAndCause>):boolean{
    
//     if(causeRuleList2.length!=causeRuleList1.length){
//       return false;
//     }
//     for(let i=0;i<causeRuleList1.length;i++){
//       var exist=false;
//       second:
//       for(let j=0;j<causeRuleList2.length;j++){
//         if(causeRuleList1[i].selfRule.ruleName===causeRuleList2[j].selfRule.ruleName){
//           exist=true;
//           break second;
//         }
//       }
//       if(!exist){
//         return false;
//       }
//     }
//     return true;
//   }

  // isExist(statesCauseRules:Array<StateAndRuleAndCauseRule>,conflictStatesAndRulesList:Array<Array<StateAndRuleAndCauseRule>>){
  //   // first:
  //   // for(let i=0;i<conflictStatesAndRulesList.length;i++){
  //   //   var conflictStatesAndRules:ConflictStateAndRules=conflictStatesAndRulesList[i];
  //   //   if(statesCauseRules.length===conflictStatesAndRules.conflcitStates.length){
  //   //     var newStatesCauseRules:Array<StateAndRuleAndCauseRule>=[];
  //   //     second:
  //   //     for(let j=0;j<conflictStatesAndRules.conflcitStates.length;j++){
  //   //       third:
  //   //       for(let k=0;k<statesCauseRules.length;k++){
  //   //         if(conflictStatesAndRules.conflcitStates[j]===statesCauseRules[k].stateName){
  //   //           newStatesCauseRules.push(statesCauseRules[k]);
  //   //           break third;
  //   //         }
  //   //       }
  //   //     }
  //   //     if(newStatesCauseRules.length===statesCauseRules.length){
  //   //       var ruleList:Array<Array<RuleAndCause>>=[]
  //   //       for(let j=0;j<newStatesCauseRules.length;j++){

  //   //       }
  //   //       break first;
  //   //     }
  //   //   }
  //   // }
  //   var exist=false;
  //   for(let i=0;i<conflictStatesAndRulesList.length;i++){
  //     if(statesCauseRules.length===conflictStatesAndRulesList[i].length){
  //       var conflictStatesAndRules=conflictStatesAndRulesList[i];
  //       var newStatesCauseRules:Array<StateAndRuleAndCauseRule>=[];
  //       for(let j=0;j<conflictStatesAndRules.length;j++){
  //         for(let k=0;k<statesCauseRules.length;k++){
  //           if(conflictStatesAndRules[j].stateName===statesCauseRules[k].stateName){
              
  //           }
  //         }
  //       }
  //     }
  //   }
  // }

  frequentChangeDetail() {
    // document.getElementById("device_detail_button")!.style.display="none";
    // document.getElementById("conflict_information")!.style.display="none";
    // document.getElementById("change_frequent_information")!.style.display="block";
    // document.getElementById("cannot_off_information")!.style.display="none";
    // document.getElementById("consumption_information")!.style.display="none";
    this.deviceDetailButtonShow = "none";
    this.conflictDetailShow = "none";
    this.frequentChangeDetailShow = "block";
    this.cannotOffDetailShow = "none";
    this.consumptionDetailShow = "none";

    // var stateChanges:StateChangeFast[]=this.selectedDevice.statesChange.stateChangeFasts;

    var frequentChangeStartTime: number = 0;

    const frequentChangeChart = echarts.init(document.getElementById('changeFrequentId')!);
    console.log(frequentChangeChart);
    console.log(frequentChangeChart.getOption());
    frequentChangeChart.on('click', function (params: any) {
      console.log(params);
      if (params.componentIndex === 1) {
        var startTime: number = params.data[0];
        frequentChangeStartTime = startTime
      }
    })

    // var stateChangeFasts = this.selectedDevice.statesChange.stateChangeFasts;
    // if(stateChangeFasts.length>0){
    //   var stateChangeFast = stateChangeFasts[0];
    //   this.sceneService.analysisStatesChangeFrequently(stateChangeFasts, stateChangeFast, this.triggeredRulesName, this.selectedDevice.deviceStateName).subscribe(wholeAndCurrentChangeCauseRule => {
    //     console.log(wholeAndCurrentChangeCauseRule);
    //     this.frequentChangeTimeStateRuleList=this.deviceAnalysisService.fastChangeCauseRules(wholeAndCurrentChangeCauseRule.wholeStateChangesCauseRules)
    //   })
    // }

    // setInterval(() => {
    //   if(this.deviceNameCha!=this.selectedDevice.deviceName){
    //     this.deviceNameCha=this.selectedDevice.deviceName;
    //     var stateChangeFasts = this.selectedDevice.statesChange.stateChangeFasts;
    //     console.log("hasStateChangeFasts?")
    //     console.log(stateChangeFasts)
    //     if(stateChangeFasts.length>0){
    //       document.getElementById("frequency_analysis")!.style.display="block"
    //       var stateChangeFast = stateChangeFasts[0];
    //       this.sceneService.analysisStatesChangeFrequently(stateChangeFasts, stateChangeFast, this.triggeredRulesName, this.selectedDevice.deviceStateName).subscribe(wholeAndCurrentChangeCauseRule => {
    //         console.log(wholeAndCurrentChangeCauseRule);
    //         this.frequentChangeTimeStateRuleList=this.deviceAnalysisService.fastChangeCauseRules(wholeAndCurrentChangeCauseRule.wholeStateChangesCauseRules)
    //         this.deviceAnalysisService.frequentChangeAnalysis(this.frequentChangeTimeStateRuleList)
    //         this.stateRuleListList=this.deviceAnalysisService.frequentChangeAnalysisAll(this.frequentChangeTimeStateRuleList);
    //       })
    //     }else{
    //       console.log("frequency_analysis?")
    //       document.getElementById("frequency_analysis")!.style.display="none"
    //     }
    //   }
    //   /////////////////////这块是点击某个点显示////////////////////
    //   // if (this.frequentChangeStartTime != frequentChangeStartTime) {
    //   //   this.frequentChangeStartTime = frequentChangeStartTime;
    //   //   var stateChangeFasts = this.selectedDevice.statesChange.stateChangeFasts;
    //   //   for (let i = 0; i < stateChangeFasts.length; i++) {
    //   //     var stateChangeFast = this.selectedDevice.statesChange.stateChangeFasts[i];
    //   //     if (stateChangeFast.startTimeValue[0] === this.frequentChangeStartTime) {
    //   //       //////////////////////////寻找规则///////////////////
    //   //       this.sceneService.analysisStatesChangeFrequently(stateChangeFasts, stateChangeFast, this.triggeredRulesName, this.selectedDevice.deviceStateName).subscribe(wholeAndCurrentChangeCauseRule => {
    //   //         console.log(wholeAndCurrentChangeCauseRule);
    //   //         this.fastChangeCauseRules(wholeAndCurrentChangeCauseRule)
    //   //       })
    //   //       break;
    //   //     }
    //   //   }
    //   //   frequentChangeStartTime = 0;
    //   //   this.frequentChangeStartTime = 0;
    //   // }
    // }, 1000)
  }

  // /////////////////////分段分析////////////////////////
  // frequentChangeAnalysis(timeStateRelativeRulesListList: Array<Array<TimeStateRelativeRules>>){
  //   var stateRuleListList:Array<Array<StateRules>>=[];
  //   for(let i=0;i<timeStateRelativeRulesListList.length;i++){
  //     var stateRuleList:Array<StateRules>=[];
  //     for(let j=0;j<timeStateRelativeRulesListList[i].length;j++){
  //       if(j===0){
  //         continue;
  //       }
  //       var exist=false;
  //       third:
  //       for(let k=0;k<stateRuleList.length;k++){
  //         if(this.timeStateRulesEqual(timeStateRelativeRulesListList[i][j],stateRuleList[k])){
  //           exist=true;
  //           stateRuleList[k].count++;
  //           break third;
  //         }
  //       }
  //       if(!exist){
  //         stateRuleList.push({
  //           stateName:timeStateRelativeRulesListList[i][j].stateName,
  //           causeRules:timeStateRelativeRulesListList[i][j].relativeRules,
  //           count:1
  //         })
  //       }
  //     }
  //     stateRuleListList.push(stateRuleList)
  //   }
  //   console.log("stateRuleListList")
  //   console.log(stateRuleListList)
  // }

  // ////////////////////////////总的分析/////////////////////
  // frequentChangeAnalysisAll(timeStateRelativeRulesListList: Array<Array<TimeStateRelativeRules>>){
  //   var stateRuleList:Array<StateRules>=[];
  //   for(let i=0;i<timeStateRelativeRulesListList.length;i++){
  //     for(let j=0;j<timeStateRelativeRulesListList[i].length;j++){
  //       if(j===0){
  //         continue;
  //       }
  //       var exist=false;
  //       third:
  //       for(let k=0;k<stateRuleList.length;k++){
  //         if(this.timeStateRulesEqual(timeStateRelativeRulesListList[i][j],stateRuleList[k])){
  //           exist=true;
  //           stateRuleList[k].count++;
  //           break third;
  //         }
  //       }
  //       if(!exist){
  //         //////////////////如果导致一个状态发生的规则之间有冲突，则不考虑
  //         var ruleExistContra=false;
  //         forth:
  //         for(let n=0;n<timeStateRelativeRulesListList[i][j].relativeRules.length;n++){
  //           for(let m=0;m<timeStateRelativeRulesListList[i][j].relativeRules.length;m++){
  //             if(n!=m){
  //               if(this.existRuleContra(timeStateRelativeRulesListList[i][j].relativeRules[n],timeStateRelativeRulesListList[i][j].relativeRules[m])){
  //                 ruleExistContra=true;
  //                 break forth;
  //               }
  //             }
  //           }
  //         }
  //         if(!ruleExistContra){
  //           stateRuleList.push({
  //             stateName:timeStateRelativeRulesListList[i][j].stateName,
  //             causeRules:timeStateRelativeRulesListList[i][j].relativeRules,
  //             count:1
  //           })
  //         }

  //       }
  //     }
  //   }
  //   console.log("allFrequentChangeAnalysis stateRuleList")
  //   console.log(stateRuleList)
  //   var stateRuleListList:Array<Array<StateRules>>=[];
  //   for(let i=0;i<stateRuleList.length;i++){
  //     var exist=false;
  //     second:
  //     for(let j=0;j<stateRuleListList.length;j++){
  //       if(stateRuleList[i].stateName===stateRuleListList[j][0].stateName){
  //         stateRuleListList[j].push(stateRuleList[i]);
  //         exist=true;
  //         break second;
  //       }
  //     }
  //     if(!exist){
  //       var newStatRuleList:Array<StateRules>=[];
  //       newStatRuleList.push(stateRuleList[i]);
  //       stateRuleListList.push(newStatRuleList)
  //     }
  //   }

  //   console.log("newAllStateRuleListList")
  //   console.log(stateRuleListList)
  //   this.stateRuleListList=stateRuleListList;
  // }

  //           //////////////////如果导致一个状态发生的规则之间有冲突，则不考虑
  // existRuleContra(rule1:Rule,rule2:Rule):boolean{
  //   var triggers1:Array<string>=rule1.trigger;
  //   var triggers2:Array<string>=rule2.trigger;
  //   var attrVals1:Array<Array<string>>=[];
  //   for(let i=0;i<triggers1.length;i++){
  //     attrVals1.push(this.sceneService.getTriggerAttrVal(triggers1[i]));
  //   }
  //   for(let i=0;i<triggers2.length;i++){
  //     var attrVal2=this.sceneService.getTriggerAttrVal(triggers2[i]);
  //     for(let j=0;j<attrVals1.length;j++){
  //       if(this.sceneService.triggerExistContra(attrVal2,attrVals1[j])){
  //         return true;
  //       }
  //     }
  //   }
  //   return false;
  // }

  // timeStateRulesEqual(timeStateRelativeRules:TimeStateRelativeRules,stateRules:StateRules):boolean{
  //   if(timeStateRelativeRules.stateName!=stateRules.stateName){
  //     return false;
  //   }
  //   if(!this.ruleEqual(timeStateRelativeRules.relativeRules,stateRules.causeRules)){
  //     return false;
  //   }
  //   return true;
  // }

  // ruleEqual(rules1:Array<Rule>,rules2:Array<Rule>):boolean{
  //   if(rules1.length!=rules2.length){
  //     return false;
  //   }
  //   for(let i=0;i<rules1.length;i++){
  //     var exist=false;
  //     for(let j=0;j<rules2.length;j++){
  //       if(rules1[i].ruleName===rules2[j].ruleName){
  //         exist=true;
  //         break;
  //       }
  //     }
  //     if(!exist){
  //       return false;
  //     }
  //   }
  //   return true;
  // }


  cannotOffDetail() {
    // document.getElementById("device_detail_button")!.style.display="none";
    // document.getElementById("conflict_information")!.style.display="none";
    // document.getElementById("change_frequent_information")!.style.display="none";
    // document.getElementById("cannot_off_information")!.style.display="block";
    // document.getElementById("consumption_information")!.style.display="none";
    this.deviceDetailButtonShow = "none";
    this.conflictDetailShow = "none";
    this.frequentChangeDetailShow = "none";
    this.cannotOffDetailShow = "block";
    this.consumptionDetailShow = "none";
  }

  consumptionDetail() {
    // document.getElementById("device_detail_button")!.style.display="none";
    // document.getElementById("conflict_information")!.style.display="none";
    // document.getElementById("change_frequent_information")!.style.display="none";
    // document.getElementById("cannot_off_information")!.style.display="none";
    // document.getElementById("consumption_information")!.style.display="block";
    this.deviceDetailButtonShow = "none";
    this.conflictDetailShow = "none";
    this.frequentChangeDetailShow = "none";
    this.cannotOffDetailShow = "none";
    this.consumptionDetailShow = "block";
  }


  twoDevimals(valueStr: string): string {
    var valueNum = parseFloat(valueStr);
    return valueNum.toFixed(2);
  }


  onSelectConflictTime(conflictTime: ConflictTime) {
    this.deviceStateName = this.selectedDevice.deviceStateName;
    if (this.conflictStateTime != conflictTime) {
      this.conflictStateTime = conflictTime;
      // this.sceneService.analysisStatesConflict(this.conflictStateTime, this.triggeredRulesName, this.deviceStateName, this.rules, this.uploadedFileName)
      //   .subscribe(stateCauseRulesAndRelativeRules => {

      //     console.log(stateCauseRulesAndRelativeRules);

      //   })
    } else {
      this.conflictStateTime = null;
    }
  }

  getFrequency(stateChangeCount: number, equivalentTime: string): string {
    var time = parseFloat(equivalentTime);
    return (stateChangeCount / time).toFixed(2);
  }


  conflictCauseRules(stateCauseRulesAndRelativeRules: StateAndRuleAndCauseRule) {

  }

  // fastChangeCauseRules(wholeAndCurrentChangeCauseRule: WholeAndCurrentChangeCauseRule) {
  //   // StateChangeCauseRules
  //   var timeStateRelativeRulesListList: Array<Array<TimeStateRelativeRules>> = [];
  //   first:
  //   for (let i = 0; i < wholeAndCurrentChangeCauseRule.wholeStateChangesCauseRules.length;) {
  //     // console.log(wholeAndCurrentChangeCauseRule.wholeStateChangesCauseRules.length)
  //     var stateChangeCauseRules = wholeAndCurrentChangeCauseRule.wholeStateChangesCauseRules[i];
  //     var timeStateRelativeRulesList: Array<TimeStateRelativeRules> = [];
  //     timeStateRelativeRulesList.push(stateChangeCauseRules.start);
  //     timeStateRelativeRulesList.push(stateChangeCauseRules.middle);
  //     timeStateRelativeRulesList.push(stateChangeCauseRules.end);
  //     if (i < wholeAndCurrentChangeCauseRule.wholeStateChangesCauseRules.length - 1) {
  //       var j = i + 1;
  //       second:
  //       for (; j < wholeAndCurrentChangeCauseRule.wholeStateChangesCauseRules.length; j++) {
  //         var nextStateChangeCauseRules = wholeAndCurrentChangeCauseRule.wholeStateChangesCauseRules[j];
  //         i = j;
  //         if (nextStateChangeCauseRules.start.time < stateChangeCauseRules.end.time) {
  //           timeStateRelativeRulesList.push(nextStateChangeCauseRules.end);
  //           stateChangeCauseRules = nextStateChangeCauseRules;
  //         } else {
  //           timeStateRelativeRulesListList.push(timeStateRelativeRulesList);

  //           break second;
  //         }
  //       }
  //       if (j === wholeAndCurrentChangeCauseRule.wholeStateChangesCauseRules.length) {
  //         timeStateRelativeRulesListList.push(timeStateRelativeRulesList);
  //         i = j;
  //       }


  //     } else {

  //       timeStateRelativeRulesListList.push(timeStateRelativeRulesList);


  //       i++;
  //     }
  //   }
  //   console.log(timeStateRelativeRulesListList)
  //   this.frequentChangeTimeStateRuleList=timeStateRelativeRulesListList;
    
  //   // this.getFrequentChangeAnalysisOption(timeStateRelativeRulesListList);
  //   // var frequentChangeAnalysisChart = echarts.init(document.getElementById("frequency_option_id"));
  //   // console.log(this.frequentChangeAnalysisOption);

  //   // setTimeout(() => {
  //   //   frequentChangeAnalysisChart.setOption(this.frequentChangeAnalysisOption, true)
  //   // }, 2000)
  // }

  getFrequentChangeAnalysisOption(timeStateRelativeRulesListList: Array<Array<TimeStateRelativeRules>>) {
    var dataNodes = [];
    var dataLinks = [];
    var legendData = [];
    var categories = [];
    for (let n = 0; n < this.selectedDevice.deviceStateName.stateNames.length; n++) {
      var category = this.selectedDevice.deviceStateName.stateNames[n].stateName;
      legendData.push(category);
      categories.push({
        name: category
      })
    }
    console.log(legendData)
    for (let i = 0; i < timeStateRelativeRulesListList.length; i++) {
      var timeStateRelativeRulesList = timeStateRelativeRulesListList[i];

      for (let j = 0; j < timeStateRelativeRulesList.length; j++) {
        var name = timeStateRelativeRulesList[j].time.toFixed(2) + '\n' + timeStateRelativeRulesList[j].stateName;
        var stateName = timeStateRelativeRulesList[j].stateName;
        var categoryNum = 0;
        cateNum:
        for (let l = 0; l < legendData.length; l++) {
          if (stateName === legendData[l]) {
            categoryNum = l;
            break cateNum;
          }
        }
        dataNodes.push({
          name: name,
          x: j,
          y: i + 1,
          lable: {
            fontSize: 3
          },
          category: categoryNum
        })
        if (j > 0) {
          var lastName = timeStateRelativeRulesList[j - 1].time.toFixed(2) + '\n' + timeStateRelativeRulesList[j - 1].stateName;
          dataLinks.push({
            source: lastName,
            target: name,
            label: {
              formatter: function () {
                var label = ""
                for (let k = 0; k < timeStateRelativeRulesList[j].relativeRules.length; k++) {
                  label = label + timeStateRelativeRulesList[j].relativeRules[k].ruleName + "\n";
                  console.log("j:" + j + "k:" + k + label)
                }
                return label;
              },
              show: true,
              fontSize: 10
            }
          })
        }
      }
    }

    this.frequentChangeAnalysisOption = {
      title: {
        text: 'Graph 简单示例'
      },
      tooltip: {},
      legend: {
        data: legendData
      },
      animationDurationUpdate: 100,
      animationEasingUpdate: 'quinticInOut',
      series: [
        {
          type: 'graph',
          layout: 'none',
          symbolSize: 10,
          label: {
            show: false
          },
          roam: true,
          edgeSymbol: ['circle', 'arrow'],
          edgeSymbolSize: [1, 5],


          data: dataNodes,
          links: dataLinks,
          lineStyle: {
            opacity: 0.9,
            width: 1,
            curveness: 0
          },
          categories: categories



        }
      ]
    }

  }

  getRuleContent(ruleContent:string):string{
    return ruleContent.substring(ruleContent.indexOf("IF"));
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
