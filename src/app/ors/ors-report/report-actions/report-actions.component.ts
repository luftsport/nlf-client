import { Component, Input, OnInit } from '@angular/core';
import { ApiObservationActionsInterface } from 'app/api/api.interface';

@Component({
  selector: 'nlf-ors-report-actions',
  templateUrl: './report-actions.component.html',
  styleUrls: ['./report-actions.component.css']
})
export class NlfOrsReportActionsComponent implements OnInit {

  @Input() actions: ApiObservationActionsInterface;
  @Input() format: string = "horizontal"; // horizontal vertical
  
  constructor() { }

  ngOnInit() {
    
  }

}
