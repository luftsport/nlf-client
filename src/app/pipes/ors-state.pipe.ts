import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nlfOrsState'
})
export class NlfOrsStatePipe implements PipeTransform {

  private statuses = {'withdrawn': 'Trekt tilbake',
                      'draft': 'Utkast',
                      'pending_review_hi': 'Avventer HI',
                      'pending_review_fs': 'Avventer Fagsjef',
                      'pending_review_su': 'Avventer SU',
                      'closed': 'Lukket' };

  transform(value: any, args?: any): any {

    let data = '';

    try {
      data = this.statuses[value];
    } catch (e) {
      data = 'Ukjent';
    }
    return data;
  }

}
