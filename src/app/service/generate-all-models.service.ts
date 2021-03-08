import { Injectable } from '@angular/core';
import * as echarts from 'echarts';
import * as $ from "jquery";
import {Observable,of} from 'rxjs';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {ScenesTree} from '../class/scenes-tree';
import {GenerateModelParameters} from '../class/generate-model-parameters';
import {Rule,RuleText, Scene} from '../class/scene';


@Injectable({
  providedIn: 'root'
})
export class GenerateAllModelsService {

  httpOptions = {
		headers: new HttpHeaders({ 'Content-Type': 'application/json' })
	};
  constructor(public http:HttpClient) { }

  generateAllModels(ruleText:string,initModelName:string,simulationTime:string):Observable<GenerateModelParameters>{

    var ruleTextLines:Array<string>;
    if(ruleText.indexOf("\r\n")>0){
      
      ruleTextLines=ruleText.split("\r\n");
    }else if(ruleText.indexOf("\n")>0){
      
      ruleTextLines=ruleText.split("\n");
    }else {
      
      ruleTextLines=ruleText.split("\n");
    }
   
    console.log(ruleTextLines)
    var url=`http://localhost:8083/str/generateAllModels?initModelName=${initModelName}&simulationTime=${simulationTime}`;
    return this.http.post<GenerateModelParameters>(url,ruleTextLines,this.httpOptions);

  }


  simulationAllModels(generateModelParameters: GenerateModelParameters,initModelName:string):Observable<Array<Scene>>{
    var url=`http://localhost:8083/str/simulateAllModels?initModelName=${initModelName}`;
    return this.http.post<Array<Scene>>(url,generateModelParameters,this.httpOptions);
  }







  // test(ruleText:string,initModelName:string,simulationTime:string):Observable<Array<Rule>>{
  //   // ruleText=encodeHtml(ruleText);
  

  //   var ruleTextLines:Array<string>;
  //   if(ruleText.indexOf("\r\n")>0){
  //     alert("\\r\\n换行符")
  //     ruleTextLines=ruleText.split("\r\n");
  //   }else if(ruleText.indexOf("\n")>0){
  //     alert("\\n换行符")
  //     ruleTextLines=ruleText.split("\n");
  //   }else {
  //     alert("无换行")
  //     ruleTextLines=ruleText.split("\n");
  //   }
   
  //   console.log(ruleTextLines)
  //   var url=`http://localhost:8083/str/generateAllModels?initModelName=${initModelName}&simulationTime=${simulationTime}`;
  //   console.log(url);
  //   console.log(ruleText)
  //   return this.http.post<Array<Rule>>(url,ruleTextLines,this.httpOptions);

  // //   function encodeHtml(str:String){
  // //     var encodedStr = "" ;
  // //     if (str=="") return encodedStr ;
  // //     else {
  // //         for (var i = 0 ; i < str.length ; i ++){
  // //             encodedStr += "&#" + str.substring(i, i + 1).charCodeAt().toString(10) + ";" ;
  // //         }
  // //     }
  // //     return encodedStr ;
  // // }
  // }



}
