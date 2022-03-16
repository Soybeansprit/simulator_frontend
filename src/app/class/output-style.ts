import { InstanceLayer } from "./instance";
import { ModelLayer } from "./model";
import { Rule } from "./rule";

export class InstanceLayerOutput{
    instanceLayer=new InstanceLayer();
    modelLayer=new ModelLayer();
}

export class  InteractiveLayerAndRules{
    interactiveInstance=new InstanceLayer();
    rules=new Array<Rule>();
    ifdFileName="";
}

export class BestScenarioOutput{
    attributeValues=new Array<Array<string>>();
    bestScenarioFileName="";

}

export class OtherAnalysisOutput{
	deviceCannotBeTurnedOffList=new Array<string>();
	notTriggeredRulesInAll=new Array<string>();
    homeBoundedOutBoundedResults=new Array<Array<Array<string>>>();
}