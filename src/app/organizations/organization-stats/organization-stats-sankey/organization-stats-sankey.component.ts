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
    this.draw("#chart", this.data, this.config);
    //rs.RadarChart.

    let svg = d3select.select('body')
      .selectAll('svg')
      .append('svg')
      .attr("width", this.width)
      .attr("height", this.height);

    this.sankey();
  }

  private draw(id, d, options) {
    let cfg = {
      radius: 5,
      w: 700,
      h: 500,
      factor: 1,
      factorLegend: .85,
      levels: 3,
      maxValue: 0,
      radians: 2 * Math.PI,
      opacityArea: 0.5,
      ToRight: 5,
      TranslateX: 80,
      TranslateY: 30,
      ExtraWidthX: 100,
      ExtraWidthY: 100,
      color: d3scale.scaleOrdinal().range(["#6F257F", "#CA0D59"])
    };

    if ('undefined' !== typeof options) {
      for (let i in options) {
        if ('undefined' !== typeof options[i]) {
          cfg[i] = options[i];
        }
      }
    }

    cfg.maxValue = 100;

    let allAxis = (d[0].map(function(i, j) { return i.area }));
    let total = allAxis.length;
    let radius = cfg.factor * Math.min(cfg.w / 2, cfg.h / 2);
    let Format = d3format.format('%');
    d3select.select(id).select("svg").remove();

    let g = d3select.select(id)
      .append("svg")
      .attr("width", cfg.w + cfg.ExtraWidthX)
      .attr("height", cfg.h + cfg.ExtraWidthY)
      .append("g")
      .attr("transform", "translate(" + cfg.TranslateX + "," + cfg.TranslateY + ")");

    let tooltip;

    //Circular segments
    for (let j = 0; j < cfg.levels; j++) {
      let levelFactor = cfg.factor * radius * ((j + 1) / cfg.levels);
      g.selectAll(".levels")
        .data(allAxis)
        .enter()
        .append("svg:line")
        .attr("x1", function(d, i) { return levelFactor * (1 - cfg.factor * Math.sin(i * cfg.radians / total)); })
        .attr("y1", function(d, i) { return levelFactor * (1 - cfg.factor * Math.cos(i * cfg.radians / total)); })
        .attr("x2", function(d, i) { return levelFactor * (1 - cfg.factor * Math.sin((i + 1) * cfg.radians / total)); })
        .attr("y2", function(d, i) { return levelFactor * (1 - cfg.factor * Math.cos((i + 1) * cfg.radians / total)); })
        .attr("class", "line")
        .style("stroke", "grey")
        .style("stroke-opacity", "0.75")
        .style("stroke-width", "0.3px")
        .attr("transform", "translate(" + (cfg.w / 2 - levelFactor) + ", " + (cfg.h / 2 - levelFactor) + ")");
    }

    //Text indicating at what % each level is
    for (let j = 0; j < cfg.levels; j++) {
      let levelFactor = cfg.factor * radius * ((j + 1) / cfg.levels);
      g.selectAll(".levels")
        .data([1]) //dummy data
        .enter()
        .append("svg:text")
        .attr("x", function(d) { return levelFactor * (1 - cfg.factor * Math.sin(0)); })
        .attr("y", function(d) { return levelFactor * (1 - cfg.factor * Math.cos(0)); })
        .attr("class", "legend")
        .style("font-family", "sans-serif")
        .style("font-size", "10px")
        .attr("transform", "translate(" + (cfg.w / 2 - levelFactor + cfg.ToRight) + ", " + (cfg.h / 2 - levelFactor) + ")")
        .attr("fill", "#737373")
        .text((j + 1) * 100 / cfg.levels);
    }

    let series = 0;

    let axis = g.selectAll(".axis")
      .data(allAxis)
      .enter()
      .append("g")
      .attr("class", "axis");

    axis.append("line")
      .attr("x1", cfg.w / 2)
      .attr("y1", cfg.h / 2)
      .attr("x2", function(d, i) { return cfg.w / 2 * (1 - cfg.factor * Math.sin(i * cfg.radians / total)); })
      .attr("y2", function(d, i) { return cfg.h / 2 * (1 - cfg.factor * Math.cos(i * cfg.radians / total)); })
      .attr("class", "line")
      .style("stroke", "grey")
      .style("stroke-width", "1px");

    axis.append("text")
      .attr("class", "legend")
      .text(function(d) { return d })
      .style("font-family", "sans-serif")
      .style("font-size", "11px")
      .attr("text-anchor", "middle")
      .attr("dy", "1.5em")
      .attr("transform", function(d, i) { return "translate(0, -10)" })
      .attr("x", function(d, i) { return cfg.w / 2 * (1 - cfg.factorLegend * Math.sin(i * cfg.radians / total)) - 60 * Math.sin(i * cfg.radians / total); })
      .attr("y", function(d, i) { return cfg.h / 2 * (1 - Math.cos(i * cfg.radians / total)) - 20 * Math.cos(i * cfg.radians / total); });

    let dataValues = [];
    let z = "";
    d.forEach(function(y, x) {
      dataValues = [];
      g.selectAll(".nodes")
        .data(y, function(j, i) {
          console.log("Assigninng  j, i, cfg, total", j, i, cfg, total);
          dataValues.push([
            (cfg.w / 2 * (1 - (Math.max(j.value, 0) / cfg.maxValue) * cfg.factor * Math.sin(i * cfg.radians / total))),
            (cfg.h / 2 * (1 - (Math.max(j.value, 0) / cfg.maxValue) * cfg.factor * Math.cos(i * cfg.radians / total)))
          ]);
        });
      dataValues.push(dataValues[0]);
      g.selectAll(".area")
        .data([dataValues])
        .enter()
        .append("polygon")
        .attr("class", "radar-chart-serie" + series)
        .style("stroke-width", "2px")
        .style("stroke", cfg.color(series))
        .attr("points", function(d) {
          let str = "";
          for (let pti = 0; pti < d.length; pti++) {
            str = str + d[pti][0] + "," + d[pti][1] + " ";
          }
          return str;
        })
        .style("fill", function(j, i) { return cfg.color(series) })
        .style("fill-opacity", cfg.opacityArea)
        .on('mouseover', function(d) {
          z = "polygon." + d3select.select(this).attr("class");
          g.selectAll("polygon")
            .transition(200)
            .style("fill-opacity", 0.1);
          g.selectAll(z)
            .transition(200)
            .style("fill-opacity", .7);
        })
        .on('mouseout', function() {
          g.selectAll("polygon")
            .transition(200)
            .style("fill-opacity", cfg.opacityArea);
        });
      series++;
    });
    series = 0;

    /**
    * This is the points
    d.forEach(function(y, x) {
      g.selectAll(".nodes")
        .data(y).enter()
        .append("svg:circle")
        .attr("class", "radar-chart-serie" + series)
        .attr('r', cfg.radius)
        .attr("alt", function(j) { return Math.max(j.value, 0) })
        .attr("cx", function(j, i) {
          dataValues.push([
            cfg.w / 2 * (1 - (parseFloat(Math.max(j.value, 0)) / cfg.maxValue) * cfg.factor * Math.sin(i * cfg.radians / total)),
            cfg.h / 2 * (1 - (parseFloat(Math.max(j.value, 0)) / cfg.maxValue) * cfg.factor * Math.cos(i * cfg.radians / total))
          ]);
          return cfg.w / 2 * (1 - (Math.max(j.value, 0) / cfg.maxValue) * cfg.factor * Math.sin(i * cfg.radians / total));
        })
        .attr("cy", function(j, i) {
          return cfg.h / 2 * (1 - (Math.max(j.value, 0) / cfg.maxValue) * cfg.factor * Math.cos(i * cfg.radians / total));
        })
        .attr("data-id", function(j) { return j.area })
        .style("fill", "#fff")
        .style("stroke-width", "2px")
        .style("stroke", cfg.color(series)).style("fill-opacity", .9)
        .on('mouseover', function(d) {
          const newX = parseFloat(d3select.select(this).attr('cx')) - 10;
          const newY = parseFloat(d3select.select(this).attr('cy')) - 5;

          tooltip
            .attr('x', newX)
            .attr('y', newY)
            .text(Format(d.value))
            .transition(200)
            .style('opacity', 1);

          z = "polygon." + d3select.select(this).attr("class");
          g.selectAll("polygon")
            .transition(200)
            .style("fill-opacity", 0.1);
          g.selectAll(z)
            .transition(200)
            .style("fill-opacity", .7);
        })
        .on('mouseout', function() {
          tooltip
            .transition(200)
            .style('opacity', 0);
          g.selectAll("polygon")
            .transition(200)
            .style("fill-opacity", cfg.opacityArea);
        })
        .append("svg:title")
        .text(function(j) { return Math.max(j.value, 0) });

      series++;
    });

    * //Points
    **/

    //Tooltip
    tooltip = g.append('text')
      .style('opacity', 0)
      .style('font-family', 'sans-serif')
      .style('font-size', '13px');
  }

  private getData() {
    return JSON.parse('{ "nodes": [{ "name": "Agricultural waste" }, { "name": "Bio-conversion" }, { "name": "Liquid" }, { "name": "Losses" }, { "name": "Solid" }, { "name": "Gas" }, { "name": "Biofuel imports" }, { "name": "Biomass imports" }, { "name": "Coal imports" }, { "name": "Coal" }, { "name": "Coal reserves" }, { "name": "District heating" }, { "name": "Industry" }, { "name": "Heating and cooling - commercial" }, { "name": "Heating and cooling - homes" }, {"name":"Electricitygrid" }, { "name": "Over generation / exports" }, { "name": "H2 conversion" }, { "name": "Road transport" }, { "name": "Agriculture" }, { "name": "Rail transport" }, { "name": "Lighting & appliances - commercial" }, { "name": "Lighting & appliances - homes" }, { "name": "Gas imports" }, { "name": "Ngas" }, { "name": "Gas reserves" }, { "name": "Thermal generation" }, { "name": "Geothermal" }, { "name": "H2" }, { "name": "Hydro" }, { "name": "International shipping" },    { "name": "Domestic aviation" }, { "name": "International aviation" }, { "name": "National navigation" }, { "name": "Marine algae" }, { "name": "Nuclear" }, { "name": "Oil imports" }, { "name": "Oil" }, { "name": "Oil reserves" }, { "name": "Other waste" }, { "name": "Pumped heat" }, { "name": "Solar PV" }, { "name": "Solar Thermal" }, { "name": "Solar" }, { "name": "Tidal" }, { "name": "UK land based bioenergy" }, { "name": "Wave" }, { "name": "Wind" }], "links": [{ "source": 0, "target":1, "value": 124.729 }, { "source": 1, "target": 2, "value": 0.597 }, { "source": 1, "target": 3, "value": 26.862 }, { "source": 1, "target": 4, "value": 280.322 }, { "source": 1, "target": 5, "value": 81.144 }, { "source": 6, "target": 2, "value": 35 }, { "source": 7, "target": 4, "value": 35 }, { "source": 8, "target": 9, "value": 11.606 }, { "source": 10, "target": 9, "value": 63.965 }, { "source": 9, "target": 4, "value": 75.571 }, { "source": 11, "target": 12, "value": 10.639 }, {"source": 11, "target": 13, "value": 22.505 }, { "source": 11, "target": 14, "value": 46.184 }, { "source": 15, "target": 16, "value": 104.453 }, { "source": 15, "target": 14, "value": 113.726 }, { "source": 15, "target": 17, "value": 27.14 }, { "source": 15, "target": 12, "value": 342.165 }, { "source": 15, "target": 18, "value": 37.797 }, { "source": 15, "target": 19, "value": 4.412 }, { "source": 15, "target": 13, "value": 40.858 }, { "source": 15, "target": 3, "value": 56.691 }, {"source": 15, "target": 20, "value": 7.863 }, { "source": 15, "target": 21, "value": 90.008 }, { "source": 15, "target": 22, "value": 93.494 }, { "source": 23, "target": 24, "value": 40.719 }, { "source": 25, "target": 24, "value": 82.233 }, { "source": 5, "target": 13, "value": 0.129 }, { "source": 5, "target": 3, "value": 1.401 }, { "source": 5, "target": 26, "value": 151.891 }, { "source": 5, "target": 19, "value": 2.096 }, { "source": 5, "target": 12, "value": 48.58 }, { "source": 27, "target": 15, "value": 7.013 }, { "source": 17, "target": 28, "value": 20.897 }, { "source": 17, "target": 3, "value": 6.242 }, { "source": 28, "target": 18, "value": 20.897 }, { "source": 29, "target": 15, "value": 6.995 }, { "source": 2, "target": 12, "value": 121.066 }, { "source": 2, "target": 30, "value": 128.69 }, { "source": 2, "target": 18, "value": 135.835 }, { "source": 2, "target": 31, "value": 14.458 }, { "source": 2, "target": 32, "value": 206.267 }, { "source": 2, "target":19, "value": 3.64 }, { "source": 2, "target": 33, "value": 33.218 }, { "source": 2, "target": 20, "value": 4.413 }, { "source": 34, "target": 1, "value": 4.375 }, { "source": 24, "target": 5, "value": 122.952 }, { "source": 35, "target": 26, "value": 839.978 }, { "source": 36, "target": 37, "value": 504.287 }, { "source": 38, "target": 37, "value": 107.703 }, { "source": 37, "target": 2, "value": 611.99 }, { "source": 39, "target": 4, "value": 56.587 }, { "source": 39, "target": 1, "value": 77.81 }, { "source": 40, "target": 14, "value": 193.026 }, { "source": 40, "target": 13, "value": 70.672 }, { "source": 41, "target": 15, "value": 59.901 }, { "source": 42, "target": 14, "value": 19.263 }, { "source": 43, "target": 42, "value": 19.263 }, { "source": 43, "target": 41, "value": 59.901 }, { "source": 4, "target": 19, "value": 0.882 }, { "source": 4, "target": 26, "value": 400.12 }, { "source": 4, "target": 12, "value": 46.477 }, { "source": 26, "target": 15, "value": 525.531}, { "source": 26, "target": 3, "value": 787.129 }, { "source": 26, "target": 11, "value": 79.329 }, { "source": 44, "target": 15, "value": 9.452 }, { "source": 45, "target": 1, "value": 182.01 }, { "source": 46, "target": 15, "value": 19.013 }, { "source": 47, "target": 15, "value": 289.366 }] }');

  }

  private sankey() {
    let margin = { top: 1, right: 1, bottom: 6, left: 1 },
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

    let formatNumber = d3format.format(",.0f"),
      format = (d) => { return formatNumber(d) + " TWh"; },
      color = d3scale.scaleOrdinal().range(["#6F257F", "#CA0D59"]);

    let svg = d3select.select("#svg") //.append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    let sankey = d3sankey.sankey()
      .nodeWidth(15)
      .nodePadding(10)
      .size([width, height]);

    let path = sankey.links();

    let energy = this.getData();
    sankey(energy);
    //sankey.nodes(energy.nodes).links(energy.links);
      //.layout(32);

    let link = svg.append("g").selectAll(".link")
      .data(energy.links)
      .enter().append("path")
      .attr("class", "link")
      .attr("d", path)
      .attr("id", (d, i) => {
        d.id = i;
        return "link-" + i;
      })
      .style("stroke-width", (d) => { return Math.max(1, d.dy); })
      .sort((a, b) => { return b.dy - a.dy; });

    link.append("title")
      .text((d) => { return d.source.name + " → " + d.target.name + "\n" + format(d.value); });

    let node = svg.append("g").selectAll(".node")
      .data(energy.nodes)
      .enter().append("g")
      .attr("class", "node")
      .attr("transform", (d) => { return "translate(" + d.x + "," + d.y + ")"; })
      .on("click", this.highlight_node_links);
/**
      .call(d3drag.behavior.drag()
        .origin((d) => { return d; })
        // interfering with click .on("dragstart", function() { this.parentNode.appendChild(this); })
        .on("drag", (d, sankey, link, path) => this.dragmove));
        **/

    node.append("rect")
      .attr("height", (d) => { return d.dy; })
      .attr("width", sankey.nodeWidth())
      .style("fill", (d) => { return d.color = color(d.name.replace(/ .*/, "")); })
      .style("stroke", (d) => { return d3color.rgb(d.color).darker(2); })
      .append("title")
      .text(function(d) { return d.name + "\n" + format(d.value); });

    node.append("text")
      .attr("x", -6)
      .attr("y", function(d) { return d.dy / 2; })
      .attr("dy", ".35em")
      .attr("text-anchor", "end")
      .attr("transform", null)
      .text(function(d) { return d.name; })
      .filter(function(d) { return d.x < width / 2; })
      .attr("x", 6 + sankey.nodeWidth())
      .attr("text-anchor", "start");


  }

  dragmove(d, sankey, link, path) {
    d3select.select(this).attr("transform", "translate(" + d.x + "," + (d.y = Math.max(0, Math.min(this.height - d.dy, d3select.event.y))) + ")");
    sankey.relayout();
    link.attr("d", path);
  }
  highlight_node_links(node, i) {
    var remainingNodes = [],
      nextNodes = [];
    var stroke_opacity = 0;
    if (d3select.select(this).attr("data-clicked") == "1") {
      d3select.select(this).attr("data-clicked", "0");
      stroke_opacity = 0.2;
    } else {
      d3select.select(this).attr("data-clicked", "1");
      stroke_opacity = 0.5;
    }
    var traverse = [{
      linkType: "sourceLinks",
      nodeType: "target"
    }, {
      linkType: "targetLinks",
      nodeType: "source"
    }];
    traverse.forEach(function(step) {
      node[step.linkType].forEach(function(link) {
        remainingNodes.push(link[step.nodeType]);
        this.highlight_link(link.id, stroke_opacity);
      });
      while (remainingNodes.length) {
        nextNodes = [];
        remainingNodes.forEach(function(node) {
          node[step.linkType].forEach(function(link) {
            nextNodes.push(link[step.nodeType]);
            this.highlight_link(link.id, stroke_opacity);
          });
        });
        remainingNodes = nextNodes;
      }
    });
  }
  highlight_link(id, opacity) {
    d3select.select("#link-" + id).style("stroke-opacity", opacity);
  }


  private sankey2() {

    const energy = this.getData();
    let svg = d3select.select("#svg"),
      width = +svg.attr("width"),
      height = +svg.attr("height");

    let formatNumber = d3format.format(",.0f"),
      format = function(d) { return formatNumber(d) + " TWh"; },
      color = d3scale.scaleOrdinal().range(["#6F257F", "#CA0D59"]);

    let sankey = d3sankey.sankey()
      .nodeWidth(15)
      .nodePadding(10)
      .extent([[1, 1], [width - 1, height - 6]]);

    let path = sankey.links();

    /**
    var link = svg.append("g")
      .selectAll(".link")
      .data(energy.links)
      .enter().append("path")
      .attr("d", path)
      .attr("id", function(d, i) {
        d.id = i;
        return "link-" + i;
      })
      .attr("class", "links")
      .attr("fill", "none")
      .attr("stroke", "#000")
      .attr("stroke-opacity", 0.2)

      .style("stroke-width", function(d) { return Math.max(1, d.dy); })
      .sort(function(a, b) { return b.dy - a.dy; })
      .selectAll("path");
**/



    let link = svg.append("g")
      .attr("class", "links")
      .attr("fill", "none")
      .attr("stroke", "#000")
      .attr("stroke-opacity", 0.2)
      .selectAll("path");
    link.append("title")
      .text(function(d) { return d.source.name + " → " + d.target.name + "\n" + format(d.value); });
    let node = svg.append("g")
      .attr("class", "nodes")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .selectAll("g");


    let graph = sankey(energy);

    link = link
      .data(energy.links)
      .enter().append("path")
      .attr("d", d3sankey.sankeyLinkHorizontal())
      .attr("id", function(d, i) {
        d.id = i;
        return "link-" + i;
      })
      .attr("stroke-width", function(d) { return Math.max(1, d.width); });

    link.append("title")
      .text(function(d) { return d.source.name + " → " + d.target.name + "\n" + format(d.value); });

    node = node
      .data(energy.nodes)
      .enter().append("g")
      .attr("class", "node")
      .attr("id", function(d, i) {
        d.id = i;
        return "node-" + i;
      })
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
      .on("click", (d, i, n) => this.highlight_node_links2(d, i, n));
    /**
          .call(d3drag.drag()
            .subject(function(d) { return d })
            .on('start', function() { this.parentNode.appendChild(this); })
            .on('drag', dragmove));
            **/

    node.append("rect")
      .attr("x", function(d) { return d.x0; })
      .attr("y", function(d) { return d.y0; })
      .attr("height", function(d) { return d.y1 - d.y0; })
      .attr("width", function(d) { return d.x1 - d.x0; })
      .attr("fill", function(d) { return color(d.name.replace(/ .*/, "")); })
      .attr("stroke", "#000");

    node.append("text")
      .attr("x", function(d) { return d.x0 - 6; })
      .attr("y", function(d) { return (d.y1 + d.y0) / 2; })
      .attr("dy", "0.35em")
      .attr("text-anchor", "end")
      .text(function(d) { return d.name; })
      .filter(function(d) { return d.x0 < width / 2; })
      .attr("x", function(d) { return d.x1 + 6; })
      .attr("text-anchor", "start");

    node.append("title")
      .text(function(d) { return d.name + "\n" + format(d.value); });


  }

  // the function for moving the nodes
  dragmove2(d) {

  }

  private highlight_node_links2(d, i, node) {
    console.log("NODE: ", d, "I: ", i, "NODE ID: ", node[i]);
    let remainingNodes = [],
      nextNodes = [];

    let stroke_opacity = 0;
    if (d3select.select("#" + node[i].id).attr("data-clicked") == "1") {
      d3select.select("#" + node[i].id).attr("data-clicked", "0");
      stroke_opacity = 0.2;
    } else {
      d3select.select("#" + node[i].id).attr("data-clicked", "1");
      stroke_opacity = 0.5;
    }

    let traverse = [{
      linkType: "sourceLinks",
      nodeType: "target"
    }, {
      linkType: "targetLinks",
      nodeType: "source"
    }];

    traverse.forEach(function(step) {
      d[step.linkType].forEach(function(link) {
        remainingNodes.push(link[step.nodeType]);
        //this.highlight_link(link.id, stroke_opacity);
        d3select.select("#link-" + link.id).style("stroke-opacity", stroke_opacity);
      });

      while (remainingNodes.length) {
        nextNodes = [];
        remainingNodes.forEach(function(node) {
          d[step.linkType].forEach(function(link) {
            nextNodes.push(link[step.nodeType]);
            //this.highlight_link(link.id, stroke_opacity);
            d3select.select("#link-" + link.id).style("stroke-opacity", stroke_opacity);
          });
        });

        remainingNodes = nextNodes;
      }
    });
  }

  private highlight_link2(id, opacity) {
    d3select.select("#link-" + id).style("stroke-opacity", opacity);
  }
}
