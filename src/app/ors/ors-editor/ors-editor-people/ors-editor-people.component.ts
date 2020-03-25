import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ApiObservationsItem, ApiOptionsInterface, ApiObservationFallskjermOrganizationInterface } from 'app/api/api.interface';
import { LungoPersonsService } from 'app/api/lungo-persons.service';
import { ApiUserService } from 'app/api/api-user.service';
import { NlfOrsEditorInvolvedService, NlfOrsEditorInvolvedInterface } from 'app/ors/ors-editor/ors-editor-involved.service';
import { NlfOrsEditorService } from 'app/ors/ors-editor/ors-editor.service';
import { ApiCacheService } from 'app/api/api-cache.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

interface ObservationPeople {
  id: number;
  tmp_name?: string;
  data?: { date?: Date, licenses?: Object[], clubs?: any[], functions?: any[], competences?: Object[], private?: Object, gear?: Object};
}
interface Pp {
  id: number;
  tmp_name?: string;
  data?: any;
}
interface PpArr {
  hi?: Pp[];
  hm?: Pp[];
  hl?: Pp[];
  hfl?: Pp[];
  pilot?: Pp[];
}
@Component({
  selector: 'nlf-ors-editor-people',
  templateUrl: './ors-editor-people.component.html',
  styleUrls: ['./ors-editor-people.component.css']
})
export class NlfOrsEditorPeopleComponent implements OnInit {
  /**
   * NlfOrs should always consider the following interface for people
   *
   * id: number
   * tmp_name?: string
   * data?: {licenses?:, membership?:, gear?:}
   * 
   */

  @Input() who: ObservationPeople[]; // = 'involved' || 'organization.hl' || 'organization.hm' || 'organization.hfl' || 'organization.pilot';
  @Input() path: string;
  @Input() details = true;
  @Input() disabled = false;
  @Input() maxItems?: number;
  observation: ApiObservationsItem;

  items = [];
  dataReady = false;

  // Our shared data object which is: {45199: {id, full_name}}
  involved: NlfOrsEditorInvolvedInterface[]; //: Object; // our behavioursubject passing around

  modalRef;
  modalPerson: ObservationPeople;
  modalIndex: number;

  constructor(
    private http: HttpClient,
    private observationSubject: NlfOrsEditorService,
    private involvedSubject: NlfOrsEditorInvolvedService,
    private userLungoService: LungoPersonsService,
    private userService: ApiUserService,
    private apiCache: ApiCacheService,
    private modalService: NgbModal) {

    // Subscribe to involved:
    this.involvedSubject.currentArr.subscribe(list => this.involved = list);
    // Subscribe to observation
    this.observationSubject.observableObservation.subscribe(observation => this.observation = observation);

  }

  ngOnInit() {

    if (!!this.who) {
      // Build the id, full_name mapping
      this.who.forEach((item, index) => {
        console.log(item);

        if (item.id < 0 && !!item.tmp_name) {

          this.items.push({ id: item.id, full_name: item.tmp_name });
          this.involved.push({ id: item.id, tmp_name: item.tmp_name, full_name: item.tmp_name });
        } else {

          const options: ApiOptionsInterface = {
            query: { where: { id: item.id }, projection: { 'full_name': 1 } }
          };
          this.userLungoService.getUser(item.id, options).subscribe(
            data => {
              this.items.push({ id: item.id, full_name: data.full_name, tmp_name: item.tmp_name });
              this.involved.push({ id: item.id, full_name: data.full_name });
            },
            err => {
              console.log(err);
              this.items.push({ id: item.id, full_name: item.tmp_name, tmp_name: item.tmp_name });
              this.involved.push({ id: item.id, full_name: item.tmp_name, tmp_name: item.tmp_name });
              /**if (item.id < 0) {
                this.involved.push({ id: item.id, tmp_name: item.tmp_name });
              } else {
                this.involved.push({ id: item.id, full_name: item.full_name });
              } */
            },
            () => this.involvedSubject.changeArr(this.involved) // Update our behavioursubject:
          );
        }
      }); // End forEach
    } else {
      this.who = [];
      this.items = [];
      // Update our behavioursubject:
      this.involvedSubject.changeArr(this.involved);
    }

    this.dataReady = true;

  }



