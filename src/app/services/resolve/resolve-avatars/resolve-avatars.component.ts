import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, NavigationStart } from '@angular/router';
import { faList, faPlus } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'nlf-resolve-avatars',
  templateUrl: './resolve-avatars.component.html',
  styleUrls: ['./resolve-avatars.component.css']
})
export class NlfResolveAvatarsComponent implements OnInit {

  faList = faList;
  faPlus = faPlus;

  @Input() persons: number[];
  @Input() title: boolean = false;
  @Input() max: number = 5;
  @Input() show_remaining: boolean = true;
  @Input() steps: number = 5;
  @Input() show_modal: boolean = true;
  @Input() modal_title: string = 'Personer';


  modalRef;

  constructor(private modalService: NgbModal,
    private router: Router
  ) {
    router.events
      .filter(event => event instanceof NavigationStart)
      .subscribe((event: NavigationStart) => {
        if (!!this.modalService.hasOpenModals()) {
          this.modalService.dismissAll();
        }
      });
  }

  ngOnInit() {

  }

  public nextStep() {
    this.max = +this.max + +this.steps;
  }


  openPersonsModal(template) {
    this.modalRef = this.modalService.open(template, { size: 'lg' });
  }

}
