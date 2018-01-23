import { Component, OnInit, TemplateRef } from '@angular/core';
import { NlfComponent } from '../../nlf.component';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'nlf-ui-dummy',
  templateUrl: './dummy.component.html',
  styleUrls: ['./dummy.component.css']
})
export class NlfUiDummyComponent implements OnInit {

  modalRef: BsModalRef; // Modal

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
    {'name': 'Uhell',
    'value': 15},
    {'name': 'Ulykke',
     'value': 3},
  ];

  multi = [
    {
      'name': 'Germany',
      'label': 'test1',
      'series': [
        {'label': 'test3',
          'name': '2010',
          'value': 7300000
        },
        {'label': 'test3',
          'name': '2011',
          'value': 8940000
        }
      ]
    },

    {
      'name': 'USA',
      'label': 'test2',
      'series': [
        {'label': 'test3',
          'name': '2010',
          'value': 7870000
        },
        {'label': 'test3',
          'name': '2011',
          'value': 8270000
        }
      ]
    },

    {
      'name': 'France',
      'series': [
        {'label': 'test3',
          'name': '2010',
          'value': 5000002
        },
        {'label': 'test3',
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
  label = 'observasjoner i 2017';

  activeEntries = [this.single[0]];

  colorScheme = { // BS light '#f9f9f9',
    domain: ['#5cb85c',  '#5bc0de', '#428bca', '#d9534f', '#0c0c0c']
  };


  constructor(private app: NlfComponent,
    private modalService: BsModalService) {

    app.setTitle('Dummy home component');

  }

  ngOnInit() {
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
    this.modalRef = this.modalService.show(template);
  }

}
