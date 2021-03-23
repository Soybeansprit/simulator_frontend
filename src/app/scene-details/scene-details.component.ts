import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {ActivatedRoute} from '@angular/router'
import * as echarts from 'echarts';
import {Scene,DeviceAnalysResult,DeviceConflict,StatesChange,DeviceStateTime,DeviceCannotOff,DeviceStateName,
  ConflictTime,StateChangeFast,StateLastTime,StateNameRelativeRule,Rule} from "../class/scene";
import {SceneService} from "../service/scene.service";
import { GenerateModelParameters } from '../class/generate-model-parameters';
import { MainData } from '../provider/main-data';
import {Router, NavigationExtras} from "@angular/router";
import { ScenesTree } from '../class/scenes-tree';
import { EchartsAllScenesComponent } from '../echarts-all-scenes/echarts-all-scenes.component';

@Component({
  selector: 'app-scene-details',
  templateUrl: './scene-details.component.html',
  styleUrls: ['./scene-details.component.css']
})
export class SceneDetailsComponent implements OnInit {

  ifdPath=""
  
  scene:Scene|null=null;
  rulesOptions:any;
  rulesBarOptions:any;

  scenes: Array<Scene>=new Array<Scene>();
  selectedSceneName!:string;
  simulationTime:string="";
  generateModelParameters:GenerateModelParameters|null=null;
  scenesTree:ScenesTree;
  ruleText:string;
  uploadedFileName:string;
  sceneNum!:string;

  equivalentTime:string="24";
  intervalTime:string="300";

  devices:DeviceAnalysResult[]=[];
  selectedDevice:DeviceAnalysResult|null=null;
  conflictOption:any;
  changeFrequentOption:any;


  constructor(private location: Location,public sceneService:SceneService,
    private routeInfo:ActivatedRoute,public mainData:MainData,public router:Router) { 
      this.simulationTime=this.mainData.storage.simulationTime;
      this.scenes=this.mainData.storage.scenes;
      this.generateModelParameters=this.mainData.storage.generateModelParameters;
      this.selectedSceneName=this.mainData.storage.selectedSceneName;
      this.scenesTree=this.mainData.storage.scenesTree;
      this.ruleText=this.mainData.storage.ruleText;
      this.uploadedFileName=this.mainData.storage.uploadedFileName
    }

  ngOnInit(): void {
    // document.getElementById("rule-time")!.style.display="none";
    // document.getElementById("device-time")!.style.display="none";

    if(this.selectedSceneName!=""){
      console.log(this.scenes)
      this.sceneNum=getSceneNum(this.selectedSceneName);
      for(let i=0;i<this.scenes.length;i++){
        if(this.scenes[i].sceneName===this.selectedSceneName){
          this.scene=this.scenes[i];
          break;
        }
      }
    }
    document.getElementById("ifd")!.style.display="none";
    document.getElementById("scene")!.style.display="flex";
    document.getElementById("scene_rule")!.style.display="none";
    document.getElementById("scene_device")!.style.display="none";

    function getSceneNum(sceneName:string):string{
      var sceneNum=sceneName.replace("random-scene","-");
      return sceneNum;
    }

  }


  showIFD(){
    var path="./assets/IFD.png";
    this.ifdPath=path;
    document.getElementById("ifd")!.style.display="block";
    document.getElementById("scene")!.style.display="none";
    
  }
  goBack(): void {
    this.location.back();
  }

  goBackToMain(){
    this.mainData.storage={
      generateModelParameters:this.generateModelParameters,
      scenes:this.scenes,
      selectedSceneName:"",
      simulationTime:this.simulationTime,
      scenesTree:this.scenesTree,
      ruleText:this.ruleText,
      uploadedFileName:this.uploadedFileName
    }
    this.router.navigate(["main"]);
  }

  toRuleAnalysis(){
 
      
        
      this.mainData.storage = {
        generateModelParameters: this.generateModelParameters,
        scenes: this.scenes,
        selectedSceneName: this.selectedSceneName,
        simulationTime: this.simulationTime,
        scenesTree: this.scenesTree,
        ruleText: this.ruleText,
        uploadedFileName: this.uploadedFileName
      }
      this.router.navigate(["rule-analysis"]);
    

  }

