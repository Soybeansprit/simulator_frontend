import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FileUploadModule } from 'ng2-file-upload';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopbarComponent } from './topbar/topbar.component';
import { MainComponent } from './main/main.component';
import { IfdPlanComponent } from './ifd-plan/ifd-plan.component';

import {NgxEchartsModule } from 'ngx-echarts';
import { DeviceDetailsComponent } from './device-details/device-details.component';
import { FormsModule } from '@angular/forms';
import { SceneDetailsComponent } from './scene-details/scene-details.component';

import { MonacoEditorModule, NgxMonacoEditorConfig } from 'ngx-monaco-editor';
import { HttpClientModule } from '@angular/common/http';
import { MonacoConfig } from "./monaco-config";
import { MainData } from './provider/main-data';
import { RuleAnalysisComponent } from './rule-analysis/rule-analysis.component';
import { RuleRecursiveComponent } from './rule-recursive/rule-recursive.component';
const monacoConfig: NgxMonacoEditorConfig = {
  baseUrl: '../assets', // configure base path for monaco editor default: './assets'
  defaultOptions: { scrollBeyondLastLine: false }, // pass default options to be used
  onMonacoLoad: () => { console.log((<any>window).monaco); } // here monaco object will be available as window.monaco use this function to extend monaco editor functionalities.
};

@NgModule({
  declarations: [
    AppComponent,
    TopbarComponent,
    MainComponent,
    IfdPlanComponent,
    DeviceDetailsComponent,
    SceneDetailsComponent,
    RuleAnalysisComponent,
    RuleRecursiveComponent
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
