import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { RawResult } from 'leaflet-geosearch/dist/providers/openStreetMapProvider';
import { SearchResult } from 'leaflet-geosearch/dist/providers/provider';
import { PuntoSullamappa } from 'src/puntosullamappa.model';
import { PuntiMappaService } from './services/punti-mappa.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  punti : PuntoSullamappa[] = [];

  geoCodes : SearchResult<RawResult>[] = [];

  /**
   *
   */
  constructor(private puntiService: PuntiMappaService) {



  }
  ngOnInit(): void {
    this.punti = this.puntiService.getPuntiMappa();
  }


  onMappaClicked(position: L.LatLng) : void{
    console.log('onMappaClicked', position);
    // this.latLngs = [...this.latLngs, position];
    this.puntiService.addPuntoMappa(position);
    this.punti = this.puntiService.getPuntiMappa();
  }

  onMarkerClicked(position: L.LatLng) : void{

    console.log('onMarkerClicked', position);

    this.puntiService.removePuntoMappa(position);
    this.punti = this.puntiService.getPuntiMappa();
  }

  onGeocodeResults(geocodes : SearchResult<RawResult>[]) : void{
    this.geoCodes = geocodes;
  }

  onAddMarkerOn(geoCode: SearchResult<RawResult>): void{
    const latLng =L.latLng(parseFloat(geoCode.raw.boundingbox[0]),parseFloat( geoCode.raw.boundingbox[2]));

    this.puntiService.addPuntoMappa(latLng);
    this.punti = this.puntiService.getPuntiMappa();
  }
}
