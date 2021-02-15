import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-random-all',
  templateUrl: './random-all.component.html',
  styleUrls: ['./random-all.component.css']
})
export class RandomAllComponent implements OnInit {

  ifdPath: string="";
  show_tree:string="none";
  show_scenes_rules:string="none";
  constructor() { }

  ngOnInit(): void {
    this.show_tree="none";
    this.show_scenes_rules="none";
  }

  showIFD(){
    var path="./assets/IFD.png";
    console.log("showIFD");
    //document.getElementById('ifdimg').src=path;
    //document.getElementById('ifdlink').href=path;
    this.ifdPath=path;
  }

  showRandomResults(){
    this.show_tree="block";
    this.show_scenes_rules="none";
  }

  showScenesRulesResults(){
    this.show_scenes_rules="block";
    this.show_tree="none";
  }

  showRulesScenesResults(){

  }

}
