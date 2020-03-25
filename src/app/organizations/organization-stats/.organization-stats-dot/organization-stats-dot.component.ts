import { Component, OnInit, Input } from '@angular/core';
import * as d3select from 'd3-selection';
import * as d3interpolate from 'd3-interpolate';
import * as d3time from 'd3-time';
import * as d3scale from 'd3-scale';
import * as d3array from 'd3-array';
import * as d3axis from 'd3-axis';

@Component({
  selector: 'nlf-organization-stats-dot',
  templateUrl: './organization-stats-dot.component.html',
  styleUrls: ['./organization-stats-dot.component.css']
})
export class NlfOrganizationsStatsDotComponent implements OnInit {

  @Input() config = {};

  defaults = {
    // target element or selector to contain the svg
    target: '#chart',

    // width of chart
    width: 500,

    // height of chart
    height: 80,

    // margin
    margin: { top: 0, right: 40, bottom: 40, left: 40 },

    // axis enabled
    axis: true,

    // axis padding
    axisPadding: 5,

    // axis tick size
    tickSize: 10,

    // nice round values for axis
    nice: false,

    // easing function for transitions
    ease: 'linear',

    // dot size range, becomes height range for 'bar' type
    size: [2, 10],

    // type of chart: 'dot' or 'bar'
    type: 'dot',

    // bar padding for 'bar' type
    barPadding: 1,

    // color range
    color: ['rgb(230, 237, 244)', 'rgb(243, 43, 101)'],

    // color interpolation
    colorInterpolate: d3interpolate.interpolateHcl,

    // mouseover callback for tooltips or value display
    mouseover: _ => { },

    // mouseout callback for tooltips or value display
    mouseout: _ => { }
  };

  /**
   * Zero margin.
   */

  zeroMargin = { top: 0, right: 0, bottom: 0, left: 0 };
  margin = {};
  x;
  z;
  h;

  constructor() {
    /**
     * Construct with the given `config`.
     */
    this.config = Object.assign(this.config, this.defaults);
    console.log("Config", this.config);
    this.config.margin = this.zeroMargin;
  }
  /**
   * Dimensions without margin.
   */

  dimensions() {
    const w = this.config.width - this.config.margin.left - this.config.margin.right;
    const h = this.config.height - this.config.margin.top - this.config.margin.bottom;
    return [w, h];
  }

  /**
   * Handle mouseover.
   */

  onMouseOver() {
    const [w, h] = this.dimensions();
    const width = w / this.data.length;
    const m = d3select.mouse(this.chart.node());
    const x = this.x.invert(m[0]);
    const i = this.xBisect(this.data, x, 1);
    const data = this.data[i - 1];
    this.mouseover(data);
  }

  /**
   * Handle mouseleave.
   */

  onMouseLeave() {
    this.mouseout();
  }

  /**
   * Initialize the chart.
   */

  ngOnInit() {
    // const { target, width, height, margin, axisPadding, tickSize } = this
    // const { color, colorInterpolate, size, axis } = this
    const [w, h] = this.dimensions()

    this.chart = d3select.select(this.config.target)
      .attr('width', this.config.width)
      .attr('height', this.config.height)
      .append('g')
      .attr('transform', `translate(${this.config.margin.left}, ${this.config.margin.top})`)
      .on('mouseover', _ => this.onMouseOver())
      .on('mouseleave', _ => this.onMouseLeave())

    this.x = d3time.time.scale()
      .range([0, w])

    this.z = d3scale.scale.linear()
      .range(this.config.size)

    this.color = d3scale.scale.linear()
      .range(this.config.color)
      .interpolate(this.config.colorInterpolate)

    // this.xAxis = d3.svg.axis()
    // .orient('bottom')
    this.xAxis = d3axis.axisBottom()
      .scale(this.x)
      .ticks(5)
      .tickPadding(8)
      .tickSize(this.config.tickSize);

    if (axis) {
      this.chart.append('g')
        .attr('class', 'x axis')
        .attr('transform', `translate(0, ${h + this.config.axisPadding})`)
        .call(this.xAxis);
    }

    this.xBisect = d3array.bisector(d => d.bin).left;
  }

  /**
   * Render axis.
   */

  renderAxis(data, options) {


    const xd = x.domain(d3array.extent(data, d => d.bin))

    if (nice) {
      xd.nice()
    }

    const c = options.animate
      ? this.chart.transition().ease(ease)
      : this.chart

    c.select('.x.axis').call(this.xAxis)
  }

  /**
   * Render dots.
   */

  renderDots(data) {
    //const { chart, x, z, ease, size, color, type, barPadding } = this
    const [w, h] = this.dimensions()

    const width = w / data.length

    // domains
    const zMax = d3array.max(data, d => d.value)
    this.z.domain([0, zMax])
    this.config.color.domain([0, zMax])

    // dots
    const dot = chart.selectAll('.dot')
      .data(data)

    if (type == 'bar') {
      const barWidth = (w / data.length) - this.config.barPadding
      if (barWidth < 0.5) throw new Error('DotChart is too small for the amount of data points provided')

      // enter
      dot.enter().append('rect')
        .attr('class', 'dot')
        .style('fill', d => this.config.color(d.value))

      // update
      dot.transition().ease(ease)
        .attr('x', d => this.x(d.bin) + width / 2)
        .attr('y', d => this.h / 2 - this.z(d.value) / 2)
        .attr('height', d => z(d.value))
        .attr('width', barWidth)
        .style('fill', d => color(d.value))
    } else {
      // enter
      dot.enter().append('circle')
        .attr('class', 'dot')
        .style('fill', d => color(d.value))

      // update
      dot.transition().ease(ease)
        .attr('cx', d => x(d.bin) + width / 2)
        .attr('cy', h / 2)
        .attr('r', d => z(d.value))
        .style('fill', d => color(d.value))
    }

    // exit
    dot.exit().remove()

    // overlay
    const overlay = chart.selectAll('.overlay')
      .data(data)

    // enter
    overlay.enter().append('rect')
      .attr('class', 'overlay')

    // update
    overlay.attr('x', d => x(d.bin))
      .attr('width', width)
      .attr('height', h)
      .style('fill', 'transparent')

    // exit
    overlay.exit().remove()
  }

  /**
   * Render the chart against the given `data` which has the shape:
   *
   *  [{ bin: Date, value: int }]
   *
   */

  render(data, options = {}) {
    this.data = data
    this.renderAxis(data, options)
    this.renderDots(data, options)
  }

  /**
   * Update the chart against the given `data`.
   */

  update(data) {
    this.render(data, {
      animate: true
    })
  }
}
