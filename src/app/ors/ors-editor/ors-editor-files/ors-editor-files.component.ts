import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiObservationFileInterface, ApiObservationsItem } from '../../../api/api.interface';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';
import { NlfLocalStorageService } from '../../../services/storage/local-storage.service';
import { NlfOrsEditorService } from '../ors-editor.service';

@Component({
  selector: 'nlf-ors-editor-files',
  templateUrl: './ors-editor-files.component.html',
  styleUrls: ['./ors-editor-files.component.css']
})
export class NlfOrsEditorFilesComponent implements OnInit {

  observation: ApiObservationsItem;

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
              private subject: NlfOrsEditorService) {

    this.subject.observableObservation.subscribe(observation => this.observation = observation);

    this.ngxfiles = []; // local uploading ngxfile array
    this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
    this.humanizeBytes = humanizeBytes;

    this.userid = this.storage.getId();
    this.token = this.storage.getToken();

  }

  ngOnInit() {
  }

  onUploadOutput(output: UploadOutput): void {
    if (output.type === 'allAddedToQueue') { // when all files added in queue
      // uncomment this if you want to auto upload ngxfile when added
      // const event: UploadInput = {
      //   type: 'uploadAll',
      //   url: '/upload',
      //   method: 'POST',
      //   data: { foo: 'bar' }
      // };
      // this.uploadInput.emit(event);
    } else if (output.type === 'addedToQueue' && typeof output.file !== 'undefined') { // add file to array when added
      console.log('Output:', output);
      this.previewImagem(output.file.nativeFile).then(response => {
        this.imagePreview.push(response); // The image preview
        this.ngxfiles.push(output.file);
      });
    } else if (output.type === 'uploading' && typeof output.file !== 'undefined') {
      // update current data in ngxfile array for uploading file
      const index = this.ngxfiles.findIndex(file => typeof output.file !== 'undefined' && file.id === output.file.id);
      this.ngxfiles[index] = output.file;

      console.log(output.file.progress.data.percentage);

    } else if (output.type === 'removed') {
      // remove file from array when removed
      this.ngxfiles = this.ngxfiles.filter((file: UploadFile) => file !== output.file);
    } else if (output.type === 'dragOver') {
      this.dragOver = true;
    } else if (output.type === 'dragOut') {
      this.dragOver = false;
    } else if (output.type === 'drop') {
      this.dragOver = false;
    } else if ( output.type === 'done') {

      this.observation.files.push({f: output.file.response._id, r: true});
      this.subject.update(this.observation);
    }
  }

  startUpload(): void {

    this.ngxfiles.forEach(file => {
      let event: UploadInput = {
        type: 'uploadFile',
        url: '/api/v1/files/',
        method: 'POST',
        headers: { 'Authorization': 'Basic ' + this.token },
        file: file,
        data: {
          ref: 'observations' ,
          ref_id: this.observation._id,
          content_type: file.type,
          name: file.name,
          size: String(file.size),
          owner: String(this.userid) }
      };
      
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
