import { Component, OnInit, Input } from '@angular/core';
import { ApiCacheService } from 'app/api/api-cache.service';
import { LungoFunctionsService } from 'app/api/lungo-functions.service';
import { ApiOptionsInterface } from 'app/api/api.interface';
import { LungoFunctionsTypesItem } from 'app/api/lungo.interface';

@Component({
  selector: 'nlf-resolve-lungo-function-type',
  templateUrl: './resolve-lungo-function-type.component.html',
  styleUrls: ['./resolve-lungo-function-type.component.css']
})
export class ResolveLungoFunctionTypeComponent implements OnInit {


  @Input() type_id: string;
  @Input() link: boolean;
  @Input() long: boolean;

  function_type: LungoFunctionsTypesItem;
  dataReady = false;

  constructor(private functionService: LungoFunctionsService,
              private apiCache: ApiCacheService) { }

  ngOnInit() {

    const options: ApiOptionsInterface = {
      query: { projection: { name: 1, category_name: 1, id: 1 } }
    };

    this.apiCache.get(['get-lungo-function-type', this.type_id, options.query],
      this.functionService.getFunctionType(this.type_id, options)).subscribe(
        data => {
          this.function_type = data;

        },
        err => this.function_type = { name: 'Ukjent funksjonstype', category_name: 'Ukjent kategori', id: 0, _id: '' },
        () => this.dataReady = true
      );
  }

}

