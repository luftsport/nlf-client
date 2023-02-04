
import { Component, OnInit, Inject, TemplateRef, OnDestroy, Input } from '@angular/core';
import { ApiOptionsInterface, ApiObservationsItem, ApiTagList, ApiTagItem, NlfConfigItem } from 'app/api/api.interface';
import { ApiTagsService } from 'app/api/api-tags.service';
import { NlfOrsEditorInvolvedService, NlfOrsEditorInvolvedInterface } from '../ors-editor-involved.service';
import { NlfOrsEditorService } from 'app/ors/ors-editor/ors-editor.service';
import { NlfConfigService } from 'app/nlf-config.service';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { distinctUntilChanged, debounceTime, switchMap, tap, catchError, map } from 'rxjs/operators';
import { Subject, Observable, of, concat } from 'rxjs';

import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { faPlus, faBolt, faBan, faClose, faCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'nlf-ors-editor-components',
  templateUrl: './ors-editor-components.component.html',
  styleUrls: ['./ors-editor-components.component.css']
})
export class NlfOrsEditorComponentsComponent implements OnInit, OnDestroy {

  faPlus = faPlus;
  faBolt = faBolt;
  faBan = faBan;
  faClose = faClose;
  faCheck = faCheck;

  involved: Array<NlfOrsEditorInvolvedInterface>;
  observation: ApiObservationsItem;

  causes = [];
  incidents = [];
  consequences = [];

  // Async Items
  tagsCauses$: Observable<ApiTagItem[]> | ApiTagItem[];
  tagsCausesLoading = false;
  tagsCausesInput$ = new Subject<string>();
  selectedCausesTags: [ApiTagItem[]] = [<any>[]];

  tagsIncidents$: Observable<ApiTagItem[]> | ApiTagItem[];
  tagsIncidentsLoading = false;
  tagsIncidentsInput$ = new Subject<string>();
  selectedIncidentsTags: [ApiTagItem[]] = [<any>[]];

  tagsConsequences$: Observable<ApiTagItem[]> | ApiTagItem[];
  tagsConsequencesLoading = false;
  tagsConsequencesInput$ = new Subject<string>();
  selectedConsequencesTags: [ApiTagItem[]] = [<any>[]];

  // Where at

  tagsWhereAt$: Observable<ApiTagItem[]> | ApiTagItem[];
  tagsWhereAtLoading = false;
  tagsWhereAtInput$ = new Subject<string>();

  // Person modal
  modalRef;
  modalComponent;

  components;

  public config: NlfConfigItem;


  constructor(
    private configService: NlfConfigService,
    private observationSubject: NlfOrsEditorService,
    private involvedSubject: NlfOrsEditorInvolvedService,
    private tagService: ApiTagsService,
    private modalService: NgbModal,
    //private tagifyService: TagifyService
  ) {

    this.involvedSubject.currentArr.subscribe(involved => this.involved = involved);

    this.observationSubject.observableObservation.subscribe(observation => {
      this.observation = observation;

      if (!!this.observation) {
        // Only on changed components!
        if (this.components !== observation.components || this.observation.involved !== observation.involved) {

          this.causes = this.observation.components.filter(
            component => component.flags.cause === true
          );
          console.log('Causes', this.causes);

          this.incidents = this.observation.components.filter(
            component => component.flags.incident === true
          );
          if (this.incidents.length === 0) {
            setTimeout(() => {
              this.incidents.push({
                what: '',
                flags: { incident: true },
                involved: [],
                where: { at: undefined, altitude: undefined },
                attributes: {}
              });
            }, 300);
          }
          console.log('Incident', this.incidents);

          this.consequences = this.observation.components.filter(
            component => component.flags.consequence === true
          );
          console.log('Consequences', this.consequences);
        }
        this.components = observation.components;


        // Preload tags
        this.configService.observableConfig.subscribe(
          data => {
            this.config = data;
            if (this.observation.acl_user.w) {
              this.preloadIncidentsTags();
              this.preloadCausesTags();
              this.preloadConsequencesTags();
              this.preloadWhereAtTags();
            }
          }
        );

      }

    });
  }


  ngOnInit() {


  }

  toggleBarrier(target, index) {
    if (this.observation.acl_user.w) {
      if (target === 'causes') {
        this.causes[index].flags.barrier = !!!this.causes[index].flags.barrier;
      } else if (target === 'incidents') {
        this.incidents[index].flags.barrier = !!!this.incidents[index].flags.barrier;
      } else if (target === 'consequences') {
        this.consequences[index].flags.barrier = !!!this.consequences[index].flags.barrier;
      }

      this.updateObservation();
    }
  }

  ngOnDestroy() {
    try {
      this.modalRef.close();
    } catch (e) {

    }
    // this.tagifyService.destroy();
  }

  getInvolved() {
    console.log('Get inv:', this.involved.map(inv => ({ id: inv['id'], tmp_name: inv['tmp_name'] })));
    return this.involved.map(inv => ({ id: inv['id'], tmp_name: inv['tmp_name'] }));
  }

