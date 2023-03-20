import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { ApiFileItem } from 'app/api/api.interface';
import { ApiFilesService } from 'app/api/api-files.service';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faChevronLeft, faChevronRight, faSpinner } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'nlf-ors-report-files-thumbnails',
  templateUrl: './report-files-thumbnails.component.html',
  styleUrls: ['./report-files-thumbnails.component.css']
})
export class NlfOrsReportFilesThumbnailsComponent implements OnInit {

  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
  faSpinner = faSpinner;

  @Input() filelist: ApiFileItem[];
  @Input() size: string;

  thumbnails = [];
  dataReady = false;

  modalRef;
  viewimage;
  viewImageLoading = false;
  viewImageName = '';
  viewImageData = { idx: 0, num: 0 };

  constructor(private apiFile: ApiFilesService,
    public domSanitizer: DomSanitizer,
    private modalService: NgbModal) { }

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
            this.thumbnails.push({
              src: 'data:' + image.mimetype + ';charset=utf8;base64,' + image.src,
              _id: file._id,
              filename: file.name,
              filesize: file.size
            });

          },
          err => {
            console.log('Error getting image ' + file._id + ' ' + file.name);
          },
          () => {
            processed++;
            if (processed === this.filelist.length) {
              this.dataReady = true;
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


  getModalImage(idx) {

    if (idx < 0) {
      idx = this.thumbnails.length - 1;
    } else if (idx >= this.thumbnails.length) {
      idx = 0;
    }
    this.viewImageData['idx'] = idx;
    this.viewImageData['num'] = this.thumbnails.length;
    this.viewImageLoading = true;
    this.viewImageName = 'Laster bilde...';
    this.apiFile.getImage(this.thumbnails[idx]._id, 'large').subscribe(
      data => {
        this.viewimage = {
          src: 'data:' + data.mimetype + ';charset=utf8;base64,' + data.src,
          name: this.thumbnails[idx].filename, size: this.thumbnails[idx].filesize
        };
        this.viewImageName = this.thumbnails[idx].filename;
        this.viewImageLoading = false;
      },
      err => console.log(err),
      () => this.viewImageLoading = false

    );

  }

  openModal(template: TemplateRef<any>, image, idx) {
    this.viewImageData['idx'] = idx;
    this.viewImageData['num'] = this.thumbnails.length;
    this.viewImageLoading = true;
    this.viewImageName = 'Laster bilde...';
    this.modalRef = this.modalService.open(template, { size: 'lg' });

    this.apiFile.getImage(image._id, 'large').subscribe(
      data => {
        this.viewimage = {
          src: 'data:' + data.mimetype + ';charset=utf8;base64,' + data.src,
          name: image.filename, size: image.filesize
        };
        this.viewImageName = image.filename;
        this.viewImageLoading = false;
      },
      err => console.log(err),
      () => this.viewImageLoading = false

    );
  }
}
