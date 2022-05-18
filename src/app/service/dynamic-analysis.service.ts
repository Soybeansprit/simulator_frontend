import { Injectable } from '@angular/core';
import { EnvironmentModel ,EnvironmentRule, DeviceDetail, Scene, SceneTreeDevice, SceneEnvironmentProperty, SceneEnvironmentRule, ScenePropertyResult, PropertyVerifyResult} from '../class/scene';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { observable, Observable, of } from 'rxjs';
import { ScenesTree } from '../class/scenes-tree';
import { DeviceStateAndCausingRules,  PropertyAnalysisResult,  Scenario } from '../class/simulation';
import { DeviceInstance, InstanceLayer } from '../class/instance';
import { Rule } from '../class/rule';
import { LocationInput, OtherAnalysisInput, PropertyAnalysisInput } from '../class/input-style';
import { OtherAnalysisOutput } from '../class/output-style';

@Injectable({
  providedIn: 'root'
})
export class DynamicAnalysisService {

  constructor(private http:HttpClient) { }
  httpOptions = {
  	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  address:string="http://47.52.116.116:8083/";

  getPropertiesAnalysis(scenarios:Array<Scenario>,rules:Array<Rule>,properties:Array<string>,instanceLayer:InstanceLayer):Observable<Array<PropertyAnalysisResult>>{
    var propertyAnalysisInput:PropertyAnalysisInput={
      scenarios:scenarios,
      rules:rules,
      properties:properties,
      instanceLayer:instanceLayer
    }
    var url=this.address+`analysis/getPropertiesAnalysis`;
    return this.http.post<Array<PropertyAnalysisResult>>(url,propertyAnalysisInput,this.httpOptions);
  }

  searchAllScenariosConflict(scenarios:Array<Scenario>):Observable<Array<Scenario>>{
    var url=this.address+`analysis/searchAllScenariosConflict`;
    return this.http.post<Array<Scenario>>(url,scenarios,this.httpOptions);
  }
  
  searchAllScenariosJitter(scenarios:Array<Scenario>,intervalTime:string,simulationTime:string,equivalentTime:string):Observable<Array<Scenario>>{
    var url=this.address+`analysis/searchAllScenariosJitter?intervalTime=${intervalTime}&simulationTime=${simulationTime}&equivalentTime=${equivalentTime}`;
    return this.http.post<Array<Scenario>>(url,scenarios,this.httpOptions);
  }
  
  locateAllScenariosConflict(scenarios:Array<Scenario>,deviceInstances:Array<DeviceInstance>,rules:Array<Rule>,ifdFileName:string):Observable<Array<Array<Array<DeviceStateAndCausingRules>>>>{
    var locationInput=new LocationInput();
    locationInput.deviceInstances=deviceInstances;
    locationInput.scenarios=scenarios;
    locationInput.rules=rules;
    locationInput.ifdFileName=ifdFileName;
    var url=this.address+`analysis/locateAllScenariosConflict`;
    return this.http.post<Array<Array<Array<DeviceStateAndCausingRules>>>>(url,locationInput,this.httpOptions);
  }

  locateAllScenariosJitter(scenarios:Array<Scenario>,deviceInstances:Array<DeviceInstance>,rules:Array<Rule>,ifdFileName:string):Observable<Array<Array<Array<DeviceStateAndCausingRules>>>>{
    var locationInput=new LocationInput();
    locationInput.deviceInstances=deviceInstances;
    locationInput.scenarios=scenarios;
    locationInput.rules=rules;
    locationInput.ifdFileName=ifdFileName;
    var url=this.address+`analysis/locateAllScenariosJitter`;
    return this.http.post<Array<Array<Array<DeviceStateAndCausingRules>>>>(url,locationInput,this.httpOptions);
  }

  getOtherAnalysis(scenarios:Array<Scenario>,instanceLayer:InstanceLayer):Observable<OtherAnalysisOutput>{
    var otherAnalysisInput:OtherAnalysisInput={
      scenarios:scenarios,
      instanceLayer:instanceLayer
    }
    var url=this.address+`analysis/getOtherAnalysis`;
    return this.http.post<OtherAnalysisOutput>(url,otherAnalysisInput,this.httpOptions);
  }
  
  
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
