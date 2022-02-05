import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { observable, Observable, of } from 'rxjs';
import { EnvironmentStatic } from '../class/scene';
import { Rule, StaticAnalysisResult } from '../class/rule';
import { InstanceLayer } from '../class/instance';
import { StaticAnalysisInput } from '../class/input-style';
@Injectable({
  providedIn: 'root'
})
export class StaticAnalysisService {

  constructor(private http:HttpClient) { }

  httpOptions = {
  	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  address:string="http://localhost:8083/";

  
  getStaticAnalysisResult(ruleText:string,initModelFileName:string,propertyFileName:string):Observable<EnvironmentStatic>{

    var ruleTextLines:Array<string>;
    if(ruleText.indexOf("\r\n")>0){
      
      ruleTextLines=ruleText.split("\r\n");
    }else if(ruleText.indexOf("\n")>0){
      
      ruleTextLines=ruleText.split("\n");
    }else {
      
      ruleTextLines=ruleText.split("\n");
    }
    
    var url=this.address+`analysis/getStaticAnalysisResult?initModelFileName=${initModelFileName}&propertyFileName=${propertyFileName}`;
    return this.http.post<EnvironmentStatic>(url,ruleTextLines,this.httpOptions);
  }

  getStaticAnalysis(rules:Array<Rule>,interactiveEnvironment:InstanceLayer):Observable<StaticAnalysisResult>{
    var staticAnalysisInput:StaticAnalysisInput={
      rules:rules,
      instanceLayer:interactiveEnvironment      
    }
    var url=this.address+`analysis/getStaticAnalysis`;
    return this.http.post<StaticAnalysisResult>(url,staticAnalysisInput,this.httpOptions);
  }



}
