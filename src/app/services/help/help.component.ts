import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiHelpService } from 'app/api/api-help.service';
import { ApiHelpItem } from 'app/api/api.interface';
import { Router, NavigationStart } from '@angular/router';
import 'rxjs/add/operator/filter';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';

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

  faQuestion = faQuestion;

  constructor(private modalService: NgbModal,
              private apiHelp: ApiHelpService,
              router: Router) {

    router.events
      .filter(event => event instanceof NavigationStart)
      .subscribe((event: NavigationStart) => {
        // You only receive NavigationStart events
        if (!!this.modalService.hasOpenModals()) {
          this.modalService.dismissAll();
        }
      });
  }

  ngOnInit() {

  }

  open(template) {
    this.apiHelp.getHelp(this.key).subscribe(
      data => {
        this.help = data;
        this.dataReady = true;
        this.modalRef = this.modalService.open(template, { size: 'lg' }); //, 'container': 'body' });
      },
      err => {
        this.help = { title: 'Ingen hjelpetekst', body: 'Det finnes ingen hjelpetekst enda for dette temaet.', key: this.key };
        this.dataReady = true;
        this.modalRef = this.modalService.open(template, { size: 'lg' });
      },
      () => {
        console.log('Done getting help');
      }
    );
  }
}
