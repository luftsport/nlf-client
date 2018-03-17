import { Component, OnInit, Output, Input, TemplateRef, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ApiObservationFileInterface, ApiObservationsItem, ApiOptionsInterface } from '../../../api/api.interface';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';
import { NlfLocalStorageService } from '../../../services/storage/local-storage.service';
import { NlfOrsEditorService } from '../ors-editor.service';
import { ApiFilesService } from './../../../api/api-files.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmService } from './../../../services/confirm/confirm.service';

@Component({
  selector: 'nlf-ors-editor-files',
  templateUrl: './ors-editor-files.component.html',
  styleUrls: ['./ors-editor-files.component.css']
})
export class NlfOrsEditorFilesComponent implements OnInit {

  @Input() onlyFilepicker: boolean;
  @Input() dropzone: boolean;
  // Notify editor component if we change files - save
  @Output() fileChange = new EventEmitter<boolean>();

  observation: ApiObservationsItem;
  dataReady = false;

  filelist = [];

  // Images
  thumbnailSize = 'small';
  modalRef;
  viewimage;
  viewImageLoading = false;
  viewImageName = '';

  // Uploader
  uploading = false;
  options: UploaderOptions;
  formData: FormData;
  ngxfiles: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: Function;
  dragOver: boolean;
  imagePreview = [];
  userid: number;
  token: string;

  constructor(private storage: NlfLocalStorageService,
              private subject: NlfOrsEditorService,
              private apiFile: ApiFilesService,
              public domSanitizer: DomSanitizer,
              private modalService: NgbModal,
              private confirmService: ConfirmService) {

    this.subject.observableObservation.subscribe(
      observation => {
        this.observation = observation;

        /**
        if (!!this.observation.files && this.observation.files.length > 0) {
          this.getFiles();
        } else {
          this.dataReady = true;
        }**/
      }
    );

    // Uploader config
    this.ngxfiles = []; // local uploading ngxfile array
    this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
    this.humanizeBytes = humanizeBytes;

    this.userid = this.storage.getId();
    this.token = this.storage.getToken();

  }

  ngOnInit() {
    if (typeof this.dropzone === 'undefined') { this.dropzone = true; }
    if (typeof this.onlyFilepicker === 'undefined') { this.onlyFilepicker = false; }

    this.getFiles();
  }

  /**
   * Getting files
   */

  public getFiles() {

    let processed = 0;
    this.dataReady = true;


    // @TODO should rather take just the changes, not the whole list
    this.filelist = [];

    this.observation.files.forEach(f => {
      console.log(f);
      this.getFile(f);
      processed++;
      if (this.observation.files.length === processed) {
        this.dataReady = true;
      }
    });
  }

  private getFile(f) {
    // Do not download files
    const options: ApiOptionsInterface = {
      query: { projection: { file: 0 } }
    };

    this.apiFile.getFile(f.f, options).subscribe(
      data => {
        data['r'] = f.r;

        if (data.content_type.match(/image/g) != null) {
          // data['image'] = true;
          // this.getImage(data);

          this.apiFile.getImage(data._id, this.thumbnailSize).subscribe(
            image => {
              data['src'] = 'data:' + image.mimetype + ';charset=utf8;base64,' + image.src;
              data['isImage'] = true;
            },
            err => {
              console.log('Error getting image ' + data._id + ' ' + data.name);
            },
          );

        } else {
          data['isImage'] = false;
        }

        data['download'] = this.apiFile.getDirectLink(data._id) + '?token=' + this.token;
        this.filelist.push(data);

      },
      err => console.log(err)

    );
  }


  public addToFilelist(_id) {
    this.observation.files.push({ f: _id, r: true });
    this.subject.update(this.observation);
    this.fileChange.emit(true);
    this.getFile({ f: _id, r: true });
  }

  public setRestricted(r, _id, index) {

    this.filelist[index]['r'] = r;

    /**
    this.thumbnails.forEach((item, i) => {
      if (item._id === _id) {
        this.thumbnails[i]['r'] = r;
      }
    });
    **/

    this.observation.files.forEach((item, i) => {
      if (item['f'] === _id) {
        this.observation.files[i]['r'] = r;
        this.subject.update(this.observation);
      }
    });
  }

