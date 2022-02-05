import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { observable, Observable, of } from 'rxjs';
import { ModelLayer } from '../class/model';
import { InstanceLayer } from '../class/instance';
import { BestScenarioOutput, InteractiveLayerAndRules } from '../class/output-style';
import { BestScenarioGenerateInput, ModelInstanceLayerAndRuleStrs, MultiScenarioGenerateInput, MultiScenarioSimulateInput, SingleScenarioGenerateInput } from '../class/input-style';
import { Rule } from '../class/rule';
import { DataTimeValue, Scenario, ScenesTree } from '../class/simulation';

@Injectable({
  providedIn: 'root'
})
export class ModelGenerateService {

  constructor(private http:HttpClient) { }

  httpOptions = {
  	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  address:string="http://localhost:8083/";

  ///生成交互环境模型
  genererateInteractiveEnvironment(ruleText:string,modelLayer:ModelLayer,instanceLayer:InstanceLayer):Observable<InteractiveLayerAndRules>{
    var ruleTextLines:Array<string>;
    if(ruleText.indexOf("\r\n")>0){
      
      ruleTextLines=ruleText.split("\r\n");
    }else if(ruleText.indexOf("\n")>0){
      
      ruleTextLines=ruleText.split("\n");
    }else {
      
      ruleTextLines=ruleText.split("\n");
    }
    var modelInstanceAndRuleStrs=new ModelInstanceLayerAndRuleStrs();
    modelInstanceAndRuleStrs.modelLayer=modelLayer;
    modelInstanceAndRuleStrs.instanceLayer=instanceLayer;
    modelInstanceAndRuleStrs.ruleTestLines=ruleTextLines;

    var url=this.address+`analysis/genererateInteractiveEnvironment`;
    return this.http.post<InteractiveLayerAndRules>(url,modelInstanceAndRuleStrs,this.httpOptions);
  }

  ///生成单场景模型文件
  generateSingleScenario(modelFileName:string,modelLayer:ModelLayer,instanceLayer:InstanceLayer,interactiveInstance:InstanceLayer,rules:Array<Rule>,simulationTime:string,attributeValues:Array<Array<string>>):Observable<Array<string>>{
    var singleScenarioGenerateInput=new SingleScenarioGenerateInput();
    singleScenarioGenerateInput.modelFileName=modelFileName;
    singleScenarioGenerateInput.modelLayer=modelLayer;
    singleScenarioGenerateInput.instanceLayer=instanceLayer;
    singleScenarioGenerateInput.interactiveInstance=interactiveInstance;
    singleScenarioGenerateInput.simulationTime=simulationTime;
    singleScenarioGenerateInput.attributeValues=attributeValues;
    singleScenarioGenerateInput.rules=rules;
    var url=this.address+`analysis/generateSingleScenario`;
    return this.http.post<Array<string>>(url,singleScenarioGenerateInput,this.httpOptions);
  }



  ////生成最佳仿真场景
  generateBestScenario(modelFileName:string,modelLayer:ModelLayer,instanceLayer:InstanceLayer,interactiveInstance:InstanceLayer,rules:Array<Rule>,simulationTime:string,ifdFileName:string):Observable<BestScenarioOutput>{
    var bestScenarioGenerateInput:BestScenarioGenerateInput={
      modelFileName:modelFileName,
      modelLayer:modelLayer,
      instanceLayer:instanceLayer,
      interactiveInstance:interactiveInstance,
      rules:rules,
      simulationTime:simulationTime,
      ifdFileName:ifdFileName
    }
    var url=this.address+`analysis/generateBestScenario`;
    return this.http.post<BestScenarioOutput>(url,bestScenarioGenerateInput,this.httpOptions);
  }

  ////仿真单个场景,并返回仿真路径
  simulateSingleScenario(modelFileName:string,instanceLayer:InstanceLayer):Observable<Scenario>{
    var url=this.address+`analysis/simulateSingleScenario?modelFileName=${modelFileName}`;
    return this.http.post<Scenario>(url,instanceLayer,this.httpOptions);
  }


  ///生成所有仿真场景模型文件
  genereteMultipleScenarios(modelFileName:string,modelLayer:ModelLayer,instanceLayer:InstanceLayer,interactiveInstance:InstanceLayer,rules:Array<Rule>,simulationTime:string):Observable<ScenesTree>{
    var multiScenarioGenerateInput=new MultiScenarioGenerateInput();
    multiScenarioGenerateInput.modelFileName=modelFileName;
    multiScenarioGenerateInput.modelLayer=modelLayer;
    multiScenarioGenerateInput.instanceLayer=instanceLayer;
    multiScenarioGenerateInput.interactiveInstance=interactiveInstance;
    multiScenarioGenerateInput.simulationTime=simulationTime;
    multiScenarioGenerateInput.rules=rules;
    var url=this.address+`analysis/genereteMultipleScenarios`;
    return this.http.post<ScenesTree>(url,multiScenarioGenerateInput,this.httpOptions);
  }

  ///仿真所有场景，并返回每个场景的仿真结果
  simulateAllScenarios(modelFileName:string,instanceLayer:InstanceLayer,scenesTree:ScenesTree):Observable<Array<Scenario>>{
    var multiScenarioSimulateInput=new MultiScenarioSimulateInput();
    multiScenarioSimulateInput.instanceLayer=instanceLayer;
    multiScenarioSimulateInput.modelFileName=modelFileName;
    multiScenarioSimulateInput.scenesTree=scenesTree;
    var url=this.address+`analysis/simulateMultipleScenario`;
    return this.http.post<Array<Scenario>>(url,multiScenarioSimulateInput,this.httpOptions);
  }
}
