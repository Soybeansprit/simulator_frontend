import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-scene-details',
  templateUrl: './scene-details.component.html',
  styleUrls: ['./scene-details.component.css']
})
export class SceneDetailsComponent implements OnInit {

  ifdPath=""

  constructor(private location: Location) { }

  ngOnInit(): void {
    // document.getElementById("rule-time")!.style.display="none";
    // document.getElementById("device-time")!.style.display="none";
    document.getElementById("ifd")!.style.display="none";
    document.getElementById("scene")!.style.display="flex";
    document.getElementById("scene_rule")!.style.display="none";
    document.getElementById("scene_device")!.style.display="none";
  }
  showIFD(){
    var path="./assets/IFD.png";
    this.ifdPath=path;
    document.getElementById("ifd")!.style.display="block";
    document.getElementById("scene")!.style.display="none";
    
  }
  goBack(): void {
    this.location.back();
  }
  showRules(){
    document.getElementById("ifd")!.style.display="none";
    document.getElementById("scene")!.style.display="flex";
    document.getElementById("scene_rule")!.style.display="block";
    
    // document.getElementById("device-time")!.style.display="none";
    
  }
  showDevices(){
    // document.getElementById("rule-time")!.style.display="none";
    // document.getElementById("device-time")!.style.display="none";
    document.getElementById("ifd")!.style.display="none";
    document.getElementById("scene")!.style.display="flex";
    document.getElementById("scene_device")!.style.display="block";
  }


}
