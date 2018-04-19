import { Component, Renderer2, ElementRef, forwardRef, OnInit, Input, Inject, ViewChild } from '@angular/core';
import { WidgetHandleDirective, WidgetComponent, DashboardComponent } from 'ngx-dashboard';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NlfConfig, NLF_CONFIG } from './../../nlf-config.module';
import { ApiObservationsAggService } from './../../api/api-observations-agg.service';
import { ApiOptionsInterface } from '../../api/api.interface';


const forwardReference = forwardRef(() => WidgetOrsPieComponent);

@Component({
  selector: 'nlf-widget-ors-pie',
  templateUrl: './widget-ors-pie.component.html',
  styleUrls: ['./widget-ors-pie.component.css'],
  providers: [{ provide: WidgetComponent, useExisting: forwardRef(() => WidgetOrsPieComponent) }]
})
export class WidgetOrsPieComponent extends WidgetComponent {

  @Input() public widgetId: string;
  @Input() public size: number[] = [2, 3];
  @Input() public dashboard: DashboardComponent;
  @ViewChild(WidgetHandleDirective) protected _handle: WidgetHandleDirective;

  colorScheme = { // BS light '#f9f9f9',
    domain: ['#5cb85c', '#5bc0de', '#428bca', '#d9534f', '#0c0c0c']
  };
  dataReady = false;
  view: any[] = [700, 300];
  label = 'totalt behandlede observasjoner';
  pie = [];
  activeEntries = [];

  constructor(public ngEl: ElementRef,
    public renderer: Renderer2,
    private agg: ApiObservationsAggService,
    @Inject(NLF_CONFIG) private config: NlfConfig) {
    super(ngEl, renderer);

    const d1 = new Date('2014-01-01');
    const d2 = new Date('2019-01-01');
    let options: ApiOptionsInterface = {
      query: {
        aggregate: {
          '$club': '375-F',
          '$from': d1.toISOString(),
          '$to': d2.toISOString(),
          '$state': 'closed'
        }
      }
    };

    this.agg.getPie(options).subscribe(
      data => {

        data._items.forEach(el => {

          this.pie.push({ 'name': this.config.observation.types[el._id]['label'], 'value': el.count });

        });
        this.activeEntries = [this.pie[0]];
        this.dataReady = true;
        console.log(data);

      },
      err => console.log(err),
      () => console.log('Done')
    );
  }


  onSelect(event) {
    console.log(event);
  }

  close(event: any) { // , id: string
    this.dashboard.removeItemById(this.widgetId);
    event.preventDefault();
    event.stopPropagation();
  }
}
