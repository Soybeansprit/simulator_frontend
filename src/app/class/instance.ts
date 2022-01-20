import { AttributeEntityType, CyberServiceType, DeviceType, Human, SensorType, UncertainEntityType } from "./model";

/**
 * 实例层
 * */
export class InstanceLayer {
    private humanInstance=new HumanInstance();
    private attributeEntityInstance=new AttributeEntityInstance();
    private uncertainEntityInstances=new Array<UncertainEntityInstance>();
    private cyberServiceInstances=new Array<CyberServiceInstance>();
    private deviceInstances=new Array<DeviceInstance>();
    private sensorInstances=new Array<SensorInstance>();

    public getHumanInstance() {
        return this.humanInstance;
    }

    public setHumanInstance( humanInstance:HumanInstance) {
        this.humanInstance = humanInstance;
    }

    public  getAttributeEntityInstance() {
        return this.attributeEntityInstance;
    }

    public setAttributeEntityInstance( attributeEntityInstance:AttributeEntityInstance) {
        this.attributeEntityInstance = attributeEntityInstance;
    }

    public getUncertainEntityInstances() {
        return this.uncertainEntityInstances;
    }

    public setUncertainEntityInstances( uncertainEntityInstances:Array<UncertainEntityInstance>) {
        this.uncertainEntityInstances = uncertainEntityInstances;
    }

    public getCyberServiceInstances() {
        return this.cyberServiceInstances;
    }

    public setCyberServiceInstances( cyberServiceInstances:Array<CyberServiceInstance>) {
        this.cyberServiceInstances = cyberServiceInstances;
    }

    public getDeviceInstances() {
        return this.deviceInstances;
    }

    public setDeviceInstances( deviceInstances:Array<DeviceInstance>) {
        this.deviceInstances = deviceInstances;
    }

    public getSensorInstances() {
        return this.sensorInstances;
    }

    public setSensorInstances( sensorInstances:Array<SensorInstance>) {
        this.sensorInstances = sensorInstances;
    }
}

export class Instance {
    private instanceName="";
    private entityTypeName="";

    public  getInstanceName() {
        return this.instanceName;
    }

    public setInstanceName( instanceName:string) {
        this.instanceName = instanceName;
    }

    public getEntityTypeName() {
        return this.entityTypeName;
    }

    public setEntityTypeName( entityTypeName:string) {
        this.entityTypeName = entityTypeName;
    }
}

export class DeviceInstance extends Instance{
    private location="";
    private sequenceNumber=0;
    private deviceType=new DeviceType();

    public getLocation() {
        return this.location;
    }

    public setLocation( location:string) {
        this.location = location;
    }

    public getSequenceNumber() {
        return this.sequenceNumber;
    }

    public setSequenceNumber( sequenceNumber:number) {
        this.sequenceNumber = sequenceNumber;
    }

    public getDeviceType() {
        return this.deviceType;
    }

    public setDeviceType( deviceType:DeviceType) {
        this.deviceType = deviceType;
    }
}

export class CyberServiceInstance extends Instance{
    private cyberServiceType=new CyberServiceType();

    public getCyberServiceType() {
        return this.cyberServiceType;
    }

    public setCyberServiceType( cyberServiceType:CyberServiceType) {
        this.cyberServiceType = cyberServiceType;
    }
}

export class SensorInstance extends Instance{
    private sensorType=new SensorType();

    public getSensorType() {
        return this.sensorType;
    }

    public setSensorType( sensorType:SensorType) {
        this.sensorType = sensorType;
    }
}

export class UncertainEntityInstance extends Instance{
    private uncertainEntityType=new UncertainEntityType();

    public getUncertainEntityType() {
        return this.uncertainEntityType;
    }

    public setUncertainEntityType( uncertainEntityType:UncertainEntityType) {
        this.uncertainEntityType = uncertainEntityType;
    }
}
export class HumanInstance extends Instance{
    private human=new Human();

    public getHuman() {
        return this.human;
    }

    public setHuman( human:Human) {
        this.human = human;
    }
}
export class AttributeEntityInstance extends Instance{
    private attributeEntityType=new AttributeEntityType();

    public getAttributeEntityType() {
        return this.attributeEntityType;
    }

    public setAttributeEntityType( attributeEntityType:AttributeEntityType) {
        this.attributeEntityType = attributeEntityType;
    }
}