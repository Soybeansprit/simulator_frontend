import { Injectable } from '@angular/core';
import { Scene } from '../class/scene';

@Injectable()

export class MainData{
    public storage: any={
        generateModelParameters:null,
        scenes: new Array<Scene>(),
        selectedSceneName:"",
        simulationTime:"",
        scenesTree:null,
        ruleText:"",
        uploadedFileName:"",
        show_tree:"none",
        show_scenes_rules: "none",
        show_rules_scenes:  "none"
    };

    public constructor() { }
}