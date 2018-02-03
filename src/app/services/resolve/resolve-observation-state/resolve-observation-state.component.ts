import { Component, Input, OnInit, Inject } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { NLF_CONFIG, NlfConfig } from '../../../nlf-config.module';

@Component({
  selector: 'nlf-resolve-observation-state',
  templateUrl: './resolve-observation-state.component.html',
  styleUrls: ['./resolve-observation-state.component.css']
})
export class NlfResolveObservationStateComponent implements OnInit {

  @Input() state: string;
  @Input() icon: boolean;

  constructor(@Inject(NLF_CONFIG) public config: NlfConfig) { }

  ngOnInit() {

    if (!this.state || !this.config.observation.state[this.state]) {
      this.state = 'unknown';
    }

  }

}
