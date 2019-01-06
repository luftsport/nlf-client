import { Component, Input, OnInit } from '@angular/core';
import { ApiObservationWeatherInterface } from 'app/api/api.interface';

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
