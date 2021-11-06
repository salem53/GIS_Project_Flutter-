import { Component, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import * as L from 'leaflet';
import { MarkerService } from '../marker.service';
import { LocationService } from '../location.service';
import { interval, Subscription } from 'rxjs';
import { GeoJsonService } from '../geojson.service';


export interface Session {
  traject_name:string;
  times:Array<Date>;
  user_id:number;
  positions:Array<any>;
}

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit,OnDestroy {
  private map;
  subscription: Subscription;
  private session:Session={
    traject_name:"",
    times:[],
    user_id:1,
    positions:[]
 };
  private initMap(): void {
      
    this.map = L.map('map', {
    center: [ 39.8282, -98.5795 ],
    zoom: 3
    });
    
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    this.map.whenReady(() => {
      setTimeout(() => {
        this.map.invalidateSize();
      }, 1000);
    }); 
    tiles.addTo(this.map);

  }

  constructor(private markerService: MarkerService, private locationService: LocationService,private geojsonService:GeoJsonService) { }

  start():void{
    const source = interval(3000);
    this.subscription = source.subscribe(val => this.locationService.getPosition().then(pos=>
      {
         console.log(`Positon: ${pos.lng} ${pos.lat}`);
         this.markerService.makeMarker(this.map,L.latLng(pos.lat,pos.lng));
         this.session.positions.push([pos.lat,pos.lng]);
           this.session.times.push(new Date());
      }) );
    console.log(this.session);

  }
  ngOnInit(): void {
    this.initMap();
   }

  stop():void{              
    this.subscription.unsubscribe();
    console.log("session in stop",this.session);
  }

 ngOnDestroy(){
   this.subscription.unsubscribe();
  console.log("session in stop",this.session);
  }
  download(name_traject:string=""){
    this.geojsonService.downloadGeoJson(name_traject);
   }
   save(){
        
        console.log("GeoJson To save")
        console.log(this.geojsonService.sendGeoJson(this.session));
        this.geojsonService.downloadGeoJson("");

      }

  show(){
    //Json object from the back
    //just to test
    const data={"type":"FeatureCollection","name":"test123456","features":[{"type":"Feature","properties":{"dateTime":[],"user":{"id":12345}},"geometry":{"type":"LineString",
    
    
    "coordinates":[[36.809368,10.095654],[37.809368,10.095654],[36.809368,11.095654]]
    
    
    }}]}
    this.markerService.showMarkers(this.map,data);
    


  }
     
  
}     