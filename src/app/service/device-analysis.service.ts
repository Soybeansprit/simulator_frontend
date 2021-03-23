import { Injectable } from '@angular/core';
import { ConflictStateAndRules, Rule, RuleAndCause, StateAndRuleAndCauseRule, StateChangeCauseRules, StateRules, TimeStateRelativeRules, WholeAndCurrentChangeCauseRule } from '../class/scene';
import { SceneService } from './scene.service';

@Injectable({
  providedIn: 'root'
})
export class DeviceAnalysisService {

  constructor(public sceneService:SceneService) { }



  /////////////////////////冲突分析//////////////////////////////
    /////////////////这个好像是对stateAndRuleAndCauseRules本身进行操作，因此会改变stateAndRuleAndCauseRules////////
  ////////////////不要让newStateAndRulAndCauseRules地址直接指向stateAndRuleAndCauseRules//copy///////////////////
  removeContraRules(stateAndRuleAndCauseRules:Array<StateAndRuleAndCauseRule>):Array<StateAndRuleAndCauseRule>{
    var newStateAndRuleAndCauseRules:Array<StateAndRuleAndCauseRule>=new Array<StateAndRuleAndCauseRule>();
    for(let i=0;i<stateAndRuleAndCauseRules.length;i++){
      var stateName=stateAndRuleAndCauseRules[i].stateName;
      var stateValue=stateAndRuleAndCauseRules[i].stateValue;
      var ruleCauseRules:Array<RuleAndCause>=[];
      for(let j=0;j<stateAndRuleAndCauseRules[i].rulesAndCauseRules.length;j++){
        ruleCauseRules.push(stateAndRuleAndCauseRules[i].rulesAndCauseRules[j]);
      }
      var stateAndRuleAndCauseRule:StateAndRuleAndCauseRule={
        stateName:stateName,
        stateValue:stateValue,
        rulesAndCauseRules:ruleCauseRules
      }
      newStateAndRuleAndCauseRules.push(stateAndRuleAndCauseRule);
      
    }
    var sceneService=this.sceneService;
    var stateCauseRule:StateAndRuleAndCauseRule|null=null;
    for(let i=0;i<newStateAndRuleAndCauseRules.length;i++){
      if(newStateAndRuleAndCauseRules[i].rulesAndCauseRules.length===1){
        stateCauseRule=newStateAndRuleAndCauseRules[i];
        break;
      }
    }
    if(stateCauseRule!=null){
      var stateCauseRuleAttrVals:Array<Array<string>>=[];
      var stateCauseRuleTriggers=stateCauseRule.rulesAndCauseRules[0].selfRule.trigger;
      for(let i=0;i<stateCauseRuleTriggers.length;i++){
        var attrVal:Array<string>=sceneService.getTriggerAttrVal(stateCauseRuleTriggers[i]);
        stateCauseRuleAttrVals.push(attrVal);
      }
      for(let i=0;i<newStateAndRuleAndCauseRules.length;i++){
        if(newStateAndRuleAndCauseRules[i].stateName===stateCauseRule.stateName){
          continue;
        }
        var rules=newStateAndRuleAndCauseRules[i].rulesAndCauseRules;
        var newRules:Array<RuleAndCause>=[];
        rules.forEach(function(rule,index,arr){
          ////////////forEach方法删除后index并不会相应改变，故后面的没法删掉了///////////////
          /////////改成将没有矛盾的添加到新的
          var triggers=rule.selfRule.trigger;
          var existContra=false;
          second:
          for(let j=0;j<triggers.length;j++){
            var attrVal=sceneService.getTriggerAttrVal(triggers[j]);
            for(let k=0;k<stateCauseRuleAttrVals.length;k++){
              if(sceneService.triggerExistContra(attrVal,stateCauseRuleAttrVals[k])){
                existContra=true;
                break second;
              }
            }
          }
          if(!existContra){
            newRules.push(rules[index]);
          }
        })
        newStateAndRuleAndCauseRules[i].rulesAndCauseRules=newRules;
      }
    }
    return newStateAndRuleAndCauseRules;
  }

//////////////////////conflict原因统计///////////////////////
  conflictStatistics(stateCauseRulesList:Array<Array<StateAndRuleAndCauseRule>>):Array<ConflictStateAndRules>{
    var conflictStatesRulesList:Array<ConflictStateAndRules>=[];
    for(let i=0;i<stateCauseRulesList.length;i++){
      var exist=false;
      second:
      for(let j=0;j<conflictStatesRulesList.length;j++){
        if(this.stateCauseRulesEqual(stateCauseRulesList[i],conflictStatesRulesList[j].conflictStateCauseRules)){
          conflictStatesRulesList[j].count++;
          exist=true;
          break second;
        }
      }
      if(!exist){
        var hasRule=true;
        third:
        for(let k=0;k<stateCauseRulesList[i].length;k++){
          if(stateCauseRulesList[i][k].rulesAndCauseRules.length===0){
            hasRule=false;
            break third;
          }
        }
        if(this.conflictStatesHaveCauseRules(stateCauseRulesList[i])){
          var conflictStatesRules:ConflictStateAndRules={
            conflictStateCauseRules:stateCauseRulesList[i],
            count:1
          }
          conflictStatesRulesList.push(conflictStatesRules)
        }
        
      }



    }
    // console.log("conflictStatistics:")
    // console.log(conflictStatesRulesList)
    return conflictStatesRulesList;


    //////////////感觉需要继续统计///////////////

  }

