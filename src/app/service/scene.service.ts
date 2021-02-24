import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Scene } from '../class/scene';
import { ScenesTree } from '../class/scenes-tree';
import { DataTimeValue } from '../class/scene';
import * as echarts from 'echarts';

@Injectable({
  providedIn: 'root'
})
export class SceneService {

  fileUrl = "http://localhost:8083/file";
  constructor(public http: HttpClient) { }

  // httpOptions = {
  // 	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  // };
  getSelectedScene(sceneName: string): Observable<Scene> {
    var url = this.fileUrl + "/getSceneAnalysisResult";
    var filePath = "D:%5C%5Cexp";

    var initModelName = "exp0108";
    url = `http://localhost:8083/file/getSceneAnalysisResult?filePath=${filePath}&initModelName=${initModelName}&sceneName=${sceneName}`;

    return this.http.get<Scene>(url);

  }

  // getScene():Observable<Scene>{
  //   var url=this.fileUrl+"/getAnalysisResult";
  //   // var filePath="D:\\\\exp";
  //   // var initModelName="exp0108";
  //   // url = `${url}?filePath=${filePath}&initModelName=${initModelName}&sceneName=${sceneName}`;

  //   return this.http.get<Scene>(url);

  // }

  getScene(): Observable<Scene> {
    var url = this.fileUrl + "/getAnalysisResult";

    return this.http.get<Scene>(url);

  }


  getAllScenes(scenesTree: ScenesTree): Observable<Array<Scene>> {
    var treeSize = scenesTree.children.length;
    var filePath = "D:%5C%5Cexp";

    var initModelName = "exp0108";
    var url = `http://localhost:8083/file/getAllSceneAnalysisResult?filePath=${filePath}&initModelName=${initModelName}&treeSize=${treeSize}`;
    return this.http.get<Array<Scene>>(url);
  }

