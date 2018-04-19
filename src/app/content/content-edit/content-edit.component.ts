import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ApiContentService } from './../../api/api-content.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiObservationsService } from './../../api/api-observations.service';
import { ApiNlfUserService } from './../../api/api-nlf-user.service';
import { ApiOptionsInterface, ApiContentItem, ApiObservationsItem, ApiNlfUserItem, ApiNlfUserList } from '../../api/api.interface';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import Tribute from 'tributejs/src';
import { debounce } from 'ts-debounce';
import { VIEWPORT_RULER_PROVIDER_FACTORY } from '@angular/cdk/scrolling';

@Component({
  selector: 'nlf-admin-content-edit',
  templateUrl: './content-edit.component.html',
  styleUrls: ['./content-edit.component.css']
})
export class NlfContentEditComponent implements OnInit, AfterViewInit {

  joditConfig: Object;
  jodit;

  /**
  .on('beforeEnter', function (event) {
    if (tribute.isActive) {
        return true;
    }
})
.on('afterInit', function () {
    tribute = new Tribute(editor.options.tributejs);
    tribute.attach(editor.editor);
});
**/

  title = '';
  slug = '';
  body = '';

  done = false;

  messenger$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  dataReady = false;

  mode: string;
  parent: string;
  changed = false;

  content: ApiContentItem = { title: '', slug: '', body: undefined, space_key: '' };

  // Tributejs
  tribute: Tribute;
  debouncedGetOrs = debounce(this.getOrs, 500);
  debouncedGetUsers = debounce(this.getUsers, 500);
  debouncedGetContent = debounce(this.getContent, 500);
  debouncedUpdateBody = debounce(this.logChange, 200);
  joditInit = false;

  constructor(private apiContent: ApiContentService,
    private route: ActivatedRoute,
    private router: Router,
    private nlfUsers: ApiNlfUserService,
    private orsService: ApiObservationsService) { }

  test(event) {
    console.log(event);
  }
  ngOnInit() {
    console.log('Snapshot', this.route.snapshot);
    this.route.url.subscribe(

      url => {
        // CREATE
        if (url[0]['path'] === 'content' && url[1]['path'] === 'create') {
          this.content = { title: '', body: '', space_key: '' };

          this.route.params.subscribe(

            params => {
              console.log('Params', params);

              if (!!params['parent'] && params['parent'].length === 24) {

                this.mode = 'create_page';

                const options: ApiOptionsInterface = {
                  query: {
                    projection: { _id: 1, title: 1, slug: 1, space_key: 1 }
                  },
                };

                this.apiContent.getContent(params['parent'], options).subscribe(
                  data => {
                    this.content.parent = data._id;
                    this.content.space_key = data.space_key;
                  },
                  err => console.log(err),
                  () => this.dataReady = true
                );


              } else if (!params['parent']) {
                console.log('Create Space');
                this.mode = 'create_space';
              }

              this.dataReady = true;
              // this.messenger$.next(true);

            },
            err => console.log(err)
          );

          // EDIT
        } else if (url[0]['path'] === 'content' && url[1]['path'] === 'edit' && !!url[2] && !!url[2]['path'] && url[2]['path'].length === 24) {

          this.apiContent.getContent(url[2]['path']).subscribe(
            data => {
              this.content = data;
              this.mode = 'edit';
            },
            err => console.log(err),
            () => this.dataReady = true
          );
        }
      },
      err => console.log(err),
      () => {
        this.dataReady = true;
        // this.messenger$.next(true);
        console.log('Mode:', this.mode);
      }

    );

    const users = {
      trigger: '@',
      iframe: null,
      selectClass: 'highlight',
      selectTemplate: function (item) {
        return '<macro href="#" data-url="/user/' + item.original.id + '" contenteditable="false" class="badge badge-danger macrolink pointer" id="' + item.original.id + '">@' + item.original.fullname + '</macro>';
      },
      menuItemTemplate: function (item) {
        return item.string;
      },
      noMatchTemplate: 'Fant ingen',
      lookup: function (item) {
        return item.fullname + ' (' + item.id + ')';
      },
      fillAttr: 'fullname',
      values: (text, callback) => this.debouncedGetUsers(text, u => callback(u)),
      requireLeadingSpace: true,
      allowSpaces: true,
      replaceTextSuffix: '\n',
      positionMenu: true,
    };

    const content = {
      trigger: '[',
      iframe: null,
      selectClass: 'highlight',
      selectTemplate: function (item) {
        return '<a href="javascript:void(0);" class="macrolink" data-url="/content/view/' + item.original.space_key + '/' + item.original.slug + '">' + item.original.title + '</a>';
      },
      menuItemTemplate: function (item) {
        if (!item.original.parent) {
          return '<i class="fa fa-sitemap fa-fw"></i>&nbsp;' + item.string;
        } else {
          return '<i class="fa fa-file fa-fw"></i>&nbsp;' + item.string;
        }
      },
      noMatchTemplate: 'Fant ingen',
      lookup: function (item) {
        return item.title;
      },
      fillAttr: 'title',
      values: (text, callback) => this.debouncedGetContent(text, u => callback(u)),
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
        return '<macro href="#" data-url="/ors/fallskjerm/report/' + item.original.id + '" contenteditable="false" class="badge badge-danger macrolink pointer" id="' + item.original.id + '"> \
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
    this.tribute = new Tribute({ collection: [users, ors, content], allowSpaces: true });

    this.joditConfig = {
      buttons: 'paragraph, bold,strikethrough,underline,italic,|, \
                superscript,subscript,|, \
                ul,ol,|, \
                outdent,indent,|, \
                brush,|, \
                image,video,table,link,|, \
                align,undo,redo,\n,cut,hr,eraser,copyformat,|, \
                symbol,selectall,source, fullsize',
      imageDefaultWidth: 400,
      height: 600,

      events: {
        beforeEnter: (event) => {
          if (this.tribute.isActive) {
            return true; // prevent enter plugin but not prevent default behavior
          }
        },
        afterInit: (event, jodit) => {
          this.tribute.attach(document.getElementsByClassName('jodit_wysiwyg'));
          // this.jodit = jodit; // get editor instance

          return true;
        },
        change: (new_value, old_value) => {
          if (new_value !== old_value) {
            // console.log('Not equal');
          }
          this.debouncedUpdateBody(new_value);
          return false;
        }
      }
    };
  }

  ngAfterViewInit() {

    // this.tribute.attach(document.getElementsByClassName('jodit_wysiwyg'));
    /*
        this.messenger$.subscribe(
          value => {
            if (value) {
              this.tribute = new Tribute({ collection: [users, ors], allowSpaces: true });
              this.tribute.attach(document.getElementsByClassName('tribute-jodit'));
            }
          }
        );
        **/
  }

  public getOrs(text, callback) {
    console.log('searcing for ORS, text', text);

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
          where: { '$or': [{ 'id': { '$in': ids } }, { $text: { $search: tags.join(' ') } }] }, // { tags: { '$in': tags } }] },
          // where: { id: { '$in': ids } },
          // projection: { score: { $meta: "textScore" } }, // { id: 1, tags: 1, workflow: 1, reporter: 1, owner: 1, involved: 1, organization: 1 }
        },
      };

