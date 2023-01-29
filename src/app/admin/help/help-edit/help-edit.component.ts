import { Component, OnInit } from '@angular/core';
import { ApiHelpService } from 'app/api/api-help.service';
import { ActivatedRoute, Router } from '@angular/router';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'nlf-admin-help-edit',
  templateUrl: './help-edit.component.html',
  styleUrls: ['./help-edit.component.css']
})
export class NlfAdminHelpEditComponent implements OnInit {
  
  // Icons
  faPlus = faPlus;

  joditConfig: Object;
  
  title = '';
  key = '';
  body = '';
  dataReady = false;
  mode = 'create';
  changed = false;
  joditInit = false;

  helpObj = {};

  constructor(private apiHelp: ApiHelpService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {

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
        change: (new_value, old_value) => {
          if (new_value !== old_value) {
            this.logChange(new_value);
          }
          return false;
        }
      }
    };

    this.route.params.subscribe(
      params => {
        this.key = params['key'] ? params['key'] : '';

        if (this.key !== '') {
          this.apiHelp.getHelp(this.key).subscribe(
            data => {
              this.title = data.title;
              this.body = data.body;
              this.mode = 'edit';
              this.helpObj = data;
            },
            err => console.log(err),
            () => this.dataReady = true
          );
        } else {
          this.mode = 'create';
          this.dataReady = true;
        }
      },
      err => console.log(err),
      () => this.dataReady = true
    );
  }

  logChange(value) {
    // console.log(event);

    if (this.joditInit) {
      // console.log('Changed body');
      this.changed = true;
      this.body = value; // .value;
    } else {
      // console.log('First pass');
      this.joditInit = true;
    }
  }


  create() {

    if (this.mode === 'create') {
      const payload = {
        title: this.title,
        key: this.key,
        body: this.body
      };

      this.apiHelp.create(payload).subscribe(
        result => {
          console.log(result);
          this.router.navigate(['/admin/help']);
        },
        err => console.log(err),
        () => console.log('Done')
      );
    }
  }

  save() {

    if (this.mode === 'edit' && this.helpObj['_id'].length > 0) {
      const payload = {
        title: this.title,
        key: this.key,
        body: this.body
      };

      this.apiHelp.save(this.helpObj['_id'], payload, this.helpObj['_etag']).subscribe(
        result => {
          console.log(result);
          this.changed = false;
        },
        err => console.log(err),
        () => this.router.navigate(['/admin/help/'])
      );

    } else {
      console.log('No object instantiated');
    }


  }
}
