import { Component, Input, OnInit } from '@angular/core';
import { ApiObservationWeatherInterface } from '../../../../api/api.interface';

@Component({
  selector: 'nlf-ors-fallskjerm-report-weather',
  templateUrl: './report-weather.component.html',
  styleUrls: ['./report-weather.component.css']
})
export class NlfOrsFallskjermReportWeatherComponent implements OnInit {

  @Input() weather: ApiObservationWeatherInterface;
  constructor() { }

  ngOnInit() {


  }

}
