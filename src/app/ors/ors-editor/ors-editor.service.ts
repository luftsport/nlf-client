import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiObservationsItem } from 'app/api/api.interface';

@Injectable()
export class NlfOrsEditorService {


  private observation = new BehaviorSubject<ApiObservationsItem>(undefined);

  public observableObservation = this.observation.asObservable();

  constructor() { }

  public update(observation: ApiObservationsItem) {

    this.observation.next(observation);
  }

  public reset() {
    this.observation.next(undefined);
  }

  public unsubscribe() {
    //this.observation.unsubscribe();
    //this.observation.next(undefined);
    //this.observation.complete();
    this.reset();

  }

}

/** Cut'n paste stuff
import { NlfOrsEditorService } from 'app/ors/ors-editor.service';
import { ApiObservationsItem } from 'app/api/api.interface';
, ApiObservationsItem

observation: ApiObservationsItem;

constructor(private subject: NlfOrsEditorService) {
    this.subject.observableObservation.subscribe(observation => this.observation = observation);
  }


  this.subject.update(this.observation);



 */
