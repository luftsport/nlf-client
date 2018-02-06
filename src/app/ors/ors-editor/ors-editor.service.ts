import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ApiObservationsItem } from '../../api/api.interface';

@Injectable()
export class NlfOrsEditorService {


  private observation = new BehaviorSubject<ApiObservationsItem>({id: 0, when: new Date(), club: 'NLF', location: {}, owner: 0, reporter: 0 });

  observableObservation = this.observation.asObservable();

  constructor() { }

  public update(observation: ApiObservationsItem) {

    this.observation.next(observation);
  }

}

/** Cut'n paste stuff
import { NlfOrsEditorService } from '../ors-editor.service';
import { ApiObservationsItem } from '../../../api/api.interface';
, ApiObservationsItem

observation: ApiObservationsItem;

constructor(private subject: NlfOrsEditorService) {
    this.subject.observableObservation.subscribe(observation => this.observation = observation);
  }


  this.subject.update(this.observation);



 */