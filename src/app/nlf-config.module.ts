import { NgModule, InjectionToken } from '@angular/core';
import { environment } from 'environments/environment';

export let NLF_CONFIG = new InjectionToken<NlfConfig>('nlf.config');

export class NlfItemConfig {
  name?: string;
  letter?: string;
  key?: string;
  id?: number;
  org_id?: number;

  observation?: {
    create?: { local?: boolean, dev?: boolean, beta?: boolean, prod?: boolean },
    components?: { attributes: Object, flags: Object },
    flagsArr?: Array<string>,
    flags?: Object,
    rating?: Object,
    stateArr?: Array<string>,
    stateRoles?: Object,
    state?: Object,
    typesArr?: Array<string>,
    types?: Object,
    ask?: Object,
    e5x?: {
      enabled?: boolean,
      rit_version?: string,
      //submission?: boolean
    },
    categories?: Array<string>,
    operational?: { club?: boolean, op?: boolean, jumping?: boolean, flying?: boolean };
  };
  // flags: Object;
  // rating: Array<Object>;
  // state: Object;
  // types: Object;

}

export class NlfConfig {
  environment?: string;
  apiEndpoint?: string;
  nlf_org_id?: number;
  activities?: number[];
  activity_orgs?: Object;
  nif_roles?: Object;
  mapping?: Object;
  inv_mapping?: Object;
  luftsport?: NlfItemConfig;
  fallskjerm?: NlfItemConfig;
  motorfly?: NlfItemConfig;
  mikrofly?: NlfItemConfig;
  seilfly?: NlfItemConfig;
  ballong?: NlfItemConfig;
  hps?: NlfItemConfig;
  modellfly?: NlfItemConfig;
}

const NlfRating = [
  { label: null, value: 0, badge: 'danger' },
  { label: 'Alt OK', value: 1, badge: 'success' },
  { label: 'Til ettertanke', value: 2, badge: 'info' },
  { label: 'Mindre skade', value: 3, badge: 'warning' },
  { label: 'Middels skade', value: 4, badge: 'warning' },
  { label: 'Alvorlig skade', value: 5, badge: 'danger' },
  { label: 'Alvorlig skade/men', value: 6, badge: 'danger' },
  { label: 'Død', value: 7, badge: 'dark' },
  { label: 'Flere døde', value: 8, badge: 'dark' }
];

const NIFRoles = {
  klubbmedlem: 10000000,
  medlemsansvarlig: 40000004,
  leder: 1,
  utdanningskontakt: 7,
  integrasjonsbruker: 202427,
  kursarrangør: 40000010,
  organsvarlig: 40000008,
  lisensansvarlig: 26,
  politiattest: 202401,
  hovedinstruktør: 201120,
  skolesjef: 202639,
  operativleder: 202638,
  orskoordinator: 202655,
  fornyelse: 202635,
  sikkerhetsansvarlig: 202640
}

