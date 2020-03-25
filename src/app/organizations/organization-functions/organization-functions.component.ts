import { Component, OnInit, Input } from '@angular/core';
import { LungoFunctionsService } from 'app/api/lungo-functions.service';
import { ApiOptionsInterface } from 'app/api/api.interface';
import { LungoFunctionsItem } from 'app/api/lungo.interface';
import { Columns, Config, DefaultConfig, STYLE } from 'ngx-easy-table';

@Component({
  selector: 'nlf-organization-functions',
  templateUrl: './organization-functions.component.html',
  styleUrls: ['./organization-functions.component.css'],
})
export class NlfOrganizationFunctionsComponent implements OnInit {

  @Input() org_id: number;
  
  functions: LungoFunctionsItem[];
  dataReady = false;
  tableConf: Config;
  public columns: Columns[] = [
    { key: 'type_id', title: 'Funksjon' },
    { key: 'person_id', title: 'Person' }
  ];


  constructor(
    private functionService: LungoFunctionsService
  ) { }

  ngOnInit() {

    this.tableConf = DefaultConfig;
    this.tableConf.tableLayout.style = STYLE.TINY;
    this.tableConf.headerEnabled = false;

    this.functions = [];
    const options: ApiOptionsInterface = {
      query: {
        where: {
          active_in_org_id: this.org_id,
          type_id: { $nin: [202427, 10000000] },
          is_passive: false,
          is_deleted: false,
          type_is_license: false
        },
        sort: [{ type_id: -1 }],
        max_results: 1000
      },
    }

    this.functionService.getFunctions(options).subscribe(
      data => {
        this.functions = data._items;
        this.dataReady = true;

      },
      err => {
        console.log(err);
      }
    )
  }

}
