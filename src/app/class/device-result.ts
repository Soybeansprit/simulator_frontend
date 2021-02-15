export interface DeviceResult{
    deviceName: string,
    finallyOff: boolean,
    onOffCounts:number,
    deviceStates:DeviceState[],
    conflict:ConflictTime

}

export interface DeviceState{
    stateName:string,
    stateLastTime:number,
    relativeRules?:any;
}

export interface ConflictTime{
    hasConflict:boolean,
    conflictTimeStates?:any,
}