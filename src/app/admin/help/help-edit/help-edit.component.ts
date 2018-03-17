import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'nlf-admin-help-edit',
  templateUrl: './help-edit.component.html',
  styleUrls: ['./help-edit.component.css']
})
export class NlfAdminHelpEditComponent implements OnInit {

  joditConfig = {
    buttons: 'source,|,bold,strikethrough,underline,italic,|,superscript,subscript,|,ul,ol,|,outdent,indent,|,brush,paragraph,|,image,video,table,link,|,align,undo,redo,\n,cut,hr,eraser,copyformat,|,symbol,fullsize,selectall,print,about',
    imageDefaultWidth: 400,
    height: '100%',
    editorCssClass: 'h-100'
  };

  value = '';

  constructor() { }

  ngOnInit() {
  }

  logChange(event) {
    console.log(event);
    this.value = event.value;

  }
}
