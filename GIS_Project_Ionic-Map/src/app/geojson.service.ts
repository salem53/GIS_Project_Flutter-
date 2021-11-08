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

      sendGeoJson(S:Session):Observable<any>{

       const data ={
            "type": "FeatureCollection",
            "name":S.traject_name,
            "features": 
               { "type": "Feature",
               "properties": {  "dateTime":S.times, "idUser" :S.user_id}  ,
               "geometry": { "type": "LineString", "coordinates":S.positions}
               }
            
          }
        return this.http.post<any>('http://localhost:8081/trajet',data)
      
      }
            
    //   public GetGeoJSON():Observable<any>{
    //     return this.http.get<any>('http://localhost:8081/${trajetId}')
    // }  
      downloadGeoJson(data:any){
        //GET a geojson object from the back corresponding to that name_traject
        /////////////////////////////////////////

        const strJson=  JSON.stringify(data);
        const blob = 
        new Blob([strJson
        ], 
                 {type: "text/plain;charset=utf-8"})
        saveAs(blob,"test.geojson"); 
        
      

      }
    
     
      
    }
    