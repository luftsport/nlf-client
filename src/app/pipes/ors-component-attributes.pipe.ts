import { Pipe, PipeTransform } from '@angular/core';

/**
 * Needs to get attributes from server => resolver
 * 
 * Note it needs to be used in html element as innerHTML
 */
@Pipe({
  name: 'nlfOrsComponentAttributes'
})
export class NlfOrsComponentAttributesPipe implements PipeTransform {

  attributes = {
    reserve_ride: { color: 'info', label: 'Reserve benyttet' },
    aad_fire: { color: 'warning', label: 'Nødåpner fyring' },
    aad_rescue: { color: 'warning', label: 'Nødåpner redning' },
    packing_error: { color: 'default', label: 'Pakkefeil' },
    gear_malfunction: { color: 'default', label: 'Feilfunksjon' },
    damage: { color: 'default', label: 'Matriell skade' },
    gear_failure: { color: 'default', label: 'Utstyrsvikt' },
    rigger_error: { color: 'warning', label: 'MK/MR Feil' },
    violation: { color: 'default', label: 'Regelbrudd' },
    injury: { color: 'warning', label: 'Personskade' },
    death: { color: 'warning', label: 'Død' }
  };

  transform(value: any, badge: boolean = true, seperator: string = ' '): any {



    if (value instanceof Array) {
      return this.multiple(value, badge, seperator);
    } else if (typeof value === 'string') {
      return this.one(value, badge);
    } else {
      return '';
    }

  }

  private one(value: string, badge: boolean): string {

    if (badge) {
      return '<span class="badge badge-${this.attributes[value][\'color\']}">${this.attributes[value][\'label\']}</span>';
    } else {
      return this.attributes[value]['label'];
    }
  }

  private multiple(value: Array<string>, badge: boolean, seperator: string) {

    if (value.length > 0) {
      let data: string[] = [];

      for (let v of value) {
        data.push(this.one(v, badge));
      }

      return data.join(seperator);
    } else {
      return '';
    }

  }

}
