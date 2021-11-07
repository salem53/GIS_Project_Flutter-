import { Injectable } from '@angular/core';
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor() {
  }

  getPosition(): Promise<any>
  {
    return new Promise((resolve, reject) => {

      navigator.geolocation.getCurrentPosition(resp => {

          resolve({lng: resp.coords.longitude, lat: resp.coords.latitude});
        },
        err => {
          reject(err);
        });
    });

  }

  /*addPosition():void {

    const geoJson = [{
        'type': 'Feature',
        'geometry': {
          'type': 'Point',
          'coordinates': ['80.20929129999999', '13.0569951']
        },
        'properties': {
          'message': 'Chennai'
        }
      }]
  }*/
  

 
}
