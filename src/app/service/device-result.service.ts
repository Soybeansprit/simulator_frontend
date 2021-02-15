import { Injectable } from '@angular/core';
import { DeviceResult } from '../class/device-result';
import { Observable, of } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class DeviceResultService {
    DEVICERESULTS: DeviceResult[] = [
        {
            deviceName: 'smartHomeSecurity',
            conflict: {
                hasConflict: false,
                conflictTimeStates: null
            },
            finallyOff: false,
            onOffCounts: 0,

            deviceStates: [
                {
                    stateName: 'smsoff',
                    stateLastTime: 3.0,

                }, {
                    stateName: 'awayMode',
                    stateLastTime: 149.8700000000068,
                    relativeRules: ["rule25"]
                }, {
                    stateName: 'homeMode',
                    stateLastTime: 146.92999999986748,
                    relativeRules: ["rule24"]
                },]
        }, {
            deviceName: 'door',
            conflict: {
                hasConflict: false,
                conflictTimeStates: null
            },
            finallyOff: true,
            onOffCounts: 0,

            deviceStates: [
                {
                    stateName: 'dclosed',
                    stateLastTime: 300.0099999998743,
                    relativeRules:["rule23"]
                },]
        }, {
            deviceName: 'window',
            conflict: {
                hasConflict: true,
                conflictTimeStates: [
                    { time: 218.9999999999475, states: ["wopen", "wclosed"] },
                    { time: 224.9999999999421, states: ["wopen", "wclosed"] },
                    { time: 230.9999999999367, states: ["wopen", "wclosed"] }

                ]
            },
            finallyOff: true,
            onOffCounts: 29,

            deviceStates: [
                {
                    stateName: 'wclosed',
                    stateLastTime: 239.09999999992857,
                    relativeRules:["rule23","rule29","rule30"]
                }, {
                    stateName: 'wopen',
                    stateLastTime: 58.879999999946534,
                    relativeRules:["rule28"]
                },]
        }, {
            deviceName: 'robot',
            conflict: {
                hasConflict: false,
                conflictTimeStates: null
            },
            finallyOff: false,
            onOffCounts: 2,

            deviceStates: [
                {
                    stateName: 'rdock',
                    stateLastTime: 152.92999999986742,
                    relativeRules:["rule21"]
                }, {
                    stateName: 'rstart',
                    stateLastTime: 146.87000000000683,
                    relativeRules:["rule22"]
                },]
        }, {
            deviceName: 'fan',
            conflict: {
                hasConflict: true,
                conflictTimeStates: [
                    { time: 141.0000000000177, states: ["fon", "foff"] },
                    { time: 159.0000000000015, states: ["fon", "foff"] },
                    { time: 215.9999999999502, states: ["fon", "foff"] },
                    { time: 269.9999999999016, states: ["fon", "foff"] },
                    { time: 281.9999999998907, states: ["fon", "foff"] },
                    { time: 287.9999999998852, states: ["fon", "foff"] },

                ]
            },
            finallyOff: true,
            onOffCounts: 18,

            deviceStates: [
                {
                    stateName: 'foff',
                    stateLastTime: 188.44999999997455,
                    relativeRules:["rule7","rule15","rule18"]
                }, {
                    stateName: 'fon',
                    stateLastTime: 110.5799999999004,
                    relativeRules:["rule5","rule6","rule28"]
                },]
        }, {
            deviceName: 'blind',
            conflict: {
                hasConflict: false,
                conflictTimeStates: null
            },
            finallyOff: true,
            onOffCounts: 2,

            deviceStates: [
                {
                    stateName: 'bclosed',
                    stateLastTime: 191.9399999999717,
                    relativeRules:["rule18"]
                }, {
                    stateName: 'bopen',
                    stateLastTime: 107.92999999990258,
                    relativeRules:["rule26"]
                },]

        }, {
            deviceName: 'bulb',
            conflict: {
                hasConflict: false,
                conflictTimeStates: null
            },
            finallyOff: true,
            onOffCounts: 2,

            deviceStates: [
                {
                    stateName: 'boff',
                    stateLastTime: 152.9400000000068,
                    relativeRules:["rule18"]
                }, {
                    stateName: 'bon',
                    stateLastTime: 146.92999999986748,
                    relativeRules:["rule27"]
                },]

        }, {
            deviceName: 'heater',
            conflict: {
                hasConflict: false,
                conflictTimeStates: null
            },
            finallyOff: true,
            onOffCounts: 4,

            deviceStates: [
                {
                    stateName: 'heatoff',
                    stateLastTime: 293.8699999998797,
                    relativeRules:["rule16","rule17","rule18"]
                }, {
                    stateName: 'heaton',
                    stateLastTime: 5.8599999999946135,
                    relativeRules:["rule1"]
                },]
        }, {

            deviceName: 'humidifier',
            conflict: {
                hasConflict: false,
                conflictTimeStates: null
            },
            finallyOff: true,
            onOffCounts: 2,

            deviceStates: [
                {
                    stateName: 'hoff',
                    stateLastTime: 266.939999999904,
                    relativeRules:["rule4"]
                }, {
                    stateName: 'hon',
                    stateLastTime: 32.929999999970306,
                    relativeRules:["rule3"]
                },]
        }, {
            deviceName: 'airConditioner',
            conflict: {
                hasConflict: false,
                conflictTimeStates: null
            },
            finallyOff: true,
            onOffCounts: 2,

            deviceStates: [
                {
                    stateName: 'acoff',
                    stateLastTime: 152.9400000000068,
                    relativeRules:["rule18"]
                }, {
                    stateName: 'heat',
                    stateLastTime: 86.78999999992178,
                    relativeRules:["rule19"]
                }, {
                    stateName: 'cool',
                    stateLastTime: 59.859999999945785,
                    relativeRules:["rule2","rule20"]
                },]

        }, {
            deviceName: 'philipsHueLight',
            conflict: {
                hasConflict: true,
                conflictTimeStates: [
                    { time: 194.9999999999691, states: ["phlwhite", "phloff"] }

                ]
            },
            finallyOff: true,
            onOffCounts: 19,

            deviceStates: [
                {
                    stateName: 'phloff',
                    stateLastTime: 160.37999999999977,
                    relativeRules:["rule8","rule11"]
                }, {
                    stateName: 'phlwhite',
                    stateLastTime: 78.29999999992592,
                    relativeRules:["rule8","rule12","rule13"]
                }, {
                    stateName: 'phlred',
                    stateLastTime: 5.929999999994607,
                    relativeRules:["rule14"]
                }, {
                    stateName: 'phlblue',
                    stateLastTime: 53.43999999995145,
                    relativeRules:["rule9","rule10"]
                },]
        }
    ]
    constructor() { }

    getDeviceResults() {
        return new Observable((observer) => {

            setTimeout(() => {
                var deviceResults: DeviceResult[] = this.DEVICERESULTS;
                observer.next(deviceResults);
            }, 500)
        })
    }
}
