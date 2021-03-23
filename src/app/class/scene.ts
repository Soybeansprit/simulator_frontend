import { StringMap } from "@angular/compiler/src/compiler_facade_interface";

export interface Scene{
    sceneName:string;
    datasTimeValue:Array<DataTimeValue>;
    nameDataFunctions:Array<NameDataFunction>;
    devicesAnalysResults:Array<DeviceAnalysResult>;
    triggeredRulesName:Array<DataTimeValue>;
    cannotTriggeredRulesName:Array<string>;

}

export interface DataTimeValue{
    name:string;
    timeValue:Array<number[]>;

}

export interface NameDataFunction{
    name:string;
    dataFunctions:Array<DataFunction>;
}

export interface DataFunction{
    downTime:number;
    upTime:number;
    downValue:number;
    upValue:number;
    function:Function;
}
export interface Function{
    a:number;
    b:number;
}

export interface DeviceAnalysResult{
    deviceName:string;
    statesConflict:DeviceConflict;
    statesChange:StatesChange;
    deviceStateLastTime:DeviceStateTime;
    deviceCannotOff:DeviceCannotOff;
    deviceStateName:DeviceStateName;

}

export interface DeviceConflict{
    name:string;
    hasConflict:boolean;
    conflictTimes:Array<ConflictTime>;
}

export interface ConflictTime{
    conflictStates:Array<string[]>;
    conflictTime:string;
}

export interface StatesChange{
    statesChangeCount:number;
    statesChangeFrequence:number;
    stateChangeFasts:Array<StateChangeFast>;
}

export interface StateChangeFast{
    startTimeValue:number[];
    middleTimeValue:number[];
    endTimeValue:number[];
}

export interface DeviceStateTime{
    name:string;
    statesTime:Array<StateLastTime>;
}

export interface StateLastTime{
    state:string;
    stateName:string;
    lastTime:number;
}

export interface DeviceCannotOff{
    cannotOff:boolean;
    cannotOffReason:CannotOffReason;
}

export interface CannotOffReason{
    reason:string;
    cannotTriggeredRules:Array<Rule>;
} 


export interface DeviceStateName{
    deviceName:string;
    stateNames:Array<StateNameRelativeRule>;

}

export interface StateNameRelativeRule{
    stateValue:string;
    stateName:string;
    relativeRules:Array<Rule>;
}

export interface Rule{
    ruleName:string;
    ruleContent:string;
    triggers:string;
    trigger:Array<string>;
    action:Array<string>;
}

export interface Action{
    action:string;
    device:string;
    toState:string;
    value:string;
    attrVal:Array<string>;
    rules:Array<Rule>
}

export interface RuleText{
    rules:Array<string>
}


export interface RulesSceneSimulationTime{
    rules:Array<Rule>;
    scene:Scene;
    simulationTime:string
}

export interface RulesAllScenesSimulationTime{
    rules:Array<Rule>;
    scenes:Array<Scene>;
    simulationTime:string
}


/////////////////////////////states conflict//////////////
export interface StateAndRuleAndCauseRule{
    stateValue:string;
    stateName:string;
    rulesAndCauseRules:Array<RuleAndCause>;
}

export interface RuleAndCause{
    selfRule:Rule;
    causeRules:Array<RuleAndCause>;
}

export interface CauseRuleInput{
    conflictStateTime:ConflictTime;
    triggeredRulesName:Array<DataTimeValue>;
    deviceStateName:DeviceStateName;
    rules:Array<Rule>;
}

export interface AllCauseRuleInput{
    conflictStateTimes:Array<ConflictTime>;
    triggeredRulesName:Array<DataTimeValue>;
    deviceStateName:DeviceStateName;
    rules:Array<Rule>; 
}

///////////////conflict 总的分析/////////////////
export interface ConflictStateAndRules{
    conflictStateCauseRules:Array<StateAndRuleAndCauseRule>;
    count:number;
}

export interface DeviceConflictCauseRule{
    deviceName:string;
    conflictStatisticCauseRuleList:Array<ConflictStateAndRules>;
}


/////////////////////////state changes////////////////////////
export interface WholeAndCurrentChangeCauseRule{
    wholeStateChangesCauseRules:Array<StateChangeCauseRules>;
    currentStateChangeCauseRules:StateChangeCauseRules;
}

export interface StateChangeCauseRules{
    start: TimeStateRelativeRules;
    middle: TimeStateRelativeRules;
    end: TimeStateRelativeRules;
}

export interface TimeStateRelativeRules{
    time:number;
    stateName:string;
    relativeRules:Array<Rule>;
}

