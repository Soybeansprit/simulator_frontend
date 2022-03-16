import { Injectable } from '@angular/core';
import { InstanceLayer } from '../class/instance';
import { ModelLayer } from '../class/model';
import { Rule } from '../class/rule';
import { Scene,EnvironmentModel } from '../class/scene';
import { Scenario, ScenesTree } from '../class/simulation';

@Injectable()

export class MainData{
    public storage={
        scenarios:new Array<Scenario>(),
        selectedScenario: new Scenario(),
        singleScenario:new Scenario(),
        simulationTime:"300",
        equivalentTime:"24",
        intervalTime:"300",
        scenesTree: new ScenesTree(),
        ruleText:"",
        ruleTextFinal: "",
        modelLayer:new ModelLayer(),
        instanceLayer:new InstanceLayer(),
        interactiveInstances:new InstanceLayer(),
        interactiveGenerated:false,
        initModelFileName:"",
        rules:new Array<Rule>(),
        attributeNames:new Array<string>(),
        attributeValues:new Array<Array<string>>(),
        ifdFileName:""
    };

    public constructor() { }
}