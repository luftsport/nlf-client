import { ApiObservationComponentAttributesInterface } from './../../../api/api.interface';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'nlf-resolve-observation-component-attributes',
  templateUrl: './resolve-observation-component-attributes.component.html',
  styleUrls: ['./resolve-observation-component-attributes.component.css']
})
export class NlfResolveObservationComponentAttributesComponent implements OnInit {

  @Input() attributes: ApiObservationComponentAttributesInterface;
  @Input() badge?: boolean;

  
  map = {
    reserve_ride: { color: 'info', label: 'Reserve benyttet' },
    aad_fire: { color: 'danger', label: 'Nødåpner fyring' },
    aad_rescue: { color: 'danger', label: 'Nødåpner redning' },
    packing_error: { color: 'secondary', label: 'Pakkefeil' },
    gear_malfunction: { color: 'secondary', label: 'Feilfunksjon' },
    damage: { color: 'secondary', label: 'Matriell skade' },
    gear_failure: { color: 'secondary', label: 'Utstyrsvikt' },
    rigger_error: { color: 'warning', label: 'MK/MR Feil' },
    violation: { color: 'warning', label: 'Regelbrudd' },
    injury: { color: 'danger', label: 'Personskade' },
    death: { color: 'dark', label: 'Død' }
  };

  constructor() { }

  ngOnInit() {

    for (let key in this.attributes) {

    }

  }

}