      // this.apiCache.get(['ors-last', options.query], this.orsService.getObservations(options), 1 * 60 * 1000).subscribe(
      this.orsService.getObservations(options).subscribe(
        data => {
          console.log(data);
          if (data._meta.total > 0) {
            const items = data._items.map((item) => {
              return { id: item.id, title: item['tags'].join(' '), search: '#' + item.id + ' ' + item['tags'].join(' ') };
            });
            console.log('ORS Items', items);
            callback(items);
          } else {
            callback([]);
          }
        },
        err => callback([]),
        () => console.log('ORS items done:')
      );
    } else {
      console.log('Nothing is long enough!');
      callback([]);
    }

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

  public getContent(text, callback) {

    const tags = text
      .split(' ')
      .filter(item => item.trim() !== '')
      .map((item) => {
        return item.charAt(0).toUpperCase() + item.slice(1);
      });

    if (text.length < 3) {
      callback([]);
    } else {
      console.log('Search content', text);
      const options: ApiOptionsInterface = {
        query: {
          // max_results: 20,
          sort: [{ id: -1 }],
          where: { $text: { $search: text }},
          // projection: { score: { $meta: "textScore" } },
        },
      };


      // this.apiCache.get(['ors-last', options.query], this.orsService.getObservations(options), 1 * 60 * 1000).subscribe(
      this.apiContent.getContentList(options).subscribe(
        data => {
          callback(data._items);
          console.log('Result', data._items);
        },
        err => callback([]),
      );

    }
  }

  public slugify() {

    if (this.content.title.length > 0) {

      const a = 'øåàáäâèéëêìíïîòóöôùúüûñçßÿœæŕśńṕẃǵǹḿǘẍźḧ·/_,:;';
      const b = 'oaaaaaeeeeiiiioooouuuuncsyoarsnpwgnmuxzh------';
      const p = new RegExp(a.split('').join('|'), 'g');

      this.content.slug = this.content.title.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(p, c =>
          b.charAt(a.indexOf(c)))     // Replace special chars
        .replace(/&/g, '-og-')         // Replace & with 'and'
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '')            // Trim - from end of text
        .replace(/-$/, '');             // Replapce last dash -
    }
  }

  public change() {
    this.changed = true;
  }

  logChange(value) {
    // console.log(event);

    if (this.joditInit) {
      // console.log('Changed body');
      this.changed = true;
      this.content.body = value; // .value;
    } else {
      // console.log('First pass');
      this.joditInit = true;
    }
  }

  create() {

    if (this.mode === 'create_space' || this.mode === 'create_page') {

      this.apiContent.create(this.content).subscribe(
        result => {
          console.log(result);
          this.router.navigate(['/content']);
        },
        err => console.log(err),
        () => console.log('Done')
      );
    }
  }

  save() {

    if (this.mode === 'edit' && this.content['_id'].length > 0) {
      const payload = {
        title: this.content.title,
        slug: this.content.slug,
        body: this.content.body
      };

      this.apiContent.save(this.content['_id'], payload, this.content['_etag']).subscribe(
        result => {
          console.log(result);
          this.changed = false;
        },
        err => console.log(err),
        () => this.router.navigate(['/content/view/', this.content.space_key, this.content.slug])
      );

    } else {
      console.log('No object instantiated');
    }


  }
}
