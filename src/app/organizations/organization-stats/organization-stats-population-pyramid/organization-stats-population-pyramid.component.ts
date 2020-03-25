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

  private pyramidBuilder(data, target, options) {

    const barHeight = 4;

    let w = typeof options.width === 'undefined' ? 400 : options.width,
      h = typeof options.height === 'undefined' ? 400 : options.height,
      w_full = w,
      h_full = h;

    let margin = {
      top: 20,
      right: 10,
      bottom: 20,
      left: 10,
      middle: 20
    },
      sectorWidth = (w / 2) - margin.middle,
      leftBegin = sectorWidth - margin.left,
      rightBegin = w - margin.right - sectorWidth;

    //let w = (w - (margin.left + margin.right));
    //let h = (h - (margin.top + margin.bottom));
    w = (w - (margin.left + margin.right));
    h = (h - (margin.top + margin.bottom));

    if (typeof options.style === 'undefined') {
      options.style = {
        leftBarColor: '#6c9dc6',
        rightBarColor: '#de5454',
        tooltipBG: '#fefefe',
        tooltipColor: 'black'
      };
    } else {
      options.style = {
        leftBarColor: typeof options.style.leftBarColor === 'undefined' ? '#6c9dc6' : options.style.leftBarColor,
        rightBarColor: typeof options.style.rightBarColor === 'undefined' ? '#de5454' : options.style.rightBarColor,
        tooltipBG: typeof options.style.tooltipBG === 'undefined' ? '#fefefe' : options.style.tooltipBG,
        tooltipColor: typeof options.style.tooltipColor === 'undefined' ? 'black' : options.style.tooltipColor
      };
    }

    let totalPopulation = d3array.sum(data, function(d) {
      return d.male + d.female;
    }),
      percentage = function(d) {
        return d / totalPopulation;
      };

    let styleSection = d3select.select(target).append('style')
      .text('svg {max-width:100%} \
      .axis line,axis path {shape-rendering: crispEdges;fill: transparent;stroke: #555;} \
      .axis text {font-size: 11px;} \
      .bar {fill-opacity: 0.5;} \
      .bar.left {fill: ' + options.style.leftBarColor + ';} \
      .bar.left:hover {fill: ' + this.colorTransform(options.style.leftBarColor, '333333') + ';} \
      .bar.right {fill: ' + options.style.rightBarColor + ';} \
      .bar.right:hover {fill: ' + this.colorTransform(options.style.rightBarColor, '333333') + ';} \
      .tooltip {position: absolute;line-height: 1.1em;padding: 7px; margin: 3px;background: ' + options.style.tooltipBG + '; color: ' + options.style.tooltipColor + '; pointer-events: none;border-radius: 6px;}')

    let region = d3select.select(target).append('svg')
      .attr('width', w_full)
      .attr('height', h_full);


    let legend = region.append('g')
      .attr('class', 'legend');

    // TODO: fix these margin calculations -- consider margin.middle == 0 -- what calculations for padding would be necessary?
    legend.append('rect')
      .attr('class', 'bar left')
      .attr('x', (w / 2) - (margin.middle * 2))
      .attr('y', 12)
      .attr('width', 12)
      .attr('height', 12);

    legend.append('text')
      .attr('fill', '#000')
      .attr('x', (w / 2) - (margin.middle * 2))
      .attr('y', 18)
      .attr('dy', '0.32em')
      .text('Males');

    legend.append('rect')
      .attr('class', 'bar right')
      .attr('x', (w / 2) + (margin.middle * 2))
      .attr('y', 12)
      .attr('width', 12)
      .attr('height', 12);

    legend.append('text')
      .attr('fill', '#000')
      .attr('x', (w / 2) + (margin.middle * 3))
      .attr('y', 18)
      .attr('dy', '0.32em')
      .text('Females');

    let tooltipDiv = d3select.select("body").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    let pyramid = region.append('g')
      .attr('class', 'inner-region')
      .attr('transform', this.translation(margin.left, margin.top));

    // find the maximum data value for whole dataset
    // and rounds up to nearest 5%
    //  since this will be shared by both of the x-axes
    let maxValue = Math.ceil(Math.max(
      d3array.max(data, function(d) {
        return percentage(d.male);
      }),
      d3array.max(data, function(d) {
        return percentage(d.female);
      })
    ) / 0.05) * 0.05;

    // SET UP SCALES

    // the xScale goes from 0 to the width of a region
    //  it will be reversed for the left x-axis
    let xScale = d3scale.scaleLinear()
      .domain([0, maxValue])
      .range([0, (sectorWidth - margin.middle)])
      .nice();

    let xScaleLeft = d3scale.scaleLinear()
      .domain([0, maxValue])
      .range([sectorWidth, 0]);

    let xScaleRight = d3scale.scaleLinear()
      .domain([0, maxValue])
      .range([0, sectorWidth]);

    let yScale = d3scale.scaleBand()
      .domain(data.map(function(d) {
        return d.age;
      }))
      .range([h, 0], 0.1);


    // SET UP AXES
    let yAxisLeft = d3axis.axisRight()
      .scale(yScale)
      .tickSize(4, 0)
      .tickPadding(margin.middle - 4);

    let yAxisRight = d3axis.axisLeft()
      .scale(yScale)
      .tickSize(4, 0)
      .tickFormat('');

    let xAxisRight = d3axis.axisBottom()
      .scale(xScale)
      .tickFormat(d3format.format('.0%'));

    let xAxisLeft = d3axis.axisBottom()
      // REVERSE THE X-AXIS SCALE ON THE LEFT SIDE BY REVERSING THE RANGE
      .scale(xScale.copy().range([leftBegin, 0]))
      .tickFormat(d3format.format('.0%'));

    // MAKE GROUPS FOR EACH SIDE OF CHART
    // scale(-1,1) is used to reverse the left side so the bars grow left instead of right
    let leftBarGroup = pyramid.append('g')
      .attr('transform', this.translation(leftBegin, 0) + 'scale(-1,1)');
    let rightBarGroup = pyramid.append('g')
      .attr('transform', this.translation(rightBegin, 0));

    // DRAW AXES
    pyramid.append('g')
      .attr('class', 'axis y left')
      .attr('transform', this.translation(leftBegin, 0))
      .call(yAxisLeft)
      .selectAll('text')
      .style('text-anchor', 'middle');

    pyramid.append('g')
      .attr('class', 'axis y right')
      .attr('transform', this.translation(rightBegin, 0))
      .call(yAxisRight);

    pyramid.append('g')
      .attr('class', 'axis x left')
      .attr('transform', this.translation(0, h))
      .call(xAxisLeft);

    pyramid.append('g')
      .attr('class', 'axis x right')
      .attr('transform', this.translation(rightBegin, h))
      .call(xAxisRight);

    // DRAW BARS
    leftBarGroup.selectAll('.bar.left')
      .data(data)
      .enter().append('rect')
      .attr('class', 'bar left')
      .attr('x', 0)
      .attr('y', function(d) {
        return yScale(d.age) - margin.middle * 0.8; // * 4; // / 4;
      })
      .attr('width', function(d) {
        return xScale(percentage(d.male));
      })
      .attr('height', ((yScale.range()[0] / data.length) - margin.middle / 2) * barHeight) // 2
      .on("mouseover", function(d) {
        tooltipDiv.transition()
          .duration(200)
          .style("opacity", 0.9);
        tooltipDiv.html("<strong>Males Age " + d.age + "</strong>" +
          "<br />  Population: " + this.prettyFormat(d.male) +
          "<br />" + (Math.round(percentage(d.male) * 1000) / 10) + "% of Total")
          .style("left", (d3select.event.pageX) + "px")
          .style("top", (d3select.event.pageY - 28) + "px");
      })
      .on("mouseout", function(d) {
        tooltipDiv.transition()
          .duration(500)
          .style("opacity", 0);
      });

    rightBarGroup.selectAll('.bar.right')
      .data(data)
      .enter().append('rect')
      .attr('class', 'bar right')
      .attr('x', 0)
      .attr('y', function(d) {
        return yScale(d.age) - margin.middle * 0.8; // * 4; //4
      })
      .attr('width', function(d) {
        return xScale(percentage(d.female));
      })
      .attr('height', ((yScale.range()[0] / data.length) - margin.middle / 2) * barHeight)
      .on("mouseover", function(d) {
        tooltipDiv.transition()
          .duration(200)
          .style("opacity", 0.9);
        tooltipDiv.html("<strong> Females Age " + d.age + "</strong>" +
          "<br />  Population: " + this.prettyFormat(d.female) +
          "<br />" + (Math.round(percentage(d.female) * 1000) / 10) + "% of Total")
          .style("left", (d3select.event.pageX) + "px")
          .style("top", (d3select.event.pageY - 28) + "px");
      })
      .on("mouseout", function(d) {
        tooltipDiv.transition()
          .duration(500)
          .style("opacity", 0);
      });
  }


}
