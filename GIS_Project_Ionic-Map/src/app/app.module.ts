import { MapComponent } from './map/map.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MarkerService } from './marker.service';
import { LocationService } from './location.service';
import { AuthentService } from './authent.service';
import { HomePage } from './home/home.page';
import { RegisterPage } from './auth/register/register.page';
import { LoginPage } from './auth/login/login.page';
import { GeoJsonService } from './geojson.service';

@NgModule({
  declarations: [AppComponent,MapComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [MarkerService,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },GeoJsonService,AuthentService],
  bootstrap: [AppComponent,MapComponent]
})
export class AppModule {}
