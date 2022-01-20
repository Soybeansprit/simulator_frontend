export class Trigger {
	private triggerContent="";  ///trigger内容                                                    ///////temperature>=30         //////Bulb_0.bon     ///Emma.lobby(人在客厅)
	private triggerId="";   ///对应IFD中trigger节点的id                                            ///////trigger1                //////trigger2       ///trigger3
	private instanceName="";  ///对应的实例名                                                      //////Air                      /////Bulb_0          ////Emma
	private sensor="";   ///对应的sensor                                                         ///////temperature_sensor     //////                ///person_sensor
	private triggerForm=new Array<string>();  /// attribute<(<=,>,>=)value or Instance.state        ///////temperature >= 30       //////Bulb_0 . bon   ///Emma . lobby
	private forTime="";  ///表示for多长时间  instance.state for 3这种
	private relatedRules=new Array<Rule>();

	public getTriggerContent() {
		return this.triggerContent;
	}

	public setTriggerContent( triggerContent:string) {
		this.triggerContent = triggerContent;
	}

	public getTriggerId() {
		return this.triggerId;
	}

	public setTriggerId( triggerId:string) {
		this.triggerId = triggerId;
	}

	public getInstanceName() {
		return this.instanceName;
	}

	public setInstanceName( instanceName:string) {
		this.instanceName = instanceName;
	}

	public getSensor() {
		return this.sensor;
	}

	public setSensor( sensor:string) {
		this.sensor = sensor;
	}

	public getTriggerForm() {
		return this.triggerForm;
	}

	public setTriggerForm(triggerForm:Array<string>) {
		this.triggerForm = triggerForm;
	}

	public getForTime() {
		return this.forTime;
	}

	public setForTime( forTime:string) {
		this.forTime = forTime;
	}

	public getRelatedRules() {
		return this.relatedRules;
	}

	public setRelatedRules( relatedRules:Array<Rule>) {
		this.relatedRules = relatedRules;
	}
}

export class Action {
	


	private actionContent="";  ///action内容
	private actionId="";   ///对应IFD中action节点的id
	private instanceName="";  ///对应的实例名，可能是设备，也可能是cyber service
	private sync="";   ///对应的synchronisation
	private relatedRules=new Array<Rule>();

	public getActionContent() {
		return this.actionContent;
	}

	public setActionContent( actionContent:string) {
		this.actionContent = actionContent;
	}

	public getActionId() {
		return this.actionId;
	}

	public setActionId( actionId:string) {
		this.actionId = actionId;
	}

	public getInstanceName() {
		return this.instanceName;
	}

	public setInstanceName( instanceName:string) {
		this.instanceName = instanceName;
	}

	public  getSync() {
		return this.sync;
	}

	public setSync( sync:string) {
		this.sync = sync;
	}

	public getRelatedRules() {
		return this.relatedRules;
	}

	public setRelatedRules(relatedRules:Array<Rule> ) {
		this.relatedRules = relatedRules;
	}

}

export class Rule {

	private ruleName="";   ///规则名序号  rulei
	private ruleContent="";  ///规则内容
	private trigger=new Array<string>();  ////所有triggers
	private action=new Array<string>();   ////所有actions
	public getRuleName() {
		return this.ruleName;
	}
	public setRuleName( ruleName:string) {
		this.ruleName = ruleName;
	}
	public getRuleContent() {
		return this.ruleContent;
	}
	public setRuleContent( ruleContent:string) {
		this.ruleContent = ruleContent;
	}
	public getTrigger() {
		return this.trigger;
	}
	public setTrigger(trigger:Array<string>) {
		this.trigger = trigger;
	}
	public getAction() {
		return this.action;
	}
	public setAction(action:Array<string>) {
		this.action = action;
	}


}