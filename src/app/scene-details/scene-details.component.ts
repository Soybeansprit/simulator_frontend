import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {ActivatedRoute} from '@angular/router'

import {Scene,DeviceAnalysResult,DeviceConflict,StatesChange,DeviceStateTime,DeviceCannotOff,DeviceStateName,
  ConflictTime,StateChangeFast,StateLastTime,StateNameRelativeRule,Rule} from "../class/scene";
import {SceneService} from "../service/scene.service";


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

  selectedSceneName: string="";
  sceneNum!:string;

  devices:DeviceAnalysResult[]=[];
  selectedDevice:DeviceAnalysResult|null=null;


  constructor(private location: Location,public sceneService:SceneService,
    private routeInfo:ActivatedRoute) { }

  ngOnInit(): void {
    // document.getElementById("rule-time")!.style.display="none";
    // document.getElementById("device-time")!.style.display="none";

    this.selectedSceneName=this.routeInfo.snapshot.queryParams["selectedSceneName"];

    if(this.selectedSceneName!=""){
      this.sceneNum=getSceneNum(this.selectedSceneName);
      this.sceneService.getSelectedScene(this.selectedSceneName).subscribe(scene=>{
        console.log(scene);
        this.scene=scene;
      })
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
  showRules(){
    document.getElementById("ifd")!.style.display="none";
    document.getElementById("scene")!.style.display="flex";
    document.getElementById("scene_rule")!.style.display="block";
    if(this.scene!=null){
      this.sceneService.getRulesEchartsOption(this.scene!).subscribe(option=>{
        this.rulesOptions=option
      })
      this.sceneService.getRuleBarEchartOption(this.scene!).subscribe(option=>{
        this.rulesBarOptions=option;
      })
    }

    
    
    // document.getElementById("device-time")!.style.display="none";
    
  }
  showDevices(){
    // document.getElementById("rule-time")!.style.display="none";
    // document.getElementById("device-time")!.style.display="none";
    document.getElementById("ifd")!.style.display="none";
    document.getElementById("scene")!.style.display="flex";
    document.getElementById("scene_device")!.style.display="block";
    if(this.scene!=null){
      this.devices=this.scene.devicesAnalysResults;
    }
  }

  onSelect(device:DeviceAnalysResult){
    if(this.selectedDevice===device){
      this.selectedDevice=null;
    }else{
      this.selectedDevice=device;
    }
  }


}
