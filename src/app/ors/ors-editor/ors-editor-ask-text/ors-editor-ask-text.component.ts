import { ApiObservationsService } from './../../../api/api-observations.service';
import { ApiNlfUserService } from './../../../api/api-nlf-user.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ApiOptionsInterface, ApiObservationsItem, ApiNlfUserItem, ApiNlfUserList } from '../../../api/api.interface';

import { NlfOrsEditorInvolvedService } from './../ors-editor-involved.service';
import { NlfOrsEditorService } from '../ors-editor.service';
import Tribute from 'tributejs/src';
import { debounce } from 'ts-debounce';

@Component({
  selector: 'nlf-ors-editor-ask-text',
  templateUrl: './ors-editor-ask-text.component.html',
  styleUrls: ['./ors-editor-ask-text.component.css']
})
export class NlfOrsEditorAskTextComponent implements OnInit, AfterViewInit {
  list; // mentions list
  observation: ApiObservationsItem;
  mconf = { triggerChar: '@', maxItems: 10, labelKey: 'fullname', mentionSelect: this.format };

  tribute: Tribute;

  debouncedGetOrs = debounce(this.getOrs, 500);
  debouncedGetUsers = debounce(this.getUsers, 500);


  constructor(private subject: NlfOrsEditorService,
    private involved: NlfOrsEditorInvolvedService,
    private nlfUsers: ApiNlfUserService,
    private orsService: ApiObservationsService) {

    this.involved.currentArr.subscribe(list => this.list = list); // Involved list
    this.subject.observableObservation.subscribe(observation => this.observation = observation);
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    const users = {
      trigger: '!',
      iframe: null,
      selectClass: 'highlight',
      // function called on select that returns the content to insert<macro contenteditable="false" class="badge badge-info"
      selectTemplate: function (item) {
        return '<macro contenteditable="false" class="badge badge-info" id="' + item.original.id + '">!' + item.original.fullname + '</macro>';
      },
      // template for displaying item in menu
      menuItemTemplate: function (item) {
        return item.string;
      },
      // template for when no match is found (optional),
      // If no template is provided, menu is hidden.
      noMatchTemplate: function (text) {
        return 'No results!';
      },
      // column to search against in the object (accepts function or string)
      lookup: 'fullname',
      // column that contains the content to insert by default
      fillAttr: 'fullname',
      // REQUIRED: array of objects to match
      values: (text, callback) => this.getInvolved(text, u => callback(u)),
      // specify whether a space is required before the trigger character
      requireLeadingSpace: true,
      // specify whether a space is allowed in the middle of mentions
      allowSpaces: true,
      // optionally specify a custom suffix for the replace text
      // (defaults to empty space if undefined)
      replaceTextSuffix: '\n',
      // specify whether the menu should be positioned.  Set to false and use in conjuction with menuContainer to create an inline menu
      // (defaults to true)
      positionMenu: true,
    };

    const remote = {
      trigger: '@',
      iframe: null,
      selectClass: 'highlight',
      selectTemplate: function (item) {
        return '<macro contenteditable="false" class="badge badge-danger" id="' + item.original.id + '">@' + item.original.fullname + '</macro>';
      },
      menuItemTemplate: function (item) {
        return item.string;
      },
      noMatchTemplate: 'Fant ingen',
      lookup: function (item) {
        return  item.fullname + ' (' + item.id + ')';
      },
      fillAttr: 'fullname',
      values: (text, callback) => this.debouncedGetUsers(text, u => callback(u)),
      requireLeadingSpace: true,
      allowSpaces: true,
      replaceTextSuffix: '\n',
      positionMenu: true,
    };

    const ors = {
      trigger: '#',
      iframe: null,
      selectClass: 'highlight',
      selectTemplate: function (item) {
        return '<macro contenteditable="false" class="badge badge-danger" id="' + item.original.id + '">#' + item.original.id + ' ' + item.original.title + '</macro>';
      },
      menuItemTemplate: function (item) {
        return item.string;
      },
      noMatchTemplate: 'Fant ingen',
      lookup: 'search',
      fillAttr: 'title',
      values: (text, callback) => this.debouncedGetOrs(text, u => callback(u)),
      requireLeadingSpace: true,
    };

    /**
     *  this.menuSelected = 0
        this.current = {}
        this.inputEvent = false
        this.isActive = false
        this.menuContainer = menuContainer
        this.allowSpaces = allowSpaces | true false
        this.replaceTextSuffix = replaceTextSuffix = '\n'
        this.positionMenu = positionMenu | true
     */
    this.tribute = new Tribute({ collection: [users, remote, ors], allowSpaces: true});
    this.tribute.attach(document.getElementsByName('myFormName'));


  }

