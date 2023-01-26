import { Component, OnInit, Input, Inject } from '@angular/core';
import {  NlfConfigService } from 'app/nlf-config.service';
import * as d3select from 'd3-selection';
import * as d3scale from 'd3-scale';
import * as d3format from 'd3-format';
import * as d3array from 'd3-array';
import * as d3axis from 'd3-axis';
import { typicalAGGInterface, LungoPersonsService } from 'app/api/lungo-persons.service';
import { ApiOptionsInterface, NlfConfigItem } from 'app/api/api.interface';


@Component({
  selector: 'nlf-organization-stats-population-pyramid',
  templateUrl: './organization-stats-population-pyramid.component.html',
  styleUrls: ['./organization-stats-population-pyramid.component.css']
})
export class NlfOrganizationStatsPopulationPyramidComponent implements OnInit {

  @Input() org_id;

  activity_ids: number[] = [];
  org_ids: number[] = [];
  stats = [];
  bins = [0, 16, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100];
  plot_id: string = 'pyramid';

  public config: NlfConfigItem;


  constructor(
    private lungoPersonService: LungoPersonsService,
    private configService: NlfConfigService
  ) { }

  ngOnInit() {

    this.configService.observableConfig.subscribe(
      data => {
        this.config = data;
        this.plot_id = String.fromCharCode(65 + Math.floor(Math.random() * 26)) + Date.now();
        for (let i = 0; i < this.bins.length; i++) {
          this.stats.push({ age: this.bins[i], male: 0, female: 0 });
        }

        if (this.config.activity_orgs.hasOwnProperty(this.org_id)) {
          this.activity_ids = [this.config.activity_orgs[this.org_id]];
        } else if (this.org_id == this.config.nlf_org_id) {
          this.activity_ids = Object.keys(this.config.activity_orgs).map(key => this.config.activity_orgs[key]);
        } else {
          this.org_ids = [this.org_id];
        }

        this.getStats();
        //this.pyramidBuilder(this.exampleData, '#pyramid', { height: 600, width: 800 });
        //const datdata = this.genData(0, 100);
        //this.pyramidBuilder(datdata, '#pyramid', { height: 1200, width: 800, style: undefined });
      }
    );

  }

  private getStats() {

    const options: ApiOptionsInterface = {
      query: {
        aggregate: {
          $bins: this.bins,
          $org_ids: this.org_ids,
          $activity_ids: this.activity_ids
        }
      }
    }

    this.lungoPersonService.getAgeDistributionPyramid(options).subscribe(
      data => {
        try {

          /*
          "_items": [{
          "_id": 0,
          "total": 172,
          "male": 121,
          "female": 51,
          "other": 0
          */

          this.stats = [...this.stats, ...data['_items'].map((item, index) => (
            {
              age: item['_id'],
              male: item['male'],
              female: item['female'],
            }
          )
          )];

          this.pyramidBuilder(this.stats, '#' + this.plot_id, { height: 600, width: 400, style: undefined });
          //this.dataReady = true;
        } catch (e) {
          console.log(e);
        }
        //const totalYears = data['_items'].reduce((acc, pilot) => acc + pilot.years, 0);
        console.log('Pyramid stats', this.stats);
      },
      err => console.log(err),
      () => { }
    )
  }

  /* HELPER FUNCTIONS */

  // string concat for translate
  private translation(x, y) {
    return 'translate(' + x + ',' + y + ')';
  }

  // numbers with commas
  public prettyFormat(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  // lighten colors
  private colorTransform(c1, c2) {
    c1 = c1.replace('#', '');
    c2 = c2.replace('#', '');
    let origHex = {
      r: c1.substring(0, 2),
      g: c1.substring(2, 4),
      b: c1.substring(4, 6)
    },
      transVec = {
        r: c2.substring(0, 2),
        g: c2.substring(2, 4),
        b: c2.substring(4, 6)
      },
      newHex = { r: undefined, g: undefined, b: undefined };

    newHex.r = this.transform(origHex.r, transVec.r);
    newHex.g = this.transform(origHex.g, transVec.g);
    newHex.b = this.transform(origHex.b, transVec.b);
    return '#' + newHex.r + newHex.g + newHex.b;
  }

  private transform(d, e) {
    let f = parseInt(d, 16) + parseInt(e, 16);
    if (f > 255) {
      f = 255;
    }
    return f.toString(16);
  }

  private genData(start, end) {

    let data = [];
    for (let i = start; i < (end + 1); i++) {
      data.push({ age: i, male: Math.floor(Math.random() * 10000), female: Math.floor(Math.random() * 10000) });
    }

    return data;
  }

  private pyramidBuilder(data, target, options) {}


}
