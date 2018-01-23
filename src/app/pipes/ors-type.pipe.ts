import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nlfOrsType'
})
export class NlfOrsTypePipe implements PipeTransform {
  url = '/ors/fallskjerm/search/tag/';
  types = {
    sharing: { label: 'Erfaringsdeling', badge: 'info', title: 'Del en observasjon av noe bra eller dårlig' },
    unwanted_act: { label: 'Uønsket', badge: 'secondary', title: 'Alle de tingene som oppstår som er uønsket eller uheldige' },
    unsafe_act: { label: 'Uønsket', badge: 'secondary', title: 'Alle de tingene som oppstår som er uønsket eller uheldige' },
    near_miss: { label: 'Næruhell', badge: 'warning', title: 'Næruhell som definert i HB men ikke begrenset av' },
    incident: { label: 'Uhell', badge: 'danger', title: 'Personskade - oppsøker legehjelp' },
    accident: { label: 'Ulykke', badge: 'dark', title: 'Død eller varige men' },
  };

  transform(value: string): string {
    let data = '';
    if (value === '' || typeof value === 'undefined') {
      return 'Ukjent';
    }

    try {
      data = this.types[value]['label'];
    }  catch (e) {
      data = 'Ukjent';
    }

    return data;
  }

}
