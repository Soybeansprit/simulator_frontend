/**
 * 模型层
 * 包括 人、不确定实体、包含各环境属性的实体（air）、设备、传感器
 * */
 export class ModelLayer {
    private human=new Human();  ///一个人类型模型
    private attributeEntity=new AttributeEntityType();  ///一个具有各环境属性的实体类型模型
    private uncertainEntityTypes=new Array<UncertainEntityType>();  ///不确定实体类型
    private deviceTypes=new Array<DeviceType>();   ///设备类型
    private sensorTypes=new Array<SensorType>();   ///传感器类型
    private cyberServiceTypes=new Array<CyberServiceType>();  ///cyber service类型

    public getHuman() {
        return this.human;
    }

    public setHuman( human:Human) {
        this.human = human;
    }

    public getAttributeEntity() {
        return this.attributeEntity;
    }

    public setAttributeEntity( attributeEntity:AttributeEntityType) {
        this.attributeEntity = attributeEntity;
    }

    public getUncertainEntityTypes() {
        return this.uncertainEntityTypes;
    }

    public setUncertainEntityTypes( uncertainEntityTypes:Array<UncertainEntityType>) {
        this.uncertainEntityTypes = uncertainEntityTypes;
    }

    public getDeviceTypes() {
        return this.deviceTypes;
    }

    public setDeviceTypes(deviceTypes:Array<DeviceType> ) {
        this.deviceTypes = deviceTypes;
    }

    public getSensorTypes() {
        return this.sensorTypes;
    }

    public setSensorTypes(sensorTypes:Array<SensorType> ) {
        this.sensorTypes = sensorTypes;
    }

    public getCyberServiceTypes() {
        return this.cyberServiceTypes;
    }

    public setCyberServiceTypes(cyberServiceTypes:Array<CyberServiceType> ) {
        this.cyberServiceTypes = cyberServiceTypes;
    }
}

export class EntityType{
    private typeName:string=""; ///类型名
    private identifier=""; ///状态标识符

    public getTypeName() {
        return this.typeName;
    }

    public setTypeName(typeName:string) {
        this.typeName = typeName;
    }

    public getIdentifier() {
        return this.identifier;
    }

    public setIdentifier( identifier:string) {
        this.identifier = identifier;
    }
}

/**
 * 设备类型，可以有多个实例
 * 设备类型名，状态标识符，【设备状态名、信号通道、状态标识符取值以及对各个属性的影响值】
 * */
export class DeviceType extends EntityType{
    private instanceNumber=0;  ///实例数
    private stateSyncValueEffects:Array<StateSyncValueEffect>=new Array<StateSyncValueEffect>();  //各状态信息
    public getStateSyncValueEffects() {
		return this.stateSyncValueEffects;
	}

	public setStateSyncValueEffects( stateSyncValueEffects:Array<StateSyncValueEffect>) {
		this.stateSyncValueEffects = stateSyncValueEffects;
	}
    
}

export class StateSyncValueEffect {
    private stateName="";  ///状态名
    private stateId="";    ///对应xml文件中的节点id
    private synchronisation="";   ///对应同步信号通道
    private value="";  ///identifier取值
    private effects=new Array<String[]>();  ///effect[0]=attribute, effect[1]=delta（对于会对总变化率产生影响的）, effect[2]=影响值

    public getStateName() {
        return this.stateName;
    }

    public setStateName( stateName:string) {
        this.stateName = stateName;
    }

    public getStateId() {
        return this.stateId;
    }

    public setStateId( stateId:string) {
        this.stateId = stateId;
    }

    public getSynchronisation() {
        return this.synchronisation;
    }

    public setSynchronisation( synchronisation:string) {
        this.synchronisation = synchronisation;
    }

    public getValue() {
        return this.value;
    }

    public setValue( value:string) {
        this.value = value;
    }

    public  getEffects() {
        return this.effects;
    }

    public setEffects( effects:Array<string[]>) {
        this.effects = effects;
    }
    
}

/**
 * human，只有一个实例
 * 模型名，状态标识符，【状态名、状态标识符取值】
 * human模型是根据空间位置信息自动生成的
 * 直接把time声明在human模型下，作为局部变量
 * */
export class Human extends EntityType{
    private stateValues=new Array<string[]>();  //////stateValue[0]=状态名,stateValue[1]=状态id,stateValue[2]=状态标识符取值
    public getStateValues() {
        return this.stateValues;
    }

    public setStateValues(stateValues:Array<string[]>) {
        this.stateValues = stateValues;
    }

}

/**
 * 传感器类型，只有一个实例，但其实最终并不用于运行，因为系统运行时各模型之间其实是使用共享变量或者信号通道来进行交流
 * 传感器类型名，检测属性，检测属性类型
 * */
 export class SensorType extends EntityType{
	private monitoredEntityType=""; //检测属性所属模型类型
	private attribute="";  ///传感器检测什么属性


	private style="";   ///该属性所属实体的类型 "causal" or "biddable"
	private name="";

	public getStyle() {
		return this.style;
	}
	public setStyle( style:string) {
		this.style = style;
	}
	public getAttribute() {
		return this.attribute;
	}
	public setAttribute( attribute:string) {
		this.attribute = attribute;
	}

	public  getName() {
		return name;
	}

	public setName( name:string) {
		this.name = name;
	}


	public getMonitoredEntityType() {
		return this.monitoredEntityType;
	}

	public setMonitoredEntityType( monitoredEntityType:string) {
		this.monitoredEntityType = monitoredEntityType;
	}
}

/**
 * 不确定行为实体，只有一个实例
 * 实体类型名，状态标识符，【状态名、状态标识符取值】
 * */
 export class UncertainEntityType extends EntityType{
    private stateValues=new Array<string[]>();  ///stateValue[0]=状态名,stateValue[1]=状态id,stateValue[2]=状态标识符取值



    public getStateValues() {
        return this.stateValues;
    }

    public setStateValues(stateValues:Array<string[]>) {
        this.stateValues = stateValues;
    }
}

/**
 * cyber service类型。类型名，【状态、信号通道】
 * */
 export class CyberServiceType extends EntityType{
    private stateSyncs=new Array<string[]>();  ///stateSync[0]=stateId,stateSync[1]=synchronization


    public getStateSyncs() {
        return this.stateSyncs;
    }

    public setStateSyncs(stateSyncs:Array<string[]>) {
        this.stateSyncs = stateSyncs;
    }
}

/**
 * 带各种环境属性的实体（air），只有一个实例
 * 实体类型名,【内容、属性名、属性总变化率变量名】
 * */
 export class AttributeEntityType extends EntityType{
    private attributes=new Array<Attribute>();


    public getAttributes() {
        return this.attributes;
    }

    public setAttributes(attributes:Array<Attribute>) {
        this.attributes = attributes;
    }

    
}

export class Attribute{
    private content="";  ///内容 temperature'==dtemper   更改了模型，添加了一个Attribute模型，用来表示各个属性的变化
    private attribute="";  ////temperature
    private delta="";  ////dtemper
    public getContent() {
        return this.content;
    }
    public setContent( content:string) {
        this.content = content;
    }
    public getAttribute() {
        return this.attribute;
    }
    public setAttribute( attribute:string) {
        this.attribute = attribute;
    }
    public getDelta() {
        return this.delta;
    }
    public setDelta( delta:string) {
        this.delta = delta;
    }
}