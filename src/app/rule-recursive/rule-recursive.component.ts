import { Component, OnInit,Input } from '@angular/core';
import { RuleAndPreRule } from '../class/simulation';

@Component({
  selector: 'app-rule-recursive',
  templateUrl: './rule-recursive.component.html',
  styleUrls: ['./rule-recursive.component.css']
})
export class RuleRecursiveComponent implements OnInit {

  @Input() preRules:Array<RuleAndPreRule>=[];
  constructor() { }

  ngOnInit(): void {
  }

  getRuleContent(ruleContent:string):string{
    return ruleContent.substring(ruleContent.indexOf("IF"));
  }

}
