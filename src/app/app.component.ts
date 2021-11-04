import { Component } from '@angular/core';
import * as L from 'leaflet';
import { RawResult } from 'leaflet-geosearch/dist/providers/openStreetMapProvider';
import { SearchResult } from 'leaflet-geosearch/dist/providers/provider';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  latLngs: L.LatLng[] = [L.latLng(41.8901622,12.4998408)];
  geoCodes : SearchResult<RawResult>[] = [];



  onMappaClicked(position: L.LatLng) : void{
    console.log('onMappaClicked', position);
    this.latLngs = [...this.latLngs, position];
  }

  onMarkerClicked(position: L.LatLng) : void{
    console.log('onMarkerClicked', position);

   this.latLngs = this.latLngs.filter(latLng => !latLng.equals(position));
  }

  onGeocodeResults(geocodes : SearchResult<RawResult>[]) : void{
    this.geoCodes = geocodes;
  }

  onAddMarkerOn(geoCode: SearchResult<RawResult>): void{
    const latLng =L.latLng(parseFloat(geoCode.raw.boundingbox[0]),parseFloat( geoCode.raw.boundingbox[2]));

    this.latLngs = [...this.latLngs, latLng];
  }
}
