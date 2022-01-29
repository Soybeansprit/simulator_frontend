import { DeviceInstance, InstanceLayer } from "./instance";
import { ModelLayer } from "./model";
import { Rule } from "./rule";
import { DataTimeValue, Scenario, ScenesTree } from "./simulation";

export class  ModelInstanceLayerAndRuleStrs{
    modelLayer=new ModelLayer();
    instanceLayer=new InstanceLayer();
    ruleTestLines=new Array<string>();
}

export class SingleScenarioGenerateInput {
    modelFileName="";
    modelLayer=new ModelLayer();
    instanceLayer=new InstanceLayer();
    interactiveInstance=new InstanceLayer();
    rules=new Array<Rule>();
    simulationTime="";
    attributeValues=new Array<Array<string>>();
    
}

export class MultiScenarioGenerateInput {
    modelFileName="";
    modelLayer=new ModelLayer();
    instanceLayer=new InstanceLayer();
    interactiveInstance=new InstanceLayer();
    rules=new Array<Rule>();
    simulationTime="";
}

export class MultiScenarioSimulateInput {
    modelFileName="";
    instanceLayer=new InstanceLayer();
    scenesTree=new ScenesTree();
}

export class ConsumptionInput{
    dataTimeValue=new DataTimeValue();
    deviceInstance=new DeviceInstance();
}

export class LocationInput{
    deviceInstances=new Array<DeviceInstance>();
    rules=new Array<Rule>();
    scenarios=new Array<Scenario>();
    ifdFileName="";
}