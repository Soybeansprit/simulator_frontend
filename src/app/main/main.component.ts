import { Component, OnInit } from '@angular/core';
import { ScenesTree } from '../class/scenes-tree';
import { SceneService } from '../service/scene.service';
import { EnvironmentModel, Rule, Scene, StaticAnalysisResult } from '../class/scene';
import * as echarts from 'echarts';
import { UploadFileService } from '../service/upload-file.service';
import { FileUploader } from 'ng2-file-upload';
import { MainData } from '../provider/main-data';
import { Router, NavigationExtras } from "@angular/router";
import { StaticAnalysisService } from '../service/static-analysis.service';
import { DynamicAnalysisService } from '../service/dynamic-analysis.service';
import { ModelLayer } from '../class/model';
import * as $ from "jquery";
import { InstanceLayer } from '../class/instance';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  ifdPath = "";


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

  /////initModelFile
  initModelFileName:string="";
  /////propertyFile
  propertyFileName:string="";

  address:string='http://localhost:8083/';

  environmentModel:EnvironmentModel|null=null;
  staticAnalysisResult:StaticAnalysisResult|null=null;

  uploader: FileUploader = new FileUploader({
    url: this.address+'analysis/upload',
    method: 'POST',
    itemAlias: 'file'
  });
  
  modelUploader: FileUploader = new FileUploader({
    url: this.address+'analysis/upload',
    method: 'POST',
    itemAlias: 'file'
  });
  propertyUploader: FileUploader = new FileUploader({
    url: this.address+'analysis/upload',
    method: 'POST',
    itemAlias: 'file'
  });

  fileUploaded: boolean = false;
  simulationTime: string = "300";
  simulationTimeFinal: string = "";

  onSimulation:boolean=false;


  modelLayer:ModelLayer=new ModelLayer();
  instanceLayer:InstanceLayer=new InstanceLayer();

  constructor( public sceneService: SceneService, public uploadFileService: UploadFileService,
    public mainData: MainData, public router: Router,
    private staticAnalysisService:StaticAnalysisService,private dynamicAnalysisService:DynamicAnalysisService) {
    this.simulationTime = this.mainData.storage.simulationTime;
    this.scenes = this.mainData.storage.scenes;
    this.scenesTree = this.mainData.storage.scenesTree;
    this.ruleText = this.mainData.storage.ruleText;
    this.environmentModel=this.mainData.storage.environmentModel;
    this.staticAnalysisResult=this.mainData.storage.staticAnalysisResult
    this.initModelFileName=this.mainData.storage.initModelFileName
    this.propertyFileName=mainData.storage.propertyFileName
  }

  ngOnInit(): void {
    document.getElementById("simulation")!.style.display="none";
    document.getElementById("all_scenes_tree")!.style.display = this.show_tree;
    document.getElementById("scenes_rules")!.style.display = this.show_scenes_rules;
    document.getElementById("rules_scenes")!.style.display = this.show_rules_scenes;


    console.log("chart")
    const scenesTreeChart = echarts.init(document.getElementById("scenesTreeid")!);


    var selectedSceneName: string = "";

    scenesTreeChart.on('click', function (params: any) {
      console.log(scenesTreeChart)
      if (params.data.name.indexOf("details") >= 0) {
        var sceneName = params.data.name.replace(" details", "").trim();
        selectedSceneName = sceneName;
      }
    })
    setInterval(() => {
      // console.log("sceNameOut"+sceName);
      if (this.selectedSceneName != selectedSceneName) {
        this.selectedSceneName = selectedSceneName;
        console.log("toSceneDetail selectedName:" + this.selectedSceneName)
        if (this.scenes.length > 0 ) {
          //////点击跳转到某个场景细节页面
          console.log("toSceneDetail scene:" + this.scenes)
            this.mainData.storage = {
              scenes: this.scenes,
              selectedSceneName: this.selectedSceneName,
              simulationTime: this.simulationTime,
              scenesTree: this.scenesTree,
              ruleText: this.ruleText,
              staticAnalysisResult:this.staticAnalysisResult,
              environmentModel:this.environmentModel,
              initModelFileName:this.initModelFileName,
              propertyFileName:this.propertyFileName
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
  ////上传环境本体文件
  uploadModelFile(event:any){
    this.initModelFileName=event.target.files[0].name;
    if(!this.initModelFileName.endsWith(".xml")){
      alert("Please upload the .xml file!")
      return
    }
    console.log(event);
    ////上传
    this.upload(this.modelUploader,this.initModelFileName);
  }
  /////上传property文件
  uploadPropertyFile(event:any){
    this.propertyFileName=event.target.files[0].name;
    if(!this.propertyFileName.endsWith(".properties")){
      alert("Please upload the .properties file!")
      return 
    }
    console.log(event);
    //////上传
    this.upload(this.propertyUploader,this.propertyFileName);
  }

  upload(fileUploader:FileUploader,fileName:string){
    console.log(fileName + '执行上传文件');
    fileUploader.queue[0].onSuccess= function (response, status, headers){
      if (status == 200) {
        // 上传文件后获取服务器返回的数据
        const tempRes = response;
        console.log(response);
        alert("File uploaded!")
      } else {
        // 上传文件后获取服务器返回的数据错误
        alert(fileName + '上传失败');
      }
    }
    fileUploader.queue[0].upload();//开始上传
    console.log(fileName + '上传之后');

  }
  ////////////////////////////////////////////////////////////////////////





  //////静态分析
  getStaticAnalysisResult(){
    document.getElementById("static")!.style.display="block";
    document.getElementById("simulation")!.style.display="none";
    this.ruleText=this.ruleText.trim();
    var t1=new Date().getTime();
    this.staticAnalysisResult=null;
    this.staticAnalysisService.getStaticAnalysisResult(this.ruleText,this.initModelFileName,this.propertyFileName).subscribe(environmentStatic=>{
      console.log(environmentStatic)
      this.staticAnalysisResult=environmentStatic.staticAnalysisResult
      this.environmentModel=environmentStatic.environmentModel;
      var staticTime=new Date().getTime()-t1;
      console.log("staticTime:"+staticTime);
    })
  }

  /////获得最佳场景分析结果
  getBestScenarioAnalysis(){
    
    console.log(this.environmentModel)
    console.log(this.staticAnalysisResult)
    if(this.staticAnalysisResult!=null&&this.environmentModel!=null){
      
      this.dynamicAnalysisService.generateBestScenarioModelAndSimulate(this.environmentModel,this.staticAnalysisResult.usableRules,this.initModelFileName,this.simulationTime).subscribe(scene=>{
        
        console.log(scene)
        this.mainData.storage = {
          selectedSceneName:"",
          scenes: this.scenes,
          scene: scene,
          simulationTime: this.simulationTime,
          scenesTree: this.scenesTree,
          ruleText: this.ruleText,
          staticAnalysisResult:this.staticAnalysisResult,
          environmentModel:this.environmentModel,
          initModelFileName:this.initModelFileName,
          propertyFileName:this.propertyFileName
        }
        this.router.navigate(["scene-details"]);
      })
    }
  }

  /////动态分析，生成所有仿真场景模型
  generateAllSystemModels(){
    document.getElementById("static")!.style.display="none";
    document.getElementById("simulation")!.style.display="block";
    console.log("generateAllModels start time:")
    var t1=new Date().getTime();
    
    console.log(this.environmentModel)
    console.log(this.staticAnalysisResult)
    if(this.staticAnalysisResult!=null&&this.environmentModel!=null){
      this.dynamicAnalysisService.generateAllScenarioModels(this.environmentModel,this.staticAnalysisResult.usableRules,this.initModelFileName,this.simulationTime).subscribe(scenesTree=>{
        this.scenesTree=scenesTree;
        alert("Scenario models generated!")
        console.log(this.scenesTree)
        var generateTime=new Date().getTime()-t1;
      console.log("generateTime:"+generateTime);
      })
    }
  }
  /////仿真
  scenariosSimulation(){
    if(this.scenesTree!=null&&this.environmentModel!=null){
      var t1=new Date().getTime();
      this.dynamicAnalysisService.simulateAllScenarios(this.environmentModel.devices,this.scenesTree,this.initModelFileName).subscribe(scenes=>{
        this.scenes=scenes;
        if(scenes==null){
          alert("Simulation error.")
          return
        }else{
          alert("Simulation succeed!")
        }
        console.log(this.scenes)
        var simulationTime=new Date().getTime()-t1;
        console.log("simulationTime:"+simulationTime);
      })
    }
  }
  /////显示仿真结果
  simulationResults(){
    document.getElementById("static")!.style.display="none";
    document.getElementById("simulation")!.style.display="block";
  }
  showIFD() {
    var path = "./assets/IFD.png";
    this.ifdPath = path;
    document.getElementById("ontology_rules")!.style.display = "none";

  }
  /////显示仿真场景树
  showScenarioTree(){
    document.getElementById("all_scenes_tree")!.style.display = "block";
    document.getElementById("scenes_rules")!.style.display = "none";
    document.getElementById("rules_scenes")!.style.display = "none";
    this.show_tree = "block";
    this.show_scenes_rules = "none";
    this.show_rules_scenes = "none";
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




  /////总的分析
  toRuleAnalysis(){
    if (this.scenes.length > 0 && !this.onSimulation) {
      this.mainData.storage = {
        scenes: this.scenes,
        simulationTime: this.simulationTime,
        scenesTree: this.scenesTree,
        ruleText: this.ruleText,
        staticAnalysisResult:this.staticAnalysisResult,
        environmentModel:this.environmentModel,
        equivalentTime:"24",
        intervalTime:"300",
        initModelFileName:this.initModelFileName,
        propertyFileName:this.propertyFileName
      }
      this.router.navigate(["rule-analysis"]);
    } else {
      alert("on simulation...")
    }
  }


  getRulesScenesoption() {
    if (this.scenes.length > 0 ) {
      this.sceneService.getRulesScenesData(this.scenes,this.staticAnalysisResult!).subscribe(option => {
        this.rulesScenesOption = option;
      })
    } else {
      alert("on simulation...")
    }
  }

  getScenesRulesOption() {
    if (this.scenes.length > 0 ) {
      this.sceneService.getScenesRulesData(this.scenes,this.staticAnalysisResult!.totalRules).subscribe(option => {
        this.scenesRulesOption = option;
      })
    } else {
      alert("on simulation...")
    }
  }

  getScenesTreeOption() {
    if (this.scenesTree!= null) {
      
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



  /**
   * 上传文件，使用ajax
   * 先上传模型文件，解析出模型层，返回模型层数据
   * 后上传实例信息文件，并传模型层数据，解析出实例层，返回实例层数据
   * 
   */

  modelFileSubmit(event:any){
    var url=this.address+"analysis/uploadModelFile";
    var formData=new FormData();
    formData.append("file",event.target.files[0]);
    this.initModelFileName=event.target.files[0].name;
    ////添加locations
    var locations=new Array<string>();
    formData.append("locations",JSON.stringify(locations));
    console.log("传模型文件")
    console.log(formData)

    $.ajax({
      url: url,
      data:  formData,
      type: "Post",
      dataType: "json",
      cache: false,//上传文件无需缓存
      processData: false,//用于对data参数进行序列化处理 这里必须false
      contentType: false, //必须
      async:false,
      success: function (data) {
        ///也是接收数据
        console.log(this.initModelFileName)
        console.log(data)
        console.log("success")
        // if(data.code == 500){
        //     console.log(data.msg)
        //     console.info("error");
        //     $('#file_sqlRes').html("<span>"+data.msg+"</span>")
        // }else{
        //     var taskId = data.taskId
        //     $('#file_sqlRes').html("<span>TaskId为："+taskId+"</span>")
        // }

      },
      error: function (data) {
        
      }
    }).done((modelLayer=>{
      //返回模型层数据
      console.log(modelLayer)
      this.modelLayer=modelLayer;
    }))
  }

  instanceFileSubmit(event:any){
    if(this.initModelFileName.indexOf(".xml")>0){
      var url=this.address+"analysis/uploadInstanceInformationFile";
      var formData=new FormData();
      formData.append("file",event.target.files[0]);
      formData.append("modelLayer",JSON.stringify(this.modelLayer));
      $.ajax({
        url: url,
        data:  formData,
        type: "Post",
        dataType: "json",
        cache: false,//上传文件无需缓存
        processData: false,//用于对data参数进行序列化处理 这里必须false
        contentType: false, //必须
        async:false,
        success: function (data) {
          ///也是接收数据
          console.log(data)
          console.log("success")
          // if(data.code == 500){
          //     console.log(data.msg)
          //     console.info("error");
          //     $('#file_sqlRes').html("<span>"+data.msg+"</span>")
          // }else{
          //     var taskId = data.taskId
          //     $('#file_sqlRes').html("<span>TaskId为："+taskId+"</span>")
          // }
  
        },
        error: function (data) {
          
        }
      }).done((instanceLayer=>{
        //返回模型层数据
        console.log(instanceLayer)
        this.instanceLayer=instanceLayer;
      }))
    }
    
  }


  generateAllScenarioModels(){
    document.getElementById("static")!.style.display="none";
    document.getElementById("simulation")!.style.display="block";
    if(!this.modelLayer&&!this.instanceLayer){

    }
  }

}