  //////////////////////////判断当前冲突的各个状态是否都有相应规则导致，如无则不显示
  conflictStatesHaveCauseRules(stateCauseRules:Array<StateAndRuleAndCauseRule>):boolean{
    for(let i=0;i<stateCauseRules.length;i++){
      if(stateCauseRules[i].rulesAndCauseRules.length===0){
        return false;
      }
    }
    return true;
  }

  stateCauseRulesEqual(stateCauseRules1:Array<StateAndRuleAndCauseRule>,stateCauseRules2:Array<StateAndRuleAndCauseRule>):boolean{
    if(stateCauseRules1.length!=stateCauseRules2.length){
      return false;
    }
    for(let i=0;i<stateCauseRules1.length;i++){
      var exist=false;
      second:
      for(let j=0;j<stateCauseRules2.length;j++){
        if(stateCauseRules1[i].stateName===stateCauseRules2[j].stateName){
          if(this.causeRuleEqual(stateCauseRules1[i].rulesAndCauseRules,stateCauseRules2[j].rulesAndCauseRules)){
            exist=true;
            break second;
          }
        }
      }
      if(!exist){
        return false
      }
    }
    return true;
  }

  causeRuleEqual(causeRuleList1:Array<RuleAndCause>,causeRuleList2:Array<RuleAndCause>):boolean{
    
    if(causeRuleList2.length!=causeRuleList1.length){
      return false;
    }
    for(let i=0;i<causeRuleList1.length;i++){
      var exist=false;
      second:
      for(let j=0;j<causeRuleList2.length;j++){
        if(causeRuleList1[i].selfRule.ruleName===causeRuleList2[j].selfRule.ruleName){
          exist=true;
          break second;
        }
      }
      if(!exist){
        return false;
      }
    }
    return true;
  }




  ////////////////////////////frequent change分析////////////////////////
    /////////////////////分段分析////////////////////////
    frequentChangeAnalysis(timeStateRelativeRulesListList: Array<Array<TimeStateRelativeRules>>){
      var stateRuleListList:Array<Array<StateRules>>=[];
      for(let i=0;i<timeStateRelativeRulesListList.length;i++){
        var stateRuleList:Array<StateRules>=[];
        for(let j=0;j<timeStateRelativeRulesListList[i].length;j++){
          if(j===0){
            continue;
          }
          var exist=false;
          third:
          for(let k=0;k<stateRuleList.length;k++){
            if(this.timeStateRulesEqual(timeStateRelativeRulesListList[i][j],stateRuleList[k])){
              exist=true;
              stateRuleList[k].count++;
              break third;
            }
          }
          if(!exist){
            stateRuleList.push({
              stateName:timeStateRelativeRulesListList[i][j].stateName,
              causeRules:timeStateRelativeRulesListList[i][j].relativeRules,
              count:1
            })
          }
        }
        stateRuleListList.push(stateRuleList)
      }
      console.log("stateRuleListList")
      console.log(stateRuleListList)
    }
  