  getScenesRulesData(scenes: Array<Scene>){
    return new Observable((observer)=>{
      setTimeout(()=>{
        
        
          var length=scenes.length;
          var xAxisData=[];
          var ruleNumsData=[];
          const yMax = scenes[0].triggeredRulesName.length+scenes[0].cannotTriggeredRulesName.length;
          var dataShadow = [];
          for(let i=0;i<length;i++){
            var scene=scenes[i];
            var sceneIndex=scene.sceneName.indexOf("scene");
            var sceneName=scene.sceneName.substr(sceneIndex);
            xAxisData.push(sceneName);
            var sceneRuleNum=scene.triggeredRulesName.length;
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
  }

  getRulesScenesData(scenes: Array<Scene>) {
    return new Observable((observer) => {
      setTimeout(() => {

        console.log(scenes)


        var xAxisData = [];
        var triggeredSceneNum = [];
        var ruleNum = scenes[0].cannotTriggeredRulesName.length + scenes[0].triggeredRulesName.length;
        var triggeredNumMax = scenes.length;
        var dataShadow = [];
        for (let i = 0; i < ruleNum; i++) {
          var ruleName = "rule" + (i + 1);
          var triggeredNum = 0;
          xAxisData.push(ruleName);
          for (let j = 0; j < triggeredNumMax; j++) {
            var scene = scenes[j];
            for (let k = 0; k < scene.triggeredRulesName.length; k++) {
              var triggeredRule = scenes[j].triggeredRulesName[k].name;

              if (triggeredRule == ruleName) {
                triggeredNum = triggeredNum + 1;
                break;
              }
            }
          }
          triggeredSceneNum.push(triggeredNum);
          dataShadow.push(triggeredNumMax);
        }


        // tslint:disable-next-line: prefer-for-of
        var options = {
          title: {
            text: "Rule Triggered Scenes Num",
            x: "center"
          },
          tooltip: {
            trigger: 'item',
            formatter: '{c} scenes triggered {b} '
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
              data: triggeredSceneNum,
            },
          ],
        };

        
        observer.next(options);


      })

    })
  }


  getRuleTimeValueData(scene: Scene) {

    return new Observable((observer) => {
      setTimeout(() => {
        var rulesTimeValue: DataTimeValue[] = [];

        for (let i = scene.datasTimeValue.length - 1; i >= 0; i--) {
          var dataTimeValue = scene.datasTimeValue[i];
          if (dataTimeValue.name.indexOf("rule") >= 0) {
            rulesTimeValue.push(dataTimeValue);
          }
        }
        observer.next(rulesTimeValue);
      }, 500)
    })
  }
  getRulesEchartsOption(scene: Scene) {
    return new Observable((observer) => {
      setTimeout(() => {
        var rulesTimeValue: DataTimeValue[] = [];
        for (let i = scene.datasTimeValue.length - 1; i >= 0; i--) {
          var dataTimeValue = scene.datasTimeValue[i];
          if (dataTimeValue.name.indexOf("rule") >= 0) {
            rulesTimeValue.push(dataTimeValue);
          }
        }
        var length = rulesTimeValue.length;
        var data = [];
        var categories = [];
        var colors = [];


        for (let i = 0; i < length; i++) {
          categories.push(rulesTimeValue[i].name);
          colors.push('rgb(' + [
            Math.round(Math.random() * 255),
            Math.round(Math.random() * 255),
            Math.round(Math.random() * 255)
          ].join(',') + ')');
        }

        for (let i = 0; i < length; i++) {

          var len = rulesTimeValue[i].timeValue.length;

          var startTime = 0;
          var endTime = 0;

          for (let j = 0; j < len;) {
            if (j < len - 1) {
              if (rulesTimeValue[i].timeValue[j][1] > 0) {
                var k = j + 1;
                for (; k < len;) {
                  if (!(rulesTimeValue[i].timeValue[k][1] > 0)) {
                    startTime = rulesTimeValue[i].timeValue[j][0];
                    endTime = rulesTimeValue[i].timeValue[k - 1][0];
                    data.push(
                      {
                        name: rulesTimeValue[i].name,
                        value: [
                          i,
                          startTime,
                          endTime,
                          endTime - startTime
                        ],
                        itemStyle: {
                          normal: {
                            color: colors[i]
                          }
                        }
                      }
                    );


                    break;
                  } else {
                    k++;
                  }
                }
                j = k;
              } else {
                j++;

              }

            } else {
              if (rulesTimeValue[i].timeValue[j][1] > 0) {
                startTime = rulesTimeValue[i].timeValue[j][0];
                endTime = rulesTimeValue[i].timeValue[j][0];
                data.push(
                  {
                    name: rulesTimeValue[i].name,
                    value: [
                      i,
                      startTime,
                      endTime,
                      endTime - startTime
                    ],
                    // itemStyle:{
                    //     normal:{
                    //         color:
                    //     }
                    // }
                  }
                )

              }
              j++;
            }


          }
        }
        function renderItem(params: { coordSys: { x: any; y: any; width: any; height: any; }; }, api: { value: (arg0: number) => any; coord: (arg0: any[]) => any; size: (arg0: number[]) => number[]; style: () => any; }) {
          var categoryIndex = api.value(0);
          var start = api.coord([api.value(1), categoryIndex]);
          var end = api.coord([api.value(2), categoryIndex]);
          var height = api.size([0, 1])[1] * 0.5;
          const ec = echarts as any;
          var rectShape = echarts.graphic.clipRectByRect({
            x: start[0],
            y: start[1] - height / 2,
            width: end[0] - start[0],
            height: height
          }, {
            x: params.coordSys.x,
            y: params.coordSys.y,
            width: params.coordSys.width,
            height: params.coordSys.height
          });

          return rectShape && {
            type: 'rect',
            shape: rectShape,
            style: api.style()
          };
        }


        var options = {
          tooltip: {
            formatter: function (params: any) {
              return params.marker + params.name + ' last time : <br/>' + params.value[3];
            }
          },
          title: {
            text: 'Rules Trigger Time',
            left: 'center'
          },
          dataZoom: [{
            type: 'inside',
            filterMode: 'none',
            showDataShadow: false,
            top: 400,
            height: 30,
            borderColor: 'transparent',
            backgroundColor: '#e2e2e2',
            handleIcon: 'M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7v-1.2h6.6z M13.3,22H6.7v-1.2h6.6z M13.3,19.6H6.7v-1.2h6.6z', // jshint ignore:line
            handleSize: 20,
            handleStyle: {
              shadowBlur: 6,
              shadowOffsetX: 1,
              shadowOffsetY: 2,
              shadowColor: '#aaa'
            },
            labelFormatter: ''
          }, {
            type: 'inside',
            filterMode: 'weakFilter'
          }],
          grid: {
            height: 300
          },
          xAxis: {
            show: true,
            min: 0,
            scale: true,
            axisLabel: {
              formatter: function (val: number) {
                return Math.max(0, val - 0);
              }
            }
          },
          yAxis: {
            data: categories
          },
          series: [{
            type: 'custom',
            renderItem: renderItem,
            itemStyle: {
              opacity: 0.7
            },
            encode: {
              x: [1, 2],
              y: 0
            },
            data: data
          }]
        };

        observer.next(options);
      })
    })
  }

  getRuleBarEchartOption(scene:Scene){
    return new Observable((observer)=>{
      setTimeout(() => {
        var sceneIndex=scene.sceneName.indexOf("scene");
        var sceneName=scene.sceneName.substr(sceneIndex);
        console.log(sceneName);
        var rulesBarOptions = {
          title: {
            text: 'Triggered Rules',
            x: 'center',
            top: 'top'
          },
    
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'none'        // 默认为直线，可选为：'line' | 'shadow'
            },
            
          },
          
          legend: {
            x: 'center',
            y: 'bottom',
            data: ['triggered rules number', 'cannot triggered rules number']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          yAxis: {
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            type: 'category',
            data: [sceneName]
          },
          xAxis: {
            show:false,
            type: 'value'
          },
          series: [
            {
              name: 'triggered rules number',
              type: 'bar',
              barWidth:25,
              stack: 'rules',
              label: {
                normal: {
                  show: true,
                  position: 'inside'
                }
              },
              data: [scene.triggeredRulesName.length]
            },
            {
              name: 'cannot triggered rules number',
              type: 'bar',
              barWidth:25,
              stack: 'rules',
              label: {
                normal: {
                  show: true,
                  position: 'inside'
                }
              },
              data: [scene.cannotTriggeredRulesName.length]
            }
          ]
        };
        observer.next(rulesBarOptions);
    }, 500)
    })
  }
}

