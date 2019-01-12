import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LungoIntegrationService } from 'app/api/lungo-integration.service';
import { Router, NavigationStart } from '@angular/router';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'nlf-worker-log',
  templateUrl: './worker-log.component.html',
  styleUrls: ['./worker-log.component.css']
})
export class WorkerLogComponent implements OnInit {

  @Input() index: number;
  @Input() organization_id: number;
  log: any;
  dataReady = false;
  modalRef;

   constructor(private modalService: NgbModal,
              private integration: LungoIntegrationService,
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
    this.integration.getWorkerLog(this.index).subscribe(
      data => {
        this.log = data._items;
        this.dataReady = true;
        this.modalRef = this.modalService.open(template, { size: 'lg' });
      },
      err => {
        this.log = ['Ingen logger. Det finnes ingen logger for denne.'];
        this.dataReady = true;
        this.modalRef = this.modalService.open(template, { size: 'lg' });
      },
    );
  }
}
