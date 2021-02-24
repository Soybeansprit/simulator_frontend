import { Component, Input, OnInit } from '@angular/core';
import * as echarts from 'echarts';
import * as $ from "jquery";
import {AllScenesService} from '../service/all-scenes.service';
import {ScenesTree} from '../class/scenes-tree';
import {SceneService} from '../service/scene.service';
import {Scene} from '../class/scene';

@Component({
  selector: 'app-echarts-all-scenes',
  templateUrl: './echarts-all-scenes.component.html',
  styleUrls: ['./echarts-all-scenes.component.css']
})
export class EchartsAllScenesComponent implements OnInit {

  
  @Input() option:any;
  to_detail="";
  selectedSceneName:string=" ";
  selectedScene:Scene|null=null;
  @Input() scenesTree!:ScenesTree;

  constructor(public allScenesService:AllScenesService,public sceneService:SceneService) { }
  
  ngOnInit(): void {

    // var sceName:string="";
  
    // const myChart=echarts.init(document.getElementById("scene"));
    
    

    // // this.allScenesService.getAllSceneTreeOptions().
    // // subscribe((option:any)=>myChart.setOption(option));
    // // this.allScenesService.getAllSceneTreeOptions().subscribe((option:any)=>this.option=option);
    // // this.getTree();
    // myChart.on('click',function(params:any){
    //   console.log(params);
    //   console.log(params.data.name);
    //   if(params.data.name.indexOf("result")>=0){
    //     var sceneName=params.data.name.replace(" result","");
    //     sceName=sceneName;
    //     console.log("sceName"+sceName)
        
    //     // window.location.href="http://localhost:4200/scene-details";
    //   }
    // });

    // var sceneName="random-scene2";
    // this.sceneService.getScene().subscribe(scene=>{
    //   console.log(scene);
    // })

    // function selectSceneName(sceneName:string){
    //   sceName=sceneName;
    // }

    

  //   setInterval(() => {
  //     // console.log("sceNameOut"+sceName);
  //     if(this.selectedSceneName!=sceName){

  //       this.selectedSceneName=sceName;
        
  //       console.log("selected"+this.selectedSceneName+"repeat");

  //       this.sceneService.getScene().subscribe(scene=>{
  //         console.log(scene);
  //       })
  //       if(this.selectedSceneName.indexOf("scene")>=0){
  //         this.sceneService.getSelectedScene(this.selectedSceneName).subscribe(scene=>{
  //           console.log(scene);
  //         })
  //       }
        
  //     }
  // }, 1000)

    


    // document.getElementById("scene")!.style.height=myChart.getHeight+"px";
    
    // document.getElementById("scene")!.style.width=myChart.getWidth+"px";
    

    // var container = document.getElementById('scene');
    // var allNode=0;
    //       var nodes=myChart._chartsViews[0]._data._graphicEls;
    //       for(var i=0,count =nodes.length;i<count;i++){
    //           var node=nodes[i];
    //           if(node===undefined)
    //               continue;
    //           allNode++;
    //        }
    // var height=window.innerHeight;
    //        var currentHeight=35*allNode;
    //        var newWidth=Math.max(currentHeight,height);
    //        container!.style.width = window.innerWidth + 'px';
    //        container!.style.height = newWidth + 'px';
    //        myChart.resize();


    
  }

  scale(){
    const ec = echarts as any;
    const myChart=echarts.init(document.getElementById("scene"));
    console.log(myChart.getHeight())
    console.log(myChart);
    
  }

  // selectScene(){
  //   const myChart=echarts.init(document.getElementById("scene"));
  //   myChart.on('click',function(params:any){
  //     console.log(params);
  //     if(params.data.name.indexOf("results")>=0){
  //       console.log("111")
  //       window.location.href="http://localhost:4200/scene-details";
  //     }
  //   });

  //   setInterval(() => {
  //     // console.log("sceNameOut"+sceName);
  //     var sceName:string="";
  //     const myChart=echarts.init(document.getElementById("scene"));
    
    

