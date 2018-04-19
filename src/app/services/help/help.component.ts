import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiHelpService } from './../../api/api-help.service';
import { ApiHelpItem } from './../../api/api.interface';


@Component({
  selector: 'nlf-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class NlfHelpComponent implements OnInit {

  @Input() key: string;
  @Input() details?: boolean;

  help: ApiHelpItem;
  dataReady = false;
  modalRef;

  constructor(private modalService: NgbModal,
              private apiHelp: ApiHelpService) { }

  ngOnInit() {

  }

  open(template) {
    this.apiHelp.getHelp(this.key).subscribe(
      data => {
        this.help = data;
        this.dataReady = true;
        this.modalRef = this.modalService.open(template, { size: 'lg' });
      },
      err => {
        this.help = {title: 'Ingen hjelpetekst', body: 'Det finnes ingen hjelpetekst enda for dette temaet.', key: this.key};
        this.dataReady = true;
        this.modalRef = this.modalService.open(template, { size: 'lg' });
      },
      () => {
        console.log('Done getting help');
      }
    );
  }
}