export const NLF_DI_CONFIG: NlfConfig = {
  apiEndpoint: '/api/v1',
  nif_roles: NIFRoles,
  // OBSERVATION label, title, badge, icon (fa)
  nlf_org_id: 376,
  activities: [27, 109, 238, 235, 237, 110, 111, 236],
  activity_orgs: { 90972: 109, 203025: 238, 203030: 237, 203026: 235, 90968: 110, 90969: 111, 203027: 236 },
  mapping: {
    fallskjerm: 109,
    motorfly: 238,
    ballong: 235,
    mikrofly: 237,
    hps: 110,
    seilfly: 111,
    modellfly: 236,
    luftsport: 27
  },
  inv_mapping: {
    109: 'fallskjerm',
    238: 'motorfly',
    235: 'ballong',
    237: 'mikrofly',
    110: 'hps',
    111: 'seilfly',
    236: 'modellfly',
    27: 'luftsport'
  },
  luftsport: {
    name: 'Norges Luftsportforbund',
    letter: 'nlf',
    key: 'luftsport',
    id: 27,
    org_id: 376,
  },
  fallskjerm: {
    name: 'Fallskjerm',
    letter: 'f',
    key: 'fallskjerm',
    id: 109,
    org_id: 90972,
    observation: {
      app_name: 'ORS',
      e5x: {
        enabled: false
      },
      categories: ['aff', 'line', 'elev', 'tandem', 'skjerm', 'materiell'],
      operational: { club: true, op: true, jumping: true },
      create: { local: true, dev: true, beta: false, prod: false },
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
          willful_violation: { badge: 'danger', label: 'Med vitende vilje' },
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
      flagsArr: ['aviation', 'insurance'],
      flags: {
        aviation: { label: 'Luftfartshendelse', badge: 'danger', icon: 'plane' },
        insurance: { label: 'Forsikringssak', badge: 'warning', icon: 'wheelchair' },
      },
      stateArr: ['withdrawn', 'draft', 'pending_review_hi', 'pending_review_fs', 'pending_review_su', 'closed'],
      stateRoles: {
        draft: 'Observatør',
        pending_review_hi: 'Hovedinstruktør',
        pending_review_fs: 'Fagsjef',
        pending_review_su: 'Sikkerhet og Utdanningskommisjonen',
        pending_review_su_aff: 'Sikkerhet og Utdanningskommisjonen - AFF',
        pending_review_su_tandem: 'Sikkerhet og Utdanningskommisjonen - Tandem',
        pending_review_su_msj: 'Sikkerhet og Utdanningskommisjonen - MSJ',
        pending_review_su_skjerm: 'Sikkerhet og Utdanningskommisjonen - Skjemkjøring',
      },
      state: {
        unknown: { badge: 'danger', icon: 'exclamation', label: 'Ukjent', descr: 'Ukjent tilstand i arbeidsflyten' },
        withdrawn: { badge: 'dark', icon: 'ban', label: 'Trukket', descr: 'Trukket tilbake' },
        draft: { badge: 'secondary', icon: 'pencil', label: 'Utkast', descr: 'Opprettet og redigeres som utkast' },
        pending_review_observer: { badge: 'info', icon: 'clock-o', label: 'Info', descr: 'Avventer info fra observatør' },
        pending_review_hi: { badge: 'info', icon: 'clock-o', label: 'HI', descr: 'Avventer HI' },
        pending_review_fs: { badge: 'info', icon: 'clock-o', label: 'Fagsjef', descr: 'Avventer Fagsjef' },
        pending_review_su: { badge: 'info', icon: 'clock-o', label: 'SU', descr: 'Avventer SU' },
        pending_review_su_aff: { badge: 'info', icon: 'clock-o', label: 'SU', descr: 'Avventer SU AFF' },
        pending_review_su_tandem: { badge: 'info', icon: 'clock-o', label: 'SU', descr: 'Avventer SU Tandem' },
        pending_review_su_msj: { badge: 'info', icon: 'clock-o', label: 'SU', descr: 'Avventer SU MSJ' },
        pending_review_su_skjerm: { badge: 'info', icon: 'clock-o', label: 'SU', descr: 'Avventer SU Skjermkjøring' },
        closed: { badge: 'success', icon: 'check', label: 'Lukket' }
      },
      typesArr: ['sharing', 'unwanted_act', 'unsafe_act', 'unsafe_condition', 'near_miss', 'incident', 'accident'],
      types: {
        sharing: { label: 'Erfaringsdeling', badge: 'success', title: 'Del en observasjon av noe bra eller dårlig' },
        unwanted_act: { label: 'Uønsket', badge: 'info', title: 'Alle de tingene som oppstår som er uønsket eller uheldige' },
        unsafe_act: { label: 'Utrygg adferd', badge: 'secondary', title: 'Utrygge eller farlige forhold' },
        unsafe_condition: { label: 'Utrygge forhold', badge: 'secondary', title: 'Utrygg eller farlig adferd' },
        near_miss: { label: 'Næruhell', badge: 'warning', title: 'Næruhell som definert i HB men ikke begrenset av' },
        incident: { label: 'Uhell', badge: 'danger', title: 'Personskade - oppsøker legehjelp' },
        accident: { label: 'Ulykke', badge: 'dark', title: 'Død eller varige men' },
      },
      ask: {
        attitude: { label: 'Holdninger' },
        skills: { label: 'Ferdigheter' },
        knowledge: { label: 'Kunnskaper' },
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
      ]
    } // END observation
  }, // End fallskjerm
  motorfly: {
    name: 'Motorfly',
    letter: 'g',
    key: 'motorfly',
    id: 238,
    org_id: 203025,
    observation: {
      app_name: 'OBSREG',
      e5x: {
        enabled: true,
        rit_version: '4.1.0.3'
      },
      create: { local: true, dev: true, beta: false, prod: true },
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
      flagsArr: ['aviation', 'school', 'flight_service'],
      flags: {
        aviation: { label: 'Er tilfellet rapporteringspliktig til luftfartsmyndigheten?', badge: 'danger', icon: 'plane' },
        school: { label: 'Skoling', badge: 'info', icon: 'plane' },
        flight_service: { label: 'Flytjenesteoppdrag', badge: 'warning', icon: 'plane' }
      },
      stateArr: ['withdrawn', 'draft', 'pending_review_ors','pending_review_ftl', 'pending_review_dto', 'pending_review_skole', 'pending_review_teknisk', 'pending_review_operativ', 'closed'],
      stateRoles: {
        draft: 'Observatør',
        pending_review_ors: 'OBSREG koordinator',
        pending_review_ftl: 'FTL',
        pending_review_dto: 'DTO Ansvarlig',
        pending_review_skole: 'Skolesjef',
        pending_review_teknisk: 'Teknisk Leder',
        pending_review_operativ: 'Operativ Leder'
      },
      state: {
        unknown: { badge: 'danger', icon: 'exclamation', label: 'Ukjent', descr: 'Ukjent tilstand på observasjonen' },
        withdrawn: { badge: 'dark', icon: 'ban', label: 'Trukket', descr: 'Observasjonen er trukket tilbake' },
        draft: { badge: 'secondary', icon: 'pencil', label: 'Utkast', descr: 'Opprettet og redigeres som utkast' },
        pending_review_observer: { badge: 'info', icon: 'clock-o', label: 'Info', descr: 'Avventer info fra observatør' },
        pending_review_ftl: { badge: 'info', icon: 'clock-o', label: 'Info', descr: 'Avventer TL' },
        pending_review_teknisk: { badge: 'info', icon: 'clock-o', label: 'Teknisk', descr: 'Avventer Teknisk Leder' },
        pending_review_operativ: { badge: 'info', icon: 'clock-o', label: 'Operativ', descr: 'Avventer Operativ Leder' },
        pending_review_dto: { badge: 'info', icon: 'clock-o', label: 'DTO', descr: 'Avventer DTO representant' },
        pending_review_skole: { badge: 'info', icon: 'clock-o', label: 'Skolesjef', descr: 'Avventer Skolesjef' },
        pending_review_ors: { badge: 'info', icon: 'clock-o', label: 'OBSREG', descr: 'Avventer OBSREG Koordinator' },
        closed: { badge: 'success', icon: 'check', label: 'Lukket', descr: 'Ferdig behandlet og lukket' }
      },
      typesArr: ['sharing', 'unwanted_act', 'near_miss', 'incident', 'accident'],
      types: {
        sharing: { label: 'Erfaringsdeling', badge: 'success', title: 'Del en observasjon av noe bra eller dårlig' },
        unwanted_act: { label: 'Uønsket tilfelle', badge: 'info', title: 'Alle de tingene som oppstår som er uønsket eller uheldige' },
        // unsafe_act: { label: 'Utrygg', badge: 'secondary', title: 'Utrygg eller farlig adferd' },
        near_miss: { label: 'Hendelse', badge: 'warning', title: 'En annen hendelse enn en ulykke i tilknytning til driften av et luftfartøy som påvirker eller kan påvirke driftssikkerheten (Incident)' },
        incident: { label: 'Alvorlig hendelse', badge: 'danger', title: 'En hendelse der omstendighetene tilsier at det var høy sannsynlighet for en ulykke og som er knyttet til driften av et luftfartøy (Serious Incident)' },
        accident: { label: 'Ulykke', badge: 'dark', title: 'En alvorlig hendelse med et særlig alvorlig utfall i form av personskader eller store materielle skader, se nærmere definisjon ved å trykke på spørsmålstegnet' },
      },
      ask: {
        attitude: { label: 'Holdninger' },
        skills: { label: 'Ferdigheter' },
        knowledge: { label: 'Kunnskaper' },
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
      ]
    }
  },
  mikrofly: {
    name: 'Sportsfly',
    letter: 'u',
    key: 'sportsfly',
    id: 327,
    org_id: 203030,
    observation: {
      app_name: 'OBSREG',
      e5x: {
        enabled: true,
        rit_version: '4.1.0.3'
      },
      create: { local: true, dev: true, beta: false, prod: true },
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
      flagsArr: ['aviation', 'school', 'flight_service'],
      flags: {
        aviation: { label: 'Er tilfellet rapporteringspliktig til luftfartsmyndigheten?', badge: 'danger', icon: 'plane' },
        school: { label: 'Skoling', badge: 'info', icon: 'plane' },
        flight_service: { label: 'Flytjenesteoppdrag', badge: 'warning', icon: 'plane' }
      },
      stateArr: ['withdrawn', 'draft', 'pending_review_ors','pending_review_ftl', 'pending_review_dto', 'pending_review_skole', 'pending_review_teknisk', 'pending_review_operativ', 'closed'],
      stateRoles: {
        draft: 'Observatør',
        pending_review_ors: 'OBSREG koordinator',
        pending_review_ftl: 'FTL',
        pending_review_dto: 'DTO Ansvarlig',
        pending_review_skole: 'Skolesjef',
        pending_review_teknisk: 'Teknisk Leder',
        pending_review_operativ: 'Operativ Leder'
      },
      state: {
        unknown: { badge: 'danger', icon: 'exclamation', label: 'Ukjent', descr: 'Ukjent tilstand på observasjonen' },
        withdrawn: { badge: 'dark', icon: 'ban', label: 'Trukket', descr: 'Observasjonen er trukket tilbake' },
        draft: { badge: 'secondary', icon: 'pencil', label: 'Utkast', descr: 'Opprettet og redigeres som utkast' },
        pending_review_observer: { badge: 'info', icon: 'clock-o', label: 'Info', descr: 'Avventer info fra observatør' },
        pending_review_ftl: { badge: 'info', icon: 'clock-o', label: 'Info', descr: 'Avventer TL' },
        pending_review_teknisk: { badge: 'info', icon: 'clock-o', label: 'Teknisk', descr: 'Avventer Teknisk Leder' },
        pending_review_operativ: { badge: 'info', icon: 'clock-o', label: 'Operativ', descr: 'Avventer Operativ Leder' },
        pending_review_dto: { badge: 'info', icon: 'clock-o', label: 'DTO', descr: 'Avventer DTO representant' },
        pending_review_skole: { badge: 'info', icon: 'clock-o', label: 'Skolesjef', descr: 'Avventer Skolesjef' },
        pending_review_ors: { badge: 'info', icon: 'clock-o', label: 'OBSREG', descr: 'Avventer OBSREG Koordinator' },
        closed: { badge: 'success', icon: 'check', label: 'Lukket', descr: 'Ferdig behandlet og lukket' }
      },
      typesArr: ['sharing', 'unwanted_act', 'near_miss', 'incident', 'accident'],
      types: {
        sharing: { label: 'Erfaringsdeling', badge: 'success', title: 'Del en observasjon av noe bra eller dårlig' },
        unwanted_act: { label: 'Uønsket tilfelle', badge: 'info', title: 'Alle de tingene som oppstår som er uønsket eller uheldige' },
        // unsafe_act: { label: 'Utrygg', badge: 'secondary', title: 'Utrygg eller farlig adferd' },
        near_miss: { label: 'Hendelse', badge: 'warning', title: 'En annen hendelse enn en ulykke i tilknytning til driften av et luftfartøy som påvirker eller kan påvirke driftssikkerheten (Incident)' },
        incident: { label: 'Alvorlig hendelse', badge: 'danger', title: 'En hendelse der omstendighetene tilsier at det var høy sannsynlighet for en ulykke og som er knyttet til driften av et luftfartøy (Serious Incident)' },
        accident: { label: 'Ulykke', badge: 'dark', title: 'En alvorlig hendelse med et særlig alvorlig utfall i form av personskader eller store materielle skader, se nærmere definisjon ved å trykke på spørsmålstegnet' },
      },
      ask: {
        attitude: { label: 'Holdninger' },
        skills: { label: 'Ferdigheter' },
        knowledge: { label: 'Kunnskaper' },
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
      ]
    }
  },
  ballong: {
    name: 'Ballong',
    letter: 'b',
    id: 235,
    org_id: 203026,
    key: 'ballong',
  },
  seilfly: {
    name: 'Seilfly',
    letter: 's',
    key: 'seilfly',
    id: 111,
    org_id: 90968
  },
  hps: {
    name: 'Hang-, paragliding og speedriding',
    letter: 'h',
    key: 'hps',
    id: 110,
    org_id: 90969,
  },
  modellfly: {
    name: 'Modellfly',
    letter: 'm',
    key: 'modellfly',
    id: 110,
    org_id: 203027
  }
};

@NgModule({
  providers: [{
    provide: NLF_CONFIG,
    useValue: NLF_DI_CONFIG
  }]
})
export class NlfConfigModule { }
