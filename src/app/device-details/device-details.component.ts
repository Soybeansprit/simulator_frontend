import { Component, Input, OnInit } from '@angular/core';
import { DeviceResult } from '../class/device-result';
import * as echarts from 'echarts';
import {DeviceStateName,ConflictTime, Rule, DataTimeValue, ConflictStateAndRules, StateRules, DeviceAnalysisResult, CauseRulesCount
} from "../class/scene";
import { MainData } from '../provider/main-data';
import { SceneService } from "../service/scene.service";

@Component({
  selector: 'app-device-details',
  templateUrl: './device-details.component.html',
  styleUrls: ['./device-details.component.css']
})
export class DeviceDetailsComponent implements OnInit {
  // option:any;
  @Input() device!: DeviceResult;
  confliClick = "block";
  potentialClick = "block";
  freRuleShow = "none";
  selectedConflict: any;
  causalConflictRules: string[] = [];
  causalFrequentRules: string[] = [];

  deviceDetailButtonShow: string = "block";
  conflictDetailShow: string = "none";
  frequentChangeDetailShow: string = "none";
  cannotOffDetailShow: string = "none";
  consumptionDetailShow: string = "none";

  @Input() selectedDevice!: DeviceAnalysisResult;
  @Input() triggeredRulesName: Array<DataTimeValue> = new Array<DataTimeValue>();
  @Input() rules: Array<Rule> = new Array<Rule>();
  @Input() simulationTime: string = "";
  @Input() equivalentTime: string = "";

  conflictStateTime: ConflictTime | null = null;
  deviceStateName!: DeviceStateName

  @Input() conflictOption: any;
  @Input() changeFrequentOption: any;
  conflictTime: string = "";
  frequentChangeStartTime: number = 0;

  frequentChangeAnalysisOption: any;

  deviceNameCon: string = "";
  deviceNameCha:string ="";
  // stateCauseRulesList: Array<Array<StateAndRuleAndCauseRule>> = new Array<Array<StateAndRuleAndCauseRule>>();
  // newStateCauseRuleList:Array<Array<StateAndRuleAndCauseRule>> = new Array<Array<StateAndRuleAndCauseRule>>();
  // frequentChangeTimeStateRuleList:Array<Array<TimeStateRelativeRules>>=[];

  conflictStatesRulesList:Array<ConflictStateAndRules>=[];
  stateRuleListList:Array<Array<StateRules>>=[];

///////综合冲突原因及计数
  @Input() conflictCauseRulesCounts:Array<CauseRulesCount>=[];
///////综合jitter原因及计数
  @Input() jitterCauseRulesCounts:Array<CauseRulesCount>=[];



  constructor(public sceneService: SceneService, public mainData: MainData) {
    console.log("device-detailes:")
    console.log(this.mainData)
  }

  ngOnInit(): void {

    this.deviceDetailButtonShow = "block";
    this.conflictDetailShow = "none";
    this.frequentChangeDetailShow = "none";
    this.cannotOffDetailShow = "none";
    this.consumptionDetailShow = "none";

    console.log(this.selectedDevice);

  }

  showDeviceDetailButton() {
    this.deviceDetailButtonShow = "block";
    this.conflictDetailShow = "none";
    this.frequentChangeDetailShow = "none";
    this.cannotOffDetailShow = "none";
    this.consumptionDetailShow = "none";
  }

  conflictDetail() {
    this.deviceDetailButtonShow = "none";
    this.conflictDetailShow = "block";
    this.frequentChangeDetailShow = "none";
    this.cannotOffDetailShow = "none";
    this.consumptionDetailShow = "none";

    var conflictTime: string = "";
    // this.getConflictOption();

    if(this.selectedDevice.conflictReasons.length>0){
      const conflictChart = echarts.init(document.getElementById("conflictOptionId"));
      console.log(conflictChart)
  
      conflictChart.on('click', function (params: any) {
      
        conflictTime = params.data.value[0] + "";

      })
    }
   
    console.log(this.conflictTime)
    setInterval(() => {
      // console.log("sceNameOut"+sceName);
      if (this.conflictTime != conflictTime) {
        this.conflictTime = conflictTime;
        for (let i = 0; i < this.selectedDevice.conflictReasons.length; i++) {
          var conflictStateTime = this.selectedDevice.conflictReasons[i].conflict;
          if (conflictStateTime.time+"" === this.conflictTime) {

          }

        }
        this.conflictTime = "";
        conflictTime = ""

      }
    }, 1000)

  

  }


