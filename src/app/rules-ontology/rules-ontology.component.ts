import { Component, OnInit } from '@angular/core';
import { DiffEditorModel } from 'ngx-monaco-editor';

@Component({
  selector: 'app-rules-ontology',
  templateUrl: './rules-ontology.component.html',
  styleUrls: ['./rules-ontology.component.css']
})
export class RulesOntologyComponent implements OnInit {

  rulesTxt!:string;

  constructor() { }

  ngOnInit(): void {
    
  }

  //////////// ngx-monaco-editor
  editorOptions = {theme: "reqTheme", language: "req", minimap: { enabled: false }, automaticLayout: true, fontSize:"15px"};
  rule_content: string= '';
  editor:any;
  onInit(editor: { getPosition: () => any; }) {
    let line = editor.getPosition();
    console.log(line);
  }

  monacoOnInit(editor:any){
    this.editor = editor;
  }
}
