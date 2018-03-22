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

  content: ApiContentItem;

  // Tributejs
  tribute: Tribute;
  debouncedGetOrs = debounce(this.getOrs, 500);
  debouncedGetUsers = debounce(this.getUsers, 500);

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
          this.content = {title: '', body: '', space_key: ''};

          this.route.params.subscribe(
            
            params => {
              console.log('Params', params);

              if (!!params['parent'] && params['parent'].length === 24) {
                
                this.mode = 'create_page';

                const options: ApiOptionsInterface = {
                  query: {
                    projection: {_id: 1, title: 1, slug: 1, space_key: 1 }
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
            () => {this.dataReady = true;
              // this.messenger$.next(true);
            }
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
        return '<macro contenteditable="false" class="badge badge-danger" id="' + item.original.id + '">@' + item.original.fullname + '</macro>';
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
    this.tribute = new Tribute({ collection: [users, ors], allowSpaces: true });

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
      events: { beforeEnter: (event) => {
                    console.log('Tribute acvtive');
                    if (this.tribute.isActive) {
                      return true;
                    }
                     // return true; // prevent enter plugin but not prevent default behavior
              },
              afterInit: (event) => {
                this.tribute.attach(document.getElementsByClassName('jodit_wysiwyg'));
                console.log('initiated');
                console.log(event);
                this.jodit = event;
                this.messenger$.next(true);
                return true;
              },
              openImageProperties: (current) => {
                console.log('Image properties');

              },
              
                afterInsertImage: (image) => {
                  console.log('IMAGE');
                  console.log(image);
                  return true;
                },
                afterResize: () => {
                  console.log('Resize');
                  
                },
              
              }
    };
  }

  handleEvent(event): boolean {
    console.log('triggered handleevent');
    console.log(event);
    return false;
  }

  ngAfterViewInit() {
    this.messenger$.subscribe(
      value => {
        console.log('MESSENGER');
        if (value) {
          this.jodit.events.on('afterPaste', (event) => {
            console.log('PASTE');
            return false; // deny paste
      
        });
        }
      }
    );
    

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

  logChange(event) {

    if (!this.done) {
      console.log('Instantiated tribute');
      // this.tribute.attach(document.getElementsByClassName('jodit_wysiwyg'));
      this.done = true;
    }
    // console.log(event);
    this.changed = true;
    this.content.body = event.value;

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
