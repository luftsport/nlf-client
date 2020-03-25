import { Component, OnInit, Input, Inject, ViewEncapsulation } from '@angular/core';
import {  NlfConfigService } from 'app/nlf-config.service';

import { typicalAGGInterface, LungoPersonsService } from 'app/api/lungo-persons.service';
import { ApiOptionsInterface, NlfConfigItem } from 'app/api/api.interface';

// SANKEY
// https://bl.ocks.org/wvengen/cab9b01816490edb7083

// TEST
import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';

@Component({
  selector: 'nlf-organization-stats-age-distribution',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './organization-stats-age-distribution.component.html',
  styleUrls: ['./organization-stats-age-distribution.component.css']
})
export class NlfOrganizationStatsAgeDistributionComponent implements OnInit {

  // org_id: number;
  @Input() org_id: number;

  activity_ids: number[] = [];
  org_ids: number[] = [];

  dataReady: boolean = false;

  stats = [];
  //view: any[] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Alder';
  showYAxisLabel = true;
  yAxisLabel = 'Antall';

  multi = [];
  public config: NlfConfigItem;


  // D3 TEST
  private margin = { top: 20, right: 20, bottom: 30, left: 50 };
  private width: number;
  private height: number;
  private x: any;
  private y: any;
  private svg: any;
  private line: d3Shape.Line<[number, number]>;

  constructor(
    private userService: LungoPersonsService,
    private configService: NlfConfigService

  ) {

    // D3 TEST
    this.width = 900 - this.margin.left - this.margin.right;
    this.height = 500 - this.margin.top - this.margin.bottom;

  }

  // D3 TEST
  /**
  private initSvg() {
    this.svg = d3.select('svg')
      .append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
  }

  private initAxis() {
    this.x = d3Scale.scaleTime().range([0, this.width]);
    this.y = d3Scale.scaleLinear().range([this.height, 0]);
    this.x.domain(d3Array.extent(STOCKS, (d) => d.date));
    this.y.domain(d3Array.extent(STOCKS, (d) => d.value));
  }

  private drawAxis() {

    this.svg.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3Axis.axisBottom(this.x));

    this.svg.append('g')
      .attr('class', 'axis axis--y')
      .call(d3Axis.axisLeft(this.y))
      .append('text')
      .attr('class', 'axis-title')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '.71em')
      .style('text-anchor', 'end')
      .text('Price ($)');
  }

  private drawLine() {
    this.line = d3Shape.line()
      .x((d: any) => this.x(d.date))
      .y((d: any) => this.y(d.value));

    this.svg.append('path')
      .datum(STOCKS)
      .attr('class', 'line')
      .attr('d', this.line);
  }
  **/
  ngOnInit() {
    //this.initSvg();
    //this.initAxis();
    //this.drawAxis();
    //this.drawLine();
    this.configService.observableConfig.subscribe(
      data => {
        this.config = data;

        if (this.config.activity_orgs.hasOwnProperty(this.org_id)) {
          this.activity_ids = [this.config.activity_orgs[this.org_id]];
        } else if (this.org_id == this.config.nlf_org_id) {
          this.activity_ids = Object.keys(this.config.activity_orgs).map(key => this.config.activity_orgs[key]);
        } else {
          this.org_ids = [this.org_id];
        }

        this.getStats();
      }
    );


  }

  private getStats() {

    const options: ApiOptionsInterface = {
      query: {
        aggregate: {
          $org_ids: this.org_ids,
          $activity_ids: this.activity_ids
          //$where: {
          //  $or: [{ "memberships.club": { $in: [this.org_id] } }, { "memberships.discipline": { $in: [this.org_id] } }]
          // }
        }
      }
    }

    this.userService.getAgeDistributionAGG(options).subscribe(
      data => {
        try {
          this.stats = data['_items'].reverse().map((item, index) => (
            {
              name: item['_id'] + ' år',
              value: item['total']
            }
          )
          );
          this.multi = [{
            "name": "Aldersfordeling",
            "series": this.stats
          }]

          this.dataReady = true;
        } catch (e) {
          console.log(e);
        }
        //const totalYears = data['_items'].reduce((acc, pilot) => acc + pilot.years, 0);
        console.log(this.stats);
      },
      err => console.log(err),
      () => console.log('Done stats!!!')
    )
  }

  onSelect(event) {
    console.log('ON Select', event);
  }

}
