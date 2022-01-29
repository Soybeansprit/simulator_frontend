import { Component, OnInit } from '@angular/core';
import { SceneService } from '../service/scene.service';
import { EnvironmentModel, Scene, StaticAnalysisResult } from '../class/scene';
import * as echarts from 'echarts';
import { UploadFileService } from '../service/upload-file.service';
import { FileUploader } from 'ng2-file-upload';
import { MainData } from '../provider/main-data';
import { Router, NavigationExtras } from "@angular/router";
import { StaticAnalysisService } from '../service/static-analysis.service';
import { DynamicAnalysisService } from '../service/dynamic-analysis.service';
import { Attribute, ModelLayer } from '../class/model';
import * as $ from "jquery";
import { InstanceLayer } from '../class/instance';
import { Rule } from '../class/rule';
import { ModelGenerateService } from '../service/model-generate.service';
import { DataTimeValue, Scenario, ScenesTree } from '../class/simulation';
import { data } from 'jquery';
import { from } from 'rxjs';
import { InteractiveLayerAndRules } from '../class/output-style';

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

  scenesTree: ScenesTree =new ScenesTree();
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

  modelFileUploaded: boolean = false;
  informationFileUploaded=false;
  
  simulationTimeFinal: string = "";

  onSimulation:boolean=false;


  modelLayer=new ModelLayer();
  instanceLayer=new InstanceLayer();

  isHomePage:boolean=true;
  isStaticAnalysis:boolean=false;
  isDynamicAnalysis:boolean=false;
  
  simulationTime: string = "300";
  equivalentTime="24"

  analysisTypeValue="0"

  attributeValues:Array<Array<string>>=new Array<Array<string>>();
  attributeNames:Array<string>=new Array<string>();
  selectAttributeName="0";
  setAttributeValue="0.0";

  rules:Array<Rule>=new Array<Rule>();
  interactiveInstances:InstanceLayer=new InstanceLayer();
  ifdFileName="";

  singleModelFileName="";
  singleScenario=new Scenario();

  showGraph="";

  scenarios=Array<Scenario>();

  constructor( public sceneService: SceneService, public uploadFileService: UploadFileService,
    public mainData: MainData, public router: Router,
    private staticAnalysisService:StaticAnalysisService,private dynamicAnalysisService:DynamicAnalysisService,
    private modelGenerateService: ModelGenerateService) {
      this.simulationTime = this.mainData.storage.simulationTime;
    this.scenarios = this.mainData.storage.scenarios;
    this.scenesTree = this.mainData.storage.scenesTree;
    this.ruleText = this.mainData.storage.ruleText;
    // this.staticAnalysisResult = this.mainData.storage.staticAnalysisResult;
    this.initModelFileName = this.mainData.storage.initModelFileName;
    this.singleScenario=this.mainData.storage.singleScenario;
    this.ruleTextFinal=this.mainData.storage.ruleTextFinal;
    this.modelLayer=this.mainData.storage.modelLayer;
    this.instanceLayer=this.mainData.storage.instanceLayer;
    this.interactiveInstances=this.mainData.storage.interactiveInstances;
    this.rules=this.mainData.storage.rules;
    this.attributeNames=this.mainData.storage.attributeNames;
    this.attributeValues=this.mainData.storage.attributeValues;
    this.ifdFileName=this.mainData.storage.ifdFileName;
    console.log(mainData)
    // this.simulationTime = this.mainData.storage.simulationTime;
    // this.scenarios = this.mainData.storage.scenarios;
    // this.singleScenario=this.mainData.storage.singleScenario;
    // this.scenesTree = this.mainData.storage.scenesTree;
    // this.ruleText = this.mainData.storage.ruleText;
    // this.ruleTextFinal = this.mainData.storage.ruleTextFinal;
    // this.instanceLayer=this.mainData.storage.instanceLayer;
    // this.modelLayer=this.mainData.storage.modelLayer;
    // this.interactiveInstances=this.mainData.storage.interactiveInstances;
    // // this.staticAnalysisResult=this.mainData.storage.staticAnalysisResult
    // this.initModelFileName=this.mainData.storage.initModelFileName;
    // this.rules=this.mainData.storage.rules;
    // this.attributeNames=this.mainData.storage.attributeNames;
  }

  ngOnInit(): void {
    // document.getElementById("simulation")!.style.display="none";
    // document.getElementById("all_scenes_tree")!.style.display = this.show_tree;
    // document.getElementById("scenes_rules")!.style.display = this.show_scenes_rules;
    // document.getElementById("rules_scenes")!.style.display = this.show_rules_scenes;


    console.log("chart")
    const scenesTreeChart = echarts.init(document.getElementById("scenesTreeid")!);


    var selectedSceneName: string = "";

    scenesTreeChart.on('click', function (params: any) {
      console.log(scenesTreeChart)
      if (params.data.name.indexOf("details") >= 0) {
        console.log("details")
        var sceneName = params.data.name.replace(" details", "").trim();
        selectedSceneName = sceneName;
      }
    })
    setInterval(() => {
      // console.log("sceNameOut"+sceName);
      if (this.selectedSceneName != selectedSceneName) {
        this.selectedSceneName = selectedSceneName;
        ////找到对应的scenario
        var selectedScenario=new Scenario();
        for(var i=0;i<this.scenarios.length;i++){
          if(this.scenarios[i].scenarioName===this.selectedSceneName){
            selectedScenario=this.scenarios[i];
            break;
          }
        }
        console.log("toSceneDetail selectedName:" + this.selectedSceneName)
        if(selectedScenario.scenarioName!=""){
          this.goToSingleScenarioAnalysis(selectedScenario);
        }
        // if (this.scenes.length > 0 ) {
        //   //////点击跳转到某个场景细节页面
        //   console.log("toSceneDetail scene:" + this.scenes)
        //     this.mainData.storage = {
        //       scenes: this.scenes,
        //       selectedSceneName: this.selectedSceneName,
        //       simulationTime: this.simulationTime,
        //       scenesTree: this.scenesTree,
        //       ruleText: this.ruleText,
        //       staticAnalysisResult:this.staticAnalysisResult,
        //       environmentModel:this.environmentModel,
        //       initModelFileName:this.initModelFileName,
        //       propertyFileName:this.propertyFileName
        //     }
        //     this.router.navigate(["scene-details"]);
        // } else {
        //   alert("on simulation...")
        // }
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
      
      // this.dynamicAnalysisService.generateBestScenarioModelAndSimulate(this.environmentModel,this.staticAnalysisResult.usableRules,this.initModelFileName,this.simulationTime).subscribe(scene=>{
        
      //   console.log(scene)
      //   // this.mainData.storage = {
      //   //   simulationTime: this.simulationTime,
      //   //   scenesTree: this.scenesTree,
      //   //   ruleText: this.ruleText,
      //   //   initModelFileName:this.initModelFileName
      //   // }
      //   this.router.navigate(["scene-details"]);
      // })
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
      // this.dynamicAnalysisService.generateAllScenarioModels(this.environmentModel,this.staticAnalysisResult.usableRules,this.initModelFileName,this.simulationTime).subscribe(scenesTree=>{
      //   this.scenesTree=scenesTree;
      //   alert("Scenario models generated!")
      //   console.log(this.scenesTree)
      //   var generateTime=new Date().getTime()-t1;
      // console.log("generateTime:"+generateTime);
      // })
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
    // this.getScenesRulesOption()
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
    // this.getRulesScenesoption();
  }




  /////总的分析
  toRuleAnalysis(){
    if (this.scenes.length > 0 && !this.onSimulation) {
      // this.mainData.storage = {
      //   simulationTime: this.simulationTime,
      //   scenesTree: this.scenesTree,
      //   ruleText: this.ruleText,
      //   equivalentTime:"24",
      //   intervalTime:"300",
      //   initModelFileName:this.initModelFileName,
      // }
      this.router.navigate(["rule-analysis"]);
    } else {
      alert("on simulation...")
    }
  }


  // getRulesScenesoption() {
  //   if (this.scenes.length > 0 ) {
  //     this.sceneService.getRulesScenesData(this.scenes,this.staticAnalysisResult!).subscribe(option => {
  //       this.rulesScenesOption = option;
  //     })
  //   } else {
  //     alert("on simulation...")
  //   }
  // }

  // getScenesRulesOption() {
  //   if (this.scenes.length > 0 ) {
  //     this.sceneService.getScenesRulesData(this.scenes,this.staticAnalysisResult!.totalRules).subscribe(option => {
  //       this.scenesRulesOption = option;
  //     })
  //   } else {
  //     alert("on simulation...")
  //   }
  // }

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
      if(this.modelLayer!=null){
        var attributeEntityType=this.modelLayer.attributeEntity;
        ////将添加环境属性
        for(var i=0;i<attributeEntityType.attributes.length;i++){
          var attribute=attributeEntityType.attributes[i];
          console.log(attribute)
          this.attributeNames.push(attribute.attribute);
        }
        console.log(this.attributeNames)
      }
      
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
      }).done((interactiveLayerAndRules=>{
        //返回模型层数据
        console.log(interactiveLayerAndRules)
        this.instanceLayer=interactiveLayerAndRules.instanceLayer;
        this.modelLayer=interactiveLayerAndRules.modelLayer
      }))
    }
    
  }

