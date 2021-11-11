import { ElementRef, EventEmitter, Injectable } from '@angular/core';
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class MappaService {

   onMappaClicked: EventEmitter<L.LatLng> = new EventEmitter<L.LatLng>();
   onMarkerClicked: EventEmitter<L.LatLng> = new EventEmitter<L.LatLng>();

   _markers: L.Marker[] = [];


  private mappa: L.Map |undefined;

  constructor() { }


  initMappa(element: ElementRef): void{

    this.mappa = L.map(element.nativeElement, {
      center: [41.89, 12.49],
      zoom: 15
    });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.mappa);


    this.mappa.on('click', (e: any) => {

      this.onMappaClicked.emit(e);
    });
  }


   setMarkers(latlngs: L.LatLng[]) {
    if (this.mappa ) {

      if (this._markers.length > 0) {
        this._markers.forEach(m => {
          (<L.Map>this.mappa).removeLayer(m);
        });
      }

      this._markers = latlngs.map(latlng => {
        const marker = L.marker(latlng).addTo(<L.Map>this.mappa);
        marker.on('click', () => {
          this.onMarkerClicked.emit(latlng);
        });
        return marker;
      });
    }
  }
}
