import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { RawResult } from 'leaflet-geosearch/dist/providers/openStreetMapProvider';
import { SearchResult } from 'leaflet-geosearch/dist/providers/provider';
import { PuntiMappaService } from './services/punti-mappa.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  latLngs : L.LatLng[] = [];

  geoCodes : SearchResult<RawResult>[] = [];

  /**
   *
   */
  constructor(private puntiService: PuntiMappaService) {



  }
  ngOnInit(): void {
    this.latLngs = this.puntiService.getPuntiMappa();
  }


  onMappaClicked(position: L.LatLng) : void{
    console.log('onMappaClicked', position);
    // this.latLngs = [...this.latLngs, position];
    this.puntiService.addPuntoMappa(position);
    this.latLngs = this.puntiService.getPuntiMappa();
  }

  onMarkerClicked(position: L.LatLng) : void{

    console.log('onMarkerClicked', position);

    this.puntiService.removePuntoMappa(position);
    this.latLngs = this.puntiService.getPuntiMappa();
  }

  onGeocodeResults(geocodes : SearchResult<RawResult>[]) : void{
    this.geoCodes = geocodes;
  }

  onAddMarkerOn(geoCode: SearchResult<RawResult>): void{
    const latLng =L.latLng(parseFloat(geoCode.raw.boundingbox[0]),parseFloat( geoCode.raw.boundingbox[2]));

    this.puntiService.addPuntoMappa(latLng);
    this.latLngs = this.puntiService.getPuntiMappa();
  }
}
