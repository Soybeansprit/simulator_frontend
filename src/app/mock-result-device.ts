import {DeviceResult} from './class/device-result';

export const DEVICERESULTS: DeviceResult[]=[
{
    deviceName:'smartHomeSecurity',
conflict:{
 hasConflict:false,
},
finallyOff:false,
onOffCounts:0,

deviceStates:[
{
stateName:'smsoff',
stateLastTime:3.0,

},{
stateName:'awayMode',
stateLastTime:149.8700000000068,

},{
stateName:'homeMode',
stateLastTime:146.92999999986748,

},]
},{
    deviceName:'door',
conflict:{
 hasConflict:false,
},
finallyOff:true,
onOffCounts:0,

deviceStates:[
{
stateName:'dclosed',
stateLastTime:300.0099999998743,

},]
},{
    deviceName:'window',
conflict:{
 hasConflict:true, 
 conflictTime:[
,218.9999999999475
,224.9999999999421
,230.9999999999367

]},
finallyOff:true,
onOffCounts:29,

deviceStates:[
{
stateName:'wclosed',
stateLastTime:239.09999999992857,

},{
stateName:'wopen',
stateLastTime:58.879999999946534,

},]
},{
    deviceName:'robot',
conflict:{
 hasConflict:false,
},
finallyOff:false,
onOffCounts:2,

deviceStates:[
{
stateName:'rdock',
stateLastTime:152.92999999986742,

},{
stateName:'rstart',
stateLastTime:146.87000000000683,

},]
},{
    deviceName:'fan',
conflict:{
 hasConflict:true, 
 conflictTime:[
,141.0000000000177
,159.0000000000015
,215.9999999999502
,269.9999999999016
,281.9999999998907
,287.9999999998852

]},
finallyOff:true,
onOffCounts:18,

deviceStates:[
{
stateName:'foff',
stateLastTime:188.44999999997455,

},{
stateName:'fon',
stateLastTime:110.5799999999004,

},]
},{
    deviceName:'blind',
conflict:{
 hasConflict:false,
},
finallyOff:true,
onOffCounts:2,

deviceStates:[
{
stateName:'bclosed',
stateLastTime:191.9399999999717,

},{
stateName:'bopen',
stateLastTime:107.92999999990258,

},]

},{
    deviceName:'bulb',
conflict:{
 hasConflict:false,
 
},
finallyOff:true,
onOffCounts:2,

deviceStates:[
{
stateName:'boff',
stateLastTime:152.9400000000068,

},{
stateName:'bon',
stateLastTime:146.92999999986748,

},]

},{
    deviceName:'heater',
conflict:{
 hasConflict:false,
 
},
finallyOff:true,
onOffCounts:4,

deviceStates:[
{
stateName:'heatoff',
stateLastTime:293.8699999998797,

},{
stateName:'heaton',
stateLastTime:5.8599999999946135,

},]
},{
    
deviceName:'humidifier',
conflict:{
 hasConflict:false,
 
},
finallyOff:true,
onOffCounts:2,

deviceStates:[
{
stateName:'hoff',
stateLastTime:266.939999999904,

},{
stateName:'hon',
stateLastTime:32.929999999970306,

},]
},{
    deviceName:'airConditioner',
conflict:{
 hasConflict:false,

},
finallyOff:true,
onOffCounts:2,

deviceStates:[
{
stateName:'acoff',
stateLastTime:152.9400000000068,

},{
stateName:'heat',
stateLastTime:86.78999999992178,

},{
stateName:'cool',
stateLastTime:59.859999999945785,

},]

},{
    deviceName:'philipsHueLight',
conflict:{
 hasConflict:true, 
 conflictTime:[
,194.9999999999691

]},
finallyOff:true,
onOffCounts:19,

deviceStates:[
{
stateName:'phloff',
stateLastTime:160.37999999999977,

},{
stateName:'phlwhite',
stateLastTime:78.29999999992592,

},{
stateName:'phlred',
stateLastTime:5.929999999994607,

},{
stateName:'phlblue',
stateLastTime:53.43999999995145,

},]
}
]