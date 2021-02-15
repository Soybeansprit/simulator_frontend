import { Injectable } from '@angular/core';
import * as echarts from 'echarts';
import * as $ from "jquery";
import {Observable,of} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AllScenesService {

  
  constructor(public http:HttpClient) { }

  getAllSceneTreeOptions(){

    return new Observable((observer)=>{
      setTimeout(()=>{
        var url:any='../../assets/exp01083-random-json.json';
        $.get(url, (data) => {
        
          var options = {
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
    
                data: [data],
    
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
          observer.next(options);
        })
      },500);
    })
    
    

    
    
    // myChart.showLoading();
    // myChart.hideLoading();

    // myChart.setOption(option = {
    //   title:{
    //     text:"scenes",
    //     x:"center"
    //   },
    //     tooltip: {
    //         trigger: 'item',
    //         triggerOn: 'mousemove'
    //     },
    //     series:[
    //         {
    //             type: 'tree',

    //             data: [data],

    //             left: '2%',
    //             right: '2%',
    //             top: '8%',
    //             bottom: '8%',

    //             symbol: 'emptyCircle',
    //             symbolSize:9,
    //             orient: 'LR',

    //             expandAndCollapse: true,
    //             initialTreeDepth:1,
    //             roam:true,
    //             borderColor:'#fff',
    //             label: {
    //               show:false,
    //                 position: 'top',
    //                 rotate: 0,

    //                 align: 'left',
    //                 fontSize: 15
    //             },

    //             leaves: {
    //                 label: {
    //                   show:true,
    //                     position: 'left ',
    //                     rotate: 0,

    //                     align: 'right'
    //                 }
    //             },
    //             itemStyle:{
    //               color:'rgba(128, 128, 128, 0.5)',
    //               borderColor:'#345',
    //               borderWidth:'1'
    //             },
    //             lineStyle:{
    //               color:'#345',
    //               curveness: 0.7
    //             },

    //             animationDurationUpdate: 750
    //         }
    //     ]
    // });
  }
}
