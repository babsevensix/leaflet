import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import { PuntoSullamappa } from 'src/puntosullamappa.model';

@Injectable({
  providedIn: 'root'
})
export class PuntiMappaService {

  punti: PuntoSullamappa[] = [{ point: L.latLng(41.8901622,12.4998408), date: new Date(Date.now()) }];

  constructor() { }

  getPuntiMappa(): PuntoSullamappa[] {
    return this.punti;
  }

  addPuntoMappa(position: L.LatLng) {
    this.punti = [...this.punti, { point: position, date: new Date(Date.now()) }];

  }

  removePuntoMappa(position: L.LatLng) {
    this.punti = this.punti.filter(punto => !punto.point.equals(position));

  }
}