  /**
   * @TODO: add relevant information about person here in people
   */
  public onAdd(event) {

    console.log('Add');
    console.log(event);

    // Just add the bugger to our subject
    //this.involvedSubject.changeList(this.involved.push({id: event.id, full_name: event.full_name}));

    if (event.id === event.full_name) {
      console.log('tmp_name', event);
      const d = new Date();
      const id = -1 * d.getMilliseconds();
      this.who.push({ id: id, tmp_name: event.full_name });
      this.items.forEach((item, idx) => {
        if (item.id === event.id) {
          this.items[idx].id = id;
        }
      });

    } else {

      //data_tmp.id = event.id;
      if (event.id < 0) {
        let data_tmp: ObservationPeople = { id: event.id, tmp_name: event.full_name, data: { date: new Date() } };

      } else {

        let data_tmp: ObservationPeople = { id: event.id, data: { date: new Date() } };
        this.userLungoService.getUser(event.id, { query: { projection: { functions: 1, licenses: 1 } } }).subscribe(
          data => {
            console.log('data.licenses');
            data_tmp.data.licenses = data.licenses;
            data_tmp.data.functions = data.functions;
            this.userService.getUser(event.id, { query: { projection: { avatar: 0, settings: 1 } } }).subscribe(
              item => {
                data_tmp.data.private = item.settings;
              },
              err => console.log(err)
            );
          },
          err => console.log(err),
          () => this.who.push(data_tmp)
        );
      }

    }
    this.involved.push({ id: event.id, full_name: event.full_name });
    this.involvedSubject.changeArr(this.involved);
    //this.path.split('.').reduce((o,i)=>o[i], this.observation) = this.who;
    this.setObservation();


  }

  public openPersonModal(template, index) {
    this.modalIndex = index;
    this.modalPerson = this.who[index];
    if (!this.modalPerson.hasOwnProperty('data')) {
      this.modalPerson['data'] = {};
    }
    if (!this.modalPerson.data.hasOwnProperty('gear')) {
      this.modalPerson.data['gear'] = {};
    }
    this.modalRef = this.modalService.open(template, { size: 'lg' });
  }

  modalInvolvedUpdate(index) {
    this.who[index] = this.modalPerson;
    this.setObservation();
    this.modalRef.close();
  }

  public onRemove(event) {
    // let newList = []; // new placeholder
    this.who.forEach((item, index) => {

      if (item.id === event.id) {
        this.who.splice(index, 1);
        if (this.who === [null, null]) {
          this.who = [];
        }
      }
      // else {
      // Build new list to change subject
      // newList.push(item);
      // }
    });

    this.involved.forEach((item, index) => {
      if (item.id === event.id) {
        this.involved.splice(index, 1);
        if (this.involved === [null, null]) {
          this.involved = [];
        }
      }
    });
    this.items.forEach((item, index) => {
      if (item.id === event.id) {
        this.items.splice(index, 1);
        if (this.items === [null, null]) {
          this.items = [];
        }
      }
    });


    // Change our subject
    // this.involvedSubject.changeList(newList);
    // Emit to parent Output
    //delete this.involved[event.id];
    this.involvedSubject.changeArr(this.involved);
    this.setObservation();
  }

  private setObservation() {
    const paths = this.path.split('.');
    if (paths.length === 1) {
      this.observation[paths[0]] = this.who;
    } else if (paths.length === 2) {
      this.observation[paths[0]][paths[1]] = this.who;
    } else if (paths.length === 3) {
      this.observation[paths[0]][paths[1]][paths[2]] = this.who;
    } else if (paths.length === 4) {
      this.observation[paths[0]][paths[1]][paths[2]][paths[3]] = this.who;
    } else if (paths.length === 5) {
      this.observation[paths[0]][paths[1]][paths[2]][paths[3]][paths[4]] = this.who;
    }
    this.observationSubject.update(this.observation);
  }


  /**
   * @TODO: move out in membershipservice
   */
  public requestAutocompleteItems = (text: string): Observable<any> => {
    return this.apiCache.get(
      ['lungo-user-search', text, {}],
      this.userLungoService.search(text, this.observation._model.type))
      .pipe(map(data => data['_items']));
  }
}
