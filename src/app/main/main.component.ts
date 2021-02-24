import { Component, OnInit } from '@angular/core';
import {AllScenesService} from '../service/all-scenes.service';
import {ScenesTree} from '../class/scenes-tree';
import {SceneService} from '../service/scene.service';
import {Scene} from '../class/scene';
import * as echarts from 'echarts';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  ifdPath="";
  show:string="none";
  unshow:string="none";

  show_tree:string="none";
  show_scenes_rules:string="none";
  show_rules_scenes:string="none";
  scenesTree!:ScenesTree;
  scenes!:Array<Scene>;
  scenesTreeOption:any;
  rulesScenesOption:any;
  scenesRulesOption:any;
  selectedSceneName:string="none"

  constructor(public allScenesService:AllScenesService,public sceneService:SceneService) { }

  ngOnInit(): void {
    // document.getElementById("rule-time")!.style.display="none";
    // document.getElementById("device-time")!.style.display="none";
   
    
    document.getElementById("all_scenes_tree")!.style.display="none";
    document.getElementById("scenes_rules")!.style.display="none";
    document.getElementById("rules_scenes")!.style.display="none";

    // this.getScenesTreeOption();
    // console.log(this.scenesTree)
    // this.getRulesScenesoption();
    console.log("chart")
    const scenesTreeChart=echarts.init(document.getElementById("scenesTreeid"));
    console.log(document.getElementById("scenesTreeid"));
    
    
    var selectedSceneName:string="";
    scenesTreeChart.on('click',function(params:any){
      if(params.data.name.indexOf("result")>=0){
        var sceneName=params.data.name.replace(" result","");
        selectedSceneName=sceneName;
      }
    })

    setInterval(() => {
      // console.log("sceNameOut"+sceName);
      if(this.selectedSceneName!=selectedSceneName){

        this.selectedSceneName=selectedSceneName;
        
        // console.log("selected"+this.selectedSceneName+"repeat");

        
        // if(this.selectedSceneName.indexOf("scene")>=0){
        //   this.sceneService.getSelectedScene(this.selectedSceneName).subscribe(scene=>{
        //     console.log(scene);
        //   })
        // }
        
      }
  }, 1000)

    



  }
  showIFD(){
    var path="./assets/IFD.png";
    this.ifdPath=path;
    
    document.getElementById("ontology_rules")!.style.display="none";
    
  }
  showRandomResults(){
    
    document.getElementById("all_scenes_tree")!.style.display="block";
    document.getElementById("scenes_rules")!.style.display="none";
    document.getElementById("rules_scenes")!.style.display="none";

    this.getScenesTreeOption();
  }

  showScenesRulesResults(){
   
    document.getElementById("all_scenes_tree")!.style.display="none";
    document.getElementById("scenes_rules")!.style.display="block";
    document.getElementById("rules_scenes")!.style.display="none";
    this.getScenesRulesOption()
  }

  showRulesScenesResults(){
    document.getElementById("all_scenes_tree")!.style.display="none";
    document.getElementById("scenes_rules")!.style.display="none";
    document.getElementById("rules_scenes")!.style.display="block";
    this.getRulesScenesoption();
  }



  getRulesScenesoption(){
    this.sceneService.getAllScenes(this.scenesTree).subscribe(scenes=>{
      this.scenes=scenes;
      console.log(scenes);
      this.sceneService.getRulesScenesData(this.scenes).subscribe(option=>{
        this.rulesScenesOption=option;
      })
    })
  }

  getScenesRulesOption(){
    this.sceneService.getAllScenes(this.scenesTree).subscribe(scenes=>{
      this.scenes=scenes;
      console.log(scenes);
      this.sceneService.getScenesRulesData(this.scenes).subscribe(option=>{
        this.scenesRulesOption=option;
        
      })
    })
  }

  getScenesTreeOption(){
    this.allScenesService.getScenesTreeData().subscribe(scenesTree=>{
      this.scenesTree=scenesTree;
      console.log(scenesTree)
      this.scenesTreeOption = {
        title: {
          text: "Simulation Scenes Tree",
          x: "center"
        },
        tooltip: {
          trigger: 'item',
          triggerOn: 'mousemove'
        },
        dataZoom:[{
          　　　　type: 'slider',//图表下方的伸缩条
          　　　　show : true, //是否显示
          　　　realtime : true, //拖动时，是否实时更新系列的视图
          　　　start : 0, //伸缩条开始位置（1-100），可以随时更改
          　　　end : 100, //伸缩条结束位置（1-100），可以随时更改
          　　}],
        series: [
          {
            type: 'tree',
  
            data: [this.scenesTree],
  
            left: '2%',
            right: '2%',
            top: '8%',
            bottom: '8%',
  
            symbol: 'emptyCircle',
            symbolSize: 9,
            orient: 'LR',
  
            expandAndCollapse: true,
            initialTreeDepth: 1,
            roam: true,
            borderColor: '#fff',
            label: {
              show: false,
              position: 'top',
              rotate: 0,
  
              align: 'left',
              fontSize: 15
            },
  
            leaves: {
              label: {
                show: true,
                position: 'left ',
                rotate: 0,
  
                align: 'right'
              }
            },
            itemStyle: {
              color: 'rgba(128, 128, 128, 0.5)',
              borderColor: '#345',
              borderWidth: '1'
            },
            lineStyle: {
              color: '#345',
              curveness: 0.7
            },
  
            animationDurationUpdate: 750
          }
        ]
      }
    })
  }

}
