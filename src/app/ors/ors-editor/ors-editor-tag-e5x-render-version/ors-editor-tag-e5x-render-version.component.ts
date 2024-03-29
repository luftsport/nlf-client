import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { ApiObservationsService } from 'app/api/api-observations.service';
import { ApiOptionsInterface, ApiObservationsItem } from 'app/api/api.interface';
import { get as _get } from 'lodash';

@Component({
  selector: 'nlf-ors-editor-tag-e5x-render-version',
  templateUrl: './ors-editor-tag-e5x-render-version.component.html',
  styleUrls: ['./ors-editor-tag-e5x-render-version.component.css']
})
export class NlfOrsEditorTagE5xRenderVersionComponent implements OnInit {

  @Input() _id: string;
  @Input() version: number;
  @Input() path: string; // path in observation
  @Input() key: string = 'value';
  @Input() e5xPath: string; // path in E5X taxonomy
  @Input() unit: string;
  @Input() customLabel: string;
  @Input() showLabel = false;
  @Input() classes: string;
  @Input() activity: string = 'motorfly';
 
  value: any;

  constructor(private orsService: ApiObservationsService
    ) { }

  ngOnInit(): void {

    const projection = this.path.replace(new RegExp(".[0-9].", "g"), ".");
    let options: ApiOptionsInterface = {
      query: { projection: { } }
    }
    options['query'][projection] = 1;
    this.orsService.get(this._id+'?version='+this.version, options).subscribe(
      data => {
        console.log('Data', data, 'Path', this.path, this.e5xPath)
        try {
        this.value = +(_get(data, this.path+'.'+this.key)); //['occurrence']['entities']['reportingHistory'][0]['attributes']['reportStatus']['value'];
        } catch(err) {
          console.log('ERR',err);
          this.value = undefined;
        }
      },
      err => console.log('ERR PIPE', err),
      () => {}
    )
  }

}