  //     // this.allScenesService.getAllSceneTreeOptions().
  //     // subscribe((option:any)=>myChart.setOption(option));
  //     // this.allScenesService.getAllSceneTreeOptions().subscribe((option:any)=>this.option=option);
  //     this.getTree();
  //     myChart.on('click',function(params:any){
  //       console.log(params);
  //       console.log(params.data.name);
  //       if(params.data.name.indexOf("result")>=0){
  //         var sceneName=params.data.name.replace(" result","");
  //         sceName=sceneName;
  //         console.log("sceName"+sceName)
          
  //         // window.location.href="http://localhost:4200/scene-details";
  //       }
  //     });

  //     if(this.selectedSceneName!=sceName){

  //       this.selectedSceneName=sceName;
        
  //       console.log("selected"+this.selectedSceneName+"repeat");

  //       this.sceneService.getScene().subscribe(scene=>{
  //         console.log(scene);
  //       })
  //       if(this.selectedSceneName.indexOf("scene")>=0){
  //         this.sceneService.getSelectedScene(this.selectedSceneName).subscribe(scene=>{
  //           console.log(scene);
  //         })
  //       }
        
  //     }
  // }, 500)

  // }

  clickall(){
    this.sceneService.getAllScenes(this.scenesTree).subscribe(scenes=>{
      console.log(scenes);
    })
  }

  getTree(){
    this.allScenesService.getScenesTreeData().subscribe(sceneTree=>{
      console.log(sceneTree);
      this.scenesTree=sceneTree;

      this.option = {
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

            data: [sceneTree],

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


    // this.option = {
    //   title: {
    //     text: "Simulation Scenes Tree",
    //     x: "center"
    //   },
    //   tooltip: {
    //     trigger: 'item',
    //     triggerOn: 'mousemove'
    //   },
    //   dataZoom:[{
    //     　　　　type: 'slider',//图表下方的伸缩条
    //     　　　　show : true, //是否显示
    //     　　　realtime : true, //拖动时，是否实时更新系列的视图
    //     　　　start : 0, //伸缩条开始位置（1-100），可以随时更改
    //     　　　end : 100, //伸缩条结束位置（1-100），可以随时更改
    //     　　}],
    //   series: [
    //     {
    //       type: 'tree',

    //       data: [this.scenesTree],

    //       left: '2%',
    //       right: '2%',
    //       top: '8%',
    //       bottom: '8%',

    //       symbol: 'emptyCircle',
    //       symbolSize: 9,
    //       orient: 'LR',

    //       expandAndCollapse: true,
    //       initialTreeDepth: 1,
    //       roam: true,
    //       borderColor: '#fff',
    //       label: {
    //         show: false,
    //         position: 'top',
    //         rotate: 0,

    //         align: 'left',
    //         fontSize: 15
    //       },

    //       leaves: {
    //         label: {
    //           show: true,
    //           position: 'left ',
    //           rotate: 0,

    //           align: 'right'
    //         }
    //       },
    //       itemStyle: {
    //         color: 'rgba(128, 128, 128, 0.5)',
    //         borderColor: '#345',
    //         borderWidth: '1'
    //       },
    //       lineStyle: {
    //         color: '#345',
    //         curveness: 0.7
    //       },

    //       animationDurationUpdate: 750
    //     }
    //   ]
    // }
  }
//   resize(){
//     const myChart=echarts.init(document.getElementById("scene"));
//     let elesArr = Array.from(new Set(myChart._chartsViews[0]._data._graphicEls));
//     let dep=myChart._chartsViews[0]._data.tree.root.height;//获取树高
//     let layer_height=100;     //层级之间的高度
//     let currentHeight = layer_height * (dep+1) || layer_height;
//     let newHeight = Math.max(currentHeight, layer_height);
//     var chartHeight=newHeight+'px';
//     let layer_width = 100; // 兄弟节点之间的距离
//     let currentWidth = layer_width * (elesArr.length - 1) || layer_width;
//     let newWidth = Math.max(currentWidth, layer_width);
//     var chartWidth=newWidth+'px';
//     document.getElementById("scene")!.style.height=chartHeight;
    
//     document.getElementById("scene")!.style.width=chartWidth;
//     myChart.resize();

// }

  toSceneDetail(){
    
  }
  

}
