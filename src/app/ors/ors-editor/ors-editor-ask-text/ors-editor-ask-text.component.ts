import { ApiObservationsService } from 'app/api/api-observations.service';
import { LungoPersonsService } from 'app/api/lungo-persons.service';
import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfirmService } from 'app/services/confirm/confirm.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiOptionsInterface, ApiObservationsItem, ApiNlfUserItem, ApiNlfUserList, ApiObservationAskTextInterface } from 'app/api/api.interface';
import { NlfOrsEditorInvolvedService } from 'app/ors/ors-editor/ors-editor-involved.service';
import { NlfOrsEditorService } from 'app/ors/ors-editor/ors-editor.service';
import Tribute from "tributejs";
import TributeOptions from "tributejs";
import { debounce } from 'ts-debounce';

/**
@todo need to fire event on Tribute insert
https://stackoverflow.com/questions/45625049/contenteditable-how-to-completely-remove-span-when-pressing-del-or-backspace
 */


@Component({
  selector: 'nlf-ors-editor-ask-text',
  templateUrl: './ors-editor-ask-text.component.html',
  styleUrls: ['./ors-editor-ask-text.component.css']
})
export class NlfOrsEditorAskTextComponent implements OnInit, AfterViewInit {

  list; // mentions list
  observation: ApiObservationsItem;
  rs: any;
  tribute: any; //Tribute;
  tributeOptions: any; //TributeOptions;
  tributeInitited = false;
  modalRef;

  elementAsk;
  elementAskModal;

  showAllASK = false;

  debouncedGetOrs = debounce(this.getOrs, 900);
  debouncedGetUsers = debounce(this.getUsers, 900);
  debouncedUpdateText = debounce(this.textChange, 1500);

  constructor(private subject: NlfOrsEditorService,
    private involved: NlfOrsEditorInvolvedService,
    private personService: LungoPersonsService,
    private orsService: ApiObservationsService,
    private confirmService: ConfirmService,
    private modalService: NgbModal) {


    this.involved.currentArr.subscribe(list => this.list = list); // Involved list
    this.subject.observableObservation.subscribe(observation => {
      this.observation = observation;
      if (!!this.observation) {
        this.orsService.setActivity(this.observation._model.type);
        if (typeof this.observation.ask.text[this.observation.workflow.state] === 'undefined') {
          this.observation.ask.text[this.observation.workflow.state] = '';
        }
      }
    });
  }

  ngOnInit() {
  }

  ngAfterViewInit() {

    this.initiateTribute();

  }

  public getInvolved(text, callback) {
    console.log('INVOLVED', this.list, text, callback);
    callback(this.list);
  }

  public getUsers(text, callback) {

    if (text.length < 3) {
      callback([]);
    } else {
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
      this.personService.search(text).subscribe(
        data => {
          callback(data._items);
        },
        err => callback([]),
      );

    }
  }

  private initiateTribute() {
    const rs = (length) => Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1);

