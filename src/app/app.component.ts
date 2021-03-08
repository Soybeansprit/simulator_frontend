import { Component } from '@angular/core';
import * as echarts from 'echarts';
import { DiffEditorModel } from 'ngx-monaco-editor';
//test//////////////
import {ExampleService} from './service/example.service';
////////////////
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'simulator';
  
  requirementTexts:string="requirement"
  editorRef:any
  constructor(private eService:ExampleService) { }

  // editorOptions = { theme: "reqTheme", language: "req", minimap: { enabled: false }, automaticLayout: true, fontSize:"15px" };
  // editor:any;

	// monacoOnInit(editor:any) {
	// 	this.editor = editor;
  //   console.log(this.editor)
	// }

  editorOptions = {theme: 'vs-dark', language: 'javascript'};
  code: string= 'function x() {\nconsole.log("Hello world!");\n}';

  async onInitEditor(editor:any, editorId:any) {
    this.editorRef[editorId] = editor;
  }

  options = {
    theme: 'vs-dark'
  };
  originalModel: DiffEditorModel = {
    code: 'heLLo world!',
    language: 'text/plain'
  };
 
  modifiedModel: DiffEditorModel = {
    code: 'hello orlando!',
    language: 'text/plain'
  };

}
