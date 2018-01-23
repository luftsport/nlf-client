import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'nlf-resolve-observation-types',
  templateUrl: './resolve-observation-types.component.html',
  styleUrls: ['./resolve-observation-types.component.css']
})
export class NlfResolveObservationTypesComponent implements OnInit {

  @Input() type: string;
  @Input() badge: boolean;

  name: string;
  color: string;

  list = {
    'sharing': { label: 'Erfaringsdeling', color: 'primary' },
    'unsafe_act': { label: 'Uønsket hending', color: 'secondary' },
    'near_miss': { label: 'Næruhell', color: 'warning' },
    'incident': { label: 'Uhell', color: 'danger' },
    'accident': { label: 'Ulykke', color: 'dark' }
  };

  constructor() { }

  ngOnInit() {
    try {
      this.name = this.list[this.type]['label'];
      this.color = this.list[this.type]['color'];
    } catch (e) {
      this.name = 'Ukjent';
      this.color = 'secondary';
    }
  }

}
