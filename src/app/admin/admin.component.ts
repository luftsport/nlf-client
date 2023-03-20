import { Component, OnInit } from '@angular/core';
import { faQuestion, faFile } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'nlf-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class NlfAdminComponent implements OnInit {
  faQuestion = faQuestion;
  faFile = faFile;

  constructor() { }

  ngOnInit() {
  }

}
