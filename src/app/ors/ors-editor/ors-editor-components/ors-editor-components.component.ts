
import { Component, OnInit, Inject, TemplateRef, OnDestroy } from '@angular/core';
import { ApiOptionsInterface, ApiObservationsItem, ApiTagList } from 'app/api/api.interface';
import { ApiTagsService } from 'app/api/api-tags.service';
import { NlfOrsEditorInvolvedService, NlfOrsEditorInvolvedInterface } from '../ors-editor-involved.service';
import { NlfOrsEditorService } from 'app/ors/ors-editor/ors-editor.service';
import { NlfConfig, NLF_CONFIG } from 'app/nlf-config.module';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { map, debounceTime, switchMap, distinctUntilChanged } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';




@Component({
  selector: 'nlf-ors-editor-components',
  templateUrl: './ors-editor-components.component.html',
  styleUrls: ['./ors-editor-components.component.css']
})
export class NlfOrsEditorComponentsComponent implements OnInit, OnDestroy {

  involved: Array<NlfOrsEditorInvolvedInterface>;
  observation: ApiObservationsItem;

  causes = [];
  incidents = [];
  consequences = [];

  incidentTags = [];

  item = ['test', 'wrong', 'fuck'];
  formatter;
  search;

  modalRef;
  modalComponent;

  constructor(
    @Inject(NLF_CONFIG) public config: NlfConfig,
    private observationSubject: NlfOrsEditorService,
    private involvedSubject: NlfOrsEditorInvolvedService,
    private tagService: ApiTagsService,
    private modalService: NgbModal) {

    this.involvedSubject.currentArr.subscribe(involved => this.involved = involved);

    this.observationSubject.observableObservation.subscribe(observation => {
      this.observation = observation;

      this.causes = this.observation.components.filter(
        component => component.flags.cause === true
      );
      console.log('Causes', this.causes);

      this.incidents = this.observation.components.filter(
        component => component.flags.incident === true
      );

      // @TODO: When is this.involved finished?
      if (this.incidents.length === 0) {
        setTimeout(() => {
          this.incidents.push({ what: '', flags: { incident: true }, involved: this.getInvolved(), attributes: {} });
        }, 300);
      }

      console.log('Incident', this.incidents);

      this.consequences = this.observation.components.filter(
        component => component.flags.consequence === true
      );
      console.log('Consequences', this.consequences);

    });


    // Searcher
    this.formatter = (x: { tag: string }) => x.tag;

    this.search = (text: Observable<string>) =>
      text.pipe(switchMap(term =>
        this.getTags(term).pipe(debounceTime(500),
          distinctUntilChanged(),
          map(r => r._items.length === 0 ? [] : r._items)) // .map(r => r.tag)
      ));

  }



  ngOnInit() {


  }

  ngOnDestroy() {
    try {
      this.modalRef.close();
    } catch (e) {

    }
  }

  getInvolved() {
    console.log('Get inv:', this.involved.map(inv => ({ id: inv['id'], tmpname: inv['tmpname'] })));
    return this.involved.map(inv => ({ id: inv['id'], tmpname: inv['tmpname'] }));
  }

  getTags(term): Observable<any> {
    const options: ApiOptionsInterface = {
      query: {
        where: { '$text': { '$search': term }, group: 'component.what.cause', freq: { '$gte': 0 } },
        sort: [{ freq: -1 }, { tag: 1 }],
        max_results: 5000
      }
    };
    return this.tagService.getTags(options); // .subscribe(data => this.apidata = data._items);

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
      involved: this.getInvolved(), attributes: {}, how: undefined, where: { at: undefined, altitude: undefined }
    });

    if (focus) {
      setTimeout(() => {
        const focusEl: any = document.querySelector('input[id=focuscause]');
        focusEl.focus();
      }, 250);
    }

    this.updateObservation();
  }

  removeCause(index) {
    this.causes.splice(index, 1);
    this.updateObservation();
  }

  removeConsequence(index) {
    this.consequences.splice(index, 1);
    this.updateObservation();
  }

  addConsequence(focus = true) {
    // push
    this.consequences.push({
      what: undefined, flags: { consequence: true },
      involved: this.getInvolved(), attributes: {}, how: undefined, where: { at: undefined, altitude: undefined }
    });

    if (focus) {
      setTimeout(() => {
        const focusEl: any = document.querySelector('input[id=focusconsequence]');
        focusEl.focus();
      }, 250);
    }

    this.updateObservation();
  }

  onAddWhat(event, target, index) {
    console.log('Add', event, target, index);
    if (target === 'cause') {
      this.causes[index].what = event.value;

      this.addCause();

    } else if (target === 'incident') {
      this.incidents[index].what = event.value;

      // Add casue on add incident
      if (this.causes.length === 0) {
        if (this.consequences.length === 0) {
          this.addConsequence(false);
        }
        this.addCause();
      }

    } else if (target === 'consequence') {
      this.consequences[index].what = event.value;

      this.addConsequence();
    }
    this.updateObservation();
  }
  onRemoveWhat(event, target, index) {
    console.log('Del', event, target, index);

    if (target === 'cause') {
      this.causes[index].what = undefined;
    } else if (target === 'incident') {
      this.incidents[index].what = undefined;
    } else if (target === 'consequence') {
      this.consequences[index].what = undefined;
    }
    this.updateObservation();
  }

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
    if (!this.modalComponent.data['where']) {
      this.modalComponent.data['where'] = { at: undefined, altitude: undefined };
    }
    if (!this.modalComponent.data.where['at']) {
      this.modalComponent.data.where['at'] = undefined;
    }
    if (!this.modalComponent.data.where['altitude']) {
      this.modalComponent.data.where['altitude'] = 0;
    }
    // this.modalComponent.asObservable

    // If not component involved in global involved, remove @TODO put map outside
    this.modalComponent.data.involved.forEach((id, i) => {
      const pindex = this.involved.map(p => p.id).indexOf(id);
      if (pindex < 0) {
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
    console.log('Index involved', index);
    if (index > -1) {
      // id in involved, remove it!
      this.modalComponent.data.involved.splice(index, 1);

    } else if (index < 0) {
      if (!!person.tmpname) {
        this.modalComponent.data.involved.push({ id: person.id, tmpname: person.tmpname });
      } else {
        this.modalComponent.data.involved.push({ id: person.id });
      }
    }
  }

  getModalInvolvedIndex(id) {
    return this.modalComponent.data.involved.map(involved => involved.id).indexOf(id)
  }

  modalToggleAttributes(key, value) {
    this.modalComponent.data.attributes[key] = value;
  }

  modalToggleBarrier(value) {
    this.modalComponent.data.flags['barrier'] = value;
  }


}
