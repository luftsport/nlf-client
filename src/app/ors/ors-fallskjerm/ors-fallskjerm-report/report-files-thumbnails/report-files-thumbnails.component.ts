import { Component, Input, OnInit } from '@angular/core';
import { ApiFileItem } from '../../../../api/api.interface';
import { ApiFilesService } from '../../../../api/api-files.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'nlf-ors-fallskjerm-report-files-thumbnails',
  templateUrl: './report-files-thumbnails.component.html',
  styleUrls: ['./report-files-thumbnails.component.css']
})
export class NlfOrsReportFilesThumbnailsComponent implements OnInit {

  @Input() filelist: ApiFileItem[];
  @Input() size: string;
  thumbnails = [];
  dataReady = false;

  constructor(private apiFile: ApiFilesService,
    public domSanitizer: DomSanitizer) { }

  ngOnInit() {
    if (!this.size) {
      this.size = 'small';
    }

    if (this.filelist.length > 0) {
      this.getThumbnails();
    } else {
      this.dataReady = true;
    }
    
  }

  public getThumbnails() {

    let processed = 0;

    this.filelist.forEach(file => {

      if (file.content_type.match(/image/g) != null) {

        this.apiFile.getImage(file._id, this.size).subscribe(

          image => {
            console.log("THUMB!");
            this.thumbnails.push({
              src: 'data:' + image.mimetype + ';charset=utf8;base64,' + image.src,
              _id: file._id,
              filename: file.name,
              filesize: file.size
            });
          },
          err => {
            console.log('Error getting image ' + file._id + ' ' + file.name)
          },
          () => {
            processed++;
            if (processed === this.filelist.length) {
              this.dataReady = true;
              console.log("THUMBNAILS READY");
            }
          }
        );

      } else {
        processed++;
        if (processed === this.filelist.length) {
          this.dataReady = true;
        }
      }
    });

  }

}
