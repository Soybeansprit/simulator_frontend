import { Component, OnInit } from '@angular/core';
import {AllScenesService} from '../service/all-scenes.service';
import {ScenesTree} from '../class/scenes-tree';
import {SceneService} from '../service/scene.service';
import {Scene} from '../class/scene';
import * as echarts from 'echarts';

@Component({
  selector: 'app-random-all',
  templateUrl: './random-all.component.html',
  styleUrls: ['./random-all.component.css']
})
export class RandomAllComponent implements OnInit {

  ifdPath: string="";
  show_tree:string="none";
  show_scenes_rules:string="none";
  show_rules_scenes:string="none";
  scenesTree!:ScenesTree;
  scenes!:Array<Scene>;
  scenesTreeOption:any;
  
  constructor(public allScenesService:AllScenesService,public sceneService:SceneService) { }

  ngOnInit(): void {
    this.show_tree="none";
    this.show_scenes_rules="none";
    this.show_rules_scenes="none";
    this.getScenesTree();
  }

  showIFD(){
    var path="./assets/IFD.png";
    console.log("showIFD");
    //document.getElementById('ifdimg').src=path;
    //document.getElementById('ifdlink').href=path;
    this.ifdPath=path;
  }

  showRandomResults(){
    this.show_tree="block";
    this.show_scenes_rules="none";
    this.show_rules_scenes="none";
    console.log("random")
    this.getScenesTree();
    
  }

  showScenesRulesResults(){
    console.log("showScenesRulesResults")
    this.show_scenes_rules="block";
    this.show_tree="none";
    this.show_rules_scenes="none";
    
  }

  showRulesScenesResults(){
    this.show_rules_scenes="block";
    this.show_tree="none";
    this.show_scenes_rules="none";

    console.log("showRulesScenesResults")

    this.getAllScenesResults();
  }

  getScenesTree(){
    this.allScenesService.getScenesTreeData().subscribe(scenesTree=>{
      this.scenesTree=scenesTree;
      console.log("random")
      console.log(scenesTree);
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

  getAllScenesResults(){
    this.sceneService.getAllScenes(this.scenesTree).subscribe(scenes=>{
      console.log(scenes);
      this.scenes=scenes;
      
    })
  }

}
