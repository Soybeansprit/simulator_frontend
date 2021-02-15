import { Component, OnInit } from '@angular/core';
import {ScenesRulesService} from '../service/scenes-rules.service';
import {SceneRule} from '../class/scene-rule';
@Component({
  selector: 'app-echarts-all-scenes-rules-analys',
  templateUrl: './echarts-all-scenes-rules-analys.component.html',
  styleUrls: ['./echarts-all-scenes-rules-analys.component.css']
})
export class EchartsAllScenesRulesAnalysComponent implements OnInit {

  option:any;
  constructor(public scenesRulesService:ScenesRulesService) { }

  ngOnInit(): void {
    var scene_rules:SceneRule[]=[];
    this.scenesRulesService.getAllSceneRuleBar().subscribe((option)=>{
      console.log(option);
      this.option=option;
    })

    
  }

}
