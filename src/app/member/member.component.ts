import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { debounce } from 'ts-debounce';
import { LungoPersonsService } from 'app/api/lungo-persons.service';
import { LungoPersonsSearchItem, LungoPersonsSearchList, LungoPersonsItem } from 'app/api/lungo.interface';
import { ApiOptionsInterface, ApiTagList, ApiTagItem } from 'app/api/api.interface';

@Component({
  selector: 'nlf-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class NlfMemberComponent implements OnInit {

  @ViewChild('personModalTemplate') personModalTemplate: any;
  disabled: boolean = false;
  searching: boolean = false;
  modalRef;
  modalPerson: LungoPersonsItem;
  person_id: number;
  MINLENGTH = 3;
  results: LungoPersonsSearchItem[] = [];

  activity: string = undefined;
  searchTerm: string;
  arrowkeyLocation = -1;
  justClosedModal = false;

  deboucedSearch = debounce(this._search, 700);

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private personsService: LungoPersonsService
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
    this.setFocus("memberSearchInput");
  }

  private _search(event: any) {
    if (!!event && this.arrowkeyLocation > -1 && ['ArrowUp', 'ArrowDown', 'Tab'].indexOf(event.key) > -1) {
      event.stopPropagation();
    }
    else if (!!event && this.arrowkeyLocation > -1 && this.results.length > 0 && event.key === 'Enter') {
      event.stopPropagation();
    }
    else if (this.searchTerm.length >= this.MINLENGTH) {
      this.arrowkeyLocation = -1;
      this.search(event);
    }
  }

  public search(event: any) {

    if (this.arrowkeyLocation < 0) {
      this.searching = true;
      this.personsService.search(this.searchTerm, this.activity).subscribe(
        data => {
          this.results = data._items;
        },
        err => console.log(err),
        () => {
          this.searching = false;
        }
      );
    }
    else if (!!event && event.key === 'Enter' && this.arrowkeyLocation > -1 && this.justClosedModal) {
      event.stopPropagation();
      this.justClosedModal = false;
    }
    else if (this.arrowkeyLocation > -1 && this.results.length > 0 && !this.modalService.hasOpenModals()) {
      this.openModal(this.results[this.arrowkeyLocation]['id']);
    }
    else if (this.modalService.hasOpenModals()) {
      event.stopPropagation();
    }
  }

  public setFocus(element) {
    try {
      setTimeout(() => {
        try {
          const focusEl: any = document.querySelector('#' + element).querySelector('input');
          focusEl.focus();
        } catch { }
      }, 100);
    } catch { }
  }

  setActivity(activity) {

    if (activity === this.activity) {
      this.activity = undefined;
    } else {
      this.activity = activity;
    }
    if (!!this.searchTerm) {
      this.deboucedSearch(undefined);
    }
  }

  checkExpiryYear(year) {
    try {

      let now = new Date().getFullYear();
      if (+year >= +now) {
        return true;
      }
    } catch (e) { console.log(e) }

    return false
  }

  checkExpiry(expiry) {
    try {

      if (Date.parse(expiry) > Date.now()) {
        return true;
      }


    } catch (e) { console.log(e) }

    return false;

  }

  moveUp() {
    if (this.arrowkeyLocation > 0) {
      this.arrowkeyLocation--;
    }
  }
  moveDown() {
    if (this.arrowkeyLocation < this.results.length - 1) {
      this.arrowkeyLocation++;
    }
  }


  /**
  switch (event.keyCode) {
    case 38: // this is the ascii of arrow up
      this.arrowkeyLocation--;
      break;
    case 40: // this is the ascii of arrow down
      this.arrowkeyLocation++;
      break;
  }
}
**/

  openModal(person_id) {
    this.person_id = person_id;
    this.modalPerson = undefined;
    this.personsService.getUser(person_id).subscribe(
      data => {
        this.modalPerson = data;
        this.modalRef = this.modalService.open(this.personModalTemplate, { size: 'lg' });
      },
      err => console.log(err),
      () => { }
    );

  }

  closeModal(event) {
    this.modalRef.close();
    this.justClosedModal = true;
    try {
      event.stopPropagation();
    } catch {}
    this.setFocus("memberSearchInput");
  }



}
