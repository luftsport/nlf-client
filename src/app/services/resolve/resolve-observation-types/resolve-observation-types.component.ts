import { Component, Input, OnInit, Inject } from '@angular/core';
import { NLF_CONFIG, NlfConfig } from 'app/nlf-config.module';

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

  constructor(@Inject(NLF_CONFIG) private config: NlfConfig) { }

  ngOnInit() {
    try {
      this.name = this.config.observation.types[this.type]['label'];
      this.color = this.config.observation.types[this.type]['badge'];
    } catch (e) {
      this.name = 'Ukjent';
      this.color = 'secondary';
    }
  }

}
