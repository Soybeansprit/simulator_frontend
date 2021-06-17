import { Injectable } from '@angular/core';
import { Scene,EnvironmentModel } from '../class/scene';

@Injectable()

export class MainData{
    public storage: any={
        scenes: new Array<Scene>(),
        selectedSceneName:"",
        simulationTime:"300",
        equivalentTime:"24",
        intervalTime:"300",
        scenesTree:null,
        ruleText:"",
        show_tree:"none",
        show_scenes_rules: "none",
        show_rules_scenes:  "none",
        environmentModel:null,
        staticAnalysisResult:null,
        initModelFileName:"",
        propertyFileName:""
    };

    public constructor() { }
}