  showRules(){
    document.getElementById("ifd")!.style.display="none";
    document.getElementById("scene")!.style.display="flex";
    document.getElementById("scene_rule")!.style.display="block";
    if(this.scene!=null){
      this.sceneService.getRulesEchartsOption(this.scene!,this.simulationTime,this.generateModelParameters!.rules).subscribe(option=>{
        this.rulesOptions=option
      })
      this.sceneService.getRuleBarEchartOption(this.scene!).subscribe(option=>{
        this.rulesBarOptions=option;
      })
    }

    const ruleBarChart=echarts.init(document.getElementById("rule_bar"));
    ruleBarChart.on('click',function(params){
      console.log(ruleBarChart.getOption())
    })

    
    
    // document.getElementById("device-time")!.style.display="none";
    
  }
  showDevices(){
    // document.getElementById("rule-time")!.style.display="none";
    // document.getElementById("device-time")!.style.display="none";
    document.getElementById("ifd")!.style.display="none";
    document.getElementById("scene")!.style.display="flex";
    document.getElementById("scene_device")!.style.display="block";
    if(this.scene!=null && this.generateModelParameters!=null){
      if(this.equivalentTime!=""&&this.intervalTime!=""){
        this.sceneService.getDeviceAnalysisResult(this.scene,this.generateModelParameters.rules,this.simulationTime,this.uploadedFileName,this.equivalentTime,this.intervalTime).subscribe(scene=>{
          this.scene=scene;
          console.log(scene);
          this.devices=this.scene.devicesAnalysResults;
        })
      }

    }
  }

  // analysDevice(){
  //   if(this.scene!=null && this.generateModelParameters!=null){
  //     this.sceneService.getDeviceAnalysisResult(this.scene,this.generateModelParameters.rules,this.simulationTime,this.uploadedFileName,"24","300").subscribe(scene=>{
  //       this.scene=scene;
  //       console.log(scene);
  //     })
  //   }
    
  // }

  onSelect(device:DeviceAnalysResult){
    if(this.selectedDevice===device){
      this.selectedDevice=null;
    }else{
      this.selectedDevice=device;
      this.getConflictOption();
      this.getChangeFrequentOption();
    }
  }

  // getChangeFrequentOption(){
  //   var deviceStatesData:number[][]=[];
  //   if(this.selectedDevice!=null){
  //     for(let i=0;i<this.scene?.datasTimeValue.length!;i++){
  //       if(this.scene?.datasTimeValue[i].name===this.selectedDevice.deviceName){
  //         deviceStatesData=this.scene.datasTimeValue[i].timeValue;
  //         break;
  //       }
  //     }
  //   }
    
  //   var deviceStateName=this.selectedDevice?.deviceStateName.stateNames;


  //   this.changeFrequentOption={
  //     title:{
  //       text:'Frequency of States Change',
  //       top:'top',
  //       left:'center'

  //     },
  //     tooltip:{
  //       show:true,
  //       trigger: 'axis',
  //       axisPointer: {
  //           animation: false
  //       },
  //       formatter:function(params:any){
  //         var content="";
  //         var dataValues:number[]=[];
  //         var time:string=params[0].marker+'<b>time</b>: '+params[0].axisValueLabel;
  //         for(let i=0;i<params.length;i++){
  //           var dataValue=params[i].data[1];
  //           var exist=false;
  //           for(let j=0;j<dataValues.length;j++){
  //             if(dataValue===dataValues[j]){
  //               exist=true;
  //             }
  //           }
  //           if(!exist){
  //             dataValues.push(dataValue);
  //           }
  //         }
  //         var states:string=params[0].marker+'<b>state</b>:';
  //         for(let i=0;i<dataValues.length;i++){
  //           for(let j=0;j<deviceStateName?.length!;j++){
  //             var stateValue=parseInt(deviceStateName![j].stateValue);
  //             if(stateValue===dataValues[i]){
  //               states=states+" "+deviceStateName![j].stateName
                
  //             }
  //           }
  //         }
  //         content=time+'<br/>'+states;
  //         return content;

  //       }
  //     },
  //     xAxis:{
  //       name:'time/s',
  //       min:0,
  //       max:parseFloat(this.simulationTime),

  //     },
  //     yAxis:{
  //       name:'state',
  //       splitNumber:this.selectedDevice?.deviceStateName.stateNames.length!-1,
  //       min:0,
  //       max:this.selectedDevice?.deviceStateName.stateNames.length!-1,
  //       type:'value',
  //       axisLabel:{
  //         formatter:function(value:number){
  //           var label:string="";
  //           for(let i=0;i<deviceStateName?.length!;i++){
  //             var stateValue=parseInt(deviceStateName![i].stateValue);
  //             if(stateValue===value){
  //               label=deviceStateName![i].stateName
  //               break;
  //             }
  //           }
  //           return label+'-'+value
  //         }
  //       }
  //     },
  //     series:{
  //       data:deviceStatesData,
  //       type:'line',
  //       showSymbol:false

  //     }
  //   }
    
  // }

