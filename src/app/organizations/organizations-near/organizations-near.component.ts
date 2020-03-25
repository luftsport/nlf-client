import { Component, OnInit, Input } from '@angular/core';
import { LungoOrganizationsService } from 'app/api/lungo-organizations.service';
import { LungoOrganizationsItem } from 'app/api/lungo.interface';
import { ApiClubItem, ApiOptionsInterface } from 'app/api/api.interface';

@Component({
  selector: 'nlf-organizations-near',
  templateUrl: './organizations-near.component.html',
  styleUrls: ['./organizations-near.component.css']
})
export class NlfOrganizationsNearComponent implements OnInit {

  @Input() latitude: number;
  @Input() longitude: number;
  @Input() distance: number = 100000;
  @Input() show_distance: boolean = true;

  public organizations: LungoOrganizationsItem[];
  public dataReady = false;

  constructor(
    private lungoOrgService: LungoOrganizationsService
  ) { }

  ngOnInit() {
    const options: ApiOptionsInterface = {
      query: {
        where: {
          type_id: { $in: [2, 14, 19] },
          "activities.id": {$in: [27, 109, 238, 235, 237, 110, 111, 236]},
          //"contact.location.geo": { $geoWithin: { $centerSphere: [[this.longitude, this.latitude], this.distance / 6378.1] } }
          "contact.location.geo": {
            $nearSphere: {
              $geometry: {
                type: "Point",
                coordinates: [this.longitude, this.latitude]
              },
              //$minDistance: 10,
              $maxDistance: this.distance
            }
          }
        },
        max_results: 10
      }
    }
    this.lungoOrgService.getOrganizations(options).subscribe(
      data => {
        this.organizations = data['_items'];
        if (this.show_distance) {
          this.organizations.forEach(
            (org, index) => {
              this.organizations[index]['contact']['location']['distance'] = this.calculateDistance(this.latitude, this.longitude, org.contact.location.geo.coordinates[1], org.contact.location.geo.coordinates[0]);
            }
          )
        }
        this.dataReady = true;
      }
    )

  }

  public calculateDistance(lat1: number, long1: number, lat2: number, long2: number) {
    let p = 0.017453292519943295;    // Math.PI / 180
    let c = Math.cos;
    let a = 0.5 - c((lat1 - lat2) * p) / 2 + c(lat2 * p) * c((lat1) * p) * (1 - c(((long1 - long2) * p))) / 2;
    let dis = (12742 * Math.asin(Math.sqrt(a))); // 2 * R; R = 6371 km
    return Math.round(dis);
  }

}
