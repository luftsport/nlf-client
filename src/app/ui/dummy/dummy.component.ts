import { Component, OnInit, TemplateRef, Inject } from '@angular/core';
import { NlfComponent } from 'app/nlf.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ApiObservationsAggService } from 'app/api/api-observations-agg.service';
import { ApiOptionsInterface } from 'app/api/api.interface';
import { NlfConfig, NLF_CONFIG } from 'app/nlf-config.module';

//import { Moment } from 'moment';
@Component({
  selector: 'nlf-ui-dummy',
  templateUrl: './dummy.component.html',
  styleUrls: ['./dummy.component.css']
})
export class NlfUiDummyComponent implements OnInit {
  dataReady = false;
  pie = [];

  // ngx-charts
  single = [
    {
      'name': 'Deling',
      'value': 6
    },
    {
      'name': 'Uønsket',
      'value': 83
    },
    {
      'name': 'Næruhell',
      'value': 133
    },
    {
      'name': 'Uhell',
      'value': 15
    },
    {
      'name': 'Ulykke',
      'value': 3
    },
  ];

  multi = [
    {
      'name': 'Germany',
      'label': 'test1',
      'series': [
        {
          'label': 'test3',
          'name': '2010',
          'value': 7300000
        },
        {
          'label': 'test3',
          'name': '2011',
          'value': 8940000
        }
      ]
    },

    {
      'name': 'USA',
      'label': 'test2',
      'series': [
        {
          'label': 'test3',
          'name': '2010',
          'value': 7870000
        },
        {
          'label': 'test3',
          'name': '2011',
          'value': 8270000
        }
      ]
    },

    {
      'name': 'France',
      'series': [
        {
          'label': 'test3',
          'name': '2010',
          'value': 5000002
        },
        {
          'label': 'test3',
          'name': '2011',
          'value': 5800000
        }
      ]
    }
  ];

  multipie = [
    {
      "name": "Tønsberg",
      "value": 78
    },
    {
      "name": "Oslo",
      "value": 34
    },
    {
      "name": "Voss",
      "value": 99
    }
  ];

  view: any[] = [700, 300];
  label = 'totalt behandlede observasjoner';

  activeEntries = [this.single[0]];

  colorScheme = { // BS light '#f9f9f9',
    domain: ['#5cb85c', '#5bc0de', '#428bca', '#d9534f', '#0c0c0c']
  };

  modalRef;

  constructor(private app: NlfComponent,
    private modalService: NgbModal,
    private agg: ApiObservationsAggService,
    @Inject(NLF_CONFIG) private config: NlfConfig) {

    app.setTitle('Dummy home component');

  }

  ngOnInit() {
    
    let d1 = new Date('2014-01-01');
    let d2 = new Date('2019-01-01');
    let options: ApiOptionsInterface = {
      query: {
        aggregate: { '$club': '375-F',
                     '$from': d1.toISOString(),
                     '$to': d2.toISOString(),
                     '$state': 'closed'}
      }
    };

    this.agg.getPie(options).subscribe(
      data => {

        data._items.forEach(el => {

          this.pie.push({'name': this.config.observation.types[el._id]['label'], 'value': el.count});

        });
        this.dataReady = true;
        console.log(data);

      },
      err => console.log(err),
      () => console.log('Done')
    );
  }

  /**
   * Ngx-chart
   */
  onSelect(event) {
    console.log(event);
  }

  /**
   * Modal
   */
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.open(template, {size: 'lg'});
  }

}