  getChangeFrequentOption(){
    var deviceStatesData:number[][]=[];
    var frequentChangeData=[];
    var frequentChangeContent:StateChangeFast[]=[];
    var frequentValue:number=(this.selectedDevice?.deviceStateName.stateNames.length!-1)/2
    if(this.selectedDevice!=null){
      for(let i=0;i<this.scene?.datasTimeValue.length!;i++){
        if(this.scene?.datasTimeValue[i].name===this.selectedDevice.deviceName){
          deviceStatesData=this.scene.datasTimeValue[i].timeValue;
          break;
        }
      }
      for(let i=0;i<this.selectedDevice.statesChange.stateChangeFasts.length;i++){
        var startTime=this.selectedDevice.statesChange.stateChangeFasts[i].startTimeValue[0];
        frequentChangeData.push([startTime,frequentValue]);
        frequentChangeContent.push(this.selectedDevice.statesChange.stateChangeFasts[i]);
      }
    }
    
    var deviceStateName=this.selectedDevice?.deviceStateName.stateNames;


    this.changeFrequentOption={
      title:{
        text:'Frequency of States Change',
        top:'top',
        left:'center'

      },
      legend:{
        data:['state','frequent change'],
        right:10
      },
      tooltip:{
        show:true,
        trigger: 'axis',
        axisPointer: {
            animation: false
        },
        formatter:function(params:any){
          var content="";
          var dataValues:number[]=[];
          var time:string=params[0].marker+'<b>time</b>: '+params[0].axisValueLabel;
          for(let i=0;i<params.length;i++){
            if(params[i].componentSubType==="line"){
              var dataValue=params[i].data[1];
              var exist=false;
              for(let j=0;j<dataValues.length;j++){
                if(dataValue===dataValues[j]){
                  exist=true;
                }
              }
              if(!exist){
                dataValues.push(dataValue);
              }
            }
            
          }
          var states:string=params[0].marker+'<b>state</b>:';
          for(let i=0;i<dataValues.length;i++){
            for(let j=0;j<deviceStateName?.length!;j++){
              var stateValue=parseInt(deviceStateName![j].stateValue);
              if(stateValue===dataValues[i]){
                states=states+" "+deviceStateName![j].stateName
                
              }
            }
          }
          content=time+'<br/>'+states;
          return content;

        }
      },
      xAxis:{
        name:'time/s',
        min:0,
        max:parseFloat(this.simulationTime),

      },
      yAxis:[{
        name:'state',
        splitNumber:this.selectedDevice?.deviceStateName.stateNames.length!-1,
        min:0,
        max:this.selectedDevice?.deviceStateName.stateNames.length!-1,
        type:'value',
        axisLabel:{
          formatter:function(value:number){
            var label:string="";
            for(let i=0;i<deviceStateName?.length!;i++){
              var stateValue=parseInt(deviceStateName![i].stateValue);
              if(stateValue===value){
                label=deviceStateName![i].stateName
                break;
              }
            }
            return label+'-'+value
          }
        }
      },{
        type:'value',
        splitNumber:2,
        axisLabel:{
          formatter:function(value:number){
            var label:string="";
            if(value===frequentValue){
              label='change fast'
            }
            return label
          }
        }
      }],
      series:[{
        name:'state',
        data:deviceStatesData,
        type:'line',
        showSymbol:false,
        lineStyle:{
          width:1
        },
        zlevel:0

      },{
        name:'frequent change',
        data:frequentChangeData,
        type:'scatter',
        symbol:'circle',
        zlevel:1
        
      }]
    }
    
  }

  getConflictOption(){
    var data=[];
    if(this.selectedDevice!=null){
      for(let i=0;i<this.selectedDevice.statesConflict.conflictTimes.length;i++){
        var conflictTime=parseFloat(this.selectedDevice.statesConflict.conflictTimes[i].conflictTime);
        data.push({
          value:[conflictTime,1],
          label:{
            show:true,
            offset:[0,-8],
            formatter:(i+1)+"",
            fontSize:10
          }
        });
      }
    }
    
    this.conflictOption={
      title:{
        text:'States Conflict: '+data.length+' times',
        top:'top',
        left:'center',
        textStyle:{
          color:'#FF3030'
        }
      },
      tooltip:{
        show:true,
        trigger:'item',
        triggerOn:'mousemove',
        formatter:function (params: any) {
          return params.marker + '<b>states conflict</b> at : <br/>  ' +'<b>'+params.marker +params.value[0].toFixed(2)+'</b>' ;
        }
      },
      xAxis:{
        name:"time/s",
        min:0,
        max:parseFloat(this.simulationTime),
        splitLine:{
          show:false
        }
      },
      yAxis: {
        splitNumber:1,
        type:'value',
        axisLabel:{
          formatter:function(value:number){
            var label:string="";
            if(value===1){
              label='conflict'
            }
            return label
          }
        }
      },
      legend:{
        right:10,
        data:'conflict'
      },
    series: [{
        symbolSize: 10,
        symbol:'image://data:image/gif;base64,R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKUE1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7',
        data: data,
        type: 'scatter'
    }]
    }
  }


}
