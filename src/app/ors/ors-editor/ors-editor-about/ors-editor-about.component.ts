import { Component, Inject } from '@angular/core';
import { NlfOrsEditorService } from 'app/ors/ors-editor/ors-editor.service';
import { ApiObservationsItem, ApiObservationsMotorflyItem, ApiObservationsFallskjermItem } from 'app/api/api.interface';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'environments/environment';
import { ApiAclService } from 'app/api/api-acl.service';
import { NlfConfigService } from 'app/nlf-config.service';
import { NlfConfigItem } from 'app/api/api.interface';
import { faBan, faCheck, faRandom } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { has as _has } from "lodash";

@Component({
  selector: 'nlf-ors-editor-about',
  templateUrl: './ors-editor-about.component.html',
  styleUrls: ['./ors-editor-about.component.css']
})
export class NlfOrsEditorAboutComponent {

  isWorkflowTimelineCollapsed = false;
  ENV = environment;

  public observation; //: ApiObservationsItem;
  public config: NlfConfigItem;

  acl_list;

  faBan = faBan;
  faCheck = faCheck;
  faRandom = faRandom;
  faClock = faClock;

  constructor(
    private subject: NlfOrsEditorService,
    public activeModal: NgbActiveModal,
    private aclService: ApiAclService,
    private configSubject: NlfConfigService
) {

    this.configSubject.observableConfig.subscribe(
      config => {
        this.config = config;
        console.log('[CONFIG]', config);
      }
    );

    this.subject.observableObservation.subscribe(observation => {
      this.observation = observation;

      if (_has(this.observation, 'workflow.state') && this.observation['workflow']['state'] != 'closed') {
        this.getAclUsers();
      }
    });
  }


  private getAclUsers() {

    this.aclService.getAclUserList(this.observation._model.type + '_observations', this.observation._id).subscribe(
      data => {
        this.acl_list = data;
      },
      err => console.log('ACL User list', err),
      () => { }
    )
  }
}
