import { Component, OnInit } from '@angular/core';
import { Rule } from '../class/rules';
import * as echarts from 'echarts/index';
import { RuleService } from '../service/rule.service';

@Component({
  selector: 'app-echarts-sample',
  templateUrl: './echarts-sample.component.html',
  styleUrls: ['./echarts-sample.component.css']
})
export class EchartsSampleComponent implements OnInit {


  rulesOptions: any;
  rulesPieOptions: any;
  rulesBarOptions: any;

  constructor(public rulesService: RuleService) { }


  ngOnInit(): void {

    this.rulesService.getRulesEchartsOption().subscribe((option: any) => this.rulesOptions = option);
    this.rulesPieOptions = {
      title: {
        text: 'Triggered Rules',
        x: 'center',
        top: 'top'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b} <br> num: {c}'
      },
      calculable: true,
      series: [
        {
          name: 'area',
          type: 'pie',
          radius: 80,
          data: [
            { value: 28, name: 'triggered rules' },
            { value: 2, name: 'cannot triggered rules' },
          ]
        }
      ]
    };


    this.rulesBarOptions = {
      title: {
        text: 'Triggered Rules',
        x: 'center',
        top: 'top'
      },

      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'none'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      legend: {
        x: 'center',
        y: 'bottom',
        data: ['triggered rules number', 'cannot triggered rules number']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      yAxis: {
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        type: 'category',
        data: ['scene0']
      },
      xAxis: {
        show:false,
        type: 'value'
      },
      series: [
        {
          name: 'triggered rules number',
          type: 'bar',
          barWidth:25,
          stack: 'rules',
          label: {
            normal: {
              show: true,
              position: 'inside'
            }
          },
          data: [28]
        },
        {
          name: 'cannot triggered rules number',
          type: 'bar',
          barWidth:25,
          stack: 'rules',
          label: {
            normal: {
              show: true,
              position: 'inside'
            }
          },
          data: [2]
        }
      ]
    };
  }



}
