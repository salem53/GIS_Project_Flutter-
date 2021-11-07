import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {
  private apiServerUrl= environment.apiBaseUrl;
  constructor(private http: HttpClient) {
    
  }

  makeMarker(map: L.Map,pt:L.LatLng): void {
     const marker = L.marker(pt);
     marker.addTo(map);
   }

   makeMarkers(map: L.Map,pts:string):void  {
    this.http.get(pts).subscribe((res: any) => {
        for (const c of res.features) {
          const lon = c.geometry.coordinates[0];
          const lat = c.geometry.coordinates[1];
          this.makeMarker(map,L.latLng(lat,lon));
        }
      });
  }
  showMarkers(map:L.Map,data:any){

    for (const c of data.features) {
      const pos = c.geometry.coordinates;
      pos.forEach(e => {
        this.makeMarker(map,L.latLng(e[0],e[1]));
        
      });
          
  }

 
}
 
}