////自动建模，根据规则和实例层模型层生成交互环境模型
  generateAllScenarioModels(){
    
    if(!this.modelLayer&&!this.instanceLayer&&this.ruleTextFinal!=this.ruleText){
      this.ruleTextFinal=this.ruleText;

    }
  }

  generateInteractiveEnvironment(){
    if(this.modelLayer==null){
      alert("Please upload the environment ontology file!")
    }else
    if(this.instanceLayer==null){
      alert("Please upload the instance information file!")
    }else
    if(this.ruleTextFinal!=this.ruleText){
      this.ruleTextFinal=this.ruleText;
      this.modelGenerateService.genererateInteractiveEnvironment(this.ruleTextFinal,this.modelLayer,this.instanceLayer).subscribe(instanceAndRules=>{
        console.log(instanceAndRules)
        this.rules=instanceAndRules.rules;
        this.interactiveInstances=instanceAndRules.interactiveInstance
        this.ifdFileName=instanceAndRules.ifdFileName;
      })
    }
  }

  getInteractiveInstanceNum():number{
    var sum=0;
    if(this.interactiveInstances.humanInstance.instanceName!=""){
      sum++;
    }
    if(this.interactiveInstances.attributeEntityInstance.instanceName!=""){
      sum++;
    }
    sum+=this.interactiveInstances.cyberServiceInstances.length;
    sum+=this.interactiveInstances.uncertainEntityInstances.length;
    sum+=this.interactiveInstances.deviceInstances.length;
    return sum;
  }

  backToHomePage(){
    this.isHomePage=true;
    this.isDynamicAnalysis=false;
    this.isStaticAnalysis=false;
  }

  staticAnalysis(){
    this.isHomePage=false;
    this.isDynamicAnalysis=false;
    this.isStaticAnalysis=true;
  }

  displayStaticAnalysisResults(){
    alert("static")
  }
  displayIFD(){
    alert("ifd")
  }

  dynamicAnalysis(){
    this.isHomePage=false;
    this.isDynamicAnalysis=true;
    this.isStaticAnalysis=false;


    // this.attributeNames.push("temperature");
    // this.attributeNames.push("humidity");
  }
  selectAnalysisType(){
    
  }

  addAttributeValue(){
    //设置attribute的取值，先判断是否已经存在，如果存在直接将值重新设置，如果不存在则添加
    if(this.selectAttributeName==="0"){
      return;
    }
    for(var i=0;i<this.attributeValues.length;i++){
      if(this.selectAttributeName===this.attributeValues[i][0]){
        var value=parseFloat(this.setAttributeValue+"").toFixed(1);
        this.attributeValues[i][1]=value;
        console.log(this.attributeValues)
        return;
      }
    }
    var attributeValue=new Array<string>();
    attributeValue.push(this.selectAttributeName);
    var value=parseFloat(this.setAttributeValue+"").toFixed(1);
    attributeValue.push(value);
    this.attributeValues.push(attributeValue);

    console.log(this.attributeValues)

  }

  generateSingleScenario(){
    if(this.modelLayer==null){
      alert("Please upload the environment ontology file!")
    }else
    if(this.instanceLayer==null){
      alert("Please upload the instance information file!")
    }else if(this.interactiveInstances==null){
      alert("Please click automatic modeling button!")
    }else{
      this.modelGenerateService.generateSingleScenario(this.initModelFileName,this.modelLayer,this.instanceLayer,this.interactiveInstances,this.rules,this.simulationTime,this.attributeValues).subscribe(singleModelFileName=>{
        console.log(singleModelFileName)
        this.singleModelFileName=singleModelFileName[0];
      })
    }
    
  }

  simulateSingleScenario(){
    if(this.singleModelFileName!=""&&this.instanceLayer!=null){
      console.log("...")
      this.modelGenerateService.simulateSingleScenario(this.singleModelFileName,this.instanceLayer).subscribe(scenario=>{
        console.log(scenario)
        this.singleScenario=scenario;
        
      })
    }
  }


  generateMultipeScenarios(){
    if(this.modelLayer==null){
      alert("Please upload the environment ontology file!")
    }else
    if(this.instanceLayer==null){
      alert("Please upload the instance information file!")
    }else if(this.interactiveInstances==null){
      alert("Please click automatic modeling button!")
    }else{
      this.modelGenerateService.genereteMultipleScenarios(this.initModelFileName,this.modelLayer,this.instanceLayer,this.interactiveInstances,this.rules,this.simulationTime).subscribe(scenesTree=>{
        console.log(scenesTree)
        this.scenesTree=scenesTree;
        ///场景树的图
        this.getScenesTreeOption();
        ///每个场景触发的规则数

        ///
      })
    }
  }

  simulateMultiScenarios(){
    if(this.modelLayer==null){
      alert("Please upload the environment ontology file!")
    }else
    if(this.instanceLayer==null){
      alert("Please upload the instance information file!")
    }else if(this.interactiveInstances==null){
      alert("Please click automatic modeling button!")
    }else if(this.scenesTree?.children.length==0){
      alert("Please generate all scenario models!")
    }else{
      console.log("ssd")
      this.modelGenerateService.simulateAllScenarios(this.initModelFileName,this.instanceLayer,this.scenesTree).subscribe(scenarios=>{
        console.log(scenarios)
        this.scenarios=scenarios;
      })
    }
  }

  displayScenarioTreeGraph(){
    this.getScenesTreeOption();
    this.showGraph="scenesTree";
    
  }

  verifyPropertis(){
    ////跳转到综合分析界面
    this.mainData.storage.ruleText=this.ruleText;
    this.mainData.storage.ruleTextFinal=this.ruleTextFinal;
    this.mainData.storage.modelLayer=this.modelLayer;
    this.mainData.storage.instanceLayer=this.instanceLayer;
    this.mainData.storage.interactiveInstances=this.interactiveInstances;
    this.mainData.storage.rules=this.rules;
    this.mainData.storage.scenarios=this.scenarios;
    this.mainData.storage.scenesTree=this.scenesTree;
    this.mainData.storage.simulationTime=this.simulationTime;
    this.mainData.storage.singleScenario=this.singleScenario;
    this.mainData.storage.attributeNames=this.attributeNames;
    this.mainData.storage.initModelFileName=this.initModelFileName;
    this.mainData.storage.equivalentTime=this.equivalentTime;
    this.mainData.storage.attributeValues=this.attributeValues;
    this.mainData.storage.ifdFileName=this.ifdFileName;
    this.router.navigate(["rule-analysis"]);
  }

  ////跳转到单场景分析界面
  getScenarioAnalysisResult(){
    this.goToSingleScenarioAnalysis(this.singleScenario);
  }

  ////跳转到单场景分析界面,并记住各属性取值
  goToSingleScenarioAnalysis(scenario:Scenario){
    this.mainData.storage.ruleText=this.ruleText;
    this.mainData.storage.ruleTextFinal=this.ruleTextFinal;
    this.mainData.storage.modelLayer=this.modelLayer;
    this.mainData.storage.instanceLayer=this.instanceLayer;
    this.mainData.storage.interactiveInstances=this.interactiveInstances;
    this.mainData.storage.rules=this.rules;
    this.mainData.storage.scenarios=this.scenarios;
    this.mainData.storage.scenesTree=this.scenesTree;
    this.mainData.storage.selectedScenario=scenario;
    this.mainData.storage.simulationTime=this.simulationTime;
    this.mainData.storage.singleScenario=this.singleScenario;
    this.mainData.storage.attributeNames=this.attributeNames;
    this.mainData.storage.initModelFileName=this.initModelFileName;
    this.mainData.storage.equivalentTime=this.equivalentTime;
    this.mainData.storage.attributeValues=this.attributeValues;
    this.mainData.storage.ifdFileName=this.ifdFileName;
    // this.mainData.storage = {
      
    //   scenarios:this.scenarios,
    //   selectedScenario: scenario,
    //   singleScenario:this.singleScenario,
    //   simulationTime: this.simulationTime,
    //   equivalentTime: this.equivalentTime,
    //   scenesTree: this.scenesTree,
    //   ruleText:this.ruleText,
    //   ruleTextFinal: this.ruleTextFinal,
    //   staticAnalysisResult:this.staticAnalysisResult,
    //   modelLayer:this.modelLayer,
    //   instanceLayer:this.instanceLayer,
    //   interactiveInstances:this.interactiveInstances,
    //   initModelFileName:this.initModelFileName,
    //   rules:this.rules

    // }
    this.router.navigate(["scene-details"]);
  }
  

}
