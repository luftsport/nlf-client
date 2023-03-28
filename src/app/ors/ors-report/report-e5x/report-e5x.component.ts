import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'environments/environment';
import { faHistory, faDownload } from '@fortawesome/free-solid-svg-icons';
import { faFileAlt } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'nlf-ors-report-e5x',
  templateUrl: './report-e5x.component.html',
  styleUrls: ['./report-e5x.component.css']
})
export class NlfOrsReportE5xComponent implements OnInit {

  @Input() observation;

  modalRef;

  ENV = environment;

  faHistory = faHistory;
  faDownload = faDownload;
  faFileAlt = faFileAlt;


  constructor(private modalService: NgbModal) {
  }

  ngOnInit() {
  }

  public openModal(template) {
    this.modalRef = this.modalService.open(template, { size: 'lg', backdrop: 'static', keyboard: false });
  }

  public closeModal() {
    this.modalRef.close();
  }
}