    const users = {
      trigger: '!',
      iframe: null,
      selectClass: 'highlight',
      // function called on select that returns the content to insert<macro contenteditable="false" class="badge bg-info"
      selectTemplate: function (item) {
        const id = rs(12);
        return '<macro href="#" data-url="/user/' + item.original.id + '" contenteditable="false"\
                data-type="user" data-id="' + item.original.id + '"\
                onclick="this.remove()"\
                class="badge bg-info macrolink pointer" id="' + id + '">\
                !' + item.original.full_name + '</macro>';
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
      lookup: 'full_name',
      // column that contains the content to insert by default
      fillAttr: 'full_name',
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
        const id = rs(12);
        return '<macro href="#" data-url="/user/' + item.original.id + '" contenteditable="false" \
                data-type="user" data-id="' + item.original.id + '"\
                onclick="this.remove()"\
                class="badge bg-danger macrolink pointer" id="' + id + '">\
                @' + item.original.full_name + '</macro>';
      },
      menuItemTemplate: function (item) {
        return item.string;
      },
      noMatchTemplate: 'Fant ingen',
      lookup: function (item) {
        return item.full_name + ' (' + item.id + ')';
      },
      fillAttr: 'full_name',
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
        const id = rs(12);
        return '<macro href="#" data-url="/ors/' + item.original.activity + '/report/' + item.original.id + '" contenteditable="false"\
                data-type="f_ors" data-id="' + item.original.id + '"\
                onclick="this.remove()"\
                class="badge bg-danger macrolink pointer" id="' + id + '"> \
                #' + item.original.id + ' ' + item.original.title + '</macro>';
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
      @todo https://github.com/ladderio/ngx-tribute
     *  this.menuSelected = 0
        this.current = {}
        this.inputEvent = false
        this.isActive = false
        this.menuContainer = menuContainer
        this.allowSpaces = allowSpaces | true false
        this.replaceTextSuffix = replaceTextSuffix = '\n'
        this.positionMenu = positionMenu | true
     */
    this.tributeOptions = { collection: [users, remote, ors], allowSpaces: true };
    this.tribute = new Tribute(this.tributeOptions);

    this.elementAsk = document.getElementById('ask'); //getElementsByName('myAskDiv');
    this.tribute.attach(this.elementAsk);

    this.elementAsk.addEventListener('tribute-replaced', (event) => {
      //this.tribute.insertTextAtCursor(' ');
      this.debouncedUpdateText();
    });
    console.log('Tribute:', this.tribute);

  }

  public getOrs(text, callback) {

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
          where: {
            'workflow.state': 'closed',
            '$or': [{ 'id': { '$in': ids } }, { $text: { $search: tags.join(' ') } }]
          }, // { tags: { '$in': tags } }] },
          // where: { id: { '$in': ids } },
          // projection: { score: { $meta: "textScore" } }, // { id: 1, tags: 1, workflow: 1, reporter: 1, owner: 1, involved: 1, organization: 1 }
        },
      };

      // this.apiCache.get(['ors-last', options.query], this.orsService.getObservations(options), 1 * 60 * 1000).subscribe(
      this.orsService.getObservations(options).subscribe(
        data => {
          if (data._meta.total > 0) {
            let ors = data._items.map((item) => {
              return { id: item.id, title: item['tags'].join(' '), search: '#' + item.id + ' ' + item['tags'].join(' '), activity: item._model.type };
            });
            callback(ors);
          } else {
            callback([]);
          }
        },
        err => callback([]),
        () => { }
      );
    } else {
      callback([]);
    }

  }

  format(event) {
    return '<macro contenteditable="false" class="badge bg-info" id="' + event.id + '">' + event.fullname + '</macro>';
  }

  intergalactic(event) {
  }


  onPaste(event) {
    console.log(event);
    event.preventDefault();

    // get text representation of clipboard
    const text = (event.originalEvent || event).clipboardData.getData('text/plain');

    // insert text manually
    document.execCommand("insertHTML", false, text);
    //this.observation.ask.text[this.observation.workflow.state] = this.observation.ask.text[this.observation.workflow.state].replace(/\<(?!macro|br|p).*?\>/ig, "");
  }

  textChange() {
    //Always check for html tags!
    //this.observation.ask.text[this.observation.workflow.state] = this.observation.ask.text[this.observation.workflow.state];
    this.subject.update(this.observation);
  }

  reset() {
    const confirmMsg = {
      title: 'Please confirm',
      message: 'Are you sure you want to delete all the text?',
      yes: 'Delete',
      no: 'Cancel'
    };

    this.confirmService.confirm(confirmMsg).then(
      () => {
        this.observation.ask.text[this.observation.workflow.state] = '';
      },
      () => { }
    );
  }

  public openModal(template) {

    this.showAllASK = true;
    /**
    this.textChange();
    this.modalRef = this.modalService.open(template, { size: 'lg', backdrop: 'static', keyboard: false });
    this.elementAskModal = document.getElementById('askModal'); //getElementsByName('myAskDivModal');
    this.tribute.attach(this.elementAskModal);

    this.elementAskModal.addEventListener('tribute-replaced', (event) => {
      this.debouncedUpdateText();
    });
    **/
  }

  public closeModal() {
    this.textChange();
    this.tribute.detach(this.elementAskModal);
    //this.elementAskModal.removeEventListener('tribute-replaced');
    this.modalRef.close();
  }
}
