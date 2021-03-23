import { Component, OnInit,Input } from '@angular/core';
import { RuleAndCause } from '../class/scene';

@Component({
  selector: 'app-rule-recursive',
  templateUrl: './rule-recursive.component.html',
  styleUrls: ['./rule-recursive.component.css']
})
export class RuleRecursiveComponent implements OnInit {

  @Input() causeRules:Array<RuleAndCause>=[];
  constructor() { }

  ngOnInit(): void {
  }

  getRuleContent(ruleContent:string):string{
    return ruleContent.substring(ruleContent.indexOf("IF"));
  }

}
