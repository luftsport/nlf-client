import { Component, OnInit, Input } from '@angular/core';
import { ApiAirportsService } from 'app/api/api-airports.service';
import { ApiOptionsInterface, ApiAirport } from 'app/api/api.interface';

@Component({
  selector: 'nlf-aip-airport-near',
  templateUrl: './aip-airport-near.component.html',
  styleUrls: ['./aip-airport-near.component.css']
})
export class NlfAipAirportNearComponent implements OnInit {

  @Input() latitude: number;
  @Input() longitude: number;
  @Input() distance: number = 100000;
  @Input() show_distance: boolean = true;

  public airports: ApiAirport[];
  public dataReady = false;

  constructor(
    private airportService: ApiAirportsService
  ) { }

  ngOnInit() {
    const options: ApiOptionsInterface = {
      query: {
        where: {
          "location": {
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
    this.airportService.getAirports(options).subscribe(
      airports => {
        this.airports = airports['_items'];
        if (this.show_distance) {
          this.airports.forEach(
            (airport, index) => {
              this.airports[index]['location']['distance'] = this.calculateDistance(this.latitude, this.longitude, airport.location.coordinates[1], airport.location.coordinates[0]);
            }
          )
        }
        this.dataReady = true;
      },
      err => console.log(err));


  }

  public calculateDistance(lat1: number, long1: number, lat2: number, long2: number) {
    let p = 0.017453292519943295;    // Math.PI / 180
    let c = Math.cos;
    let a = 0.5 - c((lat1 - lat2) * p) / 2 + c(lat2 * p) * c((lat1) * p) * (1 - c(((long1 - long2) * p))) / 2;
    let dis = (12742 * Math.asin(Math.sqrt(a))); // 2 * R; R = 6371 km
    return Math.round(dis);
  }

}
