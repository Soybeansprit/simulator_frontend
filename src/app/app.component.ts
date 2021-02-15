import { Component } from '@angular/core';
import * as echarts from 'echarts';
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
  //////////////
  students:any;
  /////////////////
  constructor(private eService:ExampleService) { }

  editorOptions = {theme: 'vs-dark', language: 'javascript'};
  code: string= 'function x() {\nconsole.log("Hello world!");\n}';
  onInit(editor: { getPosition: () => any; }) {
    let line = editor.getPosition();
    console.log(line);
  }
/////////////////////////////////////
  getStudents(){
    this.eService.getStudent().subscribe(students=>{
      this.students=students;
      console.log(this.students);
    })
  }
////////////////////////////////////



}
