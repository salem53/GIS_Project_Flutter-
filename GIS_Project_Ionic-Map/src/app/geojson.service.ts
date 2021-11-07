import { Session } from './map/map.component';
import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import { saveAs } from 'file-saver';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

    @Injectable({
      providedIn: 'root'
    })
    export class GeoJsonService {
      
    

      constructor(private http:HttpClient) {
      }

      sendGeoJson(S:Session):string{

       const data ={
            "type": "FeatureCollection",
            "name":S.traject_name,
            "features": [
            { "type": "Feature",
             "properties": {  "dateTime":S.times, "user": { "id" :S.user_id}  },
              "geometry": { "type": "LineString", "coordinates":S.positions} }
            ]}
        return JSON.stringify(data);

      
      }
            
      public GetGeoJSON():Observable<any>{
        return this.http.get<any>('http://localhost:8081/${trajetId}')
    }  
      downloadGeoJson(name_traject:string){
        //GET a geojson object from the back corresponding to that name_traject
        /////////////////////////////////////////
        
         this.GetGeoJSON().subscribe((geoJson)=>{
        //to test
      
        // const geoJson={
        //   "type": "FeatureCollection",
        //   "name":"test123456",
        //   "features": [
        //   { "type": "Feature",
        //    "properties": {  "dateTime":[], "user": { "id" :12345}  },
        //     "geometry": { "type": "LineString", "coordinates":[10.2,12]} }
        //   ]}
        const strJson=  JSON.stringify(geoJson);
        const blob = 
        new Blob([strJson
        ], 
                 {type: "text/plain;charset=utf-8"})
        saveAs(blob,"test.geojson"); 
        
      })

      }
    
     
      
    }
    