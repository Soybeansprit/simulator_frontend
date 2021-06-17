import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AllRuleAnalysisResult, AllScenesAnalysisInput, Rule, RuleAndCause, RuleCauseRuleInput, Scene, StaticAnalysisResult } from '../class/scene';
import { observable, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RuleAnalysisService {

  constructor(public http:HttpClient) { }
  httpOptions = {
  	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getAllScenesRulesAnalysisResult(scenes:Array<Scene>,rules:Array<Rule>,properties:Array<string>
    ,initFileName:string,simulationTime:string,equivalentTime:string,intervalTime:string):Observable<AllRuleAnalysisResult>{
      var allScenesAnalysisInput:AllScenesAnalysisInput={
        scenes:scenes,
        rules:rules,
        properties:properties
      }
      console.log("rulesAnalysis")
      console.log(scenes)
      console.log(rules);
      console.log(initFileName)
      console.log(simulationTime)
      console.log(equivalentTime)
      console.log(intervalTime)
      var url=`http://localhost:8083/str/getAllScenesRulesAnalysisResult?initFileName=${initFileName}&simulationTime=${simulationTime}&equivalentTime=${equivalentTime}&intervalTime=${intervalTime}`;
      return this.http.post<AllRuleAnalysisResult>(url,allScenesAnalysisInput,this.httpOptions);
    }

  getRuleCauseRule(causeRules:Array<Rule>,rules:Array<Rule>,initFileName:string):Observable<Array<RuleAndCause>>{

    var ruleCauseRuleInput:RuleCauseRuleInput={
      causeRules:causeRules,
      rules:rules
    }
    var url=`http://localhost:8083/str/getRuleCauseRule?initFileName=${initFileName}`;
    return this.http.post<Array<RuleAndCause>>(url,ruleCauseRuleInput,this.httpOptions)
  }

  getStaticAnalysisResult(ruleText:string,initFileName:string):Observable<StaticAnalysisResult>{

    var ruleTextLines:Array<string>;
    if(ruleText.indexOf("\r\n")>0){
      
      ruleTextLines=ruleText.split("\r\n");
    }else if(ruleText.indexOf("\n")>0){
      
      ruleTextLines=ruleText.split("\n");
    }else {
      
      ruleTextLines=ruleText.split("\n");
    }
    
    var url=`http://localhost:8083/str/getStaticAnalysisResult?initFileName=${initFileName}`;
    return this.http.post<StaticAnalysisResult>(url,ruleTextLines,this.httpOptions);
  }
}
