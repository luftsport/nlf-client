import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { ApiNlfClubsService } from 'app/api/api-nlf-clubs.service';
import { ApiLocationsService } from 'app/api/api-locations.service';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GeoLocationService } from 'app/services/geo/geo-location.service';
import { ApiLocationItem, NlfConfigItem } from 'app/api/api.interface';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { debounce } from 'ts-debounce';
import { NlfAlertService } from 'app/services/alert/alert.service';
import { NlfConfigService } from 'app/nlf-config.service';
import { ConfirmService } from 'app/services/confirm/confirm.service';
import { forkJoin } from 'rxjs';
// Seee https://stackoverflow.com/questions/48865595/is-there-a-way-to-set-the-bounds-and-zoom-level-in-agm-map
//import { AgmMap } from '@agm/core';

@Component({
  selector: 'nlf-organization-locations',
  templateUrl: './organization-locations.component.html',
  styleUrls: ['./organization-locations.component.css']
})
export class NlfOrganizationLocationsComponent implements OnInit, OnDestroy {

  org_id: number;
  org
  sub;
  modalRef;
  modalIndex: number = 0;
  modalValue: ApiLocationItem;

  currentLocation: ApiLocationItem;

  locationTypes: [];
  returl: string;

  fitBounds: boolean = true;

  zoom: number = 17;
  userGeo;

  types = [
    { key: 'landing_area', val: 'Landingsområde' },
    { key: 'landing_area_out', val: 'Landingsområde Innhopp' },
    { key: 'club_house', val: 'Klubbhus' },
    { key: 'airstrip', val: 'Rullebane' },
    { key: 'taxi_way', val: 'Taxi bane' }
  ];

  public config: NlfConfigItem;

  public debouncedSaveLocations = debounce(this.saveLocations, 3000);

  constructor(
    private orgService: ApiNlfClubsService,
    private router: Router,
    private route: ActivatedRoute,
    private locationsService: ApiLocationsService,
    private modalService: NgbModal,
    private geoLocationService: GeoLocationService,
    private alertService: NlfAlertService,
    private confirmService: ConfirmService,
    private configService: NlfConfigService
  ) {

    forkJoin([
      this.sub = this.route.parent.params.subscribe(params => {
        this.org_id = +params['id'];
      }),
      this.configService.observableConfig.subscribe(
        data => {
          this.config = data;
          this.getOrg();
        }
      ),
      this.geoLocationService.getLocation({ enableHighAccuracy: true }).subscribe(
        position => {
          console.log(position);
          try {
            if (!!this.currentLocation.geo.coordinates) {

            }
          } catch (err) {
            this.userGeo = { geo: { type: 'Point', coordinates: [position.coords.latitude || 59.9, position.coords.longitude] || 10.9 } };
            this.currentLocation = this.userGeo;
            console.log('Catched', err);
          }
        },
        err => {
          console.log('ERR Position', err);
        },
        () => {

        }
      )
    ]);


    this.route.queryParams.subscribe(
      params => { this.returl = params['returl'] }
    );



    /**
    this.route.params.subscribe(params => {
      this.org_id = params['id'] ? params['id'] : 0;
      this.getOrg();
      //this.app.setTitle(' Organization locations edit');
    });**/
  }

  ngOnInit() {
  }

  public goTo(location) {
    this.currentLocation = location;
    this.zoom = 12;
  }

  public mapReset() {
    this.currentLocation = this.userGeo;
    this.fitBounds = true;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  public getFederation(activity) {
    return this.config[this.config.inv_mapping[this.org]]['org_id'];
  }


  public drop(event) {
    console.log('DROP EVENT', event);
    moveItemInArray(this.org.locations, event.previousIndex, event.currentIndex);
    this.debouncedSaveLocations();
  }


  public toFloat(arg) {
    return parseFloat(arg);
  }

  private getOrg() {
    this.orgService.getClub(this.org_id).subscribe(
      data => {
        this.org = data;
      },
      err => console.log(err),
      () => { }
    );
  }

  public saveLocations() {
    this.orgService.save(this.org._id, { locations: this.org.locations }, this.org._etag).subscribe(
      data => {
        this.org._etag = data._etag;
        this.alertService.success('Locations saved', false, true, 5);
      },
      err => {
        console.log('ERR saving', err);
        this.alertService.error('Locations could not be saved', false, true, 5);
      },
      () => { }
    );

  }

  public deleteLocation(idx) {

    const confirmMsg = {
      title: 'Please confirm',
      message: 'Are you sure you want to delete the location?',
      yes: 'Delete',
      no: 'Cancel'
    };
    this.confirmService.confirm(confirmMsg).then(
      () => {
        if (idx < this.org.locations.length) {
          this.org.locations.splice(idx, 1);
          this.saveLocations();
        }
      },
      () => { }
    );


  }

  public onLocationSelected(event) {

    if (!!this.modalValue) {

      if (!this.modalValue.nickname) {
        this.modalValue['nickname'] = this.modalValue.name;
      }
    }
  }

  public openModal(template, idx) {
    this.modalIndex = idx;
    if (idx == this.org.locations.length) {
      /*
      "icao": "ENTO",
    "municipality": "Tønsberg",
    "geo_type": "Flyplass",
    "name": "Jarlsberg flyplass",
    "county": "Vestfold",
    "geo": {
      "coordinates": [
        "59.300875",
        "10.366902777777778"
      ],
      "type": "Point"
    },
    "nickname": "Jarlsberg"
    */
      this.modalValue = { nickname: undefined, name: undefined, icao: undefined, geo_type: undefined, geo: undefined, municipality: undefined, county: undefined };
      this.modalValue['geo'] = this.currentLocation.geo;
    } else {
      this.modalValue = this.org.locations[idx];
    }
    this.modalRef = this.modalService.open(template, { size: 'lg', backdrop: 'static', keyboard: false });
  }

  public updateLocation(event) {
    console.log('Updated event', event);
    if (!!this.modalValue) {
      this.modalValue.geo = { type: 'Point', coordinates: [event.coords.lat, event.coords.lng] };
    }
  }




  public modalUpdate(idx) {
    if (idx == this.org.locations.length) {
      this.org.locations.push(this.modalValue);
    } else {
      this.org.locations[idx] = this.modalValue;
    }
    this.saveLocations();
    this.modalValue = undefined;
    this.modalRef.close();
  }

}
