
import { Action, Rule } from "./scene";
import { ScenesTree } from "./scenes-tree";

export interface GenerateModelParameters{
    // controlledDevices:Array<TemplGraph>;
    attributes:Array<string>;
    scenesTree:ScenesTree;
    rules:Array<Rule>;
    actions:Array<Action>;
    simulationDataNum:number;
}



export interface TemplGraph{
    name:string|null;
    declaration:string|null;
    parameter:string|null;
    init:string|null;
    templGraphNodes:Array<TemplGraphNode>;
}

export interface TemplGraphNode{
    name:string|null;
    id:string|null;
    invariant:string|null;
    style:string|null;
    flag:boolean;
    inTransitions:Array<TemplTransition>;
    outTransitions:Array<TemplTransition>;
}

export interface TemplTransition{
    source:string|null;
    target:string|null;
    node:TemplGraphNode|null;
    assignment:string|null;
    synchronisation:string|null;
    guard:string|null;
    probability:string|null;
}