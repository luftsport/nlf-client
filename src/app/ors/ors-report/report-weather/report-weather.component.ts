import { Component, Input, OnInit } from '@angular/core';
import { ApiObservationWeatherInterface } from 'app/api/api.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'nlf-ors-report-weather',
  templateUrl: './report-weather.component.html',
  styleUrls: ['./report-weather.component.css']
})
export class NlfOrsReportWeatherComponent implements OnInit {

  @Input() weather: ApiObservationWeatherInterface;

  modalRef;
  modal;

  constructor(private modalService: NgbModal) { }

  ngOnInit() {


  }

  openModal(template, title) {

    this.modal = { title: title, data: this.weather.auto[title] || [] };
    this.modalRef = this.modalService.open(template, { size: 'lg' });
  }

}
