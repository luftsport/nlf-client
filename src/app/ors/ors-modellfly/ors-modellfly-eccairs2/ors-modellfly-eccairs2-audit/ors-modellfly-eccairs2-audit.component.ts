import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { NlfConfigService } from 'app/nlf-config.service';
import { NlfOrsEditorService } from 'app/ors/ors-editor/ors-editor.service';
import { ApiAirportsService } from 'app/api/api-airports.service';
import { ApiOptionsInterface, ApiObservationsItem, ApiAirport, ApiAirports, ApiObservationAircraftsItem, NlfConfigItem } from 'app/api/api.interface';
import { distinctUntilChanged, debounceTime, switchMap, tap, catchError, map } from 'rxjs/operators';
import { Subject, Observable, of, concat } from 'rxjs';
import { GeoLocationService } from 'app/services/geo/geo-location.service';
import { ApiCacheService } from 'app/api/api-cache.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmService } from 'app/services/confirm/confirm.service';
import { ApiE5xService } from 'app/api/api-e5x.service';
import { ApiFilesService } from 'app/api/api-files.service';
import { NlfAuthSubjectService } from 'app/services/auth/auth-subject.service';
import { get, cleanE5XObject, deepCopy, pad } from 'app/interfaces/functions';
import { environment } from 'environments/environment';
import { faHistory, faDownload, faCheck, faCogs, faBan, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faFileAlt, faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { forkJoin } from 'rxjs';



@Component({
  selector: 'nlf-ors-modellfly-eccairs2-audit',
  templateUrl: './ors-modellfly-eccairs2-audit.component.html',
  styleUrls: ['./ors-modellfly-eccairs2-audit.component.css']
})
export class NlfOrsModellflyEccairs2AuditComponent implements OnInit {


  @Input() showEmpty: boolean;

  modalRef;
  observation: ApiObservationsItem;
  e5xobservation;
  generating = false;
  token: string;
  e5xFile = false;
  e5xResult;
  person_id: number;

  e5x_enabled = true;

  ENV = environment;
  public config: NlfConfigItem;


  allowedReportStatus = { 2: 'open', 3: 'closed' }; // 2=open, 3=closed
  allowedStatusKeys = [];


  faHistory = faHistory;
  faDownload = faDownload;
  faCheck = faCheck;
  faFileAlt = faFileAlt;
  faPaperPlane = faPaperPlane;
  faCogs = faCogs;
  faBan = faBan;
  faTimes = faTimes;

  constructor(
    private modalService: NgbModal,
    private subject: NlfOrsEditorService,
    public authSubject: NlfAuthSubjectService
  ) {
  }

  ngOnInit(): void {
    forkJoin([
      this.authSubject.observableAuthData.subscribe(
        data => {
          this.person_id = data?.person_id || undefined;
          try {
            this.token = data.token;
          } catch {
            this.token = undefined;
          }
        }
      ),
      this.subject.observableObservation.subscribe(
        observation => this.observation = observation,
        err => console.error('Could not get observation subject', err),
        () => { }
      )
    ]);
  }

  public openModal(template) {
    this.modalRef = this.modalService.open(template, { size: 'lg', backdrop: 'static', keyboard: false });
  }

  public closeModal(index) {
    this.modalRef.close();
  }


}
