import { NgModule, InjectionToken } from '@angular/core';
import { environment } from '../environments/environment';

export let NLF_CONFIG = new InjectionToken<NlfConfig>('nlf.config');

export class NlfConfig {
  apiEndpoint: string;
  observation: {
    components: { attributes: Object, flags: Object },
    flags: Object,
    rating: Object,
    stateArr: Array<string>,
    state: Object,
    typesArr: Array<string>,
    types: Object
  };
  // flags: Object;
  // rating: Array<Object>;
  // state: Object;
  // types: Object;

}

export const NLF_DI_CONFIG: NlfConfig = {
  apiEndpoint: '/api/v1',
  // OBSERVATION label, title, badge, icon (fa)
  observation: {

    components: {
      attributes: {
        reserve_ride: { badge: 'info', label: 'Reserve benyttet' },
        aad_fire: { badge: 'danger', label: 'Nødåpner fyring' },
        aad_rescue: { badge: 'danger', label: 'Nødåpner redning' },
        packing_error: { badge: 'secondary', label: 'Pakkefeil' },
        gear_malfunction: { badge: 'secondary', label: 'Feilfunksjon' },
        damage: { badge: 'secondary', label: 'Matriell skade' },
        gear_failure: { badge: 'secondary', label: 'Utstyrsvikt' },
        rigger_error: { badge: 'warning', label: 'MK/MR Feil' },
        violation: { badge: 'warning', label: 'Regelbrudd' },
        injury: { badge: 'danger', label: 'Personskade' },
        death: { badge: 'dark', label: 'Død' }
      },
      flags: {
        barrier: { label: 'Barriære', badge: 'secondary' },
        incident: { label: 'Hendelse', badge: 'info' },
        cause: { label: 'Årsak', badge: 'warning' },
        root_cause: { label: 'Rotårsak', badge: 'warning' },
        consequence: { label: 'Konsekvens', badge: 'danger' },
        final_consequence: { label: 'Sluttkonsekvens', badge: 'danger' },
      }

    },
    flags: {
      aviation: { label: 'Luftfartshendelse', badge: 'danger', icon: 'plane' },
      insurance: { label: 'Forsikringssak', badge: 'warning', icon: 'wheelchair' },
    },
    rating: [
      { label: null, value: 0, badge: 'danger' },
      { label: 'Alt OK', value: 1, badge: 'success' },
      { label: 'Til ettertanke', value: 2, badge: 'info' },
      { label: 'Mindre skade', value: 3, badge: 'warning' },
      { label: 'Middels skade', value: 4, badge: 'warning' },
      { label: 'Alvorlig skade', value: 5, badge: 'danger' },
      { label: 'Alvorlig skade/men', value: 6, badge: 'danger' },
      { label: 'Død', value: 7, badge: 'dark' },
      { label: 'Flere døde', value: 8, badge: 'dark' }
    ],
    stateArr: ['withdrawn', 'draft', 'pending_review_hi', 'pending_review_fs', 'pending_review_su', 'closed'],
    state: {
      unknown: { badge: 'danger', icon: 'exclamation', label: 'Ukjent' },
      withdrawn: { badge: 'dark', icon: 'ban', label: 'Trekt tilbake' },
      draft: { badge: 'secondary', icon: 'pencil', label: 'Utkast' },
      pending_review_hi: { badge: 'info', icon: 'clock-o', label: 'Avventer HI' },
      pending_review_fs: { badge: 'info', icon: 'clock-o', label: 'Avventer Fagsjef' },
      pending_review_su: { badge: 'info', icon: 'clock-o', label: 'Avventer SU' },
      closed: { badge: 'success', icon: 'check', label: 'Lukket' }
    },
    typesArr: ['sharing', 'unwanted_act', 'unsafe_act', 'near_miss', 'incident', 'accident'],
    types: {
      sharing: { label: 'Erfaringsdeling', badge: 'info', title: 'Del en observasjon av noe bra eller dårlig' },
      unwanted_act: { label: 'Uønsket', badge: 'secondary', title: 'Alle de tingene som oppstår som er uønsket eller uheldige' },
      unsafe_act: { label: 'Uønsket', badge: 'secondary', title: 'Alle de tingene som oppstår som er uønsket eller uheldige' },
      near_miss: { label: 'Næruhell', badge: 'warning', title: 'Næruhell som definert i HB men ikke begrenset av' },
      incident: { label: 'Uhell', badge: 'danger', title: 'Personskade - oppsøker legehjelp' },
      accident: { label: 'Ulykke', badge: 'dark', title: 'Død eller varige men' },
    }
  } // END observation
};

@NgModule({
  providers: [{
    provide: NLF_CONFIG,
    useValue: NLF_DI_CONFIG
  }]
})
export class NlfConfigModule { }