  onSelect(event) {
    console.log(event);
  }

  /**
   * Drag'n drop functions
   */
  dropCause(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.causes, event.previousIndex, event.currentIndex);
    this.updateObservation();
  }

  dropConsequence(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.consequences, event.previousIndex, event.currentIndex);
    this.updateObservation();
  }

  updateObservation() {
    console.log('Components before', this.observation.components);
    let arr = [];
    arr.push(...this.causes);
    arr.push(...this.incidents);
    arr.push(...this.consequences);
    this.observation.components = arr;
    console.log('Components after', this.observation.components);
    this.observationSubject.update(this.observation);
  }

  moveCause(old_index, new_index) {
    if (new_index >= this.causes.length) {
      let k = new_index - this.causes.length + 1;
      while (k--) {
        this.causes.push(undefined);
      }
    }
    this.causes.splice(new_index, 0, this.causes.splice(old_index, 1)[0]);
    this.updateObservation();
  }

  moveConsequence(old_index, new_index) {
    if (new_index >= this.consequences.length) {
      let k = new_index - this.consequences.length + 1;
      while (k--) {
        this.consequences.push(undefined);
      }
    }
    this.consequences.splice(new_index, 0, this.consequences.splice(old_index, 1)[0]);
    this.updateObservation();
  }

  addCause(focus = true) {

    this.causes.unshift({
      what: undefined, flags: { cause: true },
      involved: [], attributes: {}, how: undefined, where: { at: undefined, altitude: undefined }
    });

    if (focus) {
      setTimeout(() => {
        const focusEl: any = document.querySelector('#focuscause').querySelector('input');
        focusEl.focus();
      }, 250);
    }

    this.updateObservation();
  }

  removeCause(index) {
    if (this.observation.acl_user.w) {
      this.causes.splice(index, 1);
      this.updateObservation();
    }
  }

  removeConsequence(index) {
    if (this.observation.acl_user.w) {
      this.consequences.splice(index, 1);
      this.updateObservation();
    }
  }

  addConsequence(focus = true) {
    // push
    this.consequences.push({
      what: undefined, flags: { consequence: true },
      involved: [], attributes: {}, how: undefined, where: { at: undefined, altitude: undefined }
    });

    if (focus) {
      setTimeout(() => {
        const focusEl: any = document.querySelector('#focusconsequence').querySelector('input');
        focusEl.focus();
      }, 250);
    }

    this.updateObservation();
  }

  onAddWhat(value, target, index) {
    console.log('Add', value, target, index);
    if (target === 'cause') {
      this.causes[index].what = value;

      this.addCause();

    } else if (target === 'incident') {
      this.incidents[index].what = value;

      // Add casue on add incident
      if (this.causes.length === 0) {
        if (this.consequences.length === 0) {
          this.addConsequence(false);
        }
        this.addCause();
      }

    } else if (target === 'consequence') {
      this.consequences[index].what = value;

      this.addConsequence();
    }
    this.updateObservation();
  }
  onRemoveWhat(target, index) {
    console.log('Del', target, index);

    if (target === 'cause') {
      this.causes[index].what = undefined;
    } else if (target === 'incident') {
      this.incidents[index].what = undefined;
    } else if (target === 'consequence') {
      this.consequences[index].what = undefined;
    }
    this.updateObservation();
  }

  /**
   * Add new tag
   * @param event full tag
   * @param target cause | incident | consequence
   * @param index index in respective array
   */
  public onAdd(event, target, index) {

    if (event.hasOwnProperty('_id')) {
      this.tagService.freq(event._id, 1).subscribe(() => { });
    } else {
      this.tagService.create({ tag: event.tag, group: 'component.what.' + target, activity: this.observation._model.type })
        .subscribe(
          result => {
            if (target === 'causes') {
              this.selectedCausesTags[index] = [{ _id: result._id, tag: event.tag }];
            } else if (target === 'incidents') {
              this.selectedIncidentsTags[index] = [{ _id: result._id, tag: event.tag }];
            } else if (target === 'consequences') {
              this.selectedConsequencesTags[index] = [{ _id: result._id, tag: event.tag }];
            }
          },
          err => console.log('Error updating tag')
        );
    }

  }

  public onRemove(event, target, index) {
    if (event.hasOwnProperty('_id')) {
      this.tagService.freq(event._id, -1).subscribe(() => { });
    }
    this.onRemoveWhat(target, index);
  }

  public onChange(event, target, index) {
    console.log('Changed', event, target, index);
    //this.onAddWhat(event.tag, target, index);
    if (typeof event === 'undefined') {
      this.onRemoveWhat(target, index);
    } else {
      this.onAddWhat(event.tag, target, index);
    }

  }

  //////// P R E L O A D ////////
  private preloadCausesTags() {
    let a: ApiTagItem[];
    this.tagsCauses$ = this.tagService.getTags({
      query: {
        where: {
          activity: this.observation._model.type,
          group: 'component.what.cause',
          freq: { $gte: 0 }
        },
        sort: [{ freq: -1 }],
        max_results: 1000
      }
    }).pipe(
      map((r) => a = r._items),
      catchError(() => of([])), // empty list on error
      tap(() => this.tagsCausesLoading = false)
    );
  }

  private preloadIncidentsTags() {
    let a: ApiTagItem[];
    this.tagsIncidents$ = this.tagService.getTags({
      query: {
        where: {
          activity: this.observation._model.type,
          group: 'component.what.incident',
          freq: { $gte: 0 }
        },
        sort: [{ freq: -1 }],
        max_results: 1000
      }
    }).pipe(
      map((r) => a = r._items),
      catchError(() => of([])), // empty list on error
      tap(() => this.tagsIncidentsLoading = false)
    );
  }


  private preloadConsequencesTags() {
    let a: ApiTagItem[];
    this.tagsConsequences$ = this.tagService.getTags({
      query: {
        where: {
          activity: this.observation._model.type,
          group: 'component.what.consequence',
          freq: { $gte: 0 }
        },
        sort: [{ freq: -1 }],
        max_results: 1000
      }
    }).pipe(
      map((r) => a = r._items),
      catchError(() => of([])), // empty list on error
      tap(() => this.tagsConsequencesLoading = false)
    );
  }

  private preloadWhereAtTags() {
    let a: ApiTagItem[];
    this.tagsWhereAt$ = this.tagService.getTags({
      query: {
        where: {
          activity: this.observation._model.type,
          group: 'where-at',
          freq: { $gte: 0 }
        },
        sort: [{ freq: -1 }],
        max_results: 1000
      }
    }).pipe(
      map((r) => a = r._items),
      catchError(() => of([])), // empty list on error
      tap(() => this.tagsWhereAtLoading = false)
    );
  }

  /////// M O D A L ///////

  openModal(template: TemplateRef<any>, target, index) {

    this.modalComponent = { data: {}, target: target, index: index, involved: this.involved };

    if (target === 'cause') {
      this.modalComponent['data'] = this.causes[index];
    } else if (target === 'incident') {
      this.modalComponent['data'] = this.incidents[index];
    } else if (target === 'consequence') {
      this.modalComponent['data'] = this.consequences[index];
    }

    // Sanity:
    if (!this.modalComponent.data.hasOwnProperty('where')) {
      this.modalComponent.data['where'] = { at: undefined, altitude: undefined };
    }
    if (!this.modalComponent.data['where']['at']) {
      this.modalComponent.data['where']['at'] = undefined;
    }
    if (!this.modalComponent.data['where']['altitude']) {
      this.modalComponent.data['where']['altitude'] = 0;
    }
    // this.modalComponent.asObservable

    // If not component involved in global involved, remove @TODO put map outside
    this.modalComponent.data.involved.forEach((involved, i) => {
      if (this.involved.map(p => p.id).indexOf(involved.id) < 0) {
        this.modalComponent.data.involved.splice(i, 1);
      }
    });

    this.modalRef = this.modalService.open(template, { size: 'lg' });
  }

  modalComponentUpdate() {

    if (this.modalComponent.target === 'cause') {
      this.causes[this.modalComponent.index] = this.modalComponent.data;
    } else if (this.modalComponent.target === 'incident') {
      this.incidents[this.modalComponent.index] = this.modalComponent.data;
    } else if (this.modalComponent.target === 'consequence') {
      this.consequences[this.modalComponent.index] = this.modalComponent.data;
    }
    this.updateObservation();

    this.modalRef.close();
  }

  // Toggle involved
  modalToggleInvolved(person) {
    const index = this.modalComponent.data.involved.map(i => i.id).indexOf(person.id);
    if (index > -1) {
      // id in involved, remove it!
      this.modalComponent.data.involved.splice(index, 1);

    } else if (index < 0) {
      if (!!person.tmp_name) {
        this.modalComponent.data.involved.push({ id: person.id, tmp_name: person.tmp_name });
      } else {
        this.modalComponent.data.involved.push({ id: person.id });
      }
    }
  }

  modalWhereAtUpdate(event) {
    console.log('Modal where at', event);
    if (event.hasOwnProperty('_id')) {
      this.tagService.freq(event._id, 1).subscribe(() => {
        this.modalComponent.data['where']['at'] = event.tag;
      });
    } else {
      this.tagService.create({ tag: event.tag, group: 'where-at', activity: this.observation._model.type })
        .subscribe(
          result => {
            this.modalComponent.data['where']['at'] = event.tag;
          },
          err => console.log('Error updating tag')
        );
    }
  }

  getModalInvolvedIndex(id) {
    return this.modalComponent.data.involved.map(involved => involved.id).indexOf(id);
  }

  modalToggleAttributes(key, value) {
    this.modalComponent.data.attributes[key] = value;
  }

  modalToggleBarrier(value) {
    this.modalComponent.data.flags['barrier'] = value;
  }


}
