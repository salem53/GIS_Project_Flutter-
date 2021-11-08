import { Component, OnInit } from '@angular/core';
import { AuthentService } from '../authent.service';
import { GeoJsonService } from '../geojson.service';
import { LocationService } from '../location.service';
import { MapComponent } from '../map/map.component';
import { MarkerService } from '../marker.service';


@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  template: `
  <div>
    <h1>History</h1>
    <ul>
      <li *ngFor="let trajet of this.trajets">{{ trajet.id }}
      <ion-button (click)="showTrajet()">show</ion-button>
      <ion-button (click)="downloadTrajet(trajet.id)" >download</ion-button>
      </li>
    </ul>
    <div class="map-container">
    <div class="map-frame">
      <div id="map"></div>
    </div>
  </div>
  </div>
`,
  styleUrls: ['./history.page.scss'],
})

export class HistoryPage implements OnInit {
  private trajets:[];

  private Map1:MapComponent;

  constructor(private authentService:AuthentService,private geoService:GeoJsonService,private markerService: MarkerService, private locationService: LocationService,private geojsonService:GeoJsonService,private authetService:AuthentService ) {
    this.Map1=new MapComponent(markerService, locationService,geojsonService, authetService);
   }

  ngOnInit() {
    this.trajets=this.getTrajets();
    

    
  }
  getTrajets():any{
    this.authentService.getTrajets(1).subscribe(
      res=>{
       console.log(res);
       this.trajets=res;
  
    })
 }
 downloadTrajet(id:number){
  for (const element of this.trajets) {
    
    if(element['id']==id){
      console.log("hello luv "+element['id']);
      this.geoService.downloadGeoJson(element);
    }
  }

 }
showTrajet(){
  this.Map1.ngOnInit();
}

}
