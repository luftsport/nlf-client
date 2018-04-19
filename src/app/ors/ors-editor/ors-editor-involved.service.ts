import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export interface NlfOrsEditorInvolvedInterface {
  id: number;
  fullname?: string;
  tmpname?: string;
}

@Injectable()
export class NlfOrsEditorInvolvedService {
  /**
   * Provides a behavioursubject for sharing a list of persons
   * Used by the people component getting people into the observation.
   * For every person that is and is added the subject updates accordingly
   * Removing persons will not affect the subject since our menitions
   * module do not like it. HI is not added even if is regarded a person in the
   * observation.
   */

  private involvedArr = new BehaviorSubject<Array<NlfOrsEditorInvolvedInterface>>([]);

  currentArr = this.involvedArr.asObservable(); // For mentions to subscribe

  constructor() { }

  public changeArr(list: Array<Object>) {
    //const unique = [...Array.from(new Set(list.map((item: any) => item.id)))];
    let flags = [];
    let output = [];

    for (let i = 0; i < list.length; i++) {
      if (!!flags[list[i]['id']]) {
        continue;
      }
      flags[list[i]['id']] = true;
      output.push(list[i]);
    }
    this.involvedArr.next(output);
    console.log('InvolvedSubject:', output);
  }

}

