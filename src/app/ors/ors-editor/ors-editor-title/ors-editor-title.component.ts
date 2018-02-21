import { ApiOptionsInterface, ApiObservationsItem, ApiTagList } from './../../../api/api.interface';
import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { ApiTagsService } from '../../../api/api-tags.service';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { NlfOrsEditorService } from '../ors-editor.service';

@Component({
  selector: 'nlf-ors-editor-title',
  templateUrl: './ors-editor-title.component.html',
  styleUrls: ['./ors-editor-title.component.css']
})
export class NlfOrsEditorTitleComponent implements OnInit {

  apidata: any;
  populated = [];
  observation: ApiObservationsItem;


  constructor(private tagService: ApiTagsService, 
              private http: HttpClient,
              private subject: NlfOrsEditorService) {
    this.subject.observableObservation.subscribe(observation => this.observation = observation);
  }

  toUpper(value): string {
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }

  isInArray(value, array) {
    return array.indexOf(value) > -1;
  }

/**
  uniqueArray(a) {
    let temp = {};
    for (let i = 0; i < a.length; i++)
      temp[a[i]] = true;
    return Object.keys(temp);
  }
**/
  onAdd(item): void {

    console.log('Adding:');
    console.log(item);
    if (typeof item === 'object' && item.tag !== item._id) {
      this.tagService.freq(item._id, 1).subscribe(
        res => this.onChange(),
        err => console.log(err)
      );
    } else if (item.tag === item._id) {
      this.tagService.create({ tag: this.toUpper(item.tag), group: 'observation', related: [] }).subscribe(
        res => {
          this.populated[this.populated.length - 1] = { tag: res.tag, _id: res._id };
          this.tagService.freq(res._id, 1).subscribe(
            data => this.onChange(),
            err => console.log(err)
          );
        },
        err => console.log(err)
      );
    } else {
      this.onChange();
    }
  }

  onRemove(item): void {

    console.log('Removing:');
    console.log(item);

    if (typeof item === 'object' && !!item._id) {
      this.tagService.freq(item._id, -1).subscribe(
        res => console.log(res),
        err => console.log(err)
      );
    }
    this.onChange();
  }

  onChange(): void {
    console.log(this.populated);
    let tags = [];
    this.populated.forEach((item, index) => {
      // Because ngx-chips fucks up
      if (typeof this.populated[index] === 'object') {
        this.populated[index] = { tag: this.toUpper(this.populated[index].tag), _id: this.populated[index]._id };
        tags.push(this.populated[index].tag);
      } else {
        tags.push(this.populated[index]);
      }
    });

    this.observation.tags = tags;
    this.subject.update(this.observation);
  }

  ngOnInit() {

    this.populated = this.observation.tags;

    // this.getTags('test').subscribe( data => console.log(data));
    let options: ApiOptionsInterface = {
      query: {
        where: { group: 'observation', freq: { '$gte': 0 } },
        sort: [{ freq: -1 }, { tag: 1 }],
        max_results: 5000
      }
    };
    this.tagService.getTags(options).subscribe(data => this.apidata = data._items);
  }

}