  public getInvolved(text, callback) {
    callback(this.list);
  }

  public getUsers(text, callback) {

    if (text.length < 3) {
      callback([]);
    } else {
      console.log('Search user', text);
      const options: ApiOptionsInterface = {
        query: {
          max_results: 20,
          // sort: [{ when: -1 }],
          where: { 'workflow.state': 'closed' },
          // projection: {id: 1}
          // projection: {id: 1, _id: 1, _updated: 1, tags: 1, rating: 1}
        },
      };

      // this.apiCache.get(['ors-last', options.query], this.orsService.getObservations(options), 1 * 60 * 1000).subscribe(
      this.nlfUsers.search(text).subscribe(
        data => {
          callback(data._items);
          console.log('Result', data._items);
        },
        err => callback([]),
      );

    }
  }

  public getOrs(text, callback) {
    console.log('searcing for kuk, text', text);

    let ids = text.replace(/\D+/g, '') // Non digits
    .split(' ')
    .filter(item => parseInt(item, 10) > 0)
    .map((item) => {
        return parseInt(item, 10);
    });

    let tags = text.replace(/\d+/g, '')
    .split(' ')
    .filter(item => item.trim() !== '')
    .map((item) => {
        return item.charAt(0).toUpperCase() + item.slice(1);
    });

    console.log('ID', ids, ids.length);
    console.log('Tags', tags, tags.length);

    // if (ids.lenght > 0 || tags.length > 2) {
    if (text.length > 0) {

      if (!(tags instanceof Array)) {
        tags = [];
      }

      if (!(ids instanceof Array)) {
        ids = [];
      }

      /**
       * Note: $text uses all indexes => also returns which do not match
       */
      const options: ApiOptionsInterface = {
        query: {
          // max_results: 20,
          sort: [{ id: -1 }],
          where: { '$or': [{ 'id': { '$in': ids } }, {$text: { $search: tags.join(' ') }}]}, // { tags: { '$in': tags } }] },
          // where: { id: { '$in': ids } },
          // projection: { score: { $meta: "textScore" } }, // { id: 1, tags: 1, workflow: 1, reporter: 1, owner: 1, involved: 1, organization: 1 }
        },
      };

      // this.apiCache.get(['ors-last', options.query], this.orsService.getObservations(options), 1 * 60 * 1000).subscribe(
      this.orsService.getObservations(options).subscribe(
        data => {
          console.log(data);
          if (data._meta.total > 0) {
            let kuk = data._items.map((item) => {
              return { id: item.id, title: item['tags'].join(' '), search: '#' + item.id + ' ' + item['tags'].join(' ') };
            });
            console.log('Kuk', kuk);
            callback(kuk);
          } else {
            callback([]);
          }
        },
        err => callback([]),
        () => console.log('Kuk done:')
      );
    } else {
      console.log('Nothing is long enough!');
      callback([]);
    }

  }

  format(event) {
    console.log(event);
    return '<macro contenteditable="false" class="badge badge-info" id="' + event.id + '">' + event.fullname + '</macro>';
  }
  intergalactic(event) {
    console.log(event);
  }
  textChange() {
    this.subject.update(this.observation);
  }
}
