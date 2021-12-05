import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { PuntoSullamappa } from 'src/puntosullamappa.model';
import { Feature, GeocodeautompleteResModel } from './models/geocodeautomplete.req.model';
import { MappaService } from './services/mappa.service';
import { OpenRouteService } from './services/openroute.service';
import { PuntiMappaService } from './services/punti-mappa.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  punti: PuntoSullamappa[] = [];

  geoCodes: GeocodeautompleteResModel | undefined;

  fromMap: L.LatLng|undefined;
  toMap: L.LatLng|undefined;

  constructor(private puntiService: PuntiMappaService, private openRouteService: OpenRouteService, private mappService: MappaService) {
  }

  ngOnInit(): void {
    this.puntiService.getPuntiMappa$().subscribe(punti => {
      this.punti = punti;
    });

  }


  onMappaClicked(position: L.LatLng): void {
    console.log('onMappaClicked', position);
    this.puntiService.addPuntoMappa(position);


  }


  onGeocodeResults(geocodes: GeocodeautompleteResModel): void {
    this.geoCodes = geocodes;
  }

  onAddMarkerOn(geoCode: Feature): void {
    const latlng = L.latLng(geoCode.geometry.coordinates[1], geoCode.geometry.coordinates[0]);

    this.puntiService.addPuntoMappa(latlng);

  }

  onFromMap(geoCode: Feature): void {
    this.fromMap = L.latLng(geoCode.geometry.coordinates[1], geoCode.geometry.coordinates[0]);

  }
  onToMap(geoCode: Feature): void {
    this.toMap = L.latLng(geoCode.geometry.coordinates[1], geoCode.geometry.coordinates[0]);
  }

  onCalculateDirections(): void{

    if (this.fromMap && this.toMap) {
      const from = [this.fromMap.lng, this.fromMap.lat];
      const to= [this.toMap.lng, this.toMap.lat];
      this.openRouteService.getDirections([from, to]).subscribe( geoJson=>{
        console.log(geoJson);
        this.mappService.setGeoJson(geoJson);
      });
    }
  }
}
