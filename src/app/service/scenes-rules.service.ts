import { Injectable } from '@angular/core';
import {SceneRule} from '../class/scene-rule';
import * as $ from "jquery";
import {Observable,of} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ScenesRulesService {

  sceneRuleResult:SceneRule[]=[];
  constructor() {}

  getAllScenesRulesAnalys(){
    return new Observable((observer)=>{
      setTimeout(()=>{
        var url:any='../../assets/scenes-rules-analysis.json';
        $.get(url,(data)=>{
          var length=data.length;
          var xAxisData=[];
          var ruleNumsData=[];
          for(let i=0;i<length;i++){
            xAxisData.push(data[i].sceneName);
            var sceneRuleNum=data[i].triggeredRules.length;
            ruleNumsData.push(sceneRuleNum);
          }
           var option = {
             title:{
               text:"Triggered Rules Number",
               x:"center"
             },
            tooltip: {
              trigger: 'item',
              formatter: '{b} triggered {c} rules'
            },
            xAxis: {
                type: 'category',
                data: xAxisData
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: ruleNumsData,
                type: 'bar',
                showBackground: true,
                backgroundStyle: {
                    color: 'rgba(180, 180, 180, 0.2)'
                }
            }]
        };
          
          observer.next(option);
        })
      },500)
    })
  }

  getAllSceneRuleBar(){
    return new Observable((observer)=>{
      setTimeout(()=>{
        var url="../../assets/scenes-rules-analysis.json";
        $.get(url,(data)=>{
          var length=data.length;
          var xAxisData=[];
          var ruleNumsData=[];
          const yMax = 30;
          var dataShadow = [];
          for(let i=0;i<length;i++){
            xAxisData.push(data[i].sceneName);
            var sceneRuleNum=data[i].triggeredRules.length;
            ruleNumsData.push(sceneRuleNum);
            dataShadow.push(yMax);
          }
          
      
          // tslint:disable-next-line: prefer-for-of
         
      
          var options = {
            title: {
              text:"Triggered Rules Number",
               x:"center"
            },
            tooltip:{
              trigger:'item',
              formatter: '{b} triggered {c} rules'
            },
            xAxis: {
              data: xAxisData,
              axisLabel: {
                
              },
              axisTick: {
                show: false,
              },
              axisLine: {
                show: false,
              },
              z: 10,
            },
            yAxis: {
              axisLine: {
                show: false,
              },
              axisTick: {
                show: false,
              },
              axisLabel: {
                textStyle: {
                  color: '#999',
                },
              },
            },
            dataZoom: [
              {
                type: 'inside',
              },
            ],
            series: [
              {
                // For shadow
                type: 'bar',
                itemStyle: {
                  color: 'rgba(0,0,0,0.05)'
                },
                barGap: '-100%',
                barCategoryGap: '40%',
                data: dataShadow,
                animation: false,
              },
              {
                type: 'bar',
                itemStyle: {
                  color: 'rgba(30, 144 ,255,0.8)',
                },
                emphasis: {
                  itemStyle: {
                    color: 'rgba(0, 0, 205,0.9)',
                  }
                },
                data:ruleNumsData,
              },
            ],
          };
          observer.next(options);
        })
        
      })
    })
  }

  
}
