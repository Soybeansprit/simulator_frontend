import { Component, OnInit } from '@angular/core';
import { AllScenesService } from '../service/all-scenes.service';
import { ScenesTree } from '../class/scenes-tree';
import { SceneService } from '../service/scene.service';
import { Scene } from '../class/scene';
import * as echarts from 'echarts';
import { UploadFileService } from '../service/upload-file.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { FileUploader } from 'ng2-file-upload';
import { GenerateAllModelsService } from '../service/generate-all-models.service';
import { GenerateModelParameters } from '../class/generate-model-parameters';
import { newArray } from '@angular/compiler/src/util';
import { MainData } from '../provider/main-data';
import { Router, NavigationExtras } from "@angular/router";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  ifdPath = "";
  show: string = "none";
  unshow: string = "none";

  show_tree: string = "block";
  show_scenes_rules: string = "none";
  show_rules_scenes: string = "none";

  scenesTree: ScenesTree | null = null;
  scenes: Array<Scene> = new Array<Scene>();
  scenesTreeOption: any;
  rulesScenesOption: any;
  scenesRulesOption: any;
  selectedSceneName: string = "";

  ruleText: string = "";
  ruleTextFinal: string = "";
  uploadedFileName: string = "";

  uploader: FileUploader = new FileUploader({
    url: 'http://localhost:8083/str/upload',
    method: 'POST',
    itemAlias: 'file'
  });
  fileUploaded: boolean = false;
  simulationTime: string = "300";
  simulationTimeFinal: string = "";
  generateModelParameters: GenerateModelParameters | null = null;

  onSimulation:boolean=false;

  constructor(public allScenesService: AllScenesService, public sceneService: SceneService, public uploadFileService: UploadFileService,
    public generateAllModelsService: GenerateAllModelsService, public mainData: MainData, public router: Router) {
    this.simulationTime = this.mainData.storage.simulationTime;
    this.scenes = this.mainData.storage.scenes;
    this.generateModelParameters = this.mainData.storage.generateModelParameters;
    this.scenesTree = this.mainData.storage.scenesTree;
    this.ruleText = this.mainData.storage.ruleText;
    this.uploadedFileName = this.mainData.storage.uploadedFileName;
  }

  ngOnInit(): void {
    // document.getElementById("rule-time")!.style.display="none";
    // document.getElementById("device-time")!.style.display="none";


    document.getElementById("all_scenes_tree")!.style.display = this.show_tree;
    document.getElementById("scenes_rules")!.style.display = this.show_scenes_rules;
    document.getElementById("rules_scenes")!.style.display = this.show_rules_scenes;


    console.log("chart")
    const scenesTreeChart = echarts.init(document.getElementById("scenesTreeid"));


    var selectedSceneName: string = "";

    scenesTreeChart.on('click', function (params: any) {
      
      console.log(scenesTreeChart)
      if (params.data.name.indexOf("details") >= 0) {
        var sceneName = params.data.name.replace(" details", "");
        selectedSceneName = sceneName;
      }
    })
    setInterval(() => {
      // console.log("sceNameOut"+sceName);
      if (this.selectedSceneName != selectedSceneName) {

        this.selectedSceneName = selectedSceneName;
        console.log("toSceneDetail selectedName:" + this.selectedSceneName)
        if (this.scenes.length > 0 && !this.onSimulation) {
          console.log("toSceneDetail scene:" + this.scenes)
            this.mainData.storage = {
              generateModelParameters: this.generateModelParameters,
              scenes: this.scenes,
              selectedSceneName: this.selectedSceneName,
              simulationTime: this.simulationTime,
              scenesTree: this.scenesTree,
              ruleText: this.ruleText,
              uploadedFileName: this.uploadedFileName
            }
            this.router.navigate(["scene-details"]);
        } else {
          alert("on simulation...")
        }
        this.selectedSceneName="";
        selectedSceneName=""
      }
    }, 1000)
  }



  //////////////////////////////上传文件/////////////////////////////////
  selectedFileOnChanged(event: any) {
    // 这里是文件选择完成后的操作处理
    // alert('上传文件改变啦');
    // console.log(event.target.value);
    this.uploadedFileName = event.target.files[0].name;
    // console.log(this.uploadedFileName)
    console.log(event);
    if (!this.uploadedFileName.endsWith(".xml")) {
      alert("please choose .xml file");
      return;
    } else {
      this.uploadFile(this.uploadedFileName);
    }


  }

  uploadFile(fileName: string | null) {
    console.log(fileName + '执行上传文件');
    // 上传
    this.uploader.queue[0].onSuccess = function (response, status, headers) {
      // 上传文件成功
      if (status == 200) {
        // 上传文件后获取服务器返回的数据
        const tempRes = response;
        console.log(response);
      } else {
        // 上传文件后获取服务器返回的数据错误
        alert(fileName + '上传失败');
      }
    };
    // onSuccessItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any;
    this.uploader.queue[0].upload(); // 开始上传
    // this.uploader.queue[0].onSuccess()
    console.log(fileName + '上传之后');
    this.fileUploaded = true;
  }
  ///////////////////////////////////////////////////////////////////////////////






  generateAllModels() {
    ///////////////////如果文件和ruleText都没有变化的话则不重新分析//////////////////
    if (this.simulationTime == "") {
      alert("please enter simulation time")
    } else if (parseInt(this.simulationTime) < 100 || parseInt(this.simulationTime) > 1000) {
      alert("please enter simulation time between 100 and 1000")
    }
    if (this.ruleText.trim() == "") {
      alert("please enter rules")
    }
    if (!this.fileUploaded) {
      alert("please upload ontology file")
    }
    if (this.simulationTime!=""&&this.ruleText.trim()!=""&&this.fileUploaded) {
      this.ruleText = this.ruleText.trim();

      this.generateAllModelsService.generateAllModels(this.ruleText, this.uploadedFileName, this.simulationTime).subscribe(generateModelsParameters => {
        console.log(generateModelsParameters);
        this.generateModelParameters = generateModelsParameters;
      })


      // this.showRandomResults()
    }
  }

  simulation() {
    if (this.generateModelParameters != null && this.onSimulation===false) {
      this.onSimulation=true;
      this.generateAllModelsService.simulationAllModels(this.generateModelParameters, this.uploadedFileName).subscribe(scenes => {
        alert("simulation finished")
        this.scenes = scenes;
        console.log(this.scenes)
        this.onSimulation=false;
        ///////////////////////////this.simulation用来记录是否在仿真中/////////////////////
      })

      // this.showRulesScenesResults()


    } else if(this.generateModelParameters===null){
      alert("models not ready...")
    }
  }




  showIFD() {
    var path = "./assets/IFD.png";
    this.ifdPath = path;

    document.getElementById("ontology_rules")!.style.display = "none";

  }
  showRandomResults() {
    console.log(this.scenesTree)

    document.getElementById("all_scenes_tree")!.style.display = "block";
    document.getElementById("scenes_rules")!.style.display = "none";
    document.getElementById("rules_scenes")!.style.display = "none";
    this.show_tree = "block";
    this.show_scenes_rules = "none";
    this.show_rules_scenes = "none";
    // const scenesTreeChart=echarts.init(document.getElementById("scenesTreeid"));
    // scenesTreeChart.showLoading()

    this.getScenesTreeOption();
  }

  showScenesRulesResults() {

    document.getElementById("all_scenes_tree")!.style.display = "none";
    document.getElementById("scenes_rules")!.style.display = "block";
    document.getElementById("rules_scenes")!.style.display = "none";
    this.show_tree = "none";
    this.show_scenes_rules = "block";
    this.show_rules_scenes = "none";
    // const scenesRulesChart=echarts.init(document.getElementById("scenesRulesBarid"));
    // scenesRulesChart.showLoading();
    this.getScenesRulesOption()
  }

  showRulesScenesResults() {
    document.getElementById("all_scenes_tree")!.style.display = "none";
    document.getElementById("scenes_rules")!.style.display = "none";
    document.getElementById("rules_scenes")!.style.display = "block";
    this.show_tree = "none";
    this.show_scenes_rules = "none";
    this.show_rules_scenes = "block";
    // const rulesScenesChart=echarts.init(document.getElementById("ruleScenesBarid"));
    // rulesScenesChart.showLoading();
    this.getRulesScenesoption();
  }

  /////////////////////////////////分析总的场景///////////////////
  toAllSceneDetail() {
    
    if (this.scenes.length > 0 && !this.onSimulation) {
      
        
        this.mainData.storage = {
          generateModelParameters: this.generateModelParameters,
          scenes: this.scenes,
          selectedSceneName: this.selectedSceneName,
          simulationTime: this.simulationTime,
          scenesTree: this.scenesTree,
          ruleText: this.ruleText,
          uploadedFileName: this.uploadedFileName
        }
        this.router.navigate(["overall-analysis"]);
      
    } else {
      alert("on simulation...")
    }




  }

  toRuleAnalysis(){
    if (this.scenes.length > 0 && !this.onSimulation) {
      
        
      this.mainData.storage = {
        generateModelParameters: this.generateModelParameters,
        scenes: this.scenes,
        selectedSceneName: this.selectedSceneName,
        simulationTime: this.simulationTime,
        scenesTree: this.scenesTree,
        ruleText: this.ruleText,
        uploadedFileName: this.uploadedFileName
      }
      this.router.navigate(["rule-analysis"]);
    
  } else {
    alert("on simulation...")
  }
  }


  getRulesScenesoption() {

    if (this.scenes.length > 0 && !this.onSimulation) {
      this.sceneService.getRulesScenesData(this.scenes,this.generateModelParameters?.rules!).subscribe(option => {
        this.rulesScenesOption = option;
      })
    } else {
      alert("on simulation...")
    }
  }

  getScenesRulesOption() {


    if (this.scenes.length > 0 && !this.onSimulation) {
      this.sceneService.getScenesRulesData(this.scenes).subscribe(option => {
        this.scenesRulesOption = option;
      })
    } else {
      alert("on simulation...")
    }
  }

  getScenesTreeOption() {
    if (this.generateModelParameters != null) {
      this.scenesTree = this.generateModelParameters!.scenesTree;
      // console.log(scenesTree)
      this.scenesTreeOption = {
        title: {
          text: "Simulation Scenes Tree",
          x: "center"
        },
        tooltip: {
          trigger: 'item',
          triggerOn: 'mousemove'
        },
        dataZoom: [{
          type: 'slider',//图表下方的伸缩条
          show: true, //是否显示
          realtime: true, //拖动时，是否实时更新系列的视图
          start: 0, //伸缩条开始位置（1-100），可以随时更改
          end: 100, //伸缩条结束位置（1-100），可以随时更改
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
            roam: 'scale',
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
    } else {
      alert("models not prepared")
    }

  }



}
