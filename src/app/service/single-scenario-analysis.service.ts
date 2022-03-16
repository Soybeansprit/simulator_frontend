import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { observable, Observable, of } from 'rxjs';
import { ModelLayer } from '../class/model';
import { DeviceInstance, InstanceLayer } from '../class/instance';
import { Rule } from '../class/rule';
import { DataTimeValue, DeviceConflict, DeviceJitter, DeviceStateAndCausingRules, Scenario, ScenesTree } from '../class/simulation';
import { ConsumptionInput, EnergyConsumptionInput, LocationInput, SatisfactionInput } from '../class/input-style';

@Injectable({
  providedIn: 'root'
})
export class SingleScenarioAnalysisService {

  constructor(private http:HttpClient) { }

  httpOptions = {
  	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  address:string="http://localhost:8083/";


  ///查看所有设备冲突
  searchSingleScenarioConflict(scenario:Scenario):Observable<Scenario>{
    var url=this.address+`analysis/searchSingleScenarioConflict`;
    return this.http.post<Scenario>(url,scenario,this.httpOptions);
  }

  ///定位单场景所有设备冲突
  locateSingleScenariosAllConflict(scenario:Scenario,rules:Array<Rule>,deviceInstances:Array<DeviceInstance>,ifdFileName:string):Observable<Array<Array<Array<DeviceStateAndCausingRules>>>>{
    var locationInput=new LocationInput();
    locationInput.deviceInstances=deviceInstances;
    locationInput.scenarios.push(scenario);
    locationInput.rules=rules;
    locationInput.ifdFileName=ifdFileName;
    var url=this.address+`analysis/locateSingleScenariosAllConflict`;
    return this.http.post<Array<Array<Array<DeviceStateAndCausingRules>>>>(url,locationInput,this.httpOptions);
  }

  ///查看所有设备抖动
  searchSingleScenarioJitter(scenario:Scenario,intervalTime:string,simulationTime:string,equivalentTime:string):Observable<Scenario>{
    var url=this.address+`analysis/searchSingleScenarioJitter?intervalTime=${intervalTime}&simulationTime=${simulationTime}&equivalentTime=${equivalentTime}`;
    return this.http.post<Scenario>(url,scenario,this.httpOptions);
  }

    ///定位单场景所有设备抖动
    locateSingleScenariosAllJitter(scenario:Scenario,rules:Array<Rule>,deviceInstances:Array<DeviceInstance>,ifdFileName:string):Observable<Array<Array<Array<DeviceStateAndCausingRules>>>>{
      var locationInput=new LocationInput();
      locationInput.deviceInstances=deviceInstances;
      locationInput.scenarios.push(scenario);
      locationInput.rules=rules;
      locationInput.ifdFileName=ifdFileName;
      var url=this.address+`analysis/locateSingleScenariosAllJitter`;
      return this.http.post<Array<Array<Array<DeviceStateAndCausingRules>>>>(url,locationInput,this.httpOptions);
    }


    


    ///综合原因
    getCausingRulesSynthesized(devicesAllStatesRuleAndPreRules:Array<Array<Array<DeviceStateAndCausingRules>>>):Observable<Array<Array<Array<DeviceStateAndCausingRules>>>>{
      var url=this.address+`analysis/getCausingRulesSynthesized`;
      return this.http.post<Array<Array<Array<DeviceStateAndCausingRules>>>>(url,devicesAllStatesRuleAndPreRules,this.httpOptions);
    }

  ////计算设备运行时长
  calculateDeviceStatesDuration(dataTimeValue:DataTimeValue,deviceInstance:DeviceInstance):Observable<Array<Array<string>>>{
    var consumptionInput=new ConsumptionInput();
    consumptionInput.dataTimeValue=dataTimeValue;
    consumptionInput.deviceInstance=deviceInstance;
    
    var url=this.address+`analysis/calculateDeviceStatesDuration`;
    return this.http.post<Array<Array<string>>>(url,consumptionInput,this.httpOptions);
  }

  ///计算舒适度
  getAttributeSatisfaction(attribute:string,lowValue:string,highValue:string,dataTimeValues:Array<DataTimeValue>):Observable<number>{
    var satisfactionInput:SatisfactionInput={
      attribute:attribute,
      lowValue:lowValue,
      highValue:highValue,
      dataTimeValues:dataTimeValues
    }
    var url=this.address+`analysis/getAttributeSatisfaction`;
    return this.http.post<number>(url,satisfactionInput,this.httpOptions);
  }

  ///计算总能耗
  getEnergyConsumption(dataTimeValues:Array<DataTimeValue>,deviceInstances:Array<DeviceInstance>):Observable<Array<Array<string>>>{
    var energyConsumptionInput:EnergyConsumptionInput={
      dataTimeValues:dataTimeValues,
      deviceInstances:deviceInstances
    }
    var url=this.address+`analysis/getEnergyConsumption`;
    return this.http.post<Array<Array<string>>>(url,energyConsumptionInput,this.httpOptions);
  }
}
