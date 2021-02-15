import { Component, OnInit } from '@angular/core';
import {DeviceResult} from '../class/device-result';
import {DeviceResultService} from '../service/device-result.service';

@Component({
  selector: 'app-device-information',
  templateUrl: './device-information.component.html',
  styleUrls: ['./device-information.component.css']
})
export class DeviceInformationComponent implements OnInit {
  devicesResults:DeviceResult[]=[];
  selectedDevice!:DeviceResult|null;
  constructor(public deviceResultService:DeviceResultService) { }

  ngOnInit(): void {
    this.deviceResultService.getDeviceResults().subscribe((devicesResults:any)=>this.devicesResults=devicesResults);
    
  }
  onSelect(device:DeviceResult){
    if(this.selectedDevice===device){
      this.selectedDevice=null;
    }else{
      this.selectedDevice=device;
    }
  }

}
