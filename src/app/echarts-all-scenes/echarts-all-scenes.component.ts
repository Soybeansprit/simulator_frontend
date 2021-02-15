import { Component, OnInit } from '@angular/core';
import * as echarts from 'echarts';
import * as $ from "jquery";
import {AllScenesService} from '../service/all-scenes.service';

@Component({
  selector: 'app-echarts-all-scenes',
  templateUrl: './echarts-all-scenes.component.html',
  styleUrls: ['./echarts-all-scenes.component.css']
})
export class EchartsAllScenesComponent implements OnInit {

  
  option:any;
  to_detail="";
  constructor(public allScenesService:AllScenesService) { }
  
  ngOnInit(): void {
  
    const ec = echarts as any;
    const myChart=echarts.init(document.getElementById("scene"));
    
    

    // this.allScenesService.getAllSceneTreeOptions().
    // subscribe((option:any)=>myChart.setOption(option));
    this.allScenesService.getAllSceneTreeOptions().subscribe((option:any)=>this.option=option);
    myChart.on('click',function(params:any){
      console.log(params);
      if(params.data.name==="results"){
        console.log("111")
        window.location.href="http://localhost:4200/scene-details";
      }
    });

    document.getElementById("scene")!.style.height=myChart.getHeight+"px";
    
    document.getElementById("scene")!.style.width=myChart.getWidth+"px";
    

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
