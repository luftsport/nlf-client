import { Component, OnInit } from '@angular/core';
import { GeoLocationService, GeoLocationCoordinates } from 'app/services/geo/geo-location.service';
import { ApiAirportsService } from 'app/api/api-airports.service';
import { ApiNlfMetService } from 'app/api/api-nlf-met.service';
import { ApiMetarDict } from 'app/api/api.interface';
import {  get } from 'lodash';
@Component({
  selector: 'nlf-met-metar',
  templateUrl: './met-metar.component.html',
  styleUrls: ['./met-metar.component.css']
})
export class NlfMetMetarComponent implements OnInit {

  dataReady = false;
  error: string;
  geo: { timestamp: number, coords: GeoLocationCoordinates };
  metar: ApiMetarDict;
  _get = get;

  constructor(
    private geoLocationService: GeoLocationService,
    private airportService: ApiAirportsService,
    private metService: ApiNlfMetService
  ) {

    this.geoLocationService.getLocation({ enableHighAccuracy: true }).subscribe(
      position => {
        console.log(position);
        this.geo = position; // {{ geo.coords.latitude }} {{ geo.coords.longitude }}

        const airportOptions = {
          query: {
            where: {
              // type: { $in: ['medium_airport', 'large_airport', 'small_airport'] },
              type: { $ne: 'closed' },
              iata_code: { $ne: null },
              location: {
                $nearSphere:
                {
                  $geometry:
                  {
                    type: 'Point',
                    coordinates: [this.geo.coords.longitude, this.geo.coords.latitude]
                  },
                  $maxDistance: 1000000
                }
              }
            },
            max_results: 1,
            projection: { icao: 1 }
          }
        };
        this.airportService.getAirports(airportOptions).subscribe(
          airports => {
            if (airports._items.length === 1) {
              this.metService.getLastMetar(airports._items[0].icao).subscribe(
                metar => {
                  this.metar = metar;
                  this.dataReady = true;
                },
                err => {
                  this.error = err;
                  console.log(err);
                }
              );
            }
          }
        );


      },
      err => {
        console.log(err);
      }
    );
  }

  ngOnInit() {
  }

}

/**
 *
 http://127.0.0.1:8082/api/v1/airports?where=
 {"type": {"$in": ["medium_airport", "large_airport", "small_airport"]},
 "iata_code": {"$ne": null},
 "location": {"$nearSphere": {"$geometry": {"type":"Point", "coordinates": [6.4963, 60.6398]}, "$maxDistance": 1000000}}}&max_results=2

 then
 http://127.0.0.1:8082/api/v1/weather/met/metar/ENTO => {icao, metar}

   "metar": {
    "code": "ENTO 121620Z 21013KT 9000 -SNRA SCT007 BKN029 01/01 Q1017 TEMPO 4000 -SNRA BKN008",
    "type": "METAR",
    "mod": "AUTO",
    "station_id": "ENTO",
    "time": "2019-02-12T16:20:00",
    "cycle": 16,
    "wind_dir": {
      "_compass": null,
      "_degrees": 210.0
    },
    "wind_speed": {
      "_units": "KT",
      "_gtlt": null,
      "_value": 13.0
    },
    "wind_gust": null,
    "wind_dir_from": null,
    "wind_dir_to": null,
    "vis": {
      "_units": "M",
      "_gtlt": null,
      "_value": 9000.0,
      "_num": null,
      "_den": null
    },
    "vis_dir": null,
    "max_vis": null,
    "max_vis_dir": null,
    "temp": {
      "_units": "C",
      "_value": 1.0
    },
    "dewpt": {
      "_units": "C",
      "_value": 1.0
    },
    "press": {
      "_value": 1017.0,
      "_units": "MB"
    },
    "runway": [],
    "weather": [
      ["-", null, "SNRA", null, null]
    ],
    "recent": [],
    "sky": [
      ["SCT", {
        "_units": "FT",
        "_gtlt": null,
        "_value": 700.0,
        "_num": null,
        "_den": null
      }, null],
      ["BKN", {
        "_units": "FT",
        "_gtlt": null,
        "_value": 2900.0,
        "_num": null,
        "_den": null
      }, null]
    ],
    "windshear": [],
    "wind_speed_peak": null,
    "wind_dir_peak": null,
    "peak_wind_time": null,
    "wind_shift_time": null,
    "max_temp_6hr": null,
    "min_temp_6hr": null,
    "max_temp_24hr": null,
    "min_temp_24hr": null,
    "press_sea_level": null,
    "precip_1hr": null,
    "precip_3hr": null,
    "precip_6hr": null,
    "precip_24hr": null,
    "_trend": true,
    "_trend_groups": ["TEMPO", "4000", "-SNRA", "BKN008"],
    "_remarks": [],
    "_unparsed_groups": [],
    "_unparsed_remarks": [],
    "_now": "2019-02-12T16:25:47.428511",
    "_utcdelta": "1:00:00.000007",
    "_month": 2,
    "_year": 2019,
    "_day": 12,
    "_hour": 16,
    "_min": 20
  }
 */
