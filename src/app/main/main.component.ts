import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  ifdPath="";
  show:string="none";
  unshow:string="none";
  constructor() { }

  ngOnInit(): void {
    // document.getElementById("rule-time")!.style.display="none";
    // document.getElementById("device-time")!.style.display="none";
   
    
    document.getElementById("all_scenes_tree")!.style.display="none";
    document.getElementById("scenes_rules")!.style.display="none";
    document.getElementById("rules_scenes")!.style.display="none";
  }
  showIFD(){
    var path="./assets/IFD.png";
    this.ifdPath=path;
    
    document.getElementById("ontology_rules")!.style.display="none";
    
  }
  showRandomResults(){
    
    document.getElementById("all_scenes_tree")!.style.display="block";
    document.getElementById("scenes_rules")!.style.display="none";
    document.getElementById("rules_scenes")!.style.display="none";
  }

  showScenesRulesResults(){
   
    document.getElementById("all_scenes_tree")!.style.display="none";
    document.getElementById("scenes_rules")!.style.display="block";
    document.getElementById("rules_scenes")!.style.display="none";
  }

  showRulesScenesResults(){
    document.getElementById("all_scenes_tree")!.style.display="none";
    document.getElementById("scenes_rules")!.style.display="none";
    document.getElementById("rules_scenes")!.style.display="block";
  }

}
