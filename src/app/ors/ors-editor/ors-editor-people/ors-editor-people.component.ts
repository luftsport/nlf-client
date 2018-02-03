import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ApiOptionsInterface, ApiObservationOrganizationInterface } from '../../../api/api.interface';
import { ApiNlfUserService } from '../../../api/api-nlf-user.service';
import { ApiUserService } from '../../../api/api-user.service';
import { NlfOrsEditorService } from '../ors-editor.service';

interface ObservationPeople {
  id: number;
  tmpname?: string;
  data?: { date?: Date, licenses?: Object, membership?: Object, private?: Object };
}
interface Pp {
  id: number;
  tmpname?: string;
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
   * tmpname?: string
   * data?: {licenses?:, membership?:, gear?:}
   * 
   */
  @Input() people: Pp[];
  @Output() peopleChange: EventEmitter<Pp[]> = new EventEmitter<Pp[]>();
  items = [];
  dataReady = false;

  // Our shared data object which is: {45199: {id, fullname}}
  list: Array<Object>; //: Object; // our behavioursubject passing around


  constructor(
    private http: HttpClient,
    private data: NlfOrsEditorService,
    private userNlfService: ApiNlfUserService,
    private userService: ApiUserService) {

    // Subscribe to behavioursubject:
    this.data.currentArr.subscribe(list => this.list = list);

  }

  ngOnInit() {

    if (!!this.people) {
      // Build the id, fullname mapping
      this.people.forEach((item, index) => {
        console.log(item);

        if (item.id < 0 && !!item.tmpname) {

          this.items.push({ id: item.id, fullname: item.tmpname });
          this.list.push({ id: item.id, fullname: item.tmpname });
        } else {

          let options: ApiOptionsInterface = {
            query: { where: { id: item.id }, projection: { 'fullname': 1 } }
          };
          this.userNlfService.getUser(item.id, options).subscribe(
            data => {
              this.items.push({ id: item.id, fullname: data.fullname, tmpname: item.tmpname });
              this.list.push({ id: item.id, fullname: data.fullname });
            },
            err => {
              console.log(err);
              this.items.push({ id: item.id, fullname: item.tmpname, tmpname: item.tmpname });
              this.list.push({ id: item.id, fullname: item.tmpname });
            },
            () => this.data.changeArr(this.list) // Update our behavioursubject:
          );
        }
      }); // End forEach
    } else {
      this.people = [];
      this.items = [];
      // Update our behavioursubject:
      this.data.changeArr(this.list);
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
    //this.data.changeList(this.list.push({id: event.id, fullname: event.fullname}));

    if (!(typeof event.id === 'number')) {
      const d = new Date();
      const id = -1 * d.getMilliseconds();
      this.people.push({ id: id, tmpname: event.fullname });

    } else {

      //data_tmp.id = event.id;
      if (event._id < 0) {
        let data_tmp: ObservationPeople = { id: event.id, tmpname: event.fullname };

      } else {

        let data_tmp: ObservationPeople = { id: event.id, data: { date: new Date() } };
        this.userNlfService.getUser(event.id, { query: { projection: { membership: 1, licenses: 1 } } }).subscribe(
          data => {
            console.log('data.licenses');
            data_tmp.data.licenses = data.licenses;
            data_tmp.data.membership = data.membership;
            this.userService.getUser(event.id, { query: { projection: { avatar: 0, settings: 1 } } }).subscribe(
              item => {
                data_tmp.data.private = item.settings;
              },
              err => console.log(err)
            );
          },
          err => console.log(err),
          () => this.people.push(data_tmp)
        );
      }

    }
    this.list.push({ id: event.id, fullname: event.fullname });
    this.data.changeArr(this.list);
    this.peopleChange.emit(this.people);

  }

  public onRemove(event) {
    // let newList = []; // new placeholder
    this.people.forEach((item, index) => {

      if (item.id === event.id) {
        this.people.splice(index, 1);
        if (this.people === [null, null]) {
          this.people = [];
        }
      }
      // else {
      // Build new list to change subject
      // newList.push(item);
      // }
    });

    // Change our subject
    // this.data.changeList(newList);
    // Emit to parent Output
    //delete this.list[event.id];

    this.peopleChange.emit(this.people);

  }


  /**
   * @TODO: move out in membershipservice
   */
  public requestAutocompleteItems = (text: string): Observable<any> => {
    const url = `/api/v1/melwin/users/search?q=${text}`;
    return this.http
      .get(url)
      .pipe(map(data => data['_items']));
  }
}
