import { Component, OnInit } from '@angular/core';
import {Device} from '../class/device';
import {DeviceService} from '../service/device.service';
@Component({
  selector: 'app-echarts-device',
  templateUrl: './echarts-device.component.html',
  styleUrls: ['./echarts-device.component.css']
})
export class EchartsDeviceComponent implements OnInit {
  options:any;
  constructor(public deviceService:DeviceService) { }
devices:Device[]=[];
  ngOnInit(): void {
    this.deviceService.getDevices().subscribe(devices=>this.devices=devices);
    var length=this.devices.length;
    var series=[];
     var rulesData=[]
    for(let i=length-1;i>=0;i--){
      rulesData.push(this.devices[i].deviceName);
      series.push({
        name:this.devices[i].deviceName,
        
        type:'line',
        
        data:this.devices[i].timeValues
      })
    };
    
    this.options={
      title:{
        text:'Rules Triggered Time',
        x: 'center'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      legend: {
        data: rulesData,
        x: 'center',
        y: 'bottom',
      },
      calculable: true,
      grid: {
        left: '5%',
        right: '5%',
        bottom: '20%',
        containLabel: true
      },
      xAxis: [
        {
          
          
        type: 'value',
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: series
    };
  }

}
