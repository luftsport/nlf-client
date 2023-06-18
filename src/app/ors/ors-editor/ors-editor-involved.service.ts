import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LungoPersonsService } from 'app/api/lungo-persons.service';
import { ApiCacheService } from 'app/api/api-cache.service';
import { ApiOptionsInterface } from 'app/api/api.interface';

export interface NlfOrsEditorInvolvedInterface {
  id: number;
  full_name?: string;
  tmp_name?: string;
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

  public currentArr = this.involvedArr.asObservable(); // For mentions to subscribe

  private list = [];

  constructor(
    private personService: LungoPersonsService,
    private apiCache: ApiCacheService
  ) { }

  public add(person_id: number, name?: string) {
    if (!!name && name.length > 3) {
      this.list.push({ id: person_id, full_name: name });
      this.changeArr(this.list);
    } else if (person_id > 0) {
      const options: ApiOptionsInterface = {
        query: { projection: { full_name: 1 } }
      };
      this.apiCache.get(
        ['user', person_id, options.query],
        this.personService.getUser(person_id, options)
      ).subscribe(
        data => {
          this.list.push({ id: person_id, full_name: data.full_name });
          this.changeArr(this.list);
        },
        err => { },
        () => { }
      );
    }
  }

  public remove(person_id: number) {
    this.list = this.list.filter(x => x.id != person_id);
    this.changeArr(this.list);
  }

  public update(list: Array<Object>) {
    this.changeArr(list);
  }

  public changeArr(list: Array<Object>) {
    //const unique = [...Array.from(new Set(list.map((item: any) => item.id)))];
    let flags = [];
    let output = [];

    // Filter unique
    /**
    const flags = new Set();
    const newPlaces = places.filter(entry => {
      if (flags.has(entry.city)) {
          return false;
      }
      flags.add(entry.city);
      return true;
    });
    **/
    for (let i = 0; i < list.length; i++) {
      if (!!flags[list[i]['id']]) {
        continue;
      }
      flags[list[i]['id']] = true;
      output.push(list[i]);
    }
    this.involvedArr.next(output);
  }

}
