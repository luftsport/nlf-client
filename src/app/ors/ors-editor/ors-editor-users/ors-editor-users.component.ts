import { Component, OnInit, Input } from '@angular/core';
import { faLock, faPlus, faSave } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiAclService } from 'app/api/api-acl.service';
import { ApiObservationsService } from 'app/api/api-observations.service';
import { debounce } from 'ts-debounce';

@Component({
  selector: 'nlf-ors-editor-users',
  templateUrl: './ors-editor-users.component.html',
  styleUrls: ['./ors-editor-users.component.css']
})
export class NlfOrsEditorUsersComponent implements OnInit {

  @Input() model: string;
  @Input() _id: string;
  @Input() observation;

  modalRef;
  acl_list;
  persons = [];

  new_person;

  acl_persons;
  message: { type: string; msg: string; };

  faLock = faLock;
  faPlus = faPlus;
  faSave = faSave;

  constructor(
    private modalService: NgbModal,
    //public activeModal: NgbActiveModal,
    private aclService: ApiAclService,
    private orsService: ApiObservationsService) {


  }

  ngOnInit() {
    this.orsService.setActivity(this.observation._model.type);
    //let arrayWithDuplicates = this.observation.acl['read']['users'].concat(this.observation.acl['write']['users']);
    //this.acl_persons = arrayWithDuplicates.filter((n, i) => arrayWithDuplicates.indexOf(n) === i);
    this.acl_persons = this.observation.acl['read']['users'].concat(this.observation.acl['write']['users'].filter((item) => this.observation.acl['read']['users'].indexOf(item) < 0));
    console.log('this.acl_persons', this.acl_persons);
  }

  public save() {

    this.modalRef.close();
  }

  private _message(msg, type) {

    this.message = { msg: msg, type: type };
    setTimeout(() => {
      this.message = undefined;
    }, 5000);
  }

  public toggleAcl(person_id, right, event) {
    console.log('EVENT CHECKED?? ', event.target.checked);
    //_id: string, right: string, person_id: number
    if (event.target.checked) {
      this.orsService.addAclUser(this.observation._id, right, person_id).subscribe(
        data => {
          this._message('Successfully added user', 'success');
          console.log('Successfully added user', person_id);
          //this.acl_list[right]['users'].push(person_id);
        },
        err => {
          this._message('Error adding user', 'danger');
          console.log('Failure for ', person_id, err);
        }
      );
    } else if (!event.target.checked) {

      this.orsService.removeAclUser(this.observation._id, right, person_id).subscribe(
        data => {
          /*let idx = this.acl_list[right]['users'].indexOf(person_id, 0);
          if(idx > -1) {
              this.acl_list[right]['users'].splice(idx, 1);
          }
          */
          this._message('Removed user', 'success');

          console.log('Successfully removed user', person_id);
        },
        err => {
          this._message('Error removing user', 'danger');
          console.log('Failure for ', person_id, err);
        }
      );

    }

  }

  public addPerson() {
    if (!!this.new_person) {
      this.acl_persons.push(this.new_person.id);
      this.new_person = undefined;
    }
  }
  public openModal(template) {

    this.aclService.getAclUserList(this.model + '_observations', this._id).subscribe(
      data => {
        this.acl_list = data;
        this.persons = data['read'].concat(data['write'].filter((item) => data['read'].indexOf(item) < 0)); // [...new Set([...data['read'], ...data['write']])]; //.filter((v, i, a) => a.indexOf(v) === i);
        this.modalRef = this.modalService.open(template, { size: 'lg', backdrop: 'static', keyboard: false });
      },
      err => console.log('ACL User list', err),
      () => { }
    )


  }
}
