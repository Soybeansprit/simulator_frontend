import { Component, Input, OnInit } from '@angular/core';
import {DeviceResult} from '../class/device-result';
import * as echarts from 'echarts';
import * as $ from "jquery";
import {Scene,DeviceAnalysResult,DeviceConflict,StatesChange,DeviceStateTime,DeviceCannotOff,DeviceStateName,
  ConflictTime,StateChangeFast,StateLastTime,StateNameRelativeRule,Rule, DataTimeValue, StateChangeCauseRuleInput, StateAndRuleAndCauseRule, WholeAndCurrentChangeCauseRule, TimeStateRelativeRules} from "../class/scene";
import { MainData } from '../provider/main-data';
import { GenerateModelParameters } from '../class/generate-model-parameters';
import {SceneService} from "../service/scene.service";
import { data } from 'jquery';

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

  deviceDetailButtonShow:string="block";
  conflictDetailShow:string="none";
  frequentChangeDetailShow:string="none";
  cannotOffDetailShow:string="none";
  consumptionDetailShow:string="none";

  @Input() selectedDevice!:DeviceAnalysResult;
  @Input() triggeredRulesName:Array<DataTimeValue>=new Array<DataTimeValue>();
  @Input() uploadedFileName!:string;
  @Input() rules:Array<Rule>=new Array<Rule>();
  @Input() simulationTime:string="";
  @Input() equivalentTime:string="";

  conflictStateTime:ConflictTime|null=null;
  deviceStateName!:DeviceStateName

  @Input() conflictOption:any;
  @Input() changeFrequentOption:any;
  conflictTime:string="";
  frequentChangeStartTime:number=0;

  frequentChangeAnalysisOption:any;
  // stateChanges:StateChangeFast[]=this.selectedDevice.statesChange.stateChangeFasts;

 





  constructor(public sceneService:SceneService,public mainData:MainData) { 
    console.log("device-detailes:")
    console.log(this.mainData)
  }

  ngOnInit(): void {

    // document.getElementById("device_detail_button")!.style.display="block";
    // document.getElementById("conflict_information")!.style.display="none";
    // document.getElementById("change_frequent_information")!.style.display="none";
    // document.getElementById("cannot_off_information")!.style.display="none";
    // document.getElementById("consumption_information")!.style.display="none";

      

      this.deviceDetailButtonShow="block";
      this.conflictDetailShow="none";
      this.frequentChangeDetailShow="none";
      this.cannotOffDetailShow="none";
      this.consumptionDetailShow="none";

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



  }

  showDeviceDetailButton(){
    // document.getElementById("device_detail_button")!.style.display="block";
    // document.getElementById("conflict_information")!.style.display="none";
    // document.getElementById("change_frequent_information")!.style.display="none";
    // document.getElementById("cannot_off_information")!.style.display="none";
    // document.getElementById("consumption_information")!.style.display="none";
    this.deviceDetailButtonShow="block";
    this.conflictDetailShow="none";
    this.frequentChangeDetailShow="none";
    this.cannotOffDetailShow="none";
    this.consumptionDetailShow="none";
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



  conflictDetail(){
    // document.getElementById("device_detail_button")!.style.display="none";
    // document.getElementById("conflict_information")!.style.display="block";
    // document.getElementById("change_frequent_information")!.style.display="none";
    // document.getElementById("cannot_off_information")!.style.display="none";
    // document.getElementById("consumption_information")!.style.display="none";
    this.deviceDetailButtonShow="none";
    this.conflictDetailShow="block";
    this.frequentChangeDetailShow="none";
    this.cannotOffDetailShow="none";
    this.consumptionDetailShow="none";

    var conflictTime:string="";
    // this.getConflictOption();

    const conflictChart = echarts.init(document.getElementById("conflictOptionId"));
    console.log(conflictChart)
    
    conflictChart.on('click', function (params: any) {
      console.log(params);
      conflictTime=params.data[0]+"";
      console.log(conflictTime)
    })
    console.log(this.conflictTime)
    setInterval(() => {
      // console.log("sceNameOut"+sceName);
      if (this.conflictTime != conflictTime) {
        console.log("this.conflictTime"+this.conflictTime)
        console.log("conflictTime"+conflictTime)
        this.conflictTime = conflictTime;
        for(let i=0;i<this.selectedDevice.statesConflict.conflictTimes.length;i++){
          var conflictStateTime=this.selectedDevice.statesConflict.conflictTimes[i];
          if(conflictStateTime.conflictTime===this.conflictTime){
            this.sceneService.analysisStatesConflict(conflictStateTime,this.triggeredRulesName,this.selectedDevice.deviceStateName,this.rules,this.uploadedFileName)
            .subscribe(stateCauseRulesAndRelativeRules=>{
      
              console.log(stateCauseRulesAndRelativeRules);
            })
            break;
          }

        }
        this.conflictTime="";
        conflictTime=""

      }
    }, 1000)
  }

  frequentChangeDetail(){
    // document.getElementById("device_detail_button")!.style.display="none";
    // document.getElementById("conflict_information")!.style.display="none";
    // document.getElementById("change_frequent_information")!.style.display="block";
    // document.getElementById("cannot_off_information")!.style.display="none";
    // document.getElementById("consumption_information")!.style.display="none";
    this.deviceDetailButtonShow="none";
    this.conflictDetailShow="none";
    this.frequentChangeDetailShow="block";
    this.cannotOffDetailShow="none";
    this.consumptionDetailShow="none";

    // var stateChanges:StateChangeFast[]=this.selectedDevice.statesChange.stateChangeFasts;
    
    var frequentChangeStartTime:number=0;

    const frequentChangeChart=echarts.init(document.getElementById('changeFrequentId'));
    console.log(frequentChangeChart);
    console.log(frequentChangeChart.getOption());
    frequentChangeChart.on('click',function(params:any){
      console.log(params);
      if(params.componentIndex===1){
        var startTime:number=params.data[0];
        frequentChangeStartTime=startTime
      }
    })

    setInterval(()=>{
      if(this.frequentChangeStartTime!=frequentChangeStartTime){
        this.frequentChangeStartTime=frequentChangeStartTime;
        var stateChangeFasts=this.selectedDevice.statesChange.stateChangeFasts;
        for(let i=0;i<stateChangeFasts.length;i++){
          var stateChangeFast=this.selectedDevice.statesChange.stateChangeFasts[i];
          if(stateChangeFast.startTimeValue[0]===this.frequentChangeStartTime){
            //////////////////////////寻找规则///////////////////
            this.sceneService.analysisStatesChangeFrequently(stateChangeFasts,stateChangeFast,this.triggeredRulesName,this.selectedDevice.deviceStateName).subscribe(wholeAndCurrentChangeCauseRule=>{
              console.log(wholeAndCurrentChangeCauseRule);
              this.fastChangeCauseRules(wholeAndCurrentChangeCauseRule)
            })
            break;
          }
        }
        frequentChangeStartTime=0;
        this.frequentChangeStartTime=0;
      }
    },1000)
  }

  cannotOffDetail(){
    // document.getElementById("device_detail_button")!.style.display="none";
    // document.getElementById("conflict_information")!.style.display="none";
    // document.getElementById("change_frequent_information")!.style.display="none";
    // document.getElementById("cannot_off_information")!.style.display="block";
    // document.getElementById("consumption_information")!.style.display="none";
    this.deviceDetailButtonShow="none";
    this.conflictDetailShow="none";
    this.frequentChangeDetailShow="none";
    this.cannotOffDetailShow="block";
    this.consumptionDetailShow="none";
    console.log(this.selectedDevice.deviceCannotOff)
  }

  consumptionDetail(){
    // document.getElementById("device_detail_button")!.style.display="none";
    // document.getElementById("conflict_information")!.style.display="none";
    // document.getElementById("change_frequent_information")!.style.display="none";
    // document.getElementById("cannot_off_information")!.style.display="none";
    // document.getElementById("consumption_information")!.style.display="block";
    this.deviceDetailButtonShow="none";
    this.conflictDetailShow="none";
    this.frequentChangeDetailShow="none";
    this.cannotOffDetailShow="none";
    this.consumptionDetailShow="block";
  }


  twoDevimals(valueStr:string):string{
    var valueNum=parseFloat(valueStr);
    return valueNum.toFixed(2);
  }


  onSelectConflictTime(conflictTime:ConflictTime){
    this.deviceStateName=this.selectedDevice.deviceStateName;
    if(this.conflictStateTime!=conflictTime){
      this.conflictStateTime=conflictTime;
      this.sceneService.analysisStatesConflict(this.conflictStateTime,this.triggeredRulesName,this.deviceStateName,this.rules,this.uploadedFileName)
      .subscribe(stateCauseRulesAndRelativeRules=>{

        console.log(stateCauseRulesAndRelativeRules);

      })
    }else{
      this.conflictStateTime=null;
    }
  }

getFrequency(stateChangeCount:number,equivalentTime:string):string{
  var time=parseFloat(equivalentTime);
  return (stateChangeCount/time).toFixed(2);
}


conflictCauseRules(stateCauseRulesAndRelativeRules:StateAndRuleAndCauseRule){

}

fastChangeCauseRules(wholeAndCurrentChangeCauseRule:WholeAndCurrentChangeCauseRule){
  // StateChangeCauseRules
  var timeStateRelativeRulesListList:Array<Array<TimeStateRelativeRules>>=[];
  first:
  for(let i=0;i<wholeAndCurrentChangeCauseRule.wholeStateChangesCauseRules.length;){
    // console.log(wholeAndCurrentChangeCauseRule.wholeStateChangesCauseRules.length)
    var stateChangeCauseRules=wholeAndCurrentChangeCauseRule.wholeStateChangesCauseRules[i];
    var timeStateRelativeRulesList:Array<TimeStateRelativeRules>=[];
    timeStateRelativeRulesList.push(stateChangeCauseRules.start);
    timeStateRelativeRulesList.push(stateChangeCauseRules.middle);
    timeStateRelativeRulesList.push(stateChangeCauseRules.end);
    if(i<wholeAndCurrentChangeCauseRule.wholeStateChangesCauseRules.length-1){
      var j=i+1;
      second:      
      for(;j<wholeAndCurrentChangeCauseRule.wholeStateChangesCauseRules.length;j++){
        var nextStateChangeCauseRules=wholeAndCurrentChangeCauseRule.wholeStateChangesCauseRules[j];
        i=j;
        if(nextStateChangeCauseRules.start.time<stateChangeCauseRules.end.time){
          timeStateRelativeRulesList.push(nextStateChangeCauseRules.end);
          stateChangeCauseRules=nextStateChangeCauseRules;
        }else{
          timeStateRelativeRulesListList.push(timeStateRelativeRulesList);
          
          break second;
        }
      }
      if(j===wholeAndCurrentChangeCauseRule.wholeStateChangesCauseRules.length){
        timeStateRelativeRulesListList.push(timeStateRelativeRulesList);
        i=j;
      }


    }else{
      
        timeStateRelativeRulesListList.push(timeStateRelativeRulesList);
      
      
      i++;
    }
  }
  console.log(timeStateRelativeRulesListList)
  this.getFrequentChangeAnalysisOption(timeStateRelativeRulesListList);
  const frequentChangeAnalysisChart=echarts.init(document.getElementById("frequency_option_id"));
  console.log(this.frequentChangeAnalysisOption);
  setTimeout(()=>{
    frequentChangeAnalysisChart.setOption(this.frequentChangeAnalysisOption)
  },1000)
}

getFrequentChangeAnalysisOption(timeStateRelativeRulesListList:Array<Array<TimeStateRelativeRules>>){
  var dataNodes=[];
  var dataLinks=[];
  for(let i=0;i<timeStateRelativeRulesListList.length;i++){
    var timeStateRelativeRulesList=timeStateRelativeRulesListList[i];

    for(let j=0;j<timeStateRelativeRulesList.length;j++){
      var name=timeStateRelativeRulesList[j].time.toFixed(2)+'\n'+timeStateRelativeRulesList[j].stateName;
      dataNodes.push({
        name:name,
        x:j,
        y:i+1,
        lable:{
          fontSize:3
        }
      })
      if(j>0){
        var lastName=timeStateRelativeRulesList[j-1].time.toFixed(2)+'\n'+timeStateRelativeRulesList[j-1].stateName;
        dataLinks.push({
          source:lastName,
          target:name,
          label:{
            formatter:function(){
              var label=""
              for(let k=0;k<timeStateRelativeRulesList[j].relativeRules.length;k++){
                label=label+timeStateRelativeRulesList[j].relativeRules[k].ruleName+"\n";
              }
              return label;
            },
            show:true,
            fontSize:10
          }
        })
      }
    }
  }

  this.frequentChangeAnalysisOption={
    title: {
      text: 'Graph 简单示例'
    },
    tooltip: {},
    animationDurationUpdate: 1500,
    animationEasingUpdate: 'quinticInOut',
    series: [
      {
          type: 'graph',
          layout: 'none',
          symbolSize: 10,
          label:{
            show:false
          },
          roam: true,
          edgeSymbol: ['circle', 'arrow'],
          edgeSymbolSize: [1, 5],
                  
          
          data: dataNodes,
          links:dataLinks,
          lineStyle: {
            opacity: 0.9,
            width: 1,
            curveness: 0
          }
          
          
  
      }
    ]
  }

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