export interface StateChangeCauseRuleInput{
    triggeredRulesName:Array<DataTimeValue>;
    deviceStateName:DeviceStateName;
    stateChangeFasts:Array<StateChangeFast>;
    stateChangeFast:StateChangeFast;
}


export interface StateRules{
    stateName:string;
    causeRules:Array<Rule>;
    count:number;
}

export interface DeviceFastChangeCause{
    deviceName:string;
    fastChangeCauseRuleList:Array<Array<StateRules>>;
}


export interface DeviceStateReachable{
    deviceName:string;
    stateReachable:Array<StateReachable>;

}
export interface StateReachable{
    stateName:string;
    stateValue:string;
    reachable:boolean;
    rules:Array<Rule>;
}

export interface DeviceNotOff{
    deviceName:string;
    rules:Array<Rule>;
}



export interface AllScenesAnalysisInput{
    scenes:Array<Scene>;
    rules:Array<Rule>;
}


export interface RuleAnalysis{
    rule:Rule;
    canTriggered:boolean;
    canCauseStateConflict:CanCauseStateConflict;
    canCauseFastChange:CanCauseFastChange;
}

export interface CanCauseStateConflict{
    canCauseStateConflict:boolean;
    devicesStateCounterRules:Array<DeviceStateCounterRules>
}

export interface CanCauseFastChange{
    canCause:boolean;
    devicesStateCouterRules:Array<DeviceStateCounterRules>
}

export interface DeviceStateCounterRules{
    deviceName:string;
    deviceState:string;
    counterRules:Array<CounterRule>;
}

export interface CounterRule{
    rule:Rule;
    deviceState:string;
    occurScenes:Array<Scene>
}




export interface DeviceSceneConflictCauseRule{
    deviceName:string;
    scenesConflcitStateCasueRule:Array<SceneConflictStateCauseRule>;
}

export interface SceneConflictStateCauseRule{
    sceneName:String;
    conflictCauseRuleStatistic:Array<CountStatesCauseRule>;
}

export interface CountStatesCauseRule{
    count:number;
    statesCauseRule:Array<StateCauseRule>;
}

export interface StateCauseRule{
    stateValue:string;
    stateName:string;
    causeRules:Array<RuleAndCause>;
}

export interface DeviceSceneFastChangeCauseRule{
    deviceName:string;
    scenesFastChangeCauseRule:Array<SceneFastChangeCauseRule>;
}

export interface SceneFastChangeCauseRule{
    sceneName:string;
    fastChangeStateCauseRuleCountList:Array<StateCauseRuleCount>;
}

export interface DeviceScenesFastChangeCauseRule{
    deviceName:string;
    scenesFastChangeCauseRules:Array<ScenesFastChangeCauseRule>;
}

export interface ScenesFastChangeCauseRule{
    sceneNames:Array<string>;
    fastChangeStateCauseRuleCountList:Array<StateCauseRuleCount>;
}

export interface StateCauseRuleCount{
    stateName:string;
    rulesCount:Array<RuleCount>;
}

export interface RuleCount{
    causeRule:RuleAndCause;
    count:number;
}

export interface DeviceAllSceneConflictRule{
    deviceName:string;
    allCountStateCauseRuleSceneName:Array<CountStatesCauseRuleSceneName>;
}

export interface CountStatesCauseRuleSceneName{
    sceneNames:Array<string>;
    countStatesCauseRule:CountStatesCauseRule;
}

export interface DeviceAllSceneFastChangeRule{
    deviceName:string;
    allFastChangeStateCauseRuleCountSceneName:Array<StateCauseRuleCountSceneName>;
}

export interface StateCauseRuleCountSceneName{
    stateName:string;
    rulesCountSceneName:Array<RuleCountSceneName>;
}

export interface RuleCountSceneName{
    sceneNames:Array<string>;
    ruleCount:RuleCount;
}

export interface AllRuleAnalysisResult{
    scenes:Array<Scene>;
    rulesNeverTriggered:Array<RuleAndCause>;
    devicesAllSceneConflictRule:Array<DeviceAllSceneConflictRule>;
    devicesAllSceneFastChangeRule:Array<DeviceAllSceneFastChangeRule>;
    devicesSceneConflictCauseRule:Array<DeviceSceneConflictCauseRule>;
    devicesSceneFastChangeCauseRule:Array<DeviceSceneFastChangeCauseRule>;
}

export interface RuleCauseRuleInput{
    causeRules:Array<Rule>,
    rules:Array<Rule>
}

export interface DeviceStatesCauseRules{
    deviceName:string;
    statesRules:Array<StateCauseRules>
}

export interface StateCauseRules{
    stateName:string;
    causeRules:Array<RuleAndCause>
}