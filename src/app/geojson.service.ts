import { Session } from './map/map.component';
import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import { saveAs } from 'file-saver';

    @Injectable({
      providedIn: 'root'
    })
    export class GeoJsonService {
    

      constructor() {
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
      downloadGeoJson(name_traject:string){
        //GET a geojson object from the back corresponding to that name_traject
        /////////////////////////////////////////
        //to test
        const geoJson={
          "type": "FeatureCollection",
          "name":"test123456",
          "features": [
          { "type": "Feature",
           "properties": {  "dateTime":[], "user": { "id" :12345}  },
            "geometry": { "type": "LineString", "coordinates":[10.2,12]} }
          ]}
        const strJson=  JSON.stringify(geoJson);
        const blob = 
        new Blob([strJson
        ], 
                 {type: "text/plain;charset=utf-8"})
        saveAs(blob,"test.geojson"); 
        


      }
    
     
      
    }
    