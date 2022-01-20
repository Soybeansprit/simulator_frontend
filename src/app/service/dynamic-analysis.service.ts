import { Injectable } from '@angular/core';
import { EnvironmentModel, Rule ,EnvironmentRule, DeviceDetail, Scene, SceneTreeDevice, SceneEnvironmentProperty, SceneEnvironmentRule, ScenePropertyResult, PropertyVerifyResult} from '../class/scene';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { observable, Observable, of } from 'rxjs';
import { ScenesTree } from '../class/scenes-tree';

@Injectable({
  providedIn: 'root'
})
export class DynamicAnalysisService {

  constructor(private http:HttpClient) { }
  httpOptions = {
  	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  address:string="http://localhost:8083/";

  generateAllModels(){
    
  }
  
  generateAllScenarioModels(environmentModel:EnvironmentModel,rules:Array<Rule>,initModelFileName:string,simulationTime:string):Observable<ScenesTree>{
    console.log(environmentModel)
    console.log(rules)
    var environmentRule:EnvironmentRule={
      environmentModel:environmentModel,
      rules:rules
    }
    var url=this.address+`analysis/generateAllScenarioModels?initModelFileName=${initModelFileName}&simulationTime=${simulationTime}`;
    return this.http.post<ScenesTree>(url,environmentRule,this.httpOptions);
  }


  simulateAllScenarios(devices:Array<DeviceDetail>,scenesTree:ScenesTree,initModelFileName:string):Observable<Array<Scene>>{
    var sceneTreeDevice:SceneTreeDevice={
      devices:devices,
      scenesTree:scenesTree
    }
    var url=this.address+`analysis/simulateAllScenarioModels?initModelFileName=${initModelFileName}`;
    return this.http.post<Array<Scene>>(url,sceneTreeDevice,this.httpOptions);
  }


  getAllDynamicAnalysisResult(scenes:Array<Scene>,environmentModel:EnvironmentModel,properties:Array<string>,rules:Array<Rule>,simulationTime:string,equivalentTime:string,intervalTime:string):Observable<Array<Scene>>{
    var sceneEnvironmentProperty:SceneEnvironmentProperty={
      scenes:scenes,
      environmentModel:environmentModel,
      properties:properties,
      rules:rules
    }
    var url=this.address+`analysis/getAllDynamicAnalysisResult?simulationTime=${simulationTime}&equivalentTime=${equivalentTime}&intervalTime=${intervalTime}`;
    return this.http.post<Array<Scene>>(url,sceneEnvironmentProperty,this.httpOptions);
  }

  getPropertyVerificationResult(scenes:Array<Scene>,environmentModel:EnvironmentModel,properties:Array<string>,rules:Array<Rule>):Observable<Array<PropertyVerifyResult>>{
    var sceneEnvironmentProperty:SceneEnvironmentProperty={
      scenes:scenes,
      environmentModel:environmentModel,
      properties:properties,
      rules:rules
    }
    var url=this.address+`analysis/getPropertyVerificationResult`;
    return this.http.post<Array<PropertyVerifyResult>>(url,sceneEnvironmentProperty,this.httpOptions);
  }

  getSingleDynamicAnalysisResult(scene:Scene,environmentModel:EnvironmentModel,rules:Array<Rule>,simulationTime:string,equivalentTime:string,intervalTime:string):Observable<Scene>{
    var sceneEnvironmentRule:SceneEnvironmentRule={
      scene:scene,
      environmentModel:environmentModel,
      rules:rules
    }
    var url=this.address+`analysis/getSingleDynamicAnalysisResult?simulationTime=${simulationTime}&equivalentTime=${equivalentTime}&intervalTime=${intervalTime}`;
    return this.http.post<Scene>(url,sceneEnvironmentRule,this.httpOptions);
  }

  generateBestScenarioModelAndSimulate(environmentModel:EnvironmentModel,rules:Array<Rule>,initModelFileName:string,simulationTime:string):Observable<Scene>{
    var environmentRule:EnvironmentRule={
      environmentModel:environmentModel,
      rules:rules
    }
    var url=this.address+`analysis/generateBestScenarioModelAndSimulate?initModelFileName=${initModelFileName}&simulationTime=${simulationTime}`;
    return this.http.post<Scene>(url,environmentRule,this.httpOptions);
  }
}
