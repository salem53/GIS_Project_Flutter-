import { Session } from './map/map.component';
import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import { saveAs } from 'file-saver';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

    @Injectable({
      providedIn: 'root'
    })
    export class getjsonService {
    

      constructor(private http:HttpClient) {
      }

      
      public GetGeoJSON():Observable<any>{
        return this.http.get<any>('http://localhost:8081/${trajetId}')
    }  
      
    
    
     
      
    }