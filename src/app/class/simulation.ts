import { DeviceInstance } from "./instance";
import { Rule } from "./rule";

export class DataTimeValue {
	/////仿真结果数据格式
	name="";

	dataName=""; ////数据名
	instanceName="";  ////所属实例名
	isDevice:boolean=false;  ///是否是设备
	timeValues=new Array<number[]>();   ////(time,value)列表，为仿真结果存储格式  timeValue[0]是时间，timeValue[1]是取值


	// public getName() {
	// 	return this.dataName;
	// }
	// public void setName(String name) {
	// 	this.name = name;
	// }

	// public String getDataName() {
	// 	return dataName;
	// }

	// public void setDataName(String dataName) {
	// 	this.dataName = dataName;
	// }

	// public String getInstanceName() {
	// 	return instanceName;
	// }

	// public void setInstanceName(String instanceName) {
	// 	this.instanceName = instanceName;
	// }

	// public boolean isDevice() {
	// 	return isDevice;
	// }

	// public void setDevice(boolean device) {
	// 	isDevice = device;
	// }

	// public List<double[]> getTimeValues() {
	// 	return timeValues;
	// }
	// public void setTimeValues(List<double[]> timeValues) {
	// 	this.timeValues = timeValues;
	// }


	public toString() {
		return "DataTimeValue{" +
				", dataName='" + this.dataName + '\'' +
				", instanceName='" + this.instanceName + '\'' +
				", timeValues=" + this.timeValues +
				'}';
	}
}

export class ScenesTree{
    name:string="";
    children=new Array<SceneChild>();

}

export class SceneChild {
    name:string="";
    children=new Array<AttributeValue>();
}

export class AttributeValue{
    name:string="";
    value?:number;
}

export class Scenario {
    scenarioName="";  ////场景名
    dataTimeValues=new Array<DataTimeValue>(); ///仿真路径
    deviceConflicts=new Array<DeviceConflict>();
    deviceJitters=new Array<DeviceJitter>();

}

export class DeviceConflict{
    instanceName="";
    conflictTimeValues=new Array<Array<number>>();
}

export class DeviceJitter{
    instanceName="";
    jitterTimeValues=new Array<Array<Array<number>>>();
}


export class DeviceAnlaysis{
    instanceName="";
    hasConflict=false;
    conflictScenarios=new Array<string>();
    hasJitter=false;
    jitterScenarios=new Array<string>();
	
}



export class DeviceStateAndCausingRules{
    deviceName="";
    stateName="";
    stateValue=0;
    causingRulesAndPreRules=new Array<RuleAndPreRule>();
}

export class RuleAndPreRule{
    currentRule=new Rule();
    preRules=new Array<RuleAndPreRule>();
}