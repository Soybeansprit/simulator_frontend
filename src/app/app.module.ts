import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FileUploadModule } from 'ng2-file-upload';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopbarComponent } from './topbar/topbar.component';
import { RulesOntologyComponent } from './rules-ontology/rules-ontology.component';
import { RandomAllComponent } from './random-all/random-all.component';
import { MainComponent } from './main/main.component';
import { IfdPlanComponent } from './ifd-plan/ifd-plan.component';
import { RuleRandomComponent } from './rule-random/rule-random.component';
import { EchartsSampleComponent } from './echarts-sample/echarts-sample.component';

import {NgxEchartsModule } from 'ngx-echarts';
import { EchartsDeviceComponent } from './echarts-device/echarts-device.component';
import { DeviceInformationComponent } from './device-information/device-information.component';
import { DeviceDetailsComponent } from './device-details/device-details.component';
import { FormsModule } from '@angular/forms';
import { EchartsAllScenesComponent } from './echarts-all-scenes/echarts-all-scenes.component';
import { TreemapComponent } from './treemap/treemap.component';
import { EchartsAllSencesAnalysResultComponent } from './echarts-all-sences-analys-result/echarts-all-sences-analys-result.component';
import { SceneDetailsComponent } from './scene-details/scene-details.component';
import { EchartsAllScenesRulesAnalysComponent } from './echarts-all-scenes-rules-analys/echarts-all-scenes-rules-analys.component';

import { MonacoEditorModule, NgxMonacoEditorConfig } from 'ngx-monaco-editor';
import { HttpClientModule } from '@angular/common/http';
import { MonacoConfig } from "./monaco-config";
import { MainData } from './provider/main-data';
const monacoConfig: NgxMonacoEditorConfig = {
  baseUrl: '../assets', // configure base path for monaco editor default: './assets'
  defaultOptions: { scrollBeyondLastLine: false }, // pass default options to be used
  onMonacoLoad: () => { console.log((<any>window).monaco); } // here monaco object will be available as window.monaco use this function to extend monaco editor functionalities.
};

@NgModule({
  declarations: [
    AppComponent,
    TopbarComponent,
    RulesOntologyComponent,
    RandomAllComponent,
    MainComponent,
    IfdPlanComponent,
    RuleRandomComponent,
    EchartsSampleComponent,
    EchartsDeviceComponent,
    DeviceInformationComponent,
    DeviceDetailsComponent,
    EchartsAllScenesComponent,
    TreemapComponent,
    EchartsAllSencesAnalysResultComponent,
    SceneDetailsComponent,
    EchartsAllScenesRulesAnalysComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FileUploadModule,
    MonacoEditorModule.forRoot(monacoConfig),
    // MonacoEditorModule.forRoot(),
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    })
    
  ],
  providers: [MainData],
  bootstrap: [AppComponent]
})
export class AppModule { }
