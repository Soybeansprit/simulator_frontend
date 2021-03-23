import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { observable, Observable, of } from 'rxjs';
import { AllCauseRuleInput, AllScenesAnalysisInput, CauseRuleInput, ConflictTime, DeviceStateName, Rule, RulesAllScenesSimulationTime, RulesSceneSimulationTime, Scene, StateAndRuleAndCauseRule, StateChangeCauseRuleInput, StateChangeCauseRules, StateChangeFast, WholeAndCurrentChangeCauseRule } from '../class/scene';
import { ScenesTree } from '../class/scenes-tree';
import { DataTimeValue } from '../class/scene';
import * as echarts from 'echarts';

@Injectable({
  providedIn: 'root'
})
export class SceneService {

  fileUrl = "http://localhost:8083/file";
  constructor(public http: HttpClient) { }

  httpOptions = {
  	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
/////////////////所有场景
  analysisAllScenesStatesConflict(scenes:Array<Scene>,deviceName:string,rules:Array<Rule>,initFileName:string)
  :Observable<Array<Array<StateAndRuleAndCauseRule>>>{
    var allScenesAnalysisInput:AllScenesAnalysisInput={
      scenes:scenes,
      rules:rules
    }
    var url=`http://localhost:8083/str/getAllScenesConflictCauseAnalysisResult?deviceName=${deviceName}&initModelName=${initFileName}`;
    return this.http.post<Array<Array<StateAndRuleAndCauseRule>>>(url,allScenesAnalysisInput,this.httpOptions);
  }

  ////////////单个场景
  analysisAllStatesConflict(conflictStateTimes:Array<ConflictTime>,triggeredRulesName:Array<DataTimeValue>,deviceStateName:DeviceStateName,rules:Array<Rule>,
    initFileName:string):Observable<Array<Array<StateAndRuleAndCauseRule>>>{
      var allCauseRuleInput:AllCauseRuleInput={
        conflictStateTimes:conflictStateTimes,
        triggeredRulesName:triggeredRulesName,
        deviceStateName:deviceStateName,
        rules:rules
      }
      var url=`http://localhost:8083/str/getAllConflictCauseAnalysisResult?initModelName=${initFileName}`;
      
      return this.http.post<Array<Array<StateAndRuleAndCauseRule>>>(url,allCauseRuleInput,this.httpOptions);

    }
////////////////单个场景的单个冲突
  analysisStatesConflict(conflictStateTime:ConflictTime,triggeredRulesName:Array<DataTimeValue>,deviceStateName:DeviceStateName,rules:Array<Rule>,
    initFileName:string):Observable<Array<StateAndRuleAndCauseRule>>{
    var causeRuleInput:CauseRuleInput={
      conflictStateTime:conflictStateTime,
      triggeredRulesName:triggeredRulesName,
      deviceStateName:deviceStateName,
      rules:rules
    }
    console.log(conflictStateTime);
    console.log(triggeredRulesName);
    console.log(deviceStateName);
    console.log(rules);
    var url=`http://localhost:8083/str/getConflictCauseAnalysisResult?initModelName=${initFileName}`;

    return this.http.post<Array<StateAndRuleAndCauseRule>>(url,causeRuleInput,this.httpOptions);
  }
  
  /////////////所有场景所有fast change
  analysisAllScenesFastChange(scenes:Array<Scene>,deviceName:string):Observable<Array<Array<StateChangeCauseRules>>>{
   
    var url=`http://localhost:8083/str/getAllScenesFastChangeCauseAnalysisResult?deviceName=${deviceName}`;
    return this.http.post<Array<Array<StateChangeCauseRules>>>(url,scenes,this.httpOptions);
  }

  ///////////////单个场景所有fast Change和单个fast change
  analysisStatesChangeFrequently(stateChangeFasts:Array<StateChangeFast>,stateChangeFast:StateChangeFast,triggeredRulesName:Array<DataTimeValue>,deviceStateName:DeviceStateName):Observable<WholeAndCurrentChangeCauseRule>{
    var stateChangeCauseRuleInput:StateChangeCauseRuleInput={
      stateChangeFast:stateChangeFast,
      stateChangeFasts:stateChangeFasts,
      triggeredRulesName:triggeredRulesName,
      deviceStateName:deviceStateName
    }
    console.log(stateChangeFasts);
    console.log(stateChangeFast);    
    console.log(triggeredRulesName);
    console.log(deviceStateName);
    var url='http://localhost:8083/str/getStateChangeFastCauseAnalysisResult';
    return this.http.post<WholeAndCurrentChangeCauseRule>(url,stateChangeCauseRuleInput,this.httpOptions);

  }
  analysisDeviceCannotOff(scene:Scene){

  }
  


  getDeviceAnalysisResult(scene:Scene,rules:Array<Rule>,simulationTime:string,
    initModelName:string,equivalentTime:string,intervalTime:string):Observable<Scene>{
      var rulesSceneSimulationTime:RulesSceneSimulationTime={
        rules:rules,
        scene:scene,
        simulationTime:simulationTime
      };
      
      var url=`http://localhost:8083/str/getDeviceAnalysisResult?initModelName=${initModelName}&equivalentTime=${equivalentTime}&intervalTime=${intervalTime}`;

      return this.http.post<Scene>(url,rulesSceneSimulationTime,this.httpOptions);
  }

  getAllDeviceAnalysisResult(scenes:Array<Scene>,rules:Array<Rule>,simulationTime:string,
    initModelName:string,equivalentTime:string,intervalTime:string):Observable<Array<Scene>>{

      var rulesAllScenesSimulationTime:RulesAllScenesSimulationTime={
        rules:rules,
        scenes:scenes,
        simulationTime:simulationTime
      }
      var url=`http://localhost:8083/str/getAllDeviceAnalysisResult?initModelName=${initModelName}&equivalentTime=${equivalentTime}&intervalTime=${intervalTime}`;

      return this.http.post<Array<Scene>>(url,rulesAllScenesSimulationTime,this.httpOptions);
    }





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
              // name:"scene's name",
              // nameLocation:'center',
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

  getRulesScenesData(scenes: Array<Scene>,rules:Array<Rule>) {
    return new Observable((observer) => {
      setTimeout(() => {

        console.log(scenes)


        var xAxisData = [];
        var triggeredSceneNum:number[] = [];
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
            formatter: function(params:any){
              var name:string="";
              var data:number;
              var rule:Rule;
              name=params.name;
              var ruleNum=parseInt(name.substring('rule'.length));
              // if(params.componentIndex===1){
                
              //   data=params.data;
              // }else{
              //   data=scenes.length-params.data;
              // }

              for(let i=0;i<rules.length;i++){
                if(name===rules[i].ruleName){
                  rule=rules[i];
                  data=triggeredSceneNum[i];
                  break;
                }
              }
              var ruleContent=rule!.ruleContent.substring(rule!.ruleContent.indexOf('IF'));
              return params.marker+'<b>'+data!+'</b>'+' scenes triggered '+'<b>'+name+'</b>'+'<br>'+'<b>'+name+"</b>: "+ruleContent;
            }
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
  getRulesEchartsOption(scene: Scene,simulationTime:string,rules:Array<Rule>) {
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
                if(k===len){
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

        function getRuleContent(ruleName:string,rules:Array<Rule>):string{
          var content=""
          for(let i=0;i<rules.length;i++){
            if(ruleName===rules[i].ruleName){
              content=rules[i].ruleContent
            }
          }
          return content
        }


        var options = {
          tooltip: {
            formatter: function (params: any) {
              return params.marker + params.name + ' last time : ' + Number(params.value[3]).toFixed(2)+'<br/>'+getRuleContent(params.name,rules);
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
            max:Number(simulationTime),
            scale: true,
            name:"time/s",
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
            formatter:function(params:any){
              var triggered=params[0].marker+"triggered rules number: <b>"+params[0].data+"</b><br>";
              var notTriggered=params[1].marker+"cannot triggered rules number: <b>"+params[1].data+"</b><br>";
              var cannotTriggeredRules="&nbsp;&nbsp; cannot triggered rules:";
              for(let i=0;i<scene.cannotTriggeredRulesName.length;i++){
                cannotTriggeredRules=cannotTriggeredRules+"<br>&nbsp;&nbsp;&nbsp;&nbsp;"+scene.cannotTriggeredRulesName[i];
              }
              return triggered+notTriggered+cannotTriggeredRules;
            }
            
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


  ////////////////////判断两个trigger之间是否存在矛盾//////////////////
  triggerExistContra(attrVal1:Array<string>,attrVal2:Array<string>):boolean{
    if(attrVal1[0]===attrVal2[0]){
      if(attrVal2[1]==="."){
        if(attrVal2[2]!=attrVal1[2]){
          /////////////////////都是同一设备状态，但状态不同
          return true;
        }
      }else {
        var val1=Number(attrVal1[2]);
        var val2=Number(attrVal2[2]);
        if(attrVal1[1]==="="){
          if(attrVal2[1]==="="){
            if(attrVal1[2]!=attrVal2[2]){
              return true;
            }
          }
          if(attrVal2[1]===">"){
            if(val2>=val1){
              return true;
            }
          }
          if(attrVal2[1]==="<"){
            if(val2<=val1){
              return true;
            }
          }
          
        }
        if(attrVal2[1]==="="){
          if(attrVal1[1]===">"){
            if(val1>=val2){
              return true;
            }
          }
          if(attrVal1[1]==="<"){
            if(val1<=val2){
              return true;
            }
          }
        }
        if(attrVal1[1]===">"){
          if(attrVal2[1]==="<"){
            if(val1>=val2){
              return true;
            }
          }
        }
        if(attrVal1[1]==="<"){
          if(attrVal2[1]===">"){
            if(val1<val2){
              return true;
            }
          }
        }
      }
      
      
    }
    return false;
  }
/////////////////trigger解析///////////////////
  getTriggerAttrVal(trigger:string):Array<string>{
    var attrVal:Array<string>=[];
    if(trigger.indexOf("FOR")>0){
      trigger=trigger.substring(0,trigger.indexOf("FOR"));
    }
    trigger=trigger.trim();
    if(trigger.indexOf(">")>0){
      var attribute="";
      var valStr="";
      if(trigger.indexOf(".")>=0){
        attribute=trigger.substring(trigger.indexOf("."),trigger.indexOf(">")).substring(".".length);
      }else{
        attribute=trigger.substring(0,trigger.indexOf(">"));
      }

      if(trigger.indexOf("=")>0){
        valStr=trigger.substring(trigger.indexOf("=")).substring("=".length);	
      }
      if(trigger.indexOf("=")<0){
        valStr=trigger.substring(trigger.indexOf(">")).substring(">".length);
      }

      attrVal.push(attribute.trim());
      attrVal.push(">");
      attrVal.push(valStr.trim());

    }else if(trigger.indexOf("<")>0){
      var attribute="";
      var valStr="";
      if(trigger.indexOf(".")>=0) {
				attribute=trigger.substring(trigger.indexOf("."), trigger.indexOf("<")).substring(".".length);
			}else {
				attribute=trigger.substring(0, trigger.indexOf("<"));
			}
			//找到阈值
			if(trigger.indexOf("=")>0) {
				valStr=trigger.substring(trigger.indexOf("=")).substring("=".length);
				
			}
			if(trigger.indexOf("=")<0) {
				valStr=trigger.substring(trigger.indexOf("<")).substring("<".length);
			}

      attrVal.push(attribute.trim());
      attrVal.push("<");
      attrVal.push(valStr.trim());

    }else if(trigger.indexOf("=")>0){
      var attribute="";
      var valStr="";
      if(trigger.indexOf(".")>=0) {
				attribute=trigger.substring(trigger.indexOf("."), trigger.indexOf("=")).substring(".".length);
			}else {
				attribute=trigger.substring(0, trigger.indexOf("="));
			}
			valStr=trigger.substring(trigger.indexOf("=")).substring("=".length);

      attrVal.push(attribute.trim());
      attrVal.push("=");
      attrVal.push(valStr.trim());

    }else{
      var device="";
      var state="";
      device=trigger.substring(0,trigger.indexOf("."));
      state=trigger.substring(trigger.indexOf(".")).substring(".".length);

      attrVal.push(device.trim());
      attrVal.push(".");
      attrVal.push(state.trim());

    }

    return attrVal
  }
}

