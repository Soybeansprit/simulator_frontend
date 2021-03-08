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

export interface RuleText{
    rules:Array<string>
}


export interface RulesSceneSimulationTime{
    rules:Array<Rule>;
    scene:Scene;
    simulationTime:string
}


/////////////////////////////states conflict//////////////
export interface StateAndRuleAndCauseRule{
    stateValue:string;
    stateName:string;
    rulesAndCauseRules:Array<RuleAndCause>;
}

export interface RuleAndCause{
    rule:Rule;
    relativeRules:Array<RuleAndCause>;
}

export interface CauseRuleInput{
    conflictStateTime:ConflictTime;
    triggeredRulesName:Array<DataTimeValue>;
    deviceStateName:DeviceStateName;
    rules:Array<Rule>;
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