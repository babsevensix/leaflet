import { Injectable } from '@angular/core';
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class PuntiMappaService {

  latLngs: L.LatLng[] = [L.latLng(41.8901622,12.4998408)];

  constructor() { }

  getPuntiMappa(): L.LatLng[] {
    return this.latLngs;
  }

  addPuntoMappa(position: L.LatLng) {
    this.latLngs = [...this.latLngs, position];

  }

  removePuntoMappa(position: L.LatLng) {
    this.latLngs = this.latLngs.filter(latLng => !latLng.equals(position));

  }






}