  public removeFromFilelist(_id, index) {

    this.confirmService.confirm(
      { title: 'Bekreft sletting',
        message: 'Er du sikker du vil slette filen <strong>' + this.filelist[index].name + '</strong> ?',
        yes: 'Slett',
        no: 'Avbryt'
      }).then(
      () => {
        this.observation.files.forEach((item, i) => {
          if (this.observation.files[i]['f'] === _id) {
            this.observation.files.splice(i, 1);
          }
        });

        this.filelist.splice(index, 1);

        /**
        this.thumbnails.forEach((item, i) => {
          if (this.thumbnails[i]['_id'] === _id) {
            this.thumbnails.splice(i, 1);
          }
        }); */

        this.subject.update(this.observation);
        this.fileChange.emit(true);
      },
      () => {}
    );

  }

  public download(file) {
    this.apiFile.downloadFile(file._id);
  }

  /**
   * Todo see if only filelist and index also for src?
   * @param template 
   * @param index 
   */
  openModal(template: TemplateRef<any>, index) {

    this.viewImageLoading = true;
    this.viewImageName = 'Laster bilde...';

    this.modalRef = this.modalService.open(template, { size: 'lg' });

    this.getModalImage(index);
  }

  public getModalImage(index) {

    if (this.filelist[index]['content_type'].match(/image/g) != null) {

      this.viewImageName = 'Laster bilde...';
      this.viewImageLoading = true;
      this.apiFile.getImage(this.filelist[index]['_id'], 'large').subscribe(
        data => {
          this.viewimage = {
            src: 'data:' + data.mimetype + ';charset=utf8;base64,' + data.src,
            index: index
          };
          this.viewImageName = this.filelist[index].name;
          this.viewImageLoading = false;
        },
        err => console.log(err),
        () => this.viewImageLoading = false

      );
    } else {
      this.viewImageName = this.filelist[index].name;
      this.viewImageLoading = false;

    }
  }

  /**
   * Uploading files
   */
  onUploadOutput(output: UploadOutput): void {

    if (output.type === 'allAddedToQueue') { // when all files added in queue
      console.log('Output All:', output);
      // this.ngxfiles.push(output.file);
      this.startUpload();

    } else if (output.type === 'addedToQueue' && typeof output.file !== 'undefined') { // add file to array when added
      console.log('Output added:', output);
      // this.previewImagem(output.file.nativeFile).then(response => {
      // this.imagePreview.push(response); // The image preview
      // this.ngxfiles.push(output.file);
      // });
      this.ngxfiles.push(output.file);
      // this.startUpload();

    } else if (output.type === 'uploading' && typeof output.file !== 'undefined') {
      // update current data in ngxfile array for uploading file
      const index = this.ngxfiles.findIndex(file => typeof output.file !== 'undefined' && file.id === output.file.id);
      this.ngxfiles[index] = output.file;
      this.uploading = true;


    } else if (output.type === 'removed') {
      // remove file from array when removed
      this.ngxfiles = this.ngxfiles.filter((file: UploadFile) => file !== output.file);
    } else if (output.type === 'dragOver') {
      this.dragOver = true;
    } else if (output.type === 'dragOut') {
      this.dragOver = false;
    } else if (output.type === 'drop') {
      this.dragOver = false;

    } else if (output.type === 'done') {

      this.addToFilelist(output.file.response._id);
      this.uploading = false;
      // this.observation.files.push({ f: output.file.response._id, r: true });
      // this.subject.update(this.observation);
    }
  }

  startUpload(): void {

    this.ngxfiles.forEach((file, index) => {
      let event: UploadInput = {
        type: 'uploadFile',
        url: '/api/v1/files/',
        method: 'POST',
        headers: { 'Authorization': 'Basic ' + this.token },
        file: file,
        data: {
          ref: 'observations',
          ref_id: this.observation._id,
          content_type: file.type,
          name: file.name,
          size: String(file.size),
          owner: String(this.userid)
        }
      };

      this.ngxfiles.splice(index, 1);

      this.uploadInput.emit(event);
    });

  }

  cancelUpload(id: string): void {
    this.uploadInput.emit({ type: 'cancel', id: id });
  }

  removeFile(id: string): void {
    this.uploadInput.emit({ type: 'remove', id: id });
  }

  removeAllFiles(): void {
    this.uploadInput.emit({ type: 'removeAll' });
  }



  // The preview function
  previewImagem(file: any) {
    console.log('File:', file);
    const fileReader = new FileReader();
    return new Promise(resolve => {
      fileReader.readAsDataURL(file);
      fileReader.onload = function (e: any) {
        resolve(e.target.result);
      };
    });
  }


}
