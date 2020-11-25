//declare var google: any;
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiObservationsService } from 'app/api/api-observations.service';
import { ApiOptionsInterface, NlfConfigItem } from 'app/api/api.interface';
import { google } from 'google-maps';
import { calculateRating } from 'app/interfaces/functions';
//import { GoogleMapsAPIWrapper } from '@agm/core';

//import { google } from 'google-maps';
//declare var google: any;
//import {} from 'googlemaps';

@Component({
  selector: 'nlf-ors-stats-heatmap',
  templateUrl: './ors-stats-heatmap.component.html',
  styleUrls: ['./ors-stats-heatmap.component.css']
})
export class NlfOrsStatsHeatmapComponent implements OnInit {

  private map: google.maps.Map = null;
  private heatmap: google.maps.visualization.HeatmapLayer = null;
  private coords = []; //google.maps.LatLng[] = [];
  public dataReady: boolean = false;
  organization_id: number = 0;
  activity: string;
  sub; // The route subscription

  // Heatmap settings
  private radius: number = 50;

  constructor(
    //public mapApiWrapper:GoogleMapsAPIWrapper,
    private route: ActivatedRoute,
    private orsService: ApiObservationsService
  ) {

    this.sub = this.route.params.subscribe(params => {
      this.organization_id = params['id'] ? +params['id'] : 0;
      this.activity = params['activity'] ? params['activity'] : 'fallskjerm';
    });
  }

  ngOnInit() {

    //this.mapApiWrapper.getNativeMap().then((map)=> {

    this.orsService.setActivity(this.activity);
    this.dataReady = true
    // "location" : { "geo" : { "coordinates" : [ 60.81935432539702, 11.066810783047117 ], "type" : "Point" } }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }


  private getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }

  public onMapLoad(mapInstance: google.maps.Map) {

    console.log('Coordinates', this.coords);

    this.map = mapInstance;

    // here our in other method after you get the coords; but make sure map is loaded

    let options: ApiOptionsInterface = {
      query: {
        where: {},
        projection: { "location.geo": 1, rating: 1 },
        max_results: 5000,
      },
    };

    if (this.organization_id>0 && this.activity === 'fallskjerm') {
      options.query.where = {discipline: this.organization_id}
    }

    this.orsService.getObservations(options).subscribe(
      data => {
        //this.data = data._items;
        // make coordinates:
        // NB .reverse() for coordinates!
        for (let i = 0; i < data._items.length; i++) {
          try {
            //this.coords.push({ location: new google.maps.LatLng(parseFloat(data._items[i]['location']['geo']['coordinates'][1]), parseFloat(data._items[i]['location']['geo']['coordinates'][0])), weight: this.getRandomInt(1, 10) })
            this.coords.push(
              {
                location: new google.maps.LatLng(data._items[i]['location']['geo']['coordinates'][0], data._items[i]['location']['geo']['coordinates'][1]),
                weight: calculateRating(data._items[i]['rating']['actual'], data._items[i]['rating']['potential'])
              }
            );
              //{lat:parseFloat(data._items[i]['location']['geo']['coordinates'][1]), lng: parseFloat(data._items[i]['location']['geo']['coordinates'][0])});
          } catch(err) {
          }

        }
        console.log('DATAREADY');
        console.log('NOW', this.coords);
        // can also be a google.maps.MVCArray with LatLng[] inside
        this.heatmap = new google.maps.visualization.HeatmapLayer({
          map: this.map,
          data: this.coords,
          //dissipating: , // true
          //maxIntensity: ,
          //opacity: , // 0-1
          radius: this.radius, // in pixels


        });
        console.log('Hurra meg rundt en elg');


        /***
        this.coords = data._items.map(
          item => {
            //console.log('ITEM', item['location']['geo']['coordinates'][1], item['location']['geo']['coordinates'][0]);
            //return {lat: parseFloat(item['location']['geo']['coordinates'][1]), lng: parseFloat(item['location']['geo']['coordinates'][0])};
            //new google.maps.LatLng(parseFloat(item['location']['geo']['coordinates'][1]), parseFloat(item['location']['geo']['coordinates'][0]));
            try {
              ({ location: new google.maps.LatLng(item['location']['geo']['coordinates'][1], item['location']['geo']['coordinates'][0]),weight: 3 })
            } catch {
              ({ location: null, weight: 0})
            }
            //{ lat: parseFloat(item['location']['geo']['coordinates'][1]), lng: parseFloat(item['location']['geo']['coordinates'][0]) };
            //console.log(ll);
            //return {lat: 1, lng: 2}; //ll;
          }
        ).filter( element => {
          element['location'] != null
        });

        this.dataReady = true
      },
      err => console.error(err),
      () => {
        // After first data is ready, do not load anymore
        ***/

      }
    );



  }


}
