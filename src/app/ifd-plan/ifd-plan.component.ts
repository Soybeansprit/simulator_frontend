import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-ifd-plan',
  templateUrl: './ifd-plan.component.html',
  styleUrls: ['./ifd-plan.component.css']
})
export class IfdPlanComponent implements OnInit {

  srules="block";
  sdevices="none";
  ifdPath="./assets/IFD.png";

  constructor(private location: Location) { }

  ngOnInit(): void {
    // document.getElementById("rule-time")!.style.display="none";
    document.getElementById("device-time")!.style.display="none";
    document.getElementById("ifd")!.style.display="none";
    this.ifdPath="./assets/IFD.png";
  }
  showIFD(){
    var path="./assets/IFD.png";
    this.ifdPath=path;
    document.getElementById("ifd")!.style.display="block";
    document.getElementById("plan")!.style.display="none";
  }
  goBack(): void {
    this.location.back();
  }
  showRules(){
    console.log(111)
    document.getElementById("ifd")!.style.display="none";
    document.getElementById("plan")!.style.display="";
    document.getElementById("rule-time")!.style.display="block";
    
    // document.getElementById("device-time")!.style.display="none";
    this.srules="block";
    this.sdevices="none";
  }
  showDevices(){
    console.log(222)
    // document.getElementById("rule-time")!.style.display="none";
    document.getElementById("device-time")!.style.display="none";
    this.sdevices="block";
    this.srules="none";
  }

}
