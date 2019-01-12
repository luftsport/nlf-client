import { Component, OnInit, Input } from '@angular/core';
import { ApiCacheService } from 'app/api/api-cache.service';
import { LungoFunctionsService } from 'app/api/lungo-functions.service';
import { ApiOptionsInterface } from 'app/api/api.interface';
import { LungoFunctionsItem } from 'app/api/lungo.interface';

@Component({
  selector: 'nlf-resolve-lungo-function',
  templateUrl: './resolve-lungo-function.component.html',
  styleUrls: ['./resolve-lungo-function.component.css']
})
export class NlfResolveLungoFunctionComponent implements OnInit {


  @Input() function_id: string;
  @Input() show_org = true;
  @Input() link: boolean;
  @Input() long: boolean;

  function: LungoFunctionsItem;
  dataReady = false;

  constructor(private functionService: LungoFunctionsService,
              private apiCache: ApiCacheService) { }

  ngOnInit() {

    const options: ApiOptionsInterface = {
      query: { projection: { type_name: 1, id: 1, type_id: 1, active_in_org_id: 1} }
    };

    this.apiCache.get(['get-lungo-function', this.function_id, options.query],
                      this.functionService.getFunction(this.function_id, options)).subscribe(
      data => {
        this.function = data;

        /* @TODO: see if long should be used? BFSK, Bergen, Bergen Fallskjermklubb
        if (this.long = true) {
          this.licenseName = data.name;
        }
        else {
          this.licenseName = data.name.replace(' Fallskjermklubb', '');
        }
        */
      },
      err => this.function = { type_name: 'Ukjent funksjon', id: 0, _id: '', type_id: 0, active_in_org_id: 0 },
      () => this.dataReady = true
    );
  }

}
