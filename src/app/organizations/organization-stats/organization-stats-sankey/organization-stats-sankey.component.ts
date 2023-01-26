import { Component, OnInit } from '@angular/core';

import * as d3select from 'd3-selection';
import * as d3scale from 'd3-scale';
import * as d3shape from 'd3-shape';
import * as d3array from 'd3-array';
//import * as d3area from 'd3-area';
import * as d3format from 'd3-format';
import * as d3color from 'd3-color';
import * as d3fetch from 'd3-fetch';
//import * as d3event from 'd3-event';
import * as d3drag from 'd3-drag';
// import * as d3 from 'd3-';
// import * as d3interpolate from 'd3-interpolate';
import * as d3sankey from 'd3-sankey';


@Component({
  selector: 'nlf-organization-stats-sankey',
  templateUrl: './organization-stats-sankey.component.html',
  styleUrls: ['./organization-stats-sankey.component.css']
})
export class NlfOrganizationStatsSankeyComponent implements OnInit {


  width = 500;
  height = 500;

  config = {
    w: this.width,
    h: this.height,
    maxValue: 100,
    levels: 5,
    ExtraWidthX: 300
  }

  //Legend titles
  LegendOptions = ['Smartphone', 'Tablet'];

  //Data
  data = [
    [
      { "area": "Reservetrekk ", "value": 80 },
      { "area": "Personskade", "value": 40 },
      { "area": "Overlegg", "value": 40 },
      { "area": "Materiell", "value": 90 },
      { "area": "Elev", "value": 60 },
      { "area": "Tandem", "value": 80 }
    ],
    [
      { "area": "Reservetrekk ", "value": 44 },
      { "area": "Personskade", "value": 22 },
      { "area": "Overlegg", "value": 66 },
      { "area": "Materiell", "value": 10 },
      { "area": "Elev", "value": 66 },
      { "area": "Tandem", "value": 30 }
    ]
  ];
  /**
    [
      [
        { area: "Email", value: 0.59 },
        { area: "Social Networks", value: 0.56 },
        { area: "Internet Banking", value: 0.42 },
        { area: "News Sportsites", value: 0.34 },
        { area: "Search Engine", value: 0.48 },
        { area: "View Shopping sites", value: 0.14 },
        { area: "Paying Online", value: 0.11 },
        { area: "Buy Online", value: 0.05 },
        { area: "Stream Music", value: 0.07 },
        { area: "Online Gaming", value: 0.12 },
        { area: "Navigation", value: 0.27 },
        { area: "App connected to TV program", value: 0.03 },
        { area: "Offline Gaming", value: 0.12 },
        { area: "Photo Video", value: 0.4 },
        { area: "Reading", value: 0.03 },
        { area: "Listen Music", value: 0.22 },
        { area: "Watch TV", value: 0.03 },
        { area: "TV Movies Streaming", value: 0.03 },
        { area: "Listen Radio", value: 0.07 },
        { area: "Sending Money", value: 0.18 },
        { area: "Other", value: 0.07 },
        { area: "Use less Once week", value: 0.08 }
      ]
    ];
  **/
  /**
      , [
        { area: "Email", value: 0.48 },
        { area: "Social Networks", value: 0.41 },
        { area: "Internet Banking", value: 0.27 },
        { area: "News Sportsites", value: 0.28 },
        { area: "Search Engine", value: 0.46 },
        { area: "View Shopping sites", value: 0.29 },
        { area: "Paying Online", value: 0.11 },
        { area: "Buy Online", value: 0.14 },
        { area: "Stream Music", value: 0.05 },
        { area: "Online Gaming", value: 0.19 },
        { area: "Navigation", value: 0.14 },
        { area: "App connected to TV program", value: 0.06 },
        { area: "Offline Gaming", value: 0.24 },
        { area: "Photo Video", value: 0.17 },
        { area: "Reading", value: 0.15 },
        { area: "Listen Music", value: 0.12 },
        { area: "Watch TV", value: 0.1 },
        { area: "TV Movies Streaming", value: 0.14 },
        { area: "Listen Radio", value: 0.06 },
        { area: "Sending Money", value: 0.16 },
        { area: "Other", value: 0.07 },
        { area: "Use less Once week", value: 0.17 }
      ]
    ];
    **/
  constructor() { }

  ngOnInit() {
    /**
    this.draw("#chart", this.data, this.config);

    let svg = d3select.select('body')
      .selectAll('svg')
      .append('svg')
      .attr("width", this.width)
      .attr("height", this.height);

    this.sankey();
     */
  }


  private draw(id, d, options) {}

  private getData() {}

  private sankey() {}

  dragmove(d, sankey, link, path) {}
  highlight_node_links(node, i) {}
  highlight_link(id, opacity) {}


  private sankey2() {}

  // the function for moving the nodes
  dragmove2(d) {

  }

  private highlight_node_links2(d, i, node) {}

  private highlight_link2(id, opacity) {
  }
}