  frequentChangeDetail() {
    this.deviceDetailButtonShow = "none";
    this.conflictDetailShow = "none";
    this.frequentChangeDetailShow = "block";
    this.cannotOffDetailShow = "none";
    this.consumptionDetailShow = "none";


    var frequentChangeStartTime: number = 0;

    const frequentChangeChart = echarts.init(document.getElementById('changeFrequentId')!);
    console.log(frequentChangeChart);
    console.log(frequentChangeChart.getOption());
    frequentChangeChart.on('click', function (params: any) {
      console.log(params);
      if (params.componentIndex === 1) {
        var startTime: number = params.data[0];
        frequentChangeStartTime = startTime
      }
    })

   
  }
  cannotOffDetail() {
    this.deviceDetailButtonShow = "none";
    this.conflictDetailShow = "none";
    this.frequentChangeDetailShow = "none";
    this.cannotOffDetailShow = "block";
    this.consumptionDetailShow = "none";
  }

  consumptionDetail() {
    this.deviceDetailButtonShow = "none";
    this.conflictDetailShow = "none";
    this.frequentChangeDetailShow = "none";
    this.cannotOffDetailShow = "none";
    this.consumptionDetailShow = "block";
  }


  twoDevimals(valueStr: string): string {
    var valueNum = parseFloat(valueStr);
    return valueNum.toFixed(2);
  }


  onSelectConflictTime(conflictTime: ConflictTime) {
    this.deviceStateName = this.selectedDevice.deviceStateName;
    if (this.conflictStateTime != conflictTime) {
      this.conflictStateTime = conflictTime;
    } else {
      this.conflictStateTime = null;
    }
  }

  getFrequency(stateChangeCount: number, equivalentTime: string): string {
    var time = parseFloat(equivalentTime);
    return (stateChangeCount / time).toFixed(2);
  }


 

  // getFrequentChangeAnalysisOption(timeStateRelativeRulesListList: Array<Array<TimeStateRelativeRules>>) {
  //   var dataNodes = [];
  //   var dataLinks = [];
  //   var legendData = [];
  //   var categories = [];
  //   for (let n = 0; n < this.selectedDevice.deviceStateName.stateNames.length; n++) {
  //     var category = this.selectedDevice.deviceStateName.stateNames[n].stateName;
  //     legendData.push(category);
  //     categories.push({
  //       name: category
  //     })
  //   }
  //   console.log(legendData)
  //   for (let i = 0; i < timeStateRelativeRulesListList.length; i++) {
  //     var timeStateRelativeRulesList = timeStateRelativeRulesListList[i];

  //     for (let j = 0; j < timeStateRelativeRulesList.length; j++) {
  //       var name = timeStateRelativeRulesList[j].time.toFixed(2) + '\n' + timeStateRelativeRulesList[j].stateName;
  //       var stateName = timeStateRelativeRulesList[j].stateName;
  //       var categoryNum = 0;
  //       cateNum:
  //       for (let l = 0; l < legendData.length; l++) {
  //         if (stateName === legendData[l]) {
  //           categoryNum = l;
  //           break cateNum;
  //         }
  //       }
  //       dataNodes.push({
  //         name: name,
  //         x: j,
  //         y: i + 1,
  //         lable: {
  //           fontSize: 3
  //         },
  //         category: categoryNum
  //       })
  //       if (j > 0) {
  //         var lastName = timeStateRelativeRulesList[j - 1].time.toFixed(2) + '\n' + timeStateRelativeRulesList[j - 1].stateName;
  //         dataLinks.push({
  //           source: lastName,
  //           target: name,
  //           label: {
  //             formatter: function () {
  //               var label = ""
  //               for (let k = 0; k < timeStateRelativeRulesList[j].relativeRules.length; k++) {
  //                 label = label + timeStateRelativeRulesList[j].relativeRules[k].ruleName + "\n";
  //                 console.log("j:" + j + "k:" + k + label)
  //               }
  //               return label;
  //             },
  //             show: true,
  //             fontSize: 10
  //           }
  //         })
  //       }
  //     }
  //   }

  //   this.frequentChangeAnalysisOption = {
  //     title: {
  //       text: 'Graph 简单示例'
  //     },
  //     tooltip: {},
  //     legend: {
  //       data: legendData
  //     },
  //     animationDurationUpdate: 100,
  //     animationEasingUpdate: 'quinticInOut',
  //     series: [
  //       {
  //         type: 'graph',
  //         layout: 'none',
  //         symbolSize: 10,
  //         label: {
  //           show: false
  //         },
  //         roam: true,
  //         edgeSymbol: ['circle', 'arrow'],
  //         edgeSymbolSize: [1, 5],


  //         data: dataNodes,
  //         links: dataLinks,
  //         lineStyle: {
  //           opacity: 0.9,
  //           width: 1,
  //           curveness: 0
  //         },
  //         categories: categories



  //       }
  //     ]
  //   }

  // }

  getRuleContent(ruleContent:string):string{
    return ruleContent.substring(ruleContent.indexOf("IF"));
  }










  
}
