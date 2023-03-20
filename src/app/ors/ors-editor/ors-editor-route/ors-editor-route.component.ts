import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nlf-ors-editor-route',
  templateUrl: './ors-editor-route.component.html',
  styleUrls: ['./ors-editor-route.component.css']
})
export class NlfOrsEditorRouteComponent implements OnInit {
  public latitude: number;
  public longitude: number;
  public maxSpeed: number;
  public zoom: number;
  public polyline: Array<any>;
  public polylines: Array<any>;
  constructor(
    // private mapsAPILoader: MapsAPILoader,
  ) { }

  ngOnInit() {
    this.zoom = 5;
    this.maxSpeed = 40;
    this.latitude = 59.3002381;
    this.longitude = 10.367592800000011;

    this.polyline = [
      {
        latitude: 59.3002381,
        longitude: 10.367592800000011,
        speed: 50
      },
      {
        latitude: 59.182446,
        longitude: 10.256912,
        speed: 50
      },
      {
        latitude: 59.970737,
        longitude: 11.039221,
        speed: 20
      },
      {
        latitude: 60.19755,
        longitude: 11.100415,
        speed: 20
      },
      {
        latitude: 61.009102,
        longitude: 9.294345,
        speed: 20
      },
      {
        latitude: 59.566102,
        longitude: 9.218067,
        speed: 25
      }
    ];
    this.polylines = this.rebuildPolylines();


    // set current position
    this.setCurrentPosition();

    // load Places Autocomplete
    //this.mapsAPILoader.load().then(() => {
    //});
  }
  private rebuildPolylines() {
    let polylines = [];
    let i = 0;
    let newPolyline = { path: [], color: 'blue' };
    for (let point of this.polyline) {
      console.log(point);
      newPolyline.path.push(point);
      const speedChanged = this.polyline[i + 1] && (point.speed < this.maxSpeed && this.polyline[i + 1].speed < this.maxSpeed) || (point.speed > this.maxSpeed && this.polyline[i + 1].speed > this.maxSpeed)
      if (point.speed > this.maxSpeed) {
        newPolyline.color = 'red';
      }
      if (speedChanged) {
        newPolyline.path.push(this.polyline[i + 1]);
        polylines.push(newPolyline);
        newPolyline = { path: [], color: 'blue' };
      }
      i++;
    }
    console.log(polylines);
    return polylines;

  }
  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        //this.zoom = 2;
      });
    }
  }
}