    ////////////////////////////总的分析/////////////////////
    frequentChangeAnalysisAll(timeStateRelativeRulesListList: Array<Array<TimeStateRelativeRules>>):Array<Array<StateRules>>{
      var stateRuleList:Array<StateRules>=[];
      for(let i=0;i<timeStateRelativeRulesListList.length;i++){
        for(let j=0;j<timeStateRelativeRulesListList[i].length;j++){
          if(j===0){
            continue;
          }
          var exist=false;
          third:
          for(let k=0;k<stateRuleList.length;k++){
            if(this.timeStateRulesEqual(timeStateRelativeRulesListList[i][j],stateRuleList[k])){
              exist=true;
              stateRuleList[k].count++;
              break third;
            }
          }
          if(!exist){
            //////////////////如果导致一个状态发生的规则之间有冲突，则不考虑
            var ruleExistContra=false;
            forth:
            for(let n=0;n<timeStateRelativeRulesListList[i][j].relativeRules.length;n++){
              for(let m=0;m<timeStateRelativeRulesListList[i][j].relativeRules.length;m++){
                if(n!=m){
                  if(this.existRuleContra(timeStateRelativeRulesListList[i][j].relativeRules[n],timeStateRelativeRulesListList[i][j].relativeRules[m])){
                    ruleExistContra=true;
                    break forth;
                  }
                }
              }
            }
            if(!ruleExistContra){
              stateRuleList.push({
                stateName:timeStateRelativeRulesListList[i][j].stateName,
                causeRules:timeStateRelativeRulesListList[i][j].relativeRules,
                count:1
              })
            }
  
          }
        }
      }
      // console.log("allFrequentChangeAnalysis stateRuleList")
      // console.log(stateRuleList)
      var stateRuleListList:Array<Array<StateRules>>=[];
      for(let i=0;i<stateRuleList.length;i++){
        var exist=false;
        second:
        for(let j=0;j<stateRuleListList.length;j++){
          if(stateRuleList[i].stateName===stateRuleListList[j][0].stateName){
            stateRuleListList[j].push(stateRuleList[i]);
            exist=true;
            break second;
          }
        }
        if(!exist){
          var newStatRuleList:Array<StateRules>=[];
          newStatRuleList.push(stateRuleList[i]);
          stateRuleListList.push(newStatRuleList)
        }
      }
  
      // console.log("newAllStateRuleListList")
      // console.log(stateRuleListList)
      return stateRuleListList
    }
  
              //////////////////如果导致一个状态发生的规则之间有冲突，则不考虑
    existRuleContra(rule1:Rule,rule2:Rule):boolean{
      var triggers1:Array<string>=rule1.trigger;
      var triggers2:Array<string>=rule2.trigger;
      var attrVals1:Array<Array<string>>=[];
      for(let i=0;i<triggers1.length;i++){
        attrVals1.push(this.sceneService.getTriggerAttrVal(triggers1[i]));
      }
      for(let i=0;i<triggers2.length;i++){
        var attrVal2=this.sceneService.getTriggerAttrVal(triggers2[i]);
        for(let j=0;j<attrVals1.length;j++){
          if(this.sceneService.triggerExistContra(attrVal2,attrVals1[j])){
            return true;
          }
        }
      }
      return false;
    }
  
    timeStateRulesEqual(timeStateRelativeRules:TimeStateRelativeRules,stateRules:StateRules):boolean{
      if(timeStateRelativeRules.stateName!=stateRules.stateName){
        return false;
      }
      if(!this.ruleEqual(timeStateRelativeRules.relativeRules,stateRules.causeRules)){
        return false;
      }
      return true;
    }
  
    ruleEqual(rules1:Array<Rule>,rules2:Array<Rule>):boolean{
      if(rules1.length!=rules2.length){
        return false;
      }
      for(let i=0;i<rules1.length;i++){
        var exist=false;
        for(let j=0;j<rules2.length;j++){
          if(rules1[i].ruleName===rules2[j].ruleName){
            exist=true;
            break;
          }
        }
        if(!exist){
          return false;
        }
      }
      return true;
    }

    fastChangeCauseRules(wholeChangeCauseRule: Array<StateChangeCauseRules>):Array<Array<TimeStateRelativeRules>> {
      // StateChangeCauseRules
      var timeStateRelativeRulesListList: Array<Array<TimeStateRelativeRules>> = [];
      first:
      for (let i = 0; i < wholeChangeCauseRule.length;) {
        // console.log(wholeAndCurrentChangeCauseRule.wholeStateChangesCauseRules.length)
        var stateChangeCauseRules = wholeChangeCauseRule[i];
        var timeStateRelativeRulesList: Array<TimeStateRelativeRules> = [];
        timeStateRelativeRulesList.push(stateChangeCauseRules.start);
        timeStateRelativeRulesList.push(stateChangeCauseRules.middle);
        timeStateRelativeRulesList.push(stateChangeCauseRules.end);
        if (i < wholeChangeCauseRule.length - 1) {
          var j = i + 1;
          second:
          for (; j < wholeChangeCauseRule.length; j++) {
            var nextStateChangeCauseRules = wholeChangeCauseRule[j];
            i = j;
            if (nextStateChangeCauseRules.start.time < stateChangeCauseRules.end.time) {
              timeStateRelativeRulesList.push(nextStateChangeCauseRules.end);
              stateChangeCauseRules = nextStateChangeCauseRules;
            } else {
              timeStateRelativeRulesListList.push(timeStateRelativeRulesList);
  
              break second;
            }
          }
          if (j === wholeChangeCauseRule.length) {
            timeStateRelativeRulesListList.push(timeStateRelativeRulesList);
            i = j;
          }
  
  
        } else {
  
          timeStateRelativeRulesListList.push(timeStateRelativeRulesList);
  
  
          i++;
        }
      }
      return timeStateRelativeRulesListList;
      

    }

    getRuleContent(ruleContent:string):string{
      return ruleContent.substring(ruleContent.indexOf("IF"));
    }
}
